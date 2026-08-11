"use client";

import React from 'react';
import { ShieldCheck, Snowflake, Truck, Award } from 'lucide-react';

export default function TrustBar() {
  const highlights = [
    {
      icon: <ShieldCheck size={24} />,
      title: "FDA License Verified",
      subtitle: "Form 20B & 21B — Maharashtra"
    },
    {
      icon: <Snowflake size={24} />,
      title: "WHO-GDP Cold Chain",
      subtitle: "2°C to 8°C Certified Storage & Transit"
    },
    {
      icon: <Truck size={24} />,
      title: "Same-Day MMR Express",
      subtitle: "Daily Dispatch across Mumbai & Thane"
    },
    {
      icon: <Award size={24} />,
      title: "100% Genuine Direct Supply",
      subtitle: "Authorized Stockist for 50+ Top Brands"
    }
  ];

  return (
    <section className="py-10 bg-slate-50/80 border-y border-slate-200/80">
      <div className="container">
        <div className="grid-4">
          {highlights.map((item, index) => (
            <div 
              key={index}
              className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-4 sm:p-5 text-center sm:text-left rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-sky-300 transition-all"
            >
              <div className="w-12 h-12 sm:w-11 sm:h-11 rounded-xl bg-sky-50 text-secondary flex items-center justify-center shrink-0 mb-1 sm:mb-0">
                {item.icon}
              </div>
              <div className="flex flex-col justify-center min-w-0">
                <h4 className="font-extrabold text-primary text-sm leading-snug">{item.title}</h4>
                <p className="text-xs text-slate-500 mt-1 sm:mt-0.5 leading-snug">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
