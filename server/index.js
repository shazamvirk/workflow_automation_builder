// server/index.js
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Store active WebSocket connections
io.on('connection', (socket) => {
  console.log('⚡ Client connected to Webhook Stream:', socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

// REAL WEBHOOK ENDPOINT
app.post('/api/webhook', (req, res) => {
  const payload = req.body;
  console.log('📦 Incoming Real-World Webhook Received:', payload);

  // Broadcast payload to React frontend in real time
  io.emit('webhook_received', {
    timestamp: new Date().toLocaleTimeString(),
    data: payload,
  });

  return res.status(200).json({
    status: 'success',
    message: 'Webhook payload received and dispatched to canvas.',
    receivedData: payload,
  });
});

const PORT = 4000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Webhook Listener Server running on http://localhost:${PORT}`);
  console.log(`🔗 Send POST requests to: http://localhost:${PORT}/api/webhook`);
});