/**
 * Pre-build Sanity sync (runs automatically before `npm run build`).
 * Downloads published Sanity content into content/ so the static site renders it.
 * Without Sanity variables, or if Sanity is unreachable, the checked-in JSON is kept.
 * With STRICT_CONTENT=1 a failed sync fails the build instead.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import nextEnv from '@next/env';
import { createClient } from '@sanity/client';

const root = process.cwd();
nextEnv.loadEnvConfig(root); // pick up .env.local for local builds, like `next build` does

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_READ_TOKEN || undefined;
const strict = process.env.STRICT_CONTENT === '1';

if (!projectId || projectId === 'your-project-id') {
  console.log('[sanity] No project configured; using checked-in content.');
  process.exit(0);
}

const client = createClient({ projectId, dataset, apiVersion: '2026-10-30', useCdn: !token, token, perspective: 'published' });

const PRODUCTS_QUERY = `*[_type == "product" && defined(sku) && defined(name)] | order(sortOrder asc, name asc) {
  sku, name, brand, category, composition, packSize, mrp, ptrEstimate, hsnCode, stockStatus,
  coldChain, storageTemp, rxRequired, featured, sortOrder, description,
  "image": image.asset->url + "?w=1000&fit=max&auto=format"
}`;
const COMPANY_QUERY = `coalesce(*[_id == "companySettings"][0], *[_type == "companySettings"] | order(_updatedAt desc)[0]){ contact, address, licenses }`;
const GALLERY_QUERY = `coalesce(*[_id == "gallery"][0], *[_type == "gallery"] | order(_updatedAt desc)[0]){
  "photos": photos[defined(image.asset) && defined(title)]{ title, caption, "image": image.asset->url + "?w=1600&fit=max&auto=format" }
}`;

const fileName = (sku) => `${sku.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-')}.json`;

async function readJson(relative) {
  return JSON.parse(await fs.readFile(path.join(root, relative), 'utf8'));
}

async function writeJson(relative, value) {
  const file = path.join(root, relative);
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

/** Drop nulls/empty strings so missing Sanity fields keep their current value. */
function mergeSection(current = {}, incoming) {
  const filled = Object.entries(incoming ?? {}).filter(([, v]) => v !== null && v !== undefined && v !== '');
  return { ...current, ...Object.fromEntries(filled) };
}

const withoutNulls = (obj) => Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== null));

try {
  const [products, company, gallery] = await Promise.all([
    client.fetch(PRODUCTS_QUERY),
    client.fetch(COMPANY_QUERY),
    client.fetch(GALLERY_QUERY),
  ]);
  const synced = [];

  // Sanity becomes the full product list: old files are replaced so deleted products disappear.
  if (products.length > 0) {
    const dir = path.join(root, 'content/products');
    await fs.mkdir(dir, { recursive: true });
    for (const file of await fs.readdir(dir)) if (file.endsWith('.json')) await fs.unlink(path.join(dir, file));
    for (const product of products) await writeJson(`content/products/${fileName(product.sku)}`, withoutNulls(product));
    synced.push(`${products.length} products`);
  } else {
    console.warn('[sanity] No published products; keeping checked-in products.');
  }

  if (company) {
    const current = await readJson('content/settings/company.json');
    await writeJson('content/settings/company.json', {
      contact: mergeSection(current.contact, company.contact),
      address: mergeSection(current.address, company.address),
      licenses: mergeSection(current.licenses, company.licenses),
    });
    synced.push('company settings');
  } else {
    console.warn('[sanity] No published Company Settings; keeping checked-in company.json.');
  }

  if (gallery?.photos?.length) {
    await writeJson('content/settings/gallery.json', { photos: gallery.photos.map(withoutNulls) });
    synced.push(`${gallery.photos.length} gallery photos`);
  } else {
    console.warn('[sanity] No published gallery photos; keeping checked-in gallery.json.');
  }

  console.log(`[sanity] Synced ${synced.join(', ') || 'nothing'} from ${projectId}/${dataset}.`);
} catch (error) {
  console.warn('[sanity] Sync failed; using checked-in content.', error instanceof Error ? error.message : error);
  if (strict) process.exitCode = 1;
}
