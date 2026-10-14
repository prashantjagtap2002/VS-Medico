"use client";

import React from 'react';
import { Check, Plus } from 'lucide-react';
import type { ProductItem } from '@/data/companyData';
import { useQuoteBasket } from './QuoteBasketContext';

export default function AddToBasketButton({ product, className = '' }: { product: ProductItem; className?: string }) {
  const { addToBasket, basket } = useQuoteBasket();
  const added = basket.some((item) => item.id === product.id);

  return (
    <button
      type="button"
      onClick={() => addToBasket(product)}
      className={`btn ${added ? 'btn-secondary' : 'btn-primary'} ${className}`}
    >
      {added ? <Check size={18} aria-hidden="true" /> : <Plus size={18} aria-hidden="true" />}
      <span>{added ? 'In Quote Basket · Add More' : 'Add to Wholesale Inquiry'}</span>
    </button>
  );
}
