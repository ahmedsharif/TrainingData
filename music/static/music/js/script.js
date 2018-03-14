/*
function tokenSuccess(err, response) {
    if(err){
        throw err;
    }
    $window.sessionStorage.accessToken = response.body.access_token;
}



var myApp = angular.module('myApp', []);

myApp.controller('UserCtrl', function ($scope, $http, $window) {
    
    $scope.logout = function () {
        delete $window.sessionStorage.token;
      };
});    
*/
$(document).ready(function () {
    var url = 'http://127.0.0.1:8000/login/';
    var data = { username: 'ali', password: 'arbisoft' };

    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            localStorage.setItem("key", response['token'])
            window.location = '.';
        });
    // .then(response => console.log('Success:', response['token']));

});

