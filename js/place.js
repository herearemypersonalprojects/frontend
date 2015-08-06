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
	
	// common functions
	function submitForm(form) {
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
			    	form.hide();
			    	$('#new-place').text('Cảm ơn bạn :)');			    	
			    },
			    error: function () {
			      // Handle upload error
			    	//alert(data);
			    }
			  });			
	}
	
	// [START loadPlaces]
	//load place from database
	function loadPlaces() {
	    $.getJSON('localhost:2011/places', function(data){
	        alert('ok');
	        $(data).each(function(idx, item){
	            
	            var content ='<div id="div-main-infoWindow">'+item.title+'</div>';

	            var servicePos = new google.maps.LatLng(item.latitude, item.longitude);

	            infowindow = new google.maps.InfoWindow({
	                map: map,
	                position: servicePos,
	                content:  content//.substring(0, 50)
	            });
	        });
	    });
	} // [END loadPlaces]	
});