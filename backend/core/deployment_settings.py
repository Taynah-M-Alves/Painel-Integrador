import os
import dj_database_url
from .settings import *
from .settings import BASE_DIR

DEBUG = False
SECRET_KEY = os.environ.get('SECRET_KEY')

# Corrige: RENDER_HOST deve ser string, não lista
RENDER_HOST = os.environ.get('RENDER_EXTERNAL_HOSTNAME')

ALLOWED_HOSTS = [
    RENDER_HOST,
    "localhost",
    "127.0.0.1",
    "painel-integrador.onrender.com",
]

CSRF_TRUSTED_ORIGINS = [
    f"https://{RENDER_HOST}",
    "https://painel-integrador.onrender.com",
    "https://painel-integrador.vercel.app",
]

CORS_ALLOW_ALL_ORIGINS = False

CORS_ALLOWED_ORIGINS = [
    "https://painel-integrador.vercel.app",
]

CORS_ALLOW_HEADERS = ["*"]
CORS_ALLOW_METHODS = ["*"]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',   # CORS SEMPRE NO TOPO
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage",
    },
}

DATABASES = {
    'default': dj_database_url.config(
        default=os.environ['DATABASE_URL'],
        conn_max_age=600
    )
}
