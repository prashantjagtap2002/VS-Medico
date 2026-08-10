"use client";

import React from 'react';
import { COMPANY_INFO } from '@/data/companyData';
import { useQuoteBasket } from './QuoteBasketContext';
import { Phone, MessageCircle, ShoppingBag } from 'lucide-react';

export default function MobileNav() {
  const { totalItems, setIsModalOpen } = useQuoteBasket();

  return (
    <div className="mobile-sticky-bar md:hidden">
      <div className="mobile-sticky-grid">
        <a
          href={`tel:${COMPANY_INFO.contact.phoneSales}`}
          className="btn btn-outline text-xs py-2 px-1 flex-col gap-0.5 justify-center"
        >
          <Phone size={16} className="text-primary" />
          <span>Call Sales</span>
        </a>

        <a
          href={`https://wa.me/${COMPANY_INFO.contact.whatsappRaw}?text=Hello%20VS%20Medico,%20I%20want%20to%20inquire%20about%20pharma%20wholesale%20rates.`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-whatsapp text-xs py-2 px-1 flex-col gap-0.5 justify-center"
        >
          <MessageCircle size={16} />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-secondary text-xs py-2 px-1 flex-col gap-0.5 justify-center relative"
        >
          <ShoppingBag size={16} />
          <span>Quote Basket ({totalItems})</span>
        </button>
      </div>
    </div>
  );
}
