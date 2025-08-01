const chatBox = document.getElementById('chat-box');
const form = document.getElementById('chat-form');
const messageInput = document.getElementById('message');

// Set default theme to light
document.body.classList.add('light-theme');

function toggleTheme() {
  document.body.classList.toggle('light-theme');
  document.body.classList.toggle('dark-theme');
}

// Connect to public WebSocket echo server
const socket = new WebSocket('wss://echo.websocket.events');

socket.addEventListener('message', (event) => {
  if (!event.data.includes('Lob.com')) {
    appendMessage(event.data, 'Server');
  }
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const msg = messageInput.value.trim();
  if (msg && socket.readyState === WebSocket.OPEN) {
    socket.send(msg);
    appendMessage(msg, 'You');
    messageInput.value = '';
  }
});

function appendMessage(msg, sender = 'You') {
  const div = document.createElement('div');
  div.className = 'message';
  div.textContent = `${sender}: ${msg}`;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}
