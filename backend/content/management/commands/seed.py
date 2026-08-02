"""تعبئة بيانات تجريبية للموقع ولوحة التحكم."""
import random

from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.utils import timezone

from content.models import (
    ProcessStep,
    Project,
    Service,
    SiteSettings,
    Stat,
    Testimonial,
)
from integrations.models import ExternalSite, MetricSnapshot


class Command(BaseCommand):
    help = "تعبئة بيانات تجريبية (محتوى + مواقع مرتبطة + مستخدم مشرف)."

    def handle(self, *args, **options):
        User = get_user_model()
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser("admin", "admin@technosham.com", "admin12345")
            self.stdout.write(self.style.SUCCESS("أُنشئ المشرف: admin / admin12345"))

        SiteSettings.load()

        services = [
            ("🌐", "مواقع تعريفية", "موقع أنيق يعرّف بعلامتك التجارية ويجذب العملاء."),
            ("🛒", "متاجر إلكترونية", "متجر متكامل بتجربة شراء سلسة وبوابات دفع آمنة."),
            ("⚙️", "أنظمة وتطبيقات", "لوحات تحكم وأنظمة إدارة مخصّصة تناسب عملك."),
            ("🎨", "تصميم UI/UX", "تصاميم تضع المستخدم أولاً — جميلة وسهلة."),
            ("📱", "مواقع متجاوبة", "يعمل موقعك بشكل مثالي على جميع الأجهزة."),
            ("🚀", "تحسين وسرعة (SEO)", "نحسّن موقعك لمحركات البحث ونرفع سرعته."),
        ]
        if not Service.objects.exists():
            for i, (icon, title, desc) in enumerate(services):
                Service.objects.create(icon=icon, title=title, description=desc, order=i)

        steps = [
            ("١", "نستمع", "نفهم فكرتك وأهدافك وجمهورك بدقّة قبل أي شيء."),
            ("٢", "نصمّم", "نرسم تصميماً أنيقاً يعكس هويتك ويأخذ موافقتك."),
            ("٣", "نبرمج", "نحوّل التصميم إلى موقع سريع ونظيف يعمل بلا عيوب."),
            ("٤", "نُطلق", "نطلق موقعك ونبقى بجانبك بالدعم المستمر."),
        ]
        if not ProcessStep.objects.exists():
            for i, (num, title, desc) in enumerate(steps):
                ProcessStep.objects.create(number=num, title=title, description=desc, order=i)

        projects = [
            ("متجر إلكتروني", "متجر متكامل لبيع المنتجات مع نظام دفع.", "🛍️", "", "تصميم,برمجة"),
            ("لوحة تحكم إدارية", "نظام إدارة بيانات مع رسوم بيانية وتقارير.", "📊", "alt", "نظام,API"),
            ("موقع تعريفي لشركة", "موقع عصري يعرّف بخدمات الشركة.", "🌐", "alt2", "UI/UX,ويب"),
        ]
        if not Project.objects.exists():
            for i, (title, desc, emoji, grad, tags) in enumerate(projects):
                Project.objects.create(
                    title=title, description=desc, emoji=emoji,
                    gradient=grad, tags=tags, order=i,
                )

        testimonials = [
            ("أحمد الشمري", "صاحب متجر إلكتروني", "موقع رائع وسريع، والتعامل كان احترافياً. أنصح به بشدّة."),
            ("سارة عبدالله", "مديرة تسويق", "نفّذوا موقع شركتي بتصميم مبهر فاق توقعاتي، والتسليم في الموعد."),
            ("محمد العتيبي", "رائد أعمال", "أفضل فريق تعاملت معه — يفهمون ما تريده ويقدّمون حلولاً ذكية."),
        ]
        if not Testimonial.objects.exists():
            for i, (name, role, quote) in enumerate(testimonials):
                Testimonial.objects.create(name=name, role=role, quote=quote, order=i)

        if not Stat.objects.exists():
            for i, (label, value) in enumerate(
                [("مشروع منجز", 30), ("عميل سعيد", 25), ("سنوات خبرة", 4)]
            ):
                Stat.objects.create(label=label, value=value, order=i)

        # مواقع مرتبطة تجريبية + لقطات إحصائية
        if not ExternalSite.objects.exists():
            demo_sites = [
                ("متجر وطن", "https://watan.example", "store", "#0f9b73"),
                ("مدونتي التقنية", "https://blog.example", "blog", "#d8a43f"),
                ("نظام الحجوزات", "https://booking.example", "saas", "#2b7fd8"),
            ]
            for name, url, stype, color in demo_sites:
                site = ExternalSite.objects.create(
                    name=name, url=url, site_type=stype, color=color
                )
                for d in range(7):
                    MetricSnapshot.objects.create(
                        site=site,
                        visitors=random.randint(200, 2000),
                        sessions=random.randint(150, 1500),
                        new_users=random.randint(10, 200),
                        orders=random.randint(0, 80),
                        revenue=random.randint(0, 12000),
                        status=random.choice(["up", "up", "up", "degraded"]),
                        response_ms=random.randint(80, 600),
                        recorded_at=timezone.now() - timezone.timedelta(days=6 - d),
                    )
            self.stdout.write(self.style.SUCCESS("أُنشئت مواقع مرتبطة تجريبية."))

        self.stdout.write(self.style.SUCCESS("اكتملت التعبئة بنجاح ✅"))
