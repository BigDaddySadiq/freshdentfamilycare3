'use client';

import { motion } from 'framer-motion';
import { Clock3, MapPin, Phone } from 'lucide-react';

import { LeadActionGroup } from '@/components/cta/LeadActionGroup';
import { BRANCH_DECISION_NOTES, BRANCHES, LOCATIONS_COPY } from '@/lib/clinic-data';

export function TwoLocationsSection() {
  return (
    <section id="locations" className="bg-cream py-24">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label">{LOCATIONS_COPY.label}</p>
          <h2 className="mt-5 font-heading text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.1] text-navy">
            {LOCATIONS_COPY.heading}
          </h2>
          <p className="mt-4 font-body text-[1.02rem] font-light leading-relaxed text-muted">
            {LOCATIONS_COPY.description}
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-6 md:flex-row">
          {BRANCHES.map((branch, index) => {
            const branchNote = BRANCH_DECISION_NOTES.find((note) => note.branchId === branch.id);

            return (
              <motion.article
                key={branch.id}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 border-t-2 border-teal bg-white p-8 md:p-10"
              >
                {branchNote ? (
                <div className="mb-6 border border-gold/20 bg-cream/60 p-4">
                  <p className="font-body text-[0.68rem] font-medium uppercase tracking-[0.18em] text-gold">
                    Branch Guidance
                  </p>
                  <p className="mt-3 font-body text-sm font-medium leading-relaxed text-navy">
                      {branchNote.title}
                  </p>
                  <p className="mt-2 font-body text-sm font-light leading-relaxed text-muted">
                      {branchNote.description}
                  </p>
                </div>
                ) : null}

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

                <div className="mt-8 flex flex-wrap gap-4">
                  <LeadActionGroup
                    branchId={branch.id}
                    intentKey="general-consultation"
                    source={`locations-${branch.id}`}
                    className="flex flex-wrap gap-4"
                    showDirections
                    showFormLink
                    primaryLabel={`WhatsApp ${branch.name}`}
                    callLabel={branch.id === 'branch-1' ? 'Call Branch 1' : 'Call Branch 2'}
                    formLabel={`Callback for ${branch.name}`}
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
