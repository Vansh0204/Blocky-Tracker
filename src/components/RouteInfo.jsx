import React from 'react';

const RouteInfo = ({ totalPoints, currentIndex, progress }) => {
  return (
    <div className="route-info">
      <div className="route-title">🚗 Vehicle Movement Simulator</div>
      
      <div className="route-stats">
        <div className="stat-item">
          <div className="stat-value">{totalPoints}</div>
          <div className="stat-label">Total Points</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value">{currentIndex}</div>
          <div className="stat-label">Current Point</div>
        </div>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default RouteInfo;
