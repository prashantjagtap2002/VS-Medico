"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { NAV_LINKS } from '@/data/siteContent';

function isActive(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Logo />

        <nav aria-label="Main" className="flex items-center gap-6">
          <ul className="nav-menu">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link${isActive(pathname, link.href) ? ' is-active' : ''}`}
                  aria-current={isActive(pathname, link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/register" className="btn-orange header-cta">
            Open Account <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
          <button
            type="button"
            className="menu-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {open && (
        <div id="mobile-nav" className="mobile-nav">
          <div className="container">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`mobile-link${isActive(pathname, link.href) ? ' is-active' : ''}`}
                aria-current={isActive(pathname, link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/register" className="btn-orange mt-4">
              Open Account <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
