"use client";

import React from 'react';
import { PHARMA_BRANDS, COMPANY_INFO } from '@/data/companyData';
import { MessageCircle } from 'lucide-react';

interface BrandsGridProps {
  limit?: number;
  showHeader?: boolean;
}

const BADGE_STYLES = [
  { bg: 'bg-sky-50', text: 'text-secondary', hover: 'group-hover:bg-secondary' },
  { bg: 'bg-emerald-50', text: 'text-emerald-600', hover: 'group-hover:bg-emerald-600' },
  { bg: 'bg-amber-50', text: 'text-amber-600', hover: 'group-hover:bg-amber-600' },
  { bg: 'bg-purple-50', text: 'text-purple-600', hover: 'group-hover:bg-purple-600' },
  { bg: 'bg-rose-50', text: 'text-rose-600', hover: 'group-hover:bg-rose-600' },
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
          <div className="section-header">
            <span className="section-subtitle">AUTHORIZED PHARMA PARTNERS</span>
            <h2 className="section-title">Major Brands We Stock & Distribute</h2>
            <p className="section-desc">
              VS Medico maintains strong relationships with leading multinational & Indian pharmaceutical companies to ensure seamless supply chain availability for chemists and hospitals.
            </p>
          </div>
        )}

        <div className="brands-grid">
          {brands.map((brand, idx) => {
            const badge = BADGE_STYLES[idx % BADGE_STYLES.length];
            return (
              <div key={idx} className="brand-card group">
                <div className={`w-14 h-14 rounded-2xl ${badge.bg} ${badge.text} ${badge.hover} group-hover:text-white flex items-center justify-center mb-4 font-heading font-extrabold text-lg transition-colors`}>
                  {getInitials(brand.name)}
                </div>
                <div className="brand-logo-text">{brand.logoText}</div>
                <div className="text-xs text-slate-500 mb-3">{brand.category}</div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  {brand.highlight}
                </span>
              </div>
            );
          })}
        </div>

        <div className="mt-10 p-8 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-bold text-primary text-xl mb-1">Looking for a specific Pharma Manufacturer or Division?</h3>
            <p className="text-sm text-slate-600">We continuously expand our stockist portfolio. Get in touch with our procurement desk for specific brand requirements.</p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0 justify-center">
            {limit && (
              <a href="/brands" className="btn btn-outline">
                <span>View All Brands</span>
              </a>
            )}
            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsappRaw}?text=Hello%20VS%20Medico,%20I%20am%20looking%20for%20wholesale%20rates%20for%20specific%20pharma%20brands.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
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
