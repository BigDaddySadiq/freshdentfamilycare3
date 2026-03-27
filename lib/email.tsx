import 'server-only';

import type { AppointmentRequestRecord } from '@/lib/appointment-form';
import { BRANCHES, CONTACT_DETAILS, TREATMENT_INTENTS } from '@/lib/clinic-data';
import { getResendClient } from '@/lib/resend';

const DEFAULT_FROM = 'Fresh Dent Family Care <onboarding@resend.dev>';
const DEFAULT_TO = CONTACT_DETAILS.email;

function getBranchName(branchId: AppointmentRequestRecord['preferredBranch']) {
  return BRANCHES.find((branch) => branch.id === branchId)?.name ?? branchId;
}

function getTreatmentName(intentKey: AppointmentRequestRecord['treatmentInterest']) {
  return TREATMENT_INTENTS.find((intent) => intent.key === intentKey)?.label ?? intentKey;
}

function getAlertRecipients() {
  const configured = process.env.FRESHDENT_APPOINTMENT_ALERT_TO?.trim();
  const recipientList = (configured || DEFAULT_TO)
    .split(',')
    .map((email) => email.trim())
    .filter(Boolean);

  return recipientList;
}

function getFromAddress() {
  return process.env.FRESHDENT_APPOINTMENT_ALERT_FROM?.trim() || DEFAULT_FROM;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildHtmlEmail(record: AppointmentRequestRecord, branchName: string, treatmentName: string) {
  const attributionRows = Object.entries(record.attribution ?? {})
    .map(
      ([key, value]) => `
        <tr>
          <td style="width:220px;padding:12px 16px;border-bottom:1px solid rgba(13,27,62,0.08);color:#6B7280;font-size:13px;vertical-align:top;">${escapeHtml(
            key
          )}</td>
          <td style="padding:12px 16px;border-bottom:1px solid rgba(13,27,62,0.08);color:#2C2C2C;font-size:14px;line-height:1.6;">${escapeHtml(
            value
          )}</td>
        </tr>
      `
    )
    .join('');

  return `
    <html lang="en">
      <body style="background:#F8F5F0;color:#2C2C2C;font-family:DM Sans, Arial, sans-serif;margin:0;padding:24px;">
        <div style="margin:0 auto;max-width:680px;background:#FFFFFF;border:1px solid rgba(13,27,62,0.08);">
          <div style="background:#0D1B3E;color:#FFFFFF;padding:28px 32px;">
            <p style="margin:0 0 10px;color:#C9A96E;font-size:11px;font-weight:600;letter-spacing:0.18em;text-transform:uppercase;">
              Fresh Dent Family Care
            </p>
            <h1 style="margin:0;font-family:Georgia, 'Times New Roman', serif;font-size:32px;line-height:1.1;font-weight:600;">
              New Appointment Request
            </h1>
          </div>
          <div style="padding:28px 32px;">
            <p style="margin:0 0 20px;font-size:15px;line-height:1.7;">
              A new website lead has been submitted for Fresh Dent Family Care. Review the request details below and continue the conversation on WhatsApp or by phone.
            </p>
            <div style="border:1px solid rgba(13,27,62,0.08);margin-bottom:14px;">
              <p style="background:#F8F5F0;border-bottom:1px solid rgba(13,27,62,0.08);color:#0D1B3E;font-size:12px;font-weight:600;letter-spacing:0.12em;margin:0;padding:12px 16px;text-transform:uppercase;">
                Patient Details
              </p>
              <table style="width:100%;border-collapse:collapse;">
                <tbody>
                  <tr><td style="width:220px;padding:12px 16px;border-bottom:1px solid rgba(13,27,62,0.08);color:#6B7280;font-size:13px;vertical-align:top;">Reference ID</td><td style="padding:12px 16px;border-bottom:1px solid rgba(13,27,62,0.08);color:#2C2C2C;font-size:14px;line-height:1.6;">${escapeHtml(record.id)}</td></tr>
                  <tr><td style="width:220px;padding:12px 16px;border-bottom:1px solid rgba(13,27,62,0.08);color:#6B7280;font-size:13px;vertical-align:top;">Submitted At</td><td style="padding:12px 16px;border-bottom:1px solid rgba(13,27,62,0.08);color:#2C2C2C;font-size:14px;line-height:1.6;">${escapeHtml(record.createdAt)}</td></tr>
                  <tr><td style="width:220px;padding:12px 16px;border-bottom:1px solid rgba(13,27,62,0.08);color:#6B7280;font-size:13px;vertical-align:top;">Full Name</td><td style="padding:12px 16px;border-bottom:1px solid rgba(13,27,62,0.08);color:#2C2C2C;font-size:14px;line-height:1.6;">${escapeHtml(record.fullName)}</td></tr>
                  <tr><td style="width:220px;padding:12px 16px;border-bottom:1px solid rgba(13,27,62,0.08);color:#6B7280;font-size:13px;vertical-align:top;">Phone Number</td><td style="padding:12px 16px;border-bottom:1px solid rgba(13,27,62,0.08);color:#2C2C2C;font-size:14px;line-height:1.6;">${escapeHtml(record.phoneNumber)}</td></tr>
                  <tr><td style="width:220px;padding:12px 16px;border-bottom:1px solid rgba(13,27,62,0.08);color:#6B7280;font-size:13px;vertical-align:top;">Preferred Branch</td><td style="padding:12px 16px;border-bottom:1px solid rgba(13,27,62,0.08);color:#2C2C2C;font-size:14px;line-height:1.6;">${escapeHtml(branchName)}</td></tr>
                  <tr><td style="width:220px;padding:12px 16px;border-bottom:1px solid rgba(13,27,62,0.08);color:#6B7280;font-size:13px;vertical-align:top;">Treatment Interest</td><td style="padding:12px 16px;border-bottom:1px solid rgba(13,27,62,0.08);color:#2C2C2C;font-size:14px;line-height:1.6;">${escapeHtml(treatmentName)}</td></tr>
                  <tr><td style="width:220px;padding:12px 16px;border-bottom:1px solid rgba(13,27,62,0.08);color:#6B7280;font-size:13px;vertical-align:top;">Preferred Callback Time</td><td style="padding:12px 16px;border-bottom:1px solid rgba(13,27,62,0.08);color:#2C2C2C;font-size:14px;line-height:1.6;">${escapeHtml(record.preferredCallbackTime)}</td></tr>
                  <tr><td style="width:220px;padding:12px 16px;border-bottom:1px solid rgba(13,27,62,0.08);color:#6B7280;font-size:13px;vertical-align:top;">Message</td><td style="padding:12px 16px;border-bottom:1px solid rgba(13,27,62,0.08);color:#2C2C2C;font-size:14px;line-height:1.6;">${escapeHtml(record.message || 'No extra message was submitted.')}</td></tr>
                </tbody>
              </table>
            </div>
            ${
              attributionRows
                ? `<div style="border:1px solid rgba(13,27,62,0.08);margin-bottom:14px;">
                     <p style="background:#F8F5F0;border-bottom:1px solid rgba(13,27,62,0.08);color:#0D1B3E;font-size:12px;font-weight:600;letter-spacing:0.12em;margin:0;padding:12px 16px;text-transform:uppercase;">
                       Attribution
                     </p>
                     <table style="width:100%;border-collapse:collapse;"><tbody>${attributionRows}</tbody></table>
                   </div>`
                : ''
            }
            <div style="padding:8px 0 0;">
              <a href="${escapeHtml(record.whatsappUrl)}" style="display:inline-block;padding:14px 20px;background:#00A8A8;color:#FFFFFF;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">
                Continue on WhatsApp
              </a>
              <a href="tel:+91${escapeHtml(record.phoneNumber.replace(/\D/g, ''))}" style="display:inline-block;padding:14px 20px;margin-left:12px;border:1px solid rgba(13,27,62,0.16);color:#0D1B3E;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">
                Call Patient
              </a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

export async function sendAppointmentAlertEmail(record: AppointmentRequestRecord) {
  const treatmentName = getTreatmentName(record.treatmentInterest);
  const branchName = getBranchName(record.preferredBranch);
  const resend = getResendClient();
  const uniqueSubject = `Fresh Dent Appointment ${record.id} | ${record.fullName} | ${treatmentName}`;

  const { error } = await resend.emails.send({
    from: getFromAddress(),
    to: getAlertRecipients(),
    subject: uniqueSubject,
    html: buildHtmlEmail(record, branchName, treatmentName),
    text: [
      'Fresh Dent Family Care - New Appointment Request',
      `Subject: ${uniqueSubject}`,
      `Reference ID: ${record.id}`,
      `Submitted At: ${record.createdAt}`,
      `Name: ${record.fullName}`,
      `Phone: ${record.phoneNumber}`,
      `Branch: ${branchName}`,
      `Treatment: ${treatmentName}`,
      `Preferred Callback Time: ${record.preferredCallbackTime}`,
      `Message: ${record.message || 'No extra message was submitted.'}`,
      `WhatsApp: ${record.whatsappUrl}`
    ].join('\n'),
    replyTo: CONTACT_DETAILS.email
  });

  if (error) {
    throw new Error(error.message);
  }
}
