import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/companyData';
import { getProducts } from '@/data/products';
import { absoluteUrl } from '@/lib/seo';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number; changeFrequency: 'weekly' | 'monthly' }[] = [
    { path: '', priority: 1, changeFrequency: 'weekly' },
    { path: '/products', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/services', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/register', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/network', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/who-we-serve', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/core-strengths', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/compliance', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/gallery', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/company-profile', priority: 0.5, changeFrequency: 'monthly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'monthly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'monthly' },
  ];

  return [
    ...pages.map((p) => ({
      url: `${SITE_URL}${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
    })),
    ...getProducts().map((product) => ({
      url: `${SITE_URL}/products/${product.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
      ...(product.image ? { images: [absoluteUrl(product.image)] } : {}),
    })),
  ];
}
