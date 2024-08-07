const mongoose = require('mongoose');

const circuitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  length_km: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  turns: {
    type: Number,
    required: true
  },
  lap_record: {
    time: String,
    driver: String,
    year: Number
  }
});

module.exports = mongoose.model('Circuit', circuitSchema);
