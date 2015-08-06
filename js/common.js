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
		    success: function (data) {
		      // Handle upload success
		    	//alert(data);
		    },
		    error: function (data) {
		      // Handle upload error
		    	//alert(data);
		    }
		  });			
}