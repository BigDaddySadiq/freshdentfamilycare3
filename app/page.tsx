import { AdvancedDigitalSection } from '@/components/AdvancedDigitalSection';
import { ContactSection } from '@/components/ContactSection';
import { CtaBanner } from '@/components/CtaBanner';
import { DentalTourismSection } from '@/components/DentalTourismSection';
import { DoctorSection } from '@/components/DoctorSection';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Footer } from '@/components/Footer';
import { FaqSection } from '@/components/FaqSection';
import { GalleryMosaic } from '@/components/GalleryMosaic';
import { HeroParallax } from '@/components/HeroParallax';
import { Navbar } from '@/components/Navbar';
import { ServicesGrid } from '@/components/ServicesGrid';
import { StatsBar } from '@/components/StatsBar';
import { TestimonialsSlider } from '@/components/TestimonialsSlider';
import { TwoLocationsSection } from '@/components/TwoLocationsSection';
import { WelcomeSection } from '@/components/WelcomeSection';
import { HOMEPAGE_FAQS } from '@/lib/clinic-data';
import { createClinicSchemas, createFaqSchema } from '@/lib/seo';

export default function HomePage() {
  const schemas = [...createClinicSchemas(), createFaqSchema(HOMEPAGE_FAQS)];

  return (
    <>
      <Navbar />
      <main id="main-content">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }} />
        <HeroParallax />
        <StatsBar />
        <WelcomeSection />
        <AdvancedDigitalSection />
        <ServicesGrid />
        <DoctorSection />
        <GalleryMosaic />
        <TestimonialsSlider />
        <FaqSection
          id="faq"
          label="COMMON QUESTIONS"
          heading="Booking clarity for patients and families."
          description="High-intent visitors often need one more layer of reassurance before booking. These answers support WhatsApp, call, and callback actions without adding friction."
          faqs={HOMEPAGE_FAQS}
        />
        <DentalTourismSection />
        <TwoLocationsSection />
        <CtaBanner />
        <ContactSection />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
