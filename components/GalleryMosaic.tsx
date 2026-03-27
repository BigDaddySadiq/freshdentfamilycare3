'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { GALLERY_CELLS, GALLERY_COPY } from '@/lib/clinic-data';

export function GalleryMosaic() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section id="gallery" className="bg-cream py-24">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label">{GALLERY_COPY.label}</p>
          <h2 className="mt-5 font-heading text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.1] text-navy">
            {GALLERY_COPY.heading}
          </h2>
          <p className="mt-4 font-body text-[1.02rem] font-light leading-relaxed text-muted">
            {GALLERY_COPY.description}
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-12"
        >
          {GALLERY_CELLS.map((cell) => (
            <div
              key={cell.id}
              className={`relative min-h-[220px] overflow-hidden sm:min-h-[240px] md:min-h-[280px] ${cell.className}`}
            >
              <Image
                src={cell.src}
                alt={cell.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
