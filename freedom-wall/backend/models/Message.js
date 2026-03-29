const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Message text is required'],
    maxlength: [100, 'Message cannot exceed 100 characters'],
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster sorting by createdAt
messageSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Message', messageSchema);
