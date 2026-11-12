from rest_framework import viewsets
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Route
from .permissions import IsHelperOrReadOnly, role_of
from .serializers import RouteSerializer


class RouteViewSet(viewsets.ModelViewSet):
    queryset = Route.objects.select_related("created_by").prefetch_related("stops")
    serializer_class = RouteSerializer
    permission_classes = [IsHelperOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    return Response({"username": request.user.username, "role": role_of(request.user)})
