"use client";

import React from 'react';
import { COMPANY_INFO, TRUST_STATS } from '@/data/companyData';
import { useQuoteBasket } from '@/components/QuoteBasketContext';
import { 
  ShieldCheck, 
  Snowflake, 
  Truck, 
  CheckCircle2,
  FileText,
  MessageCircle
} from 'lucide-react';

export default function AboutPage() {
  const { setIsModalOpen, setIsLicenseModalOpen } = useQuoteBasket();

  return (
    <div className="py-16">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-secondary font-bold text-sm tracking-wider uppercase">ABOUT VS MEDICO LLP</span>
          <h1 className="font-heading font-extrabold text-4xl text-primary mt-2 mb-4">
            Powering Mumbai's Healthcare Supply Chain Since 1998
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            VS Medico LLP is a premier pharmaceutical wholesale distributor, super stockist, and authorized C&F partner based in Bhandup West, Mumbai, Maharashtra.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid-4 mb-16">
          {TRUST_STATS.map((stat, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
              <div className="font-heading font-extrabold text-3xl text-primary mb-1">{stat.value}</div>
              <div className="font-bold text-slate-800 text-sm mb-1">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.detail}</div>
            </div>
          ))}
        </div>

        {/* Detailed Story & Mission */}
        <div className="grid-2 items-center mb-16">
          <div className="flex flex-col gap-4 text-slate-600 leading-relaxed">
            <h2 className="font-heading font-bold text-2xl text-primary">
              Our Legacy & Wholesale Footprint
            </h2>
            <p>
              Founded over 25 years ago in Mumbai, <strong>VS Medico LLP</strong> has grown from a local stockist into a major pharmaceutical distribution entity supplying over 1,200+ licensed retail pharmacies, multispecialty hospitals, nursing homes, and institutional buyers across the Mumbai Metropolitan Region (MMR).
            </p>
            <p>
              Operating from our central facility at <strong>Sharad Industrial Estate, Bhandup West</strong>, we maintain a robust stock inventory of over 5,000+ active pharmaceutical SKUs. Our portfolio encompasses branded formulations, quality trade generics, critical care injectables, surgical disposables, and cold-chain biologics.
            </p>
            <p>
              We partner directly with leading global and Indian pharmaceutical companies—including Sun Pharma, Cipla, Alkem, Lupin, Zydus, Torrent, Abbott, and Mankind—ensuring 100% genuine products directly traceable to the manufacturer.
            </p>
          </div>

          <div className="dark-card flex flex-col gap-6">
            <h3 className="dark-card-title">Company Mission & Quality Commitment</h3>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-base">Counterfeit-Zero Genuine Guarantee</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Strict batch verification and direct factory-to-warehouse sourcing.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-base">WHO-GDP Cold Chain Standard</h4>
                  <p className="text-xs text-slate-300 mt-0.5">24/7 digital thermal monitoring for insulin, vaccines, & critical care injectables.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 size={20} className="text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-white text-base">Transparent B2B Billing</h4>
                  <p className="text-xs text-slate-300 mt-0.5">Accurate PTR/MRP invoice credit structures with full GST & HSN compliance.</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-700 flex items-center justify-between">
              <button
                onClick={() => setIsLicenseModalOpen(true)}
                className="btn btn-secondary btn-sm"
              >
                <ShieldCheck size={16} />
                <span>View Drug License Details</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cold Chain & Logistics Infrastructure */}
        <section className="bg-slate-50 p-8 md:p-12 rounded-3xl border border-slate-200 mb-16">
          <div className="max-w-3xl mb-8">
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
              INFRASTRUCTURE & LOGISTICS
            </span>
            <h2 className="font-heading font-extrabold text-3xl text-primary mt-3">
              WHO-GDP Compliant Warehouse & Temperature Control
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
              We operate a state-of-the-art 10,000 sq. ft. warehousing facility in Bhandup West equipped with strict climate control systems.
            </p>
          </div>

          <div className="grid-3">
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-secondary flex items-center justify-center mb-4">
                <Snowflake size={26} />
              </div>
              <h3 className="font-bold text-primary text-lg mb-2">2°C – 8°C Cold Storage</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dedicated cold rooms with automatic back-up generators for insulins, vaccines, growth hormones, and biological serums.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Truck size={26} />
              </div>
              <h3 className="font-bold text-primary text-lg mb-2">Insulated Express Fleet</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Temperature-monitored transit boxes ensuring cold chain continuity during delivery runs across Bhandup, Powai, Thane, and South Mumbai.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <ShieldCheck size={26} />
              </div>
              <h3 className="font-bold text-primary text-lg mb-2">FDA Licensing & Audit</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Full compliance with FDA Maharashtra Form 20B/21B regulations, regular stock audits, and batch expiry tracking.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-3xl mx-auto">
          <h3 className="font-heading font-bold text-2xl text-primary mb-2">Partner with VS Medico Today</h3>
          <p className="text-slate-600 text-sm mb-6">
            Register your chemist shop or hospital procurement account with VS Medico to unlock structured wholesale pricing.
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">
              <FileText size={18} />
              <span>Submit Account Request</span>
            </button>
            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <MessageCircle size={18} />
              <span>WhatsApp Direct Desk</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
