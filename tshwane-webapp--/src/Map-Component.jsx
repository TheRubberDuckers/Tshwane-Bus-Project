import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import Map from './assets/Map/Map.json'

function MapComponent(){
    const route = [];
    const arrLen = Map.features[0]['geometry']['coordinates'].length;
    const coordinates = Map.features[0]['geometry']['coordinates'];

    for (let i = 0; i < arrLen; i++){
        const reversed = [...coordinates[i]].reverse(); //make a copy of coordinates array and then revese that copy
        route.push(reversed);
    }

    const firstPos = route[0];
    const secondPos = route[route.length - 1];

    return(
        <>
            <MapContainer center={firstPos} zoom={10} scrollWheelZoom={false} style={{ height: 500, width: 500 }}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={firstPos}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <Marker position={secondPos}></Marker>
            <Polyline positions={route}></Polyline>
            </MapContainer>
        </>
    )
} 
export default MapComponent