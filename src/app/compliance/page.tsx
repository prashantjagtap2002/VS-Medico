"use client";

import React from 'react';
import { COMPANY_INFO } from '@/data/companyData';
import { useQuoteBasket } from '@/components/QuoteBasketContext';
import { 
  ShieldCheck, 
  FileCheck, 
  CheckCircle2, 
  Snowflake,
  Award,
  Lock,
  FileText
} from 'lucide-react';

export default function CompliancePage() {
  const { setIsLicenseModalOpen } = useQuoteBasket();

  return (
    <div className="py-16 bg-slate-50/50">
      <div className="container">
        {/* Header */}
        <div style={{ maxWidth: '750px', marginBottom: '3.5rem' }}>
          <span className="inline-flex items-center gap-1.5 text-emerald-700 font-bold text-xs uppercase tracking-widest bg-emerald-100/80 border border-emerald-200 px-3.5 py-1.5 rounded-full mb-3">
            <Award size={14} />
            <span>REGULATORY STANDARDS & QUALITY ASSURANCE</span>
          </span>
          <h1 className="font-heading font-extrabold text-4xl text-primary mb-3">
            Licensing & Compliance Credentials
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            VS Medico LLP strictly adheres to the Drugs & Cosmetics Act, 1940 and rules thereunder, operating under valid FDA Maharashtra Drug Licenses and WHO-GDP quality distribution standards.
          </p>
        </div>

        {/* Section 1: FDA Drug Licenses (2-Column Grid) */}
        <div className="mb-14">
          <h2 className="font-heading font-extrabold text-xl text-primary mb-5 flex items-center gap-2">
            <FileCheck className="text-secondary" size={22} />
            <span>State FDA Drug Registration Certificates</span>
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
            {/* License 20B */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="badge badge-blue font-bold">WHOLESALE DRUG LICENSE</span>
                  <div className="w-11 h-11 rounded-2xl bg-sky-50 text-secondary flex items-center justify-center shrink-0">
                    <FileCheck size={22} />
                  </div>
                </div>
                <h3 className="font-heading font-extrabold text-xl text-primary mb-1">Form 20B Registration</h3>
                <p className="text-xs text-slate-500 mb-4">Issued by Food & Drug Administration (FDA), Maharashtra State</p>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-4">
                  <div className="text-xs text-slate-500 font-semibold mb-0.5">License Registration Number</div>
                  <div className="font-mono font-extrabold text-2xl text-primary">{COMPANY_INFO.licenses.drugLicense20B}</div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
                Authorizes VS Medico LLP to stock, store, sell, and distribute wholesale drugs other than those specified in Schedules C, C(1), and X.
              </p>
            </div>

            {/* License 21B */}
            <div className="bg-white p-7 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="badge badge-green font-bold">BIOLOGICALS & SCHEDULE C LICENSE</span>
                  <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                    <ShieldCheck size={22} />
                  </div>
                </div>
                <h3 className="font-heading font-extrabold text-xl text-primary mb-1">Form 21B Registration</h3>
                <p className="text-xs text-slate-500 mb-4">Issued by Food & Drug Administration (FDA), Maharashtra State</p>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 mb-4">
                  <div className="text-xs text-slate-500 font-semibold mb-0.5">License Registration Number</div>
                  <div className="font-mono font-extrabold text-2xl text-emerald-800">{COMPANY_INFO.licenses.drugLicense21B}</div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
                Authorizes VS Medico LLP to stock, store, sell, and distribute wholesale biological products, insulins, vaccines, and Schedule C/C(1) formulations.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: GSTIN & Tax Compliance (Dark Card) */}
        <div className="mb-14" style={{ background: 'linear-gradient(135deg, #091a2e 0%, #0f2b48 100%)', borderRadius: '1.5rem', padding: '2.5rem', color: '#fff', border: '1px solid #1e3a5f', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'center' }}>
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5 mb-2">
                <Lock size={13} /> TAX COMPLIANCE STATUS
              </span>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-white mb-3">GSTIN Registration & Tax Compliance</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-5">
                VS Medico LLP is a fully registered tax-compliant entity under the Goods & Services Tax network in Maharashtra (State Code 27). Every invoice includes complete HSN codes, PTR rates, and tax breakdown.
              </p>
              <div className="inline-block bg-slate-800/90 p-4 rounded-xl border border-slate-700 font-mono text-xl text-sky-300 font-extrabold">
                GSTIN: {COMPANY_INFO.licenses.gstin}
              </div>
            </div>

            <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-700/80 text-xs text-slate-300 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
                <CheckCircle2 size={18} className="text-emerald-400" />
                <span>Quality & Compliance Pillars</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <p><strong className="text-white">100% Genuine Direct Supply:</strong> Sourced strictly from original brand manufacturers or authorized super-stockists.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <p><strong className="text-white">Expiry Traceability:</strong> Zero near-expiry items dispatched to retail chemist stores without prior written consent.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <p><strong className="text-white">Batch Audit Trail:</strong> Every batch number is recorded on tax invoices for quick recall compliance.</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✓</span>
                <p><strong className="text-white">Restricted Sales Policy:</strong> Sales permitted strictly to buyers providing valid Drug License (20B/21B) & GST credentials.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Cold Chain Protocol */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-secondary flex items-center justify-center shrink-0">
                <Snowflake size={26} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-xl text-primary mb-1">WHO-GDP Cold Chain Protocols</h3>
                <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">
                  Our Bhandup cold rooms operate 24/7 at 2°C to 8°C with dual power backups, digital data loggers, and insulated delivery boxes to preserve product potency.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsLicenseModalOpen(true)}
              className="btn btn-primary shrink-0 justify-center"
            >
              <FileText size={16} />
              <span>Verify License Modal</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
