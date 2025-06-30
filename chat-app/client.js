const socket = io();
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

// Generate a random ID for this client
const clientId = Math.random().toString(36).substring(2, 10);

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const msg = input.value.trim();
  if (msg) {
    socket.emit('chat message', { text: msg, id: clientId });
    input.value = '';
  }
});

socket.on('chat message', function (msg) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message');
  messageDiv.classList.add(msg.id === clientId ? 'self' : 'other');
  messageDiv.textContent = msg.text;
  messages.appendChild(messageDiv);
  messages.scrollTop = messages.scrollHeight;
});
