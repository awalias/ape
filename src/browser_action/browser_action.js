
  $(function() {
  	$('#active').ready(function() {
  		if (localStorage["ape-active"]=="true") {
			$('#active').bootstrapToggle('on');
  		} else if (localStorage["ape-active"]=="false") {
  			$('#active').bootstrapToggle('off');
  		}

      if (localStorage["hide_plugins"]=="true") {
      $('#hide_plugins').bootstrapToggle('on');
      } else if (localStorage["hide_plugins"]=="false") {
        $('#hide_plugins').bootstrapToggle('off');
      }
  	});

    
    $('#active').change(function() {
    	if ($(this).prop('checked')) {

      		$('#active_text').text('APE is active');
          chrome.runtime.sendMessage({ "activate" : "true" });

      	} else {

      		$('#active_text').text('APE is inactive');
          chrome.runtime.sendMessage({ "activate" : "false" })
          $('#hide_plugins').bootstrapToggle('off');

      	}
    })

    $('#hide_plugins').change(function() {
      if ($(this).prop('checked')) {
          chrome.runtime.sendMessage({ "hide_plugins" : "true" });

          $('#active').bootstrapToggle('on');
        } else {
          chrome.runtime.sendMessage({ "hide_plugins" : "false" });
        }
    })
  })
