from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "dev-secret-key-change-me")
DEBUG = True
ALLOWED_HOSTS = ["*"]

INSTALLED_APPS = [
    # Jazzmin must precede django.contrib.admin
    "jazzmin",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "corsheaders",
    "main",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "core.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "core.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}

AUTH_PASSWORD_VALIDATORS = []

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# CORS for local dev
CORS_ALLOW_ALL_ORIGINS = True

# Jazzmin basic customization (can be expanded later)
JAZZMIN_SETTINGS = {
    "site_title": "Technosham Admin",
    "site_header": "Technosham",
    "welcome_sign": "Welcome to Technosham",
    "copyright": "Technosham",
    "hide_apps": [],
    "hide_models": [],
    "order_with_respect_to": ["auth", "main"],
    "show_sidebar": True,
    "navigation_expanded": False,
    "icons": {
        "auth": "fas fa-users-cog",
        "auth.user": "fas fa-user",
        "auth.Group": "fas fa-user-group",
    },
    "changeform_format": "horizontal_tabs",
    "changeform_format_overrides": {"auth.user": "collapsible"},
}

JAZZMIN_UI_TWEAKS = {
    "theme": "flatly",  # Bootswatch theme
    "dark_mode_theme": "darkly",
    "navbar": "navbar-dark bg-primary",
    "sidebar": "sidebar-dark-primary",
    "button_classes": {
        "primary": "btn-primary",
        "secondary": "btn-outline-secondary",
    },
}
