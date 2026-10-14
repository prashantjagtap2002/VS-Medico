/**
 * Build-time product loader. Reads every content/products/*.json file (managed
 * from the admin panel) and returns normalized ProductItem objects.
 *
 * Server-only: uses the filesystem, so import it from server components and pass
 * the result to client components as props.
 */

import fs from 'node:fs';
import path from 'node:path';
import { PRODUCT_CATEGORIES, type ProductItem } from './companyData';

const PRODUCTS_DIR = path.join(process.cwd(), 'content', 'products');
const CATEGORY_IDS = new Set(PRODUCT_CATEGORIES.map((c) => c.id));

interface ProductFile {
  sku?: string;
  name?: string;
  brand?: string;
  category?: string;
  composition?: string;
  packSize?: string;
  mrp?: string;
  ptrEstimate?: string;
  hsnCode?: string;
  stockStatus?: string;
  coldChain?: boolean;
  storageTemp?: string;
  rxRequired?: boolean;
  featured?: boolean;
  sortOrder?: number;
  image?: string;
  description?: string;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function normalize(file: string, raw: ProductFile): ProductItem | null {
  if (!raw.name || !raw.sku) {
    console.warn(`[products] Skipping ${file}: "name" and "sku" are required.`);
    return null;
  }
  const category = raw.category && CATEGORY_IDS.has(raw.category) ? raw.category : 'formulations';
  return {
    id: raw.sku.trim(),
    name: raw.name.trim(),
    brand: raw.brand?.trim() || '',
    category,
    composition: raw.composition?.trim() || '',
    packSize: raw.packSize?.trim() || '',
    mrp: raw.mrp?.trim() || '',
    ptrEstimate: raw.ptrEstimate?.trim() || 'Wholesale rate on request',
    hsnCode: raw.hsnCode?.trim() || '',
    stockStatus: raw.stockStatus || 'In Stock',
    coldChain: Boolean(raw.coldChain),
    storageTemp: raw.storageTemp?.trim() || undefined,
    rxRequired: Boolean(raw.rxRequired),
    description: raw.description?.trim() || '',
    image: raw.image?.trim() || undefined,
    featured: Boolean(raw.featured),
    sortOrder: typeof raw.sortOrder === 'number' ? raw.sortOrder : 9999,
  };
}

let cache: ProductItem[] | null = null;

export function getProducts(): ProductItem[] {
  // Cache for the production build; re-read in dev so content edits show up immediately.
  if (cache && process.env.NODE_ENV === 'production') return cache;
  const files = fs.existsSync(PRODUCTS_DIR)
    ? fs.readdirSync(PRODUCTS_DIR).filter((f) => f.endsWith('.json'))
    : [];

  const products: ProductItem[] = [];
  const seen = new Set<string>();
  for (const file of files) {
    try {
      const raw = JSON.parse(fs.readFileSync(path.join(PRODUCTS_DIR, file), 'utf8')) as ProductFile;
      const product = normalize(file, raw);
      if (!product) continue;
      if (seen.has(product.id)) {
        console.warn(`[products] Duplicate SKU "${product.id}" in ${file}; skipping.`);
        continue;
      }
      seen.add(product.id);
      products.push(product);
    } catch (err) {
      console.warn(`[products] Could not parse ${file}:`, err);
    }
  }

  products.sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999) || a.name.localeCompare(b.name));

  // Readable, keyword-rich URLs; fall back to name + SKU if two names collide.
  const slugs = new Set<string>();
  for (const product of products) {
    let slug = slugify(product.name) || slugify(product.id);
    if (slugs.has(slug)) slug = `${slug}-${slugify(product.id)}`;
    slugs.add(slug);
    product.slug = slug;
  }

  cache = products;
  return cache;
}

export function getProductBySlug(slug: string): ProductItem | undefined {
  return getProducts().find((p) => p.slug === slug);
}

/** Featured products first (in sort order), topped up with the rest if there aren't enough. */
export function getFeaturedProducts(count: number): ProductItem[] {
  const all = getProducts();
  const featured = all.filter((p) => p.featured);
  return [...featured, ...all.filter((p) => !p.featured)].slice(0, count);
}
