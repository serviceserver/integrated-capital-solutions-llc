// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SchemaScript from '@/components/SchemaScript';
import { organizationSchema } from '@/lib/seo';

export const metadata: Metadata = {
  title: {
    default: 'Integrated Capital Solutions | Best Lender for Experienced Real Estate Investors',
    template: '%s | Integrated Capital Solutions',
  },
  description:
    "Integrated Capital Solutions LLc is a national, direct private lender specializing in fast, flexible financing for experienced residential real estate investors. Ground Up, Fix & Flip, DSCR, and Bridge loans.",
  metadataBase: new URL('https://www.integratedcapitalsolutionsllc.com'),
  keywords:
    'private lender, real estate investor loans, fix and flip loans, DSCR rental loan, bridge loan, ground up construction loan, hard money alternative, non-bank lender',
  robots: { index: true, follow: true },
  openGraph: {
    siteName: 'Integrated Capital Solutions',
    type: 'website',
    locale: 'en_US',
    images: [{ url: '/integrated-capital.png', width: 1200, height: 630, alt: 'Integrated Capital Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@IntegratedCapitalSolutions',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16', type: 'image/x-icon' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
    ],
    apple: '/apple-touch-icon.png',
  },
  verification: {
    google: 'your-google-site-verification-token',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <SchemaScript schema={organizationSchema()} />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}