import "./SidebarItem.css";

export default function SidebarItem({ route, active, onClick }) {
  return (
    <li>
      <button
        className={`sidebar-item ${active ? "sidebar-item--active" : ""}`}
        style={{ "--route-color": route.color }}
        onClick={onClick}
        aria-pressed={active}
      >
        <span className="sidebar-item__name">{route.name}</span>
        <span className="sidebar-item__meta">
          {route.stops?.length ? `${route.stops.length} stops` : "No stops listed"}
        </span>
      </button>
    </li>
  );
}
