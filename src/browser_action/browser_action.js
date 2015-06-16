
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
      	} else {
      		$('#active_text').text('APE is inactive');
      		localStorage["ape-active"]=false;
      	}
    })
  })
