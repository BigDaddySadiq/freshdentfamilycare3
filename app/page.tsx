import { AdvancedDigitalSection } from '@/components/AdvancedDigitalSection';
import { ContactSection } from '@/components/ContactSection';
import { CtaBanner } from '@/components/CtaBanner';
import { DentalTourismSection } from '@/components/DentalTourismSection';
import { DoctorSection } from '@/components/DoctorSection';
import { FloatingButtons } from '@/components/FloatingButtons';
import { Footer } from '@/components/Footer';
import { GalleryMosaic } from '@/components/GalleryMosaic';
import { HeroParallax } from '@/components/HeroParallax';
import { Navbar } from '@/components/Navbar';
import { ServicesGrid } from '@/components/ServicesGrid';
import { StatsBar } from '@/components/StatsBar';
import { TestimonialsSlider } from '@/components/TestimonialsSlider';
import { TwoLocationsSection } from '@/components/TwoLocationsSection';
import { WelcomeSection } from '@/components/WelcomeSection';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroParallax />
        <StatsBar />
        <WelcomeSection />
        <AdvancedDigitalSection />
        <ServicesGrid />
        <DoctorSection />
        <GalleryMosaic />
        <TestimonialsSlider />
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
