import { ArrowUpRight, Clock3, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';

import { AppointmentRequestForm } from '@/components/forms/AppointmentRequestForm';
import { LeadActionGroup } from '@/components/cta/LeadActionGroup';
import { TrackedLink } from '@/components/cta/TrackedLink';
import { BRANCHES, CONTACT_COPY, CONTACT_DECISION_CARDS, CONTACT_DETAILS } from '@/lib/clinic-data';
import { buildWhatsAppUrl } from '@/lib/lead';
import { TRACKING_EVENTS } from '@/lib/tracking';

const quickWhatsappHref = buildWhatsAppUrl({
  source: 'contact-decision-card',
  intentKey: 'general-consultation'
});

export function ContactSection() {
  return (
    <section id="contact" className="bg-cream py-24 md:py-36">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label">{CONTACT_COPY.label}</p>
          <h2 className="mt-5 font-heading text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.1] text-navy">
            {CONTACT_COPY.heading}
          </h2>
          <p className="mt-4 font-body text-[1.02rem] font-light leading-relaxed text-muted">
            {CONTACT_COPY.description}
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col">
            <div className="order-2 mb-8 flex gap-4 overflow-x-auto pb-2 md:order-none md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
              {CONTACT_DECISION_CARDS.map((card) => {
                const href = card.kind === 'whatsapp' ? quickWhatsappHref : card.href;
                const isExternal = card.kind === 'whatsapp';
                const icon =
                  card.kind === 'whatsapp' ? (
                    <MessageCircle className="h-4 w-4 text-teal" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-teal" />
                  );

                return (
                  <TrackedLink
                    key={card.title}
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noreferrer' : undefined}
                    eventName={
                      card.kind === 'whatsapp'
                        ? TRACKING_EVENTS.whatsappClick
                        : TRACKING_EVENTS.appointmentCtaClick
                    }
                    eventData={{ source: 'contact-decision-cards' }}
                    ctaLabel={card.title}
                    className="min-w-[82%] border border-navy/10 bg-white p-5 transition-colors duration-300 hover:border-teal hover:bg-white md:min-w-0"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-body text-[0.7rem] font-medium uppercase tracking-[0.18em] text-gold">
                        Next Step
                      </p>
                      {icon}
                    </div>
                    <h3 className="mt-4 font-heading text-[1.5rem] leading-tight text-navy">
                      {card.title}
                    </h3>
                    <p className="mt-3 font-body text-sm font-light leading-relaxed text-muted">
                      {card.description}
                    </p>
                  </TrackedLink>
                );
              })}
            </div>

            <div className="order-3 mb-10 flex gap-4 overflow-x-auto pb-2 md:order-none md:grid md:grid-cols-2 md:overflow-visible md:pb-0">
              <article className="min-w-[84%] border border-navy/10 bg-white p-6 md:min-w-0">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-[18px] w-[18px] shrink-0 text-teal" />
                  <div>
                    <p className="font-body text-xs font-medium uppercase tracking-[0.18em] text-gold">
                      Primary Branch
                    </p>
                    <p className="mt-2 font-heading text-2xl text-navy">{BRANCHES[0]?.name}</p>
                    <p className="mt-2 font-body text-sm leading-relaxed text-charcoal">
                      {BRANCHES[0]?.address}
                    </p>
                  </div>
                </div>
              </article>
              <article className="min-w-[84%] border border-navy/10 bg-white p-6 md:min-w-0">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-[18px] w-[18px] shrink-0 text-teal" />
                  <div>
                    <p className="font-body text-xs font-medium uppercase tracking-[0.18em] text-gold">
                      Branch 2
                    </p>
                    <p className="mt-2 font-heading text-2xl text-navy">{BRANCHES[1]?.name}</p>
                    <p className="mt-2 font-body text-sm leading-relaxed text-charcoal">
                      {BRANCHES[1]?.address}
                    </p>
                  </div>
                </div>
              </article>
            </div>

            <div className="order-4 grid gap-4 border border-navy/10 bg-white p-6 md:order-none md:grid-cols-2">
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-[18px] w-[18px] shrink-0 text-teal" />
                <div>
                  <p className="font-body text-xs font-medium uppercase tracking-[0.18em] text-gold">
                    Phone Support
                  </p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-charcoal">
                    {CONTACT_DETAILS.allPhones}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock3 className="mt-1 h-[18px] w-[18px] shrink-0 text-teal" />
                <div>
                  <p className="font-body text-xs font-medium uppercase tracking-[0.18em] text-gold">
                    Clinic Hours
                  </p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-charcoal">
                    {CONTACT_DETAILS.hours}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 md:col-span-2">
                <Mail className="mt-1 h-[18px] w-[18px] shrink-0 text-teal" />
                <div>
                  <p className="font-body text-xs font-medium uppercase tracking-[0.18em] text-gold">
                    Email
                  </p>
                  <p className="mt-2 font-body text-sm leading-relaxed text-charcoal">
                    {CONTACT_DETAILS.email}
                  </p>
                </div>
              </div>
            </div>

            <div className="order-1 mt-8 border border-navy/10 bg-white p-6 md:order-none md:p-8">
              <div className="mb-6 border-b border-navy/10 pb-6">
                <p className="font-body text-[0.7rem] font-medium uppercase tracking-[0.18em] text-gold">
                  Callback Form
                </p>
                <p className="mt-3 max-w-2xl font-body text-sm font-light leading-relaxed text-muted">
                  Best for visitors who want the clinic to call back with branch and treatment context already attached.
                </p>
              </div>
              <AppointmentRequestForm />
            </div>

            <div className="mt-6 hidden flex-wrap gap-4 md:flex">
              <LeadActionGroup
                source="contact-section"
                branchId="branch-1"
                intentKey="general-consultation"
                className="flex flex-wrap gap-4"
                showDirections
                showFormLink={false}
              />
            </div>
          </div>

          <div className="min-h-[320px] overflow-hidden border-2 border-gold/40 bg-white md:min-h-[640px]">
            <iframe
              src={CONTACT_COPY.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '100%' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Fresh Dent Family Care Location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
