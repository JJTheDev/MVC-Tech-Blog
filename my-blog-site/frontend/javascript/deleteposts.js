// Define a function to get the post ID
function getPostId() {
    return document.querySelector('input[name="post-id"]').value;
}

// Define a function to delete the post
async function deletePost(postId) {
    const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

// Add the event listener to the delete button
document.querySelector('#del-post-btn').addEventListener('click', function() {
    const postId = getPostId();
    deletePost(postId);
});
