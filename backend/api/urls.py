from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_root, name='api_root'),
    path('health/', views.health_check, name='health_check'),
    path('inquiries/', views.inquiry_create, name='inquiry_create'),
    path('talent/', views.talent_create, name='talent_create'),
    path('stage-bookings/', views.stage_booking_create, name='stage_booking_create'),
    path('job-applications/', views.job_application_create, name='job_application_create'),
    path('verify-token/', views.verify_portal_token, name='verify_portal_token'),
    path('test-email/', views.test_email, name='test_email'),
]
