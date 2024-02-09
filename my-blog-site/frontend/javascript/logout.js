// Get a reference to the logout button
const logoutButton = document.querySelector('#logout-btn');

// Define the logout handler
const logoutHandler = async () => {
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    if (response.ok) {
        // Redirect to the login page after a successful logout
        document.location.replace('/login');
    } else {
        alert(response.statusText);
    }
};

// Add the event listener to the logout button if it exists
if(logoutButton) {
    logoutButton.addEventListener('click', logoutHandler);
}
