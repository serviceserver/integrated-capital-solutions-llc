import type { Metadata } from 'next';
import SchemaScript from '@/components/SchemaScript';
import Breadcrumb from '@/components/Breadcrumb';
import ContactForm from '@/components/ContactForm';
import { buildMetadata } from '@/lib/seo';
import { Phone, MapPin, Clock, Mail } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Integrated Capital Solutions — Speak to a Loan Expert',
  description: 'Contact Integrated Capital Solutions by phone or form. Mon–Fri 8:30 AM – 5:00 PM PT. Irvine, CA.',
  slug: '/contact',
  keywords: ['contact Integrated Capital Solutions', 'real estate lender phone number', 'private lender Irvine CA'],
});

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'FinancialService',
  name: 'Integrated Capital Solutions',
  url: 'https://www.integratedcapitalsolutionsllc.com',
  telephone: '+18449222724',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '18400 Von Karman Ave., Suite 500',
    addressLocality: 'Irvine',
    addressRegion: 'CA',
    postalCode: '92612',
    addressCountry: 'US',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
    opens: '08:30',
    closes: '17:00',
  },
};

export default function ContactPage() {
  return (
    <>
      <SchemaScript schema={localBusinessSchema} />

      {/* Hero */}
      <section className="section-dark pt-28 pb-14">
        <div className="container-wide">
          <Breadcrumb items={[{ name: 'Contact', href: '/contact' }]} />
          <h1 className="mt-5 mb-3 text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
            We&apos;re Here to Help
          </h1>
          <p className="text-white/65 text-lg max-w-lg leading-relaxed">
            Have questions or need assistance? Our team is ready to support you every step of the way.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

            {/* ── Left: info ── */}
            <div>
              <h2 className="text-2xl font-bold text-[#0a1628] mb-8">Get in Touch</h2>

              <div className="flex flex-col gap-6 mb-10">
                {[
                  // { icon: <Phone size={18} />, label: 'Phone', value: '(844) 922-2724', href: 'tel:18449222724' },
                  { icon: <Mail size={18} />, label: 'Email', value: 'info@integratedcapitalsolutionsllc.com', href: 'mailto:info@integratedcapitalsolutionsllc.com' },
                  { icon: <MapPin size={18} />, label: 'Address', value: '18400 Von Karman Ave., Suite 500, Irvine, CA 92612', href: 'https://maps.google.com/?q=18400+Von+Karman+Ave+Suite+500+Irvine+CA+92612' },
                  { icon: <Clock size={18} />, label: 'Hours', value: 'Mon – Fri, 8:30 AM – 5:00 PM PT', href: null },
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#0a1628] flex items-center justify-center text-[#c8922a] shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#9aa3b2] mb-1">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-semibold text-[#0a1628] hover:text-[#c8922a] transition-colors">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-[#0a1628]">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Loan Servicing */}
              <div className="bg-[#f7f8fa] border border-[#e8eaef] rounded-xl p-6">
                <h3 className="text-[0.9375rem] font-bold text-[#0a1628] mb-1">
                  Loan Servicing — FCI Lender Services
                </h3>
                <p className="text-xs text-[#9aa3b2] mb-5">For existing loan payment and payoff requests</p>

                <div className="flex flex-col gap-4 text-sm">
                  <div>
                    <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#9aa3b2] mb-1">Payments</p>
                    <p className="font-medium text-[#0a1628]">2175 Hunting Valley lane, Streetsboro, OH, 44241</p>
                  </div>
                  <div>
                    <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#9aa3b2] mb-1">Payoff Requests</p>
                    <a href="mailto:curtis@integratedcapitalsolutionsllc.com" className="text-[#c8922a] font-semibold hover:underline">
                      curtis@integratedcapitalsolutionsllc.com
                    </a>
                  </div>
                  <div>
                    <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#9aa3b2] mb-1">Servicing Inquiries</p>
                    <div className="flex flex-wrap gap-3">
                      <a href="mailto:info@integratedcapitalsolutionsllc.com" className="text-[#c8922a] font-semibold hover:underline">
                        info@integratedcapitalsolutionsllc.com
                      </a>
                      <span className="text-[#9aa3b2]">·</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Right: form ── */}
            <div>
              <h2 className="text-2xl font-bold text-[#0a1628] mb-8">Send Us a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}