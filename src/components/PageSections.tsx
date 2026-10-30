import type { ReactNode } from 'react';
import Link from 'next/link';
import { Boxes, Snowflake, Hospital, Truck } from 'lucide-react';
import type { ServiceItem } from '@/data/siteContent';

/** Centred title band at the top of inner pages. */
export function PageHeader({ title, children }: { title: ReactNode; children?: ReactNode }) {
  return (
    <section className="page-header">
      <div className="container">
        <h1>{title}</h1>
        {children && <p>{children}</p>}
      </div>
    </section>
  );
}

export function SectionHead({ title, children }: { title: ReactNode; children?: ReactNode }) {
  return (
    <div className="section-head">
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

/** Full-width teal call-to-action band closing most pages. */
export function CtaBand({
  title,
  text,
  href = '/contact',
  label = 'Request Wholesale Consultation',
}: {
  title: string;
  text: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="cta-band">
      <div className="container">
        <h2>{title}</h2>
        <p>{text}</p>
        <Link href={href} className="btn-white">
          {label}
        </Link>
      </div>
    </section>
  );
}

const SERVICE_ICONS = { Boxes, Snowflake, Hospital, Truck };

export function ServiceCard({ service }: { service: ServiceItem }) {
  const Icon = SERVICE_ICONS[service.icon];
  return (
    <article className="service-card">
      <div className="service-media">
        {service.image ? (
          <img src={service.image} alt="" loading="lazy" decoding="async" />
        ) : (
          <div className="service-art">
            <Icon size={72} strokeWidth={1.25} aria-hidden="true" />
          </div>
        )}
      </div>
      <div className="service-body">
        <h3>{service.title}</h3>
        <p>{service.desc}</p>
      </div>
    </article>
  );
}
