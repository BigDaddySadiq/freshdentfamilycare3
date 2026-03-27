import Image from 'next/image';
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
  type LucideIcon
} from 'lucide-react';

import {
  BRANCHES,
  CONTACT_DETAILS,
  FOOTER_COPY,
  FOOTER_QUICK_LINKS,
  IMAGE_ASSETS,
  SOCIAL_LINKS,
  TAGLINE
} from '@/lib/clinic-data';

const socialIconMap: Record<string, LucideIcon> = {
  Facebook,
  Instagram,
  Youtube
};

export function Footer() {
  return (
    <footer className="bg-footer py-20 text-white">
      <div className="container-shell">
        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <Image
              src={IMAGE_ASSETS.logo.src}
              alt={IMAGE_ASSETS.logo.alt}
              width={99}
              height={56}
              className="mb-4 h-14 w-auto object-contain"
            />
            <p className="font-heading text-base italic text-white/60">{TAGLINE}</p>

            <div className="mt-6 flex gap-4">
              {SOCIAL_LINKS.map((link) => {
                const Icon = socialIconMap[link.label];

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-white/40 transition-colors duration-300 hover:text-teal"
                    aria-label={link.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-6 font-body text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              {FOOTER_COPY.quickLinksHeading}
            </p>
            <div className="space-y-1">
              {FOOTER_QUICK_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block border-b border-transparent py-1 font-body text-sm font-light text-white/60 transition-colors duration-300 hover:border-teal/30 hover:text-teal"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-6 font-body text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              {FOOTER_COPY.treatmentsHeading}
            </p>
            <div className="space-y-1">
              {FOOTER_COPY.treatments.map((treatment) => (
                <a
                  key={treatment}
                  href="#services"
                  className="block border-b border-transparent py-1 font-body text-sm font-light text-white/60 transition-colors duration-300 hover:border-teal/30 hover:text-teal"
                >
                  {treatment}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-6 font-body text-xs font-medium uppercase tracking-[0.2em] text-white/40">
              {FOOTER_COPY.contactHeading}
            </p>
            <div className="space-y-2">
              <div className="flex gap-3 py-2">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-teal" />
                <p className="font-body text-sm font-light text-white/60">
                  {BRANCHES[0]?.name}, Kakinada 533005
                </p>
              </div>
              <div className="flex gap-3 py-2">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-teal" />
                <p className="font-body text-sm font-light text-white/60">
                  {BRANCHES[1]?.name}, Kakinada 533003
                </p>
              </div>
              <div className="flex gap-3 py-2">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-teal" />
                <p className="font-body text-sm font-light text-white/60">
                  {CONTACT_DETAILS.primaryPhone}
                </p>
              </div>
              <div className="flex gap-3 py-2">
                <Phone className="mt-1 h-4 w-4 shrink-0 text-teal" />
                <p className="font-body text-sm font-light text-white/60">
                  {BRANCHES[1]?.phones.join(' · ')}
                </p>
              </div>
              <div className="flex gap-3 py-2">
                <Mail className="mt-1 h-4 w-4 shrink-0 text-teal" />
                <p className="font-body text-sm font-light text-white/60">
                  {CONTACT_DETAILS.email}
                </p>
              </div>
              <div className="flex gap-3 py-2">
                <span className="w-4 shrink-0" />
                <p className="font-body text-sm font-light text-white/60">
                  {FOOTER_COPY.hours}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/8 pt-8">
          <p className="font-body text-xs font-light text-white/30">{FOOTER_COPY.copyright}</p>
          <p className="font-body text-xs font-light text-white/30">{FOOTER_COPY.locationLine}</p>
        </div>
      </div>
    </footer>
  );
}
