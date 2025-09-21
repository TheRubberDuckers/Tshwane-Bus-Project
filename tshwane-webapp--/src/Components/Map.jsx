import Route_line from "./Route_line";

export default function Map(
    {routes, activeRoute}
){
    return (
        <div className="map">
            {
                routes.map(
                    (route) => (
                        <Route_line
                        key={route.id}
                        route={route}
                        active={activeRoute ==route.id}
                        />
                    )
                )
            }
            <div className="selected-text">
                {activeRoute?  `Selected: ${activeRoute}`:"Select a Route"}
            </div>

        </div>
    )
}
