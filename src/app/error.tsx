'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, MessageCircle } from 'lucide-react';
import { whatsappLink } from '@/lib/forms';

export default function Error({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="section">
      <div className="container">
        <div className="max-w-xl mx-auto text-center">
          <div className="icon-box w-16! h-16! mx-auto mb-6">
            <AlertTriangle size={32} aria-hidden="true" />
          </div>
          <h1 className="hero-large mb-3">Something went wrong</h1>
          <p className="body-regular mb-8">
            This part of the page failed to load. Please try again, or contact our sales desk directly — we&apos;re
            happy to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button type="button" onClick={() => retry()} className="btn btn-primary justify-center">
              <RotateCcw size={18} aria-hidden="true" />
              <span>Try Again</span>
            </button>
            <a
              href={whatsappLink('Hello VS Medico, I had trouble using your website.')}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp justify-center"
            >
              <MessageCircle size={18} aria-hidden="true" />
              <span>WhatsApp Sales Desk</span>
            </a>
            <Link href="/" className="btn btn-outline justify-center">
              Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
