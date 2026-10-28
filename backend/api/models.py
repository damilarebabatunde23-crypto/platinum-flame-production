from django.db import models
import uuid

class Inquiry(models.Model):
    reference_code = models.CharField(max_length=64, unique=True)
    full_name = models.CharField(max_length=255)
    company = models.CharField(max_length=255, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=64, blank=True)
    project_title = models.CharField(max_length=255)
    budget_tier = models.CharField(max_length=128, blank=True)
    timeline = models.CharField(max_length=128, blank=True)
    filming_lot = models.CharField(max_length=255, blank=True)
    selected_services = models.TextField(blank=True, help_text="Comma-separated or JSON list of services")
    details = models.TextField(blank=True)
    nda_requested = models.BooleanField(default=True)
    screening_requested = models.BooleanField(default=False)
    attachment = models.FileField(upload_to='inquiries/', null=True, blank=True)
    status = models.CharField(max_length=64, default='pending_review')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name_plural = 'Inquiries'

    def __str__(self):
        return f"{self.reference_code} - {self.full_name} ({self.project_title})"


class TalentSubmission(models.Model):
    reference_code = models.CharField(max_length=64, unique=True)
    talent_name = models.CharField(max_length=255)
    agency = models.CharField(max_length=255, blank=True)
    agent_contact = models.CharField(max_length=255, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=64, blank=True)
    guild_status = models.CharField(max_length=128, default='SAG-AFTRA Eligible')
    primary_category = models.CharField(max_length=128, default='Lead Dramatic Actor')
    reel_url = models.URLField(blank=True)
    headshot = models.FileField(upload_to='headshots/', null=True, blank=True)
    resume = models.FileField(upload_to='resumes/', null=True, blank=True)
    bio_notes = models.TextField(blank=True)
    status = models.CharField(max_length=64, default='new_submission')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.reference_code} - {self.talent_name} ({self.primary_category})"


class StageBooking(models.Model):
    reference_code = models.CharField(max_length=64, unique=True)
    client_name = models.CharField(max_length=255)
    company = models.CharField(max_length=255, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=64, blank=True)
    stage_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255, default='New York Global Headquarters')
    duration_weeks = models.IntegerField(default=1)
    start_date = models.DateField(null=True, blank=True)
    needs_lighting_package = models.BooleanField(default=True)
    needs_virtual_production_crew = models.BooleanField(default=True)
    needs_dressing_rooms = models.BooleanField(default=True)
    estimated_subtotal = models.DecimalField(max_digits=12, decimal_places=2, default=0.00)
    status = models.CharField(max_length=64, default='hold_requested')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.reference_code} - {self.client_name} ({self.stage_name})"


class JobApplication(models.Model):
    reference_code = models.CharField(max_length=64, unique=True)
    job_title = models.CharField(max_length=255)
    job_department = models.CharField(max_length=128)
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=64, blank=True)
    portfolio_url = models.URLField(blank=True)
    resume = models.FileField(upload_to='applications/', null=True, blank=True)
    cover_note = models.TextField(blank=True)
    status = models.CharField(max_length=64, default='submitted')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.reference_code} - {self.full_name} ({self.job_title})"


class ClientPortalToken(models.Model):
    access_token = models.CharField(max_length=64, unique=True)
    client_name = models.CharField(max_length=255)
    tier = models.CharField(max_length=128, default='Executive Producer / Distributor')
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.access_token} - {self.client_name}"
