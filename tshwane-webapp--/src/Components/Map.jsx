import Route_line from "./Route_line";
import MapComponent from "../Map-Component";

export default function Map(
    {routes, activeRoute}
){
    return (
        <div className="map">
            {
            }
            <div className="selected-text">
                {activeRoute?  `Selected: ${activeRoute}`:"Select a Route"}
            </div>
            <div style={{display: "grid", placeItems: "center"}}>
                <p></p>
                <p></p>
                <MapComponent></MapComponent>
            </div>

        </div>
    )
}
