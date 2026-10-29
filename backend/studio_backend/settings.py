"""
Django Production Settings for Platinum Flame Production LLC.
Configured for local development, Docker, Render, Railway, AWS, and Ubuntu VPS.
"""
from pathlib import Path
import os
import dj_database_url
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables (.env from project root or backend folder)
root_env = BASE_DIR.parent / '.env'
if root_env.exists():
    load_dotenv(root_env)
else:
    load_dotenv(BASE_DIR / '.env')

# Security
SECRET_KEY = os.getenv('DJANGO_SECRET_KEY', 'django-insecure-platinum-flame-production-llc-secret-key-2026')
DEBUG = os.getenv('DJANGO_DEBUG', 'True').lower() in ('true', '1', 't')

ALLOWED_HOSTS = [
    host.strip() for host in os.getenv(
        'ALLOWED_HOSTS',
        'localhost,127.0.0.1,0.0.0.0,.onrender.com,.railway.app,.herokuapp.com'
    ).split(',') if host.strip()
]
if '*' not in ALLOWED_HOSTS and DEBUG:
    ALLOWED_HOSTS.append('*')

# Applications
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'whitenoise.runserver_nostatic',
    'django.contrib.staticfiles',
    
    # Third-party apps
    'rest_framework',
    'corsheaders',
    
    # Internal apps
    'api',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'studio_backend.urls'

FRONTEND_DIR = BASE_DIR.parent / 'dist'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [
            BASE_DIR / 'templates',
            FRONTEND_DIR,
        ],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'studio_backend.wsgi.application'

# Database Configuration
# Uses DATABASE_URL (PostgreSQL) if set (Render, Railway, Heroku, AWS); otherwise SQLite.
DATABASE_URL = os.getenv('DATABASE_URL')
if DATABASE_URL:
    DATABASES = {
        'default': dj_database_url.config(
            default=DATABASE_URL,
            conn_max_age=600,
            conn_health_checks=True,
        )
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'America/New_York'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static'] if (BASE_DIR / 'static').exists() else []

# WhiteNoise production compression & caching
STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}
WHITENOISE_MANIFEST_STRICT = False

# Media files (Pitch decks, lookbooks, actor headshots, resumes)
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
MAX_UPLOAD_SIZE = 52428800  # 50MB max file upload

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# Django REST Framework (DRF) Production Configuration
REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ] if not DEBUG else [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser',
    ],
    'DEFAULT_THROTTLE_CLASSES': [
        'rest_framework.throttling.AnonRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES': {
        'anon': '60/minute',  # Protect against form spam / bots
    }
}

# CORS Configuration
CORS_ALLOW_ALL_ORIGINS = os.getenv('CORS_ALLOW_ALL_ORIGINS', 'True').lower() in ('true', '1')
CORS_ALLOW_CREDENTIALS = True

# CSRF Trusted Origins for Hosting
CSRF_TRUSTED_ORIGINS = [
    origin.strip() for origin in os.getenv(
        'CSRF_TRUSTED_ORIGINS',
        'http://localhost:5173,http://localhost:4173,http://127.0.0.1:5173,http://127.0.0.1:4173,https://*.onrender.com,https://*.railway.app'
    ).split(',') if origin.strip()
]

# Production Security Headers (Active when DEBUG=False)
if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SECURE_SSL_REDIRECT = os.getenv('SECURE_SSL_REDIRECT', 'True').lower() in ('true', '1')
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    X_FRAME_OPTIONS = 'DENY'

# Studio Notification Desk
NOTIFICATION_RECIPIENT_EMAIL = os.getenv('STUDIO_NOTIFICATION_EMAIL', 'mypersonalemailboxln@gmail.com')
STUDIO_PHONE = os.getenv('VITE_STUDIO_PHONE', '+1 907-205-2163')
STUDIO_ADDRESS = os.getenv('VITE_STUDIO_ADDRESS', '1809 Forest Avenue, New York, NY 10001 USA')

GMAIL_USER = os.getenv('GMAIL_USER', 'mypersonalemailboxln@gmail.com')
GMAIL_APP_PASSWORD = os.getenv('GMAIL_APP_PASSWORD', 'qwfx izpe noev dbll')

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = int(os.getenv('EMAIL_PORT', 587))
EMAIL_USE_TLS = os.getenv('EMAIL_USE_TLS', 'True').lower() in ('true', '1')
EMAIL_USE_SSL = os.getenv('EMAIL_USE_SSL', 'False').lower() in ('true', '1')
EMAIL_HOST_USER = GMAIL_USER
EMAIL_HOST_PASSWORD = GMAIL_APP_PASSWORD.replace(' ', '')
EMAIL_TIMEOUT = 10
DEFAULT_FROM_EMAIL = f'Platinum Flame Production <{GMAIL_USER}>'

# Resend HTTPS API Key for cloud hosts (e.g. Render free tier which blocks SMTP ports)
RESEND_API_KEY = os.getenv('RESEND_API_KEY', '')
