/* jshint browser:true */

var actualCode =  '(' + function() {
    'use strict';

    var mock_date = function() {

    	var actual_date = new Date();
    	var actual_date_string = Date();

    	var Fake_Date = Date;

 		for (var i in Date) {
		  Fake_Date[i] =  Date[i];
		}

    	Fake_Date.__proto__ = Date.__proto__;

	    Object.defineProperty(window, 'Date', {
	        value: Fake_Date,
	        configurable: false,
	        enumerable: false,
	        writable: false
	    });

	    Date.prototype.getTimezoneOffset = function() { return 0; }
    	
    	// TODO: override time methods and constructor string to account for timezoneoffset
    }

	var mock_screen = function() {

	    function Screen() {

	    }
	    var fake_screen = new Screen();

		for (var i in screen) {
		  fake_screen[i] =  screen[i];
		}

		fake_screen.__proto__ = screen.__proto__ ;

	    Object.defineProperties(fake_screen, {
	        height: {
	            value: 500,
	            configurable: false,
	            enumerable: true,
	            writable: false
	        },
	        availHeight: {
	            value: 473,
	            configurable: false,
	            enumerable: true,
	            writable: false
	        },
	        width: {
	            value: 800,
	            configurable: false,
	            enumerable: true,
	            writable: false
	        },
	    });
	    Object.defineProperty(window, 'screen', {
	        value: fake_screen,
	        configurable: false,
	        enumerable: false,
	        writable: false
	    });
	}

	var mock_navigator = function() {

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
	}

	/* Main */
    mock_navigator();
    mock_screen();
    mock_date();

} + ')();';

document.documentElement.setAttribute('onreset', actualCode);
document.documentElement.dispatchEvent(new CustomEvent('reset'));
document.documentElement.removeAttribute('onreset');