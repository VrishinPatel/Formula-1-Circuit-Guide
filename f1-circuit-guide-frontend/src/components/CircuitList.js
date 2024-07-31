import React, { useEffect, useState } from 'react';
import { getCircuits } from '../api';
import './CircuitList.css';

const CircuitList = () => {
  const [circuits, setCircuits] = useState([]);
  const [selectedCircuit, setSelectedCircuit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCircuits();
        console.log('Fetched Circuits:', data);
        setCircuits(data);
      } catch (error) {
        console.error('Error fetching circuits:', error);
      }
    };

    fetchData();
  }, []);

  const handleCircuitClick = (circuit) => {
    setSelectedCircuit(circuit);
  };

  const handleBackClick = () => {
    setSelectedCircuit(null);
  };

  return (
    <div className="circuit-list">
      {selectedCircuit ? (
        <div className="circuit-detail">
          <button onClick={handleBackClick} className="back-button">Back to List</button>
          <h2>{selectedCircuit.name}</h2>
          <p>Location: {selectedCircuit.location}</p>
          <p>Length: {selectedCircuit.length_km} km</p>
          <p>Type: {selectedCircuit.type}</p>
          <p>Turns: {selectedCircuit.turns}</p>
          <h3>Lap Record</h3>
          <p>Time: {selectedCircuit.lap_record.time}</p>
          <p>Driver: {selectedCircuit.lap_record.driver}</p>
          <p>Year: {selectedCircuit.lap_record.year}</p>
          <h3>History</h3>
          <p>{selectedCircuit.history}</p>
          <img src={selectedCircuit.track_layout_url} alt={`${selectedCircuit.name} layout`} className="track-layout" />
          {selectedCircuit.additional_images && selectedCircuit.additional_images.map((img, index) => (
            <img key={index} src={img} alt={`${selectedCircuit.name} additional view ${index + 1}`} className="additional-image" />
          ))}
        </div>
      ) : (
        <>
          <h1>List of Circuits</h1>
          <div className="circuit-cards">
            {circuits.map(circuit => (
              <div
                key={circuit._id}
                className="circuit-card"
                onClick={() => handleCircuitClick(circuit)}
              >
                <h2>{circuit.name}</h2>
                <p>Location: {circuit.location}</p>
                <p>Length: {circuit.length_km} km</p>
                <p>Type: {circuit.type}</p>
                <p>Turns: {circuit.turns}</p>
                <h3>Lap Record</h3>
                <p>Time: {circuit.lap_record.time}</p>
                <p>Driver: {circuit.lap_record.driver}</p>
                <p>Year: {circuit.lap_record.year}</p>
                <img src={circuit.track_layout_url} alt={`${circuit.name} layout`} className="track-layout" />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CircuitList;
