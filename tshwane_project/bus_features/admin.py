from django.contrib import admin

from .models import Route, Stop


class StopInline(admin.TabularInline):
    model = Stop
    extra = 0


@admin.register(Route)
class RouteAdmin(admin.ModelAdmin):
    list_display = ("name", "color", "created_by", "updated_at")
    search_fields = ("name",)
    inlines = [StopInline]
