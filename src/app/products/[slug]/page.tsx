import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, Snowflake, ShieldCheck, Truck, MessageCircle, FileText, Thermometer } from 'lucide-react';
import { getProducts, getProductBySlug } from '@/data/products';
import { COMPANY_INFO, PRODUCT_CATEGORIES, SITE_URL } from '@/data/companyData';
import { whatsappLink } from '@/lib/forms';
import { pageMetadata, absoluteUrl } from '@/lib/seo';
import { jsonLd } from '@/lib/security';

export const dynamicParams = false;

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug! }));
}

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).replace(/\s+\S*$/, '') + '…';
}

const categoryName = (id: string) => PRODUCT_CATEGORIES.find((c) => c.id === id)?.name ?? 'Pharmaceuticals';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  // Keep titles ≤ ~60 chars and descriptions ≤ 160 so search results don't truncate them.
  const title =
    product.name.length <= 28
      ? `${product.name} Wholesale Supplier, Mumbai`
      : product.name.length <= 40
        ? `${product.name} – Wholesale, Mumbai`
        : product.name;
  const description = truncate(
    `${product.name} by ${product.brand}${product.packSize ? `, ${product.packSize}` : ''}. Genuine stock & net PTR wholesale rates for chemists and hospitals across Mumbai MMR.`,
    160
  );
  return pageMetadata({
    title,
    description,
    path: `/products/${product.slug}`,
    image: product.image ? { url: product.image, alt: product.name } : undefined,
  });
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getProducts()
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const isDevice = product.category === 'surgical';
  const imageUrl = product.image ? absoluteUrl(product.image) : undefined;
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': isDevice ? 'Product' : 'Drug',
      name: product.name,
      description: product.description,
      ...(isDevice ? { sku: product.id, brand: { '@type': 'Brand', name: product.brand } } : {}),
      ...(!isDevice
        ? {
            activeIngredient: product.composition,
            manufacturer: { '@type': 'Organization', name: product.brand },
            prescriptionStatus: product.rxRequired ? 'https://schema.org/PrescriptionOnly' : 'https://schema.org/OTC',
          }
        : {}),
      ...(imageUrl ? { image: imageUrl } : {}),
      url: `${SITE_URL}/products/${product.slug}`,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Products', item: `${SITE_URL}/products` },
        { '@type': 'ListItem', position: 3, name: product.name, item: `${SITE_URL}/products/${product.slug}` },
      ],
    },
  ];

  const specs: [string, string | undefined][] = [
    ['Brand / Manufacturer', product.brand],
    ['Composition', product.composition],
    ['Pack Size', product.packSize],
    ['MRP', product.mrp],
    ['HSN Code', product.hsnCode],
    ['Category', categoryName(product.category)],
    ['Storage', product.storageTemp || (product.coldChain ? '2°C – 8°C' : 'Store below 30°C, dry place')],
    ['Prescription', product.rxRequired ? 'Rx – Prescription only (supplied to licensed buyers)' : 'Non-prescription / OTC'],
    ['Availability', product.stockStatus],
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <section className="bg-alt py-6 border-b border-[#dee2e6]">
        <div className="container">
          <nav aria-label="Breadcrumb" className="breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <Link href="/products">Products</Link>
            <ChevronRight size={14} aria-hidden="true" />
            <span>{categoryName(product.category)}</span>
            <ChevronRight size={14} aria-hidden="true" />
            <span aria-current="page" className="text-ink">
              {product.name}
            </span>
          </nav>
        </div>
      </section>

      <section className="section-sm bg-white">
        <div className="container grid-split items-start! gap-12!">
          <div>
            {product.image && (
              <div className="media-frame aspect-[4/3] mb-8 bg-white!">
                <img src={product.image} alt={`${product.name} – ${product.packSize}`} className="object-contain!" />
              </div>
            )}
            <p className="eyebrow mb-2">{product.brand}</p>
            <h1 className="hero-large mb-4">{product.name}</h1>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className={`tag ${product.stockStatus === 'Out of Stock' ? 'tag-orange' : 'tag-green'}`}>
                {product.stockStatus}
              </span>
              {product.coldChain && (
                <span className="tag tag-blue">
                  <Snowflake size={11} aria-hidden="true" /> Cold Chain (2–8°C)
                </span>
              )}
              {product.rxRequired && <span className="tag tag-red">Rx Only</span>}
              <span className="tag tag-teal">{categoryName(product.category)}</span>
            </div>
            <p className="body-large mb-8">
              {product.description} VS Medico supplies <strong>{product.name}</strong> to licensed retail chemists,
              hospitals and clinics across Mumbai, Thane and the MMR from our FDA-licensed warehouse in Bhandup West,
              with same-day dispatch on orders placed before 2:00 PM.
            </p>

            <h2 className="heading-2 mb-2">Product Specifications</h2>
            <table className="spec-table">
              <tbody>
                {specs
                  .filter(([, v]) => v)
                  .map(([k, v]) => (
                    <tr key={k}>
                      <th scope="row">{k}</th>
                      <td>{v}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <p className="body-small mt-4">
              Information is provided for licensed trade buyers. MRP is as printed by the manufacturer and may change
              with new batches. Contact our sales desk on {COMPANY_INFO.contact.phoneSales} for current net wholesale
              rates.
            </p>
          </div>

          <aside className="card lg:sticky lg:top-28">
            <h2 className="heading-2 mb-2">Request Wholesale Rate</h2>
            <p className="mb-6">
              Licensed chemists and hospitals can request current net PTR rates and stock availability for this
              product.
            </p>
            <div className="grid gap-3 mb-6">
              <a
                href={whatsappLink(
                  `Hello VS Medico, please share the wholesale rate and availability for ${product.name} (${product.packSize}).`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp btn-lg"
              >
                <MessageCircle size={18} aria-hidden="true" />
                <span>Ask Rate on WhatsApp</span>
              </a>
              <Link href="/contact" className="btn btn-primary btn-lg">
                Send an Inquiry
              </Link>
            </div>
            <ul className="check-list">
              <li>
                <ShieldCheck size={16} aria-hidden="true" /> 100% genuine, sourced from authorised channels
              </li>
              <li>
                <Truck size={16} aria-hidden="true" /> Same-day delivery across Mumbai MMR
              </li>
              {product.coldChain && (
                <li>
                  <Thermometer size={16} aria-hidden="true" /> Packed in validated cold boxes with gel packs
                </li>
              )}
              <li>
                <FileText size={16} aria-hidden="true" /> GST invoice with batch &amp; expiry details
              </li>
            </ul>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-sm bg-alt">
          <div className="container">
            <h2 className="heading-1 mb-8">More in {categoryName(product.category)}</h2>
            <div className="grid-3">
              {related.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`} className="product-tile bg-white!">
                  <span className="name">
                    <ChevronRight size={15} aria-hidden="true" />
                    {p.name}
                  </span>
                  <span className="meta">
                    {p.brand}
                    {p.packSize ? ` · ${p.packSize}` : ''}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
