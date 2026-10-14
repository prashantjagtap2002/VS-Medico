"use client";

import React, { useState, useEffect } from 'react';
import { useQuoteBasket } from './QuoteBasketContext';
import { DISPATCH_CUTOFF_HOUR_IST, type ProductItem } from '@/data/companyData';
import { Clock, Zap, Plus, CheckCircle2 } from 'lucide-react';

const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;

/** Next same-day dispatch cut-off (Mon–Sat, DISPATCH_CUTOFF_HOUR_IST), as a UTC timestamp. */
function nextCutoff(nowMs: number): { at: number; isToday: boolean } {
  // Work in "IST wall clock" by shifting the epoch, then read UTC fields.
  const ist = new Date(nowMs + IST_OFFSET_MS);
  for (let addDays = 0; addDays < 8; addDays++) {
    const day = new Date(Date.UTC(ist.getUTCFullYear(), ist.getUTCMonth(), ist.getUTCDate() + addDays, DISPATCH_CUTOFF_HOUR_IST));
    const isSunday = day.getUTCDay() === 0;
    const cutoffUtc = day.getTime() - IST_OFFSET_MS;
    if (!isSunday && cutoffUtc > nowMs) return { at: cutoffUtc, isToday: addDays === 0 };
  }
  return { at: nowMs, isToday: false };
}

function formatCutoffDay(atMs: number): string {
  return new Intl.DateTimeFormat('en-IN', { weekday: 'long', timeZone: 'Asia/Kolkata' }).format(atMs);
}

const pad = (n: number) => String(n).padStart(2, '0');
const cutoffLabel = `${DISPATCH_CUTOFF_HOUR_IST > 12 ? DISPATCH_CUTOFF_HOUR_IST - 12 : DISPATCH_CUTOFF_HOUR_IST}:00 ${DISPATCH_CUTOFF_HOUR_IST >= 12 ? 'PM' : 'AM'}`;

export default function ExpressReorderBar({ products }: { products: ProductItem[] }) {
  const { addToBasket } = useQuoteBasket();
  const [addedItems, setAddedItems] = useState<Record<string, boolean>>({});
  // null until mounted, so the prerendered HTML never shows a stale time.
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleQuickAdd = (product: ProductItem) => {
    addToBasket(product);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const cutoff = now === null ? null : nextCutoff(now);
  const remaining = cutoff && now !== null ? Math.max(0, cutoff.at - now) : 0;
  const h = Math.floor(remaining / 3_600_000);
  const m = Math.floor((remaining % 3_600_000) / 60_000);
  const s = Math.floor((remaining % 60_000) / 1000);

  return (
    <div className="express-reorder-card">
      <div className="express-reorder-header">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold uppercase tracking-wider mb-2">
            <Zap size={14} className="fill-current" aria-hidden="true" />
            <span>Express Same-Day Dispatch Run</span>
          </div>
          <h2 className="font-heading font-extrabold text-2xl text-white">Fast Chemist Bulk Ordering Desk</h2>
          <p className="text-slate-300 text-sm max-w-xl mt-1">
            Quickly add fast-moving formulations to your wholesale inquiry list for express morning and evening
            logistics runs across Mumbai MMR.
          </p>
        </div>

        <div className="express-timer-box" aria-live="off">
          <div className="text-[11px] text-slate-300 font-semibold uppercase tracking-wider mb-1 flex items-center justify-center gap-1">
            <Clock size={13} className="text-amber-400" aria-hidden="true" />
            <span>{!cutoff || cutoff.isToday ? 'Same-Day Cut-off In' : 'Next Same-Day Cut-off'}</span>
          </div>
          <div className="font-heading font-extrabold text-2xl font-mono text-amber-400 tabular-nums">
            {cutoff ? `${pad(h)}h : ${pad(m)}m : ${pad(s)}s` : '--h : --m : --s'}
          </div>
          <div className="text-[11px] text-slate-300 mt-1 font-medium">
            {!cutoff || cutoff.isToday
              ? `Order before ${cutoffLabel} IST for same-day delivery`
              : `${formatCutoffDay(cutoff.at)}, ${cutoffLabel} IST · Mon–Sat dispatch`}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="text-xs font-bold text-sky-300 uppercase tracking-wider mb-3">
          Top Fast-Moving Chemist Reorder SKUs
        </div>

        <div className="express-sku-grid">
          {products.map((product) => {
            const isAdded = addedItems[product.id];
            return (
              <div key={product.id} className="express-sku-card">
                <div>
                  <div className="text-[11px] font-bold text-sky-300 uppercase">{product.brand}</div>
                  <h3 className="font-bold text-white text-sm line-clamp-1 mt-0.5">{product.name}</h3>
                  <div className="text-xs text-slate-300 mt-1">Pack: {product.packSize}</div>
                  {product.mrp && <div className="text-xs font-semibold text-emerald-400 mt-1">MRP: {product.mrp}</div>}
                </div>

                <button
                  type="button"
                  onClick={() => handleQuickAdd(product)}
                  className={`mt-4 w-full btn btn-sm ${isAdded ? 'btn-secondary' : 'btn-primary'} py-2 text-xs justify-center`}
                >
                  {isAdded ? (
                    <>
                      <CheckCircle2 size={14} aria-hidden="true" />
                      <span>Added to Basket</span>
                    </>
                  ) : (
                    <>
                      <Plus size={14} aria-hidden="true" />
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
