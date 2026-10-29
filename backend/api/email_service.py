import os
import logging
import imaplib
import time
from django.core.mail import EmailMultiAlternatives, send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings

logger = logging.getLogger(__name__)

def _inject_to_inbox_via_imap(user, password, email_obj):
    """
    Gmail's SMTP server automatically moves self-sent emails (where sender == recipient)
    out of the INBOX and into 'Sent Mail'.
    This helper directly appends the formatted MIME message into the INBOX folder via IMAP
    so it appears right at the top of the user's Primary Inbox as an UNREAD email.
    """
    try:
        clean_pwd = password.replace(' ', '')
        mail = imaplib.IMAP4_SSL('imap.gmail.com', timeout=8)
        mail.login(user, clean_pwd)
        mime_bytes = email_obj.message().as_bytes()
        mail.append('INBOX', '', imaplib.Time2Internaldate(time.time()), mime_bytes)
        mail.logout()
        logger.info("[Email Engine] Successfully injected unread message directly into Gmail INBOX.")
    except Exception as e:
        logger.warning(f"[Email Engine] IMAP INBOX injection skipped (non-critical): {e}")

def send_submission_email(subject, sender_name, sender_email, sender_phone, message_body, metadata=None, attachment_file=None):
    """
    Sends a high-priority executive notification email to the studio owner's Gmail.
    Features:
    1. Rich HTML layout designed like a Hollywood studio trade dossier.
    2. Fallback Plain-Text formatting.
    3. Sets `reply_to=[sender_email]` so pressing 'Reply' in Gmail immediately
       replies to the client who submitted the inquiry.
    4. Automatically attaches uploaded files (lookbook PDF, script, headshot).
    5. Dispatches an immediate client confirmation receipt to the sender's email.
    6. Ensures the message appears UNREAD in the studio inbox.
    """
    recipient = getattr(settings, 'NOTIFICATION_RECIPIENT_EMAIL', 'mypersonalemailboxln@gmail.com')
    from_email = getattr(settings, 'DEFAULT_FROM_EMAIL', f"Platinum Flame Production <{recipient}>")
    gmail_pwd = getattr(settings, 'GMAIL_APP_PASSWORD', '')
    gmail_user = getattr(settings, 'GMAIL_USER', recipient)
    ref_code = metadata.get("Reference Code", "N/A") if metadata else "N/A"

    # Context for HTML Template
    context = {
        'subject': subject,
        'reference_code': ref_code,
        'sender_name': sender_name,
        'sender_email': sender_email,
        'sender_phone': sender_phone,
        'message_body': message_body,
        'metadata': metadata or {}
    }

    # Render HTML and plain text
    try:
        html_content = render_to_string('emails/executive_notification.html', context)
    except Exception as e:
        logger.warning(f"Could not render HTML template: {e}. Falling back to standard text.")
        html_content = None

    # Plain text version for studio owner
    text_lines = [
        "===========================================================",
        "🎬 PLATINUM FLAME PRODUCTION LLC — SUBMISSION DOSSIER",
        "===========================================================",
        f"Reference Code: {ref_code}",
        f"Sender Name:    {sender_name}",
        f"Sender Email:   {sender_email}",
        f"Sender Phone:   {sender_phone or 'Not Provided'}",
        "-----------------------------------------------------------",
    ]
    if metadata:
        for k, v in metadata.items():
            text_lines.append(f"{k}: {v}")
        text_lines.append("-----------------------------------------------------------")

    text_lines.append("\nMESSAGE / SYNOPSIS:")
    text_lines.append(message_body or "No additional notes provided.")
    text_lines.append("\n===========================================================")
    text_lines.append("💡 Click 'Reply' in Gmail to respond directly to this client!")
    text_lines.append("===========================================================")
    text_content = "\n".join(text_lines)

    email_sent = False
    clean_pwd = gmail_pwd.replace(' ', '')
    resend_api_key = getattr(settings, 'RESEND_API_KEY', '') or os.getenv('RESEND_API_KEY', '')

    # Method 0: Primary HTTP API via Resend (Port 443 HTTPS - NEVER blocked by cloud hosts like Render)
    if resend_api_key:
        try:
            import urllib.request
            import json

            payload = {
                'from': 'Platinum Flame Production <onboarding@resend.dev>',
                'to': [recipient],
                'subject': subject,
                'html': html_content or f"<pre style='font-family:sans-serif;'>{text_content}</pre>",
                'text': text_content
            }
            if sender_email:
                payload['reply_to'] = sender_email

            req = urllib.request.Request(
                'https://api.resend.com/emails',
                data=json.dumps(payload).encode('utf-8'),
                headers={
                    'Authorization': f'Bearer {resend_api_key.strip()}',
                    'Content-Type': 'application/json',
                    'User-Agent': 'PlatinumFlame/2.0'
                }
            )
            with urllib.request.urlopen(req, timeout=10) as resp:
                if resp.status in (200, 201):
                    logger.info(f"[Email Engine] Successfully dispatched email via Resend HTTPS API to {recipient}!")
                    email_sent = True
        except Exception as resend_err:
            logger.error(f"[Email Engine] Resend API error: {resend_err}")

    # Method 1: Try Django Email Engine (SMTP)
    if not email_sent:
        try:
            email = EmailMultiAlternatives(
                subject=subject,
                body=text_content,
                from_email=from_email,
                to=[recipient],
                reply_to=[sender_email] if sender_email else None
            )

            if html_content:
                email.attach_alternative(html_content, "text/html")

            if attachment_file:
                try:
                    if hasattr(attachment_file, 'seek'):
                        attachment_file.seek(0)
                    file_bytes = attachment_file.read()
                    mime = getattr(attachment_file, 'content_type', 'application/octet-stream')
                    filename = getattr(attachment_file, 'name', 'attachment.pdf')
                    if file_bytes:
                        email.attach(filename, file_bytes, mime)
                except Exception as att_err:
                    logger.warning(f"Could not attach file: {att_err}")

            email.send(fail_silently=False)
            email_sent = True
            logger.info(f"[Email Engine] Successfully dispatched email to {recipient} with Reply-To={sender_email}")

            if clean_pwd and gmail_user:
                _inject_to_inbox_via_imap(gmail_user, clean_pwd, email)

        except Exception as e:
            logger.warning(f"[Email Engine] Standard email backend attempt failed: {e}. Trying SMTPS (port 465)...")
            # Method 2: Direct SMTPS (port 465 SSL) Fallback
            try:
                import smtplib
                from email.mime.multipart import MIMEMultipart
                from email.mime.text import MIMEText

                msg = MIMEMultipart('alternative')
                msg['Subject'] = subject
                msg['From'] = from_email
                msg['To'] = recipient
                if sender_email:
                    msg['Reply-To'] = sender_email
                msg.attach(MIMEText(text_content, 'plain'))
                if html_content:
                    msg.attach(MIMEText(html_content, 'html'))

                server = smtplib.SMTP_SSL('smtp.gmail.com', 465, timeout=10)
                server.login(gmail_user, clean_pwd)
                server.sendmail(gmail_user, [recipient], msg.as_string())
                server.quit()
                email_sent = True
                logger.info(f"[Email Engine] Successfully sent via SMTPS (port 465 SSL) fallback!")
            except Exception as ssl_err:
                logger.error(f"[Email Engine] SMTPS (465) fallback error: {ssl_err}")
                # Method 3: Direct SMTP (port 587 STARTTLS) Fallback
                try:
                    import smtplib
                    from email.mime.multipart import MIMEMultipart
                    from email.mime.text import MIMEText

                    msg = MIMEMultipart('alternative')
                    msg['Subject'] = subject
                    msg['From'] = from_email
                    msg['To'] = recipient
                    if sender_email:
                        msg['Reply-To'] = sender_email
                    msg.attach(MIMEText(text_content, 'plain'))
                    if html_content:
                        msg.attach(MIMEText(html_content, 'html'))

                    server = smtplib.SMTP('smtp.gmail.com', 587, timeout=10)
                    server.starttls()
                    server.login(gmail_user, clean_pwd)
                    server.sendmail(gmail_user, [recipient], msg.as_string())
                    server.quit()
                    email_sent = True
                    logger.info(f"[Email Engine] Successfully sent via SMTP (port 587 TLS) fallback!")
                except Exception as tls_err:
                    logger.error(f"[Email Engine] Both SMTP fallback methods failed: {tls_err}")

    # Also send an immediate confirmation receipt to the client's email address
    if sender_email and sender_email.strip().lower() != recipient.strip().lower():
        try:
            client_subject = f"Platinum Flame Production - Confirmation Receipt ({ref_code})"
            client_body = (
                f"Hello {sender_name},\n\n"
                f"Thank you for contacting Platinum Flame Production LLC.\n\n"
                f"This email confirms that your message has been received by our production office.\n"
                f"Our team will review your inquiry and follow up with you promptly.\n\n"
                f"SUMMARY OF YOUR SUBMISSION:\n"
                f"--------------------------------------------------\n"
                f"Reference Code: {ref_code}\n"
                f"Name:           {sender_name}\n"
                f"Phone:          {sender_phone or 'Not Provided'}\n"
                f"Message:        {message_body or 'No additional details'}\n"
                f"--------------------------------------------------\n\n"
                f"If you have additional materials or questions, simply reply directly to this email.\n\n"
                f"Sincerely,\n"
                f"Platinum Flame Production LLC\n"
                f"1809 Forest Avenue, New York, NY 10001 USA\n"
                f"Phone: +1 907-205-2163\n"
                f"Office Email: mypersonalemailboxln@gmail.com\n"
            )
            send_mail(
                subject=client_subject,
                message=client_body,
                from_email=from_email,
                recipient_list=[sender_email.strip()],
                fail_silently=True
            )
            logger.info(f"[Email Engine] Dispatched client confirmation receipt to {sender_email}")
        except Exception as client_err:
            logger.warning(f"Could not send client receipt to {sender_email}: {client_err}")

    return email_sent
