"use client";

import React from 'react';
import { COMPANY_INFO } from '@/data/companyData';
import { ShieldCheck, Snowflake, Truck, Award } from 'lucide-react';

export default function TrustBar() {
  const highlights = [
    {
      icon: <ShieldCheck size={28} />,
      title: "FDA License Verified",
      subtitle: `Form 20B & 21B (${COMPANY_INFO.licenses.drugLicense20B})`
    },
    {
      icon: <Snowflake size={28} />,
      title: "WHO-GDP Cold Chain",
      subtitle: "2°C to 8°C Certified Storage & Transit"
    },
    {
      icon: <Truck size={28} />,
      title: "Same-Day MMR Express",
      subtitle: "Daily Dispatch across Mumbai & Thane"
    },
    {
      icon: <Award size={28} />,
      title: "100% Genuine Direct Supply",
      subtitle: "Authorized Stockist for 50+ Top Brands"
    }
  ];

  return (
    <section className="py-8 bg-white border-y border-slate-200">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-sky-200 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-secondary flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-primary text-sm leading-tight">{item.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
