import Sidebar_Item from "./Sidebar_Item";

export default function Sidebar({ routes, activeRoute, onSelect }) {
  return (
    <div className="sidebar">
      <h2>Tshwane Bus Routes</h2>
      
      {/* Search bar */}
      <input 
        type="text" 
        placeholder="Search route or stop..." 
        className="search-bar"
      />

      {/* Route list */}
      {routes.map((route) => (
        <Sidebar_Item
          key={route.id}
          route={route}
          active={activeRoute === route.id}
          onClick={() => onSelect(route.id)}
        />
      ))}
    </div>
  );
}
