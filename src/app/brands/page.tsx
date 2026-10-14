import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import BrandsGrid from '@/components/BrandsGrid';

export const metadata: Metadata = pageMetadata({
  title: 'Pharma Brands We Stock & Distribute',
  description:
    "Authorised distributor of Sun Pharma, Cipla, Alkem, Lupin, Zydus, Torrent, Abbott, Mankind, Dr. Reddy's, Sanofi, GSK & more for chemists across Mumbai MMR.",
  path: '/brands',
});

export default function BrandsPage() {
  return (
    <div className="py-12">
      <div className="container">
        <div className="max-w-3xl mb-8">
          <span className="text-secondary font-bold text-sm tracking-wider uppercase">PARTNERED MANUFACTURERS</span>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-primary mt-1 mb-2">
            Pharma Companies & Brands We Stock
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            As an authorized stockist and wholesale distributor in Mumbai, VS Medico represents leading multinational and top Indian pharmaceutical manufacturers.
          </p>
        </div>

        <BrandsGrid showHeader={false} />
      </div>
    </div>
  );
}
