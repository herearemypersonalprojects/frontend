/**
 * Created by quocanh on 22/08/2015.
 */
$(function () {
    $("#login-form").load("view/login.html");
    window.location.href = "/api/connect/facebook";

    $.blockUI({message: $('#login-form')});

    //setTimeout($.unblockUI, 2000);
});

function checkMail() {
    var that = $('#signupemail');
    var email = that.val();
    var error = $('#signupalert');
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
    $.unblockUI();
}

function signup(email, username, pwd) {
    var email = $('#signupemail').val();
    var username = $('#signupusername').val();
    var pwd = $('#signuppassword').val();

    var error = $('#signupalert');
    error.show();
    if (!email) {
        error.html('Xin bạn vui lòng nhập email');
        $('#signupemail').focus();
        return false;
    }

    if (!validateEmail(email)) {
        error.html('Xin bạn vui lòng kiểm tra email hợp lệ');
        $('#signupemail').focus();
        return false;
    }

    if (!username) {
        $('#signupusername').focus();
        error.html('Xin bạn vui lòng nhập username');
        return false;
    }

    if (!pwd) {
        $('#signuppassword').focus();
        error.html('Xin bạn vui lòng nhập password');
        return false;
    }

    error.hide();
    $('#loginbox').show();
    $('#signupbox').hide();
    var user = new User(email, username, pwd);
}