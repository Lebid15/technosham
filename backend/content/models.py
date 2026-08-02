"""نماذج محتوى الموقع وإعدادات المظهر."""
from django.db import models


class SiteSettings(models.Model):
    """إعدادات الموقع والمظهر — سجلّ واحد فقط (Singleton)."""

    FONT_CHOICES = [
        ("Cairo", "Cairo"),
        ("Tajawal", "Tajawal"),
        ("Almarai", "Almarai"),
        ("IBM Plex Sans Arabic", "IBM Plex Sans Arabic"),
        ("Rubik", "Rubik"),
    ]

    brand_name = models.CharField("اسم العلامة", max_length=80, default="تكنو شام")

    # المظهر (Theme)
    color_primary = models.CharField("اللون الأساسي", max_length=9, default="#0f9b73")
    color_primary_2 = models.CharField("الأساسي الفاتح", max_length=9, default="#16b98a")
    color_deep = models.CharField("اللون الغامق", max_length=9, default="#0a3b2c")
    color_gold = models.CharField("لون التمييز", max_length=9, default="#d8a43f")
    color_paper = models.CharField("لون الخلفية", max_length=9, default="#f5f2ea")
    color_ink = models.CharField("لون النص", max_length=9, default="#16211d")
    font_family = models.CharField("الخط", max_length=40, choices=FONT_CHOICES, default="Cairo")
    base_font_size = models.PositiveSmallIntegerField("حجم الخط الأساسي (px)", default=16)
    radius = models.PositiveSmallIntegerField("استدارة الحواف (px)", default=20)
    dark_mode = models.BooleanField("الوضع الداكن", default=False)

    # محتوى الواجهة
    hero_title = models.CharField("عنوان الواجهة", max_length=160, default="نصمّم ونبرمج مواقع")
    hero_highlight = models.CharField("الكلمة المميّزة", max_length=80, default="تُبهر عملاءك")
    hero_title_end = models.CharField("تكملة العنوان", max_length=80, default="من أول نظرة.")
    hero_subtitle = models.TextField(
        "الوصف",
        default="استوديو تكنو شام يحوّل أفكارك إلى تجارب رقمية بسيطة وأنيقة — أي موقع تحتاجه، بذوقٍ عالٍ وأداءٍ لا يخذلك.",
    )
    about_text = models.TextField("نبذة من نحن", blank=True, default="")

    # التواصل
    whatsapp = models.CharField("واتساب", max_length=40, blank=True, default="9665XXXXXXXX")
    email = models.EmailField("البريد", blank=True, default="info@technosham.com")
    phone = models.CharField("الهاتف", max_length=40, blank=True, default="+9665XXXXXXXX")
    github = models.URLField("GitHub", blank=True, default="https://github.com/technosham")
    linkedin = models.URLField("LinkedIn", blank=True, default="https://linkedin.com/in/technosham")
    x_url = models.URLField("X", blank=True, default="https://x.com/technosham")
    instagram = models.URLField("Instagram", blank=True, default="https://instagram.com/technosham")

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "إعدادات الموقع"
        verbose_name_plural = "إعدادات الموقع"

    def __str__(self):
        return self.brand_name

    def save(self, *args, **kwargs):
        # فرض سجلّ واحد فقط
        self.pk = 1
        super().save(*args, **kwargs)

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class Service(models.Model):
    icon = models.CharField("الأيقونة (إيموجي)", max_length=8, default="🌐")
    title = models.CharField("العنوان", max_length=80)
    description = models.TextField("الوصف")
    order = models.PositiveSmallIntegerField("الترتيب", default=0)
    is_active = models.BooleanField("مفعّل", default=True)

    class Meta:
        verbose_name = "خدمة"
        verbose_name_plural = "الخدمات"
        ordering = ["order", "id"]

    def __str__(self):
        return self.title


class ProcessStep(models.Model):
    number = models.CharField("الرقم", max_length=4, default="١")
    title = models.CharField("العنوان", max_length=60)
    description = models.TextField("الوصف")
    order = models.PositiveSmallIntegerField("الترتيب", default=0)

    class Meta:
        verbose_name = "خطوة عمل"
        verbose_name_plural = "خطوات العمل"
        ordering = ["order", "id"]

    def __str__(self):
        return self.title


class Project(models.Model):
    GRADIENT_CHOICES = [("", "أخضر"), ("alt", "ذهبي"), ("alt2", "فيروزي")]

    title = models.CharField("العنوان", max_length=100)
    description = models.TextField("الوصف")
    emoji = models.CharField("الرمز", max_length=8, default="🌐")
    gradient = models.CharField("التدرّج", max_length=8, choices=GRADIENT_CHOICES, blank=True, default="")
    tags = models.CharField("الوسوم (مفصولة بفاصلة)", max_length=160, blank=True, default="")
    link = models.URLField("الرابط", blank=True, default="")
    order = models.PositiveSmallIntegerField("الترتيب", default=0)
    is_active = models.BooleanField("مفعّل", default=True)

    class Meta:
        verbose_name = "مشروع"
        verbose_name_plural = "المشاريع"
        ordering = ["order", "id"]

    def __str__(self):
        return self.title

    @property
    def tag_list(self):
        return [t.strip() for t in self.tags.split(",") if t.strip()]


class Testimonial(models.Model):
    name = models.CharField("الاسم", max_length=80)
    role = models.CharField("الصفة", max_length=80, blank=True, default="")
    quote = models.TextField("الرأي")
    rating = models.PositiveSmallIntegerField("التقييم", default=5)
    order = models.PositiveSmallIntegerField("الترتيب", default=0)
    is_active = models.BooleanField("مفعّل", default=True)

    class Meta:
        verbose_name = "رأي عميل"
        verbose_name_plural = "آراء العملاء"
        ordering = ["order", "id"]

    def __str__(self):
        return self.name

    @property
    def initial(self):
        return self.name.strip()[0] if self.name.strip() else "؟"


class Stat(models.Model):
    label = models.CharField("التسمية", max_length=60)
    value = models.PositiveIntegerField("القيمة", default=0)
    suffix = models.CharField("لاحقة", max_length=6, blank=True, default="+")
    order = models.PositiveSmallIntegerField("الترتيب", default=0)

    class Meta:
        verbose_name = "إحصائية"
        verbose_name_plural = "الإحصائيات"
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.label}: {self.value}"


class ContactMessage(models.Model):
    name = models.CharField("الاسم", max_length=80)
    email = models.EmailField("البريد")
    message = models.TextField("الرسالة")
    is_read = models.BooleanField("مقروءة", default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "رسالة تواصل"
        verbose_name_plural = "رسائل التواصل"
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} — {self.created_at:%Y-%m-%d}"
