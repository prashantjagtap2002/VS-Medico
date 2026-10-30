import type { Metadata } from 'next';
import { CheckCircle2 } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { CtaBand, PageHeader, SectionHead } from '@/components/PageSections';
import { COMPANY_INFO } from '@/data/companyData';
import { BUYER_DOCUMENTS, COMPLIANCE_FRAMEWORK, COMPLIANCE_GROUPS, SPECIALISED_COMPLIANCE } from '@/data/siteContent';

export const metadata: Metadata = pageMetadata({
  title: 'Licences, Certifications & Compliance',
  description:
    'FDA Maharashtra Form 20B/21B drug licences, GST registration, WHO-GDP cold chain practices and batch traceability at VS Medico LLP, Mumbai.',
  path: '/compliance',
});

export default function CompliancePage() {
  const { licenses } = COMPANY_INFO;
  const registrations = [
    { label: 'Drug Licence (Form 20B)', value: licenses.drugLicense20B },
    { label: 'Drug Licence (Form 21B)', value: licenses.drugLicense21B },
    { label: 'GSTIN', value: licenses.gstin },
    { label: 'PAN', value: licenses.pan },
    { label: 'FSSAI Licence', value: licenses.fssaiNo },
    { label: 'Issuing Authority', value: licenses.issuingAuthority },
  ];

  return (
    <>
      <PageHeader title="Certifications & Compliance">
        Full compliance with drug licensing, storage and tax regulations, ensuring safety, quality and regulatory
        adherence on every order we supply.
      </PageHeader>

      <section className="section bg-alt">
        <div className="container">
          <div className="grid-3">
            {COMPLIANCE_GROUPS.map((group) => (
              <div key={group.title} className="card">
                <h3 className="mb-5!">{group.title}</h3>
                <ul className="check-list">
                  {group.items.map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={17} aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <SectionHead title="Comprehensive Compliance Framework" />
          <div className="grid-2 gap-x-16">
            {[COMPLIANCE_FRAMEWORK.regulatory, COMPLIANCE_FRAMEWORK.quality].map((group) => (
              <div key={group.title}>
                <h3 className="heading-2 mb-5">{group.title}</h3>
                <div className="grid gap-5">
                  {group.items.map((item) => (
                    <div key={item.title}>
                      <h4 className="text-[15px] mb-1">{item.title}</h4>
                      <p className="body-small">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-alt">
        <div className="container">
          <SectionHead title="Quality Assurance Commitments" />
          <div className="grid-2">
            {SPECIALISED_COMPLIANCE.map((item) => (
              <div key={item.title} className="card card-hover">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <SectionHead title="Registrations & Licence Numbers">
            Our statutory registrations, available for verification by every buyer
          </SectionHead>
          <div className="grid-3">
            {registrations.map((r) => (
              <div key={r.label} className="card card-soft text-center">
                <h3 className="text-base!">{r.label}</h3>
                <p className="font-mono text-ink! text-[15px]!">{r.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-alt">
        <div className="container">
          <SectionHead title="Documents We Need From Buyers">
            We supply licensed buyers only. These documents are verified before an account is opened.
          </SectionHead>
          <div className="grid-3">
            {BUYER_DOCUMENTS.map((d) => (
              <div key={d.title} className="card text-center">
                <h3>{d.title}</h3>
                <p>{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Compliance-Driven Pharma Supply"
        text="Every order delivered with complete regulatory adherence and documentation."
        href="/register"
        label="Open a Wholesale Account"
      />
    </>
  );
}
