'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { STATS, type Stat } from '@/lib/clinic-data';

function AnimatedStat({ stat, index }: { stat: Stat; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) {
      return;
    }

    let frameId = 0;
    const duration = 2000;
    const start = performance.now();

    const easeOutExpo = (progress: number) =>
      progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

    const step = (timestamp: number) => {
      const elapsed = Math.min((timestamp - start) / duration, 1);
      const eased = easeOutExpo(elapsed);
      setDisplayValue(Math.round(stat.value * eased));

      if (elapsed < 1) {
        frameId = window.requestAnimationFrame(step);
      }
    };

    frameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [inView, stat.value]);

  return (
    <div
      ref={ref}
      className={`px-6 py-4 text-center md:px-8 ${
        index < STATS.length - 1 ? 'border-b border-white/15 md:border-b-0 md:border-r' : ''
      }`}
    >
      <div className="font-heading text-[clamp(2.5rem,4vw,4rem)] font-semibold text-gold">
        {displayValue.toLocaleString()}
        {stat.suffix}
      </div>
      <p className="mt-2 font-body text-[0.7rem] font-medium uppercase tracking-[0.18em] text-white/50">
        {stat.label}
      </p>
    </div>
  );
}

export function StatsBar() {
  return (
    <section className="bg-navy py-16">
      <div className="container-shell grid grid-cols-1 md:grid-cols-4">
        {STATS.map((stat, index) => (
          <AnimatedStat key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </section>
  );
}
