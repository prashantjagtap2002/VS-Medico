import { COMPANY_INFO, FAQS, PHARMA_BRANDS, PRODUCT_CATEGORIES, SITE_URL, TRUST_STATS } from '@/data/companyData';
import { getProducts } from '@/data/products';

export const dynamic = 'force-static';

/** llms.txt: a plain-text summary that helps AI assistants describe and cite the business accurately. */
export function GET() {
  const { contact, address, licenses, businessProfile } = COMPANY_INFO;
  const products = getProducts();

  const body = `# ${COMPANY_INFO.legalName}

> ${COMPANY_INFO.legalName} is a B2B pharmaceutical wholesale distributor and super stockist in ${address.locality}, ${address.city}, established in ${COMPANY_INFO.establishedYear}. It supplies licensed retail chemists, hospitals, nursing homes and clinics across the Mumbai Metropolitan Region with branded formulations, generics, critical-care injectables and 2–8°C cold-chain products. It sells only to buyers holding valid drug licences (Form 20B/21B) and GST registration.

## Key facts
${TRUST_STATS.map((s) => `- ${s.value} ${s.label} (${s.detail})`).join('\n')}
- Role: ${businessProfile.role}
- Service area: ${businessProfile.serviceArea}
- Warehouse: ${businessProfile.temperatureControlledArea}
- Same-day delivery in Mumbai MMR for orders placed before 2:00 PM IST (Mon–Sat)
- Licences: Drug Licence Form 20B ${licenses.drugLicense20B}, Form 21B ${licenses.drugLicense21B}, issued by ${licenses.issuingAuthority}; GSTIN ${licenses.gstin}

## Contact
- Address: ${address.fullAddress}
- Sales phone / WhatsApp: ${contact.phoneSales}
- Email: ${contact.emailSales}
- Hours: ${contact.workingHours}; Sunday: ${contact.sundayStatus}

## Brands distributed
${PHARMA_BRANDS.map((b) => `- ${b.name}: ${b.category}`).join('\n')}

## Product categories
${PRODUCT_CATEGORIES.filter((c) => c.id !== 'all').map((c) => `- [${c.name}](${SITE_URL}/products?cat=${c.id})`).join('\n')}

## Sample catalogue
${products.map((p) => `- [${p.name}](${SITE_URL}/products/${p.slug}): ${p.composition}; ${p.brand}; ${p.packSize}`).join('\n')}

## Pages
- [Home](${SITE_URL}/)
- [Product catalogue](${SITE_URL}/products)
- [Brands](${SITE_URL}/brands)
- [Open a wholesale account](${SITE_URL}/register)
- [Licensing & compliance](${SITE_URL}/compliance)
- [About](${SITE_URL}/about)
- [Contact](${SITE_URL}/contact)

## FAQ
${FAQS.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
