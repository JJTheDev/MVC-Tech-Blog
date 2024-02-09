// Get a reference to the login form
const loginForm = document.querySelector('#login-form');

// Define the login handler
const loginHandler = async (event) => {
    event.preventDefault();

    // Get the username and password from form fields
    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });

    if (response.ok) {
        // Redirect to the dashboard after a successful login
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

// Add the event listener to the login form if it exists
if(loginForm) {
    loginForm.addEventListener('submit', loginHandler);
}
