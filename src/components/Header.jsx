"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { COMPANY_INFO } from '@/data/companyData';
import { useQuoteBasket } from './QuoteBasketContext';
import { 
  Phone, 
  Mail, 
  ShieldCheck, 
  Clock, 
  ShoppingBag, 
  MessageCircle, 
  Menu, 
  X,
  FileCheck,
  Building2
} from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const { totalItems, setIsModalOpen, setIsLicenseModalOpen } = useQuoteBasket();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products Catalog', href: '/products' },
    { name: 'Brands We Deal In', href: '/brands' },
    { name: 'Licensing & Compliance', href: '/compliance' },
    { name: 'Contact Us', href: '/contact' }
  ];

  return (
    <>
      {/* Top Announcement & Verification Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-info">
            <div className="top-bar-item">
              <Phone size={14} className="text-secondary" />
              <span>Sales: {COMPANY_INFO.contact.phoneSales}</span>
            </div>
            <div className="top-bar-item">
              <Mail size={14} className="text-secondary" />
              <span>{COMPANY_INFO.contact.emailSales}</span>
            </div>
            <div className="top-bar-item">
              <Clock size={14} className="text-secondary" />
              <span>{COMPANY_INFO.contact.workingHours}</span>
            </div>
          </div>

          <div className="top-bar-info">
            <button 
              onClick={() => setIsLicenseModalOpen(true)}
              className="top-bar-badge hover:opacity-90 transition-opacity"
              title="Click to view full FDA Drug License & GST details"
            >
              <ShieldCheck size={13} />
              <span>FDA Licensed (20B/21B)</span>
            </button>

            <div className="top-bar-item text-xs text-slate-300">
              <FileCheck size={13} className="text-emerald-400" />
              <span>GSTIN: {COMPANY_INFO.licenses.gstin}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="navbar">
        <div className="container navbar-container">
          {/* Logo */}
          <Link href="/" className="logo-group">
            <div className="logo-icon">
              <Building2 size={24} />
            </div>
            <div>
              <div className="logo-title">{COMPANY_INFO.name}</div>
              <div className="logo-subtitle">PHARMA WHOLESALE LLP</div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:block">
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Action Buttons */}
          <div className="nav-actions">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-secondary btn-sm relative"
              title="View Quote Basket"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline">Inquiry Basket</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>

            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsappRaw}?text=Hello%20VS%20Medico,%20I%20would%20like%20to%20inquire%20about%20pharmaceutical%20wholesale%20rates.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm hidden lg:inline-flex"
            >
              <MessageCircle size={18} />
              <span>WhatsApp Direct</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-primary focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-lg animate-fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md font-semibold text-base ${
                  pathname === link.href
                    ? 'bg-sky-50 text-secondary'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLicenseModalOpen(true);
                }}
                className="w-full text-left px-3 py-2 text-sm font-semibold text-emerald-700 bg-emerald-50 rounded-md flex items-center gap-2"
              >
                <ShieldCheck size={16} /> View Drug License & GST Details
              </button>

              <a
                href={`https://wa.me/${COMPANY_INFO.contact.whatsappRaw}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full justify-center"
              >
                <MessageCircle size={18} /> WhatsApp Quick Quote
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
