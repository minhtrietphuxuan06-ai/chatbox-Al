const API_KEY = 'sk-...'; // Thay bằng API key thật của bạn

async function sendMessage() {
    const input = document.getElementById('user-input');
    const chatBox = document.getElementById('chat-box');
    const message = input.value.trim();
    
    if (!message) return;

    // Hiển thị tin nhắn user
    chatBox.innerHTML += `<div class="message user">${message}</div>`;
    input.value = '';

    // Gọi API OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",  // hoặc gpt-3.5-turbo
            messages: [{ role: "user", content: message }]
        })
    });

    const data = await response.json();
    const botReply = data.choices[0].message.content;

    chatBox.innerHTML += `<div class="message bot">${botReply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}
