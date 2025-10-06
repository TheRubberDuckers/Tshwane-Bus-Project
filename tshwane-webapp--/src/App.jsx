import './App.css';
import { useState } from 'react';
import Sidebar from "./Components/Sidebar";
import Map_Data from "./assets/Map/MapData.json"
import 'leaflet/dist/leaflet.css';
import Map from './Components/Map';

function App() {
  const [activeRoute, setActiveRoute]= useState(null);


  //Data we can update later on
const routes =Map_Data.features.map(
  f => (
    {
      id: f.properties.id,
      name: f.properties.name,
      color: f.properties.color,
      coordinates: f.geometry.coordinates.map(([lng, lat]) => [lat, lng]) //swaps them around
    }
  )
);
  return (
    <div className="app-container" >
        <Sidebar 
        routes={routes} 
        activeRoute={activeRoute} 
        onSelect={setActiveRoute}
        />
      
      <Map routes= {routes} activeRoute={activeRoute}/>
    </div>
  );
}

export default App;

