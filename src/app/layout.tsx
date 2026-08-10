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
import { COMPANY_INFO } from '@/data/companyData';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'VS Medico LLP | Top Pharma Wholesale Distributor & Stockist in Mumbai',
  description: 'VS Medico LLP is Mumbai\'s premier pharmaceutical super stockist & wholesale distributor located at Sharad Industrial Estate, Bhandup West. Authorized FDA 20B/21B licensed supplier for Sun Pharma, Cipla, Alkem, Lupin, Abbott, Torrent, GSK with WHO-GDP Cold Chain & same-day MMR delivery.',
  keywords: [
    'VS Medico LLP',
    'Pharma Wholesale Distributor Mumbai',
    'Pharmaceutical Stockist Bhandup West',
    'Super Stockist Medicine Wholesale',
    'Form 20B 21B FDA Licensed Wholesaler',
    'Sun Pharma Distributor Mumbai',
    'Cipla Stockist Bhandup',
    'Alkem Lupin Abbott Wholesale Rates',
    'Chemist Medicine Wholesale Mumbai',
    'WHO-GDP Cold Chain Insulin Vaccines Mumbai',
    'Hospital Medicine Rate Contract Supplier',
    'Sharad Industrial Estate Bhandup Wholesaler'
  ],
  robots: 'index, follow',
  authors: [{ name: 'VS Medico LLP' }],
  category: 'Pharmaceutical Wholesale',
  openGraph: {
    title: 'VS Medico LLP | Premier Pharma Wholesale Distributor & Stockist Mumbai',
    description: "Single-window pharmaceutical wholesale stockist supplying 50+ leading brands to 1,200+ retail chemists & hospitals across Mumbai MMR since 1998.",
    url: 'https://vsmedico.in',
    siteName: 'VS Medico LLP',
    locale: 'en_IN',
    type: 'website',
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@type": ["WholesaleStore", "MedicalBusiness", "LocalBusiness"],
  "name": COMPANY_INFO.legalName,
  "url": "https://vsmedico.in",
  "telephone": COMPANY_INFO.contact.phoneSales,
  "email": COMPANY_INFO.contact.emailSales,
  "description": "Premier pharmaceutical wholesale distributor, super stockist, and FDA Form 20B/21B licensed supplier in Bhandup West, Mumbai.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": COMPANY_INFO.address.building,
    "addressLocality": "Bhandup West, Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": COMPANY_INFO.address.pincode,
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 19.1471018,
    "longitude": 72.9348123
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "09:30",
    "closes": "20:30"
  },
  "areaServed": [
    "Bhandup",
    "Mulund",
    "Thane",
    "Powai",
    "Ghatkopar",
    "Mumbai",
    "Navi Mumbai",
    "Maharashtra"
  ],
  "knowsAbout": [
    "Pharmaceutical Wholesale",
    "FDA Drug License Form 20B 21B",
    "WHO-GDP Cold Storage",
    "Hospital Rate Contracts",
    "Net PTR Medicine Rates"
  ]
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
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
