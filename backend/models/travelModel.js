// models/travelModel.js
const mongoose = require('mongoose');

const TravelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  budget: {
    type: Number
  },
  participants: {
    type: [String],  
  },
  description: {
    type: String,  
    required: true  
  },
  notes: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Travel', TravelSchema);

