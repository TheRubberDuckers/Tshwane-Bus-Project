import json

from django.core.management.base import BaseCommand

from buses.models import Route


class Command(BaseCommand):
    help = "Import your existing MapData.json: python manage.py import_geojson path/to/MapData.json"

    def add_arguments(self, parser):
        parser.add_argument("path")

    def handle(self, *args, path, **opts):
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
        count = 0
        for feat in data.get("features", []):
            geom, props = feat["geometry"], feat.get("properties", {})
            lines = geom["coordinates"] if geom["type"] == "MultiLineString" else [geom["coordinates"]]
            coords = [[lat, lng] for line in lines for lng, lat, *_ in line]  # GeoJSON is lng,lat
            Route.objects.update_or_create(
                name=props.get("name", f"Route {props.get('id', count + 1)}"),
                defaults={"color": props.get("color", "#2d6a4f"), "coordinates": coords},
            )
            count += 1
        self.stdout.write(self.style.SUCCESS(f"Imported {count} routes"))
