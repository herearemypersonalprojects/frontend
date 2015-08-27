/**
 * Created by quocanh on 22/08/2015.
 */

var isNewUser = false;
var currentUser;

$(function () {
    $("#login-form").load("view/login.html");

    $.blockUI({message: $('#login-form')});

    //setTimeout($.unblockUI, 2000);

    window.fbAsyncInit = function () {
        FB.init({
            appId: '702339429897142',
            cookie: true,  // enable cookies to allow the server to access
                           // the session
            xfbml: true,  // parse social plugins on this page
            version: 'v2.4' // use version 2.4
        });

        // Now that we've initialized the JavaScript SDK, we call
        // FB.getLoginStatus().  This function gets the state of the
        // person visiting this page and can return one of three states to
        // the callback you provide.  They can be:
        //
        // 1. Logged into your app ('connected')
        // 2. Logged into Facebook, but not your app ('not_authorized')
        // 3. Not logged into Facebook and can't tell if they are logged into
        //    your app or not.
        //
        // These three cases are handled in the callback function.

        FB.getLoginStatus(function (response) {
            statusChangeCallback(response);
        });
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

});

function addNewUser(currentUser) {
    // create new user
    $.ajax({
        url: "/api/createUser",
        type: 'post',
        data: currentUser,
        dataType: 'JSON',
        success: function (data) {
            console.log("Succes to add a new user via Facebook");
        },
        error: function (request, status, error) {
            console.log(request.responseText + ":" + status + ":" + error);
        }
    });
}
// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function getFbInfos() {
    $.unblockUI();
    FB.api('/me', {fields: 'email, name, id, first_name, last_name, age_range, link, gender, locale, timezone, updated_time, verified'}, function (response) {
        console.log(response);
        //var city = response.location.name.split(",")[0].trim();
        //var country = response.location.name.split(",")[1].trim();
        currentUser = {
            "id": response.id,
            "email": response.email,
            "password": response.id,
            "name": response.name,
            "firstname": response.first_name,
            "lastname": response.last_name,
          //  "city": city,
          //  "country": country,
            "link": response.link,
            "gender": response.gender,
            "ageRange": response.age_range.min,
            "avatarUrl": "http://graph.facebook.com/" + response.id + "/picture?type=square",
            "language": response.locale,
          //  "originalCountry": response.hometown.name.split(",")[1].trim()
        };
        if (isNewUser) {
            addNewUser(currentUser);
        } else {
            // check existing user

        }
    });
}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        getFbInfos();
    } else if (response.status === 'not_authorized') {
        $('#loginTitle').html("Sign up");
        // The person is logged into Facebook, but not your app.
        isNewUser = true;
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        $('#loginTitle').html("Log in");
        var error = $('#login-alert');

        error.html('Facebook has not been open');
        error.show();
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

// Only works after `FB.init` is called
function myFacebookLogin() {
    FB.login(function () {
        checkLoginState();
    }, {scope: 'public_profile,email'});
}

function checkMail() {
    var that = $('#login-email');
    var email = that.val();
    var error = $('#login-alert');
    if (email && !validateEmail(email)) {
        error.html('Xin bạn vui lòng kiểm tra email hợp lệ');
        error.show();
        that.focus();
        return false;
    } else {
        error.hide();
    }
}

function login() {
    var email = $('#login-email').val();
    var pwd = $('#login-password').val();

    var error = $('#login-alert');
    error.show();
    if (!email) {
        error.html('Xin bạn vui lòng nhập email');
        $('#login-email').focus();
        return false;
    }

    if (!validateEmail(email)) {
        error.html('Xin bạn vui lòng kiểm tra email hợp lệ');
        $('#login-email').focus();
        return false;
    }

    if (!pwd) {
        $('#login-password').focus();
        error.html('Xin bạn vui lòng nhập password');
        return false;
    }

    error.hide();

    currentUser = {
        "email": email,
        "password": pwd
    };
    addNewUser(currentUser);

    $.unblockUI();
}