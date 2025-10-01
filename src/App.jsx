import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Controls from './components/Controls';
import StatusPanel from './components/StatusPanel';
import RouteInfo from './components/RouteInfo';

// Fix Leaflet default icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom vehicle icon
const createVehicleIcon = () => {
  return L.divIcon({
    className: 'vehicle-marker',
    html: '<div style="background: #007bff; color: white; border-radius: 50%; width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 16px; border: 3px solid white; box-shadow: 0 2px 10px rgba(0,0,0,0.3);">🚗</div>',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
};

// Map component that handles bounds fitting
function MapBounds({ routeData }) {
  const map = useMap();
  
  useEffect(() => {
    if (routeData.length > 0) {
      const bounds = L.latLngBounds(routeData.map(point => [point.latitude, point.longitude]));
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [map, routeData]);
  
  return null;
}

function App() {
  const [routeData, setRouteData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const intervalRef = useRef(null);

  // Load route data
  useEffect(() => {
    const loadRouteData = async () => {
      try {
        const response = await fetch('/dummy-route.json');
        const data = await response.json();
        setRouteData(data);
      } catch (error) {
        console.error('Error loading route data:', error);
        // Fallback data
        setRouteData([
          { latitude: 26.8467, longitude: 80.9462, timestamp: "2024-07-20T10:00:00Z" },
          { latitude: 26.8500, longitude: 80.9500, timestamp: "2024-07-20T10:00:30Z" },
          { latitude: 26.8550, longitude: 80.9550, timestamp: "2024-07-20T10:01:00Z" },
          { latitude: 26.8600, longitude: 80.9600, timestamp: "2024-07-20T10:01:30Z" },
          { latitude: 26.8650, longitude: 80.9650, timestamp: "2024-07-20T10:02:00Z" },
          { latitude: 26.8700, longitude: 80.9700, timestamp: "2024-07-20T10:02:30Z" }
        ]);
      }
    };
    
    loadRouteData();
  }, []);

  // Calculate distance between two points
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Calculate current speed
  const getCurrentSpeed = () => {
    if (currentIndex === 0) return 0;
    
    const currentPoint = routeData[currentIndex];
    const prevPoint = routeData[currentIndex - 1];
    
    if (!currentPoint || !prevPoint) return 0;
    
    const distance = calculateDistance(
      prevPoint.latitude, prevPoint.longitude,
      currentPoint.latitude, currentPoint.longitude
    );
    
    const timeDiff = (new Date(currentPoint.timestamp) - new Date(prevPoint.timestamp)) / 1000; // seconds
    return timeDiff > 0 ? (distance / timeDiff) * 3.6 : 0; // km/h
  };

  // Start simulation
  const startSimulation = () => {
    if (currentIndex >= routeData.length - 1) {
      resetSimulation();
      return;
    }
    
    setIsPlaying(true);
    const interval = Math.max(100, 1000 / speedMultiplier);
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex(prev => {
        if (prev >= routeData.length - 1) {
          setIsPlaying(false);
          clearInterval(intervalRef.current);
          return prev;
        }
        return prev + 1;
      });
    }, interval);
  };

  // Stop simulation
  const stopSimulation = () => {
    setIsPlaying(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Reset simulation
  const resetSimulation = () => {
    stopSimulation();
    setCurrentIndex(0);
  };

  // Handle speed change
  const handleSpeedChange = (newSpeed) => {
    setSpeedMultiplier(newSpeed);
    if (isPlaying) {
      stopSimulation();
      startSimulation();
    }
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const currentPoint = routeData[currentIndex] || routeData[0];
  const routePoints = routeData.slice(0, currentIndex + 1).map(point => [point.latitude, point.longitude]);
  const fullRoutePoints = routeData.map(point => [point.latitude, point.longitude]);
  const traveledRoutePoints = routeData.slice(0, currentIndex + 1).map(point => [point.latitude, point.longitude]);
  const progress = routeData.length > 0 ? ((currentIndex + 1) / routeData.length) * 100 : 0;

  return (
    <div className="container">
      <div className="sidebar">
        <RouteInfo 
          totalPoints={routeData.length}
          currentIndex={currentIndex + 1}
          progress={progress}
        />
        
        <StatusPanel
          currentPoint={currentPoint}
          speed={getCurrentSpeed()}
          status={isPlaying ? 'Moving' : 'Stopped'}
        />
      </div>

      <div className="map-container">
        <div className="map-wrapper">
          <MapContainer
            center={[26.8467, 80.9462]}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© OpenStreetMap contributors'
            />
            
            <MapBounds routeData={routeData} />
            
            {currentPoint && (
              <Marker
                position={[currentPoint.latitude, currentPoint.longitude]}
                icon={createVehicleIcon()}
              />
            )}
            
            {/* Full route line (like Google Maps directions) */}
            {fullRoutePoints.length > 1 && (
              <Polyline
                positions={fullRoutePoints}
                color="#666"
                weight={3}
                opacity={0.4}
                dashArray="5, 5"
              />
            )}
            
            {/* Traveled route line */}
            {traveledRoutePoints.length > 1 && (
              <Polyline
                positions={traveledRoutePoints}
                color="#007bff"
                weight={4}
                opacity={0.8}
              />
            )}
          </MapContainer>
        </div>
        
        <Controls
          isPlaying={isPlaying}
          speedMultiplier={speedMultiplier}
          onPlayPause={isPlaying ? stopSimulation : startSimulation}
          onReset={resetSimulation}
          onSpeedChange={handleSpeedChange}
        />
      </div>
    </div>
  );
}

export default App;
