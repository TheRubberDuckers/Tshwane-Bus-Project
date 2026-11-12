import "./RouteList.css";

export default function RouteList({ routes, user, editingId, onEdit, onDelete }) {
  const canModify = (r) => user.role === "admin" || r.created_by === user.username;
  return (
    <section className="route-list">
      <h2>Routes in the database ({routes.length})</h2>
      {routes.length === 0 && <p className="route-list__empty">Nothing yet. Add the first route with the form.</p>}
      <ul>
        {routes.map((r) => (
          <li key={r.id} className={r.id === editingId ? "route-list__item route-list__item--editing" : "route-list__item"} style={{ "--route-color": r.color }}>
            <div>
              <strong>{r.name}</strong>
              <span className="route-list__meta">{r.coordinates.length} points, {r.stops.length} stops, added by {r.created_by ?? "unknown"}</span>
            </div>
            {canModify(r) && (
              <div className="route-list__actions">
                <button className="btn btn--small" onClick={() => onEdit(r)}>Edit</button>
                <button className="btn btn--danger btn--small" onClick={() => onDelete(r)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
