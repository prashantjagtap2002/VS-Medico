"use client";

import { useMemo, useState } from 'react';
import { Filter, MapPin, Users, CheckCircle2, Clock } from 'lucide-react';
import { NETWORK_AREAS, REGIONS, type RegionId } from '@/data/siteContent';

export default function NetworkBrowser() {
  const [region, setRegion] = useState<RegionId | 'all'>('all');

  const counts = useMemo(() => {
    const c: Partial<Record<RegionId, number>> = {};
    for (const a of NETWORK_AREAS) c[a.region] = (c[a.region] ?? 0) + 1;
    return c;
  }, []);

  const visible = region === 'all' ? NETWORK_AREAS : NETWORK_AREAS.filter((a) => a.region === region);

  return (
    <>
      <p className="flex items-center gap-2 text-sm mb-4">
        <Filter size={16} className="text-teal-brand" aria-hidden="true" /> Filter by Region:
      </p>
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter delivery areas by region">
        <button
          type="button"
          className={`chip${region === 'all' ? ' is-active' : ''}`}
          aria-pressed={region === 'all'}
          onClick={() => setRegion('all')}
        >
          All
        </button>
        {(Object.keys(REGIONS) as RegionId[])
          .filter((id) => counts[id])
          .map((id) => (
            <button
              key={id}
              type="button"
              className={`chip${region === id ? ' is-active' : ''}`}
              aria-pressed={region === id}
              onClick={() => setRegion(id)}
            >
              {REGIONS[id].label} ({counts[id]})
            </button>
          ))}
      </div>

      <div className="grid-3">
        {visible.map((a) => (
          <article key={a.area} className="route-card">
            <span className="route-no">{NETWORK_AREAS.indexOf(a) + 1}</span>
            <span className={`tag ${REGIONS[a.region].tag} self-start`}>
              <MapPin size={11} aria-hidden="true" /> {REGIONS[a.region].label}
            </span>
            <h3>{a.area}</h3>
            <p className="route-meta">
              <Users size={14} aria-hidden="true" /> {a.customers}
            </p>
            <p className="route-status">
              {a.delivery === 'Same-day' ? (
                <CheckCircle2 size={15} aria-hidden="true" />
              ) : (
                <Clock size={15} aria-hidden="true" />
              )}
              {a.delivery === 'Same-day' ? 'Same-day delivery' : 'Scheduled delivery'}
            </p>
          </article>
        ))}
      </div>

      <p className="text-center text-sm text-ink-soft mt-8" aria-live="polite">
        Showing {visible.length} of {NETWORK_AREAS.length} delivery areas
      </p>
    </>
  );
}
