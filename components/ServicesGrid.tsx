'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  AlignCenter,
  Anchor,
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

import { IMAGE_ASSETS, SERVICES, SERVICES_SECTION } from '@/lib/clinic-data';

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

const serviceVisuals = {
  'Maxillo Facial Surgery': IMAGE_ASSETS.flapSurgery,
  'Advanced Digital Smile Designing': IMAGE_ASSETS.smileDesign
} as const;

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

export function ServicesGrid() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" className="relative overflow-hidden bg-white py-24 md:py-36">
      <div className="pointer-events-none absolute right-0 top-0 h-56 w-56 opacity-10 md:h-72 md:w-72">
        <Image
          src={IMAGE_ASSETS.dentalProcedureCloseup.src}
          alt={IMAGE_ASSETS.dentalProcedureCloseup.alt}
          fill
          sizes="18rem"
          className="object-cover"
        />
      </div>

      <div className="container-shell relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label">{SERVICES_SECTION.label}</p>
          <h2 className="mt-5 font-heading text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.1] text-navy">
            {SERVICES_SECTION.heading}
          </h2>
          <p className="mt-4 font-body text-[1.02rem] font-light leading-relaxed text-muted">
            {SERVICES_SECTION.description}
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="mt-16 grid gap-px bg-cream md:grid-cols-2 xl:grid-cols-3"
        >
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon];
            const accentImage = serviceVisuals[service.title as keyof typeof serviceVisuals];

            return (
              <motion.article
                key={service.title}
                variants={itemVariants}
                className="group relative overflow-hidden border-t-2 border-t-transparent bg-white p-8 transition-all duration-300 hover:border-t-teal hover:shadow-xl md:p-10"
              >
                {accentImage ? (
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-28 opacity-20 transition-opacity duration-300 group-hover:opacity-30">
                    <Image
                      src={accentImage.src}
                      alt={accentImage.alt}
                      fill
                      sizes="7rem"
                      className="object-cover"
                    />
                  </div>
                ) : null}

                <div className="relative z-10">
                  <Icon className="mb-5 h-8 w-8 text-teal" />
                  <h3 className="font-heading text-[1.4rem] font-semibold leading-tight text-navy">
                    {service.title}
                  </h3>
                  <p className="mt-3 font-body text-[0.88rem] font-light leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <span className="mt-5 inline-block translate-y-2 font-body text-xs uppercase tracking-[0.18em] text-teal opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    {service.enquiryLabel}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
