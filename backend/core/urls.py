"""مسارات المشروع الرئيسية."""
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    # مصادقة لوحة التحكم (JWT)
    path("api/auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # واجهات البرمجة
    path("api/", include("content.urls")),
    path("api/", include("integrations.urls")),
]
