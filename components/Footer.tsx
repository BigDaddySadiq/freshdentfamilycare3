import Image from 'next/image';
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
  type LucideIcon
} from 'lucide-react';

import { TrackedLink } from '@/components/cta/TrackedLink';
import {
  BRANCHES,
  CONTACT_DETAILS,
  FOOTER_COPY,
  FOOTER_QUICK_LINKS,
  IMAGE_ASSETS,
  SERVICE_PAGE_LINKS,
  SOCIAL_LINKS,
  TAGLINE
} from '@/lib/clinic-data';
import { buildCallHref, buildDirectionsHref, buildWhatsAppUrl } from '@/lib/lead';
import { TRACKING_EVENTS } from '@/lib/tracking';

const socialIconMap: Record<string, LucideIcon> = {
  Facebook,
  Instagram,
  Youtube
};

const footerWhatsappHref = buildWhatsAppUrl({ source: 'footer', intentKey: 'general-consultation' });

export function Footer() {
  const activeSocialLinks = SOCIAL_LINKS.filter((link) => link.href && link.href !== '#');

  return (
    <footer className="bg-footer py-20 pb-28 text-white md:pb-20">
      <div className="container-shell">
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <Image
              src={IMAGE_ASSETS.logo.src}
              alt={IMAGE_ASSETS.logo.alt}
              width={99}
              height={56}
              className="mb-4 h-14 w-auto object-contain"
            />
            <p className="font-heading text-base italic text-white/60">{TAGLINE}</p>
            <p className="mt-4 max-w-sm font-body text-sm font-light leading-relaxed text-white/60">
              Premium family dental care in Kakinada with clear booking paths for WhatsApp, call, branch directions, and treatment-led enquiries.
            </p>

            {activeSocialLinks.length > 0 ? (
              <div className="mt-6 flex gap-4">
                {activeSocialLinks.map((link) => {
                  const Icon = socialIconMap[link.label];

                  return (
                    <TrackedLink
                      key={link.label}
                      href={link.href}
                      className="text-white/40 transition-colors duration-300 hover:text-teal"
                      ariaLabel={link.label}
                    >
                      <Icon className="h-5 w-5" />
                    </TrackedLink>
                  );
                })}
              </div>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              <TrackedLink
                href={footerWhatsappHref}
                target="_blank"
                rel="noreferrer"
                eventName={TRACKING_EVENTS.whatsappClick}
                eventData={{ source: 'footer', treatment_intent: 'general-consultation' }}
                ctaLabel="Book on WhatsApp"
                className="inline-flex bg-teal px-4 py-3 font-body text-[0.7rem] font-medium uppercase tracking-[0.15em] text-white"
              >
                Book on WhatsApp
              </TrackedLink>
              <TrackedLink
                href="/#contact"
                eventName={TRACKING_EVENTS.appointmentCtaClick}
                eventData={{ source: 'footer' }}
                ctaLabel="Callback Form"
                className="inline-flex border border-white/15 px-4 py-3 font-body text-[0.7rem] font-medium uppercase tracking-[0.15em] text-white/80"
              >
                Callback Form
              </TrackedLink>
              <TrackedLink
                href="/#locations"
                eventName={TRACKING_EVENTS.appointmentCtaClick}
                eventData={{ source: 'footer' }}
                ctaLabel="Compare Branches"
                className="inline-flex border border-white/15 px-4 py-3 font-body text-[0.7rem] font-medium uppercase tracking-[0.15em] text-white/80"
              >
                Compare Branches
              </TrackedLink>
            </div>
          </div>

          <div>
            <p className="mb-6 font-body text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              {FOOTER_COPY.quickLinksHeading}
            </p>
            <div className="space-y-1">
              {FOOTER_QUICK_LINKS.map((link) => (
                <TrackedLink
                  key={link.href}
                  href={link.href}
                  className="block border-b border-transparent py-1 font-body text-sm font-light text-white/60 transition-colors duration-300 hover:border-teal/30 hover:text-teal"
                >
                  {link.label}
                </TrackedLink>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-6 font-body text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              {FOOTER_COPY.treatmentsHeading}
            </p>
            <div className="space-y-1">
              {SERVICE_PAGE_LINKS.map((treatment) => (
                <TrackedLink
                  key={treatment.href}
                  href={treatment.href}
                  className="block border-b border-transparent py-1 font-body text-sm font-light text-white/60 transition-colors duration-300 hover:border-teal/30 hover:text-teal"
                >
                  {treatment.label}
                </TrackedLink>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-6 font-body text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              {FOOTER_COPY.contactHeading}
            </p>
            <div className="space-y-2">
              <div className="flex gap-3 py-2">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-teal" />
                <div className="font-body text-sm font-light text-white/60">
                  <p>{BRANCHES[0]?.name}, Kakinada 533005</p>
                  <TrackedLink
                    href={buildDirectionsHref('branch-1')}
                    target="_blank"
                    rel="noreferrer"
                    eventName={TRACKING_EVENTS.directionsClick}
                    eventData={{ source: 'footer', branch_id: 'branch-1' }}
                    ctaLabel={`Get directions to ${BRANCHES[0]?.name}`}
                    className="mt-1 inline-flex text-xs uppercase tracking-[0.16em] text-teal"
                  >
                    Get directions
                  </TrackedLink>
                </div>
              </div>
              <div className="flex gap-3 py-2">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-teal" />
                <div className="font-body text-sm font-light text-white/60">
                  <p>{BRANCHES[1]?.name}, Kakinada 533003</p>
                  <TrackedLink
                    href={buildDirectionsHref('branch-2')}
                    target="_blank"
                    rel="noreferrer"
                    eventName={TRACKING_EVENTS.directionsClick}
                    eventData={{ source: 'footer', branch_id: 'branch-2' }}
                    ctaLabel={`Get directions to ${BRANCHES[1]?.name}`}
                    className="mt-1 inline-flex text-xs uppercase tracking-[0.16em] text-teal"
                  >
                    Get directions
                  </TrackedLink>
                </div>
              </div>
              <div className="flex gap-3 py-2">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-teal" />
                <TrackedLink
                  href={buildCallHref('branch-1')}
                  eventName={TRACKING_EVENTS.callClick}
                  eventData={{ source: 'footer', branch_id: 'branch-1' }}
                  ctaLabel={`Call ${CONTACT_DETAILS.primaryPhone}`}
                  className="font-body text-sm font-light text-white/60"
                >
                  {CONTACT_DETAILS.primaryPhone}
                </TrackedLink>
              </div>
              <div className="flex gap-3 py-2">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-teal" />
                <TrackedLink
                  href={buildCallHref('branch-2')}
                  eventName={TRACKING_EVENTS.callClick}
                  eventData={{ source: 'footer', branch_id: 'branch-2' }}
                  ctaLabel={`Call ${BRANCHES[1]?.name}`}
                  className="font-body text-sm font-light text-white/60"
                >
                  {BRANCHES[1]?.phones.join(' · ')}
                </TrackedLink>
              </div>
              <div className="flex gap-3 py-2">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-teal" />
                <TrackedLink
                  href={`mailto:${CONTACT_DETAILS.email}`}
                  className="font-body text-sm font-light text-white/60"
                >
                  {CONTACT_DETAILS.email}
                </TrackedLink>
              </div>
              <div className="flex gap-3 py-2">
                <span className="w-4 shrink-0" />
                <p className="font-body text-sm font-light text-white/60">{FOOTER_COPY.hours}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-8">
          <p className="font-body text-xs font-light text-white/30">{FOOTER_COPY.copyright}</p>
          <p className="font-body text-xs font-light text-white/30">{FOOTER_COPY.locationLine}</p>
        </div>
      </div>
    </footer>
  );
}
