import Link from 'next/link';
import { ArrowRight, Store, Hospital, Landmark, Handshake, Pill } from 'lucide-react';
import { CtaBand, SectionHead, ServiceCard } from '@/components/PageSections';
import { COMPANY_INFO, PHARMA_BRANDS } from '@/data/companyData';
import { CORE_STRENGTHS, CUSTOMER_SEGMENTS, SEGMENT_TYPES, SERVICES, type SegmentType } from '@/data/siteContent';

const SEGMENT_ICONS: Record<SegmentType, typeof Store> = {
  retail: Store,
  institutional: Hospital,
  government: Landmark,
  trade: Handshake,
};

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="section bg-white">
        <div className="container grid-split">
          <div>
            <h1 className="hero-large mb-6">Excellence in Pharmaceutical Distribution</h1>
            <p className="body-large mb-4">
              Single-window wholesale supply from 50+ leading pharma brands, from order to doorstep.
            </p>
            <p className="body-regular mb-8">
              Licensed super-stockist serving retail chemists, hospitals and nursing homes across the Mumbai
              Metropolitan Region since {COMPANY_INFO.establishedYear}, with WHO-GDP cold chain and same-day delivery.
            </p>
            <Link href="/contact" className="btn-primary">
              Request Wholesale Consultation
            </Link>
          </div>
          <div className="media-frame aspect-[4/3]">
            <img
              src="/images/warehouse.webp"
              alt="VS Medico pharmaceutical warehouse with racked stock in Bhandup West, Mumbai"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="section bg-alt">
        <div className="container">
          <SectionHead title="Comprehensive Pharma Supply Solutions">
            End-to-end wholesale distribution, from sourcing and storage to cold chain and last-mile delivery
          </SectionHead>
          <div className="grid-4">
            {SERVICES.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/services" className="btn-link">
              View All Services <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="section bg-white">
        <div className="container">
          <SectionHead title="Why Choose VS Medico">
            Decades of proven experience delivering dependable pharmaceutical supply
          </SectionHead>
          <div className="grid-3">
            {CORE_STRENGTHS.map((s) => (
              <div key={s.title} className="card card-soft card-hover">
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/core-strengths" className="btn-primary">
              Explore Our Capabilities
            </Link>
          </div>
        </div>
      </section>

      {/* Scale */}
      <section className="section bg-alt">
        <div className="container">
          <SectionHead title="Pharma Distribution at Scale">
            From a single strip to full hospital indents: 5,000+ active SKUs, temperature-controlled storage and
            same-day dispatch across the Mumbai Metropolitan Region.
          </SectionHead>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto">
            <div className="stat">
              <div className="stat-value">5,000+</div>
              <div className="stat-label">Active SKUs</div>
            </div>
            <div className="stat">
              <div className="stat-value">50+ Brands</div>
              <div className="stat-label">On a Single Invoice</div>
            </div>
            <div className="stat">
              <div className="stat-value">MMR-wide</div>
              <div className="stat-label">Same-Day Delivery</div>
            </div>
          </div>
          <div className="text-center mt-12">
            <Link href="/network" className="btn-primary">
              View Delivery Network
            </Link>
          </div>
        </div>
      </section>

      {/* Customers */}
      <section className="section bg-white">
        <div className="container">
          <SectionHead
            title={
              <>
                <span className="accent-teal">Trusted By</span> <span className="accent">Chemists &amp; Hospitals</span>
              </>
            }
          >
            Supplying {COMPANY_INFO.businessProfile.activeClients.toLowerCase()}, from neighbourhood pharmacies to
            multispecialty hospitals and public institutions.
          </SectionHead>
          <div className="grid-4 grid-segments">
            {CUSTOMER_SEGMENTS.map((seg) => {
              const type = SEGMENT_TYPES[seg.type];
              const Icon = SEGMENT_ICONS[seg.type];
              return (
                <div key={seg.short} className="segment-card">
                  <span className="segment-icon" style={{ background: type.bg, color: type.color }}>
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <strong style={{ color: type.color }}>{seg.short}</strong>
                  <span>{seg.name}</span>
                </div>
              );
            })}
          </div>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8 text-xs text-ink-soft">
            {Object.entries(SEGMENT_TYPES).map(([id, t]) => (
              <li key={id} className="flex items-center gap-2">
                <span className="legend-dot" style={{ background: t.color }} aria-hidden="true" />
                {t.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Brands */}
      <section className="section bg-alt">
        <div className="container">
          <SectionHead
            title={
              <>
                <span className="accent">Partner</span> <span className="accent-teal">Brands</span>
              </>
            }
          >
            We are proud to stock and distribute medicines from India&apos;s most trusted pharmaceutical manufacturers
          </SectionHead>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
            {PHARMA_BRANDS.map((b) => (
              <div key={b.name} className="brand-tile" title={b.category}>
                <span className="brand-mark">
                  <Pill size={14} aria-hidden="true" />
                </span>
                <strong>{b.logoText}</strong>
              </div>
            ))}
          </div>
          <p className="text-center mt-10">
            <span className="text-2xl text-teal-brand font-semibold">50+</span>{' '}
            <span className="text-ink-soft">Pharma brands distributed from one warehouse</span>
          </p>
        </div>
      </section>

      <CtaBand
        title="Ready to Simplify Your Pharma Purchasing?"
        text="Let’s discuss your requirements and set up dependable, compliant wholesale supply."
      />
    </>
  );
}
