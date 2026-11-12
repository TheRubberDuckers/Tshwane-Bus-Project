import { useRef, useState } from "react";
import { api } from "../../api/client";
import { parseGeoJSON } from "../../utils/geojson";
import DrawMap from "../DrawMap/DrawMap";
import StatusMessage from "../StatusMessage/StatusMessage";
import "./RouteForm.css";

const round = (n) => Math.round(n * 1e6) / 1e6;

export default function RouteForm({ initial, onSaved, onCancel }) {
  const [name, setName] = useState(initial?.name ?? "");
  const [color, setColor] = useState(initial?.color ?? "#2d6a4f");
  const [coordinates, setCoordinates] = useState(initial?.coordinates ?? []);
  const [stops, setStops] = useState(initial?.stops ?? []);
  const [mode, setMode] = useState("line"); // "line" | "stop"
  const [fitKey, setFitKey] = useState(0);
  const [message, setMessage] = useState(null); // { kind, text }
  const [busy, setBusy] = useState(false);
  const fileRef = useRef(null);

  function handleMapClick([lat, lng]) {
    const p = [round(lat), round(lng)];
    if (mode === "line") setCoordinates((c) => [...c, p]);
    else setStops((s) => [...s, { name: `Stop ${s.length + 1}`, latitude: p[0], longitude: p[1], order: s.length }]);
  }

  async function handleFile(e) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const parsed = parseGeoJSON(await file.text());
      setCoordinates(parsed.coordinates.map(([a, b]) => [round(a), round(b)]));
      if (!name && parsed.name) setName(parsed.name);
      if (parsed.color) setColor(parsed.color);
      setFitKey((k) => k + 1);
      setMessage({
        kind: "success",
        text: parsed.lineCount > 1
          ? `Loaded the first of ${parsed.lineCount} lines. Save it, then upload the next one.`
          : "File loaded. Check the line on the map, then save.",
      });
    } catch (err) {
      setMessage({ kind: "error", text: `Couldn't read that file: ${err.message}` });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);
    if (coordinates.length < 2) return setMessage({ kind: "error", text: "Add at least 2 points to the line." });
    setBusy(true);
    const payload = { name: name.trim(), color, coordinates, stops: stops.map((s, i) => ({ ...s, order: i })) };
    try {
      const saved = initial ? await api.updateRoute(initial.id, payload) : await api.createRoute(payload);
      onSaved(saved, !!initial);
    } catch (err) {
      setMessage({ kind: "error", text: err.message });
      setBusy(false);
    }
  }

  return (
    <form className="route-form" onSubmit={handleSubmit}>
      <h2>{initial ? `Edit ${initial.name}` : "Add a route"}</h2>

      <div className="route-form__row">
        <div className="field route-form__name">
          <label htmlFor="route-name">Route name</label>
          <input id="route-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required maxLength={120} />
        </div>
        <div className="field">
          <label htmlFor="route-color">Line colour</label>
          <input id="route-color" type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
      </div>

      <div className="route-form__tools">
        <div className="route-form__modes" role="group" aria-label="What a map click adds">
          <button type="button" className={`btn btn--small ${mode === "line" ? "btn--primary" : ""}`} onClick={() => setMode("line")}>Draw line</button>
          <button type="button" className={`btn btn--small ${mode === "stop" ? "btn--primary" : ""}`} onClick={() => setMode("stop")}>Place stops</button>
        </div>
        <button type="button" className="btn btn--small" onClick={() => setCoordinates((c) => c.slice(0, -1))} disabled={!coordinates.length}>Undo point</button>
        <button type="button" className="btn btn--small" onClick={() => setCoordinates([])} disabled={!coordinates.length}>Clear line</button>
        <button type="button" className="btn btn--small" onClick={() => fileRef.current.click()}>Upload GeoJSON</button>
        <input ref={fileRef} type="file" accept=".json,.geojson,application/geo+json,application/json" hidden onChange={handleFile} />
      </div>

      <p className="route-form__hint">
        {mode === "line" ? "Click along the road to draw the route in order, start to end." : "Click the map to drop a stop, then name it below."}
        {" "}{coordinates.length} points, {stops.length} stops.
      </p>

      <DrawMap coordinates={coordinates} stops={stops} color={color} onMapClick={handleMapClick} fitKey={fitKey} />

      {stops.length > 0 && (
        <ol className="route-form__stops">
          {stops.map((s, i) => (
            <li key={i}>
              <input
                type="text" value={s.name} aria-label={`Stop ${i + 1} name`} maxLength={120}
                onChange={(e) => setStops((all) => all.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))}
              />
              <button type="button" className="btn btn--danger btn--small" onClick={() => setStops((all) => all.filter((_, j) => j !== i))}>Remove</button>
            </li>
          ))}
        </ol>
      )}

      {message && <StatusMessage kind={message.kind}>{message.text}</StatusMessage>}

      <div className="route-form__actions">
        <button className="btn btn--primary" disabled={busy}>{busy ? "Saving…" : initial ? "Save changes" : "Add route"}</button>
        {initial && <button type="button" className="btn" onClick={onCancel}>Cancel edit</button>}
      </div>
    </form>
  );
}
