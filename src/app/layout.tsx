import './globals.css';
import React, { ReactNode } from 'react';
import { Metadata, Viewport } from 'next';
import { QuoteBasketProvider } from '@/components/QuoteBasketContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MobileNav from '@/components/MobileNav';
import BulkInquiryModal from '@/components/BulkInquiryModal';
import LicenseBadgeModal from '@/components/LicenseBadgeModal';
import WhatsAppWidget from '@/components/WhatsAppWidget';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'VS Medico LLP | Pharmaceutical Wholesale & Distributor in Mumbai',
  description: 'VS Medico LLP is a leading pharmaceutical stockist, wholesaler, and authorized distributor based in Bhandup West, Mumbai. FDA Licensed Form 20B/21B, WHO-GDP Cold Chain, supplying branded formulations & trade generics to retail chemists and hospitals across MMR.',
  keywords: ['VS Medico', 'Pharma Wholesaler Mumbai', 'Pharmaceutical Stockist Bhandup', 'Medicine Distributor Maharashtra', 'Form 20B 21B Licensed Wholesaler', 'Sun Pharma Stockist', 'Cipla Distributor', 'Cold Chain Vaccines Mumbai'],
  robots: 'index, follow',
  openGraph: {
    title: 'VS Medico LLP | Pharmaceutical Wholesale & Stockist Mumbai',
    description: "Mumbai's trusted pharmaceutical wholesale stockist & distributor serving retail chemists and hospitals since 1998.",
    url: 'https://vsmedico.in',
    siteName: 'VS Medico LLP',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QuoteBasketProvider>
          <div className="min-h-screen flex flex-col justify-between">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
            <MobileNav />
            <BulkInquiryModal />
            <LicenseBadgeModal />
            <WhatsAppWidget />
          </div>
        </QuoteBasketProvider>
      </body>
    </html>
  );
}
