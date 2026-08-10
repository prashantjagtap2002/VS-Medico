"use client";

import React from 'react';
import { COMPETITIVE_EDGE, COMPANY_INFO } from '@/data/companyData';
import { ShieldCheck, Check, X, Building2, Zap } from 'lucide-react';

export default function CompetitiveAdvantage() {
  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 text-secondary font-bold text-xs uppercase tracking-widest bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-100 mb-3">
            <Zap size={14} className="text-secondary" />
            <span>THE VS MEDICO DISTRIBUTOR EDGE</span>
          </span>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-primary mb-3">
            Why Chemists & Hospitals Partner With VS Medico
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Rather than managing 50 separate vendor accounts with single-brand manufacturers or dealing with unverified traders, VS Medico provides a single-window supply chain for all major pharmaceutical brands.
          </p>
        </div>

        {/* Feature Cards Highlights */}
        <div className="grid-3 mb-12">
          <div className="p-7 bg-slate-50 rounded-3xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-secondary flex items-center justify-center mb-4">
                <Building2 size={24} />
              </div>
              <h3 className="font-bold text-primary text-xl mb-2">50+ Brands on 1 Invoice</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Streamline your pharmacy procurement. Source Sun Pharma, Cipla, Alkem, Lupin, Torrent, Abbott, Mankind, Sanofi, and GSK under one consolidated GST invoice.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/80 text-xs font-bold text-secondary">
              ✓ Single Account Setup
            </div>
          </div>

          <div className="p-7 bg-slate-50 rounded-3xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Zap size={24} />
              </div>
              <h3 className="font-bold text-primary text-xl mb-2">Hyper-Local MMR Speed</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Operating directly out of Sharad Industrial Estate, Bhandup West, we deliver same-day across Bhandup, Mulund, Thane, Powai, Ghatkopar, and MMR.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/80 text-xs font-bold text-emerald-700">
              ✓ Same-Day Express Runs
            </div>
          </div>

          <div className="p-7 bg-slate-50 rounded-3xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-primary text-xl mb-2">Factory-Direct Genuine</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                100% genuine formulations with full FDA 20B/21B compliance, batch expiry verification, and WHO-GDP cold room storage for sensitive biologics.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/80 text-xs font-bold text-purple-700">
              ✓ Counterfeit-Zero Guarantee
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h3 className="font-heading font-extrabold text-lg text-white">Wholesale Distributor vs. Direct Manufacturer Sourcing</h3>
              <p className="text-xs text-slate-400 mt-0.5">How VS Medico simplifies procurement for retail pharmacies and hospital buyers</p>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950 border border-emerald-800 px-3 py-1 rounded-full">
              B2B Stockist Advantage
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                <tr>
                  <th className="p-4">Key Criteria</th>
                  <th className="p-4 bg-sky-50 text-secondary border-x border-sky-100">VS Medico (Super Stockist)</th>
                  <th className="p-4 text-slate-500">Single-Brand Manufacturer</th>
                  <th className="p-4 text-slate-500">Unorganized Local Trader</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {COMPETITIVE_EDGE.map((item, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                    <td className="p-4 font-bold text-primary">{item.feature}</td>
                    <td className="p-4 bg-sky-50/70 border-x border-sky-100 font-bold text-sky-950 flex items-center gap-1.5">
                      <Check size={15} className="text-emerald-600 shrink-0" />
                      <span>{item.vsMedico}</span>
                    </td>
                    <td className="p-4 text-slate-600">
                      <span className="text-slate-400 mr-1.5">•</span>
                      {item.singleManufacturer}
                    </td>
                    <td className="p-4 text-slate-500">
                      <X size={14} className="text-rose-500 inline mr-1" />
                      {item.unorganizedTrader}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
