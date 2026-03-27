export const TRACKING_EVENTS = {
  whatsappClick: 'whatsapp_click',
  callClick: 'call_click',
  formSubmit: 'form_submit',
  directionsClick: 'directions_click',
  treatmentPageView: 'treatment_page_view',
  appointmentCtaClick: 'appointment_cta_click',
  branchSelect: 'branch_select',
  treatmentSelect: 'treatment_select',
  thankYouPageView: 'thank_you_page_view'
} as const;

export type TrackingEventName =
  (typeof TRACKING_EVENTS)[keyof typeof TRACKING_EVENTS];

export interface TrackingPayload {
  source?: string;
  branch_id?: string;
  treatment_intent?: string;
  treatment_page?: string;
  submission_id?: string;
  callback_time?: string;
  cta_label?: string;
  destination_href?: string;
  page_path?: string;
  page_url?: string;
  page_title?: string;
  landing_path?: string;
  landing_search?: string;
  referrer?: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
  }
}

const ATTRIBUTION_KEY = 'freshdent_attribution';

export const TRACKING_EVENT_MAP: Record<TrackingEventName, string> = {
  whatsapp_click: 'Primary messaging conversion',
  call_click: 'Phone call intent',
  form_submit: 'Appointment form completion',
  directions_click: 'Maps and location intent',
  appointment_cta_click: 'Callback and appointment CTA engagement',
  treatment_page_view: 'Treatment landing page view',
  branch_select: 'Branch selection intent',
  treatment_select: 'Treatment selection intent',
  thank_you_page_view: 'Post-conversion confirmation page view'
};

export function captureAttributionFromLocation() {
  if (typeof window === 'undefined') {
    return;
  }

  const searchParams = new URLSearchParams(window.location.search);
  const keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
  const attribution = keys.reduce<Record<string, string>>((accumulator, key) => {
    const value = searchParams.get(key);
    if (value) {
      accumulator[key] = value;
    }
    return accumulator;
  }, {});

  const payload = {
    ...attribution,
    landing_path: window.location.pathname,
    landing_search: window.location.search,
    referrer: document.referrer || ''
  };

  window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(payload));
}

export function getStoredAttribution() {
  if (typeof window === 'undefined') {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(ATTRIBUTION_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string>) : {};
  } catch {
    return {};
  }
}

export function getPageContext(): TrackingPayload {
  if (typeof window === 'undefined') {
    return {};
  }

  return {
    page_path: window.location.pathname,
    page_url: window.location.href,
    page_title: document.title
  };
}

export function buildTrackingPayload(
  name: TrackingEventName,
  payload: TrackingPayload = {}
) {
  return {
    event: name,
    ...getStoredAttribution(),
    ...getPageContext(),
    ...payload
  };
}

export function trackEvent(name: TrackingEventName, payload: TrackingPayload = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  const eventPayload = buildTrackingPayload(name, payload);

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(eventPayload);

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, eventPayload);
  }
}
