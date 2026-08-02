from django.urls import include, path
from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register("settings", views.SiteSettingsViewSet, basename="settings")
router.register("services", views.ServiceViewSet)
router.register("process-steps", views.ProcessStepViewSet)
router.register("projects", views.ProjectViewSet)
router.register("testimonials", views.TestimonialViewSet)
router.register("stats", views.StatViewSet)
router.register("messages", views.ContactMessageViewSet)

urlpatterns = [
    path("bootstrap/", views.public_bootstrap, name="public-bootstrap"),
    path("", include(router.urls)),
]
