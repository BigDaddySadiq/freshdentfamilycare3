'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUp, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import { CONTACT_DETAILS, FLOATING_BUTTONS_COPY } from '@/lib/clinic-data';

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

  const whatsappHref = `https://wa.me/${CONTACT_DETAILS.whatsapp.replace(/\D/g, '')}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label={FLOATING_BUTTONS_COPY.whatsappLabel}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform duration-300 hover:scale-110"
      >
        <span className="absolute inset-0 animate-ping-slow rounded-full bg-whatsapp/40" />
        <MessageCircle className="relative z-10 h-6 w-6" />
      </a>

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
  );
}
