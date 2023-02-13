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
        const response = await fetch('dashboard/post', {
            method: "POST",
            body: JSON.stringify({ title, text }),
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {document.location.replace('/dashboard')
        }else{alert('Failed to create Post');
        }
    }
}

postCreate.addEventListener('click', createPost);