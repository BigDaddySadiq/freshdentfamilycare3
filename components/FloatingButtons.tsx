'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp, MapPinned, MessageCircle, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

import { TrackedLink } from '@/components/cta/TrackedLink';
import { FLOATING_BUTTONS_COPY } from '@/lib/clinic-data';
import { buildCallHref, buildDirectionsHref, buildWhatsAppUrl } from '@/lib/lead';
import { TRACKING_EVENTS } from '@/lib/tracking';

const whatsappHref = buildWhatsAppUrl({ source: 'floating-whatsapp', intentKey: 'general-consultation' });
const callHref = buildCallHref('branch-1');
const directionsHref = buildDirectionsHref('branch-1');

export function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-navy/10 bg-white/95 px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
        <div className="grid grid-cols-3 gap-3">
          <TrackedLink
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            eventName={TRACKING_EVENTS.whatsappClick}
            eventData={{ source: 'mobile-floating-bar', treatment_intent: 'general-consultation' }}
            ariaLabel={FLOATING_BUTTONS_COPY.whatsappLabel}
            ctaLabel="WhatsApp"
            className="flex items-center justify-center gap-2 bg-whatsapp px-3 py-3 font-body text-[0.72rem] font-medium uppercase tracking-[0.12em] text-white"
          >
            <MessageCircle className="h-4 w-4" />
            <span>WhatsApp</span>
          </TrackedLink>
          <TrackedLink
            href={callHref}
            eventName={TRACKING_EVENTS.callClick}
            eventData={{ source: 'mobile-floating-bar', branch_id: 'branch-1' }}
            ariaLabel={FLOATING_BUTTONS_COPY.callLabel}
            ctaLabel="Call"
            className="flex items-center justify-center gap-2 border border-navy/15 px-3 py-3 font-body text-[0.72rem] font-medium uppercase tracking-[0.12em] text-navy"
          >
            <Phone className="h-4 w-4" />
            <span>Call</span>
          </TrackedLink>
          <TrackedLink
            href={directionsHref}
            target="_blank"
            rel="noreferrer"
            eventName={TRACKING_EVENTS.directionsClick}
            eventData={{ source: 'mobile-floating-bar', branch_id: 'branch-1' }}
            ariaLabel={FLOATING_BUTTONS_COPY.directionsLabel}
            ctaLabel="Directions"
            className="flex items-center justify-center gap-2 border border-navy/15 px-3 py-3 font-body text-[0.72rem] font-medium uppercase tracking-[0.12em] text-navy"
          >
            <MapPinned className="h-4 w-4" />
            <span>Directions</span>
          </TrackedLink>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50 hidden flex-col gap-3 md:flex">
        <TrackedLink
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          eventName={TRACKING_EVENTS.whatsappClick}
          eventData={{ source: 'desktop-floating-whatsapp', treatment_intent: 'general-consultation' }}
          ariaLabel={FLOATING_BUTTONS_COPY.whatsappLabel}
          ctaLabel="WhatsApp Floating Button"
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform duration-300 hover:scale-110"
        >
          <span className="absolute inset-0 animate-ping-slow rounded-full bg-whatsapp/40" />
          <MessageCircle className="relative z-10 h-6 w-6" />
        </TrackedLink>

        <AnimatePresence>
          {showBackToTop ? (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.25 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label={FLOATING_BUTTONS_COPY.backToTopLabel}
              className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white shadow-lg transition-colors duration-300 hover:bg-teal"
            >
              <ChevronUp className="h-5 w-5" />
            </motion.button>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}
