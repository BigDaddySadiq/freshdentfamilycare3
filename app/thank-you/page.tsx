import type { Metadata } from 'next';

import { FloatingButtons } from '@/components/FloatingButtons';
import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import { PageEventTracker } from '@/components/PageEventTracker';
import { LeadActionGroup } from '@/components/cta/LeadActionGroup';
import { createMetadata } from '@/lib/seo';
import { TRACKING_EVENTS } from '@/lib/tracking';

export const metadata: Metadata = {
  ...createMetadata({
    title: 'Thank You | Fresh Dent Family Care',
    description: 'Continue your appointment request with Fresh Dent Family Care.',
    path: '/thank-you'
  }),
  robots: {
    index: false,
    follow: false
  }
};

type ThankYouSearchParams = Promise<{
  branch?: string;
  treatment?: string;
  source?: string;
  lead?: string;
}>;

export default async function ThankYouPage({
  searchParams
}: {
  searchParams: ThankYouSearchParams;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <>
      <Navbar />
      <main id="main-content" className="bg-cream pt-32 md:pt-40">
        <PageEventTracker
          eventName={TRACKING_EVENTS.thankYouPageView}
          eventData={{
            branch_id: resolvedSearchParams.branch,
            treatment_intent: resolvedSearchParams.treatment,
            source: resolvedSearchParams.source,
            submission_id: resolvedSearchParams.lead
          }}
        />

        <section className="pb-24 md:pb-32">
          <div className="container-shell">
            <div className="mx-auto max-w-3xl border border-navy/10 bg-white p-8 text-center shadow-xl md:p-12">
              <p className="section-label">Thank You</p>
              <h1 className="mt-5 font-heading text-[clamp(2.8rem,5vw,4.8rem)] leading-[1.05] text-navy">
                Your appointment request has been received.
              </h1>
              <p className="mt-5 font-body text-[1.02rem] font-light leading-relaxed text-muted">
                Thank you for sharing your details with Fresh Dent Family Care. For faster coordination, you can continue on WhatsApp, call the clinic, or return to the callback form if you need to update anything.
              </p>
              {resolvedSearchParams.lead ? (
                <p className="mt-4 font-body text-sm text-muted">
                  Reference ID: <span className="font-medium text-navy">{resolvedSearchParams.lead}</span>
                </p>
              ) : null}

              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <LeadActionGroup
                  source="thank-you"
                  branchId={
                    (resolvedSearchParams.branch as 'branch-1' | 'branch-2' | undefined) ??
                    'branch-1'
                  }
                  intentKey={(resolvedSearchParams.treatment as any) ?? 'general-consultation'}
                  className="flex flex-wrap justify-center gap-4"
                  showDirections
                  showFormLink
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
