const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const mongoose = require('mongoose');
const app = express();

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/chat', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define message schema and model
const messageSchema = new mongoose.Schema({
  content: String,
  timestamp: { type: Date, default: Date.now }
});
const Message = mongoose.model('messages', messageSchema);

// Create an HTTP server and pass the express app to it
const server = http.createServer(app);

// Initialize Socket.IO with the HTTP server
const io = new Server(server);

// Serve main.html
app.get('/main', (req, res) => {
    res.sendFile('C:\\Users\\HADITH\\Desktop\\MERN stack\\chat_app\\public\\main.html');
});

// Handle socket connection
io.on('connection', async (socket) => {
    console.log('A user connected');

    try {
        // Fetch all messages from the MongoDB collection when a user connects
        const messages = await Message.find().sort({ timestamp: 1 });
        messages.forEach(message => {
            socket.emit('chat message', message.content);
        });
    } catch (err) {
        console.error('Error fetching messages:', err);
    }

    // Listen for new messages and save them to MongoDB
    socket.on('chat message', async (msg) => {
        try {
            const newMessage = new Message({ content: msg });
            await newMessage.save();
            io.emit('chat message', msg); // Broadcast the message to all clients
        } catch (err) {
            console.error('Error saving message:', err);
        }
    });

    // Optional: Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server on port 3012
server.listen(3012, () => {
    console.log('listening on *:3012');
});
