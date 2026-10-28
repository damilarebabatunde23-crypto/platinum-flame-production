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
        mail = imaplib.IMAP4_SSL('imap.gmail.com')
        mail.login(user, clean_pwd)
        mime_bytes = email_obj.message().as_bytes()
        mail.append('INBOX', '', imaplib.Time2Internaldate(time.time()), mime_bytes)
        mail.logout()
        logger.info("[Email Engine] Successfully injected unread message directly into Gmail INBOX.")
    except Exception as e:
        logger.warning(f"[Email Engine] IMAP INBOX injection skipped: {e}")

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

        # Inject directly into Gmail INBOX via IMAP so it appears in the primary Inbox (not skipped to Sent)
        if gmail_pwd and gmail_user:
            _inject_to_inbox_via_imap(gmail_user, gmail_pwd, email)

    except Exception as e:
        logger.error(f"[Email Engine Error] Could not send email: {e}")

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
