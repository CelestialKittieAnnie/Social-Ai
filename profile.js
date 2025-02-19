const saveProfileButton = document.getElementById('save-profile');
const avatarUpload = document.getElementById('avatar-upload');
const userAvatar = document.getElementById('user-avatar');
const usernameInput = document.getElementById('username-input');
const achievementsList = document.getElementById('achievements-list');

let userProfile = {
    avatar: 'default-avatar.png',
    username: 'User',
    achievements: []
};

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
