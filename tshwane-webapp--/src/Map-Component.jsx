import { MapContainer, TileLayer, Polyline, Popup,} from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

function MapComponent({routes, activeRoute}){
    console.log (routes)

    return(
        
        <>
            <MapContainer center={[-25.7461, 28.1881]} zoom={14} scrollWheelZoom={false} style={{ height: "60vh", width: "60vw" }}>
            <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {routes.map(route=>
                (
                    activeRoute==route.id && (
                        <Polyline
                        key = {route.id}
                        positions = {route.coordinates}
                        color={route.color}
                        >
                            <Popup>{route.name}</Popup>
                        </Polyline>
                    )
                )
            )}
            </MapContainer>
        </>
    )
} 
export default MapComponent