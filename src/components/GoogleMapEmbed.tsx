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
    <div style={{ background: '#fff', borderRadius: '1.5rem', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
      {/* Map */}
      <div style={{ width: '100%', height: '340px', background: '#f1f5f9' }}>
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

      {/* Address + actions */}
      <div style={{ padding: '1.25rem', borderTop: '1px solid #e2e8f0' }}>
        <div className="flex items-start gap-3" style={{ marginBottom: '0.85rem' }}>
          <div className="w-9 h-9 rounded-lg bg-sky-100 text-secondary flex items-center justify-center shrink-0">
            <MapPin size={18} />
          </div>
          <div>
            <p className="text-xs text-slate-800 font-semibold leading-relaxed">{COMPANY_INFO.address.fullAddress}</p>
            <p className="text-xs text-emerald-700 font-semibold mt-0.5">{COMPANY_INFO.address.landmark}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyAddress}
            className="btn btn-outline btn-sm text-xs justify-center"
            style={{ flex: 1 }}
          >
            {copied ? <Check size={13} className="text-emerald-600" /> : <Copy size={13} />}
            <span>{copied ? 'Copied!' : 'Copy Address'}</span>
          </button>
          <a
            href={COMPANY_INFO.address.mapDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm text-xs justify-center"
            style={{ flex: 1 }}
          >
            <Navigation size={13} />
            <span>Get Directions</span>
          </a>
        </div>
      </div>
    </div>
  );
}
