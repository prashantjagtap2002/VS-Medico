/**
 * Content Security Policy for the public pages (delivered as a <meta> tag so it
 * works on any static host). It allow-lists exactly what the site uses:
 *   - scripts/styles from this site (Next.js inlines its bootstrap code, hence 'unsafe-inline')
 *   - form submissions to Web3Forms
 *   - the Google Maps embed on /contact
 * Anything else (e.g. an injected third-party script) is blocked by the browser.
 * `frame-ancestors` cannot be set in a meta tag, so clickjacking protection is
 * sent as an HTTP header instead (see public/_headers and vercel.json).
 * The /admin page is a separate HTML file and is not affected.
 */
export const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self'",
  "connect-src 'self' https://api.web3forms.com",
  'frame-src https://www.google.com https://maps.google.com',
  "media-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "manifest-src 'self'",
  "worker-src 'self'",
].join('; ');

/** Serialises JSON-LD safely: escapes `<` so CMS-edited text can never close the <script> tag. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, '\u003c') };
}
