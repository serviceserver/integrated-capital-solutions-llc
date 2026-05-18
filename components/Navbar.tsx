'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Phone, X, Menu } from 'lucide-react';
import DropdownMenu from './DropdownMenu';
import Image from 'next/image';

const products = [
  { label: 'Ground Up', href: '/ground-up' },
  { label: 'Fix & Flip', href: '/fix-flip' },
  { label: 'DSCR Rental', href: '/dscr-rental' },
  { label: 'Bridge Loan', href: '/bridge-loan' },
];
const about = [
  { label: 'Our Story', href: '/about' },
  { label: 'Team', href: '/team' },
  { label: 'Careers', href: '/careers' },
];
const resources = [
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Lending Locations', href: '/lending-locations' },
  { label: 'Construction Draw', href: '/construction-draw' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#ffffff] shadow-lg' : 'bg-[#ffffff]/95 backdrop-blur-sm'}`}>
        <div className="container-wide">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
               <Image src="/logo-int.jpg" alt="Integrated Capital Solutions Logo" width={150} height={40} />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              <DropdownMenu items={products} label="Products" id="products" setOpenDropdown={setOpenDropdown} openDropdown={openDropdown} />
              <DropdownMenu items={about} label="About" id="about" setOpenDropdown={setOpenDropdown} openDropdown={openDropdown} />
              <Link href="/brokers" className="text-sm font-semibold text-gray/90 hover:text-gray transition-colors py-2 px-1">Brokers</Link>
              <DropdownMenu items={resources} label="Resources" id="resources" setOpenDropdown={setOpenDropdown} openDropdown={openDropdown} />
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <a href="tel:16612273649" className="flex items-center gap-1.5 text-sm text-gray/80 hover:text-gray transition-colors font-medium">
                <Phone size={14} />
                (661) 227-3649
              </a>
              <Link href="/app" className="btn-primary text-sm py-2 px-4">Get an Estimate</Link>
            </div>

            {/* Mobile toggle */}
            <button className="lg:hidden text-gray p-1" onClick={() => setMobileOpen(!mobileOpen)}>
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0a1628] pt-16 overflow-y-auto">
          <div className="container-wide py-6 flex flex-col gap-1">
            <p className="text-xs font-bold uppercase tracking-widest text-[#c8922a] mb-2 mt-2">Products</p>
            {products.map(p => <Link key={p.href} href={p.href} className="text-gray/85 hover:text-white font-medium py-2.5 border-b border-white/10 text-sm" onClick={() => setMobileOpen(false)}>{p.label}</Link>)}
            <p className="text-xs font-bold uppercase tracking-widest text-[#c8922a] mb-2 mt-4">About</p>
            {about.map(p => <Link key={p.href} href={p.href} className="text-white/85 hover:text-white font-medium py-2.5 border-b border-white/10 text-sm" onClick={() => setMobileOpen(false)}>{p.label}</Link>)}
            <Link href="/brokers" className="text-white/85 hover:text-white font-semibold py-3 border-b border-white/10 text-sm mt-4" onClick={() => setMobileOpen(false)}>Brokers</Link>
            <p className="text-xs font-bold uppercase tracking-widest text-[#c8922a] mb-2 mt-4">Resources</p>
            {resources.map(p => <Link key={p.href} href={p.href} className="text-white/85 hover:text-white font-medium py-2.5 border-b border-white/10 text-sm" onClick={() => setMobileOpen(false)}>{p.label}</Link>)}
            <div className="mt-8 flex flex-col gap-3">
              <a href="tel:16612273649" className="btn-secondary w-full justify-center text-sm">
                <Phone size={14} /> (661) 227-3649
              </a>
              <Link href="/app" className="btn-primary w-full justify-center text-sm" onClick={() => setMobileOpen(false)}>Get an Estimate</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}