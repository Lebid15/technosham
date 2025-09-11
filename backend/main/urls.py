from django.urls import path
from . import views

urlpatterns = [
    path("menu", views.menu, name="menu"),
    path("settings", views.settings_view, name="settings"),
]
