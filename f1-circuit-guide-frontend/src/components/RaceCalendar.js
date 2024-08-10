import React, { useEffect, useState } from 'react';
import { getRaceCalendar } from '../api';
import './RaceCalendar.css';

const RaceCalendar = () => {
  const [races, setRaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const raceData = await getRaceCalendar();
      setRaces(raceData);
    };

    fetchData();
  }, []);

  return (
    <div className="race-calendar">
      <h1>Race Calendar</h1>
      <ul className="race-list">
        {races.map((race) => (
          <li key={race.round} className="race-item">
            <h2>{race.raceName}</h2>
            <p>
              {race.Circuit.circuitName} - {race.Circuit.Location.locality},{' '}
              {race.Circuit.Location.country}
            </p>
            <p>Date: {new Date(race.date).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RaceCalendar;
