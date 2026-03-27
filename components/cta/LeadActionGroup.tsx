'use client';

import { MessageCircle, Phone, Route } from 'lucide-react';

import type { Branch, TreatmentIntentKey } from '@/lib/clinic-data';
import { buildCallHref, buildDirectionsHref, buildWhatsAppUrl } from '@/lib/lead';
import { TRACKING_EVENTS } from '@/lib/tracking';
import { TrackedLink } from '@/components/cta/TrackedLink';

interface LeadActionGroupProps {
  branchId?: Branch['id'];
  intentKey?: TreatmentIntentKey;
  source: string;
  className?: string;
  primaryClassName?: string;
  secondaryClassName?: string;
  tertiaryClassName?: string;
  showDirections?: boolean;
  showCall?: boolean;
  showFormLink?: boolean;
  formHref?: string;
  primaryLabel?: string;
  callLabel?: string;
  directionsLabel?: string;
  formLabel?: string;
}

export function LeadActionGroup({
  branchId,
  intentKey,
  source,
  className,
  primaryClassName = 'button-primary',
  secondaryClassName = 'button-secondary border-navy/20 text-navy hover:border-navy hover:bg-navy hover:text-white',
  tertiaryClassName = 'font-body text-sm font-medium text-teal underline underline-offset-4 transition-colors duration-300 hover:text-navy',
  showDirections = false,
  showCall = true,
  showFormLink = false,
  formHref = '/#contact',
  primaryLabel = 'Book on WhatsApp',
  callLabel = 'Call Now',
  directionsLabel = 'Get Directions',
  formLabel = 'Request a Callback'
}: LeadActionGroupProps) {
  const whatsappHref = buildWhatsAppUrl({ branchId, intentKey, source });
  const callHref = buildCallHref(branchId);
  const directionsHref = buildDirectionsHref(branchId);

  return (
    <div className={className}>
      <TrackedLink
        href={whatsappHref}
        eventName={TRACKING_EVENTS.whatsappClick}
        eventData={{ source, branch_id: branchId, treatment_intent: intentKey }}
        ctaLabel={primaryLabel}
        target="_blank"
        rel="noreferrer"
        className={`${primaryClassName} gap-3`}
      >
        <MessageCircle className="h-4 w-4" />
        <span>{primaryLabel}</span>
      </TrackedLink>

      {showCall ? (
        <TrackedLink
          href={callHref}
          eventName={TRACKING_EVENTS.callClick}
          eventData={{ source, branch_id: branchId, treatment_intent: intentKey }}
          ctaLabel={callLabel}
          className={`${secondaryClassName} gap-3`}
        >
          <Phone className="h-4 w-4" />
          <span>{callLabel}</span>
        </TrackedLink>
      ) : null}

      {showDirections ? (
        <TrackedLink
          href={directionsHref}
          eventName={TRACKING_EVENTS.directionsClick}
          eventData={{ source, branch_id: branchId }}
          ctaLabel={directionsLabel}
          target="_blank"
          rel="noreferrer"
          className={tertiaryClassName}
        >
          <span className="inline-flex items-center gap-2">
            <Route className="h-4 w-4" />
            <span>{directionsLabel}</span>
          </span>
        </TrackedLink>
      ) : null}

      {showFormLink ? (
        <TrackedLink
          href={formHref}
          eventName={TRACKING_EVENTS.appointmentCtaClick}
          eventData={{ source, branch_id: branchId, treatment_intent: intentKey }}
          ctaLabel={formLabel}
          className={tertiaryClassName}
        >
          <span>{formLabel}</span>
        </TrackedLink>
      ) : null}
    </div>
  );
}
