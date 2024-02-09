// Get a reference to the edit button and the post ID
const editButton = document.querySelector('#edit-post-btn');
const postId = document.querySelector('input[name="post-id"]').value;

// Define the edit handler
const editHandler = async () => {
    // Get the new post content from a form field
    const newContent = document.querySelector('textarea[name="new-content"]').value;

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: newContent })
    });

    if (response.ok) {
        // Redirect to the dashboard after a successful edit
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
};

// Add the event listener to the edit button if it exists
if(editButton) {
    editButton.addEventListener('click', editHandler);
}
