import SidebarItem from "../SidebarItem/SidebarItem";
import "./Sidebar.css";

export default function Sidebar({ routes, activeId, onSelect, open, onClose, emptyText }) {
  return (
    <>
      <aside className={`sidebar ${open ? "sidebar--open" : ""}`} aria-label="Bus routes">
        <div className="sidebar__head">
          <h2>Routes ({routes.length})</h2>
          <button className="sidebar__close" onClick={onClose} aria-label="Close route list">×</button>
        </div>
        {routes.length === 0 ? (
          <p className="sidebar__empty">{emptyText}</p>
        ) : (
          <ul className="sidebar__list">
            {routes.map((r) => (
              <SidebarItem
                key={r.id}
                route={r}
                active={activeId === r.id}
                onClick={() => { onSelect(r.id); onClose(); }}
              />
            ))}
          </ul>
        )}
      </aside>
      {open && <div className="sidebar__scrim" onClick={onClose} />}
    </>
  );
}
