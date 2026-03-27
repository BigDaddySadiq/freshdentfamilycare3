'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

import { LeadActionGroup } from '@/components/cta/LeadActionGroup';
import { IMAGE_ASSETS, TOURISM_COPY } from '@/lib/clinic-data';

export function DentalTourismSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section id="dental-tourism" className="relative overflow-hidden bg-navy py-24 md:py-36">
      <div className="pointer-events-none absolute left-8 top-6 font-heading text-[9rem] leading-none text-gold/10 md:left-12 md:top-8 md:text-[14rem]">
        "
      </div>

      <div ref={ref} className="container-shell relative z-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="lg:pr-12"
        >
          <p className="section-label">{TOURISM_COPY.label}</p>
          <h2 className="mt-5 font-heading text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.1] text-white">
            {TOURISM_COPY.heading}
          </h2>
          <div className="my-7 h-px w-12 bg-gold" />

          <div className="space-y-5">
            {TOURISM_COPY.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="font-body text-[1.02rem] font-light leading-relaxed text-white/70"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3">
            {TOURISM_COPY.checklist.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
                <span className="font-body text-sm text-white/70">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <LeadActionGroup
              source="dental-tourism"
              intentKey="dental-tourism"
              branchId="branch-1"
              className="flex flex-wrap gap-4"
              secondaryClassName="button-secondary border-white text-white hover:bg-white hover:text-navy"
              tertiaryClassName="font-body text-sm text-white/70 underline underline-offset-4 transition-colors duration-300 hover:text-white"
              showDirections={false}
              showFormLink
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ x: 40, opacity: 0 }}
          animate={inView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden border-2 border-gold/40"
        >
          <Image
            src={IMAGE_ASSETS.presentation.src}
            alt={IMAGE_ASSETS.presentation.alt}
            width={IMAGE_ASSETS.presentation.width}
            height={IMAGE_ASSETS.presentation.height}
            className="aspect-[4/3] h-auto w-full object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
