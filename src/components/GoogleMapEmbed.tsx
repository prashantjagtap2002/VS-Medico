"use client";

import { useEffect, useRef, useState } from 'react';
import { MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '@/data/companyData';

export default function GoogleMapEmbed() {
  // Google Maps pulls in ~1 MB of scripts, so only load it once the map is
  // near the viewport and the browser is idle.
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const { address, legalName } = COMPANY_INFO;

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

  return (
    <div className="map-card">
      <div ref={mapRef} className="map-frame">
        <a href={address.mapDirectionsUrl} target="_blank" rel="noopener noreferrer" className="map-open">
          Open in Maps <ExternalLink size={13} aria-hidden="true" />
        </a>
        {showMap ? (
          <iframe
            title={`Map showing ${legalName}, ${address.locality}`}
            src={address.googleMapEmbedUrl}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        ) : (
          <a href={address.mapDirectionsUrl} target="_blank" rel="noopener noreferrer" className="map-placeholder">
            <MapPin size={36} aria-hidden="true" />
            <span>Loading map… tap to open in Google Maps</span>
          </a>
        )}
      </div>
      <div className="map-bar">
        <div className="flex items-center gap-4">
          <span className="map-pin">
            <MapPin size={20} aria-hidden="true" />
          </span>
          <div>
            <strong>{legalName}</strong>
            <span>
              {address.fullAddress} · {address.landmark}
            </span>
          </div>
        </div>
        <a href={address.mapDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn-orange py-3!">
          Get Directions <ArrowRight size={15} aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
