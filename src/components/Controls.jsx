import React from 'react';

const Controls = ({ isPlaying, speedMultiplier, onPlayPause, onReset, onSpeedChange }) => {
  return (
    <div className="controls">
      <div className="control-group">
        <button onClick={onPlayPause}>
          {isPlaying ? '⏸️ Pause' : '▶️ Play'}
        </button>
        <button onClick={onReset}>🔄 Reset</button>
      </div>
      
      <div className="control-group">
        <div className="speed-control">
          <label htmlFor="speedSelect">Speed:</label>
          <select 
            id="speedSelect"
            value={speedMultiplier}
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
