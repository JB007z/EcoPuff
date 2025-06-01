const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const errorMessageContainer = document.getElementById('errorMessageContainer');
const successMessageContainer = document.getElementById('successMessageContainer');

// Get references to the loader and main content
const loaderOverlay = document.getElementById('loaderOverlay');
const mainContent = document.getElementById('mainContent'); // The div wrapping your form

// Helper function to display messages
function displayMessage(container, message, isError = true) {
    if (!container) return; 
    container.textContent = message;
    
    if (isError) {
        container.classList.remove('success-message-active'); 
        container.classList.add('error-message-active');   
    } else {
        container.classList.remove('error-message-active');   
        container.classList.add('success-message-active'); 
    }
    container.classList.remove('hidden');

    // Auto-hide message after 4 seconds (if it's still the same message)
    // This is for general messages, the success message before redirect might be handled differently
    const currentMessage = message; // Capture current message for comparison in timeout
    setTimeout(() => {
        if (container.textContent === currentMessage) { // Only hide if the message hasn't changed
            container.classList.add('hidden');
        }
    }, 4000);
}

// Helper function to hide all messages and the loader
function hideAllIndicators() {
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
    if (loaderOverlay) {
        loaderOverlay.classList.add('hidden');
    }
    if (mainContent) { // Ensure main content is visible if loader is hidden
        mainContent.classList.remove('hidden');
    }
}

loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    hideAllIndicators(); // Clear previous messages and hide loader initially

    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email ||!password) {
        displayMessage(errorMessageContainer, 'All fields must be filled');
        return;
    }

    // Show loader and hide main content before making the API call
    if (mainContent) mainContent.classList.add('hidden');
    if (loaderOverlay) loaderOverlay.classList.remove('hidden');


    try {
        const response = await axios.post('/api/v1/auth/login',{email, password});
        const token = response.data.token;
        
        localStorage.setItem('token', token);

        console.log("User Logged in, token stored. Redirecting soon...");

        setTimeout(() => {
           
            window.location.replace('index.html'); 
        }, 1500); // Redirect after 1.5 seconds to allow loader to be visible

    } catch (error) {
        console.log(error);
        hideAllIndicators(); // Hide loader and ensure main content is back
        if (mainContent) mainContent.classList.remove('hidden'); // Show form again

        if (error.response && error.response.data && error.response.data.msg) {
            displayMessage(errorMessageContainer, error.response.data.msg);
        } else if (error.request) {
            displayMessage(errorMessageContainer, "Network error. Could not connect to the server.");
        } else {
            displayMessage(errorMessageContainer, "An unexpected error occurred.");
        }
    }
});




