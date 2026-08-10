"use client";

import React, { useState, useMemo } from 'react';
import { PRODUCTS_LIST, PRODUCT_CATEGORIES, ProductItem } from '@/data/companyData';
import { useQuoteBasket } from './QuoteBasketContext';
import { 
  Search, 
  Plus, 
  Check, 
  Snowflake, 
  Info,
  PackageCheck
} from 'lucide-react';

interface ProductCatalogProps {
  initialCategory?: string;
  showTitle?: boolean;
}

export default function ProductCatalog({ initialCategory = 'all', showTitle = true }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToBasket, basket } = useQuoteBasket();

  const filteredProducts = useMemo(() => {
    return PRODUCTS_LIST.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.composition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const isInBasket = (id: string) => basket.some((item) => item.id === id);

  return (
    <section className="py-12">
      <div className="container">
        {showTitle && (
          <div className="section-header">
            <span className="section-subtitle">WHOLESALE PHARMA CATALOG</span>
            <h2 className="section-title">Product Categories & Stock Inventory</h2>
            <p className="section-desc">
              Browse fast-moving pharmaceutical formulations, generics, critical care injectables, and temperature-controlled products. Select items to request net PTR wholesale quotes.
            </p>
          </div>
        )}

        {/* Search & Category Filter Controls */}
        <div className="filter-bar">
          <div className="search-box">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              className="search-input"
              placeholder="Search by brand, medicine name, active ingredient or HSN code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="category-tabs">
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`category-tab ${selectedCategory === cat.id ? 'active' : ''}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center mb-6 text-sm text-slate-500 font-medium">
          <span>Showing {filteredProducts.length} pharmaceutical items</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-secondary hover:underline font-semibold"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid-3">
            {filteredProducts.map((product) => {
              const added = isInBasket(product.id);
              return (
                <div key={product.id} className="product-card">
                  <div>
                    <div className="product-header">
                      <span className="product-brand">{product.brand}</span>
                      {product.coldChain ? (
                        <span className="badge badge-blue">
                          <Snowflake size={12} />
                          <span>Cold Chain (2-8°C)</span>
                        </span>
                      ) : (
                        <span className="badge badge-green">
                          <PackageCheck size={12} />
                          <span>In Stock</span>
                        </span>
                      )}
                    </div>

                    <h3 className="product-title">{product.name}</h3>

                    <div className="product-composition">
                      <span className="font-semibold text-slate-700">Composition:</span> {product.composition}
                    </div>

                    <p className="text-xs text-slate-500 mb-4 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div>
                    <div className="product-meta">
                      <div>
                        <div className="product-pack">Pack: {product.packSize}</div>
                        <div className="product-mrp">MRP: {product.mrp}</div>
                      </div>

                      <div className="text-right text-xs">
                        <span className="text-emerald-700 font-bold block">{product.ptrEstimate}</span>
                        <span className="text-slate-400">HSN: {product.hsnCode}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                      <button
                        onClick={() => addToBasket(product)}
                        className={`w-full btn btn-sm ${
                          added ? 'btn-secondary' : 'btn-primary'
                        }`}
                      >
                        {added ? (
                          <>
                            <Check size={15} />
                            <span>In Quote Basket</span>
                          </>
                        ) : (
                          <>
                            <Plus size={15} />
                            <span>Add to Wholesale Inquiry</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <Info size={40} className="mx-auto text-slate-400 mb-3" />
            <h3 className="text-lg font-bold text-slate-700">No matching products found</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-4">
              We carry over 5,000+ SKUs in our Bhandup warehouse. Contact our sales desk directly for unlisted items or special hospital bulk requirements.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="btn btn-outline btn-sm"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
