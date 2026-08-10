"use client";

import React, { createContext, useContext, useState } from 'react';

const QuoteBasketContext = createContext();

export function QuoteBasketProvider({ children }) {
  const [basket, setBasket] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);

  const addToBasket = (product) => {
    setBasket((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsModalOpen(true);
  };

  const removeFromBasket = (id) => {
    setBasket((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromBasket(id);
      return;
    }
    setBasket((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const clearBasket = () => {
    setBasket([]);
  };

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
        totalItems: basket.reduce((acc, item) => acc + item.quantity, 0)
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
