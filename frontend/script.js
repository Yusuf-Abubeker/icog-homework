document.addEventListener('DOMContentLoaded', function() {
    const commentsList = document.getElementById('comments-list');
    const addCommentBtn = document.getElementById('add-comment-btn');
    const modal = document.getElementById('comment-modal');
    const modalContent = document.querySelector('.modal-content');
    const ROOT_API = 'http://localhost:5000';

    // Fetch and display comments when the page loads
    fetchComments();

    // Event listener for Add Comment button to open the modal
    addCommentBtn.addEventListener('click', function() {
        openModal(null); // Opens modal for adding a new comment
    });

    // Function to fetch comments from the backend API
    function fetchComments() {
        fetch(`${ROOT_API}/comments`)
            .then(response => response.json())
            .then(data => {
                renderComments(data); // Render fetched comments in the UI
            })
            .catch(error => console.error('Error fetching comments:', error));
    }

    // Function to render comments in the UI
    function renderComments(comments) {
        commentsList.innerHTML = '';
        comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            commentElement.innerHTML = `
                <p><strong>Comment:</strong> ${comment.comment}</p>
                <p><strong>Primary Category:</strong> ${comment.primary_category}</p>
                <p><strong>Secondary Category:</strong> ${comment.secondary_category}</p>
                <p><strong>Tertiary Category:</strong> ${comment.tertiary_category}</p>
                <button class="edit-btn" data-comment-id="${comment.comment_id}">Edit</button>
                <button class="delete-btn" data-comment-id="${comment.comment_id}">Delete</button>
            `;
            commentsList.appendChild(commentElement);

            // Add event listeners for edit and delete buttons
            commentElement.querySelector('.edit-btn').addEventListener('click', function() {
                openModal(comment); // Opens modal for editing a comment
            });

            commentElement.querySelector('.delete-btn').addEventListener('click', function() {
                deleteComment(comment.comment_id); // Deletes the comment
            });
        });
    }

    // Function to open modal for adding/editing comments
    function openModal(comment) {
        modal.style.display = 'block';
        modalContent.innerHTML = `
            <form id="comment-form">
                <input type="hidden" id="commentId" name="comment_id" value="${comment ? comment.comment_id : ''}">
                <label for="comment">Comment:</label><br>
                <textarea id="comment" name="comment">${comment ? comment.comment : ''}</textarea><br>
                <label for="category">Primary Category:</label>
                <input type="text" id="category" name="primary_category" value="${comment ? comment.primary_category : ''}"><br>
                <label for="secondary_category">Secondary Category:</label>
                <input type="text" id="secondary_category" name="secondary_category" value="${comment ? comment.secondary_category : ''}"><br>
                <label for="tertiary_category">Tertiary Category:</label>
                <input type="text" id="tertiary_category" name="tertiary_category" value="${comment ? comment.tertiary_category : ''}"><br>
                <button type="submit">Save</button>
            </form>
        `;

        // Event listener for form submission inside the modal
        modalContent.querySelector('#comment-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            const commentId = formObject['comment_id'];
            const method = commentId ? 'PUT' : 'POST';
            const url = commentId ? `${ROOT_API}/comments/${commentId}` : `${ROOT_API}/comments`;

            fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formObject)
            })
            .then(response => response.json())
            .then(data => {
                closeModal(); // Close modal after successful save
                fetchComments(); // Refresh comments after saving
            })
            .catch(error => console.error('Error saving comment:', error));
        });
    }

    // Event listener for closing the modal by clicking outside it
    modal.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal();
        }
    });

    // Function to close the modal
    function closeModal() {
        modal.style.display = 'none';
    }

    // Function to delete a comment
    function deleteComment(commentId) {
        if (confirm("Are you sure you want to delete this comment?")) {
            fetch(`${ROOT_API}/comments/${commentId}`, {
                method: 'DELETE'
            })
            .then(response => {
                fetchComments(); // Refresh comments after deletion
            })
            .catch(error => console.error('Error deleting comment:', error));
        }
    }
});
