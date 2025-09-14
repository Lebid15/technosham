from django.db import models


class AboutPage(models.Model):
	# Legacy default (will mirror English if used)
	title = models.CharField(max_length=255)
	content = models.TextField()

	# Multilingual fields
	title_en = models.CharField(max_length=255, blank=True, null=True)
	title_ar = models.CharField(max_length=255, blank=True, null=True)
	title_tr = models.CharField(max_length=255, blank=True, null=True)
	content_en = models.TextField(blank=True, null=True)
	content_ar = models.TextField(blank=True, null=True)
	content_tr = models.TextField(blank=True, null=True)

	updated_at = models.DateTimeField(auto_now=True)

	class Meta:
		verbose_name = "About Page"
		verbose_name_plural = "About Page"

	def __str__(self):
		return self.title_en or self.title or "About Page"

	def get_localized(self, lang: str):
		lang = (lang or "en").lower()
		if lang == "ar":
			return (
				self.title_ar or self.title_en or self.title,
				self.content_ar or self.content_en or self.content,
			)
		if lang == "tr":
			return (
				self.title_tr or self.title_en or self.title,
				self.content_tr or self.content_en or self.content,
			)
		# default en
		return (
			self.title_en or self.title,
			self.content_en or self.content,
		)
