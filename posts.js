const postButton = document.getElementById('post-button');
const newPostText = document.getElementById('new-post-text');
const postsContainer = document.getElementById('posts-container');

let posts = [];

// Add new post
postButton.addEventListener('click', () => {
    const postText = newPostText.value;
    if (postText) {
        posts.push({ text: postText, timestamp: new Date(), author: 'User' });
        displayPosts();
        newPostText.value = '';
    }
});

// Display posts
function displayPosts() {
    postsContainer.innerHTML = '';
    posts.forEach((post) => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `<strong>${post.author}</strong>: <p>${post.text}</p><small>${post.timestamp.toLocaleString()}</small>`;
        postsContainer.appendChild(postDiv);
    });
}

displayPosts();
