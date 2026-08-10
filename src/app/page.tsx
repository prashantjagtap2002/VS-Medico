"use client";

import React, { useState } from 'react';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import ExpressReorderBar from '@/components/ExpressReorderBar';
import MarginCalculator from '@/components/MarginCalculator';
import ColdChainTracker from '@/components/ColdChainTracker';
import ProductCatalog from '@/components/ProductCatalog';
import BrandsGrid from '@/components/BrandsGrid';
import { COMPANY_INFO, FAQS } from '@/data/companyData';
import { useQuoteBasket } from '@/components/QuoteBasketContext';
import { 
  Building2, 
  ShieldCheck, 
  Snowflake, 
  Truck, 
  ChevronDown, 
  ChevronUp, 
  MessageCircle,
  FileText
} from 'lucide-react';

export default function Home() {
  const { setIsModalOpen } = useQuoteBasket();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Trust & Compliance Bar */}
      <TrustBar />

      <div className="container">
        {/* Express Fast Reorder Bar */}
        <ExpressReorderBar />
      </div>

      {/* Why Choose VS Medico Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">THE VS MEDICO ADVANTAGE</span>
            <h2 className="section-title">Reliable B2B Supply Chain Partner</h2>
            <p className="section-desc">
              For over 25 years, VS Medico has operated as a foundational link in Mumbai's healthcare ecosystem, ensuring retail pharmacies and hospitals receive genuine medications on time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPANY_INFO.valuePropositions.map((vp, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon">
                  {idx === 0 && <ShieldCheck size={28} />}
                  {idx === 1 && <Snowflake size={28} />}
                  {idx === 2 && <Truck size={28} />}
                  {idx === 3 && <Building2 size={28} />}
                </div>
                <h3>{vp.title}</h3>
                <p>{vp.desc}</p>
              </div>
            ))}
          </div>

          {/* Interactive Margin & PTR Profit Calculator */}
          <MarginCalculator />

          {/* WHO-GDP Cold Storage Telemetry Dashboard */}
          <ColdChainTracker />
        </div>
      </section>

      {/* Featured Products Showcase */}
      <ProductCatalog showTitle={true} />

      {/* Brands We Deal In */}
      <BrandsGrid />

      {/* Frequently Asked Questions (FAQs) */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="container max-w-4xl">
          <div className="section-header">
            <span className="section-subtitle">COMMON B2B QUESTIONS</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-desc">
              Everything you need to know about opening a wholesale account, cold chain logistics, and delivery terms with VS Medico.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50 transition-all"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 text-left font-bold text-primary text-base flex justify-between items-center hover:bg-slate-100 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={20} className="text-secondary" /> : <ChevronDown size={20} className="text-slate-400" />}
                  </button>
                  {isOpen && (
                    <div className="p-5 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick B2B Banner CTA */}
      <section className="py-14 bg-gradient-to-r from-slate-900 via-primary to-slate-900 text-white relative overflow-hidden">
        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div>
              <span className="inline-block text-xs font-bold text-sky-400 uppercase tracking-widest bg-sky-950/80 px-3 py-1 rounded-full border border-sky-800 mb-3">
                B2B REGISTERED CHEMISTS & HOSPITALS ONLY
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-3">
                Ready to Order Wholesale Medicines?
              </h2>
              <p className="text-slate-300 text-base max-w-xl">
                Get instant net PTR rates, stock availability, and same-day delivery confirmation from our Bhandup sales desk.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn btn-secondary btn-lg"
              >
                <FileText size={20} />
                <span>Request B2B Rate Card</span>
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.contact.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageCircle size={20} />
                <span>WhatsApp Instant Inquiry</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
