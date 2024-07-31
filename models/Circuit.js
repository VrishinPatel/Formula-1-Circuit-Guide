const mongoose = require('mongoose');

const CircuitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  length_km: { type: Number, required: true },
  number_of_turns: { type: Number, required: true },
  track_layout_url: { type: String, required: true },
  historical_significance: { type: String, required: true },
  famous_races: [String]
});

module.exports = mongoose.model('Circuit', CircuitSchema);
