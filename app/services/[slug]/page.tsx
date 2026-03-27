import Image from 'next/image';
import { ArrowRight, CheckCircle2, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { FloatingButtons } from '@/components/FloatingButtons';
import { Footer } from '@/components/Footer';
import { FaqSection } from '@/components/FaqSection';
import { Navbar } from '@/components/Navbar';
import { PageEventTracker } from '@/components/PageEventTracker';
import { LeadActionGroup } from '@/components/cta/LeadActionGroup';
import { TrackedLink } from '@/components/cta/TrackedLink';
import { BRANCHES, IMAGE_ASSETS, TREATMENT_PAGES } from '@/lib/clinic-data';
import { createBreadcrumbSchema, createFaqSchema, createMetadata, createTreatmentSchema } from '@/lib/seo';
import { TRACKING_EVENTS } from '@/lib/tracking';

const treatmentImageMap = {
  'dental-implants': IMAGE_ASSETS.doctorWithHappyPatient,
  'root-canal-treatment': IMAGE_ASSETS.dentalProcedureCloseup,
  'smile-design': IMAGE_ASSETS.smileDesign,
  'wisdom-tooth-removal': IMAGE_ASSETS.flapSurgery,
  'braces-orthodontics': IMAGE_ASSETS.smileDesign,
  'pediatric-dentistry': IMAGE_ASSETS.doctorWithHappyPatient,
  'zirconia-crowns': IMAGE_ASSETS.intraoralScanner,
  'oral-maxillofacial-surgery': IMAGE_ASSETS.flapSurgery
} as const;

export function generateStaticParams() {
  return TREATMENT_PAGES.map((page) => ({ slug: page.slug }));
}

type TreatmentPageParams = Promise<{ slug: string }>;

export async function generateMetadata({
  params
}: {
  params: TreatmentPageParams;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const treatment = TREATMENT_PAGES.find((page) => page.slug === resolvedParams.slug);

  if (!treatment) {
    return createMetadata({
      title: 'Service Not Found | Fresh Dent Family Care',
      description: 'The requested treatment page could not be found.',
      path: `/services/${resolvedParams.slug}`
    });
  }

  return createMetadata({
    title: treatment.metaTitle,
    description: treatment.metaDescription,
    path: `/services/${treatment.slug}`,
    keywords: [
      `${treatment.title.toLowerCase()} kakinada`,
      `${treatment.eyebrow.toLowerCase()}`,
      `${treatment.title.toLowerCase()} fresh dent`,
      'dentist kakinada',
      'fresh dent family care',
      'dental clinic kakinada',
      'kakinada dentist'
    ]
  });
}

export default async function TreatmentPage({ params }: { params: TreatmentPageParams }) {
  const resolvedParams = await params;
  const treatment = TREATMENT_PAGES.find((page) => page.slug === resolvedParams.slug);

  if (!treatment) {
    notFound();
  }

  const relatedPages = TREATMENT_PAGES.filter((page) => treatment.relatedSlugs.includes(page.slug));
  const image = treatmentImageMap[treatment.slug];
  const conversionHighlights = [
    {
      title: 'Specialist-led treatment path',
      description: 'Each treatment page keeps Dr. K. Manoj Kumar and specialist-led planning visible for higher-intent visitors.'
    },
    {
      title: 'WhatsApp-first booking',
      description: 'Visitors can open a treatment-aware enquiry immediately instead of hunting for contact details.'
    },
    {
      title: 'Two Kakinada branches',
      description: 'Branch comparison and branch-specific enquiry paths reduce confusion for local patients.'
    },
    {
      title: 'Callback fallback',
      description: 'Form-based follow-up remains available for visitors who want the clinic to call back.'
    }
  ];
  const structuredData = [
    createFaqSchema(treatment.faqs),
    createTreatmentSchema(treatment),
    createBreadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: treatment.title, path: `/services/${treatment.slug}` }
    ])
  ];

  return (
    <>
      <Navbar />
      <main id="main-content">
        <PageEventTracker
          eventName={TRACKING_EVENTS.treatmentPageView}
          eventData={{ treatment_page: treatment.slug, treatment_intent: treatment.intentKey }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <section className="bg-cream pt-32 md:pt-40">
          <div className="container-shell grid gap-10 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <nav
                aria-label="Breadcrumb"
                className="font-body text-[0.68rem] font-medium uppercase tracking-[0.14em] text-muted"
              >
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <TrackedLink href="/" className="transition-colors duration-300 hover:text-navy">
                      Home
                    </TrackedLink>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="text-navy">{treatment.title}</li>
                </ol>
              </nav>

              <p className="section-label">{treatment.eyebrow}</p>
              <h1 className="mt-5 max-w-3xl font-heading text-[clamp(3rem,6vw,5.5rem)] leading-[1.02] text-navy">
                {treatment.title}
              </h1>
              <p className="mt-5 max-w-2xl font-body text-[1.05rem] font-light leading-relaxed text-muted">
                {treatment.summary}
              </p>

              <div className="mt-8 md:hidden">
                <LeadActionGroup
                  source={`treatment-page-${treatment.slug}`}
                  branchId="branch-1"
                  intentKey={treatment.intentKey}
                  className="flex flex-col gap-3"
                  primaryClassName="button-primary w-full"
                  secondaryClassName="inline-flex min-h-[52px] items-center justify-center border border-navy/15 bg-white px-4 py-3 font-body text-[0.68rem] font-medium uppercase tracking-[0.14em] text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-white"
                  tertiaryClassName="inline-flex min-h-[52px] items-center justify-center border border-teal/30 bg-white px-4 py-3 font-body text-[0.68rem] font-medium uppercase tracking-[0.14em] text-teal transition-colors duration-300 hover:border-teal hover:bg-teal hover:text-white"
                  showDirections={false}
                  showFormLink
                />
              </div>

              <div className="mt-8 hidden flex-wrap gap-4 md:flex">
                <LeadActionGroup
                  source={`treatment-page-${treatment.slug}`}
                  branchId="branch-1"
                  intentKey={treatment.intentKey}
                  className="flex flex-wrap gap-3 [&>*:first-child]:w-full [&>*:first-child]:justify-center [&>*:nth-child(2)]:flex-1 [&>*:nth-child(2)]:justify-center [&>*:nth-child(3)]:hidden [&>*:nth-child(4)]:flex-1 [&>*:nth-child(4)]:justify-center md:gap-4 md:[&>*:first-child]:w-auto md:[&>*:nth-child(2)]:flex-none md:[&>*:nth-child(3)]:inline-flex md:[&>*:nth-child(4)]:flex-none"
                  showDirections
                  showFormLink
                />
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {conversionHighlights.map((item) => (
                  <div key={item.title} className="border border-navy/10 bg-white/75 p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold/20 bg-cream text-gold">
                        <ShieldCheck className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-body text-[0.7rem] font-medium uppercase tracking-[0.16em] text-gold">
                          Trust Cue
                        </p>
                        <p className="mt-2 font-body text-sm font-medium leading-relaxed text-navy">
                          {item.title}
                        </p>
                        <p className="mt-2 font-body text-sm font-light leading-relaxed text-muted">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative min-h-[360px] overflow-hidden bg-white shadow-2xl">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="container-shell grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <article className="border border-navy/10 bg-cream/40 p-6 md:p-8">
              <p className="section-label">Treatment Overview</p>
              <p className="mt-4 font-body text-base font-light leading-relaxed text-charcoal">
                {treatment.serviceSummary}
              </p>
            </article>
            <article className="border border-navy/10 bg-white p-6 md:p-8">
              <p className="section-label">Local Access</p>
              <div className="mt-4 space-y-4">
                {BRANCHES.map((branch) => (
                  <div key={branch.id} className="flex items-start gap-3">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-teal" />
                    <div>
                      <p className="font-body text-sm font-medium text-navy">{branch.name}</p>
                      <p className="font-body text-sm font-light leading-relaxed text-muted">
                        {branch.address}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid gap-3 border-t border-navy/10 pb-1 pt-6 md:flex md:flex-wrap md:overflow-visible md:pb-0">
                <TrackedLink
                  href="/#locations"
                  eventName={TRACKING_EVENTS.appointmentCtaClick}
                  eventData={{ source: `treatment-local-access-${treatment.slug}` }}
                  ctaLabel="Compare Kakinada branches"
                  className="inline-flex shrink-0 items-center justify-center border border-navy/10 px-3 py-3 font-body text-[0.68rem] font-medium uppercase tracking-[0.14em] text-navy/75 transition-colors duration-300 hover:border-teal hover:text-navy md:justify-start md:py-2"
                >
                  Compare Kakinada branches
                </TrackedLink>
                <TrackedLink
                  href="/#contact"
                  eventName={TRACKING_EVENTS.appointmentCtaClick}
                  eventData={{ source: `treatment-local-access-${treatment.slug}` }}
                  ctaLabel="Request callback"
                  className="inline-flex shrink-0 items-center justify-center border border-navy/10 px-3 py-3 font-body text-[0.68rem] font-medium uppercase tracking-[0.14em] text-navy/75 transition-colors duration-300 hover:border-teal hover:text-navy md:justify-start md:py-2"
                >
                  Request callback
                </TrackedLink>
                <TrackedLink
                  href="/#doctor"
                  eventName={TRACKING_EVENTS.appointmentCtaClick}
                  eventData={{ source: `treatment-local-access-${treatment.slug}` }}
                  ctaLabel="Meet Dr. K. Manoj Kumar"
                  className="inline-flex shrink-0 items-center justify-center border border-navy/10 px-3 py-3 font-body text-[0.68rem] font-medium uppercase tracking-[0.14em] text-navy/75 transition-colors duration-300 hover:border-teal hover:text-navy md:justify-start md:py-2"
                >
                  Meet Dr. K. Manoj Kumar
                </TrackedLink>
              </div>
            </article>
          </div>
        </section>

        <section className="bg-cream py-16 md:py-24">
          <div className="container-shell">
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-label">Treatment Conversion Path</p>
              <h2 className="mt-5 font-heading text-[clamp(2.3rem,4vw,4rem)] leading-[1.1] text-navy">
                Choose the branch and booking path for {treatment.title.toLowerCase()}.
              </h2>
              <p className="mt-4 font-body text-[1.02rem] font-light leading-relaxed text-muted">
                Paid-traffic visitors usually need one clear next step. These branch-specific actions keep WhatsApp, call, directions, and callback options close to the treatment decision.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              {BRANCHES.map((branch) => (
                <article key={branch.id} className="border border-navy/10 bg-white p-6 md:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="section-label">{branch.label}</p>
                      <h3 className="mt-4 font-heading text-[2rem] leading-tight text-navy">
                        {branch.name}
                      </h3>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center border border-gold/20 bg-cream text-gold">
                      {branch.id === 'branch-1' ? (
                        <MessageCircle className="h-5 w-5" />
                      ) : (
                        <MapPin className="h-5 w-5" />
                      )}
                    </div>
                  </div>

                  <p className="mt-4 font-body text-sm font-light leading-relaxed text-muted">
                    {branch.address}
                  </p>

                  <div className="mt-6 grid gap-3 border-y border-navy/10 py-5 sm:grid-cols-2">
                    <div>
                      <p className="font-body text-[0.68rem] font-medium uppercase tracking-[0.16em] text-gold">
                        Best for
                      </p>
                      <p className="mt-2 font-body text-sm font-light leading-relaxed text-charcoal">
                        Visitors who want {treatment.title.toLowerCase()} guidance routed through {branch.name}.
                      </p>
                    </div>
                    <div>
                      <p className="font-body text-[0.68rem] font-medium uppercase tracking-[0.16em] text-gold">
                        Booking options
                      </p>
                      <p className="mt-2 font-body text-sm font-light leading-relaxed text-charcoal">
                        WhatsApp, direct call, branch directions, or callback request with treatment context attached.
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <LeadActionGroup
                      source={`treatment-branch-${treatment.slug}-${branch.id}`}
                      branchId={branch.id}
                      intentKey={treatment.intentKey}
                      className="flex flex-wrap gap-3 [&>*:first-child]:w-full [&>*:first-child]:justify-center [&>*:nth-child(2)]:flex-1 [&>*:nth-child(2)]:justify-center [&>*:nth-child(3)]:flex-1 [&>*:nth-child(3)]:justify-center [&>*:nth-child(4)]:hidden md:gap-4 md:[&>*:first-child]:w-auto md:[&>*:nth-child(2)]:flex-none md:[&>*:nth-child(3)]:flex-none md:[&>*:nth-child(4)]:inline-flex"
                      showDirections
                      showFormLink
                      primaryLabel={`WhatsApp ${branch.name}`}
                      callLabel={branch.id === 'branch-1' ? 'Call Branch 1' : 'Call Branch 2'}
                      directionsLabel={`Directions to ${branch.name}`}
                      formLabel={`Callback for ${treatment.title}`}
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-navy py-16 md:py-24">
          <div className="container-shell grid gap-8 lg:grid-cols-2">
            <article className="border border-white/10 bg-white/5 p-6 md:p-8">
              <p className="section-label">Who It Is For</p>
              <div className="mt-6 space-y-4">
                {treatment.suitableFor.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal" />
                    <p className="font-body text-sm font-light leading-relaxed text-white/75">{item}</p>
                  </div>
                ))}
              </div>
            </article>
            <article className="border border-white/10 bg-white/5 p-6 md:p-8">
              <p className="section-label">Common Planning Questions</p>
              <div className="mt-6 space-y-4">
                {treatment.commonConcerns.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-teal" />
                    <p className="font-body text-sm font-light leading-relaxed text-white/75">{item}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <FaqSection
          label="Treatment FAQs"
          heading={`Questions patients ask about ${treatment.title}.`}
          description="These FAQs are structured to support local SEO, reduce friction before consultation, and make paid traffic landing pages easier to scale later."
          faqs={treatment.faqs}
        />

        <section className="bg-cream py-20 md:py-24">
          <div className="container-shell">
            <div className="mx-auto max-w-3xl text-center">
              <p className="section-label">Related Services</p>
              <h2 className="mt-5 font-heading text-[clamp(2.3rem,4vw,4rem)] leading-[1.1] text-navy">
                Explore related treatment pathways.
              </h2>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {relatedPages.map((page) => (
                <article key={page.slug} className="border border-navy/10 bg-white p-6">
                  <p className="section-label">Related Service</p>
                  <h3 className="mt-4 font-heading text-[1.9rem] leading-tight text-navy">{page.title}</h3>
                  <p className="mt-3 font-body text-sm font-light leading-relaxed text-muted">
                    {page.summary}
                  </p>
                  <TrackedLink
                    href={`/services/${page.slug}`}
                    eventName={TRACKING_EVENTS.appointmentCtaClick}
                    eventData={{ source: `related-service-${treatment.slug}`, treatment_page: page.slug }}
                    ctaLabel={`Open ${page.title}`}
                    className="mt-5 inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-[0.18em] text-teal"
                  >
                    <span>Open page</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </TrackedLink>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
