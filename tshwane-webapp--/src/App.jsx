import "./App.css";
import { useState } from "react";
import Sidebar from "./Components/Sidebar";
import Map_Data from "./assets/Map/MapData.json";
import "leaflet/dist/leaflet.css";
import Header from "./Components/Header";
import MapComponent from "./Map-Component";
import { SearchContext } from "./Components/Context";

function App() {
  const [activeRoute, setActiveRoute] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  //Data we can update later on
  const routes = Map_Data.features.map((f) => ({
    id: f.properties.id,
    name: f.properties.name,
    color: f.properties.color,
    coordinates: f.geometry.coordinates.map(([lng, lat]) => [lat, lng]), //swaps them around
  }));
  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      <div className="grid grid-col-3 gap-2 bg-[#f7fdf9] fixed top-0 left-0 right-0 w-100vw h-300">
        <div className="col-span-3 -mt-14">
          <Header />
        </div>

        <div className="col-span-3 flex flex-row -mt-125">
          <Sidebar
            routes={routes}
            activeRoute={activeRoute}
            onSelect={setActiveRoute}
          />

          <div className="">
            <MapComponent routes={routes} activeRoute={activeRoute} />
          </div>
        </div>
      </div>
    </SearchContext.Provider>
  );
}

export default App;
