import { useState, useContext } from "react";
import Sidebar_Item from "./Sidebar_Item";
import { SearchContext } from "./Context";

export default function Sidebar({ routes, activeRoute, onSelect }) {
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [animKey, setAnimKey] = useState(0);

  const restartAnim = () => setAnimKey((prev) => prev + 1);

  // Filter routes based on search input
  const filteredRoutes = routes.filter((route) =>
    route.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <>
      <div
        key={animKey}
        className="text-black animate-fade-up animate-duration-750"
        onClick={restartAnim}
      >
        {filteredRoutes.map((route) => (
          <Sidebar_Item
            key={route.id}
            route={route}
            active={activeRoute === route.id}
            onClick={() => onSelect(route.id)}
          />
        ))}
      </div>
    </>
  );
}
