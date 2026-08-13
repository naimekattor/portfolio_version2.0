'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);
  const lastTrackedUrl = useRef('');

  useEffect(() => {
    // Generate or retrieve a persistent visitor ID
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId = crypto.randomUUID();
      localStorage.setItem('visitor_id', visitorId);
    }

    const url = window.location.href;
    
    // Prevent duplicate tracking for the same exact URL in React StrictMode
    if (url === lastTrackedUrl.current && !isFirstRender.current) {
      return;
    }
    
    isFirstRender.current = false;
    lastTrackedUrl.current = url;

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api/v1';

    const payload = {
      visitorId,
      url,
      path: pathname,
      title: document.title,
      referrer: document.referrer,
      language: navigator.language,
      screenSize: `${window.innerWidth}x${window.innerHeight}`,
    };

    fetch(`${API_BASE}/analytics/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).catch(err => {
      console.error('Failed to track analytics:', err);
    });

  }, [pathname, searchParams]);

  return null;
}
