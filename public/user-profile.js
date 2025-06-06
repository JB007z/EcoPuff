const usernameDOM = document.getElementById('username')
const emailDOM = document.getElementById('email')
const token = localStorage.getItem('token')
if(!token){
    window.location.replace('login-required.html')
}
const decodedToken = jwt_decode(token)


addEventListener('DOMContentLoaded',async()=>{
    usernameDOM.textContent = decodedToken.username
    emailDOM.textContent = decodedToken.email
})