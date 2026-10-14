/**
 * Pre-build content check (runs automatically before `npm run build`).
 * - Warns if placeholder/demo business details are still in content/settings/company.json
 * - Validates every product file in content/products/
 * Warnings never block the build unless STRICT_CONTENT=1 is set (e.g. in the
 * production environment once real details are entered).
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const warnings = [];
const errors = [];

// Demo values shipped with the template. Replace them via /admin → Company Settings.
const PLACEHOLDERS = {
  'licenses.gstin': ['27AAAAA0000A1Z5'],
  'licenses.pan': ['AAAAA0000A'],
  'licenses.fssaiNo': ['11521000000123'],
  'licenses.drugLicense20B': ['MH-MUM-20B-184920'],
  'licenses.drugLicense21B': ['MH-MUM-21B-184921'],
  'contact.phoneSales': ['+91 98200 12345'],
  'contact.whatsapp': ['+91 98200 12345'],
  'contact.phoneOffice': ['+91 022 2595 6789'],
};

const get = (obj, key) => key.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);

const settingsPath = path.join(root, 'content/settings/company.json');
const settings = JSON.parse(fs.readFileSync(settingsPath, 'utf8'));
for (const [key, demo] of Object.entries(PLACEHOLDERS)) {
  if (demo.includes(get(settings, key))) warnings.push(`Company Settings → ${key} is still the demo value "${get(settings, key)}"`);
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vsmedico.in';
if (!process.env.NEXT_PUBLIC_SITE_URL) warnings.push(`NEXT_PUBLIC_SITE_URL is not set; using default ${siteUrl}`);
if (!process.env.NEXT_PUBLIC_WEB3FORMS_KEY) warnings.push('NEXT_PUBLIC_WEB3FORMS_KEY is not set; forms will fall back to WhatsApp only');

const CATEGORIES = new Set(['formulations', 'generics', 'critical-care', 'cold-chain', 'otc', 'surgical', 'ayurvedic']);
const productsDir = path.join(root, 'content/products');
const skus = new Map();
for (const file of fs.readdirSync(productsDir).filter((f) => f.endsWith('.json'))) {
  let p;
  try {
    p = JSON.parse(fs.readFileSync(path.join(productsDir, file), 'utf8'));
  } catch (e) {
    errors.push(`content/products/${file}: invalid JSON (${e.message})`);
    continue;
  }
  if (!p.sku || !p.name) errors.push(`content/products/${file}: "sku" and "name" are required`);
  if (p.sku && skus.has(p.sku)) errors.push(`content/products/${file}: duplicate SKU "${p.sku}" (also in ${skus.get(p.sku)})`);
  if (p.sku) skus.set(p.sku, file);
  if (p.category && !CATEGORIES.has(p.category)) warnings.push(`content/products/${file}: unknown category "${p.category}" (shown as Branded Formulations)`);
  if (p.image && p.image.startsWith('/') && !fs.existsSync(path.join(root, 'public', p.image))) {
    errors.push(`content/products/${file}: image ${p.image} not found in public/`);
  }
}

const strict = process.env.STRICT_CONTENT === '1';
if (warnings.length) {
  console.warn(`\n⚠  Content check: ${warnings.length} warning(s)`);
  for (const w of warnings) console.warn(`   - ${w}`);
}
if (errors.length) {
  console.error(`\n✖  Content check: ${errors.length} error(s)`);
  for (const e of errors) console.error(`   - ${e}`);
}
if (errors.length || (strict && warnings.length)) process.exit(1);
console.log(`✓ Content check passed (${skus.size} products)${warnings.length ? ' with warnings' : ''}.\n`);
