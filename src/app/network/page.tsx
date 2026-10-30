import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { CtaBand } from '@/components/PageSections';
import NetworkBrowser from '@/components/NetworkBrowser';
import { DISPATCH_CUTOFF_HOUR_IST } from '@/data/companyData';
import { NETWORK_AREAS, REGIONS } from '@/data/siteContent';

export const metadata: Metadata = pageMetadata({
  title: 'Delivery Network Across Mumbai MMR',
  description:
    'Same-day pharma delivery from our Bhandup West hub to Mulund, Thane, Powai, Ghatkopar, Kurla, Dadar, the Western Suburbs and scheduled runs to Navi Mumbai.',
  path: '/network',
});

export default function NetworkPage() {
  const sameDay = NETWORK_AREAS.filter((a) => a.delivery === 'Same-day').length;
  const regions = new Set(NETWORK_AREAS.map((a) => a.region)).size;
  const cutoff = DISPATCH_CUTOFF_HOUR_IST > 12 ? `${DISPATCH_CUTOFF_HOUR_IST - 12} PM` : `${DISPATCH_CUTOFF_HOUR_IST} AM`;

  const stats = [
    { value: NETWORK_AREAS.length, label: 'Delivery Areas', color: 'var(--brand-teal)', primary: true },
    { value: sameDay, label: 'Same-Day Areas', color: '#1d4ed8' },
    { value: regions, label: 'Regions Covered', color: '#c62828' },
    { value: cutoff, label: 'Order Cut-off', color: '#1e7b45' },
    { value: '2 hrs', label: 'Emergency Dispatch', color: 'var(--brand-orange-text)' },
  ];

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>
            <span className="accent-teal">Delivery</span> <span className="accent">Network</span>
          </h1>
          <p>
            Hyper-local distribution from our Bhandup West hub, delivering to licensed chemists, hospitals and nursing
            homes across the Mumbai Metropolitan Region.
          </p>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-5 mt-12 text-left">
            {stats.map((s) => (
              <div key={s.label} className={`stat-tile${s.primary ? ' is-primary' : ''}`}>
                <strong style={{ color: s.color }}>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-alt">
        <div className="container">
          <NetworkBrowser />
          <p className="body-small text-center mt-3">
            Regions: {Object.values(REGIONS).map((r) => r.label).join(' · ')}. Don&apos;t see your area? Ask us about
            scheduled supply.
          </p>
        </div>
      </section>

      <CtaBand
        title="Need Reliable Supply in Your Area?"
        text="Join the chemists and hospitals we deliver to every day. Contact us to set up supply."
      />
    </>
  );
}
