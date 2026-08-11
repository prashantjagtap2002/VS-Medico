"use client";

import React from 'react';
import Image from 'next/image';
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
  Activity,
  Sparkles
} from 'lucide-react';

export default function AboutPage() {
  const { setIsModalOpen, setIsLicenseModalOpen } = useQuoteBasket();

  return (
    <div>
      {/* Hero */}
      <section
        className="relative overflow-hidden pt-20 pb-16 md:pt-24 md:pb-20"
        style={{
          background:
            'radial-gradient(circle at 85% 15%, rgba(2, 132, 199, 0.07) 0%, transparent 45%), radial-gradient(circle at 10% 85%, rgba(5, 150, 105, 0.05) 0%, transparent 40%), linear-gradient(180deg, #ffffff 0%, var(--bg-main) 100%)',
        }}
      >
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="hero-tag">
              <Sparkles size={16} className="text-secondary" />
              <span>Est. {COMPANY_INFO.establishedYear} · {COMPANY_INFO.yearsOfExcellence} Years of Wholesale Excellence</span>
            </div>

            <h1 className="hero-title text-center">
              Powering Mumbai&apos;s <span>Healthcare Supply Chain</span> Since 1998
            </h1>

            <p className="hero-lead mx-auto text-center">
              VS Medico LLP is a premier pharmaceutical wholesale distributor, super stockist, and authorized C&amp;F partner based in Bhandup West, Mumbai.
            </p>
          </div>

          <div className="mt-14 max-w-5xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-sm grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-100 overflow-hidden">
            {TRUST_STATS.map((stat, idx) => (
              <div key={idx} className="p-6 md:p-8 text-center">
                <div className="font-heading font-extrabold text-3xl md:text-4xl text-primary mb-1.5">{stat.value}</div>
                <div className="font-bold text-slate-800 text-sm mb-1">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story & Compliance */}
      <section className="py-20 md:py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            {/* Our Legacy */}
            <div className="bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
              <span className="text-secondary font-bold text-sm tracking-widest uppercase mb-2 block">Our Legacy</span>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-primary mb-5 leading-tight">
                From Local Stockist to a Single-Window Hub
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Founded over 25 years ago in Mumbai, <strong className="text-slate-800">VS Medico LLP</strong> has grown from a local stockist into a major pharmaceutical distribution entity supplying over 1,200+ licensed retail pharmacies, multispecialty hospitals, and institutional buyers across the Mumbai Metropolitan Region (MMR).
              </p>

              <div className="flex flex-col divide-y divide-slate-100 border-t border-slate-100 mt-auto pt-1">
                <div className="flex items-start gap-4 py-5">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">The Super-Stockist Advantage</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Single-window ordering across 50+ leading MNCs on one consolidated invoice.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 py-5">
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-sky-50 text-secondary flex items-center justify-center">
                    <Activity size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">Hyper-Local Logistics</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">Same-day express runs from Bhandup West across Mulund, Thane, Powai &amp; Ghatkopar.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quality & Compliance */}
            <div className="bg-slate-900 p-8 md:p-10 rounded-3xl shadow-xl text-white relative overflow-hidden flex flex-col">
              <ShieldCheck size={240} className="absolute -top-10 -right-10 text-white/[0.04] pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <span className="text-sky-400 font-bold text-sm tracking-widest uppercase mb-2 block">Standards</span>
                <h3 className="font-heading font-bold text-2xl md:text-3xl mb-6">Quality &amp; Compliance First</h3>

                <div className="flex flex-col divide-y divide-white/10">
                  <div className="flex items-start gap-4 py-5">
                    <CheckCircle2 size={20} className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white text-sm mb-1">Counterfeit-Zero Guarantee</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">Strict batch verification and direct factory-to-warehouse sourcing ensures 100% genuine products.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 py-5">
                    <CheckCircle2 size={20} className="text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white text-sm mb-1">WHO-GDP Cold Chain Standard</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">24/7 digital thermal monitoring for insulin, vaccines &amp; critical care injectables.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 py-5">
                    <CheckCircle2 size={20} className="text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-white text-sm mb-1">Transparent B2B Billing</h4>
                      <p className="text-sm text-slate-400 leading-relaxed">Accurate PTR/MRP invoice credit structures with full GST &amp; HSN compliance.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-auto border-t border-white/10">
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
          </div>
        </div>
      </section>

      {/* Cold Chain & Logistics Infrastructure */}
      <section className="py-20 md:py-24 bg-slate-50 border-y border-slate-200">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Infrastructure &amp; Logistics</span>
            <h2 className="section-title">WHO-GDP Compliant Cold Chain</h2>
            <p className="section-desc">
              We operate a state-of-the-art 10,000 sq. ft. warehousing facility in Bhandup West equipped with strict climate control systems.
            </p>
          </div>

          <div className="grid-3">
            <div className="feature-card">
              <div className="feature-icon">
                <Snowflake size={28} />
              </div>
              <h3>2°C – 8°C Cold Storage</h3>
              <p>Dedicated cold rooms with automatic back-up generators for insulins, vaccines, growth hormones, and biological serums.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" style={{ background: 'var(--accent-green-light)', color: 'var(--accent-green-dark)' }}>
                <Truck size={28} />
              </div>
              <h3>Insulated Express Fleet</h3>
              <p>Temperature-monitored transit boxes ensuring cold chain continuity during delivery runs across Bhandup, Powai, Thane, and South Mumbai.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon" style={{ background: '#f3e8ff', color: '#7e22ce' }}>
                <ShieldCheck size={28} />
              </div>
              <h3>FDA Licensing &amp; Audit</h3>
              <p>Full compliance with FDA Maharashtra Form 20B/21B regulations, regular stock audits, and batch expiry tracking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline & Leadership Team */}
      <section className="py-20 md:py-24 bg-slate-50 border-t border-slate-200 relative">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Our Journey & Leadership</span>
            <h2 className="section-title">The People Behind VS Medico</h2>
            <p className="section-desc">
              From our humble beginnings to becoming Mumbai's premier pharmaceutical super-stockist.
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto mt-16">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-slate-200 transform md:-translate-x-1/2 rounded-full hidden md:block"></div>

            {/* Node 1: Founder */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-20 relative">
              <div className="w-full md:w-1/2 md:pr-12 text-left md:text-right">
                <div className="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-3 uppercase tracking-widest">1998 - Foundation</div>
                <h3 className="font-heading font-extrabold text-3xl text-primary mb-2">V. S. Sharma</h3>
                <h4 className="text-sm font-bold text-secondary tracking-widest uppercase mb-4">Founder & Managing Partner</h4>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Founded VS Medico in 1998 with a vision to streamline pharmaceutical distribution. Under his leadership, the company has grown into a 5,000+ SKU wholesale distribution house serving the entire MMR.
                </p>
              </div>
              <div className="absolute left-4 md:left-1/2 w-5 h-5 bg-secondary rounded-full transform -translate-x-1/2 border-4 border-white shadow-lg hidden md:block z-10"></div>
              <div className="w-full md:w-1/2 md:pl-12">
                <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  <Image src="/images/founder.jpg" alt="V. S. Sharma - Founder" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Node 2: Operations */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 mb-20 relative">
              <div className="w-full md:w-1/2 md:pl-12 text-left">
                <div className="inline-block px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full mb-3 uppercase tracking-widest">Growth & Infrastructure</div>
                <h3 className="font-heading font-extrabold text-3xl text-primary mb-2">Rohan Sharma</h3>
                <h4 className="text-sm font-bold text-secondary tracking-widest uppercase mb-4">Director – Operations & Logistics</h4>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Oversees the state-of-the-art Bhandup warehouse and cold-chain fleet. He spearheaded our modern logistics expansion, ensuring same-day dispatch operations across Mumbai & Thane.
                </p>
              </div>
              <div className="absolute left-4 md:left-1/2 w-5 h-5 bg-emerald-500 rounded-full transform -translate-x-1/2 border-4 border-white shadow-lg hidden md:block z-10"></div>
              <div className="w-full md:w-1/2 md:pr-12">
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  <Image src="/images/warehouse.jpg" alt="VS Medico Logistics Warehouse" fill className="object-cover" />
                </div>
              </div>
            </div>

            {/* Node 3: Quality */}
            <div className="flex flex-col md:flex-row items-center gap-8 mb-20 relative">
              <div className="w-full md:w-1/2 md:pr-12 text-left md:text-right">
                <div className="inline-block px-3 py-1 bg-sky-500 text-white text-xs font-bold rounded-full mb-3 uppercase tracking-widest">Quality & Compliance</div>
                <h3 className="font-heading font-extrabold text-3xl text-primary mb-2">Anita Deshmukh</h3>
                <h4 className="text-sm font-bold text-secondary tracking-widest uppercase mb-4">Head – Quality & Regulatory Compliance</h4>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Manages FDA licensing, strict batch audit trails, and strict adherence to WHO-GDP cold chain protocols. She ensures that every product delivered is 100% genuine and safe.
                </p>
              </div>
              <div className="absolute left-4 md:left-1/2 w-5 h-5 bg-sky-500 rounded-full transform -translate-x-1/2 border-4 border-white shadow-lg hidden md:block z-10"></div>
              <div className="w-full md:w-1/2 md:pl-12">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md h-full flex flex-col justify-center">
                  <div className="w-16 h-16 rounded-full bg-slate-100 text-primary flex items-center justify-center text-2xl font-bold font-heading mb-4">AD</div>
                  <p className="text-slate-500 italic text-lg">"Our counterfeit-zero guarantee is the bedrock of trust we share with thousands of healthcare providers."</p>
                </div>
              </div>
            </div>

            {/* Node 4: Sales */}
            <div className="flex flex-col md:flex-row-reverse items-center gap-8 relative">
              <div className="w-full md:w-1/2 md:pl-12 text-left">
                <div className="inline-block px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full mb-3 uppercase tracking-widest">B2B Network Expansion</div>
                <h3 className="font-heading font-extrabold text-3xl text-primary mb-2">Imran Shaikh</h3>
                <h4 className="text-sm font-bold text-secondary tracking-widest uppercase mb-4">Head – B2B Sales & Key Accounts</h4>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Leads wholesale pricing strategies, chemist onboarding, and hospital institutional accounts. His efforts have expanded our active client base to over 1,200 partners.
                </p>
              </div>
              <div className="absolute left-4 md:left-1/2 w-5 h-5 bg-amber-500 rounded-full transform -translate-x-1/2 border-4 border-white shadow-lg hidden md:block z-10"></div>
              <div className="w-full md:w-1/2 md:pr-12">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md h-full flex flex-col justify-center md:text-right">
                  <div className="w-16 h-16 rounded-full bg-slate-100 text-primary flex items-center justify-center text-2xl font-bold font-heading mb-4 md:ml-auto">IS</div>
                  <p className="text-slate-500 italic text-lg">"We focus on transparent PTR/MRP billing and structured credit to empower local pharmacies."</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-4 pb-20 md:pb-24 bg-white">
        <div className="container">
          <div className="text-center bg-slate-900 p-10 md:p-14 rounded-3xl shadow-xl max-w-4xl mx-auto text-white">
            <h3 className="font-heading font-bold text-3xl md:text-4xl mb-4">Partner with VS Medico Today</h3>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Register your chemist shop or hospital procurement account with VS Medico to unlock structured wholesale pricing.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => setIsModalOpen(true)} className="btn btn-white font-bold">
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
      </section>
    </div>
  );
}
