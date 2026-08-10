"use client";

import React from 'react';
import { PHARMA_BRANDS, COMPANY_INFO } from '@/data/companyData';
import { Building2, MessageCircle } from 'lucide-react';

export default function BrandsGrid() {
  return (
    <section className="py-14 bg-slate-50 border-t border-slate-200">
      <div className="container">
        <div className="section-header">
          <span className="section-subtitle">AUTHORIZED PHARMA PARTNERS</span>
          <h2 className="section-title">Major Brands We Stock & Distribute</h2>
          <p className="section-desc">
            VS Medico maintains strong relationships with leading multinational & Indian pharmaceutical companies to ensure seamless supply chain availability for chemists and hospitals.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
          {PHARMA_BRANDS.map((brand, idx) => (
            <div key={idx} className="brand-card group h-full">
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-secondary group-hover:bg-primary group-hover:text-white flex items-center justify-center mb-3 transition-colors">
                <Building2 size={24} />
              </div>
              <div className="brand-logo-text">{brand.logoText}</div>
              <div className="brand-category mb-2 font-semibold text-slate-700">{brand.name}</div>
              <div className="text-[11px] text-slate-500 line-clamp-1 mb-3">{brand.category}</div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                {brand.highlight}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-primary text-lg">Looking for a specific Pharma Manufacturer or Division?</h3>
            <p className="text-sm text-slate-600">We continuously expand our stockist portfolio. Get in touch with our procurement desk for specific brand requirements.</p>
          </div>
          <a
            href={`https://wa.me/${COMPANY_INFO.contact.whatsappRaw}?text=Hello%20VS%20Medico,%20I%20am%20looking%20for%20wholesale%20rates%20for%20specific%20pharma%20brands.`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp shrink-0"
          >
            <MessageCircle size={18} />
            <span>Inquire Brand Rates</span>
          </a>
        </div>
      </div>
    </section>
  );
}
