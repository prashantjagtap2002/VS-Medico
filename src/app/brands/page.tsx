"use client";

import React from 'react';
import BrandsGrid from '@/components/BrandsGrid';
import { COMPANY_INFO } from '@/data/companyData';
import { MessageCircle } from 'lucide-react';

export default function BrandsPage() {
  return (
    <div className="py-8">
      <div className="container">
        <div className="max-w-3xl mb-8">
          <span className="text-secondary font-bold text-sm tracking-wider uppercase">PARTNERED MANUFACTURERS</span>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-primary mt-1 mb-2">
            Pharma Companies & Brands We Stock
          </h1>
          <p className="text-slate-600 text-base">
            As an authorized stockist and wholesale distributor in Mumbai, VS Medico represents leading multinational and top Indian pharmaceutical manufacturers.
          </p>
        </div>

        <BrandsGrid />

        <div className="mt-12 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-heading font-bold text-2xl text-primary mb-2">Are you a Retail Chemist or Hospital Procurement Officer?</h3>
              <p className="text-sm text-slate-600">
                Contact our brand desk directly to receive monthly brand-specific PTR price charts, scheme discount sheets, and fast-moving stock updates.
              </p>
            </div>
            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsappRaw}?text=Hello%20VS%20Medico,%20please%20send%20the%20latest%20pharma%20brand-wise%20PTR%20discount%20scheme%20sheet.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp shrink-0"
            >
              <MessageCircle size={18} />
              <span>Get Brand Rate Sheets</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
