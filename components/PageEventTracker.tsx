'use client';

import { useEffect } from 'react';

import { trackEvent, type TrackingEventName } from '@/lib/tracking';

interface PageEventTrackerProps {
  eventName: TrackingEventName;
  eventData?: Record<string, unknown>;
}

export function PageEventTracker({ eventName, eventData }: PageEventTrackerProps) {
  useEffect(() => {
    trackEvent(eventName, eventData);
  }, [eventData, eventName]);

  return null;
}
