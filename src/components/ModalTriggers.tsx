"use client";

import React, { ReactNode } from 'react';
import { useQuoteBasket } from './QuoteBasketContext';

interface TriggerProps {
  className?: string;
  children: ReactNode;
}

/** Opens the bulk quote / inquiry basket modal. Lets server components render the CTA. */
export function OpenQuoteButton({ className, children }: TriggerProps) {
  const { setIsModalOpen } = useQuoteBasket();
  return (
    <button type="button" onClick={() => setIsModalOpen(true)} className={className}>
      {children}
    </button>
  );
}

/** Opens the FDA licence & GST verification modal. */
export function OpenLicenseButton({ className, children }: TriggerProps) {
  const { setIsLicenseModalOpen } = useQuoteBasket();
  return (
    <button type="button" onClick={() => setIsLicenseModalOpen(true)} className={className}>
      {children}
    </button>
  );
}
