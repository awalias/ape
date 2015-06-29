// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });
function loadScript(scriptName, callback) {
    var scriptEl = document.createElement('script');
    scriptEl.src = chrome.extension.getURL('lib/' + scriptName + '.js');
    scriptEl.addEventListener('load', callback, false);
    document.head.appendChild(scriptEl);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

loadScript("../src/profiles/profiles", function() {
	localStorage["profiles"] = JSON.stringify(profiles);
});

localStorage["profile_number"] = 0;
localStorage["hide_plugins"] = "false";

//example of using a message handler from the inject scripts
var requestFilter = {
	urls: [
		"<all_urls>"
	]
};

chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
	if (localStorage['ape-active']!="false") {

		var headers = details.requestHeaders;

		var UA_index = -1;
		var AL_index = -1;

		for(var i = 0, l = headers.length; i < l; ++i) {
			if( headers[i].name == 'User-Agent' ) {
				UA_index = i;
			}
			if( headers[i].name == 'Accept-Language' ) {
				AL_index = i;
			}
		}
		if(UA_index != -1) {
			headers[UA_index].value = JSON.parse(localStorage["profiles"])[localStorage["profile_number"]].userAgent;
		}
		if(AL_index != -1) {
			headers[AL_index].value = JSON.parse(localStorage["profiles"])[localStorage["profile_number"]].acceptedLanguages;
		}
	} // end if (localStorage['ape-active']);

	return {requestHeaders: headers};

}, requestFilter, ['requestHeaders','blocking']);

 chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.newIconPath) {
	        chrome.browserAction.setIcon({
	            path: "../../icons/"+request.newIconPath
	        });
    	} else if (request.active) {
    		sendResponse({ "active" : localStorage["ape-active"],
    					   "profile_number" : JSON.parse(localStorage["tabStore"])[sender.tab.id],
    					   "hide_plugins" : localStorage["hide_plugins"] 
    		});
    	} else if (request.hide_plugins) {
    		if (request.hide_plugins == "true") {
    			localStorage["hide_plugins"] = "true";
    		} else {
    			localStorage["hide_plugins"] = "false";
    		}
    	} else if (request.setTabProfiles) {
    		setTabProfiles();
     	} else if (request.clearTabProfiles) {
    		clearTabProfiles();
    	}
    }
);

// TODO: clear or rebuild tabStore on extension toggle
// When activated, assign each tab a profile
var setTabProfiles = function() {
	chrome.tabs.query({}, function(tabs) {
		tabStore = {};
	    for (var i = 0; i < tabs.length; i++) {
	   		tabStore[tabs[i].id] = getRandomInt(0, JSON.parse(localStorage["profiles"]).length-1);               
	    }
	    localStorage["tabStore"] = JSON.stringify(tabStore);
	});
}

// For when extension is deactivated
var clearTabProfiles = function() {
	localStorage["tabStore"] = JSON.stringify({});
}

// invoked when extension loads
setTabProfiles();

chrome.tabs.onCreated.addListener(function(tab) {
	tabStore = JSON.parse(localStorage["tabStore"])
	tabStore[tab.id] = getRandomInt(0, JSON.parse(localStorage["profiles"]).length-1);
	localStorage["tabStore"] = JSON.stringify(tabStore);
});

chrome.tabs.onRemoved.addListener( function(tabId, removeInfo) {
	tabStore = JSON.parse(localStorage["tabStore"]);
	delete tabStore[tabId];
	localStorage["tabStore"] = JSON.stringify(tabStore);
});


