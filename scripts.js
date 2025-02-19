document.addEventListener('DOMContentLoaded', () => {
    const avatarUpload = document.getElementById('avatar-upload');
    const userAvatar = document.getElementById('user-avatar');
    const usernameInput = document.getElementById('username');
    const saveProfileButton = document.getElementById('save-profile');
    const achievementsList = document.getElementById('achievements-list');
    const postsContainer = document.getElementById('posts-container');
    const newPostText = document.getElementById('new-post-text');
    const postButton = document.getElementById('post-button');
    const chatContainer = document.getElementById('chat-container');
    const chatInput = document.getElementById('chat-input');
    const sendChatButton = document.getElementById('send-chat');

    let userProfile = {
        avatar: 'default-avatar.png',
        username: 'User',
        achievements: []
    };

    let posts = [];
    let chatHistory = [];
    let aiFriends = [
        { name: 'AI Friend 1', messages: [] },
        { name: 'AI Friend 2', messages: [] }
    ];

    // Load profile from local storage
    if (localStorage.getItem('userProfile')) {
        userProfile = JSON.parse(localStorage.getItem('userProfile'));
        userAvatar.src = userProfile.avatar;
        usernameInput.value = userProfile.username;
        displayAchievements();
    }

    // Save profile to local storage
    saveProfileButton.addEventListener('click', () => {
        userProfile.username = usernameInput.value || 'User';
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        alert('Profile saved!');
    });

    // Upload avatar
    avatarUpload.addEventListener('change', (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            userProfile.avatar = reader.result;
            userAvatar.src = reader.result;
        };
        reader.readAsDataURL(event.target.files[0]);
    });

    // Display achievements
    function displayAchievements() {
        achievementsList.innerHTML = '';
        userProfile.achievements.forEach((achievement) => {
            const li = document.createElement('li');
            li.textContent = achievement;
            achievementsList.appendChild(li);
        });
    }

    // Add new post
    postButton.addEventListener('click', () => {
        const postText = newPostText.value;
        if (postText) {
            posts.push({ text: postText, timestamp: new Date(), author: userProfile.username });
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

    // Send chat message
    sendChatButton.addEventListener('click', () => {
        const message = chatInput.value;
        if (message) {
            chatHistory.push({ sender: userProfile.username, message: message, timestamp: new Date() });
            chatInput.value = '';
            displayChat();
            // Simulate AI response
            setTimeout(() => {
                const aiResponse = generateAIResponse(message);
                chatHistory.push({ sender: 'AI Friend', message: aiResponse, timestamp: new Date() });
                displayChat();
            }, 1000);
        }
    });

    // Display chat messages
    function displayChat() {
        chatContainer.innerHTML = '';
        chatHistory.forEach((chat) => {
            const chatDiv = document.createElement('div');
            chatDiv.classList.add('chat-message');
            chatDiv.innerHTML = `<strong>${chat.sender}:</strong> ${chat.message} <small>${chat.timestamp.toLocaleString()}</small>`;
            chatContainer.appendChild(chatDiv);
        });
    }

    // Generate AI response
    function generateAIResponse(message) {
        const keywords = extractKeywords(message);
        return `You mentioned ${keywords.join(', ')}. That's interesting! Tell me more.`;
    }

    // Extract keywords from message
    function extractKeywords(message) {
        // Simple keyword extraction for demonstration purposes
        const words = message.split(' ');
        return words.filter(word => word.length > 3);
    }

    displayPosts();
    displayChat();
});