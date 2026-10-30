import Link from 'next/link';
import { Mail, Phone, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { COMPANY_INFO } from '@/data/companyData';
import { SERVICES } from '@/data/siteContent';
import { telHref } from '@/lib/forms';

const QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/services', label: 'Services' },
  { href: '/who-we-serve', label: 'Who We Serve' },
  { href: '/core-strengths', label: 'Core Strengths' },
  { href: '/compliance', label: 'Compliance' },
  { href: '/company-profile', label: 'Download Company Profile' },
];

export default function Footer() {
  const { contact, address, legalName } = COMPANY_INFO;
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Logo />
            <p className="body-regular mt-5 mb-6 max-w-sm">
              Mumbai&apos;s single-window pharmaceutical wholesaler and super-stockist, supplying licensed chemists and
              hospitals across the MMR since {COMPANY_INFO.establishedYear}.
            </p>
            <Link href="/register" className="btn-orange">
              Open a Wholesale Account <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <div>
            <h2 className="footer-title">Quick Links</h2>
            <ul className="footer-links">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="footer-title">Our Services</h2>
            <ul className="footer-links">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link href="/services">{s.title}</Link>
                </li>
              ))}
              <li>
                <Link href="/network">Delivery Network</Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="footer-title">Contact Us</h2>
            <ul className="footer-contact grid gap-4">
              <li>
                <Mail size={16} aria-hidden="true" />
                <a href={`mailto:${contact.emailSales}`} className="hover:text-teal-brand">
                  {contact.emailSales}
                </a>
              </li>
              <li>
                <Phone size={16} aria-hidden="true" />
                <span>
                  <a href={telHref(contact.phoneSales)} className="hover:text-teal-brand">
                    {contact.phoneSales}
                  </a>
                  <br />
                  <a href={telHref(contact.phoneOffice)} className="hover:text-teal-brand">
                    {contact.phoneOffice}
                  </a>
                </span>
              </li>
              <li>
                <MapPin size={16} aria-hidden="true" />
                <span>
                  {address.building},
                  <br />
                  {address.locality},
                  <br />
                  {address.city} - {address.pincode}, {address.country}
                </span>
              </li>
              <li>
                <Clock size={16} aria-hidden="true" />
                <span>{contact.workingHours}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {legalName}. All rights reserved.
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-1">
            <span>Supplying licensed buyers only.</span>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
