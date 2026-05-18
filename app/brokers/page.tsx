// app/brokers/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import FAQAccordion from '@/components/FAQAccordion';
import CTABanner from '@/components/CTABanner';
import SchemaScript from '@/components/SchemaScript';
import { buildMetadata, faqPageSchema } from '@/lib/seo';
import { Star, Handshake, Zap, Settings } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Broker Program — Partner with Integrated Capital Solutions',
  description:
    'Integrated Capital Solutions partners with real estate brokers nationwide. Access fast closings, competitive terms, and a full suite of fix-and-flip, DSCR, ground-up, and bridge loan products for your clients.',
  slug: '/brokers',
  keywords: [
    'real estate broker program',
    'broker partner private lender',
    'wholesale mortgage broker',
    'fix flip broker program',
    'DSCR broker lender',
    'broker submission hard money',
  ],
});

const brokerFAQs = [
  {
    question: 'Does Integrated Capital Solutionswork with mortgage brokers?',
    answer:
      'Yes. Integrated Capital Solutions works extensively with mortgage brokers and real estate professionals nationwide and is always looking for new broker partnerships. You can get started by filling out our broker registration form.',
  },
  {
    question: 'How do brokers submit a loan to Archwest?',
    answer:
      'Brokers can submit loans by completing the broker registration form on our website. Once registered, your Account Executive will walk you through the submission process and ensure your clients receive fast, accurate term sheets.',
  },
  {
    question: 'How quickly will my client receive a term sheet?',
    answer:
      'Integrated Capital Solutionsprovides term sheets within 24 hours of a complete loan inquiry submission. Once a term sheet is issued, our team works to close as fast as possible — typically 7–14 days depending on the loan type.',
  },
  {
    question: 'What loan products are available through the broker channel?',
    answer:
      'All Integrated Capital Solutionsloan products are available through brokers: Ground Up Construction, Fix & Flip, DSCR Rental, and Bridge Loans. Loan amounts range from $55K to $50M+.',
  },
];

const testimonials = [
  {
    name: 'Dawna T.',
    role: 'Mortgage Broker',
    quote:
      'Integrated Capital Solutionsis hands-down the most reliable private lending partner I\'ve worked with. Their responsiveness is unmatched — every time I submit a file, I know exactly where it stands and when it will close.',
  },
  {
    name: 'Jason S.',
    role: 'Real Estate Broker',
    quote:
      'First deal with Integrated Capital Solutionsand the process was smoother than any lender I\'ve used before. Tight timeline, moving parts everywhere, and they delivered without a single hiccup. Already sent my next file.',
  },
  {
    name: 'Jason F.',
    role: 'Mortgage Broker',
    quote:
      'Another lender ghosted my client at the last minute. I called Integrated Capital Solutionson a Wednesday, had a term sheet by Thursday, and we closed the following Wednesday. That\'s 7 days from first call to funded.',
  },
];

const products = [
  { label: 'Ground Up', href: '/ground-up', term: '12–30 Months', amount: '$250K–$5M+', ltc: 'Up to 90%' },
  { label: 'Fix & Flip', href: '/fix-flip', term: '6–30 Months', amount: '$150K–$5M+', ltc: 'Up to 95%' },
  { label: 'DSCR Rental', href: '/dscr-rental', term: '30 Years', amount: '$75K–$2.5M', ltc: 'Up to 80% LTV' },
  { label: 'Bridge Loan', href: '/bridge-loan', term: '6–15 Months', amount: '$150K–$5M+', ltc: 'Up to 80% LTV' },
];

export default function BrokersPage() {
  return (
    <>
      <SchemaScript schema={faqPageSchema(brokerFAQs)} />

      {/* Hero */}
      <section className="section-dark pt-28 pb-16">
        <div className="container-wide">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fadeUp">
            Strategic Lending Solutions for<br />Brokers and Their Clients
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mb-8 animate-fadeUp delay-100">
            Partner with Integrated Capital Solutionsto offer your clients fast, flexible, and competitive private lending
            solutions across all major residential investment strategies.
          </p>
          <Link href="/broker-form" className="btn-primary animate-fadeUp delay-200">
            Get Broker Support
          </Link>
        </div>
      </section>

      {/* Why Integrated Capital Solutionsfor Brokers */}
      <section className="py-16 section-light" aria-label="Why brokers choose Archwest">
        <div className="container-wide">
          <span className="section-label">WHY ARCHWEST</span>
          <h2 className="text-3xl font-bold text-[#0a1628] mb-10">Built for Broker Success</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Handshake size={22} />,
                title: 'Trusted Partnership',
                desc: 'We treat brokers as long-term partners, not just deal sources. Expect transparent communication, consistent terms, and a dedicated Account Executive for every submission.',
              },
              {
                icon: <Zap size={22} />,
                title: 'Swift Closings',
                desc: 'Term sheets in 24 hours. Closings in as few as 7 days. Your clients get certainty of execution — and you get a reputation for delivering.',
              },
              {
                icon: <Settings size={22} />,
                title: 'Flexible Loan Terms',
                desc: 'Access the full Integrated Capital Solutionsproduct suite — Ground Up, Fix & Flip, DSCR Rental, and Bridge Loans — all through one trusted lender relationship.',
              },
            ].map((v) => (
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

      {/* Loan Products for Brokers */}
      <section className="py-16" aria-label="Loan products for brokers">
        <div className="container-wide">
          <span className="section-label">OUR PRODUCTS</span>
          <h2 className="text-3xl font-bold text-[#0a1628] mb-10">Full Product Suite for Your Clients</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((p) => (
              <div key={p.label} className="bg-white border border-[#e8eaef] rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-[#0a1628] px-5 py-4 flex items-center justify-between">
                  <h3 className="text-white font-bold">{p.label}</h3>
                  <Link href={p.href} className="text-[#c8922a] text-xs font-semibold hover:underline">
                    Learn More →
                  </Link>
                </div>
                <div className="px-5 py-4">
                  <div className="spec-row"><span className="spec-label">Term</span><span className="spec-value">{p.term}</span></div>
                  <div className="spec-row"><span className="spec-label">Loan Amount</span><span className="spec-value">{p.amount}</span></div>
                  <div className="spec-row"><span className="spec-label">Max Leverage</span><span className="spec-value">{p.ltc}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-dark py-16" aria-label="Broker testimonials">
        <div className="container-wide">
          <span className="section-label">TESTIMONIALS</span>
          <h2 className="text-3xl font-bold text-white mb-10">What Brokers Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <blockquote key={t.name} className="bg-white/6 border border-white/12 rounded-xl p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-[#c8922a] fill-[#c8922a]" />
                  ))}
                </div>
                <p className="text-white/85 text-sm leading-relaxed mb-5">&ldquo;{t.quote}&rdquo;</p>
                <footer>
                  <p className="text-white font-bold text-sm">{t.name}</p>
                  <p className="text-[#c8922a] text-xs">{t.role}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16" aria-label="Broker FAQ">
        <div className="container-wide max-w-3xl">
          <span className="section-label">FAQs</span>
          <h2 className="text-2xl font-bold text-[#0a1628] mb-8">Broker Program FAQs</h2>
          <FAQAccordion items={brokerFAQs} />
          <div className="mt-8">
            <Link href="/faq" className="btn-outline-dark">See All FAQs</Link>
          </div>
        </div>
      </section>

      <CTABanner
        title="Ready to Partner with Archwest?"
        subtitle="Join hundreds of brokers nationwide who trust Integrated Capital Solutionsto deliver fast, reliable funding for their clients' investment properties."
        primaryLabel="Register as a Broker"
        primaryHref="/broker-form"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </>
  );
}