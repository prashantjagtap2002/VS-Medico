"use client";

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PRODUCT_CATEGORIES, type ProductItem } from '@/data/companyData';
import { useQuoteBasket } from './QuoteBasketContext';
import Reveal from './Reveal';
import {
  Search,
  Plus,
  Check,
  Snowflake,
  Info,
  PackageCheck,
  Pill,
  Syringe,
  Leaf,
  Stethoscope,
  Sparkles,
  Tablets,
  ArrowRight,
  Clock,
} from 'lucide-react';

interface ProductCatalogProps {
  products: ProductItem[];
  initialCategory?: string;
  showTitle?: boolean;
  hideControls?: boolean;
  limit?: number;
}

const CATEGORY_IDS = new Set(PRODUCT_CATEGORIES.map((c) => c.id));
const CATEGORY_NAME = Object.fromEntries(PRODUCT_CATEGORIES.map((c) => [c.id, c.name]));
const CATEGORY_ICON: Record<string, React.ElementType> = {
  formulations: Pill,
  generics: Tablets,
  'critical-care': Syringe,
  'cold-chain': Snowflake,
  otc: Sparkles,
  surgical: Stethoscope,
  ayurvedic: Leaf,
};

/**
 * Applies `?cat=` from the URL (e.g. footer links). Isolated in its own Suspense
 * boundary so the catalog grid itself is still prerendered in the static export.
 */
function CategoryFromUrl({ onCategory }: { onCategory: (id: string) => void }) {
  const cat = useSearchParams().get('cat');
  useEffect(() => {
    if (cat && CATEGORY_IDS.has(cat)) onCategory(cat);
  }, [cat, onCategory]);
  return null;
}

function StockBadge({ product }: { product: ProductItem }) {
  if (product.stockStatus === 'Out of Stock') {
    return <span className="badge badge-red">Out of Stock</span>;
  }
  if (product.stockStatus === 'Low Stock' || product.stockStatus === 'On Order') {
    return (
      <span className="badge badge-amber">
        <Clock size={12} aria-hidden="true" />
        <span>{product.stockStatus}</span>
      </span>
    );
  }
  return (
    <span className="badge badge-green">
      <PackageCheck size={12} aria-hidden="true" />
      <span>In Stock</span>
    </span>
  );
}

function ProductImage({ product }: { product: ProductItem }) {
  const Icon = CATEGORY_ICON[product.category] ?? Pill;
  if (product.image) {
    return (
      <div className="product-media">
        {/* Static export: images are pre-optimized (WebP) by the CMS on upload. */}
        <img src={product.image} alt={`${product.name} – ${product.packSize}`} loading="lazy" decoding="async" width={400} height={300} />
      </div>
    );
  }
  return (
    <div className={`product-media product-media-placeholder cat-${product.category}`} aria-hidden="true">
      <Icon size={40} strokeWidth={1.5} />
    </div>
  );
}

export default function ProductCatalog({
  products,
  initialCategory = 'all',
  showTitle = true,
  hideControls = false,
  limit,
}: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToBasket, basket } = useQuoteBasket();

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const results = products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        !q ||
        [product.name, product.composition, product.brand, product.id, product.hsnCode].some((v) =>
          v.toLowerCase().includes(q)
        );
      return matchesCategory && matchesSearch;
    });
    return limit ? results.slice(0, limit) : results;
  }, [products, selectedCategory, searchQuery, limit]);

  const isInBasket = (id: string) => basket.some((item) => item.id === id);

  const selectCategory = (id: string) => {
    setSelectedCategory(id);
    // Keep the URL shareable without triggering a navigation.
    const url = new URL(window.location.href);
    if (id === 'all') url.searchParams.delete('cat');
    else url.searchParams.set('cat', id);
    window.history.replaceState(null, '', url);
  };

  return (
    <section className="py-12">
      <div className="container">
        {showTitle && (
          <Reveal className="section-header">
            <span className="section-subtitle">WHOLESALE PHARMA CATALOG</span>
            <h2 className="section-title">Product Categories & Stock Inventory</h2>
            <p className="section-desc">
              Browse fast-moving pharmaceutical formulations, generics, critical care injectables, and
              temperature-controlled products. Select items to request net PTR wholesale quotes.
            </p>
          </Reveal>
        )}

        {!hideControls && (
          <>
            <Suspense fallback={null}>
              <CategoryFromUrl onCategory={setSelectedCategory} />
            </Suspense>

            <div className="filter-bar">
              <div className="search-box">
                <Search className="search-icon" size={20} aria-hidden="true" />
                <input
                  type="search"
                  aria-label="Search products"
                  className="search-input"
                  placeholder="Search by brand, medicine name, active ingredient or HSN code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="category-tabs" role="group" aria-label="Filter by category">
                {PRODUCT_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    aria-pressed={selectedCategory === cat.id}
                    onClick={() => selectCategory(cat.id)}
                    className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center mb-6 text-sm text-slate-500 font-medium">
              <span aria-live="polite">Showing {filteredProducts.length} pharmaceutical items</span>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="text-secondary hover:underline font-semibold"
                >
                  Clear Search
                </button>
              )}
            </div>
          </>
        )}

        {filteredProducts.length > 0 ? (
          <div className="grid-3">
            {filteredProducts.map((product, idx) => {
              const added = isInBasket(product.id);
              const unavailable = product.stockStatus === 'Out of Stock';
              return (
                <Reveal
                  as="article"
                  key={product.id}
                  className="product-card"
                  delay={Math.min(idx % 3, 2) * 80}
                >
                  <div>
                    {product.slug ? (
                      <Link href={`/products/${product.slug}`} tabIndex={-1} aria-hidden="true">
                        <ProductImage product={product} />
                      </Link>
                    ) : (
                      <ProductImage product={product} />
                    )}
                    <div className="product-header">
                      <span className="product-brand">{product.brand}</span>
                      {product.coldChain ? (
                        <span className="badge badge-blue">
                          <Snowflake size={12} aria-hidden="true" />
                          <span>Cold Chain (2-8°C)</span>
                        </span>
                      ) : (
                        <StockBadge product={product} />
                      )}
                    </div>

                    <h3 className="product-title">
                      {product.slug ? (
                        <Link href={`/products/${product.slug}`} className="product-title-link">
                          {product.name}
                        </Link>
                      ) : (
                        product.name
                      )}
                    </h3>
                    <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                      {CATEGORY_NAME[product.category]}
                      {product.rxRequired && <span className="rx-tag">Rx</span>}
                    </p>

                    <div className="product-composition">
                      <span className="font-semibold text-slate-700">Composition:</span> {product.composition}
                    </div>

                    <p className="text-xs text-slate-500 mb-4 leading-relaxed line-clamp-2">{product.description}</p>
                  </div>

                  <div>
                    <div className="product-meta">
                      <div>
                        <div className="product-pack">Pack: {product.packSize}</div>
                        {product.mrp && <div className="product-mrp">MRP: {product.mrp}</div>}
                      </div>

                      <div className="text-right text-xs">
                        <span className="text-emerald-700 font-bold block">{product.ptrEstimate}</span>
                        {product.hsnCode && <span className="text-slate-400">HSN: {product.hsnCode}</span>}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => addToBasket(product)}
                        className={`w-full btn btn-sm ${added ? 'btn-secondary' : 'btn-primary'}`}
                      >
                        {added ? (
                          <>
                            <Check size={15} aria-hidden="true" />
                            <span>In Quote Basket · Add More</span>
                          </>
                        ) : (
                          <>
                            <Plus size={15} aria-hidden="true" />
                            <span>{unavailable ? 'Request Availability' : 'Add to Wholesale Inquiry'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <Info size={40} className="mx-auto text-slate-400 mb-3" aria-hidden="true" />
            <h3 className="text-lg font-bold text-slate-700">No matching products found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-4">
              We carry over 5,000+ SKUs in our Bhandup warehouse. Contact our sales desk directly for unlisted items or
              special hospital bulk requirements.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                selectCategory('all');
              }}
              className="btn btn-outline btn-sm"
            >
              Reset Filters
            </button>
          </div>
        )}

        {limit && (
          <div className="text-center mt-12">
            <Link href="/products" className="btn btn-primary">
              <span>View Full Product Catalog</span>
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
