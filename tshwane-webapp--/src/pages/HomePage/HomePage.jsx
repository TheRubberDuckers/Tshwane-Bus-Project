import { useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import MapView from "../../components/MapView/MapView";
import StatusMessage from "../../components/StatusMessage/StatusMessage";
import { useSearch } from "../../context/SearchContext";
import useRoutes from "../../hooks/useRoutes";
import "./HomePage.css";

export default function HomePage() {
  const { routes, loading, error, reload } = useRoutes();
  const { searchTerm } = useSearch();
  const [activeId, setActiveId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return routes;
    return routes.filter(
      (r) => r.name.toLowerCase().includes(q) || r.stops.some((s) => s.name.toLowerCase().includes(q))
    );
  }, [routes, searchTerm]);

  return (
    <div className="home">
      <Sidebar
        routes={filtered}
        activeId={activeId}
        onSelect={setActiveId}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        emptyText={loading ? "Loading routes…" : searchTerm ? "No routes or stops match your search." : "No routes yet."}
      />
      <MapView routes={filtered} activeId={activeId} onSelect={setActiveId} />

      <button className="home__toggle" onClick={() => setSidebarOpen(true)}>Routes ({filtered.length})</button>

      {error && (
        <div className="home__error">
          <StatusMessage kind="error">{error}</StatusMessage>
          <button className="btn btn--small" onClick={reload}>Try again</button>
        </div>
      )}
    </div>
  );
}
