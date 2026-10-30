import './globals.css';
import React, { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import ScrollToTop from '@/components/ScrollToTop';
import { COMPANY_INFO, GEO, PHARMA_BRANDS, SITE_URL } from '@/data/companyData';
import { DEFAULT_OG_IMAGE } from '@/lib/seo';
import { CONTENT_SECURITY_POLICY, jsonLd } from '@/lib/security';

// Self-hosted at build time: no render-blocking request to Google Fonts.
const bodyFont = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#008080',
};

const DEFAULT_DESCRIPTION =
  'FDA-licensed pharma wholesaler & super stockist in Bhandup West, Mumbai. 50+ brands incl. Sun, Cipla, Alkem & Lupin, 2–8°C cold chain, same-day MMR delivery.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'VS Medico LLP | Pharma Wholesale Distributor & Stockist in Mumbai',
    template: '%s | VS Medico LLP',
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: COMPANY_INFO.legalName,
  keywords: [
    'pharma wholesale distributor Mumbai',
    'pharmaceutical stockist Bhandup West',
    'medicine wholesaler Mumbai',
    'super stockist Mumbai',
    'Form 20B 21B licensed wholesaler',
    'cold chain insulin vaccine distributor Mumbai',
    'hospital medicine supplier Mumbai',
    'chemist wholesale rates Thane Mulund',
  ],
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  authors: [{ name: COMPANY_INFO.legalName, url: SITE_URL }],
  category: 'Pharmaceutical Wholesale',
  openGraph: {
    title: 'VS Medico LLP | Pharma Wholesale Distributor & Stockist in Mumbai',
    description:
      'Single-window pharmaceutical wholesale stockist supplying 50+ leading brands to 1,200+ retail chemists & hospitals across Mumbai MMR since 1998.',
    url: '/',
    siteName: COMPANY_INFO.legalName,
    locale: 'en_IN',
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VS Medico LLP | Pharma Wholesale Distributor in Mumbai',
    description: 'Authorised pharma stockist for 50+ brands with same-day delivery across Mumbai MMR.',
    images: [DEFAULT_OG_IMAGE.url],
  },
  formatDetection: { telephone: true, email: true, address: true },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
          other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
            ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
            : undefined,
        },
      }
    : {}),
};

const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: COMPANY_INFO.legalName,
      alternateName: COMPANY_INFO.name,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      foundingDate: String(COMPANY_INFO.establishedYear),
      taxID: COMPANY_INFO.licenses.gstin,
      email: COMPANY_INFO.contact.emailSales,
      telephone: COMPANY_INFO.contact.phoneSales,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: COMPANY_INFO.contact.phoneSales,
          email: COMPANY_INFO.contact.emailSales,
          areaServed: 'IN',
          availableLanguage: ['en', 'hi', 'mr'],
        },
      ],
    },
    {
      '@type': ['WholesaleStore', 'LocalBusiness'],
      '@id': `${SITE_URL}/#business`,
      name: COMPANY_INFO.legalName,
      parentOrganization: { '@id': `${SITE_URL}/#organization` },
      url: SITE_URL,
      image: `${SITE_URL}/images/warehouse.webp`,
      telephone: COMPANY_INFO.contact.phoneSales,
      email: COMPANY_INFO.contact.emailSales,
      description: DEFAULT_DESCRIPTION,
      address: {
        '@type': 'PostalAddress',
        streetAddress: `${COMPANY_INFO.address.building}, ${COMPANY_INFO.address.locality}`,
        addressLocality: COMPANY_INFO.address.city,
        addressRegion: COMPANY_INFO.address.state,
        postalCode: COMPANY_INFO.address.pincode,
        addressCountry: 'IN',
      },
      geo: { '@type': 'GeoCoordinates', latitude: GEO.latitude, longitude: GEO.longitude },
      hasMap: COMPANY_INFO.address.mapDirectionsUrl,
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:30',
        closes: '20:30',
      },
      areaServed: ['Bhandup', 'Mulund', 'Thane', 'Powai', 'Ghatkopar', 'Kurla', 'Dadar', 'Mumbai', 'Navi Mumbai'].map(
        (name) => ({ '@type': 'Place', name })
      ),
      brand: PHARMA_BRANDS.map((b) => ({ '@type': 'Brand', name: b.name })),
      knowsAbout: [
        'Pharmaceutical wholesale distribution',
        'Drug licence Form 20B and 21B',
        'WHO-GDP cold chain storage (2°C to 8°C)',
        'Hospital rate contracts',
        'PTR and MRP pricing',
      ],
      priceRange: '₹₹',
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: COMPANY_INFO.legalName,
      inLanguage: 'en-IN',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" className={bodyFont.variable} suppressHydrationWarning>
      <head>
        {process.env.NODE_ENV === 'production' && (
          <meta httpEquiv="Content-Security-Policy" content={CONTENT_SECURITY_POLICY} />
        )}
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(jsonLdData)} />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main id="main-content" className="grow">
            {children}
          </main>
          <Footer />
          <WhatsAppWidget />
        </div>
      </body>
    </html>
  );
}
