import { COMPANY_INFO, SITE_URL } from '@/data/companyData';

export const dynamic = 'force-static';

/** RFC 9116 security.txt: tells researchers how to report a vulnerability. */
export function GET() {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  const body = [
    `Contact: mailto:${COMPANY_INFO.contact.emailInfo}`,
    `Expires: ${expires.toISOString()}`,
    'Preferred-Languages: en, hi, mr',
    `Canonical: ${SITE_URL}/.well-known/security.txt`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
