'use client';

import { motion } from 'framer-motion';
import { Clock3, MapPin, Phone } from 'lucide-react';

import { BRANCHES, LOCATIONS_COPY } from '@/lib/clinic-data';

export function TwoLocationsSection() {
  return (
    <section id="locations" className="bg-cream py-24">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label">{LOCATIONS_COPY.label}</p>
          <h2 className="mt-5 font-heading text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.1] text-navy">
            {LOCATIONS_COPY.heading}
          </h2>
        </div>

        <div className="mt-14 flex flex-col gap-6 md:flex-row">
          {BRANCHES.map((branch, index) => (
            <motion.article
              key={branch.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 border-t-2 border-teal bg-white p-10"
            >
              <p className="font-heading text-5xl font-light text-gold/20">{branch.badge}</p>
              <p className="mt-2 font-body text-xs font-medium uppercase tracking-[0.2em] text-teal">
                {branch.label}
              </p>
              <h3 className="mt-2 font-heading text-[1.6rem] font-semibold text-navy">
                {branch.name}
              </h3>

              <div className="mt-6 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-teal" />
                  <p className="font-body text-sm leading-relaxed text-charcoal">{branch.address}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-teal" />
                  <p className="font-body text-sm leading-relaxed text-charcoal">
                    {branch.phones.join(' · ')}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Clock3 className="mt-1 h-4 w-4 shrink-0 text-teal" />
                  <p className="font-body text-sm leading-relaxed text-charcoal">{branch.hours}</p>
                </div>
              </div>

              <a
                href={branch.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-8 inline-flex font-body text-xs font-medium uppercase tracking-[0.18em] text-teal transition-colors duration-300 hover:text-navy"
              >
                {LOCATIONS_COPY.ctaLabel}
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
