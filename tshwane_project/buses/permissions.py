from rest_framework.permissions import SAFE_METHODS, BasePermission

HELPER_GROUP = "Helper"


def role_of(user):
    if user.is_staff:
        return "admin"
    if user.groups.filter(name=HELPER_GROUP).exists():
        return "helper"
    return "viewer"


def can_edit(user):
    return user.is_authenticated and role_of(user) in ("admin", "helper")


class IsHelperOrReadOnly(BasePermission):
    """Anyone can read. Helpers can add routes and change their own. Admins can change any."""

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return can_edit(request.user)

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_staff or obj.created_by_id == request.user.id
