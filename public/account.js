const serverBase = '/';
const PROFILE_URL = serverBase + 'account';
const LOGIN_URL = serverBase + 'login';


// function getUserInfo(token, callbackFn) {
function getUserInfo(callbackFn) {
  var settings = {
    url: PROFILE_URL,
    dataType: 'json',
    // data: currentUser,
    beforeSend: function (request)
    {
       request.setRequestHeader("Authorization", "Bearer " + localStorage.getItem('token'));
    },
    contentType: "text/html",
    type: 'GET',
    success: callbackFn
  };
  $.ajax(settings);
}


function displayUserAccountInfo(data) {
    $('body').append(
        '<p>' + 'Result: ' + data.data + '</p>' +
     '<p>' + 'Name: ' + data.name + '</p>' +
     '<p>' + 'username: ' + data.username + '</p>' +
     '<p>' + 'snpVariant: ' + data.snpVariant + '</p>' +
        '<p>' + 'token: ' + localStorage.getItem('token') + '</p>');
}


function getAndDisplayUserAccountInfo() {
    getUserInfo(displayUserAccountInfo);

}

//callback fn for login ajax call
function storeJWT(data) {
    //put JWT in local storage
    localStorage.setItem('token', data.token);
    //show that object has been added to local storage 
    // $('body').append('<p>' + 'JWT in local storage: ' + JSON.stringify(currentToken) + '</p>');
    $('body').append('<p>' + 'JWT in local storage: ' + localStorage.getItem('token') + '</p>');
    // getAndDisplayUserAccountInfo(currentToken);
    getAndDisplayUserAccountInfo();
}

$(function() {
    $('.js-login-submit-form').submit(function(e) {
        e.preventDefault();
        let uname = $('input[name=username]').val();
        //store username
        localStorage.setItem('uname', uname);
        let pword = $('input[name=password]').val();
        let usernamePassword = {"username": uname, "password": pword};
        console.log(usernamePassword);
        let settings = {
            url: LOGIN_URL,
            dataType: 'json',
            data: JSON.stringify(usernamePassword),
            contentType: "application/json",
            type: 'POST',
            success: storeJWT
        };
        $.ajax(settings);
    });
});
