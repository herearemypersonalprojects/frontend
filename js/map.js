var paris = new google.maps.LatLng(48.856614, 2.3522219000000177);
var zoomLevel = 13;
var map;
var geocoder;
var marker;
var infowindow;
var displayPlaceController = [];
var realTimeUpdateController;
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
    
google.maps.event.addDomListener(window, 'load', initialize);

// [START initialize]
function initialize() {
      map = new google.maps.Map(document.getElementById('map-canvas'), {
          zoom: zoomLevel,
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

    setTimeout(function () {
        loadPlacesFromCurrentView(map);
    }, 1000);
    
} // [END initialize]

function realtimeUpdate() {
    clearInterval(realTimeUpdateController);
    realTimeUpdateController = setInterval(function () {
        updateInformation()
    }, 1000);
}

function updateInformation() {

}

// [START load only places in the selected view]
function loadPlacesFromCurrentView(map) {
	// determine the map bounds
	var bounds = map.getBounds();
	
	// determine the current view's points
	var swPoint = bounds.getSouthWest();
	var nePoint = bounds.getNorthEast();
	
	var swLat = swPoint.lat();
	var swLng = swPoint.lng();
	var neLat = nePoint.lat();
	var neLng = nePoint.lng();

    var JSONObject = {
        "swLat": swLat,
        "swLng": swLng,
        "neLat": neLat,
        "neLng": neLng
    };

    // delay displaying places 1000 ms after displaying the map
    loadPlaces(JSONObject);

}
// [END loadPlacesFromCurrentView]

// [START load places with given criteria]
function loadPlaces(JSONObject) {
    for (var i = 0; i < displayPlaceController.length; i++)  window.clearInterval(displayPlaceController[i]);
    $.ajax({
        url: "/api/getPlaces",
        type: 'post',
        data: JSONObject,
        dataType: 'JSON',
        success: function (data) {

            $(data).each(function (idx, item) {

                displayPlace(item, idx * 20);
            });
            //map.panTo(center);
        },
        error: function (request, status, error) {
            console.log(request.responseText + ":" + status + ":" + error);
        }
    });
} //[END loadPlaces with given criteria]

function loadPlacesByCity(city) {
	// step 1: load all places in the selected city
	
	// step 2: zoom fit the displayed places
	var latlngbounds = new google.maps.LatLngBounds();
	// for each place: latlngbounds.extend(servicePos);
	map.fitBounds(latlngbounds);
}

function displayPlace(item, timeOut) {
    displayPlaceController.push(setTimeout(function () {
        var content = '<div class="placeMarker" name="' + item.id + '" style="cursor: pointer" id="div-main-infoWindow">' + item.title + '</div>' +
            '<div class="' + item.id + '" style="display:none"https://www.dropbox.com/s/zz52pykosr63yg5/Capture%20d%27%C3%A9cran%202015-08-08%2001.13.44.png?dl=0>' + item.information + '</div>';
        if (item.imagePath) {
            content = content + '<img class="' + item.id + '" src="http://bandoviet.net' + item.imagePath + '" style="width:75px;height:64px;">';
        } else {
            content = content + '<img class="' + item.id + '" src="http://thumb7.shutterstock.com/thumb_large/921158/205093411/stock-vector-vietnam-traditional-costume-on-white-background-205093411.jpg" style="width:75px;height:64px;">';
        }

        var servicePos = new google.maps.LatLng(item.latitude, item.longitude);
        /*
        infowindow = new google.maps.InfoWindow({
            map: map,
            position: servicePos,
            content: content
        });
         */
        marker = new google.maps.Marker({
            position: servicePos,
            icon: "images/restaurant_vietnamese.png",
            map: map
        });
    }, timeOut));
}

// [START loadPlaces]
//load places from database for a city (the selected city) 
function loadPlaces_tobedeleted() {
    clearInterval(displayPlaceController);
	  $.ajax({
		    type: "get",
          url: "/api/places",
		    success: function (data) {

		        $(data).each(function(idx, item){
                    displayPlace(item, idx * 200);
		        });		        
		    },
		    error: function (request, status, error) {
                console.log("error: " + request.responseText + ":" + status + ":" + error);
		    }
		});

} // [END loadPlaces]	

// [START region_fillform]
function fillInAddress() {
    // Get the place details from the autocomplete object.
    var place = autocomplete.getPlace();


    if (!place.geometry) {
        window.alert("Autocomplete's returned place contains no geometry");
        return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
    } else {
        map.setCenter(place.geometry.location);
        map.setZoom(17);  // Why 17? Because it looks good.
    }




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
        for (j = 0 ; j < super_var1.length ; ++j) {
            var super_var2 = super_var1[j].types;
            for (k = 0 ; k < super_var2.length ; ++k) {
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
        icon: "images/restaurant_vietnamese.png",
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