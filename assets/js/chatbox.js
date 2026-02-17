const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('message-input');

function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '') {
        const newMessage = document.createElement('div');
        newMessage.className = 'message message-sent';
        newMessage.textContent = `You: ${message}`;
        messagesContainer.appendChild(newMessage);

        // Simulating server response
        setTimeout(() => {
            const responseMessage = document.createElement('div');
            responseMessage.className = 'message message-received';
            responseMessage.textContent = `AI: ${generateResponse(message)}`;
            messagesContainer.appendChild(responseMessage);
        }, 1000);

        messageInput.value = '';
        messageInput.focus();
    }
}

function generateResponse(message) {
    // Simple AI response generation
    const responses = [
        "I understand.",
        "Got it!",
        "Certainly!",
        "Okay, got it.",
        "Understood."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

document.getElementById('message-form').addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage();
});

// Close button functionality
const closeBtn = document.getElementById('close-btn');
closeBtn.addEventListener('click', () => {
    const chatboxContainer = document.querySelector('.chatbox-container');
    chatboxContainer.style.display = 'none';
});
