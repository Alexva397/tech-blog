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

document.getElementById('delete-button').addEventListener('click', deletePost);