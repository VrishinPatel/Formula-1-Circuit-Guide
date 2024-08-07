const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const circuitsRoute = require('./routes/circuits');

const app = express();

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

app.use('/api/circuits', circuitsRoute);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
