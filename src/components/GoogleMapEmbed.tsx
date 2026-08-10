"use client";

import React, { useState } from 'react';
import { COMPANY_INFO } from '@/data/companyData';
import { MapPin, Navigation, Copy, Check } from 'lucide-react';

export default function GoogleMapEmbed() {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(COMPANY_INFO.address.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden flex flex-col">
      <div className="p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4" style={{ background: '#0f172a' }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center shrink-0">
            <MapPin size={22} />
          </div>
          <div>
            <h4 className="font-bold text-sm leading-tight text-white font-heading">VS Medico Warehouse & Office</h4>
            <p className="text-xs text-slate-300 mt-0.5">{COMPANY_INFO.address.landmark}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <button
            onClick={handleCopyAddress}
            className="btn btn-outline btn-sm text-xs bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 justify-center"
          >
            {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy Address'}</span>
          </button>

          <a
            href={COMPANY_INFO.address.mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary btn-sm text-xs justify-center"
          >
            <Navigation size={14} />
            <span>Get Directions</span>
          </a>
        </div>
      </div>

      <div className="relative w-full h-[450px] bg-slate-100">
        <iframe
          title="VS Medico Location Map"
          src={COMPANY_INFO.address.googleMapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div className="p-5 bg-slate-50 border-t border-slate-200 text-xs text-slate-600 flex flex-wrap justify-between items-center gap-2">
        <span><strong>Full Address:</strong> {COMPANY_INFO.address.fullAddress}</span>
        <span className="font-semibold text-emerald-700">Near Bhandup Railway Station (West), Mumbai</span>
      </div>
    </div>
  );
}
