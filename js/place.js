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
        
    });
    
    $('#submit').click(function() {
        $.ajax({
          url: 'http://localhost:2011/place',
          type: 'POST',
          dataType: 'jsonp',
          data: JSON.stringify({
              "title":"Pho 14", 
              "information":"Quan pho", 
              "country":"France", 
              "city":"Paris",
              "address":"20 avenue de choisy",
              "latitude": 103, 
              "longitude":323,
              "communityCode":"vietnam",
              "placeType":"restaurant"              
          }),
          contentType: 'application/json',
          success: function(got) {
            return alert("Cảm ơn bạn đã đóng góp thông tin: " + got.id);
          }
        });
    });
});