const express = require('express');
const app = express();
const dotenv = require('dotenv');
const { connectDB } = require('./db/dbConnection');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const indexRouter = require('./src/routes/index.js');
const Message = require('./src/models/mesagge.js');
const { Server } = require('socket.io');
const http = require('http');
const cors = require('cors');

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// Routes
app.use('/', indexRouter);

// Base route
app.get('/', (req, res) => {
    res.send('Dating App Backend is running :)');
});

// Create HTTP server for WebSocket
const server = http.createServer(app);

// WebSocket setup
const io = new Server(server, {
    cors: {
        origin: '*', // Adjust this for your frontend origin
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
});

// WebSocket event handling
io.on('connection', (socket) => {
    console.log('New WebSocket connection:', socket.id);

    // Listen for chat messages
    socket.on('sendMessage', async (data) => {
        const { matchId, senderId, message } = data;
        console.log('Message received:', data);

        // Save the message to the database
        const newMessage = await Message.create({ matchId, senderId, message });

        // Broadcast the message to all connected clients in the same match
        io.to(matchId).emit('receiveMessage', newMessage);
    });

    // Join a match chat room
    socket.on('joinMatch', (matchId) => {
        socket.join(matchId);
        console.log(`Socket ${socket.id} joined match ${matchId}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
