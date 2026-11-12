// Turns a GeoJSON file (lng,lat) into what the app uses (lat,lng).
export function parseGeoJSON(text) {
  const json = JSON.parse(text);
  const feats =
    json.type === "FeatureCollection" ? json.features
    : json.type === "Feature" ? [json]
    : [{ geometry: json, properties: {} }];
  const lines = feats.filter((f) => ["LineString", "MultiLineString"].includes(f.geometry?.type));
  if (!lines.length) throw new Error("No line (LineString) found in that file.");
  const f = lines[0];
  const parts = f.geometry.type === "MultiLineString" ? f.geometry.coordinates : [f.geometry.coordinates];
  return {
    name: f.properties?.name ?? "",
    color: f.properties?.color ?? null,
    coordinates: parts.flat().map(([lng, lat]) => [lat, lng]),
    lineCount: lines.length,
  };
}
