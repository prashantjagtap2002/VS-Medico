"use client";

import React from 'react';
import { COMPANY_INFO, TRUST_STATS, LEADERSHIP_TEAM } from '@/data/companyData';
import { useQuoteBasket } from '@/components/QuoteBasketContext';
import {
  ShieldCheck,
  Snowflake,
  Truck,
  CheckCircle2,
  FileText,
  MessageCircle,
  Building2,
  Activity
} from 'lucide-react';

export default function AboutPage() {
  const { setIsModalOpen, setIsLicenseModalOpen } = useQuoteBasket();

  return (
    <div className="py-16">
      <div className="container">
        {/* Header - Simple and Spacious */}
        <div className="max-w-3xl mb-16 text-center mx-auto">
          <span className="text-secondary font-bold text-sm tracking-wider uppercase mb-4 block">ABOUT VS MEDICO LLP</span>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl text-primary mb-6 leading-tight">
            Powering Mumbai's Healthcare Supply Chain Since 1998
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed max-w-2xl mx-auto">
            VS Medico LLP is a premier pharmaceutical wholesale distributor, super stockist, and authorized C&F partner based in Bhandup West, Mumbai.
          </p>
        </div>

        {/* Stats Grid - Using native grid-4 */}
        <div className="grid-4 mb-20">
          {TRUST_STATS.map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center flex flex-col justify-center min-h-[160px]">
              <div className="font-heading font-extrabold text-4xl text-primary mb-2">{stat.value}</div>
              <div className="font-bold text-slate-800 text-base mb-2">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.detail}</div>
            </div>
          ))}
        </div>

        {/* Detailed Story & Mission */}
        <div className="grid-2 items-stretch mb-24">
          <div className="flex flex-col gap-6 text-slate-600 leading-relaxed text-lg bg-white p-10 rounded-3xl border border-slate-200 shadow-sm">
            <div>
              <span className="text-secondary font-bold text-sm tracking-widest uppercase mb-2 block">Our Legacy</span>
              <h2 className="font-heading font-bold text-3xl text-primary mb-4">
                From Local Stockist to a Single-Window Hub
              </h2>
            </div>
            
            <p>
              Founded over 25 years ago in Mumbai, <strong>VS Medico LLP</strong> has grown from a local stockist into a major pharmaceutical distribution entity supplying over 1,200+ licensed retail pharmacies, multispecialty hospitals, and institutional buyers across the Mumbai Metropolitan Region (MMR).
            </p>
            
            <div className="flex items-start gap-4 mt-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="shrink-0 text-emerald-600 mt-1"><Building2 size={24} /></div>
              <div>
                <h4 className="font-bold text-slate-800 text-base mb-1">The Super-Stockist Advantage</h4>
                <p className="text-sm">Unlike single-brand manufacturers, we provide a single-window ordering system. Retailers get products across 50+ leading MNCs on one consolidated invoice.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <div className="shrink-0 text-secondary mt-1"><Activity size={24} /></div>
              <div>
                <h4 className="font-bold text-slate-800 text-base mb-1">Hyper-Local Logistics</h4>
                <p className="text-sm">Operating from Sharad Industrial Estate, Bhandup West, our fleet ensures same-day express runs across Bhandup, Mulund, Thane, Powai, and Ghatkopar.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8 bg-slate-900 p-10 rounded-3xl shadow-xl text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
              <ShieldCheck size={280} className="transform translate-x-1/4 -translate-y-1/4 text-white" />
            </div>
            
            <div className="relative z-10">
              <span className="text-sky-400 font-bold text-sm tracking-widest uppercase mb-2 block">Standards</span>
              <h3 className="font-heading font-bold text-3xl mb-8">Quality & Compliance First</h3>
              
              <div className="flex flex-col gap-8 text-base">
                <div className="flex items-start gap-4">
                  <CheckCircle2 size={24} className="text-emerald-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">Counterfeit-Zero Guarantee</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">Strict batch verification and direct factory-to-warehouse sourcing ensures 100% genuine products.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle2 size={24} className="text-sky-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">WHO-GDP Cold Chain Standard</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">24/7 digital thermal monitoring for insulin, vaccines, & critical care injectables.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <CheckCircle2 size={24} className="text-amber-400 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-white text-lg mb-1">Transparent B2B Billing</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">Accurate PTR/MRP invoice credit structures with full GST & HSN compliance.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-8 mt-auto border-t border-slate-700">
              <button
                onClick={() => setIsLicenseModalOpen(true)}
                className="btn btn-secondary w-full flex justify-center"
              >
                <ShieldCheck size={18} />
                <span>View Drug License Details</span>
              </button>
            </div>
          </div>
        </div>

        {/* Cold Chain & Logistics Infrastructure */}
        <section className="bg-slate-50 p-10 md:p-14 rounded-3xl border border-slate-200 mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest bg-emerald-100 px-4 py-2 rounded-full inline-block mb-4">
              INFRASTRUCTURE & LOGISTICS
            </span>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-primary mb-4">
              WHO-GDP Compliant Cold Chain
            </h2>
            <p className="text-slate-600 text-lg">
              We operate a state-of-the-art 10,000 sq. ft. warehousing facility in Bhandup West equipped with strict climate control systems.
            </p>
          </div>

          <div className="grid-3">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[220px]">
              <div className="w-14 h-14 rounded-xl bg-sky-100 text-secondary flex items-center justify-center mb-6">
                <Snowflake size={28} />
              </div>
              <h3 className="font-bold text-primary text-xl mb-3">2°C – 8°C Cold Storage</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Dedicated cold rooms with automatic back-up generators for insulins, vaccines, growth hormones, and biological serums.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[220px]">
              <div className="w-14 h-14 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
                <Truck size={28} />
              </div>
              <h3 className="font-bold text-primary text-xl mb-3">Insulated Express Fleet</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Temperature-monitored transit boxes ensuring cold chain continuity during delivery runs across Bhandup, Powai, Thane, and South Mumbai.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm min-h-[220px]">
              <div className="w-14 h-14 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-6">
                <ShieldCheck size={28} />
              </div>
              <h3 className="font-bold text-primary text-xl mb-3">FDA Licensing & Audit</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Full compliance with FDA Maharashtra Form 20B/21B regulations, regular stock audits, and batch expiry tracking.
              </p>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-secondary font-bold text-xs uppercase tracking-widest bg-sky-100 px-4 py-2 rounded-full inline-block mb-4">
              LEADERSHIP TEAM
            </span>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-primary mb-4">
              The People Behind VS Medico
            </h2>
            <p className="text-slate-600 text-lg">
              A team of pharma distribution veterans managing sourcing, cold chain, compliance, and B2B accounts.
            </p>
          </div>

          <div className="grid-4">
            {LEADERSHIP_TEAM.map((member, idx) => (
              <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm text-center flex flex-col justify-start h-full">
                <div className="w-20 h-20 mx-auto rounded-full bg-slate-100 border-2 border-white shadow-md text-primary flex items-center justify-center text-2xl font-bold font-heading mb-6">
                  {member.initials}
                </div>
                <h3 className="font-bold text-primary text-lg mb-1">{member.name}</h3>
                <div className="text-xs font-bold text-secondary tracking-widest uppercase mb-4">{member.role}</div>
                <p className="text-sm text-slate-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-slate-900 p-12 rounded-3xl shadow-xl max-w-4xl mx-auto mb-12 text-white">
          <h3 className="font-heading font-bold text-3xl md:text-4xl mb-4">Partner with VS Medico Today</h3>
          <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
            Register your chemist shop or hospital procurement account with VS Medico to unlock structured wholesale pricing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button onClick={() => setIsModalOpen(true)} className="btn bg-white text-slate-900 hover:bg-slate-100 border-none font-bold">
              <FileText size={18} />
              <span>Submit Account Request</span>
            </button>
            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp border-none font-bold"
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
