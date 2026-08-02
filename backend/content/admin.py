from django.contrib import admin

from .models import (
    ContactMessage,
    ProcessStep,
    Project,
    Service,
    SiteSettings,
    Stat,
    Testimonial,
)


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ["brand_name", "font_family", "base_font_size", "updated_at"]

    def has_add_permission(self, request):
        # سجلّ واحد فقط
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ["title", "icon", "order", "is_active"]
    list_editable = ["order", "is_active"]


@admin.register(ProcessStep)
class ProcessStepAdmin(admin.ModelAdmin):
    list_display = ["number", "title", "order"]
    list_editable = ["order"]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["title", "emoji", "tags", "order", "is_active"]
    list_editable = ["order", "is_active"]


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ["name", "role", "rating", "order", "is_active"]
    list_editable = ["order", "is_active"]


@admin.register(Stat)
class StatAdmin(admin.ModelAdmin):
    list_display = ["label", "value", "suffix", "order"]
    list_editable = ["value", "order"]


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "is_read", "created_at"]
    list_filter = ["is_read", "created_at"]
    readonly_fields = ["created_at"]
