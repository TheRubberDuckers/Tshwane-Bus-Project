import {
  MapContainer,
  TileLayer,
  Polyline,
  Popup,
  Marker,
  ZoomControl,
  CircleMarker,
  Pane,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";

function MapComponent({ routes, activeRoute }) {
  console.log(routes);

  return (
    <>
      <MapContainer
        center={[-25.7461, 28.1881]}
        zoom={14}
        touchZoom={true}
        scrollWheelZoom={true}
        style={{ height: "65vh", width: "83.3vw", zIndex: 500 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        {routes.map(
          (route) =>
            activeRoute == route.id && (
              <React.Fragment key={route.id}>
                <Polyline
                  positions={route.coordinates}
                  color={route.color}
                  fillColor="white"
                  fillOpacity={1}
                ></Polyline>

                <CircleMarker center={route.coordinates[0]} color={route.color}>
                  <Popup>{route.name} Start</Popup>
                </CircleMarker>

                <CircleMarker
                  center={route.coordinates[route.coordinates.length - 1]}
                  color={route.color}
                  fillColor="white"
                  fillOpacity={1}
                >
                  <Popup>{route.name} End</Popup>
                </CircleMarker>
              </React.Fragment>
            ),
        )}
      </MapContainer>
    </>
  );
}
export default MapComponent;
