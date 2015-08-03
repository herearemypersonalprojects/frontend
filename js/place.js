// load place from database
function loadPlaces() {

    $.getJSON('/maps/getServices', function(data){

        $(data).each(function(idx, item){
            var number = 10 + Math.floor(Math.random() * 100);
               // console.log(idx + ': ' + item + ' : ' + item.info + ' : ' + item.latitude + ' : ' + item.longitude);

            var content ='<div id="div-main-infoWindow">'+item.info+'</div>';

            var servicePos = new google.maps.LatLng(item.latitude, item.longitude);

            infowindow = new google.maps.InfoWindow({
                map: map,
                position: servicePos,
                content:  content//.substring(0, 50)
            });
        });
    });
}

// New place
$(function () {


    $('#new-place').click(function() {
        //print_country("country");
        //print_state('state', 75);
        //$('#country').val('France');
        //$('#state').val('Paris');
    
        $('#new-place-form').show();
    });
    
    $('#new-place-form-close').click(function() {
        $('#new-place-form').hide();
    });
});