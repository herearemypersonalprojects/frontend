$(function () {
	/*
	 * 	<form id="upload-file-form" method="POST" enctype="multipart/form-data">
			File to upload: <input type="file" name="file" id="file"> 
		</form>
	 */
	var input = document.getElementById('file');
	
		input.onclick = function () {
		    this.value = null;
		};
	
		input.onchange = function () {
			  $.ajax({
				    url: "http://localhost:2011/upload",
				    type: "POST",
				    data: new FormData($("#upload-file-form")[0]),
				    enctype: 'multipart/form-data',
				    processData: false,
				    contentType: false,
				    cache: false,
				    success: function () {
				      // Handle upload success
				      // ...
				    },
				    error: function () {
				      // Handle upload error
				      // ...
				    }
				  });		    
		};
});