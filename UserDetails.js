const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const email = urlParams.get('email')

const curr_user = JSON.parse(localStorage.getItem('registeredUsers'))[email]
var user_name = document.querySelector('.user-details .name span')
var user_email = document.querySelector('.user-details .email span')
var user_password = document.querySelector('.user-details .password span')

user_name.innerText = curr_user.username
user_email.innerText = curr_user.email
user_password.innerText = curr_user.password
