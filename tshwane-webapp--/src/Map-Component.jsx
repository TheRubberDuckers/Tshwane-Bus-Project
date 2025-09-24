import { MapContainer, TileLayer, } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

function MapComponent(){
    firstPos=[-25.731340, 28.218370];
    return(
        <>
            <MapContainer center={firstPos} zoom={14} scrollWheelZoom={false} style={{ height: "60vh", width: "60vw" }}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            </MapContainer>
        </>
    )
} 
export default MapComponent