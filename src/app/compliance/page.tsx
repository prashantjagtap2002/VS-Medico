"use client";

import React from 'react';
import { COMPANY_INFO } from '@/data/companyData';
import { useQuoteBasket } from '@/components/QuoteBasketContext';
import { 
  ShieldCheck, 
  FileCheck, 
  CheckCircle2, 
  Snowflake
} from 'lucide-react';

export default function CompliancePage() {
  const { setIsLicenseModalOpen } = useQuoteBasket();

  return (
    <div className="py-16">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest bg-emerald-100 px-3 py-1 rounded-full">
            REGULATORY STANDARDS & QUALITY ASSURANCE
          </span>
          <h1 className="font-heading font-extrabold text-4xl text-primary mt-3 mb-4">
            Licensing & Compliance Credentials
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            VS Medico LLP strictly adheres to the Drugs & Cosmetics Act, 1940 and rules thereunder, operating under valid FDA Maharashtra Drug Licenses and WHO-GDP standards.
          </p>
        </div>

        {/* License Badges Card Grid */}
        <div className="grid-2 mb-12">
          {/* License 20B */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="badge badge-blue">WHOLESALE DRUG LICENSE</span>
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-secondary flex items-center justify-center shrink-0">
                  <FileCheck size={24} />
                </div>
              </div>
              <h2 className="font-heading font-extrabold text-2xl text-primary mb-1">Form 20B Registration</h2>
              <p className="text-xs text-slate-500 mb-4">Issued by Food & Drug Administration (FDA), Maharashtra State</p>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-4">
                <div className="text-xs text-slate-500 font-semibold mb-0.5">License Registration Number</div>
                <div className="font-mono font-extrabold text-2xl text-primary">{COMPANY_INFO.licenses.drugLicense20B}</div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
              Authorizes VS Medico LLP to stock, store, sell, and distribute wholesale drugs other than those specified in Schedules C, C(1), and X.
            </p>
          </div>

          {/* License 21B */}
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="badge badge-green">BIOLOGICALS & SCHEDULE C LICENSE</span>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <ShieldCheck size={24} />
                </div>
              </div>
              <h2 className="font-heading font-extrabold text-2xl text-primary mb-1">Form 21B Registration</h2>
              <p className="text-xs text-slate-500 mb-4">Issued by Food & Drug Administration (FDA), Maharashtra State</p>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-4">
                <div className="text-xs text-slate-500 font-semibold mb-0.5">License Registration Number</div>
                <div className="font-mono font-extrabold text-2xl text-emerald-800">{COMPANY_INFO.licenses.drugLicense21B}</div>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed pt-3 border-t border-slate-100">
              Authorizes VS Medico LLP to stock, store, sell, and distribute wholesale biological products, insulins, vaccines, and Schedule C/C(1) formulations.
            </p>
          </div>
        </div>

        {/* GST & Tax Compliance */}
        <div className="dark-card mb-12">
          <div className="grid-2 items-center">
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">TAX COMPLIANCE STATUS</span>
              <h2 className="font-heading font-bold text-3xl text-white mt-1 mb-3">GSTIN Registration & Billing</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                VS Medico LLP is a fully registered tax-compliant entity under the Goods & Services Tax network in Maharashtra (State Code 27). Every invoice includes complete HSN codes, PTR rates, and tax breakdown.
              </p>
              <div className="inline-block bg-slate-800 p-4 rounded-xl border border-slate-700 font-mono text-xl text-sky-300 font-extrabold">
                GSTIN: {COMPANY_INFO.licenses.gstin}
              </div>
            </div>

            <div className="flex flex-col gap-3 bg-slate-800/80 p-6 rounded-2xl border border-slate-700 text-xs text-slate-300">
              <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
                <CheckCircle2 size={18} className="text-emerald-400" />
                <span>Quality & Compliance Pillars</span>
              </div>
              <p>✔ <strong className="text-white">100% Genuine Direct Supply:</strong> Sourced strictly from original brand manufacturers or authorized super-stockists.</p>
              <p>✔ <strong className="text-white">Expiry Traceability:</strong> Zero near-expiry items dispatched to retail chemist stores without prior written consent.</p>
              <p>✔ <strong className="text-white">Batch Audit Trail:</strong> Every batch number is recorded on tax invoices for quick recall compliance.</p>
              <p>✔ <strong className="text-white">Restricted Sales Policy:</strong> Sales permitted strictly to buyers providing valid Drug License (20B/21B) & GST credentials.</p>
            </div>
          </div>
        </div>

        {/* Cold Chain Protocol */}
        <div className="bg-sky-50 p-8 rounded-3xl border border-sky-100 mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-600 text-white flex items-center justify-center shrink-0">
                <Snowflake size={32} />
              </div>
              <div>
                <h3 className="font-heading font-bold text-2xl text-primary mb-1">WHO-GDP Cold Chain Protocols</h3>
                <p className="text-slate-600 text-sm max-w-2xl">
                  Our Bhandup cold rooms operate 24/7 at 2°C to 8°C with dual power backups, digital data loggers, and insulated delivery boxes to preserve product potency.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsLicenseModalOpen(true)}
              className="btn btn-primary shrink-0"
            >
              <ShieldCheck size={18} />
              <span>Verify Licensing Credentials</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
