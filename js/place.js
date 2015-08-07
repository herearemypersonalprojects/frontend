$(function () {

	// Add new place
	$('#new-place-form').hide();
	$('#new-place').click(function() {
	    //print_country("country");
	    //print_state('state', 75);
	    //$('#country').val('France');
	    //$('#state').val('Paris');
	    $('#new-place-form')[0].reset();
	    $('#new-place-form').show();        
	});
	
	$('#new-place-form-close').click(function() {
	    $('#new-place-form').hide();    
	});
	
	$("#newPlaceFormSubmit").click(function() {
		submitForm($('#new-place-form'));		
	});
	

	function disable(form) {
		var limit = form.elements.length;
		for (i = 0; i < limit; i++) {
			form.elements[i].disabled = true;
		}
	}
     
    function enable(form) {
	    var limit = form.elements.length;
	    for (i=0;i<limit;i++) {
	      form.elements[i].disabled = false;
	    }
	}  
	
	// common functions
	function submitForm(form) {
	    if( !$('#title').val() ) {
	    	$('#title').addClass( "warning" );
	    	$('#title').focus();
	    	alert('Xin bạn vui lòng nhập tên địa điểm');
	    	return false;
	    }
	    
	    if( !$('#addressInput').val() ) {
	    	$('#addressInput').addClass( "warning" );
	    	$('#addressInput').focus();
	    	alert('Xin bạn vui lòng nhập địa điểm');
	    	return false;
	    }
	    
	    
		  form.hide();
    	  $('#new-place').text('Cảm ơn bạn :)');		
	      //disable(form);
		  $.ajax({
			    url: form.attr("action"),
			    type: "POST",
			    data: new FormData(form[0]),
			    enctype: 'multipart/form-data',
			    processData: false,
			    contentType: false,
			    cache: false,
			    success: function () {
			      // Handle upload success
			      //enable(form);	
			    },
			    error: function () {
			      // Handle upload error
			    	//alert(data);
			    }
			  });			
	}
});