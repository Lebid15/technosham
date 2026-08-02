from django.contrib import admin

from .models import ExternalSite, MetricSnapshot


@admin.register(ExternalSite)
class ExternalSiteAdmin(admin.ModelAdmin):
    list_display = ["name", "site_type", "url", "is_active", "api_key", "created_at"]
    list_filter = ["site_type", "is_active"]
    readonly_fields = ["api_key", "created_at"]


@admin.register(MetricSnapshot)
class MetricSnapshotAdmin(admin.ModelAdmin):
    list_display = ["site", "visitors", "orders", "new_users", "status", "recorded_at"]
    list_filter = ["site", "status"]
    date_hierarchy = "recorded_at"
