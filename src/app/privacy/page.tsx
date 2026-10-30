import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '@/lib/seo';
import { COMPANY_INFO } from '@/data/companyData';

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description:
    'How VS Medico LLP collects, uses and protects personal data submitted through its website, in line with the Digital Personal Data Protection Act, 2023.',
  path: '/privacy',
});

const LAST_UPDATED = '14 October 2026';

export default function PrivacyPage() {
  const { contact, address, legalName } = COMPANY_INFO;
  return (
    <div className="section-sm">
      <div className="container">
        <article className="legal-prose">
          <p className="eyebrow">Legal</p>
          <h1>Privacy Policy</h1>
          <p className="legal-meta">Last updated: {LAST_UPDATED}</p>

          <p>
            {legalName} (&quot;VS Medico&quot;, &quot;we&quot;) respects your privacy. This policy explains what personal
            data we collect through this website, why, and the choices you have. It is written to meet the Digital
            Personal Data Protection Act, 2023 (&quot;DPDP Act&quot;) and the DPDP Rules, 2025.
          </p>

          <h2>1. Who we are</h2>
          <p>
            {legalName} is a business-to-business pharmaceutical wholesale distributor located at {address.fullAddress}.
            We are the Data Fiduciary for personal data submitted on this website.
          </p>

          <h2>2. What we collect</h2>
          <p>We only collect what you choose to give us through our forms:</p>
          <ul>
            <li>
              <strong>Contact &amp; quote forms:</strong> name, pharmacy/hospital name, phone number, email address, area,
              requested products and quantities, and your message.
            </li>
            <li>
              <strong>Wholesale account application:</strong> the above plus business type, drug licence numbers (Form
              20B/21B), GSTIN, delivery address and PIN code, purchase preferences and preferred contact method.
            </li>
          </ul>
          <p>
            We do not use advertising or tracking cookies. Your inquiry basket is saved only in your own browser (local
            storage) so it survives a page refresh; it is never sent to us until you submit a form.
          </p>

          <h2>3. Why we use it</h2>
          <ul>
            <li>To respond to your inquiry and send wholesale rates, stock availability and quotations.</li>
            <li>
              To verify your drug licence and GST registration before opening a wholesale account, as required by the
              Drugs and Cosmetics Act, 1940.
            </li>
            <li>To contact you about your order, delivery or account.</li>
          </ul>
          <p>We do not sell your personal data or use it for unrelated marketing.</p>

          <h2>4. Consent</h2>
          <p>
            By submitting a form you consent to us processing the data above for these purposes. You can withdraw consent
            at any time by emailing us (see section 9); this does not affect processing already carried out.
          </p>

          <h2>5. Who we share it with</h2>
          <ul>
            <li>
              <strong>Web3Forms</strong>, which delivers website form submissions to our email inbox.
            </li>
            <li>
              <strong>WhatsApp (Meta)</strong>, only if you choose to send your inquiry via WhatsApp.
            </li>
            <li>
              <strong>Google Maps</strong>, which displays the map on our contact page and may set its own cookies when
              it loads.
            </li>
            <li>Government or regulatory authorities where required by law.</li>
          </ul>

          <h2>6. How long we keep it</h2>
          <p>
            Inquiries are kept for up to 24 months after our last interaction. Account and invoicing records are kept for
            as long as the law requires (for example, GST and drug-licence record-keeping rules), and then deleted.
          </p>

          <h2>7. Security</h2>
          <p>
            The website is served only over encrypted HTTPS, and form data is transmitted encrypted. Access to inquiries
            is limited to staff who need it. If a personal data breach affects you, we will notify you and the Data
            Protection Board of India as required by law.
          </p>

          <h2>8. Your rights</h2>
          <p>Under the DPDP Act you may:</p>
          <ul>
            <li>ask for a summary of the personal data we hold about you and how it is used;</li>
            <li>ask us to correct, complete, update or erase your data;</li>
            <li>withdraw consent;</li>
            <li>nominate another person to exercise these rights on your behalf; and</li>
            <li>raise a grievance with us and, if unresolved, with the Data Protection Board of India.</li>
          </ul>

          <h2>9. Contact &amp; grievances</h2>
          <p>
            Email <a href={`mailto:${contact.emailInfo}`}>{contact.emailInfo}</a> with the subject &quot;Privacy
            request&quot;, or write to us at {address.fullAddress}. We will respond within the period required by law.
          </p>

          <h2>10. Changes</h2>
          <p>
            We may update this policy; the &quot;Last updated&quot; date above shows the current version. See also our{' '}
            <Link href="/terms">Terms of Use</Link>.
          </p>
        </article>
      </div>
    </div>
  );
}
