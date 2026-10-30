import type { Metadata } from 'next';
import { CheckCircle2, MapPin, Phone, Mail, UserRound } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import PrintButton from '@/components/PrintButton';
import { LogoMark } from '@/components/Logo';
import { COMPANY_INFO, LEADERSHIP_TEAM, PRODUCT_CATEGORIES } from '@/data/companyData';
import { CUSTOMER_SEGMENTS, SERVICES, THERAPEUTIC_SEGMENTS } from '@/data/siteContent';
import { telHref } from '@/lib/forms';

export const metadata: Metadata = pageMetadata({
  title: 'Company Profile',
  description:
    'Download the VS Medico LLP company profile: services, product categories, leadership, customers, licences and contact details.',
  path: '/company-profile',
});

export default function CompanyProfilePage() {
  const { contact, address, licenses } = COMPANY_INFO;
  const highlights = [
    { value: '25+', label: 'Years in Pharma Trade' },
    { value: '5,000+', label: 'Active SKUs' },
    { value: '50+', label: 'Pharma Brands' },
    { value: '1,200+', label: 'Registered Buyers' },
  ];
  const badges = ['Form 20B', 'Form 21B', 'FDA Maharashtra', 'WHO-GDP', 'GST', 'FSSAI'];
  const categories = PRODUCT_CATEGORIES.filter((c) => c.id !== 'all');

  return (
    <section className="section bg-white">
      <div className="container">
        <div className="profile-sheet">
          <div className="flex justify-end mb-6">
            <PrintButton />
          </div>

          <header className="profile-title">
            <div className="flex justify-center mb-3">
              <LogoMark className="w-16 h-16" />
            </div>
            <h1>{COMPANY_INFO.legalName.toUpperCase()}</h1>
            <p>{COMPANY_INFO.tagline}</p>
          </header>

          <div className="profile-section">
            <h2>Company Overview</h2>
            <p className="body-regular mb-3">
              {COMPANY_INFO.legalName} is an {COMPANY_INFO.businessProfile.role.toLowerCase()} based in{' '}
              {address.locality}, {address.city}. Since {COMPANY_INFO.establishedYear} we have supplied genuine
              medicines from 50+ leading manufacturers to retail chemists, hospitals, nursing homes and institutions
              across the Mumbai Metropolitan Region.
            </p>
            <p className="body-regular">{COMPANY_INFO.businessProfile.temperatureControlledArea}.</p>
          </div>

          <div className="profile-section">
            <h2>Key Highlights</h2>
            <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
              {highlights.map((h) => (
                <div key={h.label} className="profile-highlight">
                  <strong>{h.value}</strong>
                  <span>{h.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="profile-section">
            <h2>Our Services</h2>
            <div className="grid gap-3 md:grid-cols-2">
              {SERVICES.map((s, i) => (
                <div key={s.id} className={`profile-service${i % 3 === 0 ? '' : ' alt'}`}>
                  <h3>{s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="profile-section">
            <h2>Product Categories ({categories.length}) &amp; Therapy Areas ({THERAPEUTIC_SEGMENTS.length})</h2>
            <ul className="grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {[...categories.map((c) => c.name), ...THERAPEUTIC_SEGMENTS].map((name) => (
                <li key={name} className="flex items-center gap-2 text-[13px] bg-[#f8f9fa] rounded px-3 py-2">
                  <CheckCircle2 size={14} className="text-teal-brand shrink-0" aria-hidden="true" />
                  {name}
                </li>
              ))}
            </ul>
          </div>

          <div className="profile-section">
            <h2>Leadership Team</h2>
            <div className="grid gap-3 grid-cols-2 md:grid-cols-4">
              {LEADERSHIP_TEAM.map((m) => (
                <div key={m.name} className="profile-highlight">
                  <span className="mx-auto mb-2 w-12 h-12 rounded-full bg-teal-brand text-white flex items-center justify-center">
                    <UserRound size={22} aria-hidden="true" />
                  </span>
                  <strong className="text-[15px]! text-ink! font-medium!">{m.name}</strong>
                  <span className="text-orange-brand-dark!">{m.role}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="profile-section">
            <h2>Customers We Serve</h2>
            <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
              {CUSTOMER_SEGMENTS.map((s) => (
                <li key={s.short} className="text-[13px] border-l-2 border-teal-brand bg-[#f8f9fa] px-3 py-2">
                  {s.name}
                </li>
              ))}
            </ul>
          </div>

          <div className="profile-section">
            <h2>Compliance &amp; Registrations</h2>
            <div className="flex flex-wrap gap-2 mb-4">
              {badges.map((b) => (
                <span key={b} className="profile-pill">
                  {b}
                </span>
              ))}
            </div>
            <p className="body-small">
              Drug Licences: {licenses.drugLicense20B} (20B) · {licenses.drugLicense21B} (21B) · GSTIN: {licenses.gstin}
            </p>
          </div>

          <div className="profile-section profile-contact">
            <h2 className="text-white! border-0! text-center mb-5!">Contact Us</h2>
            <div className="grid gap-5 md:grid-cols-3 text-sm">
              <p className="flex gap-2">
                <MapPin size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
                {address.fullAddress}
              </p>
              <p className="flex gap-2">
                <Phone size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
                <a href={telHref(contact.phoneSales)}>{contact.phoneSales}</a>
              </p>
              <p className="flex gap-2">
                <Mail size={16} className="shrink-0 mt-0.5" aria-hidden="true" />
                <a href={`mailto:${contact.emailSales}`}>{contact.emailSales}</a>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-ink-soft">
            © {new Date().getFullYear()} {COMPANY_INFO.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
