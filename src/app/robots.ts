import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/data/companyData';

export const dynamic = 'force-static';

// AI answer engines (ChatGPT, Perplexity, Claude, Gemini, Copilot) are allowed so
// the business can be cited in AI search results. Training-only crawlers are not.
const AI_SEARCH_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Claude-SearchBot', 'Google-Extended', 'Applebot-Extended'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin/'] },
      { userAgent: AI_SEARCH_BOTS, allow: '/', disallow: ['/admin/'] },
      { userAgent: ['CCBot', 'Bytespider'], disallow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
