from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# In-memory settings (for demo)
STATE = {
    "theme": "light",
    "lang": "en",
}

TRANSLATIONS = {
    "en": {
        "home": "Home",
        "services": "Services",
        "products": "Products",
        "about": "About Technosham",
        "settings": "Settings",
        "webdev": "Web Development",
        "design": "Graphic Design",
        "training": "Training Courses",
        "mobile": "Mobile Apps",
        "remote_it": "Remote IT Support",
        "watan": "Watan platform for app/game top-up",
        "saas": "SaaS marketplace",
        "courses": "Courses",
        "theme": "Theme",
        "language": "Language",
        "light": "Light",
        "dark": "Dark",
    },
    "ar": {
        "home": "الصفحة الرئيسية",
        "services": "الخدمات",
        "products": "المنتجات",
    "about": "عن تكنوشام",
        "settings": "الإعدادات",
        "webdev": "تطوير الويب",
        "design": "التصميم الجرافيكي",
        "training": "الدورات التدريبية",
        "mobile": "تطبيقات الهواتف",
        "remote_it": "الدعم الفني عن بُعد",
        "watan": "منصة وطن لشحن التطبيقات والألعاب",
        "saas": "سوق البرمجيات كخدمة",
        "courses": "الدورات",
        "theme": "السمة",
        "language": "اللغة",
        "light": "فاتح",
        "dark": "داكن",
    },
    "tr": {
        "home": "Ana Sayfa",
        "services": "Hizmetler",
        "products": "Ürünler",
        "about": "Technosham Hakkında",
        "settings": "Ayarlar",
        "webdev": "Web Geliştirme",
        "design": "Grafik Tasarım",
        "training": "Eğitim Kursları",
        "mobile": "Mobil Uygulamalar",
        "remote_it": "Uzaktan BT Desteği",
        "watan": "Uygulama/oyun bakiye (Watan platformu)",
        "saas": "SaaS pazaryeri",
        "courses": "Kurslar",
        "theme": "Tema",
        "language": "Dil",
        "light": "Açık",
        "dark": "Koyu",
    },
}

MENU_STRUCTURE = [
    {"key": "home", "href": "/"},
    {
        "key": "services",
        "children": [
            {"key": "webdev", "href": "/services/web-development"},
            {"key": "design", "href": "/services/graphic-design"},
            {"key": "training", "href": "/services/training-courses"},
            {"key": "mobile", "href": "/services/mobile-apps"},
            {"key": "remote_it", "href": "/services/remote-it-support"},
        ],
    },
    {
        "key": "products",
        "children": [
            {"key": "watan", "href": "/products/watan"},
            {"key": "saas", "href": "/products/saas-marketplace"},
            {"key": "courses", "href": "/products/courses"},
        ],
    },
    {"key": "about", "href": "/about"},
    {
        "key": "settings",
        "children": [
            {"key": "theme", "type": "toggle_theme"},
            {"key": "language", "type": "select_language", "options": ["en", "ar", "tr"]},
        ],
    },
]


def translate_menu(lang: str):
    labels = TRANSLATIONS.get(lang, TRANSLATIONS["en"])
    return {
        "labels": labels,
        "menu": MENU_STRUCTURE,
        "meta": {"lang": lang, "rtl": lang == "ar"},
    }


def menu(request):
    lang = request.GET.get("lang", STATE["lang"])  # default to current state
    data = translate_menu(lang)
    return JsonResponse(data)


@csrf_exempt
def settings_view(request):
    if request.method == "GET":
        return JsonResponse(STATE)
    if request.method == "POST":
        try:
            payload = json.loads(request.body.decode("utf-8"))
        except Exception:
            return JsonResponse({"error": "invalid json"}, status=400)
        theme = payload.get("theme")
        lang = payload.get("lang")
        if theme in ("light", "dark"):
            STATE["theme"] = theme
        if lang in ("en", "ar", "tr"):
            STATE["lang"] = lang
        return JsonResponse(STATE)
    return JsonResponse({"error": "method not allowed"}, status=405)
