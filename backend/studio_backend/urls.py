from django.contrib import admin
from django.urls import path, re_path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
from django.views.static import serve
import os

FRONTEND_DIR = settings.BASE_DIR.parent / 'dist'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]

# Serve media files
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Serve Vite frontend static assets (/assets/...)
if (FRONTEND_DIR / 'assets').exists():
    urlpatterns += [
        re_path(r'^assets/(?P<path>.*)$', serve, {'document_root': FRONTEND_DIR / 'assets'}),
    ]

# Catch-all route to serve the React Single Page App for all client-side routes
if (FRONTEND_DIR / 'index.html').exists():
    urlpatterns += [
        re_path(r'^(?!api/|admin/|media/|static/|assets/).*$', TemplateView.as_view(template_name='index.html')),
    ]
