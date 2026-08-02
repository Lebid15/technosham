from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register("external-sites", views.ExternalSiteViewSet)

urlpatterns = [
    path("overview/", views.overview, name="overview"),
    path("ingest/", views.ingest, name="ingest"),
    path("", include(router.urls)),
]
