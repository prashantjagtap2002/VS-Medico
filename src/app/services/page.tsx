import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { CtaBand, PageHeader, SectionHead, ServiceCard } from '@/components/PageSections';
import { SERVICES, SERVICE_PORTFOLIO, THERAPEUTIC_SEGMENTS } from '@/data/siteContent';

export const metadata: Metadata = pageMetadata({
  title: 'Wholesale Pharma Distribution Services',
  description:
    'Wholesale distribution, 2–8°C cold chain logistics, hospital & institutional supply and same-day MMR delivery from VS Medico LLP, Bhandup West, Mumbai.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader title="Comprehensive Pharma Supply Solutions">
        End-to-end pharmaceutical wholesale covering sourcing, licensed storage, cold chain management, consolidated
        billing, same-day delivery and complete compliance documentation.
      </PageHeader>

      <section className="section bg-alt">
        <div className="container">
          <div className="grid-4">
            {SERVICES.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <SectionHead title="End-to-End Service Portfolio" />
          <div className="grid-2 gap-x-16 gap-y-10">
            {SERVICE_PORTFOLIO.map((group) => (
              <div key={group.title}>
                <h3 className="heading-2 mb-3">{group.title}</h3>
                <ul className="dash-list">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-alt">
        <div className="container">
          <SectionHead title="Therapeutic Segments We Stock">
            Deep inventory across every major therapy area, available on a single consolidated order
          </SectionHead>
          <div className="grid-3">
            {THERAPEUTIC_SEGMENTS.map((seg) => (
              <div key={seg} className="tile">
                {seg}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to Streamline Your Medicine Supply?"
        text="Discuss your stock requirements with our wholesale sales team."
      />
    </>
  );
}
