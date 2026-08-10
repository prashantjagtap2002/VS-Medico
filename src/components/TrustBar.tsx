"use client";

import React from 'react';
import { COMPANY_INFO } from '@/data/companyData';
import { ShieldCheck, Snowflake, Truck, Award } from 'lucide-react';

export default function TrustBar() {
  const highlights = [
    {
      icon: <ShieldCheck size={26} />,
      title: "FDA License Verified",
      subtitle: `Form 20B & 21B (${COMPANY_INFO.licenses.drugLicense20B})`
    },
    {
      icon: <Snowflake size={26} />,
      title: "WHO-GDP Cold Chain",
      subtitle: "2°C to 8°C Certified Storage & Transit"
    },
    {
      icon: <Truck size={26} />,
      title: "Same-Day MMR Express",
      subtitle: "Daily Dispatch across Mumbai & Thane"
    },
    {
      icon: <Award size={26} />,
      title: "100% Genuine Direct Supply",
      subtitle: "Authorized Stockist for 50+ Top Brands"
    }
  ];

  return (
    <section className="py-10 bg-slate-50/80 border-y border-slate-200/80">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {highlights.map((item, index) => (
            <div 
              key={index}
              className="flex flex-row items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-sky-300 transition-all h-full"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-secondary flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <h4 className="font-extrabold text-primary text-sm leading-snug">{item.title}</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
