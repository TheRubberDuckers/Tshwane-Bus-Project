import { useEffect } from "react";
import { CircleMarker, MapContainer, Polyline, Popup, TileLayer, Tooltip, ZoomControl, useMap } from "react-leaflet";
import "./MapView.css";

const TSHWANE = [-25.7461, 28.1881];

function FitToRoute({ route }) {
  const map = useMap();
  useEffect(() => {
    if (route) map.fitBounds(route.coordinates, { padding: [40, 40] });
  }, [route?.id]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

export default function MapView({ routes, activeId, onSelect }) {
  const active = routes.find((r) => r.id === activeId);
  const others = routes.filter((r) => r.id !== activeId);

  return (
    <div className="map-view">
      <MapContainer center={TSHWANE} zoom={13} zoomControl={false} className="map-view__map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <FitToRoute route={active} />

        {others.map((r) => (
          <Polyline
            key={r.id}
            positions={r.coordinates}
            pathOptions={{ color: r.color, weight: 4, opacity: active ? 0.25 : 0.7 }}
            eventHandlers={{ click: () => onSelect(r.id) }}
          >
            <Tooltip sticky>{r.name}</Tooltip>
          </Polyline>
        ))}

        {active && (
          <>
            <Polyline positions={active.coordinates} pathOptions={{ color: active.color, weight: 6 }} />
            <CircleMarker center={active.coordinates[0]} radius={9} pathOptions={{ color: active.color, fillColor: "#fff", fillOpacity: 1, weight: 4 }}>
              <Popup>{active.name} start</Popup>
            </CircleMarker>
            <CircleMarker
              center={active.coordinates[active.coordinates.length - 1]}
              radius={9}
              pathOptions={{ color: active.color, fillColor: active.color, fillOpacity: 1, weight: 3 }}
            >
              <Popup>{active.name} end</Popup>
            </CircleMarker>
            {active.stops.map((s) => (
              <CircleMarker key={s.id} center={[s.latitude, s.longitude]} radius={5} pathOptions={{ color: "#fff", fillColor: active.color, fillOpacity: 1, weight: 2 }}>
                <Popup>{s.name}</Popup>
              </CircleMarker>
            ))}
          </>
        )}
      </MapContainer>
    </div>
  );
}
