const postTitle = document.querySelector('#title');
const postText = document.querySelector('#text');
const postCreate = document.querySelector('#createPost');
const postCancel = document.querySelector('#cancelPost');
const postUpdate = document.querySelector('#updatePost');
const postDelete = document.querySelector('#deletePost');

const createPost = async (event) => {
    const title = postTitle.value;
    const text = postText.value;
    event.preventDefault();
    if(title.length > 0 && text.length > 0) {
        const response = await fetch('/dashboard/post', {
            method: "POST",
            body: JSON.stringify({ title, text }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {document.location.replace('/dashboard')
        }else{alert('Failed to create Post');
        }
    }
}

const cancelPost = async (event) => {
    event.preventDefault();
    document.location.replace('/dashboard');
}

const updatePost = async (event) => {
    event.preventDefault();
    const title = postTitle.value;
    const text = postText.value;
    console.log(title);
    console.log(text);
    if (title.length > 0 && text.length > 0) {
        const id = document.location.pathname.split('/').at(-1);
        const response = await fetch(`/dashboard/post/${id}`, {
            method: "PUT",
            body: JSON.stringify({ title, text }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) document.location.replace('/dashboard');
        else alert('failed to update post');
    }else {alert('Posts require a title and text');
    }
}

const deletePost = async (event) => {
    event.preventDefault();
    const id = document.location.pathname.split('/').at(-1);
    const response = await fetch(`/dashboard/post/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) document.location.replace('/dashboard');
        else alert('failed to delete post');
}



if (postCreate) {
    postCreate.addEventListener('click', createPost);
    postCancel.addEventListener('click', cancelPost);
} else {
    postUpdate.addEventListener('click', updatePost);
    postDelete.addEventListener('click', deletePost);
}

