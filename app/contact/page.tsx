// app/contact/page.tsx
import type { Metadata } from 'next';
import SchemaScript from '@/components/SchemaScript';
import Breadcrumb from '@/components/Breadcrumb';
import { buildMetadata } from '@/lib/seo';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Integrated Capital Solutions — Speak to a Loan Expert',
  description:
    'Contact Integrated Capital Solutions by phone, form, or visit us in Irvine, CA. Our team is available Mon–Fri 8:30 AM to 5:00 PM PT to answer your real estate lending questions.',
  slug: '/contact',
  keywords: ['contact Integrated Capital Solutions', 'real estate lender phone number', 'private lender Irvine CA', 'loan inquiry contact'],
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
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '08:30',
    closes: '17:00',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 33.6846,
    longitude: -117.8265,
  },
};

const contactInfo = [
  { icon: <Phone size={18} />, label: 'Phone', value: '(844) 922-2724', href: 'tel:18449222724' },
  { icon: <MapPin size={18} />, label: 'Address', value: '18400 Von Karman Ave., Suite 500, Irvine, CA 92612', href: 'https://maps.google.com/?q=18400+Von+Karman+Ave+Suite+500+Irvine+CA+92612' },
  { icon: <Clock size={18} />, label: 'Hours', value: 'Mon – Fri, 8:30 AM – 5:00 PM PT', href: null },
];

export default function ContactPage() {
  return (
    <>
      <SchemaScript schema={localBusinessSchema} />

      <section className="section-dark pt-28 pb-14">
        <div className="container-wide">
          <Breadcrumb items={[{ name: 'Contact', href: '/contact' }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-5 mb-3">We&apos;re Here to Help</h1>
          <p className="text-white/65 text-lg max-w-xl">
            Have questions or need assistance? Our team is ready to support you every step of the way.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact info */}
            <div>
              <h2 className="text-2xl font-bold text-[#0a1628] mb-8">Get in Touch</h2>
              <div className="flex flex-col gap-6 mb-10">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg bg-[#0a1628] flex items-center justify-center text-[#c8922a] flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#9aa3b2] mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-[#0a1628] font-semibold hover:text-[#c8922a] transition-colors text-sm">
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-[#0a1628] font-semibold text-sm">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Loan Servicing */}
              <div className="bg-[#f7f8fa] rounded-xl p-6 border border-[#e8eaef]">
                <h3 className="font-bold text-[#0a1628] mb-1">Loan Servicing — FCI Lender Services</h3>
                <p className="text-xs text-[#9aa3b2] mb-4">For existing loan payment and servicing inquiries</p>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9aa3b2]">Payments</span>
                    <span className="text-[#0a1628] font-medium">ACH / Bill Pay: P.O. Box 27370, Anaheim, CA 92809</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9aa3b2]">Payoff Requests</span>
                    <a href="mailto:payoff@myfci.com" className="text-[#c8922a] hover:underline font-medium">payoff@myfci.com</a>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#9aa3b2]">Loan Servicing Inquiries</span>
                    <div className="flex gap-3">
                      <a href="mailto:loanservicing@myfci.com" className="text-[#c8922a] hover:underline font-medium">loanservicing@myfci.com</a>
                      <span className="text-[#9aa3b2]">|</span>
                      <a href="tel:18009312424" className="text-[#c8922a] hover:underline font-medium">(800) 931-2424</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <h2 className="text-2xl font-bold text-[#0a1628] mb-8">Send Us a Message</h2>
              <form className="flex flex-col gap-4" aria-label="Contact form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contactFirst" className="text-sm font-semibold text-[#0a1628]">First Name *</label>
                    <input id="contactFirst" type="text" required placeholder="John"
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contactLast" className="text-sm font-semibold text-[#0a1628]">Last Name *</label>
                    <input id="contactLast" type="text" required placeholder="Smith"
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contactCompany" className="text-sm font-semibold text-[#0a1628]">Company</label>
                  <input id="contactCompany" type="text" placeholder="Your company name"
                    className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contactPhone" className="text-sm font-semibold text-[#0a1628]">Phone *</label>
                  <input id="contactPhone" type="tel" required placeholder="(555) 000-0000"
                    className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contactEmail" className="text-sm font-semibold text-[#0a1628]">Email *</label>
                  <input id="contactEmail" type="email" required placeholder="john@example.com"
                    className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="contactMessage" className="text-sm font-semibold text-[#0a1628]">Message *</label>
                  <textarea id="contactMessage" rows={5} required placeholder="How can we help you?"
                    className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all resize-none" />
                </div>
                <button type="submit" className="btn-primary justify-center py-3 mt-1">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}