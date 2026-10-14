"use client";

import React from 'react';
import Link from 'next/link';
import { COMPANY_INFO, TRUST_STATS } from '@/data/companyData';
import { useQuoteBasket } from './QuoteBasketContext';
import CountUp from './CountUp';
import { whatsappLink } from '@/lib/forms';
import {
  ArrowRight,
  MessageCircle,
  FileText,
  ShieldCheck,
  Truck,
  Sparkles
} from 'lucide-react';

export default function Hero() {
  const { setIsModalOpen, setIsLicenseModalOpen } = useQuoteBasket();

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column - Headline & CTAs */}
          <div>
            <div className="hero-tag">
              <Sparkles size={16} className="text-secondary" />
              <span>Est. {COMPANY_INFO.establishedYear} • {COMPANY_INFO.yearsOfExcellence} Years of Wholesale Excellence</span>
            </div>

            <h1 className="hero-title">
              Mumbai's Single-Window <span>Pharma Wholesale</span> & Stockist Hub
            </h1>

            <p className="hero-lead">
              Authorized super stockist based at Sharad Industrial Estate, Bhandup West. Supplying 100% factory-direct branded formulations, trade generics, critical care injectables, & WHO-GDP cold chain vaccines to 1,200+ retail chemists and hospitals across Mumbai MMR.
            </p>

            <div className="hero-ctas">
              <Link href="/products" className="btn btn-primary btn-lg">
                <span>Browse Product Catalog</span>
                <ArrowRight size={18} />
              </Link>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="btn btn-outline btn-lg"
              >
                <FileText size={18} className="text-secondary" />
                <span>Request B2B Price List</span>
              </button>

              <a
                href={whatsappLink('Hello VS Medico, I want to request the latest wholesale PTR/MRP price list.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageCircle size={18} />
                <span>WhatsApp Instant Rate</span>
              </a>
            </div>
          </div>

          {/* Right Column - Stats & Trust Visual */}
          <div className="hero-visual">
            <div className="hero-card-main">
              <div className="hero-card-header">
                <div>
                  <h2 className="font-extrabold text-primary text-xl font-heading">VS Medico Overview</h2>
                  <p className="text-xs text-slate-500">Bhandup West, Mumbai • FDA Licensed</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLicenseModalOpen(true)}
                  className="hero-card-badge flex items-center gap-1 hover:opacity-90 transition-opacity"
                >
                  <ShieldCheck size={14} />
                  <span>Licensed 20B/21B</span>
                </button>
              </div>

              <div className="hero-stats-mini">
                {TRUST_STATS.map((stat) => (
                  <div key={stat.label} className="mini-stat-box">
                    <div className="mini-stat-number"><CountUp value={stat.value} /></div>
                    <div className="mini-stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="hero-card-footer mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
                  <Truck size={14} className="text-emerald-600" />
                  Today's MMR Delivery Active
                </span>
                <span className="font-semibold text-sky-700">GST: {COMPANY_INFO.licenses.gstin}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
