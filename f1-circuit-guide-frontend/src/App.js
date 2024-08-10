import React, { useState } from 'react';
import './App.css';
import CircuitList from './components/CircuitList';
import TrackVisualization from './components/TrackVisualization';
import GlobeVisualization from './components/GlobeVisualization';
import RaceCalendar from './components/RaceCalendar';

const App = () => {
  const [activeTab, setActiveTab] = useState('globe');

  const renderContent = () => {
    switch (activeTab) {
      case 'circuits':
        return <CircuitList />;
      case 'visualization':
        return <TrackVisualization />;
      case 'globe':
        return <GlobeVisualization />;
      case 'calendar':
        return <RaceCalendar />;
      default:
        return <CircuitList />;
    }
  };

  return (
    <div className="App">
      <h1>F1 Circuit Guide</h1>
      <div className="tabs">
        <button
          className={activeTab === 'globe' ? 'active' : ''}
          onClick={() => setActiveTab('globe')}
        >
          Interactive Globe
        </button>
        <button
          className={activeTab === 'circuits' ? 'active' : ''}
          onClick={() => setActiveTab('circuits')}
        >
          Circuits
        </button>
        <button
          className={activeTab === 'visualization' ? 'active' : ''}
          onClick={() => setActiveTab('visualization')}
        >
          3D Visualization
        </button>
        <button
          className={activeTab === 'calendar' ? 'active' : ''}
          onClick={() => setActiveTab('calendar')}
        >
          Race Calendar
        </button>
      </div>
      <div className="content">{renderContent()}</div>
      <footer>Powered by F1 Insights</footer>
    </div>
  );
};

export default App;
