
  $(function() {
  	$('#active').ready(function() {
  		if (localStorage["ape-active"]=="true") {
			$('#active').bootstrapToggle('on');
  		} else if (localStorage["ape-active"]=="false") {
  			$('#active').bootstrapToggle('off');
  		}
  	});

    $('#active').change(function() {
    	if ($(this).prop('checked')) {
      		$('#active_text').text('APE is active');
      		localStorage["ape-active"]=true;
      		chrome.runtime.sendMessage({ "newIconPath" : "icon19.png" });
      	} else {
      		$('#active_text').text('APE is inactive');
      		localStorage["ape-active"]=false;
      		chrome.runtime.sendMessage({ "newIconPath" : "officon19.png" });
      	}
    })
  })
