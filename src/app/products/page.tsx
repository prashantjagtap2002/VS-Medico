import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import ProductCatalog from '@/components/ProductCatalog';
import ExpressReorderBar from '@/components/ExpressReorderBar';
import MarginCalculator from '@/components/MarginCalculator';
import { getProducts, getFeaturedProducts } from '@/data/products';

export const metadata: Metadata = pageMetadata({
  title: 'Wholesale Pharma Product Catalog',
  description:
    'Wholesale catalogue of branded formulations, generics, injectables, cold-chain insulins, surgical & OTC products. Request net PTR quotes from VS Medico, Mumbai.',
  path: '/products',
});

export default function ProductsPage() {
  const products = getProducts();

  return (
    <div className="py-8">
      <div className="container">
        <div className="max-w-3xl mb-4">
          <span className="text-secondary font-bold text-sm tracking-wider uppercase">INVENTORY & STOCKIST CATALOG</span>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-primary mt-1 mb-2">
            Pharmaceutical Product Catalog
          </h1>
          <p className="text-slate-600 text-base">
            Search active stock across branded formulations, generic medicines, critical care injectables, cold-chain vaccines, and surgical items. Select products to request wholesale rate quotes.
          </p>
        </div>

        <ExpressReorderBar products={getFeaturedProducts(4)} />
      </div>

      <ProductCatalog products={products} showTitle={false} />

      <div className="container my-12">
        <MarginCalculator />
      </div>
    </div>
  );
}
