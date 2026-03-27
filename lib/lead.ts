import { BRANCHES, CONTACT_DETAILS, TREATMENT_INTENTS, type Branch, type TreatmentIntentKey } from '@/lib/clinic-data';

export interface LeadContext {
  intentKey?: TreatmentIntentKey;
  branchId?: Branch['id'];
  source?: string;
  patientName?: string;
  phone?: string;
  callbackTime?: string;
  message?: string;
}

export function getBranchById(branchId?: Branch['id']) {
  return BRANCHES.find((branch) => branch.id === branchId) ?? BRANCHES[0];
}

export function getIntentLabel(intentKey?: TreatmentIntentKey) {
  return (
    TREATMENT_INTENTS.find((intent) => intent.key === intentKey)?.label ??
    TREATMENT_INTENTS[0].label
  );
}

export function buildWhatsAppMessage({
  intentKey,
  branchId,
  source,
  patientName,
  phone,
  callbackTime,
  message
}: LeadContext = {}) {
  const branch = getBranchById(branchId);
  const intentLabel = getIntentLabel(intentKey);

  const lines = [
    'Hello Fresh Dent Family Care,',
    `I would like to enquire about ${intentLabel}.`,
    branch ? `Preferred branch: ${branch.name}` : null,
    patientName ? `Name: ${patientName}` : null,
    phone ? `Phone: ${phone}` : null,
    callbackTime ? `Preferred callback time: ${callbackTime}` : null,
    message ? `Message: ${message}` : null,
    source ? `Source: ${source}` : null
  ].filter(Boolean);

  return lines.join('\n');
}

export function buildWhatsAppUrl(context: LeadContext = {}) {
  const text = encodeURIComponent(buildWhatsAppMessage(context));
  return `https://api.whatsapp.com/send/?phone=${CONTACT_DETAILS.whatsappDigits}&text=${text}&type=phone_number&app_absent=0`;
}

export function buildCallHref(branchId?: Branch['id']) {
  const branch = getBranchById(branchId);
  const digits = branch.phones[0]?.replace(/\D/g, '');
  return digits ? `tel:+91${digits}` : `tel:+${CONTACT_DETAILS.primaryPhoneDigits}`;
}

export function buildDirectionsHref(branchId?: Branch['id']) {
  return getBranchById(branchId).mapUrl;
}
