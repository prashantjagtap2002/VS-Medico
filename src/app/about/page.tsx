import type { Metadata } from 'next';
import Link from 'next/link';
import { Briefcase } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { PageHeader, SectionHead } from '@/components/PageSections';
import { COMPANY_INFO, LEADERSHIP_TEAM } from '@/data/companyData';
import { DIFFERENTIATORS, PROCESS_STEPS } from '@/data/siteContent';

export const metadata: Metadata = pageMetadata({
  title: 'About Us — Pharma Wholesale Since 1998',
  description:
    'VS Medico LLP has supplied genuine medicines to 1,200+ chemists and hospitals across Mumbai MMR since 1998 from its WHO-GDP compliant warehouse in Bhandup West.',
  path: '/about',
});

/** Photos for team members, keyed by initials. Members without one show their initials. */
const TEAM_PHOTOS: Record<string, string> = { VS: '/images/founder.webp' };

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About VS Medico">
        {COMPANY_INFO.legalName} is an authorised super-stockist and pharmaceutical wholesale distributor providing
        single-window supply to retail chemists, hospitals, nursing homes and institutions across the Mumbai
        Metropolitan Region.
      </PageHeader>

      <section className="section bg-alt">
        <div className="container grid-split">
          <div className="media-frame aspect-[4/3]">
            <img src="/images/warehouse.webp" alt="Inside the VS Medico warehouse in Bhandup West" loading="lazy" />
          </div>
          <div>
            <h2 className="heading-1 mb-4">Our Mission</h2>
            <p className="body-large mb-8">
              To make genuine medicines reliably available to every licensed chemist and hospital we serve, sourced
              factory-direct, stored to WHO-GDP practices and delivered the same day, while staying fully compliant
              with statutory and quality requirements.
            </p>
            <h3 className="heading-2 mb-3">Corporate Commitment</h3>
            <p className="body-regular">
              Committed to transparent pricing, batch-level traceability and dependable service that helps our
              customers keep patients supplied, every single day since {COMPANY_INFO.establishedYear}.
            </p>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <SectionHead title="Order-to-Delivery Model">
            A structured process that keeps every order accurate, compliant and on time
          </SectionHead>
          <div className="grid-3">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.title} className="card card-soft step-card">
                <span className="step-num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-alt">
        <div className="container">
          <SectionHead title="What Sets Us Apart" />
          <div className="grid-2 gap-x-16 gap-y-12">
            {DIFFERENTIATORS.map((d) => (
              <div key={d.title}>
                <h3 className="heading-2 mb-3">{d.title}</h3>
                <p className="body-regular">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <SectionHead title={<span className="accent">Leadership Team</span>}>
            Experienced leaders driving dependable pharmaceutical distribution across Mumbai
          </SectionHead>
          <div className="grid-4">
            {LEADERSHIP_TEAM.map((m) => (
              <article key={m.name} className="leader-card">
                <div className="leader-photo">
                  {TEAM_PHOTOS[m.initials] ? (
                    <img src={TEAM_PHOTOS[m.initials]} alt={`${m.name}, ${m.role}`} loading="lazy" />
                  ) : (
                    <span className="leader-initials" aria-hidden="true">
                      {m.initials}
                    </span>
                  )}
                  <div className="leader-overlay">
                    <h3>{m.name}</h3>
                    <p>{m.role}</p>
                  </div>
                </div>
                <div className="leader-body">
                  <div>
                    <p className="leader-label">
                      <Briefcase size={13} aria-hidden="true" /> Responsibility
                    </p>
                    <p className="body-small">{m.bio}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="quiet-cta bg-alt">
        <div className="container">
          <h2>Partner With VS Medico</h2>
          <p>Let&apos;s discuss how we can support your pharmacy or hospital with dependable, compliant supply.</p>
          <Link href="/contact" className="btn-primary">
            Request Wholesale Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
