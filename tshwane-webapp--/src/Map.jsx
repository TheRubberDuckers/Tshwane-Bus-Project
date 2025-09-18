import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

function Map(){
    const pos = [-25.7566, 28.1914];
    const pos2 = [-25.7487, 28.2380];
    const path = [[-25.7566, 28.1914],
                [-25.756434882950284, 28.19374152010371],
                [-25.757077077656366, 28.195971747364545],
                [-25.7457105030179, 28.20022736423161],
                [-25.743020915526948, 28.2369153997867],
                [-25.748806592299914, 28.237444499447896]];

    return(
        <>
            <MapContainer center={pos} zoom={13} scrollWheelZoom={false} style={{ height: 500, width: 500 }}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={pos}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
            <Marker position={pos2}></Marker>
            <Polyline positions={path}></Polyline>
            </MapContainer>
        </>
    )
} 
export default Map