from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView

from .views import RouteViewSet, me

router = DefaultRouter()
router.register("routes", RouteViewSet, basename="route")

urlpatterns = [
    path("auth/login/", TokenObtainPairView.as_view()),
    path("auth/me/", me),
    path("", include(router.urls)),
]
