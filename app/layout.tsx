import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';

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
  title: 'Fresh Dent Family Care | Advanced Dental Clinic Kakinada',
  description:
    "Kakinada's premier dental clinic led by Dr. K. Manoj Kumar MDS, Maxillofacial Surgeon. Expert care in dental implants, maxillofacial surgery, smile design, orthodontics & family dentistry. Two branches. Book today.",
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
  ],
  openGraph: {
    title: 'Fresh Dent Family Care | Advanced Dental Clinic Kakinada',
    description: 'Advanced digital dental care for families in Kakinada.',
    url: 'https://freshdentfamilycare.in',
    siteName: 'Fresh Dent Family Care',
    locale: 'en_IN',
    type: 'website'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-white font-body text-charcoal antialiased">{children}</body>
    </html>
  );
}
