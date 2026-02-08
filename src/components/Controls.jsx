import React from 'react';

const Controls = ({ isPlaying, speedMultiplier, onPlayPause, onReset, onSpeedChange }) => {
  return (
    <div className="controls">
      <div className="control-group">
      <button onClick={onPlayPause}>
        {isPlaying ? '⏸️ Pause Simulation' : '▶️ Start Simulation'}
        </button>

       <button onClick={onReset}>
        🔄 Reset Position
        </button>
      </div>
      <div className="control-group">
        <div className="speed-control">
          <label htmlFor="speedSelect">Speed:</label>
          <select 
          id="speedSelect"
          value={speedMultiplier}
          title="Adjust simulation playback speed"
          aria-label="Simulation Speed Selector"
          onChange={(e) => onSpeedChange(parseFloat(e.target.value))}
          >
            <option value={0.5}>0.5x</option>
            <option value={1}>1x</option>
            <option value={2}>2x</option>
            <option value={5}>5x</option>
            <option value={10}>10x</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Controls;
