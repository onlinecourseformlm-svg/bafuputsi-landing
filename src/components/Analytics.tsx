"use client";

import Script from 'next/script';
import { useEffect, useCallback } from 'react';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Properly type the window object for Google Analytics
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    trackEvent?: (eventName: string, eventParams?: Record<string, unknown>) => void;
  }
}

export default function Analytics() {
  // Track custom events
  const trackEvent = useCallback((eventName: string, eventParams?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, eventParams);
    }
  }, []);

  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: window.location.pathname,
      });
    }
  }, []);

  // Make trackEvent available globally
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.trackEvent = trackEvent;
    }
  }, [trackEvent]);

  return (
    <>
      {/* Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      {/* Vercel Analytics */}
      <VercelAnalytics />
    </>
  );
}

// Helper function to track events from components
export const trackContactFormSubmission = () => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'contact_form_submit', {
      event_category: 'engagement',
      event_label: 'Contact Form',
    });
  }
};

export const trackChatbotInteraction = (message: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'chatbot_interaction', {
      event_category: 'engagement',
      event_label: 'Chatbot',
      value: message.substring(0, 50), // First 50 chars
    });
  }
};

export const trackButtonClick = (buttonName: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'button_click', {
      event_category: 'interaction',
      event_label: buttonName,
    });
  }
};
