import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import ColdChainTracker from '@/components/ColdChainTracker';
import ProductCatalog from '@/components/ProductCatalog';
import BrandsGrid from '@/components/BrandsGrid';
import CompetitiveAdvantage from '@/components/CompetitiveAdvantage';
import FaqSection from '@/components/FaqSection';
import { OpenQuoteButton } from '@/components/ModalTriggers';
import Reveal from '@/components/Reveal';
import { jsonLd } from '@/lib/security';
import Link from 'next/link';
import { COMPANY_INFO, FAQS } from '@/data/companyData';
import { getFeaturedProducts } from '@/data/products';
import { Building2, ShieldCheck, Snowflake, Truck, FileText, UserPlus } from 'lucide-react';

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

export default function Home() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqJsonLd)} />

      {/* Hero Section */}
      <Hero />

      {/* Trust & Compliance Bar */}
      <TrustBar />

      {/* Why Choose VS Medico Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <Reveal className="section-header">
            <span className="section-subtitle">THE VS MEDICO ADVANTAGE</span>
            <h2 className="section-title">Reliable B2B Supply Chain Partner</h2>
            <p className="section-desc">
              For over 25 years, VS Medico has operated as a foundational link in Mumbai's healthcare ecosystem, ensuring retail pharmacies and hospitals receive genuine medications on time.
            </p>
          </Reveal>

          <div className="grid-4">
            {COMPANY_INFO.valuePropositions.map((vp, idx) => (
              <Reveal key={vp.title} className="feature-card" delay={idx * 90}>
                <div className="feature-icon">
                  {idx === 0 && <Building2 size={28} aria-hidden="true" />}
                  {idx === 1 && <ShieldCheck size={28} aria-hidden="true" />}
                  {idx === 2 && <Snowflake size={28} aria-hidden="true" />}
                  {idx === 3 && <Truck size={28} aria-hidden="true" />}
                </div>
                <h3>{vp.title}</h3>
                <p>{vp.desc}</p>
              </Reveal>
            ))}
          </div>

          {/* WHO-GDP Cold Storage Telemetry Dashboard */}
          <ColdChainTracker />
        </div>
      </section>

      {/* Competitive Distributor Edge vs Manufacturers & Traders */}
      <CompetitiveAdvantage />

      {/* Featured Products Showcase */}
      <ProductCatalog products={getFeaturedProducts(6)} showTitle hideControls limit={6} />

      {/* Brands We Deal In */}
      <BrandsGrid limit={10} />

      {/* Frequently Asked Questions (FAQs) */}
      <FaqSection />

      {/* Quick B2B Banner CTA */}
      <section className="b2b-cta-banner">
        <div className="container">
          <Reveal className="b2b-cta-content">
            <div>
              <span className="inline-block text-xs font-bold text-sky-400 uppercase tracking-widest bg-sky-950/80 px-4 py-1.5 rounded-full border border-sky-800 mb-4">
                B2B REGISTERED CHEMISTS & HOSPITALS ONLY
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-heading mb-3 text-white">
                Ready to Order Wholesale Medicines?
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl leading-relaxed">
                Get instant net PTR rates, stock availability, and same-day delivery confirmation from our Bhandup sales desk.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 shrink-0">
              <OpenQuoteButton className="btn btn-secondary btn-lg">
                <FileText size={20} aria-hidden="true" />
                <span>Request B2B Rate Card</span>
              </OpenQuoteButton>
              <Link href="/register" className="btn btn-white btn-lg">
                <UserPlus size={20} aria-hidden="true" />
                <span>Open an Account</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
