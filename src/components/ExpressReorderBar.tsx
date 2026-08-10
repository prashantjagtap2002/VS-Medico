"use client";

import React, { useState, useEffect } from 'react';
import { useQuoteBasket } from './QuoteBasketContext';
import { PRODUCTS_LIST, ProductItem } from '@/data/companyData';
import { Clock, Zap, Plus, CheckCircle2 } from 'lucide-react';

export default function ExpressReorderBar() {
  const { addToBasket } = useQuoteBasket();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});

  // Countdown timer for 2:00 PM cutoff
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleQuickAdd = (product: ProductItem) => {
    addToBasket(product);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const fastMovingProducts = PRODUCTS_LIST.slice(0, 4);

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Zap size={14} className="fill-current" />
            <span>Express Same-Day Dispatch Run</span>
          </div>
          <h3 className="font-heading font-extrabold text-2xl text-primary">
            Fast Chemist Bulk Ordering Desk
          </h3>
          <p className="text-slate-500 text-sm max-w-xl">
            Quickly add fast-moving formulations to your wholesale inquiry list for express morning and evening logistics runs across Mumbai MMR.
          </p>
        </div>

        {/* Dispatch Cut-off Timer */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center shrink-0 min-w-[220px]">
          <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
            <Clock size={13} className="text-amber-500" />
            <span>Next Dispatch Cut-off</span>
          </div>
          <div className="font-heading font-extrabold text-2xl font-mono text-primary">
            {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
          </div>
          <div className="text-[11px] text-slate-500 mt-1 font-medium">
            Order before 2:00 PM for Same-Day Delivery
          </div>
        </div>
      </div>

      {/* Fast SKUs Grid */}
      <div className="mt-6">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
          Top Fast-Moving Chemist Reorder SKUs
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {fastMovingProducts.map((product) => {
            const isAdded = addedItems[product.id];
            return (
              <div key={product.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-bold text-secondary uppercase">{product.brand}</div>
                  <h4 className="font-bold text-primary text-sm line-clamp-1 mt-0.5">{product.name}</h4>
                  <div className="text-xs text-slate-500 mt-1">Pack: {product.packSize}</div>
                  <div className="text-xs font-semibold text-emerald-600 mt-1">MRP: {product.mrp}</div>
                </div>

                <button
                  onClick={() => handleQuickAdd(product)}
                  className={`mt-3 w-full btn btn-sm ${
                    isAdded ? 'btn-secondary' : 'btn-primary'
                  } py-1.5 text-xs justify-center`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle2 size={14} />
                      <span>Added to Basket</span>
                    </>
                  ) : (
                    <>
                      <Plus size={14} />
                      <span>Quick Add SKU</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
