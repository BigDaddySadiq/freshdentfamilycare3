'use client';

import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { HERO_COPY, HERO_SLIDES } from '@/lib/clinic-data';

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

      if (sectionRef.current) {
        gsap.to(sectionRef.current, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true
          }
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
        <div className="max-w-3xl py-28 md:py-36 lg:py-40">
          <p
            ref={overlineRef}
            className="font-body text-[0.65rem] font-medium uppercase tracking-[0.25em] text-gold"
          >
            {HERO_COPY.overline}
          </p>

          <h1
            ref={headingRef}
            className="mt-4 max-w-2xl font-heading text-[clamp(3.5rem,6vw,7rem)] font-light leading-[1.05] tracking-[-0.02em] text-white"
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
            className="max-w-lg font-body text-[1.05rem] font-light leading-relaxed text-white/75"
          >
            {HERO_COPY.subtitle}
          </p>

          <div ref={bulletsRef} className="mt-6 flex flex-col gap-2">
            {HERO_COPY.bullets.map((bullet) => (
              <div key={bullet} className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-teal" />
                <span className="font-body text-sm text-white/80">{bullet}</span>
              </div>
            ))}
          </div>

          <div ref={ctasRef} className="mt-10 flex flex-wrap gap-4">
            <a href={HERO_COPY.primaryCta.href} className="button-primary">
              {HERO_COPY.primaryCta.label}
            </a>
            <a href={HERO_COPY.secondaryCta.href} className="button-secondary">
              {HERO_COPY.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10">
        <div className="container-shell flex flex-col gap-4 py-5 md:flex-row md:items-center md:justify-between">
          <p className="font-heading text-sm italic text-white/50">
            {HERO_SLIDES[currentSlide]?.captionTopic}
          </p>

          <div className="flex items-center gap-3">
            {HERO_SLIDES.map((slide, index) => (
              <button
                key={slide.captionTopic}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-500 ${
                  currentSlide === index ? 'h-2 w-6 bg-teal' : 'h-2 w-2 bg-white/30'
                }`}
                aria-label={slide.captionTopic}
              />
            ))}
          </div>

          <p className="font-body text-xs font-light tracking-[0.2em] text-white/40">
            {String(currentSlide + 1).padStart(2, '0')} / {String(HERO_SLIDES.length).padStart(2, '0')}
          </p>
        </div>
        <div ref={progressRef} className="h-0.5 w-0 bg-teal" />
      </div>
    </section>
  );
}
