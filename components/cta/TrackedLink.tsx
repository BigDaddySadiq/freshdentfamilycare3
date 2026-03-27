'use client';

import Link from 'next/link';
import type { MouseEventHandler, ReactNode } from 'react';

import { trackEvent, type TrackingEventName, type TrackingPayload } from '@/lib/tracking';

interface TrackedLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  eventName?: TrackingEventName;
  eventData?: TrackingPayload;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  ctaLabel?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

export function TrackedLink({
  href,
  children,
  className,
  eventName,
  eventData,
  target,
  rel,
  ariaLabel,
  ctaLabel,
  onClick
}: TrackedLinkProps) {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    if (eventName) {
      trackEvent(eventName, {
        destination_href: href,
        cta_label: ctaLabel ?? ariaLabel,
        ...eventData
      });
    }

    onClick?.(event);
  };

  const isInternal = href.startsWith('/') && !href.startsWith('//');

  if (isInternal) {
    return (
      <Link href={href} className={className} onClick={handleClick} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={className}
      onClick={handleClick}
      target={target}
      rel={rel}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
}
