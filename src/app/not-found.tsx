import type { Metadata } from 'next';
import Link from 'next/link';
import { SearchX, ArrowLeft, Pill, Phone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-sky-50 text-secondary flex items-center justify-center mx-auto mb-6">
            <SearchX size={32} aria-hidden="true" />
          </div>
          <p className="text-secondary font-bold text-sm tracking-widest uppercase mb-2">Error 404</p>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-primary mb-3">
            We couldn&apos;t find that page
          </h1>
          <p className="text-slate-600 mb-8">
            The page may have moved or the product may no longer be listed. Try the catalogue, or contact our sales desk
            for any item from our 5,000+ SKU range.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/" className="btn btn-outline justify-center">
              <ArrowLeft size={18} aria-hidden="true" />
              <span>Back to Home</span>
            </Link>
            <Link href="/products" className="btn btn-primary justify-center">
              <Pill size={18} aria-hidden="true" />
              <span>Browse Products</span>
            </Link>
            <Link href="/contact" className="btn btn-secondary justify-center">
              <Phone size={18} aria-hidden="true" />
              <span>Contact Sales</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
