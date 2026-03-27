'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  AlignCenter,
  Anchor,
  ArrowRight,
  Baby,
  Crown,
  Feather,
  Heart,
  MinusCircle,
  RotateCcw,
  Scissors,
  Smile,
  Sparkles,
  Users,
  Zap,
  type LucideIcon
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';

import { TrackedLink } from '@/components/cta/TrackedLink';
import {
  IMAGE_ASSETS,
  SERVICES,
  SERVICES_SECTION,
  SERVICE_DISCOVERY_SHORTCUTS,
  type Service
} from '@/lib/clinic-data';
import { buildWhatsAppUrl } from '@/lib/lead';
import { TRACKING_EVENTS } from '@/lib/tracking';

const iconMap: Record<string, LucideIcon> = {
  Smile,
  Scissors,
  Anchor,
  Sparkles,
  AlignCenter,
  Zap,
  RotateCcw,
  MinusCircle,
  Crown,
  Users,
  Baby,
  Feather,
  Heart
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const MOBILE_PRIORITY_SERVICES = new Set([
  'Dental Implants',
  'Single Sitting Rotary Root Canal Treatment',
  'Advanced Digital Smile Designing',
  'Advanced Clip Treatments',
  'Wisdom Tooth Removal',
  'Maxillo Facial Surgery'
]);

function ServiceCard({ service, mobile = false }: { service: Service; mobile?: boolean }) {
  const Icon = iconMap[service.icon];
  const whatsappHref = buildWhatsAppUrl({
    source: `services-${service.title.toLowerCase().replace(/\s+/g, '-')}`,
    intentKey: service.intentKey
  });

  return (
    <article
      className={`group relative overflow-hidden border-t-2 border-t-transparent bg-white transition-[border-color,box-shadow,transform] duration-300 hover:border-t-teal hover:shadow-xl ${
        mobile ? 'p-6' : 'p-8 md:p-10'
      }`}
    >
      <div className="relative z-10 flex h-full flex-col">
        <Icon className="mb-5 h-8 w-8 text-teal" />
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-heading text-[1.4rem] font-semibold leading-tight text-navy">
            {service.title}
          </h3>
          {service.isSecondary ? (
            <span className="shrink-0 border border-navy/10 px-2 py-1 font-body text-[0.6rem] uppercase tracking-[0.18em] text-muted">
              Secondary
            </span>
          ) : null}
        </div>
        <p
          className={`mt-3 font-body font-light leading-relaxed text-muted ${
            mobile ? 'text-sm' : 'text-[0.88rem]'
          }`}
        >
          {service.description}
        </p>

        <div className={`mt-6 flex flex-wrap items-center ${mobile ? 'gap-3' : 'gap-4'}`}>
          <TrackedLink
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            eventName={TRACKING_EVENTS.whatsappClick}
            eventData={{ source: mobile ? 'services-mobile' : 'services-grid', treatment_intent: service.intentKey }}
            ctaLabel={service.enquiryLabel}
            className="inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-[0.18em] text-teal"
          >
            {mobile ? 'WhatsApp' : service.enquiryLabel}
          </TrackedLink>

          {service.detailHref ? (
            <TrackedLink
              href={service.detailHref}
              eventName={TRACKING_EVENTS.appointmentCtaClick}
              eventData={{ source: mobile ? 'services-mobile' : 'services-grid', treatment_page: service.detailHref }}
              ctaLabel={`Explore ${service.title}`}
              className="inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-[0.18em] text-navy/70 transition-colors duration-300 hover:text-navy"
            >
              <span>Explore treatment</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </TrackedLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function ServicesGrid() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [showAllMobileServices, setShowAllMobileServices] = useState(false);
  const mobilePriorityServices = SERVICES.filter((service) => MOBILE_PRIORITY_SERVICES.has(service.title));
  const mobileSecondaryServices = SERVICES.filter((service) => !MOBILE_PRIORITY_SERVICES.has(service.title));

  return (
    <section id="services" className="relative overflow-hidden bg-white py-24 md:py-36">
      <div className="container-shell relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label">{SERVICES_SECTION.label}</p>
          <h2 className="mt-5 font-heading text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.1] text-navy">
            {SERVICES_SECTION.heading}
          </h2>
          <p className="mt-4 font-body text-[1.02rem] font-light leading-relaxed text-muted">
            {SERVICES_SECTION.description}
          </p>
          <div className="mt-8 flex gap-3 overflow-x-auto pb-1 md:flex-wrap md:justify-center md:overflow-visible md:pb-0">
            {SERVICE_DISCOVERY_SHORTCUTS.map((shortcut) => (
              <TrackedLink
                key={shortcut.href}
                href={shortcut.href}
                eventName={TRACKING_EVENTS.appointmentCtaClick}
                eventData={{ source: 'services-shortcuts' }}
                ctaLabel={shortcut.label}
                className="inline-flex shrink-0 border border-navy/10 px-4 py-3 font-body text-[0.68rem] font-medium uppercase tracking-[0.15em] text-navy/75 transition-colors duration-300 hover:border-teal hover:bg-teal hover:text-white"
              >
                {shortcut.label}
              </TrackedLink>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-4 md:hidden">
          {mobilePriorityServices.map((service) => (
            <ServiceCard key={`mobile-${service.title}`} service={service} mobile />
          ))}

          {showAllMobileServices ? (
            <div className="grid gap-4">
              {mobileSecondaryServices.map((service) => (
                <ServiceCard key={`mobile-extra-${service.title}`} service={service} mobile />
              ))}
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setShowAllMobileServices((current) => !current)}
            className="inline-flex items-center justify-center border border-navy/10 px-4 py-3 font-body text-[0.68rem] font-medium uppercase tracking-[0.16em] text-navy transition-colors duration-300 hover:border-teal hover:text-teal"
          >
            {showAllMobileServices
              ? 'Show fewer services'
              : `View ${mobileSecondaryServices.length} more services`}
          </button>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-16 hidden gap-px bg-cream md:grid md:grid-cols-2 xl:grid-cols-3"
        >
          {SERVICES.map((service) => (
            <motion.div key={service.title} variants={itemVariants}>
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 overflow-hidden border border-gold/20 bg-cream/60">
          <div className="grid gap-8 p-6 md:grid-cols-[1.25fr_0.85fr] md:p-8">
            <div>
              <p className="section-label">Treatment Pathways</p>
              <h3 className="mt-4 font-heading text-[2rem] leading-[1.1] text-navy md:text-[2.4rem]">
                Start with WhatsApp, then continue on a dedicated treatment page.
              </h3>
              <p className="mt-4 max-w-2xl font-body text-base font-light leading-relaxed text-muted">
                High-intent services now have dedicated landing pages built for local SEO, paid traffic, and easier patient conversion across implants, root canal treatment, smile design, orthodontics, surgery, and more.
              </p>
              <div className="mt-6 flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-4">
                <TrackedLink
                  href={buildWhatsAppUrl({
                    source: 'services-next-step',
                    intentKey: 'general-consultation'
                  })}
                  target="_blank"
                  rel="noreferrer"
                  eventName={TRACKING_EVENTS.whatsappClick}
                  eventData={{ source: 'services-next-step', treatment_intent: 'general-consultation' }}
                  ctaLabel="Ask About a Treatment"
                  className="button-primary w-full md:w-auto"
                >
                  Ask About a Treatment
                </TrackedLink>
                <TrackedLink
                  href="/#contact"
                  eventName={TRACKING_EVENTS.appointmentCtaClick}
                  eventData={{ source: 'services-next-step' }}
                  ctaLabel="Request a Callback"
                  className="button-secondary w-full border-navy/20 text-navy hover:border-navy hover:bg-navy hover:text-white md:w-auto"
                >
                  Request a Callback
                </TrackedLink>
              </div>

              <div className="mt-8 border-t border-navy/10 pt-6">
                <p className="font-body text-[0.68rem] font-medium uppercase tracking-[0.18em] text-gold">
                  Popular treatment pages in Kakinada
                </p>
                <div className="mt-4 flex gap-3 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible md:pb-0">
                  {SERVICE_DISCOVERY_SHORTCUTS.map((shortcut) => (
                    <TrackedLink
                      key={`${shortcut.href}-local-seo`}
                      href={shortcut.href}
                      eventName={TRACKING_EVENTS.appointmentCtaClick}
                      eventData={{ source: 'services-local-links' }}
                      ctaLabel={`${shortcut.label} in Kakinada`}
                      className="inline-flex shrink-0 border border-navy/10 bg-white px-3 py-2 font-body text-[0.68rem] font-medium uppercase tracking-[0.14em] text-navy/75 transition-colors duration-300 hover:border-teal hover:text-navy"
                    >
                      {shortcut.label} in Kakinada
                    </TrackedLink>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative min-h-[220px] overflow-hidden bg-white">
              <Image
                src={IMAGE_ASSETS.intraoralScanner.src}
                alt={IMAGE_ASSETS.intraoralScanner.alt}
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-navy/35" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
