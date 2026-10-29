"""
Automatic superuser setup script for Render deployment.
Ensures the 'admin' account always exists with valid credentials.
"""
import os
import sys
from pathlib import Path

# Ensure backend directory is in python path
BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'studio_backend.settings')

import django
django.setup()

from django.contrib.auth import get_user_model

def setup_admin():
    User = get_user_model()
    username = os.getenv('DJANGO_SUPERUSER_USERNAME', 'admin')
    email = os.getenv('DJANGO_SUPERUSER_EMAIL', 'mypersonalemailboxln@gmail.com')
    password = os.getenv('DJANGO_SUPERUSER_PASSWORD', 'platinum2026!')

    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username=username, email=email, password=password)
        print(f"[Admin Setup] Superuser '{username}' created successfully.")
    else:
        user = User.objects.get(username=username)
        user.set_password(password)
        user.is_staff = True
        user.is_superuser = True
        user.save()
        print(f"[Admin Setup] Superuser '{username}' credentials updated successfully.")

if __name__ == '__main__':
    setup_admin()
