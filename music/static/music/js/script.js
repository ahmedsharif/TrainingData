/*
function tokenSuccess(err, response) {
    if(err){
        throw err;
    }
    $window.sessionStorage.accessToken = response.body.access_token;
}


$.ajax({
    type: "POST", //GET, POST, PUT
    url: '/http://127.0.0.1:8000/login',  //the url to call
    data: {'username':'ali','password':'compaq4321'},     // POST Data sent to server, if applicable
    contentType: contentType,
    beforeSend: function (xhr) {
        // Replace `getJwtToken()` with your own function, as necessary
        // If you stored the token in localStorage as mentioned above, you should retrieve it there.
        xhr.setRequestHeader("Authorization", 'Bearer '+ getJwtToken());
    }
}).done(function (response) {
    //Response ok

}).fail(function (err)  {
    //Error during request
});
*/
$(document).ready(function() {
    var url = 'http://127.0.0.1:8000/login/';
    var data = {username: 'ali',password:'compaq4321'};

    fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(data), 
    headers: new Headers({
        'Content-Type': 'application/json'
    })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response['token']));
});
