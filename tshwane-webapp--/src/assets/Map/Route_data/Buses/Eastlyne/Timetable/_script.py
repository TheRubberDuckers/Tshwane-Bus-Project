import json
import os

def extract_lines(file_list):
    lines = []
    for file_path in file_list:
        if not os.path.exists(file_path):
            print(f"Warning: file not found, skipping: {file_path}")
            continue
        try:
            with open(file_path, "r") as f:
                data = json.load(f)
        except json.JSONDecodeError as e:
            print(f"Warning: failed to parse {file_path}: {e}")
            continue

        for feature in data.get("features", []):
            geom = feature.get("geometry") or {}
            coords = geom.get("coordinates", [])
            gtype = geom.get("type")
            if gtype == "LineString":
                lines.append(coords)
            elif gtype == "MultiLineString":
                lines.extend(coords)
    return lines


def parse_txt(txt_file):
    """
    Format:
    id=1,color=#ff0000,a.json,b.json
    id=2,color=#00ff00,c.json,d.json
    """
    base_dir = os.path.dirname(os.path.abspath(txt_file))
    groups = []

    with open(txt_file, "r") as f:
        for line_num, line in enumerate(f, 1):
            line = line.strip()
            if not line:
                continue

            parts = line.split(",")
            group_id = None
            color = "#000000"
            files = []

            for p in parts:
                p = p.strip()
                if not p or p == "end":
                    continue
                if p.startswith("id="):
                    raw_id = p[3:]
                    group_id = int(raw_id) if raw_id.isdigit() else raw_id
                elif p.startswith("color="):
                    color = p[6:]
                else:
                    if not p.endswith(".json"):
                        p += ".json"
                    files.append(os.path.join(base_dir, p))

            if group_id is None:
                print(f"Warning: no id= found on line {line_num}, skipping")
                continue

            groups.append({"id": group_id, "color": color, "files": files})

    return groups


def build_feature_collection(txt_file, output_file="output.geojson"):
    groups = parse_txt(txt_file)
    features = []

    for g in groups:
        lines = extract_lines(g["files"])
        if not lines:
            print(f"Warning: no line geometries found for group id={g['id']}, skipping")
            continue

        raw_name = str(g["id"]).replace("_", " ").title()
        features.append({
            "type": "Feature",
            "id": g["id"],
            "name": raw_name,
            "properties": {"color": g["color"]},
            geojson = {"type": "FeatureCollection", "features": features}

    with open(output_file, "w") as f:
        json.dump(geojson, f, indent=2)

    print(f"Saved {len(features)} feature(s) to: {output_file}")


# -------------------
# RUN
# -------------------
if __name__ == "__main__":
    build_feature_collection("file_lists.txt")
