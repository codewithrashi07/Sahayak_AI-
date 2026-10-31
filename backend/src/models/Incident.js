const mongoose = require('mongoose');

const incidentSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  incidentType: {
    type: String,
    enum: ['flood', 'fire', 'earthquake', 'landslide', 'medical', 'accident', 'other'],
    default: 'other',
  },
  location: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'resolved'],
    default: 'open',
  },
  imageUrl: {
    type: String,
  },
  aiSuggestion: {
    category: String,
    severity: String,
    confidence: Number,
  },
  assignedTo: {
    type: String,
  },
  statusHistory: [{
    status: String,
    timestamp: {
      type: Date,
      default: Date.now,
    },
    notes: String,
  }],
  createdBy: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Incident', incidentSchema);
