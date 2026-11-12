import re

from rest_framework import serializers

from .models import Route, Stop


class StopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stop
        fields = ["id", "name", "latitude", "longitude", "order"]

    def validate_latitude(self, v):
        if not -90 <= v <= 90:
            raise serializers.ValidationError("Latitude must be between -90 and 90.")
        return v

    def validate_longitude(self, v):
        if not -180 <= v <= 180:
            raise serializers.ValidationError("Longitude must be between -180 and 180.")
        return v


class RouteSerializer(serializers.ModelSerializer):
    stops = StopSerializer(many=True, required=False)
    created_by = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Route
        fields = ["id", "name", "color", "coordinates", "stops", "created_by", "updated_at"]

    def validate_color(self, v):
        if not re.fullmatch(r"#[0-9a-fA-F]{6}", v):
            raise serializers.ValidationError("Use a hex colour like #2d6a4f.")
        return v

    def validate_coordinates(self, v):
        if not isinstance(v, list) or len(v) < 2:
            raise serializers.ValidationError("A route needs at least 2 points.")
        for p in v:
            ok = (
                isinstance(p, (list, tuple)) and len(p) == 2
                and all(isinstance(n, (int, float)) for n in p)
                and -90 <= p[0] <= 90 and -180 <= p[1] <= 180
            )
            if not ok:
                raise serializers.ValidationError("Each point must be [latitude, longitude].")
        return v

    def _save_stops(self, route, stops):
        route.stops.all().delete()
        Stop.objects.bulk_create(
            [Stop(route=route, **{**s, "order": s.get("order", i)}) for i, s in enumerate(stops)]
        )

    def create(self, validated):
        stops = validated.pop("stops", [])
        route = Route.objects.create(**validated)
        self._save_stops(route, stops)
        return route

    def update(self, instance, validated):
        stops = validated.pop("stops", None)
        for k, v in validated.items():
            setattr(instance, k, v)
        instance.save()
        if stops is not None:
            self._save_stops(instance, stops)
        return instance
