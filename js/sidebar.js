/**
 * Created by quocanh on 31/08/2015.
 */

$(document).ready(function () {

    $('#sidebar').load('view/sidebar.html', null, function (responseText, textStatus, xhr) {
        $('#sidebar > a').on('click', function (e) {
            e.preventDefault();

            if (!$(this).hasClass("active")) {
                var lastActive = $(this).closest("#sidebar").children(".active");
                lastActive.removeClass("active");
                lastActive.next('div').collapse('hide');
                $(this).addClass("active");
                $(this).next('div').collapse('show');

            }
        });

        $("#communityCriterion").click(function (e) {
            e.preventDefault();
            var element = $("#sidebar");
            if (element.is(":visible")) {
                element.hide();
            } else {
                element.show();
            }

        });
    });
});
