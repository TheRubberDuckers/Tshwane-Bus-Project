from django.conf import settings
from django.db import models


class Route(models.Model):
    name = models.CharField(max_length=120, unique=True)
    color = models.CharField(max_length=7, default="#2d6a4f")
    # [[lat, lng], [lat, lng], ...] - same order Leaflet uses
    coordinates = models.JSONField()
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL, null=True, blank=True,
        on_delete=models.SET_NULL, related_name="routes",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name


class Stop(models.Model):
    route = models.ForeignKey(Route, on_delete=models.CASCADE, related_name="stops")
    name = models.CharField(max_length=120)
    latitude = models.FloatField()
    longitude = models.FloatField()
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.route.name}: {self.name}"
