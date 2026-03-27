'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { DIGITAL_COPY, IMAGE_ASSETS } from '@/lib/clinic-data';

export function AdvancedDigitalSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });

  return (
    <section className="bg-navy py-24 md:py-36">
      <div ref={ref} className="container-shell">
        <div className="mx-auto mb-16 max-w-3xl text-center md:mb-20">
          <p className="section-label">{DIGITAL_COPY.label}</p>
          <h2 className="mt-5 font-heading text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.1] text-white">
            {DIGITAL_COPY.heading}
          </h2>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-6"
          >
            {DIGITAL_COPY.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="font-body text-[1.02rem] font-light leading-relaxed text-white/75"
              >
                {paragraph}
              </p>
            ))}

            <div className="mt-10 flex flex-col gap-4">
              {DIGITAL_COPY.highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-4">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-gold" />
                  <span className="font-body text-sm text-white/70">{highlight}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 30, opacity: 0, rotate: 2 }}
            animate={inView ? { x: 0, opacity: 1, rotate: 0 } : {}}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-2 border-gold/40"
          >
            <Image
              src={IMAGE_ASSETS.presentation.src}
              alt={IMAGE_ASSETS.presentation.alt}
              width={IMAGE_ASSETS.presentation.width}
              height={IMAGE_ASSETS.presentation.height}
              className="aspect-square h-auto w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
