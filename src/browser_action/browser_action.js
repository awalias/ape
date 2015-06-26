
  $(function() {
  	$('#active').ready(function() {
  		if (localStorage["ape-active"]=="true") {
			$('#active').bootstrapToggle('on');
  		} else if (localStorage["ape-active"]=="false") {
  			$('#active').bootstrapToggle('off');
  		}
  	});

    // TODO: move this logic to background (icon path, settabprofiles, and localStorage)
    $('#active').change(function() {
    	if ($(this).prop('checked')) {
      		$('#active_text').text('APE is active');
      		localStorage["ape-active"]=true;
      		chrome.runtime.sendMessage({ "newIconPath" : "icon19.png" });
          chrome.runtime.sendMessage({ "setTabProfiles" : true })
      	} else {
      		$('#active_text').text('APE is inactive');
      		localStorage["ape-active"]=false;
      		chrome.runtime.sendMessage({ "newIconPath" : "officon19.png" });
          chrome.runtime.sendMessage({ "clearTabProfiles" : true })
      	}
    })
  })
