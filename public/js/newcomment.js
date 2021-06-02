const newCommentForm = async (event) => {
    event.preventDefault();

    const comment = document.getElementById('comment-body').value.trim();
    const postId = window.location.pathname.split('/')[2];
    console.log(postId);

    if (comment) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ body: comment, post_id: postId }),
            headers: { 'Content-Type': 'application/json' },
        })

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
};

document.getElementById('comment').addEventListener('submit', newCommentForm);