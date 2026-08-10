"use client";

import React, { Suspense } from 'react';
import ProductCatalog from '@/components/ProductCatalog';
import ExpressReorderBar from '@/components/ExpressReorderBar';
import MarginCalculator from '@/components/MarginCalculator';

export default function ProductsPage() {
  return (
    <div className="py-8">
      <div className="container">
        <div className="max-w-3xl mb-4">
          <span className="text-secondary font-bold text-sm tracking-wider uppercase">INVENTORY & STOCKIST CATALOG</span>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl text-primary mt-1 mb-2">
            Pharmaceutical Product Catalog
          </h1>
          <p className="text-slate-600 text-base">
            Search active stock across branded formulations, generic medicines, critical care injectables, cold-chain vaccines, and surgical items. Select products to request wholesale rate quotes.
          </p>
        </div>

        <ExpressReorderBar />
      </div>

      <Suspense fallback={<div className="text-center py-12 text-slate-500">Loading catalog...</div>}>
        <ProductCatalog showTitle={false} />
      </Suspense>

      <div className="container">
        <MarginCalculator />
      </div>
    </div>
  );
}
