"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  Filter,
  Search,
  Pill,
  Tablets,
  Syringe,
  ThermometerSnowflake,
  Sparkles,
  Stethoscope,
  Leaf,
  ChevronRight,
  Snowflake,
} from 'lucide-react';
import { PRODUCT_CATEGORIES, type ProductItem } from '@/data/companyData';

const CATEGORY_ICONS: Record<string, typeof Pill> = {
  formulations: Pill,
  generics: Tablets,
  'critical-care': Syringe,
  'cold-chain': ThermometerSnowflake,
  otc: Sparkles,
  surgical: Stethoscope,
  ayurvedic: Leaf,
};

const CATEGORY_NOTES: Record<string, string> = {
  formulations: 'Branded prescription medicines from leading manufacturers',
  generics: 'Quality generic medicines at wholesale rates',
  'critical-care': 'Injectables and ICU essentials with priority dispatch',
  'cold-chain': 'Stored and shipped at 2°C – 8°C with temperature logs',
  otc: 'Over-the-counter products and health supplements',
  surgical: 'Surgical consumables and diagnostic supplies',
  ayurvedic: 'Ayurvedic and herbal healthcare ranges',
};

export default function ProductBrowser({ products }: { products: ProductItem[] }) {
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');

  // Deep links such as /products?cat=cold-chain open on that category.
  useEffect(() => {
    const cat = new URLSearchParams(window.location.search).get('cat');
    if (cat && PRODUCT_CATEGORIES.some((c) => c.id === cat)) setCategory(cat);
  }, []);

  const categories = PRODUCT_CATEGORIES.filter((c) => c.id !== 'all' && products.some((p) => p.category === c.id));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter(
      (p) =>
        (category === 'all' || p.category === category) &&
        (!q || [p.name, p.brand, p.composition].some((v) => v.toLowerCase().includes(q)))
    );
  }, [products, category, query]);

  const groups = categories
    .map((c) => ({ ...c, items: filtered.filter((p) => p.category === c.id) }))
    .filter((g) => g.items.length);

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
        <div>
          <p className="flex items-center gap-2 text-sm mb-4">
            <Filter size={16} className="text-teal-brand" aria-hidden="true" /> Filter by Category:
          </p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter products by category">
            <button
              type="button"
              className={`chip${category === 'all' ? ' is-active' : ''}`}
              aria-pressed={category === 'all'}
              onClick={() => setCategory('all')}
            >
              All ({products.length})
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`chip${category === c.id ? ' is-active' : ''}`}
                aria-pressed={category === c.id}
                onClick={() => setCategory(c.id)}
              >
                {c.name} ({products.filter((p) => p.category === c.id).length})
              </button>
            ))}
          </div>
        </div>
        <label className="relative block w-full md:w-[340px] shrink-0">
          <span className="sr-only">Search products</span>
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-soft" aria-hidden="true" />
          <input
            type="search"
            className="search-input"
            placeholder="Search name, brand or composition"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>

      {groups.map((g) => {
        const Icon = CATEGORY_ICONS[g.id] ?? Pill;
        return (
          <section key={g.id} className="category-block" aria-labelledby={`cat-${g.id}`}>
            <div className="category-head">
              <span className="icon-box">
                <Icon size={22} aria-hidden="true" />
              </span>
              <div>
                <h3 id={`cat-${g.id}`}>{g.name}</h3>
                <p>{CATEGORY_NOTES[g.id]}</p>
              </div>
            </div>
            <div className="grid-3 gap-3!">
              {g.items.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`} className="product-tile">
                  <span className="name">
                    <ChevronRight size={15} aria-hidden="true" />
                    {p.name}
                  </span>
                  <span className="meta">
                    {p.brand}
                    {p.packSize ? ` · ${p.packSize}` : ''}
                  </span>
                  <span className="badges">
                    {p.rxRequired && <span className="tag tag-red">Rx</span>}
                    {p.coldChain && (
                      <span className="tag tag-blue">
                        <Snowflake size={10} aria-hidden="true" /> Cold chain
                      </span>
                    )}
                    <span className={`tag ${p.stockStatus === 'Out of Stock' ? 'tag-orange' : 'tag-green'}`}>
                      {p.stockStatus}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}

      {!groups.length && (
        <p className="text-center body-regular py-12">
          No products match your search. Try another name, or ask our team: we stock 5,000+ SKUs beyond this list.
        </p>
      )}

      <p className="text-center text-sm text-ink-soft mt-8" aria-live="polite">
        Showing {filtered.length} of {products.length} listed products · 5,000+ SKUs available on request
      </p>
    </>
  );
}
