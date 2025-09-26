import { useState } from "react";
import Sidebar_Item from "./Sidebar_Item";

export default function Sidebar({ routes, activeRoute, onSelect }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter routes based on search input
  const filteredRoutes = routes.filter(route =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sidebar">
      <h2>Tshwane Bus Routes</h2>
      
      {/* Search bar */}
      <input 
        type="text" 
        placeholder="Search route or stop..." 
        className="search-bar"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Route list */}
      <div className="sidebar-list">
        {filteredRoutes.map((route) => (
          <Sidebar_Item
            key={route.id}
            route={route}
            active={activeRoute === route.id}
            onClick={() => onSelect(route.id)}
          />
        ))}
      </div>
    </div>
  );
}
