const sendChatButton = document.getElementById('send-chat');
const chatInput = document.getElementById('chat-input');
const chatContainer = document.getElementById('chat-container');

let chatHistory = [];

// Send chat message
sendChatButton.addEventListener('click', () => {
    const message = chatInput.value;
    if (message) {
        chatHistory.push({ sender: 'User', message: message, timestamp: new Date() });
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
    if (keywords.includes('joke')) {
        return getRandomJoke();
    }
    return `You mentioned ${keywords.join(', ')}. That's interesting! Tell me more.`;
}

// Extract keywords from message
function extractKeywords(message) {
    // Simple keyword extraction for demonstration purposes
    const words = message.split(' ');
    return words.filter(word => word.length > 3);
}

// Get a random joke from the list
function getRandomJoke() {
    const jokes = [
        "Why don't scientists trust atoms? Because they make up everything!",
        "What do you get when you cross a snowman and a vampire? Frostbite!",
        "Why did the scarecrow win an award? Because he was outstanding in his field!",
        "Why don't skeletons fight each other? They don't have the guts.",
        "What do you call fake spaghetti? An impasta!",
        "Why did the math book look sad? Because it had too many problems.",
        "Why was the math book unhappy? It had too many problems.",
        "Why don't programmers like nature? It has too many bugs.",
        "How do you organize a space party? You planet.",
        "What do you call cheese that isn't yours? Nacho cheese."
    ];
    return jokes[Math.floor(Math.random() * jokes.length)];
}

displayChat();
