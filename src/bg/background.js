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
	console.log("pimpin");
		// if( !localStorage['user-agent'] ) {
	// 	return;
	// }
	for(var i = 0, l = headers.length; i < l; ++i) {
		if( headers[i].name == 'User-Agent' ) {
			break;
		}
	}
	if(i < headers.length) {
		headers[i].value = "HALLO, VORLD!";//localStorage['user-agent'];
	}
	return {requestHeaders: headers};
}, requestFilter, ['requestHeaders','blocking']);

chrome.webRequest.onBeforeRequest.addListener(
	function(details) { return {cancel: true}; },
	{urls: ["*://www.evil.com/*"]},
	["blocking"]);

// (function() {
//     var userAgent = window.navigator.userAgent;
//     Object.defineProperty(window.navigator, "userAgent", {
//         get: function() {
//             console.log("hello from useragent");
//             return userAgent;
//         }
//     });
// })();