import {
  MapContainer,
  TileLayer,
  Polyline,
  Popup,
  ZoomControl,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";

function MapComponent({ routes, activeRoute }) {
  return (
    <MapContainer
      center={[-25.7461, 28.1881]}
      zoom={14}
      scrollWheelZoom={true}
      style={{ height: "65vh", width: "83.3vw", zIndex: 500 }}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ZoomControl position="bottomright" />

      {routes.map((route) => {
        if (!activeRoute.includes(route.id)) return null;

        const flatCoords = route.coordinates?.flat();

        const start = flatCoords?.[0];
        const end = flatCoords?.[flatCoords.length - 1];

        return (
          <React.Fragment key={route.id}>
            <Polyline
              positions={route.coordinates}
              pathOptions={{ color: route.color }}
            />

            {start && (
              <CircleMarker center={start} pathOptions={{ color: route.color, fillColor:"white", fillOpacity: 1 }}>
                <Popup>{route.name} Start</Popup>
              </CircleMarker>
            )}

            {end && (
              <CircleMarker
                center={end}
                pathOptions={{ color: route.color, fillColor:"white", fillOpacity: 1 }}
              >
                <Popup>{route.name} End</Popup>
              </CircleMarker>
            )}
          </React.Fragment>
        );
      })}
    </MapContainer>
  );
}

export default MapComponent;
