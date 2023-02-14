const commentText = document.querySelector("#comment");

postComment = async (event) => {
    event.preventDefault();
    const text = commentText.value;
    if (text.length > 0) {
        const post_id = document.location.pathname.split("/")[2];
        const response = await fetch("/api/comments/", {
            method: "POST",
            body: JSON.stringify({ text, post_id }),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert("Comment could not be saved to the post");
        }
    }
}

document.querySelector("#postComment").addEventListener("click", postCommentHandler);