// Get a reference to the new post form
const newPostForm = document.querySelector('#new-post-form');

// Define the new post handler
const newPostHandler = async (event) => {
    event.preventDefault();

    // Get the title and content from form fields
    const title = document.querySelector('input[name="post-title"]').value;
    const content = document.querySelector('textarea[name="post-content"]').value;

    const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content })
    });

    if (response.ok) {
        // Redirect to the dashboard after a successful post creation
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

// Add the event listener to the new post form if it exists
if(newPostForm) {
    newPostForm.addEventListener('submit', newPostHandler);
}
