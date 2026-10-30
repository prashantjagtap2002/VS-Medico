import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { pageMetadata } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import { PageHeader } from '@/components/PageSections';
import { COMPANY_INFO } from '@/data/companyData';
import { telHref } from '@/lib/forms';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Our Wholesale Sales Desk',
  description:
    'Call, WhatsApp or message VS Medico LLP, Bhandup West, Mumbai for pharma wholesale rates, new chemist accounts, hospital supply contracts and order support.',
  path: '/contact',
});

const REASONS = [
  'Single-window supply of 50+ pharma brands',
  'More than 25 years of pharmaceutical wholesale experience',
  'FDA-licensed with full batch traceability',
  'WHO-GDP cold chain for insulins and vaccines',
  'Same-day delivery across the Mumbai MMR',
];

export default function ContactPage() {
  const { contact, address } = COMPANY_INFO;
  const rows = [
    {
      icon: Mail,
      label: 'Email',
      body: (
        <a href={`mailto:${contact.emailSales}`} className="hover:text-teal-brand">
          {contact.emailSales}
        </a>
      ),
    },
    {
      icon: Phone,
      label: 'Phone',
      body: (
        <>
          <a href={telHref(contact.phoneSales)} className="hover:text-teal-brand">
            {contact.phoneSales}
          </a>{' '}
          (Sales) ·{' '}
          <a href={telHref(contact.phoneOffice)} className="hover:text-teal-brand">
            {contact.phoneOffice}
          </a>{' '}
          (Office)
        </>
      ),
    },
    { icon: MapPin, label: 'Location', body: <>{address.fullAddress}, India</> },
    { icon: Clock, label: 'Working Hours', body: <>{contact.workingHours}. Sunday: {contact.sundayStatus}</> },
  ];

  return (
    <>
      <PageHeader title="Get in Touch">
        Ready to discuss your pharmacy or hospital supply? Contact our wholesale team for rates, availability and
        account opening.
      </PageHeader>

      <section className="section bg-alt">
        <div className="container grid gap-12 min-[961px]:grid-cols-2 items-start">
          <ContactForm />

          <div>
            <h2 className="heading-2 mb-6">Contact Information</h2>
            <ul className="grid gap-6 mb-10">
              {rows.map(({ icon: Icon, label, body }) => (
                <li key={label} className="flex gap-4">
                  <Icon size={20} className="text-teal-brand shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <p className="text-[15px] mb-0.5">{label}</p>
                    <p className="body-small">{body}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="card">
              <h3 className="heading-3 mb-4">Why Choose VS Medico?</h3>
              <ul className="dash-list">
                {REASONS.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          <div className="section-head">
            <h2>
              <span className="accent-teal">Warehouse</span> <span className="accent">Location</span>
            </h2>
            <p>
              Visit our distribution hub in {address.locality}, {address.city}
            </p>
          </div>
          <GoogleMapEmbed />
        </div>
      </section>

      <section className="section bg-alt">
        <div className="container text-center max-w-3xl">
          <h2 className="heading-1 mb-4">Serving the Mumbai Metropolitan Region</h2>
          <p className="body-regular">
            {COMPANY_INFO.legalName} delivers genuine medicines to licensed chemists, hospitals and institutions from
            Bhandup and Mulund to Thane, Powai, Ghatkopar, Kurla, Dadar, the Western Suburbs and Navi Mumbai, with
            same-day dispatch for orders received before 2 PM.
          </p>
        </div>
      </section>
    </>
  );
}
