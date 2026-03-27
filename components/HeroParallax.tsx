'use client';

import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { TrackedLink } from '@/components/cta/TrackedLink';
import { HERO_COPY, HERO_INTENT_SHORTCUTS, HERO_SLIDES } from '@/lib/clinic-data';
import { buildWhatsAppUrl } from '@/lib/lead';
import { TRACKING_EVENTS } from '@/lib/tracking';

const heroWhatsappHref = buildWhatsAppUrl({
  source: 'hero-primary-cta',
  intentKey: 'general-consultation'
});

export function HeroParallax() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const overlineRef = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const dividerRef = useRef<HTMLDivElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const bulletsRef = useRef<HTMLDivElement | null>(null);
  const ctasRef = useRef<HTMLDivElement | null>(null);
  const previousSlide = useRef(0);
  const firstTransition = useRef(true);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      slideRefs.current.forEach((slide, index) => {
        gsap.set(slide, { opacity: index === 0 ? 1 : 0 });
      });

      const firstImage = imageRefs.current[0];
      if (firstImage) {
        gsap.fromTo(firstImage, { scale: 1.12 }, { scale: 1, duration: 5, ease: 'none' });
      }

      if (progressRef.current) {
        gsap.fromTo(progressRef.current, { width: '0%' }, { width: '100%', duration: 5, ease: 'none' });
      }

      const introItems = [
        overlineRef.current,
        headingRef.current,
        dividerRef.current,
        subtitleRef.current,
        bulletsRef.current,
        ctasRef.current
      ].filter(Boolean);

      if (introItems.length > 0) {
        gsap.from(introItems, {
          y: 30,
          opacity: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.3
        });
      }
    }, sectionRef);

    const intervalId = window.setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % HERO_SLIDES.length);
    }, 5000);

    return () => {
      window.clearInterval(intervalId);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (firstTransition.current) {
      firstTransition.current = false;
      return;
    }

    const previous = previousSlide.current;
    const next = currentSlide;
    const outgoingSlide = slideRefs.current[previous];
    const incomingSlide = slideRefs.current[next];
    const incomingImage = imageRefs.current[next];

    imageRefs.current.forEach((image) => {
      if (image) {
        gsap.killTweensOf(image);
      }
    });

    if (progressRef.current) {
      gsap.killTweensOf(progressRef.current);
      gsap.set(progressRef.current, { width: '0%' });
      gsap.to(progressRef.current, { width: '100%', duration: 5, ease: 'none' });
    }

    if (incomingSlide && outgoingSlide) {
      const timeline = gsap.timeline();

      timeline
        .to(outgoingSlide, {
          opacity: 0,
          duration: 1.2,
          ease: 'power2.inOut'
        })
        .fromTo(
          incomingSlide,
          { opacity: 0 },
          { opacity: 1, duration: 1.2, ease: 'power2.inOut' },
          '-=0.6'
        );
    }

    if (incomingImage) {
      gsap.fromTo(incomingImage, { scale: 1.12 }, { scale: 1, duration: 5, ease: 'none' });
    }

    previousSlide.current = next;
  }, [currentSlide]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-navy"
    >
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.src}
          ref={(node) => {
            slideRefs.current[index] = node;
          }}
          className="absolute inset-0 opacity-0"
        >
          <div
            ref={(node) => {
              imageRefs.current[index] = node;
            }}
            className="absolute inset-0"
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="hero-slide-overlay absolute inset-0" />
        </div>
      ))}

      <div className="container-shell relative z-10 flex w-full items-center">
        <div className="max-w-3xl py-24 md:py-36 lg:py-40">
          <p
            ref={overlineRef}
            className="max-w-[18rem] font-body text-[0.62rem] font-medium uppercase tracking-[0.22em] text-gold md:max-w-none md:text-[0.65rem] md:tracking-[0.25em]"
          >
            {HERO_COPY.overline}
          </p>

          <h1
            ref={headingRef}
            className="mt-4 max-w-2xl font-heading text-[clamp(2.9rem,12vw,7rem)] font-light leading-[0.98] tracking-[-0.02em] text-white md:leading-[1.05]"
          >
            {HERO_COPY.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <div ref={dividerRef} className="my-6 h-px w-16 bg-gold" />

          <p
            ref={subtitleRef}
            className="max-w-xl font-body text-[0.97rem] font-light leading-relaxed text-white/75 md:text-[1.02rem]"
          >
            {HERO_COPY.subtitle}
          </p>

          <div ref={bulletsRef} className="mt-5 flex flex-col gap-2 md:mt-6">
            {HERO_COPY.bullets.slice(0, 2).map((bullet) => (
              <div key={bullet} className="flex items-center gap-3 md:hidden">
                <CheckCircle2 className="h-4 w-4 text-teal" />
                <span className="font-body text-sm text-white/80">{bullet}</span>
              </div>
            ))}
            {HERO_COPY.bullets.map((bullet) => (
              <div key={bullet} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-teal" />
                <span className="hidden font-body text-sm text-white/80 md:inline">
                  {bullet}
                </span>
              </div>
            ))}
          </div>

          <div ref={ctasRef} className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-8">
            <TrackedLink
              href={heroWhatsappHref}
              target="_blank"
              rel="noreferrer"
              eventName={TRACKING_EVENTS.whatsappClick}
              eventData={{ source: 'hero-primary-cta', treatment_intent: 'general-consultation' }}
              ctaLabel={HERO_COPY.primaryCta.label}
              className="button-primary w-full sm:w-auto"
            >
              {HERO_COPY.primaryCta.label}
            </TrackedLink>
            <TrackedLink
              href={HERO_COPY.secondaryCta.href}
              eventName={TRACKING_EVENTS.appointmentCtaClick}
              eventData={{ source: 'hero-secondary-cta' }}
              ctaLabel={HERO_COPY.secondaryCta.label}
              className="button-secondary w-full sm:w-auto"
            >
              {HERO_COPY.secondaryCta.label}
            </TrackedLink>
          </div>

          <div className="mt-6 max-w-2xl border border-white/12 bg-white/6 p-4 backdrop-blur-sm md:mt-8 md:p-5">
            <p className="font-body text-[0.68rem] font-medium uppercase tracking-[0.18em] text-gold">
              High-intent shortcuts
            </p>
            <div className="mt-4 flex gap-3 overflow-x-auto pb-1 md:flex-wrap md:overflow-visible md:pb-0">
              {HERO_INTENT_SHORTCUTS.map((shortcut) => (
                <TrackedLink
                  key={shortcut.href}
                  href={shortcut.href}
                  eventName={TRACKING_EVENTS.appointmentCtaClick}
                  eventData={{ source: 'hero-shortcuts' }}
                  ctaLabel={shortcut.label}
                  className="inline-flex shrink-0 border border-white/15 px-4 py-3 font-body text-[0.68rem] font-medium uppercase tracking-[0.15em] text-white/85 transition-colors duration-300 hover:border-gold hover:bg-white/8 hover:text-white"
                >
                  {shortcut.label}
                </TrackedLink>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-3 border border-white/12 bg-navy/35 p-4 md:hidden">
            <div>
              <p className="font-body text-[0.62rem] font-medium uppercase tracking-[0.18em] text-gold">
                Best mobile path
              </p>
              <p className="mt-2 font-body text-sm font-light leading-relaxed text-white/78">
                WhatsApp for fastest response. Callback form if you want the clinic to contact you with branch and treatment context.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10">
        <div className="container-shell flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between md:gap-4 md:py-5">
          <p className="font-heading text-xs italic text-white/50 md:text-sm">
            {HERO_SLIDES[currentSlide]?.captionTopic}
          </p>

          <div className="flex items-center gap-3">
            {HERO_SLIDES.map((slide, index) => (
              <button
                key={slide.captionTopic}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`transition-[width,background-color] duration-500 ${
                  currentSlide === index ? 'h-2 w-6 bg-teal' : 'h-2 w-2 bg-white/30'
                }`}
                aria-label={slide.captionTopic}
              />
            ))}
          </div>

          <p className="font-body text-[0.65rem] font-light tracking-[0.2em] text-white/40 md:text-xs">
            {String(currentSlide + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
          </p>
        </div>
        <div ref={progressRef} className="h-0.5 w-0 bg-teal" />
      </div>
    </section>
  );
}
