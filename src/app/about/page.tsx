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
  Award,
  Building2,
  Activity
} from 'lucide-react';

export default function AboutPage() {
  const { setIsModalOpen, setIsLicenseModalOpen } = useQuoteBasket();

  return (
    <div className="bg-white">
      {/* 1. Hero Section for About */}
      <section className="relative pt-20 md:pt-28 pb-16 md:pb-24 overflow-hidden bg-slate-50 border-b border-slate-200">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary opacity-5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-secondary opacity-5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="container relative z-10 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100 text-secondary font-bold text-xs uppercase tracking-widest mb-6">
            <Award size={16} /> 
            About VS Medico LLP
          </span>
          <h1 className="font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary mb-6 leading-tight max-w-4xl mx-auto">
            Powering Mumbai's Healthcare Supply Chain <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-accent-green">Since 1998</span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            A premier pharmaceutical wholesale distributor, super stockist, and authorized C&F partner supplying 1,200+ retail pharmacies and hospitals across the Mumbai Metropolitan Region.
          </p>
        </div>
      </section>

      {/* 2. Stats Grid */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {TRUST_STATS.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center text-center p-6 md:p-8 rounded-[2rem] bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
                <div className="font-heading font-extrabold text-4xl md:text-5xl text-primary mb-3">{stat.value}</div>
                <div className="font-bold text-slate-800 text-base mb-2">{stat.label}</div>
                <div className="text-sm text-slate-500">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Story & Values */}
      <section className="py-20 md:py-28 bg-slate-50 border-y border-slate-200">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-center">
            
            {/* Story Text */}
            <div className="space-y-10">
              <div>
                <span className="text-secondary font-bold text-sm tracking-widest uppercase mb-3 block">Our Legacy</span>
                <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-primary leading-tight">
                  From Local Stockist to a Single-Window Hub
                </h2>
              </div>
              
              <div className="space-y-6 text-slate-600 leading-relaxed text-lg">
                <p>
                  Founded over 25 years ago, <strong className="text-primary font-bold">VS Medico LLP</strong> has grown into a major pharmaceutical distribution entity. We bridge the gap between global manufacturers and local healthcare providers in Mumbai MMR.
                </p>
                
                <div className="flex gap-5 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="shrink-0 mt-1 w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg mb-1">The Super-Stockist Advantage</h4>
                    <p className="text-sm leading-relaxed">Unlike single-brand manufacturers, we provide a single-window ordering system. Retailers get products across 50+ leading MNCs on one consolidated invoice.</p>
                  </div>
                </div>
                
                <div className="flex gap-5 p-6 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="shrink-0 mt-1 w-12 h-12 rounded-full bg-sky-100 text-secondary flex items-center justify-center">
                    <Activity size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-lg mb-1">Hyper-Local Logistics</h4>
                    <p className="text-sm leading-relaxed">Operating from Sharad Industrial Estate, Bhandup West, our logistics fleet ensures same-day express runs across Bhandup, Mulund, Thane, Powai, and Ghatkopar.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quality & Compliance Visual Card */}
            <div className="relative h-full">
               <div className="h-full bg-gradient-to-br from-primary-light to-primary rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl flex flex-col justify-between overflow-hidden relative">
                  <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                    <ShieldCheck size={320} className="transform translate-x-1/4 -translate-y-1/4" />
                  </div>
                  
                  <div className="relative z-10 mb-12">
                    <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-bold tracking-widest uppercase mb-4 text-sky-200">Standards</span>
                    <h3 className="font-heading font-extrabold text-3xl mb-8">Quality & Compliance First</h3>
                    
                    <div className="space-y-8">
                      <div className="flex items-start gap-4">
                        <CheckCircle2 size={26} className="text-emerald-400 shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-xl mb-2">Counterfeit-Zero Guarantee</h4>
                          <p className="text-sky-100 text-sm leading-relaxed">Strict batch verification and direct factory-to-warehouse sourcing ensures 100% genuine products.</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <CheckCircle2 size={26} className="text-amber-400 shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-xl mb-2">Transparent B2B Billing</h4>
                          <p className="text-sky-100 text-sm leading-relaxed">Accurate PTR/MRP invoice credit structures with full GST & HSN compliance for easy accounting.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative z-10 pt-8 mt-auto border-t border-white/20">
                    <button
                      onClick={() => setIsLicenseModalOpen(true)}
                      className="bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-2xl px-6 py-4 flex items-center justify-between w-full transition-all group"
                    >
                      <span className="font-bold text-lg">View FDA License 20B/21B</span>
                      <ShieldCheck size={24} className="group-hover:scale-110 group-hover:text-emerald-400 transition-all" />
                    </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Infrastructure */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <span className="text-emerald-600 font-bold text-sm tracking-widest uppercase mb-4 block">Infrastructure</span>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-primary mb-6">
              WHO-GDP Compliant Cold Chain
            </h2>
            <p className="text-slate-600 text-lg">
              Our 10,000 sq. ft. warehousing facility in Bhandup West is equipped with strict climate control to ensure the efficacy of critical medicines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 md:p-10 rounded-[2rem] border border-slate-200 hover:border-sky-300 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-sky-100 text-secondary flex items-center justify-center mb-8 shadow-inner">
                <Snowflake size={32} />
              </div>
              <h3 className="font-bold text-primary text-2xl mb-4">2°C – 8°C Cold Storage</h3>
              <p className="text-slate-600 leading-relaxed">
                Dedicated cold rooms with automatic back-up generators for insulins, vaccines, growth hormones, and biological serums.
              </p>
            </div>

            <div className="bg-slate-50 p-8 md:p-10 rounded-[2rem] border border-slate-200 hover:border-emerald-300 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-8 shadow-inner">
                <Truck size={32} />
              </div>
              <h3 className="font-bold text-primary text-2xl mb-4">Insulated Express Fleet</h3>
              <p className="text-slate-600 leading-relaxed">
                Temperature-monitored transit boxes ensuring cold chain continuity during delivery runs across Bhandup, Powai, Thane, and South Mumbai.
              </p>
            </div>

            <div className="bg-slate-50 p-8 md:p-10 rounded-[2rem] border border-slate-200 hover:border-purple-300 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-8 shadow-inner">
                <ShieldCheck size={32} />
              </div>
              <h3 className="font-bold text-primary text-2xl mb-4">FDA Audit & Expiry</h3>
              <p className="text-slate-600 leading-relaxed">
                Advanced software for FEFO (First Expire, First Out) batch tracking, minimizing expiry losses for our retail partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Leadership */}
      <section className="py-20 md:py-28 bg-slate-50 border-t border-slate-200">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl text-primary mb-4">
              The People Behind VS Medico
            </h2>
            <p className="text-slate-600 text-lg">
              A dedicated team of pharma distribution veterans managing sourcing, cold chain, compliance, and B2B accounts.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {LEADERSHIP_TEAM.map((member, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm text-center hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary-light to-primary text-white flex items-center justify-center text-2xl font-bold font-heading mb-6 shadow-lg shadow-primary/20">
                  {member.initials}
                </div>
                <h3 className="font-bold text-primary text-xl mb-1">{member.name}</h3>
                <div className="text-sm font-bold text-secondary tracking-wide uppercase mb-4">{member.role}</div>
                <p className="text-sm text-slate-500 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA Section */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container">
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-[2.5rem] p-10 md:p-20 text-center text-white shadow-2xl max-w-5xl mx-auto relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary opacity-20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
            
            <div className="relative z-10">
              <h3 className="font-heading font-extrabold text-3xl md:text-5xl mb-6 leading-tight">Ready to Partner with VS Medico?</h3>
              <p className="text-sky-100 text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
                Register your chemist shop or hospital procurement account today to unlock structured wholesale pricing, consolidated billing, and same-day express delivery.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-5">
                <button 
                  onClick={() => setIsModalOpen(true)} 
                  className="bg-white text-primary hover:bg-slate-50 hover:-translate-y-1 px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg"
                >
                  <FileText size={22} />
                  <span>Submit Account Request</span>
                </button>
                <a
                  href={`https://wa.me/${COMPANY_INFO.contact.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#1eb856] hover:-translate-y-1 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all shadow-lg"
                >
                  <MessageCircle size={22} />
                  <span>WhatsApp Direct Desk</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
