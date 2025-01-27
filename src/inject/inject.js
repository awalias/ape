/* jshint browser:true */
chrome.runtime.sendMessage({"active": "ape-active"}, function(response){
    var active = response.active;
    var profile_number = response.profile_number;
    var hide_plugins = response.hide_plugins;
    var spoof_timezone = response.spoof_timezone;
    var spoof_offset = response.spoof_offset;

	var actualCode =  '(' + function(ua_profile, hide_plugins, spoof_offset, spoof_timezone) {
	    'use strict';

		function getRandomInt(min, max) {
		    return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		function getRandChar(charset) {
			return charset.charAt(Math.floor(Math.random() * charset.length))
		}

	    var protect_font_detection = function() {
			Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
			    enumerable: true,
			    configurable: true,
			    get: function(){
			        return this.clientWidth + (getRandomInt(-5, 5)/100)*this.clientWidth;
			    },
			    set: function(newval){
			        this.setAttribute('offsetWidth',newval);
			    }
			});
			Object.defineProperty(HTMLElement.prototype, 'offsetHeight', {
			    enumerable: true,
			    configurable: true,
			    get: function(){
			        return this.clientHeight + (getRandomInt(-5, 5)/100)*this.clientHeight;
			    },
			    set: function(newval){
			        this.setAttribute('offsetHeight',newval);
			    }
			});
	    }

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
		    	return ua_profile.timezone; 
		    }

			Date.prototype.toString = function()
			{
				/* Sat Jun 12 2015 14:7:56 GMT */
				var tz = "";
				if (ua_profile.timezone > 0) {
					tz = "+"+(ua_profile.timezone/60).toString();
				} else if (ua_profile.timezone < 0) {
					tz = (ua_profile.timezone/60).toString();
				}
			    return  dayNames[this.getDay()] + " " +
			    	monthNames[this.getMonth()] + " " + 
			    	('0' + this.getDate()).slice(-2)    + " " +  
			     	this.getFullYear() + " " + 
			     	('0' + this.getHours()).slice(-2)   + ":" + 
			     	('0' + this.getMinutes()).slice(-2) + ":" + 
			     	('0' + this.getSeconds()).slice(-2) + " GMT" + tz;
			}

			if (ua_profile.setToUTC) {
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
					return this.getUTCHours() + (ua_profile.timezone/60);
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
		            value: ua_profile.screen.height,
		            configurable: false,
		            enumerable: true,
		            writable: false
		        },
		        availHeight: {
		            value: ua_profile.screen.availHeight,
		            configurable: false,
		            enumerable: true,
		            writable: false
		        },
		        width: {
		            value: ua_profile.screen.width,
		            configurable: false,
		            enumerable: true,
		            writable: false
		        },
		        availWidth: {
		            value: ua_profile.screen.availWidth,
		            configurable: false,
		            enumerable: true,
		            writable: false
		        },
		        availLeft: {
		            value: ua_profile.screen.availLeft,
		            configurable: false,
		            enumerable: true,
		            writable: false
		        },
		        availTop: {
		            value: ua_profile.screen.availTop,
		            configurable: false,
		            enumerable: true,
		            writable: false
		        },
		        colorDepth: {
		            value: ua_profile.screen.colorDepth,
		            configurable: false,
		            enumerable: true,
		            writable: false
		        },
		        pixelDepth: {
		            value: ua_profile.screen.pixelDepth,
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
		            value: ua_profile.userAgent,
		            configurable: false,
		            enumerable: true,
		            writable: false
		        },
		        appVersion: {
		            value: ua_profile.appVersion,
		            configurable: false,
		            enumerable: true,
		            writable: false
		        },
		        platform: {
		            value: ua_profile.platform,
		            configurable: false,
		            enumerable: true,
		            writable: false
		        },
		        hasOwnProperty: {
					value: function() { return false },
					configurable: false,
		            enumerable: true,
		            writable: false
		        }
		    });

		    if (hide_plugins == "true") {
			    Object.defineProperties(fake_navigator, {
			        plugins: {
			            value: undefined,
			            configurable: false,
			            enumerable: true,
			            writable: false
			        },
			    });
			}

		    Object.defineProperty(window, 'navigator', {
		        value: fake_navigator,
		        configurable: false,
		        enumerable: false,
		        writable: false
		    });
		}

		var mock_canvas = function() {
			var old = HTMLCanvasElement.prototype.toDataURL;
			HTMLCanvasElement.prototype.toDataURL = function() {
				var res = old.apply(this, arguments);
				res = res.split(",");

				// add noise
				for (var i = 0 ; i < getRandomInt(1,5); i++) {
					res[1] = res[1] + getRandChar(res[1]);
				}

				return res.join(",");
			};
		}

		/* Main */
		mock_canvas();
	    mock_navigator();
	    mock_screen();
	    if (spoof_timezone == "true") { 
	    	mock_date();
	    }
	    if (spoof_offset == "true" ) {
	    	protect_font_detection();
	    }

	} + ')(' + JSON.stringify(profiles[profile_number]) + ',' + JSON.stringify(hide_plugins) + ',' 
	+ JSON.stringify(spoof_offset) + ',' + JSON.stringify(spoof_timezone) + ');';

	if (active!="false") {
		document.documentElement.setAttribute('onreset', actualCode);
		document.documentElement.dispatchEvent(new CustomEvent('reset'));
		document.documentElement.removeAttribute('onreset');
	}
});
