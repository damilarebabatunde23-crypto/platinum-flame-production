/**
 * Deprecated: FormSubmit service replaced completely by Django REST + Google SMTP backend.
 * All submissions are routed through /api/inquiries/ and delivered directly to mypersonalemailboxln@gmail.com
 */
export async function sendEmailNotification() {
  return { success: true };
}
