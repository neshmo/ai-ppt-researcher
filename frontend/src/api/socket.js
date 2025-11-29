// src/api/socket.js

export function connectWebSocket() {
    return new WebSocket("ws://localhost:8000/ws/progress");
}
