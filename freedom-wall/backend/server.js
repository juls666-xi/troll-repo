const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const Message = require('./models/Message');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/freedom-wall';

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// GET /api/messages - Returns all messages sorted by newest first
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(50);
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// POST /api/messages - Creates a new message
app.post('/api/messages', async (req, res) => {
  try {
    const { text } = req.body;

    // Validation
    if (!text || text.trim() === '') {
      return res.status(400).json({ error: 'Message text is required' });
    }

    if (text.length > 100) {
      return res.status(400).json({ error: 'Message cannot exceed 100 characters' });
    }

    // Create and save new message
    const newMessage = new Message({ text: text.trim() });
    await newMessage.save();

    // Check if total messages exceed 50 and delete oldest if necessary
    const messageCount = await Message.countDocuments();
    if (messageCount > 50) {
      // Find and delete the oldest message
      const oldestMessage = await Message.findOne().sort({ createdAt: 1 });
      if (oldestMessage) {
        await Message.findByIdAndDelete(oldestMessage._id);
        console.log('Deleted oldest message:', oldestMessage._id);
      }
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error('Error creating message:', error);
    res.status(500).json({ error: 'Failed to create message' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});
