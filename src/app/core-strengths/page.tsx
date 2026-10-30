import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { CtaBand, PageHeader, SectionHead } from '@/components/PageSections';
import { CAPABILITIES, CORE_STRENGTHS, SCALE_STATS, TEAMS } from '@/data/siteContent';

export const metadata: Metadata = pageMetadata({
  title: 'Core Strengths & Capabilities',
  description:
    'Single-window sourcing of 50+ brands, WHO-GDP cold chain, 5,000+ SKUs and same-day dispatch: the capabilities behind VS Medico’s pharma wholesale service.',
  path: '/core-strengths',
});

export default function CoreStrengthsPage() {
  return (
    <>
      <PageHeader title="Core Strengths & Capabilities">
        Decades of experience delivering dependable pharmaceutical supply with complete accountability and
        compliance.
      </PageHeader>

      <section className="section bg-alt">
        <div className="container">
          <div className="grid-2">
            {CORE_STRENGTHS.map((s) => (
              <div key={s.title} className="card card-hover">
                <h3 className="text-xl!">{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <SectionHead title="Our Comprehensive Capabilities" />
          <div className="grid-2 gap-x-16">
            {[CAPABILITIES.operations, CAPABILITIES.accounts].map((group) => (
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
          <SectionHead title="Scale & Capacity" />
          <div className="grid-3">
            {SCALE_STATS.map((s) => (
              <div key={s.label} className="card text-center">
                <div className="stat-value mb-1">{s.value}</div>
                <h3 className="mb-1!">{s.label}</h3>
                <p className="text-[13px]!">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <SectionHead title="Expert Professional Team">
            Dedicated teams covering every stage from order to delivery
          </SectionHead>
          <div className="grid-4">
            {TEAMS.map((t) => (
              <div key={t.title} className="card card-soft text-center">
                <h3>{t.title}</h3>
                <p className="text-[13px]!">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Experience Dependable Supply"
        text="Partner with a team that brings accountability and compliance to every order."
      />
    </>
  );
}
