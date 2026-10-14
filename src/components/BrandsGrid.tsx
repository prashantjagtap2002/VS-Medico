import Link from 'next/link';
import { PHARMA_BRANDS } from '@/data/companyData';
import { whatsappLink } from '@/lib/forms';
import Reveal from './Reveal';
import { MessageCircle } from 'lucide-react';

interface BrandsGridProps {
  limit?: number;
  showHeader?: boolean;
}

const BADGE_STYLES = [
  { bg: 'bg-sky-50', text: 'text-secondary', hover: 'group-hover:bg-secondary' },
  { bg: 'bg-emerald-50', text: 'text-emerald-700', hover: 'group-hover:bg-emerald-700' },
  { bg: 'bg-amber-50', text: 'text-amber-700', hover: 'group-hover:bg-amber-700' },
  { bg: 'bg-purple-50', text: 'text-purple-700', hover: 'group-hover:bg-purple-700' },
  { bg: 'bg-rose-50', text: 'text-rose-700', hover: 'group-hover:bg-rose-700' },
];

function getInitials(name: string) {
  const parts = name.replace(/[^a-zA-Z\s]/g, '').trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export default function BrandsGrid({ limit, showHeader = true }: BrandsGridProps) {
  const brands = limit ? PHARMA_BRANDS.slice(0, limit) : PHARMA_BRANDS;

  return (
    <section className={showHeader ? "py-16 bg-slate-50 border-t border-slate-200" : "pb-12"}>
      <div className={showHeader ? "container" : ""}>
        {showHeader && (
          <Reveal className="section-header">
            <span className="section-subtitle">AUTHORIZED PHARMA PARTNERS</span>
            <h2 className="section-title">Major Brands We Stock & Distribute</h2>
            <p className="section-desc">
              VS Medico maintains strong relationships with leading multinational & Indian pharmaceutical companies to ensure seamless supply chain availability for chemists and hospitals.
            </p>
          </Reveal>
        )}

        <div className="brands-grid">
          {brands.map((brand, idx) => {
            const badge = BADGE_STYLES[idx % BADGE_STYLES.length];
            return (
              <Reveal key={brand.name} className="brand-card group" variant="scale" delay={(idx % 5) * 60}>
                <div className={`w-14 h-14 rounded-2xl ${badge.bg} ${badge.text} ${badge.hover} group-hover:text-white flex items-center justify-center mb-4 font-heading font-extrabold text-lg transition-colors`}>
                  {getInitials(brand.name)}
                </div>
                <p className="brand-logo-text">{brand.logoText}</p>
                <div className="text-xs text-slate-500 mb-3">{brand.category}</div>
                <span className="text-[10px] sm:text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1.5 rounded-xl border border-emerald-100 inline-block leading-tight text-center">
                  {brand.highlight}
                </span>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-10 p-8 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-bold text-primary text-xl mb-1">Looking for a specific Pharma Manufacturer or Division?</h2>
            <p className="text-sm text-slate-600">We continuously expand our stockist portfolio. Get in touch with our procurement desk for specific brand requirements.</p>
          </div>
          <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 shrink-0 justify-center mt-2 md:mt-0">
            {limit && (
              <Link href="/brands" className="btn btn-outline w-full sm:w-auto justify-center">
                <span>View All Brands</span>
              </Link>
            )}
            <a
              href={whatsappLink("Hello VS Medico, I'm looking for rates/availability for a specific brand.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full sm:w-auto justify-center"
            >
              <MessageCircle size={18} />
              <span>Inquire Brand Rates</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
