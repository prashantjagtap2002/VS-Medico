/**
 * VS MEDICO LLP - Centralized Company Data Configuration (TypeScript)
 *
 * Contact details, address and licence numbers live in content/settings/company.json
 * and products live in content/products/*.json so they can be edited from the
 * admin panel (/admin). Everything else on this page is edited in code.
 */

import companySettings from '../../content/settings/company.json';

export interface CompanyLicenses {
  /** Name exactly as registered with the Ministry of Corporate Affairs. */
  registeredName?: string;
  /** LLP Identification Number (MCA). */
  llpin?: string;
  /** LLP incorporation date, display text. */
  llpIncorporated?: string;
  drugLicense20B: string;
  drugLicense21B: string;
  issuingAuthority: string;
  gstin: string;
  pan: string;
  fssaiNo: string;
}

export interface CompanyContact {
  phoneSales: string;
  phoneOffice: string;
  whatsapp: string;
  whatsappRaw: string;
  emailSales: string;
  emailInfo: string;
  workingHours: string;
  sundayStatus: string;
}

export interface CompanyAddress {
  building: string;
  locality: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  landmark: string;
  fullAddress: string;
  googleMapEmbedUrl: string;
  mapDirectionsUrl: string;
}

export interface CompanyBusinessProfile {
  role: string;
  primaryCustomers: string;
  serviceArea: string;
  dailyCapacity: string;
  skuCount: string;
  activeClients: string;
  temperatureControlledArea: string;
}

export interface ValueProposition {
  title: string;
  desc: string;
}

export interface CompetitiveEdgeItem {
  feature: string;
  vsMedico: string;
  singleManufacturer: string;
  unorganizedTrader: string;
}

export interface CompanyInfo {
  name: string;
  legalName: string;
  tagline: string;
  establishedYear: number;
  yearsOfExcellence: string;
  licenses: CompanyLicenses;
  contact: CompanyContact;
  address: CompanyAddress;
  businessProfile: CompanyBusinessProfile;
  valuePropositions: ValueProposition[];
}

export interface ProductCategory {
  id: string;
  name: string;
  icon: string;
}

export interface ProductItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  composition: string;
  packSize: string;
  mrp: string;
  ptrEstimate: string;
  hsnCode: string;
  stockStatus: string;
  coldChain: boolean;
  storageTemp?: string;
  rxRequired: boolean;
  description: string;
  /** URL slug for /products/[slug], generated from the name at build time. */
  slug?: string;
  /** Public path of the product photo, e.g. /images/uploads/augmentin.webp */
  image?: string;
  /** Shown on the home page and the express reorder desk. */
  featured?: boolean;
  sortOrder?: number;
}

export interface PharmaBrand {
  name: string;
  category: string;
  logoText: string;
  highlight: string;
}

export interface TrustStat {
  value: string;
  label: string;
  detail: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
}

/**
 * Canonical production URL (no trailing slash). Used for SEO metadata, sitemap and structured data.
 * Set NEXT_PUBLIC_SITE_URL in the hosting environment to the live domain.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://vsmedico.in").replace(/\/+$/, "");

/** Same-day dispatch cut-off, in IST (24h clock). */
export const DISPATCH_CUTOFF_HOUR_IST = 14;

const { latitude, longitude, mapsListingName, ...ADDRESS } = companySettings.address;
const FULL_ADDRESS = `${ADDRESS.building}, ${ADDRESS.locality}, ${ADDRESS.city}, ${ADDRESS.state} ${ADDRESS.pincode}`;
// Prefixing the Google Maps listing name pins the map to the business itself, not just the street.
const MAP_QUERY = mapsListingName ? `${mapsListingName}, ${FULL_ADDRESS}` : FULL_ADDRESS;
export const GEO = { latitude, longitude };

/** Year V.S. Medico LLP was incorporated (MCA record, LLPIN AAX-4036). */
export const ESTABLISHED_YEAR = 2021;

export const COMPANY_INFO: CompanyInfo = {
  name: "VS Medico",
  legalName: "VS Medico LLP",
  tagline: "Pharmaceutical Wholesale Distributor in Bhandup West, Mumbai",
  establishedYear: ESTABLISHED_YEAR,
  yearsOfExcellence: `${new Date().getFullYear() - ESTABLISHED_YEAR}+`,
  
  licenses: companySettings.licenses,

  contact: {
    ...companySettings.contact,
    whatsappRaw: companySettings.contact.whatsapp.replace(/\D/g, ''),
  },

  address: {
    ...ADDRESS,
    country: "India",
    fullAddress: FULL_ADDRESS,
    googleMapEmbedUrl: `https://maps.google.com/maps?q=${encodeURIComponent(MAP_QUERY)}&z=16&output=embed`,
    mapDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_QUERY)}`,
  },

  businessProfile: {
    role: "Pharmaceutical Wholesale Distributor",
    primaryCustomers: "Retail Chemists, Chain Pharmacies, Multispecialty Hospitals, Nursing Homes, & Government Procurement",
    serviceArea: "Mumbai Metropolitan Region (MMR), Bhandup, Mulund, Thane, Powai, & Extended Maharashtra",
    dailyCapacity: "Same-day dispatch for orders received before 2 PM",
    skuCount: "Branded formulations, generics, critical care, cold chain, OTC, surgical and Ayurvedic lines",
    activeClients: "Licensed retail chemists, hospitals, nursing homes and clinics",
    temperatureControlledArea: "Temperature-controlled storage with dedicated 2°C – 8°C cold storage, run to WHO-GDP practices"
  },

  valuePropositions: [
    {
      title: "Many Brands, One Bill",
      desc: "One order, one invoice and one delivery across leading brands such as Sun Pharma, Cipla, Alkem, Lupin, Torrent, Abbott and Mankind."
    },
    {
      title: "Genuine, Traceable Stock",
      desc: "Sourced from manufacturers and their authorised channels, with batch numbers on every invoice for full traceability."
    },
    {
      title: "Cold Chain Care",
      desc: "Temperature-monitored 2°C to 8°C storage and insulated transit packing for insulins, vaccines and biologics."
    },
    {
      title: "Same-Day MMR Express Run",
      desc: "From our Bhandup West premises we deliver same-day across Bhandup, Mulund, Thane, Powai, Ghatkopar, Dadar, and MMR."
    }
  ]
};

export const COMPETITIVE_EDGE: CompetitiveEdgeItem[] = [
  {
    feature: "Brand Sourcing Scope",
    vsMedico: "Leading Pharma Brands on 1 Consolidated Invoice",
    singleManufacturer: "1 Single Brand Catalog Only",
    unorganizedTrader: "Fragmented & Unverified Stock"
  },
  {
    feature: "Delivery Speed in Mumbai MMR",
    vsMedico: "Same-Day Dispatch from Bhandup Hub (2-4 hrs)",
    singleManufacturer: "Slow Central Warehouse Dispatch (2-4 Days)",
    unorganizedTrader: "Uncertain Timelines & Stock Shortages"
  },
  {
    feature: "Cold Chain Integrity (2°C - 8°C)",
    vsMedico: "WHO-GDP Aligned Cold Storage + Gel-Pack Box",
    singleManufacturer: "Varies by Carrier Line",
    unorganizedTrader: "High Risk of Temperature Abuse"
  },
  {
    feature: "Chemist Credit & Billing",
    vsMedico: "Transparent Net PTR Rates + Structured Credit",
    singleManufacturer: "Strict Advance Payment Terms",
    unorganizedTrader: "Hidden Charges & Non-Compliant Bills"
  },
  {
    feature: "FDA & Batch Compliance",
    vsMedico: "Form 20B/21B Verified + Full Invoice Audit Trail",
    singleManufacturer: "Verified (Brand Specific)",
    unorganizedTrader: "Unverified Secondary Sources"
  }
];

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { id: "all", name: "All Categories", icon: "PackageCheck" },
  { id: "formulations", name: "Branded Formulations", icon: "Pill" },
  { id: "generics", name: "Generic Medicines", icon: "Tablets" },
  { id: "critical-care", name: "Critical Care & Injectables", icon: "Syringe" },
  { id: "cold-chain", name: "Cold Chain & Biologics", icon: "ThermometerSnowflake" },
  { id: "otc", name: "OTC & Health Supplements", icon: "Sparkles" },
  { id: "surgical", name: "Surgical & Diagnostics", icon: "Stethoscope" },
  { id: "ayurvedic", name: "Ayurvedic & Herbal", icon: "Leaf" }
];

export const PHARMA_BRANDS: PharmaBrand[] = [
  { name: "Sun Pharma", category: "Cardiology, Psychiatry, Gastro", logoText: "SUN PHARMA", highlight: "India's #1 Pharma Company" },
  { name: "Cipla Ltd.", category: "Respiratory, Antibiotics, Critical Care", logoText: "CIPLA", highlight: "Leader in Inhalation & Anti-infectives" },
  { name: "Alkem Laboratories", category: "Gastroenterology, Anti-infectives", logoText: "ALKEM", highlight: "Top Indian Formulations Stockist" },
  { name: "Lupin Limited", category: "Diabetology, Asthma, Cardiovascular", logoText: "LUPIN", highlight: "Global Generics & Speciality" },
  { name: "Zydus Healthcare", category: "Oncology, Nephrology, Dermacare", logoText: "ZYDUS", highlight: "Innovation & Bio-therapeutics" },
  { name: "Torrent Pharma", category: "CNS, Cardiovascular, Diabetology", logoText: "TORRENT", highlight: "Therapeutic Precision Leader" },
  { name: "Abbott India", category: "Metabolics, Nutrition, Diagnostics", logoText: "ABBOTT", highlight: "MNC Healthcare Partner" },
  { name: "Mankind Pharma", category: "OTC, Acute Care, Sexual Wellness", logoText: "MANKIND", highlight: "High Volume Fast Moving Stock" },
  { name: "Dr. Reddy's", category: "Oncology, Gastro, Pain Management", logoText: "DR. REDDY'S", highlight: "Global Pharmaceutical Giant" },
  { name: "Glenmark Pharma", category: "Dermatology, Respiratory, ENT", logoText: "GLENMARK", highlight: "Dermacare & Respiratory Specialist" },
  { name: "Sanofi India", category: "Insulin, Vaccines, Cardiovascular", logoText: "SANOFI", highlight: "Cold Chain & Vaccine Leader" },
  { name: "GlaxoSmithKline", category: "Dermatology, Vaccines, Antibiotics", logoText: "GSK", highlight: "Trusted Global Healthcare" },
  { name: "Micro Labs", category: "Ophthalmology, Dolo 650, Diabetology", logoText: "MICRO LABS", highlight: "Fever & Pain Management Leaders" },
  { name: "Macleods Pharma", category: "Anti-TB, Antimalarial, Orthopedics", logoText: "MACLEODS", highlight: "Fast Growing Indian Stock" },
  { name: "Himalaya Wellness", category: "Ayurvedic, OTC, Personal Care", logoText: "HIMALAYA", highlight: "Herbal Healthcare Pioneer" }
];

export const TRUST_STATS: TrustStat[] = [
  { value: String(ESTABLISHED_YEAR), label: "Year Established", detail: `Registered LLP in Mumbai (LLPIN ${companySettings.licenses.llpin})` },
  { value: String(PRODUCT_CATEGORIES.length - 1), label: "Product Categories", detail: "Formulations, generics, cold chain & more" },
  { value: "2–8°C", label: "Cold Chain Handling", detail: "Insulins, vaccines & biologics" },
  { value: "Same-day", label: "MMR Delivery", detail: "Orders before 2 PM, Monday to Saturday" }
];

/**
 * Named leaders shown on the About and Company Profile pages. Left empty until the real partners'
 * names and roles are confirmed; while empty, those pages show the department overview instead.
 */
export const LEADERSHIP_TEAM: TeamMember[] = [];

export const FAQS: FAQItem[] = [
  {
    q: "Who can purchase from VS Medico?",
    a: "VS Medico is a strict B2B pharmaceutical stockist and wholesaler. We sell exclusively to licensed retail chemist pharmacies, hospital procurement departments, nursing homes, clinics, and authorized sub-stockists holding valid Drug License Form 20B/21B and GSTIN."
  },
  {
    q: "How is VS Medico different from buying directly from a single manufacturer?",
    a: "Unlike single-brand manufacturers who only supply their own products and require separate vendor accounts, VS Medico acts as a single-window wholesale supplier. We supply leading brands (Sun Pharma, Cipla, Alkem, Lupin, Torrent, Abbott, Mankind, Sanofi, GSK, Macleods) on 1 consolidated bill with same-day Mumbai MMR delivery."
  },
  {
    q: "How do I request wholesale prices or PTR/MRP rate lists?",
    a: `You can click on the 'Request Wholesale Quote' button on our website or contact our sales team directly via WhatsApp (${companySettings.contact.whatsapp}) with your pharmacy name and Drug License copy. We instantly provide updated stock availability and net wholesale rates.`
  },
  {
    q: "How does VS Medico manage cold chain products like Insulins & Vaccines?",
    a: "Cold-chain products are kept in dedicated 2°C to 8°C refrigerated storage with continuous temperature logging, following WHO-GDP practices. All cold chain shipments are packed in insulated temperature-monitored boxes with ice gels for MMR transit."
  },
  {
    q: "What is the delivery timeline within Mumbai, Thane, and Navi Mumbai?",
    a: "Orders placed before 2:00 PM are delivered same-day across Bhandup, Mulund, Powai, Thane, Ghatkopar, Kurla, Dadar, and Western suburbs. Emergency hospital critical care orders are dispatched within 2 hours."
  },
  {
    q: "What documents are required to register a new chemist account?",
    a: "To create a wholesale billing account, we require: 1) Copy of Drug License (Form 20B & 21B), 2) GST Registration Certificate, 3) Pharmacist License copy, and 4) Business Pan card."
  }
];
