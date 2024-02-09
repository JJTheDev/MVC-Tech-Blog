// Get a reference to the signup form
const signupForm = document.querySelector('#signup-form');

// Define the signup handler
const signupHandler = async (event) => {
    event.preventDefault();

    // Get the username, email and password from form fields
    const username = document.querySelector('input[name="username"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
    });

    if (response.ok) {
        // Redirect to the dashboard after a successful signup
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

// Add the event listener to the signup form if it exists
if(signupForm) {
    signupForm.addEventListener('submit', signupHandler);
}
