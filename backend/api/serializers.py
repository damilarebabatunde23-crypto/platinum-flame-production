from rest_framework import serializers
from .models import Inquiry, TalentSubmission, StageBooking, JobApplication, ClientPortalToken

MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB
ALLOWED_EXTENSIONS = ['.pdf', '.docx', '.fdx', '.jpg', '.jpeg', '.png', '.zip', '.mp4']

def validate_uploaded_file(file_obj):
    if file_obj:
        if file_obj.size > MAX_FILE_SIZE:
            raise serializers.ValidationError(f"File size exceeds maximum allowable limit of 50MB.")
        ext = '.' + file_obj.name.split('.')[-1].lower() if '.' in file_obj.name else ''
        if ext and ext not in ALLOWED_EXTENSIONS:
            raise serializers.ValidationError(f"File type {ext} not permitted. Allowed: {', '.join(ALLOWED_EXTENSIONS)}")
    return file_obj

class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = [
            'id', 'reference_code', 'full_name', 'company', 'email', 'phone',
            'project_title', 'budget_tier', 'timeline', 'filming_lot',
            'selected_services', 'details', 'nda_requested', 'screening_requested',
            'attachment', 'status', 'created_at'
        ]
        read_only_fields = ['id', 'reference_code', 'status', 'created_at']

    def validate_attachment(self, value):
        return validate_uploaded_file(value)


class TalentSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TalentSubmission
        fields = [
            'id', 'reference_code', 'talent_name', 'agency', 'agent_contact',
            'email', 'phone', 'guild_status', 'primary_category', 'reel_url',
            'headshot', 'resume', 'bio_notes', 'status', 'created_at'
        ]
        read_only_fields = ['id', 'reference_code', 'status', 'created_at']

    def validate_headshot(self, value):
        return validate_uploaded_file(value)

    def validate_resume(self, value):
        return validate_uploaded_file(value)


class StageBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = StageBooking
        fields = [
            'id', 'reference_code', 'client_name', 'company', 'email', 'phone',
            'stage_name', 'location', 'duration_weeks', 'start_date',
            'needs_lighting_package', 'needs_virtual_production_crew',
            'needs_dressing_rooms', 'estimated_subtotal', 'status', 'created_at'
        ]
        read_only_fields = ['id', 'reference_code', 'status', 'created_at']


class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = [
            'id', 'reference_code', 'job_title', 'job_department',
            'full_name', 'email', 'phone', 'portfolio_url', 'resume',
            'cover_note', 'status', 'created_at'
        ]
        read_only_fields = ['id', 'reference_code', 'status', 'created_at']

    def validate_resume(self, value):
        return validate_uploaded_file(value)


class ClientPortalTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientPortalToken
        fields = ['access_token', 'client_name', 'tier', 'is_active', 'created_at']
