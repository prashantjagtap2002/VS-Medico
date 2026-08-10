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
        <div style={{ maxWidth: '680px', marginBottom: '3rem' }}>
          <span className="text-secondary font-bold text-sm tracking-wider uppercase">GET IN TOUCH</span>
          <h1 className="font-heading font-extrabold text-4xl text-primary mt-2 mb-3">
            Contact VS Medico Sales & Support Desk
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Reach out to our Bhandup warehouse desk for wholesale price quotes, new chemist store account opening, hospital rate contracts, or order tracking.
          </p>
        </div>

        {/* Contact Info Cards - Horizontal row with icon left, text right */}
        <div className="grid-2" style={{ marginBottom: '3.5rem' }}>
          {/* Office Address */}
          <div className="contact-card">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-sky-100 text-secondary flex items-center justify-center shrink-0">
                <MapPin size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 className="font-bold text-primary text-sm mb-1">Registered Warehouse</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{COMPANY_INFO.address.fullAddress}</p>
                <a href={COMPANY_INFO.address.mapDirectionsUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-secondary font-bold hover:underline flex items-center gap-1 mt-1.5">
                  <Navigation size={11} /> Open in Google Maps
                </a>
              </div>
            </div>
          </div>

          {/* Sales Phone */}
          <div className="contact-card">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Phone size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 className="font-bold text-primary text-sm mb-1">Sales Helpline</h3>
                <div className="font-bold text-slate-800 text-base">{COMPANY_INFO.contact.phoneSales}</div>
                <p className="text-xs text-slate-500">Landline: {COMPANY_INFO.contact.phoneOffice}</p>
              </div>
            </div>
          </div>

          {/* Email Support */}
          <div className="contact-card">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <Mail size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 className="font-bold text-primary text-sm mb-1">Email Desk</h3>
                <div className="font-bold text-slate-800 text-sm">{COMPANY_INFO.contact.emailSales}</div>
                <p className="text-xs text-slate-500">General: {COMPANY_INFO.contact.emailInfo}</p>
              </div>
            </div>
          </div>

          {/* Working Hours & WhatsApp */}
          <div className="contact-card">
            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Clock size={22} />
              </div>
              <div style={{ flex: 1 }}>
                <h3 className="font-bold text-primary text-sm mb-1">Working Hours</h3>
                <p className="text-sm text-slate-600">{COMPANY_INFO.contact.workingHours}</p>
                <p className="text-xs text-amber-700 font-semibold">{COMPANY_INFO.contact.sundayStatus}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form + Map side by side */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem', alignItems: 'start', marginBottom: '4rem' }}>
          <ContactForm />
          <GoogleMapEmbed />
        </div>
      </div>
    </div>
  );
}
