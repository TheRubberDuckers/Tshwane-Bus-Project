import "./App.css";
import { useState } from "react";
import Sidebar from "./Components/Sidebar";
import Map_Data from "./assets/Map/MapData.json";
import "leaflet/dist/leaflet.css";
import Header from "./Components/Header";
import MapComponent from "./Map-Component";
import { SearchContext } from "./Components/Context";
function App() {
  const [activeRoute, setActiveRoute] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (id) => {
  setActiveRoute((prev) =>
    prev.includes(id) ? [] : [id]
  );
};

  //Data we can update later on
  const routes = Map_Data.features.map((f) => ({
    id: f.id,
    name: f.id.replace("_", " ").toUpperCase(),
    color: f.properties.color,
    coordinates: f.geometry.coordinates.map(line =>
      line.map(([lng, lat]) => [lat, lng])
    ),
  }));

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      <div className="flex flex-col bg-[#f7fdf9] fixed top-0 left-0 right-0 bottom-0">
        <div>
          <Header />
        </div>
        <div className="flex flex-row flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto">
            <Sidebar routes={routes} activeRoute={activeRoute} onSelect={handleSelect} />
          </div>
          <div className="flex-1">
            <MapComponent routes={routes} activeRoute={activeRoute} />
          </div>
        </div>
      </div>
    </SearchContext.Provider>
  );
}
export default App;
