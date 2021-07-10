const baseUrl = "http://localhost:3000"

// Basic Button For Menu
$(document).ready(() => {
    if(localStorage.getItem("access_token")) {
        homeAfterLogin()
    } else {
        homeBeforeLogin()
    }
})

function homeAfterLogin () {
    $('#movieList').show();
    $('#banner').show();
    $('#menuBtn').show();
    $('.login-box').hide();
    $('#register-box').hide(); 
    $('.logout-txt').show()
    $('#movieList').hide()
    $('#add-box').hide(); 
    $('.banner-btn').hide();
    $('#edit-box').hide()
}

function homeBeforeLogin() {
    $('#movieList').show();
    $('#banner').show();
    $('#menuBtn').show();
    $('.login-box').hide();
    $('#register-box').hide(); 
    $('.logout-txt').hide()
    $('#movieList').hide()
    $('#add-box').hide();
    $('#edit-box').hide() 
}

// Login Menu
// first menu
$('#loginBtn').click((e) => {
    e.preventDefault()
    $('.login-box').show();
    $('.banner-text').hide();
})
// login Submit
$('input#login').click((e)=>{
    e.preventDefault()
    doLogin()
})

// Register Menu
// first menu
$('#registerBtn').click((e) => {
    registerBtn()
})

// Register Submit
$('#submit-button-register').click((e) => {
    e.preventDefault()
    doRegister()
})

// Register Function
function registerBtn() {
    e.preventDefault()
    $('#register-box').show();
    $('.banner-text').hide();
    $('#movieList').hide();
    $('#banner').show();
    $('#menuBtn').show();
    $('.login-box').hide();
    $('.logout-txt').hide()
    $('#add-box').hide();     
}

//Movie List
$('.movie-list').click((e) => {
    if(localStorage.getItem("access_token")) {
        e.preventDefault()
        $('#movieList').show()
        $('.banner-text').hide();
        $('#add-box').hide()
        $('#menuBtn').show();
        $('.login-box').hide();
        $('#register-box').hide(); 
        $('.logout-txt').show()
        $('#edit-box').hide()
        getDataMovies()
    } else {
        $('#movieList').show();
        $('#banner').show();
        $('#menuBtn').show();
        $('.login-box').hide();
        $('#register-box').hide(); 
        $('.logout-txt').hide()
        $('#movieList').hide()
        $('#add-box').hide();     
    }
})    
 

$('.movie-add').click((e) => {
    if(localStorage.getItem("access_token")) {
        e.preventDefault()
        $('#add-box').show()
        $('.banner-text').hide();
        $('#movieList').hide();
        $('#menuBtn').hide();
        $('.login-box').hide();
        $('#register-box').hide(); 
        $('.logout-txt').show()
        $('#movieList').hide()
    } else {
        $('#movieList').show();
        $('#banner').show();
        $('#menuBtn').show();
        $('.login-box').hide();
        $('#register-box').hide(); 
        $('.logout-txt').hide()
        $('#movieList').hide()
        $('#add-box').hide();     
    }
})


$('.logout-txt').click((e) => {
    doLogout()
})

function doLogout() {
    localStorage.clear();
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    });
    $('#movieList').hide();
    $('#banner').show();
    $('#menuBtn').show();
    $('.login-box').hide();
    $('#register-box').hide(); 
    $('.logout-txt').hide()
    $('#movieList').hide()
    $('#add-box').hide(); 
}

$('#addMovieForm').submit((e) => {
    e.preventDefault()
    // console.log(e);
    let dataPost = new FormData(document.getElementById("addMovieForm"))
    // console.log(dataPost);
    const token = localStorage.getItem("access_token")
    $.ajax({
    method: "POST",
    url: `http://localhost:3000/movies`,
    data : dataPost,
    processData: false,
    contentType: false,
    beforeSend: function(request) { // set request header
        request.setRequestHeader("access_token", token);
        }
    })
    .done(data=>{
        // console.log(data);
        swal("Success!!", "Login Success");
        // getDataMovies()
        $('#banner').hide();
        // $('#add-box').hide(); 
        $('#movieList').show();
    })
    .fail((err)=>{
        // console.log(err);
        swal("Oops!!", "please check your input");
    })
})

function doLogin() {
        let email = $('#loginForm #email').val();
        let password = $('#loginForm #password').val();  
        $.ajax({
           type: "POST",
           url: `http://localhost:3000/login`,
           data: {
               email: email,
               password: password
           }
        })
        .done(data =>{
            swal("Success!!", "Login Success");
            localStorage.setItem('access_token', data)
            $('#banner').show();
            $('.banner-text').show()
            $('#menuBtn').show();
            $('.login-box').hide();
            $('#register-box').hide(); 
            $('.logout-txt').show()
            $('#movieList').hide()
            $('#add-box').hide(); 
            $('.banner-btn').hide();     
            $('#loginForm').hide();
            $('.logout-txt').show()
        })
        .fail(function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR.responseJSON.message);
            swal("Oops!!", jqXHR.responseJSON.message);
        })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'POST',
        url: `${baseUrl}/glogin`,
        data: {
            id_token
        }
    })
    .done((response) => {
        // console.log(response);
        swal("Success!!", "Login Success");
        localStorage.setItem("access_token", response)
        $('#banner').show();
        $('.banner-text').show()
        $('#menuBtn').show();
        $('.login-box').hide();
        $('#register-box').hide(); 
        $('.logout-txt').show()
        $('#movieList').hide()
        $('#add-box').hide(); 
        $('.banner-btn').hide();     
        $('#loginForm').hide();
        $('.logout-txt').show()

    })
    .fail((err) => {
        swal("Oops!!", err.responseJSON.message);
    })

  }

function doRegister() {
    let username = $("#username-register").val();
    let email = $("#email-register").val();
    let password = $("#password-register").val();
    let phoneNumber = $("#phoneNumber-register").val();
    let address = $("#address-register").val();
    $.ajax({
      url: `http://localhost:3000/register`,
      method: 'POST',
      data : {
        username,
        email,
        password,
        phoneNumber,
        address
      }
    })
    .done((response) =>{
        swal("Success!!", "Register Success");
        $('#register-box').hide();
        $('.login-box').show(); 
    })
    .fail((err)=>{
      swal("Oops!!", "You Should Complete Your Registration");
    })
}

function getDataMovies () {
    const token = localStorage.getItem("access_token")
    $.ajax({
        method: "GET",
        beforeSend: function(request) { // set request header
         request.setRequestHeader("access_token", token);
    },
        url: `http://localhost:3000/movies`
    })
    .done((response)=>{
        renderMovies(response)
      })
      .fail((err)=>{
        swal("Oops!!", err.responseJSON.message);
    })    
}

function renderMovies (value) {
    const movie = value.map(e => {
        console.log(e.id)
        let html = `
      <tr>
        <td>${e.title}</td>
        <td>${e.synopsis}</td>
        <td><a target="_blank" href="${e.trailerUrl}">Click here </a></td>
        <td>
            <img src="${e.imgUrl}" width="250" height="127.5">
        </td>
        <td>${e.rating}</td> 
        <td id = "actionTab">
        <a class = "btn btn-danger" id = "${e.id}" onClick="editMovie(${e.id})"> Edit </a>
        <a class = "btn btn-danger" id = "${e.id}" onClick="deleteMovie(${e.id})"> Delete </a>
      <td>
      </tr>`
    html = html
    return html
    })
    $('#movies-list').empty(); 
    $('#movies-list').append(movie)
}

// Edit Movies
let editNumb
function editMovie(params) {
    editNumb = params
    const token = localStorage.getItem("access_token")
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/movies/${params}`,
        beforeSend: function(request) { // set request header
            request.setRequestHeader("access_token", token);
        }
    })
    .done(response => {
        // console.log(token);
        // console.log(response);
        $("#edit-title").val(`${response.title}`)
        $("#edit-synopsis").val(`${response.synopsis}`)
        $("#edit-trailerUrl").val(`${response.trailerUrl}`)
        $("#edit-rating").val(`${response.rating}`)
        $('#movieList').hide()
        $('#edit-box').show()
    })
    .fail(err => {
        swal("Oops", err.responseJSON.message)
    })
}

$('#editMovieForm').submit((e) => {
    e.preventDefault()
    let dataPost = new FormData(document.getElementById("editMovieForm"))
    console.log(dataPost);
    const token = localStorage.getItem("access_token")
    $.ajax({
        method: "PUT",
        url: `${baseUrl}/movies/${editNumb}`,
        data : dataPost,
        processData: false,
        contentType: false,
        beforeSend: function(request) { // set request header
            request.setRequestHeader("access_token", token);
        }
    })
    .done(data=>{
        // console.log(data);
        swal("Success!!", "Edit Success");
        // getDataMovies()
        $('#banner').hide();
        // $('#add-box').hide(); 
        $('#movieList').show();
    })
    .fail((err)=>{
        // console.log(err);
        swal("Oops!!", "please check your input");
    })
    
})

// Delete Click
function deleteMovie(params) {
    const token = localStorage.getItem("access_token")
    $.ajax({
        method: 'DELETE',
        url: `${baseUrl}/movies/${params}`,
        beforeSend: function(request) { // set request header
            request.setRequestHeader("access_token", token);
        }
    })
    .done((response) => {
        getDataMovies()
    })
    .fail((err) => {
        swal("Oops", err.responseJSON.message)
    })
}


