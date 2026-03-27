import {
  BRANCHES,
  TREATMENT_INTENTS,
  type Branch,
  type TreatmentIntentKey
} from '@/lib/clinic-data';

export interface AppointmentRequestPayload {
  fullName: string;
  phoneNumber: string;
  preferredBranch: Branch['id'];
  treatmentInterest: TreatmentIntentKey;
  preferredCallbackTime: string;
  message: string;
  consent: boolean;
  attribution?: Record<string, string>;
}

export interface AppointmentRequestRecord extends AppointmentRequestPayload {
  id: string;
  createdAt: string;
  status: 'new';
  source: 'website';
  whatsappUrl: string;
  metadata: {
    ipAddress: string | null;
    userAgent: string | null;
    referer: string | null;
  };
}

export interface AppointmentValidationResult {
  success: boolean;
  data?: AppointmentRequestPayload;
  errors?: Record<string, string>;
}

const validBranchIds = new Set(BRANCHES.map((branch) => branch.id));
const validIntentKeys = new Set(TREATMENT_INTENTS.map((intent) => intent.key));
function normalizeText(value: unknown) {
  return typeof value === 'string' ? value.trim().replace(/\s+/g, ' ') : '';
}

function normalizeMessage(value: unknown) {
  return typeof value === 'string' ? value.trim().replace(/\r\n/g, '\n') : '';
}

function normalizeAttribution(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  return Object.entries(value).reduce<Record<string, string>>((accumulator, [key, item]) => {
    if (typeof item === 'string' && item.trim()) {
      accumulator[key] = item.trim();
    }

    return accumulator;
  }, {});
}

export function validateAppointmentRequest(payload: unknown): AppointmentValidationResult {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return {
      success: false,
      errors: {
        form: 'We could not read the appointment request. Please try again.'
      }
    };
  }

  const candidate = payload as Record<string, unknown>;
  const fullName = normalizeText(candidate.fullName);
  const phoneNumber = normalizeText(candidate.phoneNumber);
  const preferredBranch = candidate.preferredBranch;
  const treatmentInterest = candidate.treatmentInterest;
  const preferredCallbackTime = normalizeText(candidate.preferredCallbackTime);
  const message = normalizeMessage(candidate.message);
  const consent = candidate.consent === true;
  const attribution = normalizeAttribution(candidate.attribution);

  const errors: Record<string, string> = {};
  const phoneDigits = phoneNumber.replace(/\D/g, '');

  if (fullName.length < 2) {
    errors.fullName = 'Please enter your full name.';
  }

  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phoneNumber = 'Please enter a valid phone number.';
  }

  if (!validBranchIds.has(preferredBranch as Branch['id'])) {
    errors.preferredBranch = 'Please choose a valid branch.';
  }

  if (!validIntentKeys.has(treatmentInterest as TreatmentIntentKey)) {
    errors.treatmentInterest = 'Please choose a valid treatment interest.';
  }

  if (!preferredCallbackTime || preferredCallbackTime.length > 120) {
    errors.preferredCallbackTime = 'Please choose a valid callback time.';
  }

  if (!consent) {
    errors.consent = 'Please confirm consent so the clinic can contact you.';
  }

  if (message.length > 1200) {
    errors.message = 'Please keep the message under 1200 characters.';
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors
    };
  }

  return {
    success: true,
    data: {
      fullName,
      phoneNumber,
      preferredBranch: preferredBranch as Branch['id'],
      treatmentInterest: treatmentInterest as TreatmentIntentKey,
      preferredCallbackTime,
      message,
      consent,
      attribution
    }
  };
}
