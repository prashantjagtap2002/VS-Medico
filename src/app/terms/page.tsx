import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { COMPANY_INFO } from '@/data/companyData';

export const metadata: Metadata = pageMetadata({
  title: 'Terms of Use',
  description:
    'Terms for using the VS Medico LLP website: B2B-only supply to licensed buyers, product information disclaimer, pricing and liability.',
  path: '/terms',
});

const LAST_UPDATED = '14 October 2026';

export default function TermsPage() {
  const { contact, legalName, address } = COMPANY_INFO;
  return (
    <div className="section-sm">
      <div className="container">
        <article className="legal-prose">
          <p className="eyebrow">Legal</p>
          <h1>Terms of Use</h1>
          <p className="legal-meta">Last updated: {LAST_UPDATED}</p>

          <p>
            These terms apply to your use of this website, operated by {legalName}. By using the website you agree to
            them.
          </p>

          <h2>1. Trade buyers only</h2>
          <p>
            We supply medicines only to licensed retail chemists, hospitals, nursing homes, clinics and distributors
            holding valid drug licences (Form 20B/21B or equivalent) and GST registration. We do not sell to individual
            consumers. Supply of Schedule H, H1 and other prescription drugs is subject to the Drugs and Cosmetics Act,
            1940 and its Rules.
          </p>

          <h2>2. Not medical advice</h2>
          <p>
            Product information on this website (composition, pack size, storage, description) is provided for licensed
            trade buyers and healthcare professionals for reference only. It is not medical advice and must not be used
            for self-medication. Always follow the manufacturer&apos;s prescribing information.
          </p>

          <h2>3. Prices, stock and quotations</h2>
          <p>
            MRPs shown are as printed by manufacturers and may change between batches. Wholesale (PTR) rates, schemes,
            stock availability and delivery times are confirmed only in a written quotation or invoice from us.
            Submitting an inquiry does not create an order or contract until we confirm it. The margin calculator gives
            estimates only.
          </p>

          <h2>4. Trademarks</h2>
          <p>
            Brand names, product names and logos belong to their respective manufacturers and are used only to identify
            the products we distribute. Their use does not imply endorsement.
          </p>

          <h2>5. Acceptable use</h2>
          <p>
            Do not misuse the website: no false information in forms, automated scraping, attempts to break its
            security, or use that interferes with other visitors.
          </p>

          <h2>6. Liability</h2>
          <p>
            We take care to keep information accurate but provide the website &quot;as is&quot;. To the extent
            permitted by law, we are not liable for loss arising from reliance on website content. Supply of goods is
            governed by our invoices and trade terms.
          </p>

          <h2>7. Governing law</h2>
          <p>These terms are governed by the laws of India. Courts in Mumbai, Maharashtra have exclusive jurisdiction.</p>

          <h2>8. Contact</h2>
          <p>
            {legalName}, {address.fullAddress}. Email <a href={`mailto:${contact.emailInfo}`}>{contact.emailInfo}</a>.
            See also our <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </article>
      </div>
    </div>
  );
}
