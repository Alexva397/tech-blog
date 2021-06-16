const deletePost = async (event) => {
  event.preventDefault();
  console.log(event);
    if (event.target.hasAttribute('post-id')) {
        const id = event.target.getAttribute('post-id');

        console.log(id);
    
        const response = await fetch(`/api/post/${id}`, {
          method: 'DELETE',
        });
        
        console.log(response);
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert(response.statusText);
        }
    }
};

const editPost = async (event) => {
  event.preventDefault();

  const hrefString = window.location.toString();
  const id = hrefString.substring(hrefString.lastIndexOf('/') + 1);
    console.log(id);
  const title = document.getElementById('edit-title').value.trim();
  const body = document.getElementById('edit-body').value.trim();

  if ( id && title && body) {
    const response = await fetch(`/api/post/${id}`, {
      method: 'PUT',
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



document.getElementById('delete-button').addEventListener('click', deletePost);
document.querySelector('.edit-form').addEventListener('submit', editPost);