import { Clock3, Mail, MapPin, Phone } from 'lucide-react';

import { BRANCHES, CONTACT_COPY, CONTACT_DETAILS } from '@/lib/clinic-data';

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

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-10 flex flex-col gap-5">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-[18px] w-[18px] shrink-0 text-teal" />
                <div className="space-y-2">
                  <p className="font-body text-sm leading-relaxed text-charcoal">
                    {BRANCHES[0]?.address}
                  </p>
                  <p className="font-body text-sm leading-relaxed text-charcoal">
                    {BRANCHES[1]?.address}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-[18px] w-[18px] shrink-0 text-teal" />
                <p className="font-body text-sm leading-relaxed text-charcoal">
                  {CONTACT_DETAILS.allPhones}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-[18px] w-[18px] shrink-0 text-teal" />
                <p className="font-body text-sm leading-relaxed text-charcoal">
                  {CONTACT_DETAILS.email}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Clock3 className="mt-1 h-[18px] w-[18px] shrink-0 text-teal" />
                <p className="font-body text-sm leading-relaxed text-charcoal">
                  {CONTACT_DETAILS.hours}
                </p>
              </div>
            </div>

            <form
              action={CONTACT_COPY.form.action}
              method={CONTACT_COPY.form.method}
              encType={CONTACT_COPY.form.encType}
              className="space-y-4"
            >
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="fullName"
                  placeholder={CONTACT_COPY.form.fields.nameLabel}
                  className="w-full rounded-none border border-gray-200 bg-white px-4 py-3 font-body text-sm text-charcoal transition-colors duration-300 focus:border-teal focus:outline-none"
                  required
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder={CONTACT_COPY.form.fields.phoneLabel}
                  className="w-full rounded-none border border-gray-200 bg-white px-4 py-3 font-body text-sm text-charcoal transition-colors duration-300 focus:border-teal focus:outline-none"
                  required
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder={CONTACT_COPY.form.fields.emailLabel}
                className="w-full rounded-none border border-gray-200 bg-white px-4 py-3 font-body text-sm text-charcoal transition-colors duration-300 focus:border-teal focus:outline-none"
                required
              />

              <select
                name="treatment"
                defaultValue={CONTACT_COPY.form.fields.options[0]}
                className="w-full rounded-none border border-gray-200 bg-white px-4 py-3 font-body text-sm text-charcoal transition-colors duration-300 focus:border-teal focus:outline-none"
              >
                {CONTACT_COPY.form.fields.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <textarea
                name="message"
                rows={4}
                placeholder={CONTACT_COPY.form.fields.messageLabel}
                className="w-full rounded-none border border-gray-200 bg-white px-4 py-3 font-body text-sm text-charcoal transition-colors duration-300 focus:border-teal focus:outline-none"
              />

              <button
                type="submit"
                className="w-full bg-navy py-4 font-body text-[0.7rem] font-medium uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-teal"
              >
                {CONTACT_COPY.form.fields.submitLabel}
              </button>
            </form>
          </div>

          <div className="overflow-hidden border-2 border-gold/40">
            <iframe
              src={CONTACT_COPY.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '500px' }}
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
