import type { MetadataRoute } from 'next';
import { COMPANY_INFO } from '@/data/companyData';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${COMPANY_INFO.legalName} – Pharma Wholesale`,
    short_name: COMPANY_INFO.name,
    description: 'Pharmaceutical wholesale distributor & super stockist in Bhandup West, Mumbai.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#008080',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
