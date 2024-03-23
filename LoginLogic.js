var registeredUsers = {}

var storedData = localStorage.getItem('registeredUsers')
if (storedData) {
    registeredUsers = JSON.parse(storedData)
}else{
    localStorage.setItem('registeredUsers','')
}

window.addEventListener('DOMContentLoaded', ()=>{
    if (document.querySelector('.registration-form form')) {
        const registrationForm = document.querySelector('.registration-form form')
        registrationForm.addEventListener('submit', (event)=>{
            event.preventDefault()
            var username = document.getElementById('username').value
            var email = document.getElementById('email').value
            var password = document.getElementById('password').value
            
            if (registeredUsers[email]) {
                alert('this email is alredy present')
            }else{
                var newUser = {
                    username: username,
                    email: email,
                    password: password
                }
                registeredUsers[email] = newUser
                localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
                registrationForm.reset()
                console.log('users: ',registeredUsers)
            }
        })
    }
    if(document.querySelector('.registration-form form')){
        const loginForm = document.querySelector('.login-form form')
        loginForm.addEventListener('submit',(event)=>{
            event.preventDefault()
            var email = document.getElementById('email1').value
            console.log(email)
            var password = document.getElementById('password1').value
            
            if (registeredUsers[email]) {
                if (registeredUsers[email].password == password) {
                    window.location.href = "UserOnlineText.html?email="+ encodeURIComponent(email)
                }else{
                    alert('password is wrong')
                }
            }else{
                alert('email is not present')
            }
        })
    }
})
