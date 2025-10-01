import React from 'react';

const StatusPanel = ({ currentPoint, speed, status }) => {
  if (!currentPoint) {
    return (
      <div className="status-panel">
        <div className="status-item">
          <span className="status-label">Status:</span>
          <span className="status-value">Loading...</span>
        </div>
      </div>
    );
  }

  const timestamp = new Date(currentPoint.timestamp);

  return (
    <div className="status-panel">
      <div className="status-item">
        <span className="status-label">Current Position:</span>
        <span className="status-value">
          {currentPoint.latitude.toFixed(6)}, {currentPoint.longitude.toFixed(6)}
        </span>
      </div>
      
      <div className="status-item">
        <span className="status-label">Timestamp:</span>
        <span className="status-value">{timestamp.toLocaleString()}</span>
      </div>
      
      <div className="status-item">
        <span className="status-label">Speed:</span>
        <span className="status-value">{speed.toFixed(1)} km/h</span>
      </div>
      
      <div className="status-item">
        <span className="status-label">Status:</span>
        <span className="status-value">{status}</span>
      </div>
    </div>
  );
};

export default StatusPanel;
