const express = require('express');
const Circuit = require('../models/Circuit');  // Correct spelling here
const router = express.Router();

// Get all circuits
router.get('/', async (req, res) => {
  try {
    const circuits = await Circuit.find();
    res.json(circuits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new circuit
router.post('/', async (req, res) => {
  const circuit = new Circuit({
    name: req.body.name,
    location: req.body.location,
    length_km: req.body.length_km,
    number_of_turns: req.body.number_of_turns,
    track_layout_url: req.body.track_layout_url,
    historical_significance: req.body.historical_significance,
    famous_races: req.body.famous_races
  });
  try {
    const newCircuit = await circuit.save();
    res.status(201).json(newCircuit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a circuit by ID
router.get('/:id', getCircuit, (req, res) => {
  res.json(res.circuit);
});

// Middleware function to get a circuit by ID
async function getCircuit(req, res, next) {
  let circuit;
  try {
    circuit = await Circuit.findById(req.params.id);
    if (circuit == null) {
      return res.status(404).json({ message: 'Cannot find circuit' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.circuit = circuit;
  next();
}

module.exports = router;
