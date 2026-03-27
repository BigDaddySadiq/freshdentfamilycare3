'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

import { CONTACT_DETAILS, HERO_COPY, IMAGE_ASSETS, NAV_ITEMS } from '@/lib/clinic-data';

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      when: 'beforeChildren',
      staggerChildren: 0.08
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.25,
      when: 'afterChildren',
      staggerChildren: 0.05,
      staggerDirection: -1
    }
  }
};

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.2 } }
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = ScrollTrigger.create({
      start: 0,
      end: document.body.scrollHeight || 1,
      onUpdate: () => {
        setIsScrolled(window.scrollY > 60);
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navClassName = isScrolled
    ? 'bg-navy/95 shadow-lg backdrop-blur-md'
    : 'bg-transparent';

  return (
    <>
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${navClassName}`}>
        <div className="container-shell flex items-center justify-between gap-6 py-5">
          <a href="#home" className="shrink-0" aria-label="Fresh Dent Family Care home">
            <Image
              src={IMAGE_ASSETS.logo.src}
              alt={IMAGE_ASSETS.logo.alt}
              width={85}
              height={48}
              priority={IMAGE_ASSETS.logo.priority}
              className="h-12 w-auto object-contain"
            />
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="nav-link-underline font-body text-[0.75rem] font-medium uppercase tracking-[0.15em] text-white"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={HERO_COPY.primaryCta.href}
              className="flex items-center gap-2 font-body text-sm text-white/80 transition-colors duration-300 hover:text-white"
            >
              <Phone className="h-4 w-4 text-gold" />
              <span>{CONTACT_DETAILS.primaryPhone}</span>
            </a>
            <a
              href={HERO_COPY.primaryCta.href}
              className="bg-teal px-6 py-3 font-body text-[0.7rem] font-medium uppercase tracking-[0.15em] text-white transition-colors duration-300 hover:bg-gold hover:text-navy"
            >
              {HERO_COPY.primaryCta.label}
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex h-12 w-12 items-center justify-center border border-white/20 text-white transition-colors duration-300 hover:border-gold hover:text-gold lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-navy px-6 text-center"
          >
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-6 top-6 inline-flex h-12 w-12 items-center justify-center border border-white/15 text-white transition-colors duration-300 hover:border-gold hover:text-gold"
              aria-label="Close navigation menu"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="flex flex-col items-center gap-6">
              {NAV_ITEMS.map((item) => (
                <motion.a
                  key={item.href}
                  variants={linkVariants}
                  href={item.href}
                  className="font-heading text-4xl font-light text-white"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            <motion.div
              variants={linkVariants}
              className="absolute bottom-12 flex flex-col items-center gap-5"
            >
              <a
                href={HERO_COPY.primaryCta.href}
                className="flex items-center gap-2 font-body text-sm tracking-[0.1em] text-white/75"
              >
                <Phone className="h-4 w-4 text-gold" />
                <span>{CONTACT_DETAILS.primaryPhone}</span>
              </a>
              <a
                href={HERO_COPY.primaryCta.href}
                className="bg-teal px-8 py-4 font-body text-[0.72rem] font-medium uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-gold hover:text-navy"
                onClick={() => setIsOpen(false)}
              >
                {HERO_COPY.primaryCta.label}
              </a>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
