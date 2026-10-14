"use client";

import React, { useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useQuoteBasket } from './QuoteBasketContext';

/** Brief confirmation after adding a product, with a shortcut to the basket. */
export default function BasketToast() {
  const { lastAdded, dismissToast, setIsModalOpen, totalItems, isModalOpen } = useQuoteBasket();

  useEffect(() => {
    if (!lastAdded) return;
    const t = setTimeout(dismissToast, 4000);
    return () => clearTimeout(t);
  }, [lastAdded, dismissToast]);

  return (
    <div className="toast-region" role="status" aria-live="polite">
      {lastAdded && !isModalOpen && (
        <div key={lastAdded.key} className="toast">
          <CheckCircle2 size={20} className="text-emerald-400 shrink-0" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white truncate">Added {lastAdded.name}</p>
            <p className="text-xs text-slate-300">{totalItems} item{totalItems === 1 ? '' : 's'} in your inquiry basket</p>
          </div>
          <button
            type="button"
            onClick={() => {
              dismissToast();
              setIsModalOpen(true);
            }}
            className="toast-action"
          >
            View Basket
          </button>
          <button type="button" onClick={dismissToast} className="toast-close" aria-label="Dismiss notification">
            <X size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
