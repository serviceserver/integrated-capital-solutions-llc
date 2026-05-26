import Link from 'next/link';
import {  Mail } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0a1628] text-white">
      <div className="container-wide py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 shrink-0">
               <Image src="/logo-int.png" alt="Integrated Capital Solutions Logo" width={150} height={40} />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-5 max-w-xs">
              A national, direct, private lender specializing in financing solutions for experienced investors.
            </p>
            {/* <div className="flex items-center gap-3">
              <a href="#" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded bg-white/10 hover:bg-[#c8922a] flex items-center justify-center transition-colors">
                <FaLinkedin size={16} />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 rounded bg-white/10 hover:bg-[#c8922a] flex items-center justify-center transition-colors">
                <FaInstagram size={16} />
              </a>
            </div> */}
          </div>

          {/* Get in Touch */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#c8922a] mb-4">Get in Touch</p>
            <div className="flex flex-col gap-2">
              <Link href="/contact" className="text-white/70 hover:text-white text-sm transition-colors">Contact</Link>
              <a href="mailto:info@integratedcapitalsolutionsllc.com" className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm transition-colors">
                {/* <Phone size={12} /> (844) 922-2724 */}
                <Mail size={12} /> info@integratedcapitalsolutionsllc.com
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#c8922a] mb-4">Products</p>
            <div className="flex flex-col gap-2">
              {[['Ground Up','/ground-up'],['Fix & Flip','/fix-flip'],['DSCR Rental','/dscr-rental'],['Bridge Loan','/bridge-loan']].map(([l,h]) => (
                <Link key={h} href={h} className="text-white/70 hover:text-white text-sm transition-colors">{l}</Link>
              ))}
            </div>
          </div>

          {/* Company + Resources */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#c8922a] mb-4">Company</p>
            <div className="flex flex-col gap-2 mb-6">
              {[['Our Story','/about'],['Team','/team'],['Careers','/careers']].map(([l,h]) => (
                <Link key={h} href={h} className="text-white/70 hover:text-white text-sm transition-colors">{l}</Link>
              ))}
            </div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#c8922a] mb-4">Resources</p>
            <div className="flex flex-col gap-2">
              {[['Blog','/blog'],['FAQ','/faq'],['Glossary','/glossary'],['Lending Locations','/lending-locations'],['Construction Draw','/construction-draw']].map(([l,h]) => (
                <Link key={h} href={h} className="text-white/70 hover:text-white text-sm transition-colors">{l}</Link>
              ))}
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <p className="text-white/40 text-xs leading-relaxed mb-4">
            The Integrated Capital Solutions family of companies utilizes Integrated Capital Solutions Funding, LLC and Integrated Capital Solutions Lending, LLC to conduct its lending operations.
          </p>
          <p className="text-white/35 text-xs leading-relaxed mb-4">
            ©{new Date().getFullYear()} Integrated Capital Solutions Lending, LLC/NMLS ID: 2674250. 2175 Hunting Valley lane, Streetsboro, OH, 44241. In California, loans are made under California Financing Law License #60DBO-203056. Integrated Capital Solutions Lending makes commercial purpose loans secured by brokers and does not make any loans for personal, family, or household use.
          </p>
          <p className="text-white/35 text-xs leading-relaxed mb-6">
            ©{new Date().getFullYear()} Integrated Capital Solutions Funding, LLC/NMLS ID: 2229965. 2175 Hunting Valley lane, Streetsboro, OH, 44241. In California, loans are made under California Financing Law License #60DBO-156808.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <Link href="/terms-of-use" className="text-white/40 hover:text-white/70 text-xs transition-colors">Terms of Use</Link>
            <span className="text-white/20 text-xs">|</span>
            <Link href="/privacy-policy" className="text-white/40 hover:text-white/70 text-xs transition-colors">Privacy Notice</Link>
            <span className="text-white/20 text-xs">|</span>
            <Link href="/site-map" className="text-white/40 hover:text-white/70 text-xs transition-colors">Site Map</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}