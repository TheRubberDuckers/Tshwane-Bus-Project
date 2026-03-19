import { useState } from "react";
import { Polyline, Marker } from "leaflet";

export default function Route_line(data, colors, name) {
  const [active, setActive] = useState(false);
  return (
    <div>
      <button onClick={() => setActive(!active)}>
        {active ? { name } : { name }}
      </button>
      {active && <Polyline positions={data} color={colors} />}
      {active && <marker position={data[0]} />}
      {active && <marker position={data[-1]} />}
    </div>
  );
}
