"use client";

import React from 'react';
import ContactForm from '@/components/ContactForm';
import GoogleMapEmbed from '@/components/GoogleMapEmbed';
import { COMPANY_INFO } from '@/data/companyData';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Navigation
} from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="py-16">
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 3.5rem auto' }}>
          <span className="text-secondary font-bold text-sm tracking-wider uppercase">GET IN TOUCH</span>
          <h1 className="font-heading font-extrabold text-4xl text-primary mt-2 mb-3">
            Contact VS Medico Sales & Support Desk
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Reach out to our Bhandup warehouse desk for wholesale price quotes, new chemist store account opening, hospital rate contracts, or order tracking.
          </p>
        </div>

        {/* Contact Details - 2x2 Grid for breathing room */}
        <div className="grid-2 mb-16">
          {/* Office Address */}
          <div className="contact-card">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-secondary flex items-center justify-center shrink-0">
                <MapPin size={24} />
              </div>
              <div className="flex flex-col gap-1" style={{ flex: 1 }}>
                <h3 className="font-bold text-primary text-base">Registered Warehouse</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {COMPANY_INFO.address.fullAddress}
                </p>
                <a
                  href={COMPANY_INFO.address.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-secondary font-bold hover:underline flex items-center gap-1 mt-1"
                >
                  <Navigation size={12} />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>
          </div>

          {/* Sales Phone */}
          <div className="contact-card">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Phone size={24} />
              </div>
              <div className="flex flex-col gap-1" style={{ flex: 1 }}>
                <h3 className="font-bold text-primary text-base">Sales Helpline</h3>
                <div className="font-bold text-slate-800 text-lg">{COMPANY_INFO.contact.phoneSales}</div>
                <p className="text-xs text-slate-500">Landline: {COMPANY_INFO.contact.phoneOffice}</p>
                <a
                  href={`tel:${COMPANY_INFO.contact.phoneSales}`}
                  className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1 mt-1"
                >
                  <Phone size={12} />
                  <span>Call Sales Desk Now</span>
                </a>
              </div>
            </div>
          </div>

          {/* Email Support */}
          <div className="contact-card">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <Mail size={24} />
              </div>
              <div className="flex flex-col gap-1" style={{ flex: 1 }}>
                <h3 className="font-bold text-primary text-base">Email Desk</h3>
                <div className="font-bold text-slate-800 text-sm">{COMPANY_INFO.contact.emailSales}</div>
                <p className="text-xs text-slate-500">General: {COMPANY_INFO.contact.emailInfo}</p>
                <a
                  href={`mailto:${COMPANY_INFO.contact.emailSales}`}
                  className="text-xs text-purple-700 font-bold hover:underline flex items-center gap-1 mt-1"
                >
                  <Mail size={12} />
                  <span>Send Email Message</span>
                </a>
              </div>
            </div>
          </div>

          {/* Working Hours & WhatsApp */}
          <div className="contact-card">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Clock size={24} />
              </div>
              <div className="flex flex-col gap-1" style={{ flex: 1 }}>
                <h3 className="font-bold text-primary text-base">Working Hours</h3>
                <p className="text-sm text-slate-600">{COMPANY_INFO.contact.workingHours}</p>
                <p className="text-xs text-amber-700 font-semibold">{COMPANY_INFO.contact.sundayStatus}</p>
                <a
                  href={`https://wa.me/${COMPANY_INFO.contact.whatsappRaw}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp text-xs py-2 mt-2 justify-center"
                  style={{ maxWidth: '200px' }}
                >
                  <MessageCircle size={14} />
                  <span>WhatsApp Direct</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form - Full Width */}
        <div className="mb-16">
          <ContactForm />
        </div>

        {/* Google Map - Full Width */}
        <GoogleMapEmbed />
      </div>
    </div>
  );
}
