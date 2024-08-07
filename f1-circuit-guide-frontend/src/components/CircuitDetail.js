// src/components/CircuitDetail.js
import React from 'react';

const CircuitDetail = ({ circuit }) => {
  if (!circuit) return <div>Loading...</div>;

  return (
    <div>
      <h2>{circuit.name}</h2>
      <p>Location: {circuit.location}</p>
      <p>Length: {circuit.length_km} km</p>
      <p>Type: {circuit.type}</p>
      <p>Turns: {circuit.turns}</p>
      <h3>Lap Record</h3>
      <p>Time: {circuit.lap_record.time}</p>
      <p>Driver: {circuit.lap_record.driver}</p>
      <p>Year: {circuit.lap_record.year}</p>
    </div>
  );
};

export default CircuitDetail;
