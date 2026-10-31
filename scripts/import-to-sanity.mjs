/**
 * One-time import of the checked-in content/ JSON into Sanity:
 *   npm run sanity:import            create documents that don't exist yet
 *   npm run sanity:import -- --force overwrite existing Sanity documents too
 * Needs SANITY_API_WRITE_TOKEN (Sanity Manage → API → Tokens → Editor) in .env.local.
 * Local images under public/ are uploaded as Sanity assets.
 */
import fs from 'node:fs';
import path from 'node:path';
import nextEnv from '@next/env';
import { createClient } from '@sanity/client';

const root = process.cwd();
nextEnv.loadEnvConfig(root);

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_WRITE_TOKEN;
const force = process.argv.includes('--force');

if (!projectId || projectId === 'your-project-id' || !token) {
  console.error('Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN in .env.local first.');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2026-10-30',
  token,
  useCdn: false,
});

const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(root, relative), 'utf8'));
const docId = (sku) => `product-${sku.trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-')}`;

const uploaded = new Map();
async function imageField(src) {
  if (!src || !src.startsWith('/')) return undefined; // remote URLs are skipped; upload them in the Studio
  const file = path.join(root, 'public', src);
  if (!fs.existsSync(file)) {
    console.warn(`  ! ${src} not found in public/, skipped`);
    return undefined;
  }
  if (!uploaded.has(src)) {
    const asset = await client.assets.upload('image', fs.createReadStream(file), { filename: path.basename(file) });
    uploaded.set(src, asset._id);
  }
  return { _type: 'image', asset: { _type: 'reference', _ref: uploaded.get(src) } };
}

const docs = [];

const productsDir = path.join(root, 'content/products');
for (const file of fs.readdirSync(productsDir).filter((f) => f.endsWith('.json'))) {
  const { image, ...product } = readJson(`content/products/${file}`);
  if (!product.sku || !product.name) continue;
  const doc = { _id: docId(product.sku), _type: 'product', ...product };
  const img = await imageField(image);
  if (img) doc.image = img;
  docs.push(doc);
}

const company = readJson('content/settings/company.json');
docs.push({ _id: 'companySettings', _type: 'companySettings', contact: company.contact, address: company.address, licenses: company.licenses });

const gallery = readJson('content/settings/gallery.json');
const photos = [];
for (const [i, photo] of gallery.photos.entries()) {
  const img = await imageField(photo.image);
  if (img) photos.push({ _key: `photo${i + 1}`, title: photo.title, caption: photo.caption, image: img });
}
docs.push({ _id: 'gallery', _type: 'gallery', photos });

const tx = client.transaction();
for (const doc of docs) force ? tx.createOrReplace(doc) : tx.createIfNotExists(doc);
await tx.commit();

console.log(`✓ ${force ? 'Imported/overwrote' : 'Imported (existing documents left unchanged)'} ${docs.length} documents, ${uploaded.size} images.`);
