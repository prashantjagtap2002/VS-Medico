"use client";

import React, { useState } from 'react';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
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

import CompetitiveAdvantage from '@/components/CompetitiveAdvantage';

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

          <div className="grid-4">
            {COMPANY_INFO.valuePropositions.map((vp, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon">
                  {idx === 0 && <Building2 size={28} />}
                  {idx === 1 && <ShieldCheck size={28} />}
                  {idx === 2 && <Snowflake size={28} />}
                  {idx === 3 && <Truck size={28} />}
                </div>
                <h3>{vp.title}</h3>
                <p>{vp.desc}</p>
              </div>
            ))}
          </div>

          {/* WHO-GDP Cold Storage Telemetry Dashboard */}
          <ColdChainTracker />
        </div>
      </section>

      {/* Competitive Distributor Edge vs Manufacturers & Traders */}
      <CompetitiveAdvantage />

      {/* Featured Products Showcase */}
      <ProductCatalog showTitle={true} hideControls limit={6} />

      {/* Brands We Deal In */}
      <BrandsGrid limit={10} />

      {/* Frequently Asked Questions (FAQs) */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="container">
          <div className="grid md:grid-cols-12 gap-10 items-start">
            {/* Left Side: Header & WhatsApp CTA */}
            <div className="md:col-span-5 flex flex-col gap-4">
              <div>
                <span className="text-secondary font-bold text-xs uppercase tracking-wider block mb-1">
                  COMMON B2B QUESTIONS
                </span>
                <h2 className="font-heading font-extrabold text-3xl text-primary mb-3">
                  Frequently Asked Questions
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Everything you need to know about opening a wholesale account, cold chain logistics, and delivery terms with VS Medico.
                </p>
              </div>

              <div className="p-6 bg-sky-50 rounded-2xl border border-sky-100 mt-2">
                <h4 className="font-bold text-primary text-base mb-1">Have a specific inquiry?</h4>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  Reach out directly to our Bhandup wholesale sales desk via WhatsApp for instant rate sheets or stock updates.
                </p>
                <a
                  href={`https://wa.me/${COMPANY_INFO.contact.whatsappRaw}?text=Hello%20VS%20Medico,%20I%20have%20a%20question%20regarding%20wholesale%20supply.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm inline-flex"
                >
                  <MessageCircle size={16} />
                  <span>Ask Sales Desk</span>
                </a>
              </div>
            </div>

            {/* Right Side: Accordion Questions & Answers */}
            <div className="md:col-span-7 flex flex-col gap-3">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div key={index} className="faq-item">
                    <button
                      onClick={() => toggleFaq(index)}
                      className="faq-question-btn"
                    >
                      <span className="font-bold text-primary text-base text-left">{faq.q}</span>
                      {isOpen ? <ChevronUp size={20} className="text-secondary shrink-0" /> : <ChevronDown size={20} className="text-slate-400 shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="faq-answer-box">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Quick B2B Banner CTA */}
      <section className="b2b-cta-banner">
        <div className="container">
          <div className="b2b-cta-content">
            <div>
              <span className="inline-block text-xs font-bold text-sky-400 uppercase tracking-widest bg-sky-950/80 px-4 py-1.5 rounded-full border border-sky-800 mb-4">
                B2B REGISTERED CHEMISTS & HOSPITALS ONLY
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-3 text-white">
                Ready to Order Wholesale Medicines?
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
                Get instant net PTR rates, stock availability, and same-day delivery confirmation from our Bhandup sales desk.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 shrink-0">
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
