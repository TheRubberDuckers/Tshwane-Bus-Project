import { MapContainer, TileLayer, Polyline, Popup,Marker} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import React from 'react';

function MapComponent({routes, activeRoute}){

    return(
        
        <>
            <MapContainer center={[-25.7461, 28.1881]} zoom={14} touchZoom={true} scrollWheelZoom={true} style={{ height: "60vh", width: "60vw" }}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {routes.map(route=>
                (
                    
                    activeRoute==route.id && (
                        <React.Fragment key={route.id}>
                            <Polyline
                            positions = {route.coordinates}
                            color={route.color}
                            >
                            </Polyline>
                            <Marker position={route.coordinates[0]}>
                                <Popup>{route.name} Start</Popup>
                            </Marker>
                            <Marker position={route.coordinates[route.coordinates.length -1]}>
                                <Popup>{route.name} End</Popup>
                            </Marker>
                        </React.Fragment>
                    )
                )
            )}
            </MapContainer>
        </>
    )
} 
export default MapComponent