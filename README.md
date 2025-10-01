# Vehicle Movement Simulator - React Version

A frontend-only React application that simulates vehicle movement on a map using dummy data.

## Features

- ✅ **Map Integration**: Uses React Leaflet for interactive maps
- ✅ **Real-time Simulation**: Vehicle marker updates position smoothly
- ✅ **Route Visualization**: Dynamic polyline shows vehicle path
- ✅ **Play/Pause Controls**: Start, stop, and reset simulation
- ✅ **Speed Control**: Adjustable playback speed (0.5x to 10x)
- ✅ **Live Metadata**: Displays coordinates, timestamp, speed, and status
- ✅ **Responsive Design**: Works on desktop and mobile
- ✅ **Dummy Data**: Uses JSON file with 50+ coordinate points

## Quick Start

1. **Install dependencies:**
   ```bash
   cd assignment-react
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open browser:**
   - Navigate to `http://localhost:3000`
   - Click "▶️ Play" to start simulation
   - Use speed controls to adjust playback speed

## Project Structure

```
assignment-react/
├── public/
│   └── dummy-route.json          # Route data with coordinates
├── src/
│   ├── components/
│   │   ├── Controls.jsx          # Play/pause/speed controls
│   │   ├── StatusPanel.jsx      # Live metadata display
│   │   └── RouteInfo.jsx        # Route statistics
│   ├── App.jsx                  # Main application component
│   ├── main.jsx                 # React entry point
│   └── index.css               # Styling
├── package.json
└── vite.config.js
```

## Technologies Used

- **React 18** - Frontend framework
- **React Leaflet** - Map integration
- **Leaflet** - Mapping library
- **Vite** - Build tool and dev server
- **CSS3** - Styling and responsive design

## Assignment Requirements Met

1. **Map Integration** ✅
   - Uses Leaflet mapping library
   - Displays map centered on predefined route
   - Vehicle marker updates in real-time
   - Route path drawn using polyline

2. **Dummy Location Data** ✅
   - Static JSON file (`dummy-route.json`) with coordinates
   - Each entry includes latitude, longitude, and timestamp
   - Data fetched and processed for movement simulation

3. **Simulated Real-Time Movement** ✅
   - Vehicle marker updates every few seconds
   - Smooth movement animation
   - Route path extends as vehicle moves forward

4. **Interface and Features** ✅
   - Play/pause controls
   - Speed control (0.5x to 10x)
   - Reset functionality
   - Live metadata display
   - Responsive design

## Customization

- **Change Route**: Edit `public/dummy-route.json` with your coordinates
- **Adjust Speed**: Modify speed options in `Controls.jsx`
- **Styling**: Update `src/index.css` for custom appearance
- **Map Center**: Change initial center in `App.jsx`

## Build for Production

```bash
npm run build
npm run preview
```

This creates an optimized production build in the `dist` folder.
