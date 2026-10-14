import type { Metadata } from 'next';
import { COMPANY_INFO, SITE_URL } from '@/data/companyData';

/** Absolute URL for a site path; leaves full URLs (e.g. an image pasted from elsewhere) untouched. */
export function absoluteUrl(pathOrUrl: string): string {
  return /^https?:\/\//.test(pathOrUrl) ? pathOrUrl : `${SITE_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}

/** Default social share card (1200×630), used unless a page supplies its own image. */
export const DEFAULT_OG_IMAGE = {
  url: '/og-image.png',
  width: 1200,
  height: 630,
  alt: `${COMPANY_INFO.legalName} – Pharma Wholesale Distributor & Stockist in Mumbai`,
};

/**
 * Per-page metadata with a matching canonical URL and Open Graph block.
 * (A page-level `openGraph` replaces the root one entirely, so set it here.)
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: {
  title: string;
  description: string;
  path: string;
  image?: { url: string; alt: string };
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${COMPANY_INFO.legalName}`,
      description,
      url: path,
      siteName: COMPANY_INFO.legalName,
      locale: 'en_IN',
      type: 'website',
      images: [image ?? DEFAULT_OG_IMAGE],
    },
  };
}
