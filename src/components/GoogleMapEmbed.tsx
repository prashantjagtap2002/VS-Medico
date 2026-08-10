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
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
      {/* Map iframe - clean, no dark header overlapping */}
      <div className="relative w-full" style={{ height: '400px' }}>
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

      {/* Address footer bar */}
      <div className="p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-secondary flex items-center justify-center shrink-0">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-sm text-slate-800 font-semibold">{COMPANY_INFO.address.fullAddress}</p>
            <p className="text-xs text-emerald-700 font-semibold mt-0.5">{COMPANY_INFO.address.landmark}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyAddress}
            className="btn btn-outline btn-sm text-xs justify-center"
          >
            {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
            <span>{copied ? 'Copied!' : 'Copy Address'}</span>
          </button>

          <a
            href={COMPANY_INFO.address.mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm text-xs justify-center"
          >
            <Navigation size={14} />
            <span>Get Directions</span>
          </a>
        </div>
      </div>
    </div>
  );
}
