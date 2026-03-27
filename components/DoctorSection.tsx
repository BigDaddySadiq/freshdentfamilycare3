'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { LeadActionGroup } from '@/components/cta/LeadActionGroup';
import { TrackedLink } from '@/components/cta/TrackedLink';
import { DOCTOR, DOCTOR_SECTION_COPY, IMAGE_ASSETS } from '@/lib/clinic-data';
import { TRACKING_EVENTS } from '@/lib/tracking';

export function DoctorSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="doctor" className="bg-navy">
      <div ref={ref} className="grid min-h-[90vh] items-stretch lg:grid-cols-12">
        <div className="relative lg:col-span-5">
          <Image
            src={IMAGE_ASSETS.doctorPortrait.src}
            alt={IMAGE_ASSETS.doctorPortrait.alt}
            width={IMAGE_ASSETS.doctorPortrait.width}
            height={IMAGE_ASSETS.doctorPortrait.height}
            className="h-full min-h-[600px] w-full object-cover"
            style={{ minHeight: '600px' }}
          />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy to-transparent" />

          <div className="absolute bottom-8 left-8 z-10 h-36 w-36 overflow-hidden shadow-xl">
            <Image
              src={IMAGE_ASSETS.doctorDesk.src}
              alt={IMAGE_ASSETS.doctorDesk.alt}
              fill
              sizes="9rem"
              className="object-cover"
              style={{ border: '3px solid var(--color-gold)' }}
            />
          </div>
        </div>

        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center px-6 py-24 md:px-12 lg:col-span-7 lg:px-16"
        >
          <div className="max-w-2xl">
            <p className="section-label">{DOCTOR_SECTION_COPY.label}</p>
            <h2 className="mt-5 font-heading text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.1] text-white">
              {DOCTOR.fullName}
            </h2>

            <div className="mt-4 flex flex-wrap gap-2">
              {DOCTOR.pills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-gold/60 px-3 py-1 font-body text-[0.65rem] uppercase tracking-[0.18em] text-gold"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="mt-5 space-y-1">
              <p className="font-body text-base font-medium text-teal-light">{DOCTOR.title}</p>
              <p className="font-body text-base font-medium text-teal-light">
                {DOCTOR.titleSecondary}
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="border border-white/10 bg-white/5 p-4">
                <p className="font-body text-xs uppercase tracking-[0.18em] text-gold">Academic Role</p>
                <p className="mt-3 font-body text-sm leading-relaxed text-white/70">{DOCTOR.academic}</p>
              </div>
              <div className="border border-white/10 bg-white/5 p-4">
                <p className="font-body text-xs uppercase tracking-[0.18em] text-gold">Experience</p>
                <p className="mt-3 font-body text-sm leading-relaxed text-white/70">{DOCTOR.experience}</p>
              </div>
            </div>

            <div className="my-7 h-px w-12 bg-gold" />

            <div className="space-y-5">
              {DOCTOR.bioParagraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="font-body text-[1.02rem] font-light leading-[1.85] text-white/70"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {DOCTOR.expertiseTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-sm border border-white/10 bg-white/8 px-3 py-1.5 font-body text-[0.65rem] uppercase tracking-[0.18em] text-white/65"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <LeadActionGroup
                source="doctor-section"
                branchId="branch-1"
                intentKey="general-consultation"
                className="flex flex-wrap gap-4"
                secondaryClassName="button-secondary border-white text-white hover:bg-white hover:text-navy"
                tertiaryClassName="font-body text-sm text-white/70 underline underline-offset-4 transition-colors duration-300 hover:text-white"
                showDirections={false}
                showFormLink
              />
            </div>

            <div className="mt-8 border border-white/10 bg-white/5 p-5">
              <p className="font-body text-[0.68rem] font-medium uppercase tracking-[0.18em] text-gold">
                Specialist-led treatment pages
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <TrackedLink
                  href="/services/oral-maxillofacial-surgery"
                  eventName={TRACKING_EVENTS.appointmentCtaClick}
                  eventData={{ source: 'doctor-section', treatment_page: 'oral-maxillofacial-surgery' }}
                  ctaLabel="Oral and Maxillofacial Surgery"
                  className="inline-flex border border-white/10 px-3 py-2 font-body text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white/80 transition-colors duration-300 hover:border-gold hover:text-white"
                >
                  Oral and Maxillofacial Surgery
                </TrackedLink>
                <TrackedLink
                  href="/services/dental-implants"
                  eventName={TRACKING_EVENTS.appointmentCtaClick}
                  eventData={{ source: 'doctor-section', treatment_page: 'dental-implants' }}
                  ctaLabel="Dental Implants"
                  className="inline-flex border border-white/10 px-3 py-2 font-body text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white/80 transition-colors duration-300 hover:border-gold hover:text-white"
                >
                  Dental Implants
                </TrackedLink>
                <TrackedLink
                  href="/services/wisdom-tooth-removal"
                  eventName={TRACKING_EVENTS.appointmentCtaClick}
                  eventData={{ source: 'doctor-section', treatment_page: 'wisdom-tooth-removal' }}
                  ctaLabel="Wisdom Tooth Removal"
                  className="inline-flex border border-white/10 px-3 py-2 font-body text-[0.68rem] font-medium uppercase tracking-[0.14em] text-white/80 transition-colors duration-300 hover:border-gold hover:text-white"
                >
                  Wisdom Tooth Removal
                </TrackedLink>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
