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
    <div className="py-12">
      <div className="container">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-secondary font-bold text-sm tracking-wider uppercase">GET IN TOUCH</span>
          <h1 className="font-heading font-extrabold text-4xl text-primary mt-1 mb-3">
            Contact VS Medico Sales & Support Desk
          </h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            Reach out to our Bhandup warehouse desk for wholesale price quotes, new chemist store account opening, hospital rate contracts, or order tracking.
          </p>
        </div>

        {/* Contact Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Office Address */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-sky-100 text-secondary flex items-center justify-center mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="font-bold text-primary text-lg mb-2">Registered Warehouse</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {COMPANY_INFO.address.fullAddress}
              </p>
            </div>
            <a
              href={COMPANY_INFO.address.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-secondary font-bold hover:underline flex items-center gap-1"
            >
              <Navigation size={13} />
              <span>Open in Google Maps</span>
            </a>
          </div>

          {/* Sales Phone */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                <Phone size={24} />
              </div>
              <h3 className="font-bold text-primary text-lg mb-2">Sales Helpline</h3>
              <p className="text-xs text-slate-500 mb-1">Direct Wholesale Sales Desk:</p>
              <div className="font-bold text-slate-800 text-base mb-2">{COMPANY_INFO.contact.phoneSales}</div>
              <p className="text-xs text-slate-500 mb-1">Landline Office:</p>
              <div className="font-semibold text-slate-700 text-sm">{COMPANY_INFO.contact.phoneOffice}</div>
            </div>
            <a
              href={`tel:${COMPANY_INFO.contact.phoneSales}`}
              className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1 mt-4"
            >
              <Phone size={13} />
              <span>Call Sales Desk Now</span>
            </a>
          </div>

          {/* Email Support */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
                <Mail size={24} />
              </div>
              <h3 className="font-bold text-primary text-lg mb-2">Email Desk</h3>
              <p className="text-xs text-slate-500 mb-1">Wholesale Quotes:</p>
              <div className="font-bold text-slate-800 text-sm mb-2">{COMPANY_INFO.contact.emailSales}</div>
              <p className="text-xs text-slate-500 mb-1">General Inquiries:</p>
              <div className="font-semibold text-slate-700 text-sm">{COMPANY_INFO.contact.emailInfo}</div>
            </div>
            <a
              href={`mailto:${COMPANY_INFO.contact.emailSales}`}
              className="text-xs text-purple-700 font-bold hover:underline flex items-center gap-1 mt-4"
            >
              <Mail size={13} />
              <span>Send Email Message</span>
            </a>
          </div>

          {/* Working Hours & WhatsApp */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <Clock size={24} />
              </div>
              <h3 className="font-bold text-primary text-lg mb-2">Working Hours</h3>
              <p className="text-xs text-slate-600 mb-2">
                {COMPANY_INFO.contact.workingHours}
              </p>
              <div className="p-2 bg-amber-50 rounded-lg border border-amber-100 text-[11px] text-amber-800 leading-tight">
                {COMPANY_INFO.contact.sundayStatus}
              </div>
            </div>
            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsappRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp text-xs py-2 mt-4 justify-center"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Direct</span>
            </a>
          </div>
        </div>

        {/* Contact Form & Google Map Side-by-Side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <ContactForm />
          <GoogleMapEmbed />
        </div>
      </div>
    </div>
  );
}
