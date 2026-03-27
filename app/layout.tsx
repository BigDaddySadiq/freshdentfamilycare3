import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';

import { AnalyticsBootstrap } from '@/components/AnalyticsBootstrap';
import { SITE_URL } from '@/lib/clinic-data';
import { createMetadata } from '@/lib/seo';

import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['300', '400', '600']
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500']
});

export const metadata: Metadata = {
  ...createMetadata({
    title: 'Fresh Dent Family Care | Advanced Dental Clinic Kakinada',
    description:
      "Kakinada's premier dental clinic led by Dr. K. Manoj Kumar MDS, Maxillofacial Surgeon. Expert care in dental implants, maxillofacial surgery, smile design, orthodontics and family dentistry.",
    path: '/',
    keywords: [
      'dental clinic kakinada',
      'dentist kakinada',
      'dental implants kakinada',
      'maxillofacial surgeon kakinada',
      'smile design kakinada',
      'dr manoj kumar dentist',
      'fresh dent family care',
      'root canal kakinada',
      'orthodontics kakinada',
      'dental tourism india',
      'kakinada dentist'
    ]
  }),
  metadataBase: new URL(SITE_URL)
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-white font-body text-charcoal antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:text-navy"
        >
          Skip to main content
        </a>
        <AnalyticsBootstrap />
        {children}
      </body>
    </html>
  );
}
