"use client";

import React from 'react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/data/companyData';
import { useQuoteBasket } from './QuoteBasketContext';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  MessageCircle,
  ExternalLink
} from 'lucide-react';

export default function Footer() {
  const { setIsLicenseModalOpen } = useQuoteBasket();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: About & Location */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-sky-500 text-white flex items-center justify-center font-extrabold text-xl shrink-0">
                VS
              </div>
              <div>
                <h3 className="text-white text-xl font-bold font-heading">{COMPANY_INFO.legalName}</h3>
                <p className="text-xs text-sky-400 font-semibold tracking-wider">PHARMA WHOLESALE & DISTRIBUTION</p>
              </div>
            </div>

            <p className="text-slate-300 text-sm mb-5 leading-relaxed">
              Authorized pharmaceutical stockist and distributor supplying genuine branded formulations, generic medicines, critical care injectables, and cold-chain products across Mumbai & Maharashtra.
            </p>

            <div className="flex flex-col gap-3 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin size={18} className="text-sky-400 shrink-0 mt-1" />
                <span>{COMPANY_INFO.address.fullAddress}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={18} className="text-emerald-400 shrink-0" />
                <span>Sales: {COMPANY_INFO.contact.phoneSales}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={18} className="text-sky-400 shrink-0" />
                <span>{COMPANY_INFO.contact.emailSales}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={18} className="text-amber-400 shrink-0" />
                <span>{COMPANY_INFO.contact.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col">
            <h4>Quick Navigation</h4>
            <ul className="footer-links">
              <li><Link href="/">Home Overview</Link></li>
              <li><Link href="/about">About Company History</Link></li>
              <li><Link href="/products">Products & Categories</Link></li>
              <li><Link href="/brands">Pharma Brands We Represent</Link></li>
              <li><Link href="/compliance">Licensing & WHO-GDP</Link></li>
              <li><Link href="/contact">Contact & Map Location</Link></li>
            </ul>
          </div>

          {/* Col 3: Key Categories */}
          <div className="footer-col">
            <h4>Product Segments</h4>
            <ul className="footer-links">
              <li><Link href="/products?cat=formulations">Branded Formulations</Link></li>
              <li><Link href="/products?cat=generics">Quality Trade Generics</Link></li>
              <li><Link href="/products?cat=critical-care">Critical Care & ICU Injectables</Link></li>
              <li><Link href="/products?cat=cold-chain">Cold-Chain Vaccines & Insulins</Link></li>
              <li><Link href="/products?cat=surgical">Surgical & Diagnostic Supplies</Link></li>
              <li><Link href="/products?cat=otc">OTC & Health Supplements</Link></li>
            </ul>
          </div>

          {/* Col 4: Regulatory & Compliance */}
          <div className="footer-col">
            <h4>Licensing & Compliance</h4>
            <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
                <ShieldCheck size={18} />
                <span>FDA Maharashtra Verified</span>
              </div>
              <div className="text-xs text-slate-300 flex flex-col gap-1">
                <p><strong className="text-slate-200">Drug License 20B:</strong> {COMPANY_INFO.licenses.drugLicense20B}</p>
                <p><strong className="text-slate-200">Drug License 21B:</strong> {COMPANY_INFO.licenses.drugLicense21B}</p>
                <p><strong className="text-slate-200">GSTIN:</strong> {COMPANY_INFO.licenses.gstin}</p>
              </div>
              <button
                onClick={() => setIsLicenseModalOpen(true)}
                className="text-xs text-sky-300 font-semibold hover:text-white flex items-center gap-1 pt-1"
              >
                <span>View Full Compliance Docs</span>
                <ExternalLink size={12} />
              </button>
            </div>

            <div className="mt-4">
              <a
                href={`https://wa.me/${COMPANY_INFO.contact.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn btn-whatsapp text-xs py-2 justify-center"
              >
                <MessageCircle size={15} /> WhatsApp Wholesale Support
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} {COMPANY_INFO.legalName}. All Rights Reserved.
          </div>
          <div className="text-xs text-slate-400 max-w-xl text-right">
            Disclaimer: VS Medico LLP is a licensed B2B pharmaceutical stockist supplying strictly to registered retail pharmacies, hospitals, and healthcare institutions with valid Drug Licenses (Form 20B/21B).
          </div>
        </div>
      </div>
    </footer>
  );
}
