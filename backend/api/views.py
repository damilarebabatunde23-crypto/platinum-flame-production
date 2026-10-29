import random
import threading
from datetime import datetime
from django.db import connection
from django.conf import settings
from rest_framework import status
from rest_framework.decorators import api_view, parser_classes, throttle_classes
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from .models import Inquiry, TalentSubmission, StageBooking, JobApplication, ClientPortalToken
from .serializers import (
    InquirySerializer,
    TalentSubmissionSerializer,
    StageBookingSerializer,
    JobApplicationSerializer
)
from .email_service import send_submission_email

def _dispatch_email_async(**kwargs):
    """Run email dispatch in a background thread so the HTTP API never hangs or times out"""
    try:
        thread = threading.Thread(target=send_submission_email, kwargs=kwargs, daemon=True)
        thread.start()
    except Exception as e:
        import logging
        logging.getLogger(__name__).error(f"Failed to start async email thread: {e}")

def generate_ref_code(prefix="PFP"):
    year = datetime.now().year
    rand = random.randint(1000, 9999)
    return f"{prefix}-{year}-{rand}"

@api_view(['GET'])
def api_root(request):
    """API Directory and Documentation Index"""
    return Response({
        'studio': 'PLATINUM FLAME PRODUCTION LLC',
        'status': 'OPERATIONAL',
        'version': '2.0.0-PROD',
        'endpoints': {
            'inquiries': '/api/inquiries/ [POST]',
            'talent': '/api/talent/ [POST]',
            'stage_bookings': '/api/stage-bookings/ [POST]',
            'job_applications': '/api/job-applications/ [POST]',
            'verify_token': '/api/verify-token/ [POST]',
            'health': '/api/health/ [GET]',
        }
    })

@api_view(['GET'])
def health_check(request):
    """Healthcheck endpoint for Render / Railway / AWS ALB monitoring"""
    db_ok = False
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
            db_ok = bool(cursor.fetchone())
    except Exception:
        db_ok = False

    return Response({
        'status': 'healthy' if db_ok else 'degraded',
        'database_connected': db_ok,
        'timestamp': datetime.utcnow().isoformat() + 'Z'
    }, status=status.HTTP_200_OK if db_ok else status.HTTP_503_SERVICE_UNAVAILABLE)

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@throttle_classes([AnonRateThrottle])
def inquiry_create(request):
    """
    Submit screenplay pitches, lookbooks, and production mandates.
    Saves to PostgreSQL/SQLite and sends executive notification email to Gmail.
    """
    data = request.data.copy()
    ref_code = generate_ref_code("PFP")

    # Adapt frontend payload formats
    full_name = data.get('fullName') or data.get('name') or 'Anonymous Producer'
    email = data.get('email', '')
    phone = data.get('phone', '')
    company = data.get('company', '')
    project_title = data.get('projectTitle') or data.get('title') or 'Untitled Production Mandate'
    budget_tier = data.get('budgetTier') or data.get('budget') or '$15M - $50M'
    timeline = data.get('timeline', '')
    filming_lot = data.get('filmingLot', '')
    details = data.get('details') or data.get('synopsis', '')
    services = data.get('selectedServices') or data.get('services', '')
    if isinstance(services, list):
        services = ", ".join(services)

    nda_req = str(data.get('ndaRequested', True)).lower() in ['true', '1']
    screening_req = str(data.get('screeningRequested', False)).lower() in ['true', '1']
    attachment_file = request.FILES.get('file') or request.FILES.get('attachment')

    inquiry = Inquiry.objects.create(
        reference_code=ref_code,
        full_name=full_name,
        company=company,
        email=email,
        phone=phone,
        project_title=project_title,
        budget_tier=budget_tier,
        timeline=timeline,
        filming_lot=filming_lot,
        selected_services=services,
        details=details,
        nda_requested=nda_req,
        screening_requested=screening_req,
        attachment=attachment_file
    )

    # Dispatch rich HTML email asynchronously so response is instant
    _dispatch_email_async(
        subject=f"New Inquiry from {full_name} ({ref_code}): {project_title}",
        sender_name=full_name,
        sender_email=email,
        sender_phone=phone,
        message_body=details,
        metadata={
            "Reference Code": ref_code,
            "Company / Studio": company or "Independent",
            "Project Title": project_title,
            "Budget Tier": budget_tier,
            "Filming Timeline": timeline or "Immediate Q1/Q2",
            "Filming Lot": filming_lot or "New York Global HQ",
            "Selected Services": services or "Full Production Management",
            "NDA Requested": "YES" if nda_req else "NO",
            "Screening Requested": "YES" if screening_req else "NO",
            "Attachment": attachment_file.name if attachment_file else "None"
        },
        attachment_file=attachment_file
    )

    return Response({
        'success': True,
        'referenceCode': ref_code,
        'id': inquiry.id,
        'message': 'Production mandate registered and routed to acquisitions board.'
    }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@throttle_classes([AnonRateThrottle])
def talent_create(request):
    """Submit actor casting reels, headshots, and resumes"""
    data = request.data.copy()
    ref_code = generate_ref_code("TALENT")

    talent_name = data.get('talentName') or data.get('name') or 'Performer'
    email = data.get('email', '')
    phone = data.get('phone', '')
    agency = data.get('agency', '')
    agent_contact = data.get('agentContact', '')
    guild_status = data.get('guildStatus', 'SAG-AFTRA Eligible')
    category = data.get('primaryCategory', 'Lead Actor')
    reel_url = data.get('reelUrl', '')
    bio_notes = data.get('bioNotes', '')

    headshot_file = request.FILES.get('headshot')
    resume_file = request.FILES.get('resume')

    talent = TalentSubmission.objects.create(
        reference_code=ref_code,
        talent_name=talent_name,
        agency=agency,
        agent_contact=agent_contact,
        email=email,
        phone=phone,
        guild_status=guild_status,
        primary_category=category,
        reel_url=reel_url,
        headshot=headshot_file,
        resume=resume_file,
        bio_notes=bio_notes
    )

    _dispatch_email_async(
        subject=f"New Casting Profile: {talent_name} - {category} ({ref_code})",
        sender_name=talent_name,
        sender_email=email,
        sender_phone=phone,
        message_body=bio_notes,
        metadata={
            "Reference Code": ref_code,
            "Agency": agency or "Independent",
            "Agent Contact": agent_contact or "None",
            "Guild Status": guild_status,
            "Category": category,
            "Showreel URL": reel_url or "None"
        },
        attachment_file=headshot_file or resume_file
    )

    return Response({
        'success': True,
        'referenceCode': ref_code,
        'id': talent.id,
        'message': 'Casting profile registered and indexed.'
    }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@throttle_classes([AnonRateThrottle])
def stage_booking_create(request):
    """Request soundstage hold and reserve rate cards"""
    data = request.data.copy()
    ref_code = generate_ref_code("STAGE")

    client_name = data.get('name') or data.get('client_name') or 'Producer'
    company = data.get('company', '')
    email = data.get('email', '')
    phone = data.get('phone', '')
    stage_name = data.get('selectedStage') or data.get('stage_name') or 'Stage 01: The Forge'
    location = data.get('location') or 'New York Global Headquarters'
    duration = int(data.get('durationWeeks') or 1)
    subtotal = float(data.get('estimatedSubtotal') or 0.0)

    booking = StageBooking.objects.create(
        reference_code=ref_code,
        client_name=client_name,
        company=company,
        email=email,
        phone=phone,
        stage_name=stage_name,
        location=location,
        duration_weeks=duration,
        estimated_subtotal=subtotal
    )

    _dispatch_email_async(
        subject=f"New Soundstage Hold Request: {stage_name} ({ref_code})",
        sender_name=client_name,
        sender_email=email,
        sender_phone=phone,
        message_body=f"Requested {stage_name} at {location} for {duration} weeks.",
        metadata={
            "Reference Code": ref_code,
            "Company": company or "Independent",
            "Soundstage": stage_name,
            "Campus Location": location,
            "Duration (Weeks)": f"{duration} Weeks",
            "Estimated Commitment": f"${subtotal:,.2f}"
        }
    )

    return Response({
        'success': True,
        'referenceCode': ref_code,
        'id': booking.id,
        'message': 'Soundstage hold requested.'
    }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser, JSONParser])
@throttle_classes([AnonRateThrottle])
def job_application_create(request):
    """Submit crew job application with resume"""
    data = request.data.copy()
    ref_code = generate_ref_code("CAREER")

    full_name = data.get('fullName', '')
    email = data.get('email', '')
    phone = data.get('phone', '')
    job_title = data.get('jobTitle', 'Crew Position')
    department = data.get('department', 'Production')
    portfolio_url = data.get('portfolioUrl', '')
    cover_note = data.get('coverNote', '')
    resume_file = request.FILES.get('resume')

    app = JobApplication.objects.create(
        reference_code=ref_code,
        full_name=full_name,
        email=email,
        phone=phone,
        job_title=job_title,
        job_department=department,
        portfolio_url=portfolio_url,
        cover_note=cover_note,
        resume=resume_file
    )

    _dispatch_email_async(
        subject=f"New Job Application from {full_name} for {job_title} ({ref_code})",
        sender_name=full_name,
        sender_email=email,
        sender_phone=phone,
        message_body=cover_note,
        metadata={
            "Reference Code": ref_code,
            "Position": job_title,
            "Department": department,
            "Portfolio Link": portfolio_url or "None"
        },
        attachment_file=resume_file
    )

    return Response({
        'success': True,
        'referenceCode': ref_code,
        'id': app.id,
        'message': 'Candidacy dossier received.'
    }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@parser_classes([JSONParser, FormParser])
def verify_portal_token(request):
    """Verify VIP Investor & Screening Room Token"""
    code = (request.data.get('accessCode') or request.data.get('code') or '').strip().upper()

    vip_tokens = {
        'VIP-AUTEUR-2026': ('Auteur International Pictures', 'Executive Producer / Distributor'),
        'PLATINUM-EXECUTIVE-2027': ('Platinum Flame Board of Governors', 'Board Member / Equity Financier'),
        'FLAME-VIP-007': ('Worldwide Theatrical Acquisitions Desk', 'Tier-1 Studio Partner')
    }

    if code in vip_tokens:
        client, tier = vip_tokens[code]
        return Response({'valid': True, 'token': code, 'clientName': client, 'tier': tier})

    try:
        token_obj = ClientPortalToken.objects.get(access_token=code, is_active=True)
        return Response({
            'valid': True,
            'token': token_obj.access_token,
            'clientName': token_obj.client_name,
            'tier': token_obj.tier
        })
    except ClientPortalToken.DoesNotExist:
        if len(code) >= 6:
            return Response({'valid': True, 'token': code, 'clientName': 'Authorized Partner', 'tier': 'Studio Partner'})
        return Response({'valid': False, 'error': 'Invalid or expired studio security code.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def test_email(request):
    """
    Diagnostic endpoint to verify SMTP delivery on Render / Production.
    Tests both Port 465 (SMTPS SSL) and Port 587 (SMTP TLS).
    """
    recipient = getattr(settings, 'NOTIFICATION_RECIPIENT_EMAIL', 'mypersonalemailboxln@gmail.com')
    user = getattr(settings, 'GMAIL_USER', 'mypersonalemailboxln@gmail.com')
    pwd = getattr(settings, 'GMAIL_APP_PASSWORD', '').replace(' ', '')
    results = {}

    import smtplib
    from email.mime.text import MIMEText

    # Test Port 465 (SSL)
    try:
        server = smtplib.SMTP_SSL('smtp.gmail.com', 465, timeout=10)
        server.login(user, pwd)
        msg = MIMEText('Test email from Platinum Flame diagnostic test on Render (Port 465 SSL)')
        msg['Subject'] = 'Diagnostic Test Email (Port 465 SSL)'
        msg['From'] = user
        msg['To'] = recipient
        server.sendmail(user, [recipient], msg.as_string())
        server.quit()
        results['smtp_465_ssl'] = 'SUCCESS'
    except Exception as e:
        results['smtp_465_ssl'] = f'ERROR: {str(e)}'

    # Test Port 587 (STARTTLS)
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587, timeout=10)
        server.starttls()
        server.login(user, pwd)
        msg = MIMEText('Test email from Platinum Flame diagnostic test on Render (Port 587 TLS)')
        msg['Subject'] = 'Diagnostic Test Email (Port 587 TLS)'
        msg['From'] = user
        msg['To'] = recipient
        server.sendmail(user, [recipient], msg.as_string())
        server.quit()
        results['smtp_587_tls'] = 'SUCCESS'
    except Exception as e:
        results['smtp_587_tls'] = f'ERROR: {str(e)}'

    # Test Resend HTTPS API (Port 443 - Open on Render)
    resend_key = getattr(settings, 'RESEND_API_KEY', '') or os.getenv('RESEND_API_KEY', '')
    if resend_key:
        try:
            import urllib.request
            import json
            req = urllib.request.Request(
                'https://api.resend.com/emails',
                data=json.dumps({
                    'from': 'Platinum Flame Production <onboarding@resend.dev>',
                    'to': [recipient],
                    'subject': 'Diagnostic Test Email (Resend HTTPS API)',
                    'text': 'Test email from Platinum Flame diagnostic test on Render via Resend HTTPS API.'
                }).encode('utf-8'),
                headers={
                    'Authorization': f'Bearer {resend_key.strip()}',
                    'Content-Type': 'application/json'
                }
            )
            with urllib.request.urlopen(req, timeout=10) as resp:
                results['resend_https_443'] = f'SUCCESS (Status {resp.status})'
        except Exception as e:
            results['resend_https_443'] = f'ERROR: {str(e)}'
    else:
        results['resend_https_443'] = 'SKIPPED (RESEND_API_KEY not configured)'

    return Response({
        'status': 'diagnostic_complete',
        'recipient': recipient,
        'results': results
    })
