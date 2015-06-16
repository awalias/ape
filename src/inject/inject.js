/* jshint browser:true */
var actualCode =  '(' + function() {
    'use strict';

    var mock_date = function() {
    	var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  			"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
		];
		var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

	    Date.prototype.getTimezoneOffset = function() { 
	    	return 0; 
	    }

		Date.prototype.toString = function()
		{
			/* Fri Jun 12 2015 14:53:34 GMT+0100 (BST) */
			/* Sat Jun 12 2015 14:7:56 GMT */
		    return  dayNames[this.getDay()] + " " +
		    	monthNames[this.getMonth()] + " " + 
		    	('0' + this.getDate()).slice(-2)    + " " +  
		     	this.getFullYear() + " " + 
		     	('0' + this.getHours()).slice(-2)   + ":" + 
		     	('0' + this.getMinutes()).slice(-2) + ":" + 
		     	('0' + this.getSeconds()).slice(-2) + " GMT";
		}

		Date.prototype.toLocaleDateString = function() {
			return this.getMonth() + "/" + this.getDate() + "/" + this.getFullYear();
		}

		Date.prototype.toLocaleTimeString = function() {
			var suffix = "AM";
			var hours = this.getHours();
			if (hours > 12) {
				hours = hours - 12;
				suffix = "PM";
			}
			return hours + ":" + 
		     	('0' + this.getMinutes()).slice(-2) + ":" + 
		     	('0' + this.getSeconds()).slice(-2) + " " + suffix;
		}

		Date.prototype.toLocaleString = function() {
			return this.toLocaleDateString() + ", " + this.toLocaleTimeString();
		}

		Date.prototype.getDate = function() {
			return this.getUTCDate();
		}

		Date.prototype.getDay = function() {	
			return this.getUTCDay();	
		}

		Date.prototype.getFullYear = function() {
			return this.getUTCFullYear();
		}

		Date.prototype.getHours = function() {	
			return this.getUTCHours();	
		}

		Date.prototype.getMilliseconds = function() {
			return this.getUTCMilliseconds();
		}

		Date.prototype.getMinutes = function() {
			return this.getUTCMinutes();
		}

		Date.prototype.getMonth = function() {
			return this.getUTCMonth();
		}

		Date.prototype.getSeconds = function() {
			return this.getUTCSeconds();	
		}
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
	            value: 768,
	            configurable: false,
	            enumerable: true,
	            writable: false
	        },
	        availHeight: {
	            value: window.innerHeight,
	            configurable: false,
	            enumerable: true,
	            writable: false
	        },
	        width: {
	            value: 1366,
	            configurable: false,
	            enumerable: true,
	            writable: false
	        },
	        availWidth: {
	            value: window.innerWidth,
	            configurable: false,
	            enumerable: true,
	            writable: false
	        },
	        availLeft: {
	            value: 0,
	            configurable: false,
	            enumerable: true,
	            writable: false
	        },
	        availTop: {
	            value: 0,
	            configurable: false,
	            enumerable: true,
	            writable: false
	        },
	        colorDepth: {
	            value: 24,
	            configurable: false,
	            enumerable: true,
	            writable: false
	        },
	        pixelDepth: {
	            value: 24,
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
	            value: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36",
	            configurable: false,
	            enumerable: true,
	            writable: false
	        },
	        appVersion: {
	            value: "5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.81 Safari/537.36",
	            configurable: false,
	            enumerable: true,
	            writable: false
	        },
	        platform: {
	            value: "Win32",
	            configurable: false,
	            enumerable: true,
	            writable: false
	        },
	        plugins: {
	            value: undefined,
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

chrome.runtime.sendMessage({"active": "ape-active"}, function(response){
    var active = response.active;
	if (active=="true") {
		document.documentElement.setAttribute('onreset', actualCode);
		document.documentElement.dispatchEvent(new CustomEvent('reset'));
		document.documentElement.removeAttribute('onreset');
	}
});
