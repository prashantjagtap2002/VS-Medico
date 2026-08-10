"use client";

import React from 'react';
import { COMPANY_INFO } from '@/data/companyData';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppWidget() {
  return (
    <a
      href={`https://wa.me/${COMPANY_INFO.contact.whatsappRaw}?text=Hello%20VS%20Medico,%20I%20would%20like%20to%20inquire%20about%20pharmaceutical%20wholesale%20rates.`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-widget"
      aria-label="Chat with VS Medico on WhatsApp"
      title="Chat on WhatsApp"
    >
      <MessageCircle size={26} />
    </a>
  );
}
