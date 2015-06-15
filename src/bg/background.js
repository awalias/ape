// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });

//example of using a message handler from the inject scripts
var requestFilter = {
	urls: [
		"<all_urls>"
	]
};

chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
	var headers = details.requestHeaders;
		// if( !localStorage['user-agent'] ) {
	// 	return;
	// }
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
		headers[UA_index].value = "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36";//localStorage['user-agent'];
	}
	if(AL_index != -1) {
		headers[AL_index].value = "en-US,en;q=0.5";
	}

	return {requestHeaders: headers};
}, requestFilter, ['requestHeaders','blocking']);

// chrome.webRequest.onBeforeRequest.addListener(
// 	function(details) { return {cancel: true}; },
// 	{urls: ["*://www.evil.com/*"]},
// 	["blocking"]);