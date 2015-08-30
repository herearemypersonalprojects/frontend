/**
 * Created by quocanh on 22/08/2015.
 */

var isNewUser = false;
var currentUser;

$(document).ready(function () {
    $("#login-form").load("view/login.html");

    hideLoginForm();

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
    hideLoginForm();
    // create new user
    $.ajax({
        url: "/api/createUser",
        type: 'post',
        data: currentUser,
        dataType: 'JSON',
        success: function (data) {
            console.log("Success to add a new user via Facebook");
        },
        error: function (request, status, error) {
            console.log(request.responseText + ":" + status + ":" + error);
        }
    });
}
// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function getFbInfos() {

    FB.api('/me', {fields: 'location, hometown, email, name, id, first_name, last_name, age_range, link, gender, locale, timezone, updated_time, verified'}, function (response) {

        if (response.email == 'undefined' || !response.email) {
            var error = $('#login-alert');
            error.html('<a onclick="myFacebookLoginNeedEmail();" href="#">Your email is required. Please click here to finish your login.</a>');
            error.show();
            $('#facebook-login').addClass('disabled');
            showLoginForm();
            return false;
        } else {
            hideLoginForm();
        }

        //var city = response.location.name.split(",")[0].trim();
        //var country = response.location.name.split(",")[1].trim();
        currentUser = {
            "id": response.id,
            "email": response.email,
            "password": response.id,
            "name": response.name,
            "firstname": response.first_name,
            "lastname": response.last_name,
            //"city": city,
            //"country": country,
            "link": response.link,
            "gender": response.gender,
            "ageRange": response.age_range.min,
            "avatarUrl": "http://graph.facebook.com/" + response.id + "/picture?type=square",
            "language": response.locale,
            //"originalCountry": response.hometown.name.split(",")[1].trim()
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
        // The person is logged into Facebook, but not your app.
        isNewUser = true;
        showLoginForm();
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        showLoginForm();
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
    }, {scope: 'public_profile, email, user_friends'});
}

function myFacebookLoginNeedEmail() {
    FB.login(function () {
        checkLoginState();
    }, {
        scope: 'public_profile, email, user_friends',
        auth_type: 'rerequest'
    });
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
        error.html('<a href="#" class="close" data-dismiss="alert">&times;</a><strong>Error!</strong> Xin bạn vui lòng nhập email');
        $('#login-email').focus();
        return false;
    }

    if (!validateEmail(email)) {
        error.html('<strong>Error!</strong> Email không hợp lệ');
        $('#login-email').focus();
        return false;
    }

    if (!pwd) {
        $('#login-password').focus();
        error.html('<strong>Error!</strong> Xin bạn vui lòng nhập password');
        return false;
    }

    if ($('#login-password-repeated').is(":visible") && !$('#login-password-repeated').val()) {
        $('#login-password-repeated').focus();
        error.html('<strong>Error!</strong> Xin bạn vui lòng xác nhận password');
        return false;
    }

    if ($('#login-password-repeated').is(":visible") && pwd !== $('#login-password-repeated').val()) {
        $('#login-password-repeated').focus();
        error.html('<strong>Error!</strong> The passwords must be the same');
        return false;
    }

    error.hide();


    if ($('#submit-login').text() === "Sign Up") {
        currentUser = {
            "email": email,
            "password": pwd
        }
        addNewUser(currentUser);
    } else {
        const login = {
            "login": email,
            "password": pwd
        }
        $.ajax({
            url: "/api/signin",
            type: 'get',
            data: login,
            dataType: 'JSON',
            success: function (data) {
                console.log(data);
                if (data.error === "LOGIN_ERROR_EMAIL") {
                    registerNewUser('The email is not found.');
                } else if (data.error === "LOGIN_ERROR_PASSWORD") {
                    registerNewUser('The password is not correct.');
                } else {
                    // login thanh cong
                    hideLoginForm();
                }
            },
            error: function (request, status, error) {
                console.log(request.responseText + ":" + status + ":" + error);
            }
        });
    }


}


function registerNewUser(msg) {
    var alert = $('#login-alert');
    alert.removeClass('alert-danger');
    alert.addClass('alert-info');
    alert.html(msg + ' Please retype the password to register a new account');
    alert.show();

    var newpwd = $('#login-password-repeated');
    newpwd.show();
    newpwd.focus();

    $('#submit-login').text("Sign Up");
}

function hideLoginForm() {
    $("#login-form").removeClass('show');
}

function showLoginForm() {
    $("#login-form").addClass('show');
}