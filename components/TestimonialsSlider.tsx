'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { TESTIMONIALS, TESTIMONIALS_SECTION } from '@/lib/clinic-data';

export function TestimonialsSlider() {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
        return;
      }

      if (window.innerWidth >= 768) {
        setVisibleCount(2);
        return;
      }

      setVisibleCount(1);
    };

    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);

    return () => {
      window.removeEventListener('resize', updateVisibleCount);
    };
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setIndex((previous) => (previous + 1) % TESTIMONIALS.length);
    }, 4500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const visibleTestimonials = useMemo(
    () =>
      Array.from({ length: visibleCount }, (_, offset) => TESTIMONIALS[(index + offset) % TESTIMONIALS.length]),
    [index, visibleCount]
  );

  const handlePrevious = () => {
    setIndex((previous) => (previous - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setIndex((previous) => (previous + 1) % TESTIMONIALS.length);
  };

  return (
    <section className="bg-white py-24 md:py-36">
      <div className="container-shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label">{TESTIMONIALS_SECTION.label}</p>
            <h2 className="mt-5 font-heading text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.1] text-navy">
              {TESTIMONIALS_SECTION.heading}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrevious}
              aria-label={TESTIMONIALS_SECTION.previousLabel}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-navy/20 text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label={TESTIMONIALS_SECTION.nextLabel}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-navy/20 text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-14 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${index}-${visibleCount}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              drag={visibleCount === 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (visibleCount !== 1) {
                  return;
                }

                if (info.offset.x <= -50) {
                  handleNext();
                }

                if (info.offset.x >= 50) {
                  handlePrevious();
                }
              }}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {visibleTestimonials.map((testimonial) => (
                <article
                  key={`${testimonial.name}-${index}`}
                  className="border-l-[3px] border-teal bg-cream p-8 md:p-10"
                >
                  <p className="mb-5 text-base tracking-[0.2em] text-gold">
                    {'★'.repeat(testimonial.stars)}
                  </p>
                  <p className="font-heading text-[1.2rem] italic leading-relaxed text-charcoal">
                    {testimonial.quote}
                  </p>
                  <p className="mt-6 flex items-center gap-2 font-body text-sm font-medium text-navy">
                    <span className="text-gold">—</span>
                    <span>{testimonial.name}</span>
                  </p>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
