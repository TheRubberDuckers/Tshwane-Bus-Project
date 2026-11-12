import { useEffect } from "react";
import { CircleMarker, MapContainer, Polyline, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "./DrawMap.css";

function ClickCatcher({ onClick }) {
  useMapEvents({ click: (e) => onClick([e.latlng.lat, e.latlng.lng]) });
  return null;
}

function Fit({ fitKey, coordinates }) {
  const map = useMap();
  useEffect(() => {
    if (coordinates.length > 1) map.fitBounds(coordinates, { padding: [30, 30] });
  }, [fitKey]); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}

export default function DrawMap({ coordinates, stops, color, onMapClick, fitKey }) {
  return (
    <div className="draw-map">
      <MapContainer center={[-25.7461, 28.1881]} zoom={13} className="draw-map__map">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickCatcher onClick={onMapClick} />
        <Fit fitKey={fitKey} coordinates={coordinates} />
        {coordinates.length > 1 && <Polyline positions={coordinates} pathOptions={{ color, weight: 5 }} />}
        {coordinates.map((p, i) => (
          <CircleMarker key={i} center={p} radius={i === 0 ? 7 : 3} pathOptions={{ color, fillColor: "#fff", fillOpacity: 1, weight: 2 }} />
        ))}
        {stops.map((s, i) => (
          <CircleMarker key={`s${i}`} center={[s.latitude, s.longitude]} radius={6} pathOptions={{ color: "#fff", fillColor: color, fillOpacity: 1, weight: 2 }} />
        ))}
      </MapContainer>
    </div>
  );
}
