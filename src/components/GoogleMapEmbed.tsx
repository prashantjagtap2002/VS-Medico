"use client";

import React, { useEffect, useRef, useState } from 'react';
import { COMPANY_INFO } from '@/data/companyData';
import { MapPin, Navigation, Copy, Check } from 'lucide-react';

export default function GoogleMapEmbed() {
  const [copied, setCopied] = useState(false);
  // Google Maps pulls in ~1 MB of scripts, so only load it once the map is
  // near the viewport and the browser is idle.
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = mapRef.current;
    if (!el || !('IntersectionObserver' in window)) {
      setShowMap(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const load = () => setShowMap(true);
        if ('requestIdleCallback' in window) window.requestIdleCallback(load, { timeout: 2500 });
        else setTimeout(load, 800);
      },
      { rootMargin: '200px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(COMPANY_INFO.address.fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (e.g. insecure context); the address is visible to copy manually.
    }
  };

  return (
    <div style={{ position: 'sticky', top: '6rem', zIndex: 10, background: '#fff', borderRadius: '1.5rem', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
      {/* Map */}
      <div ref={mapRef} className="map-frame">
        {showMap ? (
          <iframe
            title={`Map showing ${COMPANY_INFO.legalName}, ${COMPANY_INFO.address.locality}`}
            src={COMPANY_INFO.address.googleMapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <a href={COMPANY_INFO.address.mapDirectionsUrl} target="_blank" rel="noopener noreferrer" className="map-placeholder">
            <MapPin size={36} aria-hidden="true" />
            <span>Loading map… tap to open in Google Maps</span>
          </a>
        )}
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
            type="button"
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
