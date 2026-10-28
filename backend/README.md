# PLATINUM FLAME PRODUCTION LLC — PRODUCTION BACKEND

This backend is a production-hardened **Django REST Framework (DRF)** application designed for high-concurrency movie studio operations, executive acquisitions routing, and direct Gmail dispatch.

---

## Architecture & Features

- **Framework:** Django 5+ / 6+ with Django REST Framework (DRF)
- **Database Support:** 
  - Automatically uses **PostgreSQL** in production when `DATABASE_URL` is set (Render, Railway, Supabase Postgres, AWS RDS, Heroku).
  - Automatically falls back to **SQLite** locally (`db.sqlite3`) for instant zero-dependency development.
- **Static Assets:** Handled via **WhiteNoise** with Gzip/Brotli compression and long-term cache headers.
- **Security:** HSTS, SSL redirect, CSRF trusted origins, and secure session cookies in production.
- **Rate-Limiting (Throttling):** 60 requests/minute per IP on public form endpoints to prevent spam attacks.
- **Email Engine:** Rich HTML Studio Dossier emails with direct `Reply-To` set to the client.

---

## 1. Fast Local Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
pip install -r requirements.txt

# 3. Apply database migrations
python manage.py migrate

# 4. Create an admin superuser
python manage.py createsuperuser

# 5. Run development server
python manage.py runserver 127.0.0.1:8000
```

- API Directory: [http://127.0.0.1:8000/api/](http://127.0.0.1:8000/api/)
- Healthcheck: [http://127.0.0.1:8000/api/health/](http://127.0.0.1:8000/api/health/)
- Studio Admin: [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)

---

## 2. Production Hosting Options

### Option A: Render.com (Recommended — Free & Easiest)
1. Push your repository to GitHub.
2. Sign in to [Render.com](https://render.com).
3. Click **"New"** ➔ **"Blueprint"** and select your repository.
4. Render will read [`backend/render.yaml`](./render.yaml) automatically:
   - Sets up a free PostgreSQL database (`platinum-flame-db`).
   - Sets up a free Web Service running Gunicorn.
5. In Render Dashboard ➔ Environment Variables, set:
   - `GMAIL_APP_PASSWORD`: Your 16-character Google App Password.
6. Copy your live Render URL (e.g., `https://platinum-flame-backend.onrender.com`) and update `VITE_API_URL` in your frontend!

---

### Option B: Railway.app
1. Push to GitHub.
2. In [Railway.app](https://railway.app), click **"New Project"** ➔ **"Deploy from GitHub repo"**.
3. Select the repository and set the root directory to `backend`.
4. Add a **PostgreSQL** service in Railway (Railway automatically sets `DATABASE_URL`).
5. Add Environment Variables:
   - `DJANGO_DEBUG=False`
   - `DJANGO_SECRET_KEY=your-random-production-secret-key`
   - `GMAIL_USER=mypersonalemailboxln@gmail.com`
   - `GMAIL_APP_PASSWORD=your-app-password`
6. Deploy!

---

### Option C: Docker / Docker Compose
To run both the Django API and PostgreSQL in isolated Docker containers:

```bash
cd backend
docker-compose up --build
```
The API will run on `http://localhost:8000`.

---

### Option D: Ubuntu VPS (DigitalOcean, AWS EC2, Linode)
1. Install Python 3.11+, Nginx, and Git:
   ```bash
   sudo apt update && sudo apt install -y python3-pip python3-venv nginx git
   ```
2. Clone repo and create venv:
   ```bash
   git clone <repo-url> /var/www/platinum-flame
   cd /var/www/platinum-flame/backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   python manage.py migrate
   python manage.py collectstatic --noinput
   ```
3. Set up **Systemd service** (`/etc/systemd/system/platinum.service`):
   ```ini
   [Unit]
   Description=Gunicorn instance to serve Platinum Flame Production
   After=network.target

   [Service]
   User=www-data
   Group=www-data
   WorkingDirectory=/var/www/platinum-flame/backend
   Environment="PATH=/var/www/platinum-flame/backend/venv/bin"
   ExecStart=/var/www/platinum-flame/backend/venv/bin/gunicorn --workers 3 --bind unix:/var/www/platinum-flame/backend/platinum.sock studio_backend.wsgi:application

   [Install]
   WantedBy=multi-user.target
   ```
4. Start the service and configure Nginx proxying.

---

## 3. Environment Variables Reference

| Variable | Default (Dev) | Description |
| :--- | :--- | :--- |
| `DJANGO_DEBUG` | `True` | Set to `False` in production! |
| `DJANGO_SECRET_KEY` | *(insecure dev key)* | Strong random 50-character string |
| `DATABASE_URL` | None (uses SQLite) | PostgreSQL connection string |
| `ALLOWED_HOSTS` | `localhost,127.0.0.1` | Comma-separated list of your live domains |
| `CSRF_TRUSTED_ORIGINS` | `http://localhost:5173` | Comma-separated list of origins permitted to POST |
| `STUDIO_NOTIFICATION_EMAIL` | `mypersonalemailboxln@gmail.com` | Destination inbox for leads & submissions |
| `GMAIL_USER` | `mypersonalemailboxln@gmail.com` | Your Gmail address |
| `GMAIL_APP_PASSWORD` | *(empty)* | 16-character Google App Password |
