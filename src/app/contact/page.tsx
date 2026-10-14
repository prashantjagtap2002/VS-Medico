import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import { COMPANY_INFO } from '@/data/companyData';
import { telHref } from '@/lib/forms';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Navigation
} from 'lucide-react';

export const metadata: Metadata = pageMetadata({
  title: 'Contact Our Wholesale Sales Desk',
  description:
    'Call, WhatsApp or message VS Medico LLP, Bhandup West, Mumbai for pharma wholesale rates, new chemist accounts, hospital supply contracts and order support.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="container">
        {/* Header */}
        <div className="max-w-2xl mb-10">
          <span className="text-secondary font-bold text-sm tracking-wider uppercase">GET IN TOUCH</span>
          <h1 className="font-heading font-extrabold text-4xl text-primary mt-2 mb-3">
            Contact VS Medico Sales & Support Desk
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Reach out to our Bhandup warehouse desk for wholesale price quotes, new chemist store account opening, hospital rate contracts, or order tracking.
          </p>
        </div>

        {/* Contact Info Cards - Horizontal row with icon left, text right */}
        <div className="grid-2 mb-10">
          {/* Office Address */}
          <div className="contact-card h-full">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-sky-100 text-secondary flex items-center justify-center shrink-0">
                <MapPin size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <h2 className="font-bold text-primary text-sm mb-1">Registered Warehouse</h2>
                <p className="text-sm text-slate-600 leading-relaxed">{COMPANY_INFO.address.fullAddress}</p>
                <a href={COMPANY_INFO.address.mapDirectionsUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-secondary font-bold hover:underline flex items-center gap-1 mt-1.5">
                  <Navigation size={11} /> Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Sales Phone */}
          <div className="contact-card h-full">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Phone size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <h2 className="font-bold text-primary text-sm mb-1">Sales Helpline</h2>
                <a href={telHref(COMPANY_INFO.contact.phoneSales)} className="font-bold text-slate-800 text-base hover:text-secondary">
                  {COMPANY_INFO.contact.phoneSales}
                </a>
                <p className="text-xs text-slate-500">
                  Landline:{' '}
                  <a href={telHref(COMPANY_INFO.contact.phoneOffice)} className="hover:text-secondary">
                    {COMPANY_INFO.contact.phoneOffice}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Email Support */}
          <div className="contact-card h-full">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <Mail size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <h2 className="font-bold text-primary text-sm mb-1">Email Desk</h2>
                <a href={`mailto:${COMPANY_INFO.contact.emailSales}`} className="font-bold text-slate-800 text-sm hover:text-secondary break-all">
                  {COMPANY_INFO.contact.emailSales}
                </a>
                <p className="text-xs text-slate-500">
                  General:{' '}
                  <a href={`mailto:${COMPANY_INFO.contact.emailInfo}`} className="hover:text-secondary">
                    {COMPANY_INFO.contact.emailInfo}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Working Hours & WhatsApp */}
          <div className="contact-card h-full">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Clock size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <h2 className="font-bold text-primary text-sm mb-1">Working Hours</h2>
                <p className="text-sm text-slate-600">{COMPANY_INFO.contact.workingHours}</p>
                <p className="text-xs text-amber-700 font-semibold">{COMPANY_INFO.contact.sundayStatus}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form + Map side by side */}
        <div className="contact-layout">
          <ContactForm />
          <GoogleMapEmbed />
        </div>
      </div>
    </div>
  );
}
