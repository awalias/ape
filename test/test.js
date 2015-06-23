//Navigator
//userAgent
$("#userAgent").html(navigator.userAgent);

//appVersion
$("#appVersion").html(navigator.appVersion);

//platform
$("#platform").html(navigator.platform);

//plugins
//$("#plugins").html(navigator.plugins);

//Navigator Class Name
$("#Navigator").html(navigator.constructor.toString());

//Date
// setup
date = new Date();
//Date Class Name
$("#Date").html(Date.name);

//Timezone
$("#timezone").html(date.getTimezoneOffset());

//DateTime toString
$("#datetimestring").html(date);

//DateTime Static Method
$("#datetimestatic").html(Date());

//toLocaleString
$("#toLocaleString").html(date.toLocaleString());

//Screen
//Screen Class Name
$("#Screen").html(screen.constructor.toString());

//Height
$("#screenHeight").html(screen.height);

//Width
$("#screenWidth").html(screen.width);

//Colour Depth
$("#colorDepth").html(screen.colorDepth);

//Pixel Depth
$("#pixelDepth").html(screen.pixelDepth);

//Avail Height
$("#availHeight").html(screen.availHeight);

//Avail Width
$("#availWidth").html(screen.availWidth);

//Avail Left
$("#availLeft").html(screen.availLeft);

//Avail Top
$("#availTop").html(screen.availTop);