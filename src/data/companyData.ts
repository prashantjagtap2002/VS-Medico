/**
 * VS MEDICO LLP - Centralized Company Data Configuration (TypeScript)
 */

export interface CompanyLicenses {
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

export const COMPANY_INFO: CompanyInfo = {
  name: "VS Medico",
  legalName: "VS Medico LLP",
  tagline: "Mumbai's Trusted Wholesale Stockist & Pharmaceutical Distributor",
  establishedYear: 1998,
  yearsOfExcellence: "25+",
  
  licenses: {
    drugLicense20B: "MH-MUM-20B-184920",
    drugLicense21B: "MH-MUM-21B-184921",
    issuingAuthority: "Food & Drug Administration (FDA), Maharashtra State",
    gstin: "27AAAAA0000A1Z5",
    pan: "AAAAA0000A",
    fssaiNo: "11521000000123"
  },

  contact: {
    phoneSales: "+91 98200 12345",
    phoneOffice: "+91 022 2595 6789",
    whatsapp: "+91 98200 12345",
    whatsappRaw: "919820012345",
    emailSales: "sales@vsmedico.in",
    emailInfo: "contact@vsmedico.in",
    workingHours: "Monday – Saturday: 9:30 AM to 8:30 PM",
    sundayStatus: "Closed (Emergency Hospital Supply Available on Call)"
  },

  address: {
    building: "F-117, Sharad Industrial Estate Rd",
    locality: "Sadan Wadi, Bhandup West",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400078",
    country: "India",
    landmark: "Near Bhandup Railway Station (West)",
    fullAddress: "F-117, Sharad Industrial Estate Rd, Sadan Wadi, Bhandup West, Mumbai, Maharashtra 400078",
    googleMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.349942767094!2d72.9348123!3d19.1471018!2m3!1f0!0f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b848c772bb01%3A0x6a0584eb2e5d95d1!2sSharad%20Industrial%20Estate!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    mapDirectionsUrl: "https://maps.google.com/?q=Sharad+Industrial+Estate+Bhandup+West+Mumbai"
  },

  businessProfile: {
    role: "Authorized Stockist, Wholesale Distributor & C&F Agent",
    primaryCustomers: "Retail Chemists, Chain Pharmacies, Multispecialty Hospitals, Nursing Homes, Government Institutions, & Sub-Stockists",
    serviceArea: "Mumbai Metropolitan Region (MMR), Thane, Navi Mumbai, Raigad & Extended Maharashtra",
    dailyCapacity: "1,500+ Orders Dispatched Daily",
    skuCount: "5,000+ Active Pharma SKUs",
    activeClients: "1,200+ Registered Retail Chemists & Hospitals",
    temperatureControlledArea: "10,000 Sq. Ft. WHO-GDP Compliant Warehouse with 2°C - 8°C Cold Storage"
  },

  valuePropositions: [
    {
      title: "100% Genuine Sourcing",
      desc: "Direct supply agreements with top tier pharmaceutical manufacturers ensuring zero counterfeit risk and batch traceability."
    },
    {
      title: "WHO-GDP Cold Chain",
      desc: "Dedicated temperature-controlled cold room (2°C to 8°C) and calibrated transit boxes for insulins, vaccines, and biologics."
    },
    {
      title: "Same-Day MMR Delivery",
      desc: "Express dispatch network serving Bhandup, Mulund, Thane, Powai, Ghatkopar, Kurla, Dadar, South Mumbai, and Navi Mumbai."
    },
    {
      title: "Structured B2B Credit & Rates",
      desc: "Competitive wholesale margins, transparent PTR/MRP billing, and flexible credit terms for verified registered chemists."
    }
  ]
};

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

export const PRODUCTS_LIST: ProductItem[] = [
  {
    id: "MED-001",
    name: "Augmentin 625 Duo Tablet",
    brand: "GlaxoSmithKline (GSK)",
    category: "formulations",
    composition: "Amoxycillin (500mg) + Clavulanic Acid (125mg)",
    packSize: "10 Tablets / Strip",
    mrp: "₹223.40",
    ptrEstimate: "Attractive PTR Margin",
    hsnCode: "30049099",
    stockStatus: "In Stock",
    coldChain: false,
    rxRequired: true,
    description: "Broad-spectrum antibiotic formulation for bacterial infections of respiratory tract, skin, and soft tissue."
  },
  {
    id: "MED-002",
    name: "Lantus SoloStar Pen (100IU/ml)",
    brand: "Sanofi India",
    category: "cold-chain",
    composition: "Insulin Glargine (100 IU/ml)",
    packSize: "3ml Pre-filled Pen",
    mrp: "₹685.00",
    ptrEstimate: "Wholesale Margin Available",
    hsnCode: "30043110",
    stockStatus: "In Stock",
    coldChain: true,
    storageTemp: "2°C to 8°C (Cold Chain Mandatory)",
    rxRequired: true,
    description: "Long-acting human insulin analog indicated for glycemic control in adult patients with Diabetes Mellitus."
  },
  {
    id: "MED-003",
    name: "Pan D Capsule",
    brand: "Alkem Laboratories",
    category: "formulations",
    composition: "Pantoprazole (40mg) + Domperidone (30mg SR)",
    packSize: "15 Capsules / Strip",
    mrp: "₹199.00",
    ptrEstimate: "High Wholesale Demand",
    hsnCode: "30049099",
    stockStatus: "In Stock",
    coldChain: false,
    rxRequired: true,
    description: "Proton pump inhibitor combined with prokinetic agent for GERD, acidity, and peptic ulcers."
  },
  {
    id: "MED-004",
    name: "Clexane 40mg Injection",
    brand: "Sanofi / Abbott",
    category: "critical-care",
    composition: "Enoxaparin Sodium (40mg/0.4ml)",
    packSize: "Pre-filled Syringe",
    mrp: "₹620.00",
    ptrEstimate: "Hospital Wholesale Rate",
    hsnCode: "30049099",
    stockStatus: "In Stock",
    coldChain: true,
    storageTemp: "Below 25°C / Cold Controlled",
    rxRequired: true,
    description: "Low Molecular Weight Heparin (LMWH) used to prevent and treat deep vein thrombosis (DVT) and pulmonary embolism."
  },
  {
    id: "MED-005",
    name: "Montair LC Tablet",
    brand: "Cipla Ltd.",
    category: "formulations",
    composition: "Montelukast (10mg) + Levocetirizine (5mg)",
    packSize: "15 Tablets / Strip",
    mrp: "₹340.00",
    ptrEstimate: "Standard PTR Pricing",
    hsnCode: "30049099",
    stockStatus: "In Stock",
    coldChain: false,
    rxRequired: true,
    description: "Dual action antiallergic and leukotriene receptor antagonist for allergic rhinitis and bronchial asthma."
  },
  {
    id: "MED-006",
    name: "Meropenem 1g Injection (Vial)",
    brand: "Cipla / Sun Pharma",
    category: "critical-care",
    composition: "Meropenem IP 1000mg",
    packSize: "1 Vial + WFI",
    mrp: "₹950.00",
    ptrEstimate: "Hospital & ICU Special Rate",
    hsnCode: "30049099",
    stockStatus: "In Stock",
    coldChain: false,
    rxRequired: true,
    description: "Broad-spectrum carbapenem antibiotic for severe hospital-acquired infections and ICU critical care."
  },
  {
    id: "MED-007",
    name: "Telma 40 Tablet",
    brand: "Glenmark Pharmaceuticals",
    category: "formulations",
    composition: "Telmisartan (40mg)",
    packSize: "15 Tablets / Strip",
    mrp: "₹142.00",
    ptrEstimate: "High Demand Stock",
    hsnCode: "30049099",
    stockStatus: "In Stock",
    coldChain: false,
    rxRequired: true,
    description: "Angiotensin II receptor blocker (ARB) indicated for essential hypertension and cardiovascular protection."
  },
  {
    id: "MED-008",
    name: "Paracetamol 650mg Tablets (Trade Generic)",
    brand: "Generic Division",
    category: "generics",
    composition: "Paracetamol IP 650mg",
    packSize: "10 x 10 Tablets Box",
    mrp: "₹320.00 / Box",
    ptrEstimate: "Bulk Generic Rates",
    hsnCode: "30049060",
    stockStatus: "In Stock",
    coldChain: false,
    rxRequired: false,
    description: "Analgesic & antipyretic formulation for high fever and pain relief. High margin generic trade item."
  },
  {
    id: "MED-009",
    name: "Human Mixtard 30/70 100IU/ml Cartridge",
    brand: "Novo Nordisk",
    category: "cold-chain",
    composition: "Biphasic Isophane Insulin (30% soluble / 70% isophane)",
    packSize: "5 x 3ml Penfill Cartridges",
    mrp: "₹1,250.00",
    ptrEstimate: "Cold Chain Wholesale Rate",
    hsnCode: "30043110",
    stockStatus: "In Stock",
    coldChain: true,
    storageTemp: "2°C to 8°C Strict Cold Chain",
    rxRequired: true,
    description: "Premixed human insulin for diabetes mellitus glycemic control."
  },
  {
    id: "MED-010",
    name: "Disposable Syringes with Needle (2ml / 5ml)",
    brand: "BD / Dispovan",
    category: "surgical",
    composition: "Medical Grade Non-toxic Polypropylene",
    packSize: "Box of 100 Units",
    mrp: "₹450.00 / Box",
    ptrEstimate: "Institutional Rate",
    hsnCode: "90183100",
    stockStatus: "In Stock",
    coldChain: false,
    rxRequired: false,
    description: "Sterile single-use syringes with ultra-sharp luer mount needle for clinical and hospital administration."
  },
  {
    id: "MED-011",
    name: "Liv.52 Syrup / Tablets",
    brand: "Himalaya Wellness",
    category: "ayurvedic",
    composition: "Caper Bush, Chicory, Mandur Bhasma & Herbal Extracts",
    packSize: "200ml Bottle / 100 Tabs",
    mrp: "₹170.00",
    ptrEstimate: "Wholesale Discount Available",
    hsnCode: "30049011",
    stockStatus: "In Stock",
    coldChain: false,
    rxRequired: false,
    description: "Hepatoprotective herbal formulation supporting liver health, appetite, and metabolic detoxification."
  },
  {
    id: "MED-012",
    name: "Shelcal 500 Tablet",
    brand: "Torrent Pharmaceuticals",
    category: "otc",
    composition: "Elemental Calcium (500mg) + Vitamin D3 (250 IU)",
    packSize: "15 Tablets / Strip",
    mrp: "₹131.50",
    ptrEstimate: "High Fast-Moving SKU",
    hsnCode: "30045090",
    stockStatus: "In Stock",
    coldChain: false,
    rxRequired: false,
    description: "Calcium and Vitamin D3 supplement for bone mineral density, joint strength, and osteoporosis prevention."
  }
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
  { value: "25+", label: "Years of Wholesale Legacy", detail: "Serving Mumbai since 1998" },
  { value: "5,000+", label: "Active Pharma SKUs", detail: "Formulations, Generics & Cold Chain" },
  { value: "1,200+", label: "Chemist & Hospital Clients", detail: "Registered buyers across MMR" },
  { value: "50+", label: "Pharma MNC Brands", detail: "Direct authorized distribution" }
];

export const FAQS: FAQItem[] = [
  {
    q: "Who can purchase from VS Medico?",
    a: "VS Medico is a strict B2B pharmaceutical stockist and wholesaler. We sell exclusively to licensed retail chemist pharmacies, hospital procurement departments, nursing homes, clinics, and authorized sub-stockists holding valid Drug License Form 20B/21B and GSTIN."
  },
  {
    q: "How do I request wholesale prices or PTR/MRP rate lists?",
    a: "You can click on the 'Request Wholesale Quote' button on our website or contact our sales team directly via WhatsApp (+91 98200 12345) with your pharmacy name and Drug License copy. We instantly provide updated stock availability and net wholesale rates."
  },
  {
    q: "How does VS Medico manage cold chain products like Insulins & Vaccines?",
    a: "We operate a WHO-GDP certified 10,000 sq. ft. facility with dedicated 2°C to 8°C cold rooms equipped with 24/7 digital temperature logging and power backup. All cold chain shipments are packed in insulated temperature-monitored boxes with ice gels for MMR transit."
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
