/**
 * Page copy for the marketing pages (services, strengths, network, audiences…).
 * Company facts such as contact details and licences stay in companyData.ts /
 * content/settings so they can be edited from the admin panel.
 */

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/network', label: 'Network' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/services', label: 'Services' },
  { href: '/core-strengths', label: 'Core Strengths' },
  { href: '/compliance', label: 'Compliance' },
  { href: '/contact', label: 'Contact' },
] as const;

export interface ServiceItem {
  id: string;
  title: string;
  desc: string;
  /** lucide-react icon name, drawn when there is no photo. */
  icon: 'Boxes' | 'Snowflake' | 'Hospital' | 'Truck';
  image?: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: 'wholesale',
    title: 'Wholesale Distribution',
    desc: 'Single-window stockist supply of 5,000+ SKUs from 50+ manufacturers, billed on one consolidated invoice at transparent net PTR rates.',
    icon: 'Boxes',
    image: '/images/warehouse.webp',
  },
  {
    id: 'cold-chain',
    title: 'Cold Chain Logistics',
    desc: 'WHO-GDP aligned 2°C – 8°C cold rooms with 24/7 temperature logging and insulated gel-pack transit for insulins, vaccines and biologics.',
    icon: 'Snowflake',
  },
  {
    id: 'institutional',
    title: 'Hospital & Institutional Supply',
    desc: 'Rate-contract supply for hospitals, nursing homes and ICUs, with priority dispatch for critical-care and emergency requirements.',
    icon: 'Hospital',
  },
  {
    id: 'delivery',
    title: 'Same-Day MMR Delivery',
    desc: 'Orders placed before the 2 PM cut-off leave our Bhandup West hub the same day for chemists and hospitals across Mumbai and Thane.',
    icon: 'Truck',
  },
];

export const SERVICE_PORTFOLIO = [
  {
    title: 'Sourcing & Procurement',
    items: [
      'Direct authorised stockist partnerships with manufacturers',
      'Multi-brand sourcing across 50+ pharma companies',
      'Short-supply and hard-to-find SKU tracing',
      'Hospital indents and rate-contract procurement',
    ],
  },
  {
    title: 'Storage & Warehousing',
    items: [
      '10,000 sq. ft. temperature-controlled warehouse',
      'Batch-wise and expiry-wise stock rotation',
      'Segregated storage for Schedule H / H1 stock',
      'Racked, barcoded inventory for fast picking',
    ],
  },
  {
    title: 'Cold Chain Management',
    items: [
      'Dedicated 2°C – 8°C cold rooms',
      '24/7 digital temperature monitoring with power backup',
      'Validated insulated boxes and gel packs for transit',
      'Separate handling for insulins, vaccines and biologics',
    ],
  },
  {
    title: 'Order Processing & Billing',
    items: [
      'Orders by phone, WhatsApp or the website',
      'One consolidated GST invoice across brands',
      'Batch numbers and expiry printed on every invoice',
      'Structured credit terms for registered accounts',
    ],
  },
  {
    title: 'Delivery & Logistics',
    items: [
      'Same-day dispatch for orders before 2 PM',
      'Hyper-local delivery runs across the MMR',
      'Two-hour emergency dispatch for hospitals',
      'Delivery confirmation on every consignment',
    ],
  },
  {
    title: 'Compliance & Documentation',
    items: [
      'Drug Licence Form 20B / 21B verified buyers only',
      'Complete invoice audit trail for every batch',
      'Recall readiness through batch-level records',
      'Licence and GST documentation on request',
    ],
  },
];

export const THERAPEUTIC_SEGMENTS = [
  'Cardiology',
  'Diabetology',
  'Anti-infectives',
  'Respiratory',
  'Gastroenterology',
  'CNS & Psychiatry',
  'Oncology Support',
  'Nephrology',
  'Dermatology',
  'Ophthalmology',
  'Pain Management',
  'Vaccines & Biologics',
  'Critical Care Injectables',
  'Nutrition & Supplements',
  'Ayurvedic & Herbal',
];

export const CORE_STRENGTHS = [
  {
    title: 'Single-Window Sourcing',
    desc: 'One account, one order and one invoice for 50+ leading pharma brands instead of a dozen separate distributors.',
  },
  {
    title: '25+ Years in Pharma Trade',
    desc: 'Serving Mumbai’s chemists and hospitals since 1998, with long-standing manufacturer and stockist relationships.',
  },
  {
    title: 'Cold Chain Infrastructure',
    desc: 'Temperature-mapped 2°C – 8°C cold rooms with continuous logging, backed by validated transit packaging.',
  },
  {
    title: 'Compliance Excellence',
    desc: 'FDA Maharashtra licensed under Form 20B / 21B, with batch-level traceability on every invoice we raise.',
  },
  {
    title: 'Same-Day Operations',
    desc: 'A Bhandup West hub that picks, packs and dispatches the same day for orders received before 2 PM.',
  },
  {
    title: 'Scale & Capacity',
    desc: '5,000+ active SKUs and 1,500+ order lines dispatched daily for 1,200+ registered chemists and hospitals.',
  },
];

export const CAPABILITIES = {
  operations: {
    title: 'Operational Expertise',
    items: [
      {
        title: 'Multi-Brand Inventory',
        desc: 'Deep stock across formulations, generics, critical care, cold chain, OTC, surgical and Ayurvedic ranges.',
      },
      {
        title: 'Temperature-Controlled Storage',
        desc: 'Cold rooms and ambient zones run to WHO-GDP practices, with logs available for audit.',
      },
      {
        title: 'Hyper-Local Logistics',
        desc: 'Planned delivery runs across Bhandup, Mulund, Thane, Powai, Ghatkopar, Kurla, Dadar and beyond.',
      },
    ],
  },
  accounts: {
    title: 'Account Management',
    items: [
      {
        title: 'Single Point of Contact',
        desc: 'Every registered account has a sales contact for rates, availability and order follow-up.',
      },
      {
        title: 'Transparent Pricing',
        desc: 'Net PTR rates, clear schemes and structured credit with no hidden charges on the bill.',
      },
      {
        title: 'Institutional Contracts',
        desc: 'Rate contracts and scheduled supply for hospitals, nursing homes and procurement departments.',
      },
    ],
  },
};

export const SCALE_STATS = [
  { value: '5,000+', label: 'Active SKUs', detail: 'Formulations, generics, cold chain and surgical' },
  { value: '1,500+', label: 'Orders Daily', detail: 'Order lines picked and dispatched every day' },
  { value: '10,000', label: 'Sq. Ft. Warehouse', detail: 'Including dedicated 2°C – 8°C cold storage' },
];

export const TEAMS = [
  { title: 'Sales & Key Accounts', desc: 'Rates, schemes, onboarding and institutional accounts' },
  { title: 'Warehouse & Logistics', desc: 'Picking, packing, cold chain and delivery runs' },
  { title: 'Quality & Regulatory', desc: 'Licensing, batch records and GDP adherence' },
  { title: 'Billing & Accounts', desc: 'Invoicing, credit control and documentation' },
];

export const PROCESS_STEPS = [
  {
    title: 'Account Verification',
    desc: 'We verify the buyer’s Drug Licence (Form 20B / 21B), GST registration and pharmacist details before opening an account.',
  },
  {
    title: 'Order Placement',
    desc: 'Orders arrive by phone, WhatsApp or the website, and our team confirms availability and net rates.',
  },
  {
    title: 'Stock Allocation',
    desc: 'Stock is allocated batch-wise with expiry checks, so no near-expiry item leaves without consent.',
  },
  {
    title: 'Billing & Documentation',
    desc: 'One consolidated GST invoice with batch numbers and expiry dates for every line item.',
  },
  {
    title: 'Packing & Cold Chain',
    desc: 'Cold-chain items are packed in validated insulated boxes with gel packs; everything else is sealed and labelled.',
  },
  {
    title: 'Dispatch & Delivery',
    desc: 'Same-day dispatch for orders before 2 PM, with priority runs for hospital emergencies.',
  },
];

export const DIFFERENTIATORS = [
  {
    title: 'Single-Window Supply',
    desc: 'Unlike single-brand manufacturers or fragmented traders, we supply 50+ brands on one bill with one delivery, so buyers manage one relationship instead of many.',
  },
  {
    title: 'Decades of Trade Experience',
    desc: 'More than 25 years of pharmaceutical wholesale in Mumbai, serving neighbourhood chemists through to multispecialty hospitals.',
  },
  {
    title: 'Factory-Direct Genuine Stock',
    desc: 'Sourced only from manufacturers or their authorised stockists, with complete batch traceability and zero grey-market risk.',
  },
  {
    title: 'Compliance by Default',
    desc: 'We sell only to licensed buyers, keep a full invoice audit trail and follow WHO-GDP storage practices for every product line.',
  },
];

/* ---------- Customers ---------- */

export type SegmentType = 'retail' | 'institutional' | 'government' | 'trade';

export const SEGMENT_TYPES: Record<SegmentType, { label: string; color: string; bg: string }> = {
  retail: { label: 'Retail', color: '#008080', bg: '#e6f7f7' },
  institutional: { label: 'Institutional', color: '#d97706', bg: '#fff4e5' },
  government: { label: 'Government & Trust', color: '#1d4ed8', bg: '#e8f1fd' },
  trade: { label: 'Trade Partner', color: '#1e7b45', bg: '#e9f7ef' },
};

export const CUSTOMER_SEGMENTS: { short: string; name: string; type: SegmentType }[] = [
  { short: 'Chemists', name: 'Independent retail chemists and medical stores', type: 'retail' },
  { short: 'Chains', name: 'Multi-outlet pharmacy chains', type: 'retail' },
  { short: 'Hospitals', name: 'Multispecialty and super-speciality hospitals', type: 'institutional' },
  { short: 'Nursing Homes', name: 'Nursing homes and maternity homes', type: 'institutional' },
  { short: 'ICUs', name: 'Critical care and ICU units', type: 'institutional' },
  { short: 'Clinics', name: 'Clinics, polyclinics and day-care centres', type: 'institutional' },
  { short: 'Diagnostics', name: 'Diagnostic centres and pathology labs', type: 'institutional' },
  { short: 'Procurement', name: 'Government procurement departments', type: 'government' },
  { short: 'Trust Hospitals', name: 'Charitable and trust-run hospitals', type: 'government' },
  { short: 'Dispensaries', name: 'Municipal and corporate dispensaries', type: 'government' },
  { short: 'Sub-Stockists', name: 'Licensed sub-stockists and distributors', type: 'trade' },
  { short: 'Institutions', name: 'Corporate medical rooms and institutions', type: 'trade' },
];

export const AUDIENCE_LEVELS = [
  {
    title: 'Retail Chemists & Pharmacies',
    subtitle: 'The everyday backbone of our distribution',
    image: '/images/warehouse.webp',
    points: ['Independent medical stores', 'Pharmacy chains and franchise outlets', 'Daily top-up and scheme-based ordering'],
  },
  {
    title: 'Hospitals & Nursing Homes',
    subtitle: 'Scheduled and emergency institutional supply',
    image: undefined,
    points: [
      'Multispecialty and super-speciality hospitals',
      'Nursing homes and maternity homes',
      'ICU, OT and critical-care requirements',
      'In-house hospital pharmacies',
    ],
  },
  {
    title: 'Clinics, Labs & Trade Partners',
    subtitle: 'Specialised and trade-to-trade supply',
    image: undefined,
    points: [
      'Clinics and polyclinics',
      'Diagnostic centres and pathology labs',
      'Licensed sub-stockists and distributors',
      'Corporate and institutional medical rooms',
    ],
  },
];

export const SPECIAL_REQUIREMENTS = [
  'Insulin & Diabetes Care',
  'Vaccines & Biologics',
  'Critical Care Injectables',
  'Oncology Support Medicines',
  'Surgical Consumables',
  'Emergency Hospital Indents',
  'Schedule H / H1 Medicines',
];

export const INSTITUTION_GROUPS = [
  {
    title: 'Private Healthcare',
    items: ['Multispecialty hospitals', 'Nursing homes', 'Pharmacy chains', 'Diagnostic centres', 'Corporate medical rooms'],
  },
  {
    title: 'Government, Trust & Public Bodies',
    items: ['Government procurement departments', 'Charitable and trust hospitals', 'Municipal dispensaries', 'Public health programmes'],
  },
];

export const TRADE_PARTNERS = [
  { title: 'Sub-Stockists', desc: 'Licensed sub-stockists who need dependable multi-brand supply on credit.' },
  { title: 'Distributors', desc: 'Trade-to-trade supply for distributors covering short-supply brands.' },
  { title: 'Institutional Buyers', desc: 'Corporates, schools and organisations running medical rooms.' },
];

/* ---------- Network ---------- */

export type RegionId = 'central' | 'eastern' | 'western' | 'thane' | 'navi-mumbai' | 'extended';

export const REGIONS: Record<RegionId, { label: string; tag: string }> = {
  central: { label: 'Central Suburbs', tag: 'tag-teal' },
  eastern: { label: 'Eastern Suburbs', tag: 'tag-blue' },
  western: { label: 'Western Suburbs', tag: 'tag-purple' },
  thane: { label: 'Thane', tag: 'tag-orange' },
  'navi-mumbai': { label: 'Navi Mumbai', tag: 'tag-green' },
  extended: { label: 'Extended Maharashtra', tag: 'tag-red' },
};

export interface NetworkArea {
  area: string;
  region: RegionId;
  customers: string;
  delivery: 'Same-day' | 'Scheduled';
}

export const NETWORK_AREAS: NetworkArea[] = [
  { area: 'Bhandup (Hub)', region: 'central', customers: 'Chemists, hospitals & nursing homes', delivery: 'Same-day' },
  { area: 'Mulund', region: 'central', customers: 'Chemists & nursing homes', delivery: 'Same-day' },
  { area: 'Ghatkopar', region: 'central', customers: 'Chemists, hospitals & pharmacy chains', delivery: 'Same-day' },
  { area: 'Kurla', region: 'central', customers: 'Chemists & clinics', delivery: 'Same-day' },
  { area: 'Dadar', region: 'central', customers: 'Chemists & hospitals', delivery: 'Same-day' },
  { area: 'Powai', region: 'eastern', customers: 'Hospitals, clinics & pharmacy chains', delivery: 'Same-day' },
  { area: 'Western Suburbs', region: 'western', customers: 'Chemists & pharmacy chains', delivery: 'Same-day' },
  { area: 'Thane', region: 'thane', customers: 'Chemists, hospitals & nursing homes', delivery: 'Same-day' },
  { area: 'Navi Mumbai', region: 'navi-mumbai', customers: 'Hospitals & chemists', delivery: 'Scheduled' },
  { area: 'Extended Maharashtra', region: 'extended', customers: 'Sub-stockists & institutions', delivery: 'Scheduled' },
];

/* ---------- Compliance ---------- */

export const COMPLIANCE_GROUPS = [
  { title: 'Drug Licensing', items: ['Form 20B Wholesale Licence', 'Form 21B Wholesale Licence', 'FDA Maharashtra', 'Registered Pharmacist'] },
  { title: 'Storage & Quality', items: ['WHO-GDP Practices', '2°C – 8°C Cold Storage', '24/7 Temperature Logging', 'Batch Traceability'] },
  { title: 'Tax & Business', items: ['GST Registered', 'PAN Registered', 'FSSAI Licensed'] },
];

export const COMPLIANCE_FRAMEWORK = {
  regulatory: {
    title: 'Regulatory & Licensing Standards',
    items: [
      {
        title: 'Drugs and Cosmetics Act, 1940',
        desc: 'Wholesale operations licensed and run under the Act and its Rules, administered by FDA Maharashtra.',
      },
      {
        title: 'Form 20B / 21B Wholesale Licences',
        desc: 'Valid wholesale drug licences for general and specified categories of medicines.',
      },
      {
        title: 'Licensed-Buyer Policy',
        desc: 'Sales only to buyers holding a valid Drug Licence and GSTIN, verified before account opening.',
      },
      {
        title: 'Schedule H / H1 Controls',
        desc: 'Prescription-only medicines supplied to licensed buyers with the records the Rules require.',
      },
    ],
  },
  quality: {
    title: 'Quality & Storage Standards',
    items: [
      {
        title: 'WHO Good Distribution Practices',
        desc: 'Storage, handling and transport aligned with WHO-GDP guidance for pharmaceutical distribution.',
      },
      {
        title: 'Cold Chain Integrity',
        desc: 'Continuous 2°C – 8°C monitoring with alarms, power backup and validated transit packaging.',
      },
      {
        title: 'Batch & Expiry Control',
        desc: 'Batch-wise allocation and expiry-first rotation; no near-expiry dispatch without written consent.',
      },
      {
        title: 'GST & Invoice Compliance',
        desc: 'GST-compliant invoices with batch, expiry and HSN details on every line item.',
      },
    ],
  },
};

export const SPECIALISED_COMPLIANCE = [
  {
    title: 'Genuine-Stock Guarantee',
    desc: 'Every product is sourced directly from the manufacturer or its authorised stockist, protecting buyers from counterfeit and grey-market stock.',
  },
  {
    title: 'Recall Readiness',
    desc: 'Batch numbers on every invoice let us trace and recall any affected batch quickly, down to the individual customer.',
  },
  {
    title: 'Cold Chain Documentation',
    desc: 'Temperature logs for cold rooms and records for cold-chain dispatches are kept and shared with institutional buyers on request.',
  },
  {
    title: 'Data & Document Privacy',
    desc: 'Licence copies and business documents shared during registration are used only for verification and billing.',
  },
];

export const BUYER_DOCUMENTS = [
  { title: 'Drug Licence', desc: 'Copy of Form 20B and Form 21B licences in the buyer’s name.' },
  { title: 'GST Certificate', desc: 'GST registration certificate matching the billing name and address.' },
  { title: 'Pharmacist & PAN', desc: 'Registered pharmacist licence copy and the business PAN card.' },
];
