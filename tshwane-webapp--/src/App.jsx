import Map from './Map-Component'
import MapComponent from './Map-Component'
import './App.css';
import { useState } from 'react';
import Sidebar from "./Components/Sidebar";
import Map from "./Components/Map";
function App() {
  const [activeRoute, setActiveRoute]= useState(null);


  //Data we can update later on
  const routes = [
    { id: "Pretoria Central", name: "Pretoria Central", color: "red" },
    { id: "Sunnyside", name: "Sunnyside", color: "blue" },
    { id: "Hatfield", name: "Hatfield", color: "green" },
    { id: "Danville", name: "Danville", color: "purple"}
  ];
  return (
    <div className="app-container">
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

