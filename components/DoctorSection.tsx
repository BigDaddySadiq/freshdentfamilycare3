'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { DOCTOR, DOCTOR_SECTION_COPY, IMAGE_ASSETS } from '@/lib/clinic-data';

export function DoctorSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="bg-navy">
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

            <a href={DOCTOR_SECTION_COPY.cta.href} className="button-primary mt-10">
              {DOCTOR_SECTION_COPY.cta.label}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
