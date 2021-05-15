const newPostForm = async (event) => {
    event.preventDefault();

    const title = document.getElementById('new-title').value.trim();
    const body = document.getElementById('new-body').value.trim();

    if (title && body) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                body: body,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.new-post-form').addEventListener('submit', newPostForm);