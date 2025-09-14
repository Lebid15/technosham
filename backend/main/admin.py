from django.contrib import admin
from .models import AboutPage


@admin.register(AboutPage)
class AboutPageAdmin(admin.ModelAdmin):
	list_display = ("__str__", "updated_at")
	search_fields = ("title", "content", "title_en", "title_ar", "title_tr", "content_en", "content_ar", "content_tr")
	fieldsets = (
		("Legacy (fallback)", {"fields": ("title", "content")}),
		("English", {"fields": ("title_en", "content_en")}),
		("Arabic", {"fields": ("title_ar", "content_ar")} ),
		("Turkish", {"fields": ("title_tr", "content_tr")} ),
	)
