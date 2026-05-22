import type { Metadata } from 'next';
import Link from 'next/link';
import BrokerForm from '@/components/BrokerForm';
import FAQAccordion from '@/components/FAQAccordion';
import CTABanner from '@/components/CTABanner';
import SchemaScript from '@/components/SchemaScript';
import { buildMetadata, faqPageSchema } from '@/lib/seo';
import { Star, Handshake, Zap, Settings } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Broker Program — Partner with Integrated Capital Solutions',
  description: 'Integrated Capital Solutions partners with real estate brokers nationwide. Fast closings, 24-hour term sheets, and a full suite of loan products for your clients.',
  slug: '/brokers',
  keywords: ['real estate broker program','broker partner private lender','fix flip broker','DSCR broker lender'],
});

const brokerFAQs = [
  { question: 'Does Integrated Capital Solutions work with mortgage brokers?', answer: 'Yes. Integrated Capital Solutions works extensively with mortgage brokers and real estate professionals nationwide and is always looking for new broker partnerships.' },
  { question: 'How do brokers submit a loan to Integrated Capital Solutions?', answer: 'Complete the broker registration form on this page. Once registered, your Account Executive will walk you through the submission process.' },
  { question: 'How quickly will my client receive a term sheet?', answer: 'Integrated Capital Solutions provides term sheets within 24 hours of a complete loan inquiry submission. Closings typically take 7–14 days depending on loan type.' },
  { question: 'What loan products are available through the broker channel?', answer: 'All Integrated Capital Solutions products are available: Ground Up Construction, Fix & Flip, DSCR Rental, and Bridge Loans. Loan amounts from $55K to $50M+.' },
];

const testimonials = [
  { name: 'Dawna T.', role: 'Mortgage Broker', quote: "Integrated Capital Solutions is hands-down the most reliable private lending partner I've worked with. Their responsiveness is unmatched — every time I submit a file, I know exactly where it stands and when it will close." },
  { name: 'Jason S.', role: 'Real Estate Broker', quote: "First deal with Integrated Capital Solutions and the process was smoother than any lender I've used before. Tight timeline, moving parts everywhere, and they delivered without a single hiccup." },
  { name: 'Jason F.', role: 'Mortgage Broker', quote: "Another lender ghosted my client at the last minute. I called Integrated Capital Solutions on a Wednesday, had a term sheet by Thursday, and we closed the following Wednesday. That's 7 days from first call to funded." },
];

const products = [
  { label: 'Ground Up', href: '/ground-up', term: '12–30 Months', amount: '$250K–$5M+', leverage: 'Up to 90% LTC' },
  { label: 'Fix & Flip', href: '/fix-flip', term: '6–30 Months', amount: '$150K–$5M+', leverage: 'Up to 95% LTC' },
  { label: 'DSCR Rental', href: '/dscr-rental', term: '30 Years', amount: '$75K–$2.5M', leverage: 'Up to 80% LTV' },
  { label: 'Bridge Loan', href: '/bridge-loan', term: '6–15 Months', amount: '$150K–$5M+', leverage: 'Up to 80% LTV' },
];

export default function BrokersPage() {
  return (
    <>
      <SchemaScript schema={faqPageSchema(brokerFAQs)} />

      {/* Hero */}
      <section className="section-dark pt-28 pb-16">
        <div className="container-wide">
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight mb-4 max-w-2xl">
            Strategic Lending Solutions for<br />Brokers and Their Clients
          </h1>
          <p className="text-white/65 text-lg max-w-xl leading-relaxed mb-8">
            Partner with Integrated Capital Solutions to offer your clients fast, flexible private lending solutions
            across all major residential investment strategies.
          </p>
          <a href="#broker-form" className="btn-primary">Get Broker Support</a>
        </div>
      </section>

      {/* Why Integrated Capital Solutions */}
      <section className="section-light py-20">
        <div className="container-wide">
          <span className="section-label">WHY Integrated Capital Solutions</span>
          <h2 className="text-3xl font-bold text-[#0a1628] mb-10">Built for Broker Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Handshake size={22} />, title: 'Trusted Partnership', desc: 'Transparent communication, consistent terms, and a dedicated Account Executive for every submission.' },
              { icon: <Zap size={22} />, title: 'Swift Closings', desc: 'Term sheets in 24 hours. Closings in as few as 7 days. Give your clients certainty of execution.' },
              { icon: <Settings size={22} />, title: 'Flexible Loan Terms', desc: 'Access the full Integrated Capital Solutions product suite — Ground Up, Fix & Flip, DSCR, and Bridge — all in one relationship.' },
            ].map(v => (
              <div key={v.title} className="bg-white rounded-xl p-6 border border-[#e8eaef]">
                <div className="w-11 h-11 rounded-xl bg-[#0a1628] flex items-center justify-center text-[#c8922a] mb-4">
                  {v.icon}
                </div>
                <h3 className="font-bold text-[#0a1628] mb-2">{v.title}</h3>
                <p className="text-sm text-[#4a5568] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20 bg-white">
        <div className="container-wide">
          <span className="section-label">OUR PRODUCTS</span>
          <h2 className="text-3xl font-bold text-[#0a1628] mb-10">Full Product Suite for Your Clients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {products.map(p => (
              <div key={p.label} className="bg-white border border-[#e8eaef] rounded-xl overflow-hidden">
                <div className="bg-[#0a1628] px-5 py-4 flex items-center justify-between">
                  <h3 className="text-white font-bold">{p.label}</h3>
                  <Link href={p.href} className="text-[#c8922a] text-sm font-semibold hover:underline">
                    Learn More →
                  </Link>
                </div>
                <div className="px-5 py-1">
                  <div className="spec-row"><span className="spec-label">Term</span><span className="spec-value">{p.term}</span></div>
                  <div className="spec-row"><span className="spec-label">Loan Amount</span><span className="spec-value">{p.amount}</span></div>
                  <div className="spec-row"><span className="spec-label">Max Leverage</span><span className="spec-value">{p.leverage}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-dark py-20">
        <div className="container-wide">
          <span className="section-label">TESTIMONIALS</span>
          <h2 className="text-3xl font-bold text-white mb-10">What Brokers Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {testimonials.map(t => (
              <blockquote
                key={t.name}
                className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-4"
              >
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} fill="#c8922a" color="#c8922a" />
                  ))}
                </div>
                <p className="text-white/80 text-sm leading-relaxed italic flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer>
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-[#c8922a] text-xs mt-0.5">{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Registration form */}
      <section id="broker-form" className="py-20 bg-white">
        <div className="container-wide max-w-3xl">
          <span className="section-label">REGISTER</span>
          <h2 className="text-3xl font-bold text-[#0a1628] mb-2">Become a Broker Partner</h2>
          <p className="text-[#4a5568] mb-10">
            Fill out the form below and a dedicated Account Executive will reach out within 1 business day.
          </p>
          <BrokerForm />
        </div>
      </section>

      {/* FAQ */}
      <section className="section-light py-20">
        <div className="container-wide max-w-3xl">
          <span className="section-label">FAQs</span>
          <h2 className="text-2xl font-bold text-[#0a1628] mb-8">Broker Program FAQs</h2>
          <FAQAccordion items={brokerFAQs} />
          <div className="mt-8">
            <Link href="/faq" className="btn-outline-dark">See All FAQs</Link>
          </div>
        </div>
      </section>
    </>
  );
}