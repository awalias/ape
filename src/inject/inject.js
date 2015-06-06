
// chrome.extension.sendMessage({}, function(response) {
// 	var readyStateCheckInterval = setInterval(function() {
// 	if (document.readyState === "complete") {
// 		clearInterval(readyStateCheckInterval);

// 		(function() {
// 			console.log("fbi    gfe    fwfwfwef");
// 		    window.navigator.__defineGetter__('userAgent', function(){
// 	    		return 'foo' // customized user agent
// 			});
// 			console.log(navigator.userAgent);
// 		})();

// 	}
// 	}, 10);
// });

// console.log("RABAT");

/* jshint browser:true */
var actualCode =  '(' + function() {
    'use strict';
    //console.log("running");
    var navigator = Object.create(window.navigator);
    // Pretend to be Windows XP
    Object.defineProperties(navigator, {
        userAgent: {
            value: "HORSE",
            configurable: false,
            enumerable: true,
            writable: false
        },
        appVersion: {
            value: "HORSE",
            configurable: false,
            enumerable: true,
            writable: false
        },
        platform: {
            value: 'Win32',
            configurable: false,
            enumerable: true,
            writable: false
        },
    });
    Object.defineProperty(window, 'navigator', {
        value: navigator,
        configurable: false,
        enumerable: false,
        writable: false
    });
} + ')();';

document.documentElement.setAttribute('onreset', actualCode);
document.documentElement.dispatchEvent(new CustomEvent('reset'));
document.documentElement.removeAttribute('onreset');