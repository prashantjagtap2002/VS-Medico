"use client";

import React, { createContext, useCallback, useContext, useEffect, useState, ReactNode } from 'react';
import { ProductItem } from '@/data/companyData';

export interface BasketItem extends ProductItem {
  quantity: number;
}

interface QuoteBasketContextType {
  basket: BasketItem[];
  addToBasket: (product: ProductItem) => void;
  removeFromBasket: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearBasket: () => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  isLicenseModalOpen: boolean;
  setIsLicenseModalOpen: (open: boolean) => void;
  totalItems: number;
  /** Most recently added product, for the "added to basket" toast. */
  lastAdded: { name: string; key: number } | null;
  dismissToast: () => void;
}

const STORAGE_KEY = 'vsm-quote-basket';

/** Guards against corrupt or hand-edited localStorage data. */
function isValidBasketItem(item: unknown): item is BasketItem {
  if (!item || typeof item !== 'object') return false;
  const i = item as Record<string, unknown>;
  return (
    typeof i.id === 'string' &&
    typeof i.name === 'string' &&
    typeof i.brand === 'string' &&
    typeof i.packSize === 'string' &&
    typeof i.quantity === 'number' &&
    Number.isInteger(i.quantity) &&
    i.quantity > 0 &&
    i.quantity <= 9999
  );
}
const QuoteBasketContext = createContext<QuoteBasketContextType | undefined>(undefined);

export function QuoteBasketProvider({ children }: { children: ReactNode }) {
  const [basket, setBasket] = useState<BasketItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [lastAdded, setLastAdded] = useState<{ name: string; key: number } | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Restore the basket after hydration so server and client markup match.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) setBasket(parsed.filter(isValidBasketItem).slice(0, 200));
      }
    } catch {
      // Storage unavailable (private mode) or corrupt: start empty.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(basket));
    } catch {
      // Ignore quota / privacy-mode errors.
    }
  }, [basket, hydrated]);

  const addToBasket = useCallback((product: ProductItem) => {
    setBasket((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setLastAdded({ name: product.name, key: Date.now() });
  }, []);

  const removeFromBasket = useCallback((id: string) => {
    setBasket((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setBasket((prev) =>
      quantity <= 0
        ? prev.filter((item) => item.id !== id)
        : prev.map((item) => (item.id === id ? { ...item, quantity: Math.min(quantity, 9999) } : item))
    );
  }, []);

  const clearBasket = useCallback(() => setBasket([]), []);
  const dismissToast = useCallback(() => setLastAdded(null), []);

  return (
    <QuoteBasketContext.Provider
      value={{
        basket,
        addToBasket,
        removeFromBasket,
        updateQuantity,
        clearBasket,
        isModalOpen,
        setIsModalOpen,
        isLicenseModalOpen,
        setIsLicenseModalOpen,
        totalItems: basket.reduce((acc, item) => acc + item.quantity, 0),
        lastAdded,
        dismissToast,
      }}
    >
      {children}
    </QuoteBasketContext.Provider>
  );
}

export function useQuoteBasket() {
  const context = useContext(QuoteBasketContext);
  if (!context) {
    throw new Error('useQuoteBasket must be used within a QuoteBasketProvider');
  }
  return context;
}
