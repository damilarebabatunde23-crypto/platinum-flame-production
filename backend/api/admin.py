from django.contrib import admin
from django.utils.html import format_html
from .models import Inquiry, TalentSubmission, StageBooking, JobApplication, ClientPortalToken

# Custom Admin Site Branding
admin.site.site_header = "PLATINUM FLAME PRODUCTION LLC — Executive Operations"
admin.site.site_title = "Platinum Flame Studio Control"
admin.site.index_title = "Studio Acquisitions, Casting & Stage Management"

@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ('reference_code', 'full_name', 'email', 'company', 'project_title', 'budget_tier', 'status_badge', 'created_at')
    list_filter = ('status', 'budget_tier', 'filming_lot', 'nda_requested', 'created_at')
    search_fields = ('reference_code', 'full_name', 'email', 'company', 'project_title', 'details')
    readonly_fields = ('reference_code', 'created_at')
    date_hierarchy = 'created_at'

    def status_badge(self, obj):
        colors = {
            'pending_review': '#f97316',
            'in_review': '#eab308',
            'greenlit': '#22c55e',
            'archived': '#71717a'
        }
        color = colors.get(obj.status, '#3b82f6')
        return format_html(
            '<span style="background-color: {}; color: #000; padding: 3px 8px; border-radius: 4px; font-weight: bold; font-family: monospace; font-size: 11px;">{}</span>',
            color,
            obj.status.upper()
        )
    status_badge.short_description = "Status"


@admin.register(TalentSubmission)
class TalentSubmissionAdmin(admin.ModelAdmin):
    list_display = ('reference_code', 'talent_name', 'email', 'phone', 'agency', 'primary_category', 'guild_status', 'created_at')
    list_filter = ('guild_status', 'primary_category', 'created_at')
    search_fields = ('reference_code', 'talent_name', 'email', 'agency', 'bio_notes')
    readonly_fields = ('reference_code', 'created_at')


@admin.register(StageBooking)
class StageBookingAdmin(admin.ModelAdmin):
    list_display = ('reference_code', 'client_name', 'company', 'stage_name', 'location', 'duration_weeks', 'estimated_subtotal', 'created_at')
    list_filter = ('stage_name', 'location', 'status', 'created_at')
    search_fields = ('reference_code', 'client_name', 'company', 'stage_name')
    readonly_fields = ('reference_code', 'created_at')


@admin.register(JobApplication)
class JobApplicationAdmin(admin.ModelAdmin):
    list_display = ('reference_code', 'full_name', 'job_title', 'job_department', 'email', 'phone', 'created_at')
    list_filter = ('job_department', 'status', 'created_at')
    search_fields = ('reference_code', 'full_name', 'job_title', 'email')
    readonly_fields = ('reference_code', 'created_at')


@admin.register(ClientPortalToken)
class ClientPortalTokenAdmin(admin.ModelAdmin):
    list_display = ('access_token', 'client_name', 'tier', 'is_active', 'created_at')
    list_filter = ('is_active', 'tier')
    search_fields = ('access_token', 'client_name')
