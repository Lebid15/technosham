"""نماذج ربط المواقع الخارجية وجمع إحصائياتها عبر API عام."""
import secrets

from django.db import models
from django.utils import timezone


def generate_api_key():
    return secrets.token_urlsafe(24)


class ExternalSite(models.Model):
    """موقع خارجي (من مواقعك) يرسل إحصائياته إلى هذه اللوحة."""

    TYPE_CHOICES = [
        ("store", "متجر إلكتروني"),
        ("blog", "مدونة"),
        ("saas", "نظام/SaaS"),
        ("landing", "موقع تعريفي"),
        ("other", "أخرى"),
    ]

    name = models.CharField("اسم الموقع", max_length=100)
    url = models.URLField("رابط الموقع", blank=True, default="")
    site_type = models.CharField("النوع", max_length=16, choices=TYPE_CHOICES, default="other")
    color = models.CharField("لون مميّز", max_length=9, default="#0f9b73")
    api_key = models.CharField("مفتاح API", max_length=64, unique=True, default=generate_api_key, editable=False)
    is_active = models.BooleanField("مفعّل", default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "موقع مرتبط"
        verbose_name_plural = "المواقع المرتبطة"
        ordering = ["name"]

    def __str__(self):
        return self.name

    def rotate_key(self):
        self.api_key = generate_api_key()
        self.save(update_fields=["api_key"])

    @property
    def latest(self):
        return self.snapshots.first()


class MetricSnapshot(models.Model):
    """لقطة إحصائية لحظية لموقع مرتبط."""

    STATUS_CHOICES = [("up", "يعمل"), ("down", "متوقّف"), ("degraded", "بطيء")]

    site = models.ForeignKey(ExternalSite, related_name="snapshots", on_delete=models.CASCADE)
    visitors = models.PositiveIntegerField("الزيارات", default=0)
    sessions = models.PositiveIntegerField("الجلسات", default=0)
    new_users = models.PositiveIntegerField("مستخدمون جدد", default=0)
    orders = models.PositiveIntegerField("الطلبات", default=0)
    revenue = models.DecimalField("الإيرادات", max_digits=12, decimal_places=2, default=0)
    status = models.CharField("الحالة", max_length=10, choices=STATUS_CHOICES, default="up")
    response_ms = models.PositiveIntegerField("زمن الاستجابة (ms)", default=0)
    recorded_at = models.DateTimeField("وقت التسجيل", default=timezone.now)

    class Meta:
        verbose_name = "لقطة إحصائية"
        verbose_name_plural = "اللقطات الإحصائية"
        ordering = ["-recorded_at"]

    def __str__(self):
        return f"{self.site.name} @ {self.recorded_at:%Y-%m-%d %H:%M}"
