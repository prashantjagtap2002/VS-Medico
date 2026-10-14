"use client";

import React from 'react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/data/companyData';
import { useQuoteBasket } from './QuoteBasketContext';
import Modal from './Modal';
import { ShieldCheck, CheckCircle2, Snowflake, UserPlus } from 'lucide-react';

export default function LicenseBadgeModal() {
  const { isLicenseModalOpen, setIsLicenseModalOpen } = useQuoteBasket();

  const close = () => setIsLicenseModalOpen(false);

  return (
    <Modal
      open={isLicenseModalOpen}
      onClose={close}
      titleId="license-modal-title"
      header={
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck size={24} aria-hidden="true" />
          </div>
          <div>
            <h2 id="license-modal-title" className="font-bold text-primary text-xl font-heading">
              FDA Licensing & Quality Compliance
            </h2>
            <p className="text-xs text-slate-500">Verified Pharmaceutical Stockist Status</p>
          </div>
        </div>
      }
    >
      <div className="flex flex-col gap-4 text-sm">
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 flex items-start gap-3">
          <CheckCircle2 size={22} className="text-emerald-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold">FDA Maharashtra Active Drug License Holder</h3>
            <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
              VS Medico LLP operates in full strict accordance with the Drugs & Cosmetics Act 1940 and Rules 1945. Issued by the Licensing Authority, Food & Drug Administration, Maharashtra State.
            </p>
          </div>
        </div>

        <div className="grid-2">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 font-semibold mb-1">Drug License (Form 20B)</div>
            <div className="font-bold text-primary font-mono text-base">{COMPANY_INFO.licenses.drugLicense20B}</div>
            <div className="text-[11px] text-slate-500 mt-1">Wholesale Drugs Other Than Biologicals</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 font-semibold mb-1">Drug License (Form 21B)</div>
            <div className="font-bold text-primary font-mono text-base">{COMPANY_INFO.licenses.drugLicense21B}</div>
            <div className="text-[11px] text-slate-500 mt-1">Wholesale Biologicals & Schedule C/C1</div>
          </div>
        </div>

        <div className="grid-2">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 font-semibold mb-1">GST Registration No.</div>
            <div className="font-bold text-slate-800 font-mono text-sm">{COMPANY_INFO.licenses.gstin}</div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-1">State: Maharashtra (Code 27)</div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="text-xs text-slate-500 font-semibold mb-1">WHO-GDP Cold Chain</div>
            <div className="font-bold text-sky-700 text-sm flex items-center gap-1">
              <Snowflake size={15} /> 2°C to 8°C Monitored
            </div>
            <div className="text-[11px] text-slate-500 mt-1">24/7 Temperature Logged Storage</div>
          </div>
        </div>

        <div className="p-4 bg-slate-100 rounded-xl text-xs text-slate-600 flex flex-col gap-1.5">
          <p><strong>Registered Address:</strong> {COMPANY_INFO.address.fullAddress}</p>
          <p><strong>Issuing Authority:</strong> {COMPANY_INFO.licenses.issuingAuthority}</p>
        </div>

        <p className="text-xs text-slate-500">
          Copies of licence certificates are shared with verified buyers during account opening.
        </p>

        <div className="pt-2 flex flex-wrap justify-end gap-3">
          <Link href="/register" onClick={close} className="btn btn-outline btn-sm">
            <UserPlus size={14} aria-hidden="true" />
            <span>Open a Wholesale Account</span>
          </Link>
          <button type="button" onClick={close} className="btn btn-primary btn-sm">
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}
