const registerForm = document.getElementById('registerForm')
const usernameInput = document.getElementById('username')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')
const errorMessageContainer = document.getElementById('errorMessageContainer');
const successMessageContainer = document.getElementById('successMessageContainer');

// Helper function to display messages
function displayMessage(container, message, isError = true) {
    if (!container) return; // Guard clause if container is not found
    container.textContent = message;
    // Tailwind classes for styling are primarily in auth-style.css
    // We just ensure the correct specific error/success class is applied if needed,
    // and manage visibility.
    if (isError) {
        container.classList.remove('success-message-active'); // Ensure no success styles
        container.classList.add('error-message-active');   // Add error specific styles
    } else {
        container.classList.remove('error-message-active');   // Ensure no error styles
        container.classList.add('success-message-active'); // Add success specific styles
    }
    container.classList.remove('hidden');
}

// Helper function to hide messages
function hideMessages() {
    if (errorMessageContainer) {
        errorMessageContainer.classList.add('hidden');
        errorMessageContainer.classList.remove('error-message-active');
        errorMessageContainer.textContent = '';
    }
    if (successMessageContainer) {
        successMessageContainer.classList.add('hidden');
        successMessageContainer.classList.remove('success-message-active');
        successMessageContainer.textContent = '';
    }
}
registerForm.addEventListener('submit',async function(e){
    e.preventDefault()
    const username = usernameInput.value
    const email = emailInput.value
    const password = passwordInput.value
    if(!username||!email||!password){
        displayMessage(errorMessageContainer,'All fields must be filled')
    }
    const response = await axios.post('/api/v1/auth/register',{username,email,password})


})




