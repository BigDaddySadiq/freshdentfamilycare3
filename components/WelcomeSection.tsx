'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

import { TrackedLink } from '@/components/cta/TrackedLink';
import { ABOUT_COPY, IMAGE_ASSETS } from '@/lib/clinic-data';
import { buildWhatsAppUrl } from '@/lib/lead';
import { TRACKING_EVENTS } from '@/lib/tracking';

export function WelcomeSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const welcomeWhatsappHref = buildWhatsAppUrl({
    source: 'welcome-section',
    intentKey: 'general-consultation'
  });

  return (
    <section id="about" className="bg-cream py-24 md:py-36">
      <div ref={ref} className="container-shell grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 lg:order-1 lg:pr-16"
        >
          <p className="section-label">{ABOUT_COPY.label}</p>
          <h2 className="mt-5 font-heading text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.1] text-navy">
            {ABOUT_COPY.heading}
          </h2>
          <div className="my-6 h-px w-12 bg-gold" />

          <div className="space-y-6">
            {ABOUT_COPY.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="font-body text-[1.05rem] font-light leading-[1.85] text-charcoal"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 md:hidden">
            {ABOUT_COPY.features.slice(0, 2).map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-[18px] w-[18px] shrink-0 text-teal" />
                <span className="font-body text-base text-charcoal">{feature}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 hidden flex-col gap-3 md:flex">
            {ABOUT_COPY.features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <CheckCircle2 className="mt-1 h-[18px] w-[18px] shrink-0 text-teal" />
                <span className="font-body text-base text-charcoal">{feature}</span>
              </div>
            ))}
          </div>

          <TrackedLink
            href={welcomeWhatsappHref}
            target="_blank"
            rel="noreferrer"
            eventName={TRACKING_EVENTS.whatsappClick}
            eventData={{ source: 'welcome-section', treatment_intent: 'general-consultation' }}
            ctaLabel={ABOUT_COPY.cta.label}
            className="mt-10 inline-flex border-b border-teal pb-0.5 font-body font-medium text-teal transition-colors duration-300 hover:border-navy hover:text-navy"
          >
            {ABOUT_COPY.cta.label}
          </TrackedLink>
        </motion.div>

        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 lg:order-2"
        >
          <div className="relative overflow-hidden shadow-2xl">
            <Image
              src={IMAGE_ASSETS.doctorWithHappyPatient.src}
              alt={IMAGE_ASSETS.doctorWithHappyPatient.alt}
              width={IMAGE_ASSETS.doctorWithHappyPatient.width}
              height={IMAGE_ASSETS.doctorWithHappyPatient.height}
              priority={IMAGE_ASSETS.doctorWithHappyPatient.priority}
              className="aspect-[4/5] h-auto w-full object-cover"
            />

            <div className="absolute bottom-4 left-4 max-w-[190px] border-l-[3px] border-teal bg-white p-4 shadow-xl md:bottom-6 md:left-6 md:max-w-[220px] md:p-5">
              <p className="font-body text-[0.85rem] font-semibold text-navy">
                {ABOUT_COPY.badge.name}
              </p>
              <p className="mt-1 font-body text-[0.7rem] text-muted">
                {ABOUT_COPY.badge.credentials}
              </p>
              <p className="mt-1 font-body text-[0.7rem] font-light text-teal">
                {ABOUT_COPY.badge.role}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
