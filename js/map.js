var paris = new google.maps.LatLng(48.856614, 2.3522219000000177);
var map;
var geocoder;
var marker;
var infowindow;
var latitude;
var longitude;
var autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'long_name',
    postal_code: 'short_name'
};

// Extract city, country from address input by user when creating a new place
$(function () {
    $('#addressInput').blur(function() {           
        geocoder.geocode({ 'address': $('#addressInput').val() }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                getCity(results);
            }
        });
    });
});
    
google.maps.event.addDomListener(window, 'load', initialize);

// [START initialize]
function initialize() {
      map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 13,
        panControl: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_TOP
        },
        center: paris
      });
    
    geocoder = new google.maps.Geocoder();
    
    infowindow = new google.maps.InfoWindow();
  
    marker = new google.maps.Marker({
        map: map,
        position: paris,
        draggable: true
    });
    
    // Create the autocomplete object, restricting the search
    // to geographical location types.
    autocomplete = new google.maps.places.Autocomplete(
        /** @type {HTMLInputElement} */(document.getElementById('addressInput')),
        { types: ['geocode'] });
    // When the user selects an address from the dropdown,
    // populate the address fields in the form.
    //google.maps.event.addListener(autocomplete, 'place_changed', function() {
    //    fillInAddress();
    //});
    //status_changed
    //map.controls[google.maps.ControlPosition.RIGHT].push(autocomplete);
    loadPlaces();
    
} // [END initialize]

// [START loadPlaces]
//load place from database
function loadPlaces() {
	  $.ajax({
		    type: "get",
          url: "http://bandoviet.net/api/places",
		    success: function (data) {		        
		        $(data).each(function(idx, item){
		            
		            var content ='<div id="div-main-infoWindow">'+item.title+'</div>';

		            var servicePos = new google.maps.LatLng(item.latitude, item.longitude);

		            infowindow = new google.maps.InfoWindow({
		                map: map,
		                position: servicePos,
		                content:  content//.substring(0, 50)
		            });
		        });
		    },
		    error: function (request, status, error) {
		        alert(request.responseText + ":" + status + ":" + error);
		    }
		});

} // [END loadPlaces]	

// [START region_fillform]
function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();
    
    latitude = place.geometry.location.lat();
    longitude = place.geometry.location.lng();
    showMarker();
    for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
    }

    // Get each component of the address from the place details
    // and fill the corresponding field on the form.
    for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
            var val = place.address_components[i][componentForm[addressType]];
            document.getElementById(addressType).value = val;
        }
    }
}
// [END region_fillform]

// [START region_geolocation]
// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var geolocation = new google.maps.LatLng(
                position.coords.latitude, position.coords.longitude);
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}
// [END region_geolocation]


// [START getCity]
function getCity(results) {
    latitude = results[0].geometry.location.lat();
    longitude = results[0].geometry.location.lng();
    showMarker();
    
    //break down the three dimensional array into simpler arrays
    for (i = 0 ; i < results.length ; ++i)
    {
        var super_var1 = results[i].address_components;
        for (j = 0 ; j < super_var1.length ; ++j)
        {console.log(super_var1[j].long_name);
            var super_var2 = super_var1[j].types;
            for (k = 0 ; k < super_var2.length ; ++k)
            {console.log(super_var2[k] + ':'  + super_var1[j].long_name);
                //find city
                if (super_var2[k] == "locality")
                {
                    //put the city name in the form
                    $('#locality').val(super_var1[j].long_name);
                }
                //find county
                if (super_var2[k] == "country")
                {
                    //put the county name in the form
                    $('#country').val(super_var1[j].long_name);
                }
                //find State
                if (super_var2[k] == "postal_code")
                {
                    //put the state abbreviation in the form
                    $('#postal_code').val(super_var1[j].short_name);
                }
                // street_number 66:  i
                if (super_var2[k] == "street_number"){
                    $('#street_number').val(super_var1[j].short_name);
                }

                if (super_var2[k] == "route"){
                    $('#route').val(super_var1[j].short_name);
                }

            }
        }
    }
} // [START getCity]

// [START showMarker]
function showMarker() {
    var latlng = new google.maps.LatLng(latitude, longitude);
    map.setCenter(new google.maps.LatLng(latitude, longitude));
    if (marker != null) marker.setMap(null);
    marker = new google.maps.Marker({
        map: map,
        position: latlng,
        draggable: true
    });
    document.getElementById('latitude').value = latitude;
    document.getElementById('longitude').value = longitude;

    if (infowindow != null) {
        infowindow.setContent("<span id='address'><b>" + bds_lang.GoogleMaps.Address + " : </b>" + $('#addressInput').val() + "</span>");
        infowindow.open(map, marker);
    }
} // [END showMarker]