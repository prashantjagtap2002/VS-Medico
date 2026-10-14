"use client";

import React, { useEffect, useState } from 'react';
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
  Building2,
  UserPlus
} from 'lucide-react';
import { telHref, whatsappLink } from '@/lib/forms';

export default function Header() {
  const pathname = usePathname();
  const { totalItems, setIsModalOpen, setIsLicenseModalOpen } = useQuoteBasket();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateScrolled = () => {
      setIsScrolled(window.scrollY > 24);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrolled);
        ticking = true;
      }
    };

    updateScrolled();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile drawer on navigation (including browser back/forward) and on Escape.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Brands', href: '/brands' },
    { name: 'Compliance', href: '/compliance' },
    { name: 'Contact Us', href: '/contact' }
  ];

  return (
    <>
      {/* Top Announcement & Verification Bar */}
      <div className={`top-bar ${isScrolled ? 'is-collapsed' : ''}`}>
        <div className="container top-bar-content">
          <div className="top-bar-info">
            <a href={telHref(COMPANY_INFO.contact.phoneSales)} className="top-bar-item hover:text-white">
              <Phone size={14} className="text-secondary" aria-hidden="true" />
              <span>Sales: {COMPANY_INFO.contact.phoneSales}</span>
            </a>
            <a href={`mailto:${COMPANY_INFO.contact.emailSales}`} className="top-bar-item hover:text-white">
              <Mail size={14} className="text-secondary" aria-hidden="true" />
              <span>{COMPANY_INFO.contact.emailSales}</span>
            </a>
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
      <header className={`navbar ${isScrolled ? 'is-scrolled' : ''}`}>
        <div className="container navbar-container">
          {/* Logo */}
          <Link href="/" className="logo-group">
            <div className="logo-icon">
              <Building2 size={24} />
            </div>
            <div className="logo-text-wrapper">
              <div className="logo-title">{COMPANY_INFO.name}</div>
              <div className="logo-subtitle">PHARMA WHOLESALE LLP</div>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="nav-desktop" aria-label="Main navigation">
            <ul className="nav-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                    aria-current={pathname === link.href ? 'page' : undefined}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Action Buttons */}
          <div className="nav-actions">
            <Link href="/register" className="btn btn-primary btn-sm nav-register-btn">
              <UserPlus size={16} aria-hidden="true" />
              <span>Open Account</span>
            </Link>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="btn btn-secondary btn-sm relative"
              aria-label={`Inquiry basket, ${totalItems} item${totalItems === 1 ? '' : 's'}`}
            >
              <ShoppingBag size={18} aria-hidden="true" />
              <span className="nav-btn-label">Inquiry Basket</span>
              {totalItems > 0 && (
                <span aria-hidden="true" className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Button (Only shows on mobile screens) */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle-btn p-2 text-primary"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <nav id="mobile-menu" aria-label="Mobile navigation" className="mobile-drawer-menu bg-white border-b border-slate-200 px-6 py-5 space-y-3 shadow-xl animate-fadeIn">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`block px-4 py-3 rounded-xl font-semibold text-base ${
                  pathname === link.href
                    ? 'bg-sky-50 text-secondary'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary w-full justify-center py-3"
              >
                <UserPlus size={18} aria-hidden="true" /> Open a Wholesale Account
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsLicenseModalOpen(true);
                }}
                className="w-full text-left px-4 py-3 text-sm font-semibold text-emerald-700 bg-emerald-50 rounded-xl flex items-center gap-2"
              >
                <ShieldCheck size={18} /> View Drug License & GST Details
              </button>

              <a
                href={whatsappLink('Hello VS Medico, I would like a wholesale quote.')}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp w-full justify-center py-3"
              >
                <MessageCircle size={18} aria-hidden="true" /> WhatsApp Quick Quote
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
