import type { Metadata } from 'next';
import SchemaScript from '@/components/SchemaScript';
import Breadcrumb from '@/components/Breadcrumb';
import ContactForm from '@/components/ContactForm';
import { buildMetadata } from '@/lib/seo';
import { prisma } from '@/lib/prisma'
import { Phone, MapPin, Clock, Mail } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Integrated Capital Solutions — Speak to a Loan Expert',
  description: 'Contact Integrated Capital Solutions by phone or form. Mon–Fri 8:30 AM – 5:00 PM PT. Irvine, CA.',
  slug: '/contact',
  keywords: ['contact Integrated Capital Solutions', 'real estate lender phone number', 'private lender Irvine CA'],
});

export const dynamic = 'force-dynamic'

async function getContent() {
  const rows = await prisma.siteContent.findMany()
  const map: Record<string, string> = {}
  for (const r of rows) map[r.key] = r.value
  return map
}

export default async function ContactPage() {
  const content = await getContent()
  const email = content.contact_email ?? 'info@integratedcapitalsolutionsllc.com'
  const phone = content.contact_phone ?? '(844) 922-2724'
  const phoneHref = phone.replace(/[^0-9+]/g, '')
  const address = content.contact_address ?? '18400 Von Karman Ave., Suite 500, Irvine, CA 92612'
  const hours = content.contact_hours ?? 'Mon – Fri, 8:30 AM – 5:00 PM PT'
  const servicingAddress = content.loan_servicing_address ?? '2175 Hunting Valley lane, Streetsboro, OH, 44241'
  const payoffEmail = content.payoff_email ?? 'curtis@integratedcapitalsolutionsllc.com'
  const servicingEmail = content.servicing_email ?? 'info@integratedcapitalsolutionsllc.com'

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Integrated Capital Solutions',
    url: 'https://www.integratedcapitalsolutionsllc.com',
    telephone: phoneHref,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address.split(',').slice(0, -2).join(',').trim(),
      addressLocality: address.split(',')[address.split(',').length - 2]?.trim() ?? 'Irvine',
      addressRegion: 'CA',
      postalCode: address.split(',').pop()?.trim() ?? '92612',
      addressCountry: 'US',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'],
      opens: '08:30',
      closes: '17:00',
    },
  };

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
                  { icon: <Mail size={18} />, label: 'Email', value: email, href: `mailto:${email}` },
                  { icon: <MapPin size={18} />, label: 'Address', value: address, href: `https://maps.google.com/?q=${encodeURIComponent(address)}` },
                  { icon: <Clock size={18} />, label: 'Hours', value: hours, href: null },
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
                    <p className="font-medium text-[#0a1628]">{servicingAddress}</p>
                  </div>
                  <div>
                    <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#9aa3b2] mb-1">Payoff Requests</p>
                    <a href={`mailto:${payoffEmail}`} className="text-[#c8922a] font-semibold hover:underline">
                      {payoffEmail}
                    </a>
                  </div>
                  <div>
                    <p className="text-[0.6875rem] font-bold uppercase tracking-widest text-[#9aa3b2] mb-1">Servicing Inquiries</p>
                    <div className="flex flex-wrap gap-3">
                      <a href={`mailto:${servicingEmail}`} className="text-[#c8922a] font-semibold hover:underline">
                        {servicingEmail}
                      </a>
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
