'use client';

import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { CTA_COPY, IMAGE_ASSETS } from '@/lib/clinic-data';

export function CtaBanner() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const elements = itemRefs.current.filter(Boolean);

      if (elements.length === 0 || !sectionRef.current) {
        return;
      }

      gsap.from(elements, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          once: true
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-40">
      <Image
        src={IMAGE_ASSETS.smileDesign.src}
        alt={IMAGE_ASSETS.smileDesign.alt}
        fill
        sizes="100vw"
        className="object-cover object-center"
        style={{ objectPosition: 'center 30%' }}
      />
      <div className="absolute inset-0 bg-navy/88" />

      <div className="container-shell relative z-10 text-center">
        <div className="mx-auto max-w-3xl">
          <p
            ref={(node) => {
              itemRefs.current[0] = node;
            }}
            className="section-label"
          >
            {CTA_COPY.label}
          </p>
          <h2
            ref={(node) => {
              itemRefs.current[1] = node;
            }}
            className="mt-5 font-heading text-[clamp(2.5rem,5vw,5rem)] font-light leading-[1.08] text-white"
          >
            {CTA_COPY.heading}
          </h2>
          <p
            ref={(node) => {
              itemRefs.current[2] = node;
            }}
            className="mx-auto mt-5 max-w-xl font-body text-base font-light leading-relaxed text-white/65"
          >
            {CTA_COPY.description}
          </p>

          <div
            ref={(node) => {
              itemRefs.current[3] = node;
            }}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            <a href={CTA_COPY.primary.href} className="button-primary gap-3">
              <Phone className="h-4 w-4" />
              <span>{CTA_COPY.primary.label}</span>
            </a>
            <a
              href={CTA_COPY.secondary.href}
              className="button-secondary gap-3 border-white text-white hover:bg-white hover:text-navy"
            >
              <Phone className="h-4 w-4" />
              <span>{CTA_COPY.secondary.label}</span>
            </a>
          </div>

          <a
            ref={(node) => {
              itemRefs.current[4] = node;
            }}
            href={CTA_COPY.tertiary.href}
            className="mt-6 inline-flex items-center gap-2 font-body text-sm text-white/60 underline underline-offset-4 transition-colors duration-300 hover:text-white"
          >
            <Mail className="h-4 w-4" />
            <span>{CTA_COPY.tertiary.label}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
