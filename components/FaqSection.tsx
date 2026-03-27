import { ChevronDown } from 'lucide-react';

import { LeadActionGroup } from '@/components/cta/LeadActionGroup';
import { type FaqItem } from '@/lib/clinic-data';

interface FaqSectionProps {
  id?: string;
  label: string;
  heading: string;
  description?: string;
  faqs: FaqItem[];
}

export function FaqSection({ id, label, heading, description, faqs }: FaqSectionProps) {
  return (
    <section id={id} className="bg-white py-24 md:py-36">
      <div className="container-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="section-label">{label}</p>
          <h2 className="mt-5 font-heading text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.1] text-navy">
            {heading}
          </h2>
          {description ? (
            <p className="mt-4 font-body text-[1.02rem] font-light leading-relaxed text-muted">
              {description}
            </p>
          ) : null}
        </div>

        <div className="mx-auto mt-14 max-w-4xl divide-y divide-navy/10 border-y border-navy/10">
          {faqs.map((faq) => (
            <details key={faq.question} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-body text-left text-base font-medium text-navy marker:hidden md:text-lg">
                <span>{faq.question}</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-teal transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="mt-4 max-w-3xl font-body text-base font-light leading-relaxed text-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-4xl border border-navy/10 bg-cream/50 p-6 md:p-8">
          <p className="font-body text-[0.68rem] font-medium uppercase tracking-[0.18em] text-gold">
            Still comparing your next step?
          </p>
          <p className="mt-3 max-w-2xl font-body text-sm font-light leading-relaxed text-muted">
            If your main question is treatment suitability, branch choice, or booking speed, continue on WhatsApp or request a callback with your treatment interest already selected.
          </p>
          <div className="mt-6">
            <LeadActionGroup
              source="faq-section"
              branchId="branch-1"
              intentKey="general-consultation"
              className="flex flex-wrap gap-3 [&>*:first-child]:w-full [&>*:first-child]:justify-center [&>*:nth-child(2)]:hidden [&>*:nth-child(3)]:w-full [&>*:nth-child(3)]:justify-center md:gap-4 md:[&>*:first-child]:w-auto md:[&>*:nth-child(2)]:inline-flex md:[&>*:nth-child(3)]:w-auto"
              showFormLink
            />
          </div>
        </div>
      </div>
    </section>
  );
}
