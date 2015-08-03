var paris = new google.maps.LatLng(48.856614, 2.3522219000000177);
var map;
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
}

google.maps.event.addDomListener(window, 'load', initialize);