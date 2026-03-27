import {
  MapPinned,
  MessageSquareShare,
  ScanLine,
  ShieldCheck,
  type LucideIcon
} from 'lucide-react';

import { TRUST_HIGHLIGHTS } from '@/lib/clinic-data';

const iconMap: Record<string, LucideIcon> = {
  ShieldCheck,
  MapPinned,
  ScanLine,
  MessageSquareShare
};

export function StatsBar() {
  return (
    <section className="bg-navy py-10 md:py-12">
      <div className="container-shell grid gap-px bg-white/10 md:grid-cols-2 xl:grid-cols-4">
        {TRUST_HIGHLIGHTS.map((highlight) => {
          const Icon = iconMap[highlight.icon];

          return (
            <article key={highlight.title} className="bg-navy px-6 py-6 md:px-8">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center border border-gold/30 bg-white/5 text-gold">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-body text-[0.72rem] font-medium uppercase tracking-[0.18em] text-gold">
                    {highlight.title}
                  </p>
                  <p className="mt-3 font-body text-sm font-light leading-relaxed text-white/70">
                    {highlight.description}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
