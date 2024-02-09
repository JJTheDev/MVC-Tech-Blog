document.querySelector('.comment-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const commentBody = document.querySelector('textarea[name="comment-body"]').value.trim();
    const postId = document.querySelector('input[name="post-id"]').value;

    if (commentBody) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                body: commentBody
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to submit comment');
        }
    }
});
