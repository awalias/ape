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

loadScript("../src/profiles/profiles", function() {
	localStorage["profiles"] = JSON.stringify(profiles);
});

localStorage["profile_number"] = 0;

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
    					   "profile_number" : localStorage["profile_number"] 
    		});
    	}
    }
);
