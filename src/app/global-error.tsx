'use client'; // Replaces the root layout if it fails, so it must render its own <html>/<body>.

import { COMPANY_INFO } from '@/data/companyData';
import { telHref } from '@/lib/forms';

export default function GlobalError({ retry }: { error: Error & { digest?: string }; retry: () => void }) {
  return (
    <html lang="en-IN">
      <body style={{ fontFamily: 'system-ui, sans-serif', margin: 0, background: '#f8fafc', color: '#0f172a' }}>
        <main style={{ maxWidth: 520, margin: '15vh auto', padding: '0 1.25rem', textAlign: 'center' }}>
          <h1 style={{ color: '#0f3b66', fontSize: '1.75rem', marginBottom: '0.75rem' }}>Something went wrong</h1>
          <p style={{ color: '#475569', lineHeight: 1.6, marginBottom: '1.5rem' }}>
            The {COMPANY_INFO.legalName} website couldn&apos;t load. Please try again, or call our sales desk on{' '}
            <a href={telHref(COMPANY_INFO.contact.phoneSales)} style={{ color: '#0369a1', fontWeight: 600 }}>
              {COMPANY_INFO.contact.phoneSales}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={() => retry()}
            style={{ background: '#0f3b66', color: '#fff', border: 0, borderRadius: 12, padding: '0.85rem 1.6rem', fontWeight: 600, cursor: 'pointer' }}
          >
            Try Again
          </button>
        </main>
      </body>
    </html>
  );
}
