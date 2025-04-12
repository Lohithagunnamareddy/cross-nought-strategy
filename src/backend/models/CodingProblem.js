
// backend/models/CodingProblem.js
const mongoose = require('mongoose');

const CodingProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  examples: [{
    input: String,
    output: String,
    explanation: String
  }],
  constraints: {
    type: [String],
    default: []
  },
  starterCode: {
    javascript: String,
    python: String,
    java: String,
    cpp: String
  },
  testCases: [{
    input: String,
    output: String,
    isHidden: {
      type: Boolean,
      default: false
    }
  }],
  timeLimit: {
    type: Number, // in milliseconds
    default: 5000
  },
  memoryLimit: {
    type: Number, // in MB
    default: 16
  },
  track: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CodingTrack',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CodingProblem', CodingProblemSchema);
