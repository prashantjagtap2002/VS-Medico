import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import ProductBrowser from '@/components/ProductBrowser';
import { CtaBand, SectionHead } from '@/components/PageSections';
import { PRODUCT_CATEGORIES } from '@/data/companyData';
import { getProducts } from '@/data/products';
import { THERAPEUTIC_SEGMENTS } from '@/data/siteContent';

export const metadata: Metadata = pageMetadata({
  title: 'Wholesale Pharma Product Catalog',
  description:
    'Wholesale catalogue of branded formulations, generics, injectables, cold-chain insulins, surgical & OTC products. Request net PTR quotes from VS Medico, Mumbai.',
  path: '/products',
});

// One colour per word in the header cloud, cycling.
const CLOUD_COLORS = ['#d97706', '#c62828', '#008080', '#1d4ed8', '#9333ea', '#0891b2', '#16a34a', '#be185d', '#b45309'];

export default function ProductsPage() {
  const products = getProducts();
  const categories = PRODUCT_CATEGORIES.filter((c) => c.id !== 'all');
  const cloud = [...categories.map((c) => c.name), ...THERAPEUTIC_SEGMENTS.slice(0, 9)];

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1 className="word-cloud">
            {cloud.map((word, i) => (
              <span key={word}>
                {i > 0 && (
                  <>
                    {' '}
                    <span className="sep" aria-hidden="true">
                      •
                    </span>{' '}
                  </>
                )}
                <span style={{ color: CLOUD_COLORS[i % CLOUD_COLORS.length] }}>{word}</span>
              </span>
            ))}
          </h1>
          <p>
            A complete wholesale range of branded formulations, generics, critical-care injectables, cold-chain
            biologics, OTC, surgical and Ayurvedic products, supplied to licensed chemists and hospitals.
          </p>
        </div>
      </section>

      <section className="section bg-alt">
        <div className="container grid-split items-start!">
          <div>
            <h2 className="heading-1 mb-4">
              <span className="accent-teal">Multi-Brand</span> <span className="accent">Pharma Portfolio</span>
            </h2>
            <p className="body-regular mb-6">
              One account gives you access to 5,000+ SKUs across every major category and therapy area, billed on a
              single consolidated invoice at net PTR rates.
            </p>
            <ul className="check-list grid-cols-1 sm:grid-cols-2 gap-x-6">
              {categories.map((c) => (
                <li key={c.id}>
                  <CheckCircle2 size={17} aria-hidden="true" />
                  {c.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="card border-2! border-orange-brand! shadow-sm">
            <h3 className="heading-2 text-teal-brand! mb-2">Complete Supply Lifecycle</h3>
            <p className="mb-4">Every order follows the same controlled path:</p>
            <ul className="grid gap-3 text-sm">
              <li>
                <strong>Sourcing:</strong> factory-direct from manufacturers or their authorised stockists
              </li>
              <li>
                <strong>Storage:</strong> WHO-GDP warehouse with dedicated 2°C – 8°C cold rooms
              </li>
              <li>
                <strong>Delivery:</strong> batch-documented invoices and same-day dispatch across the MMR
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <SectionHead title="Product Catalogue">
            Browse listed products by category. Open any product for details and to request wholesale rates.
          </SectionHead>
          <ProductBrowser products={products} />
        </div>
      </section>

      <CtaBand
        title="Can’t Find a Product?"
        text="Send us your list. Our team will confirm availability and net wholesale rates the same day."
        label="Request Wholesale Rates"
      />
    </>
  );
}
