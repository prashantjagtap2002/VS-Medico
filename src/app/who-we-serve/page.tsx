import type { Metadata } from 'next';
import { Store, Hospital, FlaskConical } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import { CtaBand, PageHeader, SectionHead } from '@/components/PageSections';
import { AUDIENCE_LEVELS, INSTITUTION_GROUPS, SPECIAL_REQUIREMENTS, TRADE_PARTNERS } from '@/data/siteContent';

export const metadata: Metadata = pageMetadata({
  title: 'Who We Serve — Chemists, Hospitals & Institutions',
  description:
    'VS Medico supplies retail chemists, pharmacy chains, hospitals, nursing homes, clinics, diagnostic labs, sub-stockists and government buyers across Mumbai MMR.',
  path: '/who-we-serve',
});

const LEVEL_ICONS = [Store, Hospital, FlaskConical];

export default function WhoWeServePage() {
  return (
    <>
      <PageHeader title="Customers We Supply">
        From neighbourhood medical stores to multispecialty hospitals, with complete wholesale coverage for every kind
        of licensed healthcare buyer.
      </PageHeader>

      {AUDIENCE_LEVELS.map((level, i) => {
        const Icon = LEVEL_ICONS[i];
        const imageFirst = i % 2 === 0;
        return (
          <section key={level.title} className={`section ${imageFirst ? 'bg-alt' : 'bg-white'}`}>
            <div className="container grid-split">
              <div className={`media-frame relative aspect-[16/10] ${imageFirst ? '' : 'min-[961px]:order-2'}`}>
                {level.image ? (
                  <img src={level.image} alt="" loading="lazy" />
                ) : (
                  <div className="service-art">
                    <Icon size={88} strokeWidth={1.1} aria-hidden="true" />
                  </div>
                )}
              </div>
              <div>
                <h2 className="heading-1 mb-2">{level.title}</h2>
                <p className="body-regular mb-5">{level.subtitle}</p>
                <ul className="dash-list">
                  {level.points.map((p) => (
                    <li key={p} className="text-ink!">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );
      })}

      <section className="section bg-white">
        <div className="container">
          <SectionHead title="Specialised Requirements">Products that need specialised handling or priority supply</SectionHead>
          <div className="grid-3">
            {SPECIAL_REQUIREMENTS.map((r) => (
              <div key={r} className="tile">
                {r}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-alt">
        <div className="container">
          <SectionHead title="Institutional Buyers">
            Scheduled and contract supply for private, public and charitable healthcare institutions
          </SectionHead>
          <div className="grid-2 gap-x-16">
            {INSTITUTION_GROUPS.map((g) => (
              <div key={g.title}>
                <h3 className="heading-2 mb-4">{g.title}</h3>
                <ul className="dash-list">
                  {g.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <SectionHead title="Trade Partners">Trade-to-trade supply for licensed partners</SectionHead>
          <div className="grid-3">
            {TRADE_PARTNERS.map((t) => (
              <div key={t.title} className="card card-soft">
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Your Reliable Supply Starts Here"
        text="Tell us what you need and we’ll set up an account that fits your business."
      />
    </>
  );
}
