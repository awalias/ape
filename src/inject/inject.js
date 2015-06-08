
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

    function Navigator() {

    }
    
    var fake_navigator = new Navigator();

	for (var i in navigator) {
	  fake_navigator[i] =  navigator[i];
	}	

	fake_navigator.__proto__ = navigator.__proto__ ;
    
    Object.defineProperties(fake_navigator, {
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
            value: "halal",
            configurable: false,
            enumerable: true,
            writable: false
        },
    });
    Object.defineProperty(window, 'navigator', {
        value: fake_navigator,
        configurable: false,
        enumerable: false,
        writable: false
    });
} + ')();';

document.documentElement.setAttribute('onreset', actualCode);
document.documentElement.dispatchEvent(new CustomEvent('reset'));
document.documentElement.removeAttribute('onreset');