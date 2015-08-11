/**
 * Created by quocanh on 11/08/2015.
 */
$(function () {
    // List available cities
    $.ajax({
        type: "get",
        url: "/api/cities",
        success: function (data) {
            $(data).each(function (idx, item) {
                $('#cityCriterion')
                    .append($("<option></option>")
                        .attr("value", item.substring(0, item.indexOf(",")))
                        .text(item));
            });
        },
        error: function (request, status, error) {
            console.log(request.responseText + ":" + status + ":" + error);
        }
    });


    // action to select a city
    $('#cityCriterion').change(function () {

        var JSONObject = {
            "city": $(this).val()
        };
        loadPlaces(JSONObject);

    });
});