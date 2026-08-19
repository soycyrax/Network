function getCookie(name) {
    let cookieValue = null;

    // Django requires the CSRF token on POST requests made with fetch.
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");

        for (let cookie of cookies) {
            cookie = cookie.trim();

            if (cookie.startsWith(name + "=")) {
                cookieValue = decodeURIComponent(
                    cookie.substring(name.length + 1)
                );
                break;
            }
        }
    }

    return cookieValue;
}

document.addEventListener('DOMContentLoaded', function () {
    // Attach edit behavior to every Edit button rendered on the feed.
    document.querySelectorAll('.edit').forEach(button => {

        // Each post element stores its database ID in data-post-id.
        const container = button.closest(".post")
        const postId = container.dataset.postId;

        button.addEventListener('click', () => {

            const post = container.querySelector('p');
            const value = post.textContent;

            // Create editing div
            const editDiv = document.createElement('div');
            editDiv.classList.add('edit-container');

            // Create textarea
            const textarea = document.createElement('textarea');
            textarea.value = value;
            textarea.classList.add('form-control');

            // Create Save button
            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            saveButton.classList.add('btn', 'btn-primary');

            // Create Cancel button
            const cancelButton = document.createElement('button');
            cancelButton.textContent = 'Cancel';
            cancelButton.classList.add('btn', 'btn-danger');

            // Create button div for styling 
            const buttonDiv = document.createElement('div');
            buttonDiv.classList.add('edit-buttons');

            buttonDiv.append(saveButton);
            buttonDiv.append(cancelButton);

            // Put textarea and button div inside the editing div
            editDiv.append(textarea);
            editDiv.append(buttonDiv);

            // Replace post with editing div
            post.replaceWith(editDiv);

            // Hide Like/Edit controls
            container.querySelector('.container1').classList.add('hidden');

            // Focus textarea
            textarea.focus();

            cancelButton.addEventListener('click', () => {

                const originalParagraph = document.createElement("p");
                originalParagraph.textContent = value;

                editDiv.replaceWith(originalParagraph);

                container.querySelector('.container1').classList.remove('hidden');
            });

            saveButton.addEventListener('click', () => {

                const textarea = container.querySelector("textarea");
                const newContent = textarea.value

                // Send the updated content to Django without refreshing the page.
                fetch(`/edit/${postId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "X-CSRFToken": getCookie("csrftoken")
                    },
                    body: JSON.stringify({
                        content: newContent
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            // Replace the textarea with normal post text after Django saves it.
                            const newParagraph = document.createElement("p");
                            newParagraph.textContent = newContent;

                            textarea.replaceWith(newParagraph);

                            container.querySelector('.container1').classList.remove('hidden');
                            saveButton.style.display = 'none'
                            cancelButton.style.display = 'none'
                        }
                    });

            });
        });

    });

    document.querySelectorAll('.like').forEach(button => {

        const container = button.closest(".post")
        const postId = container.dataset.postId;

        button.addEventListener('click', () => {

            fetch(`/like/${postId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie("csrftoken")
                }
            })

                .then(response => {
                    if (response.redirected) {
                        window.location.href = response.url;
                        return;
                    }
                    return response.json();
                })
                .then(data => {
                    if (!data) return;
                    const likebutton = container.querySelector('.like')
                    const likeCount = container.querySelector(".like-count");

                    if (data.like_exists) {

                        likebutton.textContent = 'Unlike'
                    }
                    else {

                        likebutton.textContent = 'Like'
                    }
                    likeCount.textContent = data.like_count;
                });
              
        });
    });

});
