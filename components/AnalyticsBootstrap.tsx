'use client';

import { useEffect } from 'react';

import { captureAttributionFromLocation } from '@/lib/tracking';

export function AnalyticsBootstrap() {
  useEffect(() => {
    captureAttributionFromLocation();
  }, []);

  return null;
}
