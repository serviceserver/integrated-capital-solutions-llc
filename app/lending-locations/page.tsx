import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata, faqPageSchema } from '@/lib/seo';
import SchemaScript from '@/components/SchemaScript';
import Breadcrumb from '@/components/Breadcrumb';
import FAQAccordion from '@/components/FAQAccordion';
import CTABanner from '@/components/CTABanner';
import { CheckCircle, XCircle, MinusCircle } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Lending Locations - Real Estate Investment Loans Nationwide',
  description:
    'Integrated Capital Solutions lends in 46+ states across the US. Find out if we lend in your state for fix-and-flip, ground-up construction, DSCR rental, and bridge loans.',
  slug: '/lending-locations',
  keywords: [
    'private lender lending states',
    'real estate investor loans by state',
    'nationwide private lender',
    'fix flip lender near me',
    'where does Integrated Capital Solutions lend',
  ],
});

const activeStates = [
  'Alabama', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut',
  'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana',
  'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
  'Michigan', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'New Hampshire',
  'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'Ohio', 'Oklahoma',
  'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming',
];

const limitedStates = ['Utah'];

const inactiveStates = ['Alaska', 'Minnesota', 'Nevada', 'North Dakota', 'Vermont'];

const faqItems = [
  {
    question: 'What is Integrated Capital Solutionsand who is your audience?',
    answer:
      'Integrated Capital Solutionsis a national, direct, private lender (non-bank) specializing in financing solutions for residential real estate investors. With a proven track record and deep industry expertise, we are the go-to partner for experienced investors seeking fast, flexible, and reliable funding.',
  },
  {
    question: 'What kind of loan products do you offer?',
    answer:
      'We provide short-term bridge loans for fix-and-flip projects and new ground-up construction, as well as long-term financing solutions for rental properties. Our flexible loan options are designed to support real estate investors at every stage of their investment journey.',
  },
  {
    question: 'How do I start my loan application process?',
    answer:
      'You can begin instantly and obtain a quick quote at integratedcapitalsolutionsllc.com/app. Once complete, a member of our team will connect with you to gather more information and prepare a term sheet based on the specifics of your loan.',
  },
  {
    question: 'Do you work with brokers?',
    answer:
      'Yes, we work extensively with brokers and are always looking for new partnerships. Visit our Broker page to learn more.',
  },
];

export default function LendingLocationsPage() {
  return (
    <>
      <SchemaScript schema={faqPageSchema(faqItems)} />

      <section className="section-dark pt-28 pb-14">
        <div className="container-wide">
          <Breadcrumb
            items={[
              { name: 'Resources', href: '/resources' },
              { name: 'Lending Locations', href: '/lending-locations' },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-5 mb-4">
            Serving Real Estate Investors from Coast to Coast
          </h1>
          <p className="text-white/65 text-lg max-w-2xl">
            Whether you&apos;re working on a fix and flip, rental property, or ground-up construction,
            see how we can support your vision across 46+ states.
          </p>
          <div className="mt-8">
            <Link href="/products" className="btn-primary">
              Explore Loans
            </Link>
          </div>
        </div>
      </section>

      {/* Map placeholder + legend */}
      <section className="py-16 section-light" aria-label="Lending coverage map">
        <div className="container-wide">
          {/* Map visual placeholder */}
          <div className="bg-[#0a1628] rounded-2xl aspect-[16/7] flex items-center justify-center mb-10 overflow-hidden relative">
            <div className="absolute inset-0 opacity-10"
              style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #c8922a, transparent 60%), radial-gradient(circle at 70% 40%, #1a3560, transparent 60%)' }} />
            <p className="text-white/30 text-sm font-medium relative z-10">
              Interactive US Lending Map - Replace with SVG or Mapbox component
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-6 justify-center mb-12">
            {[
              { icon: <CheckCircle size={16} className="text-[#c8922a]" />, label: 'Active - All Products Available' },
              { icon: <MinusCircle size={16} className="text-yellow-500" />, label: 'Limited - Select Products Only' },
              { icon: <XCircle size={16} className="text-[#9aa3b2]" />, label: 'Not Active' },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-2 text-sm text-[#4a5568] font-medium">
                {l.icon} {l.label}
              </div>
            ))}
          </div>

          {/* Active states grid */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-[#0a1628] mb-5 flex items-center gap-2">
              <CheckCircle size={18} className="text-[#c8922a]" />
              Active Lending States ({activeStates.length})
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
              {activeStates.map((state) => (
                <div
                  key={state}
                  className={`bg-white border rounded-lg px-3 py-2 text-sm font-medium text-[#0a1628] text-center ${
                    limitedStates.includes(state)
                      ? 'border-yellow-400 bg-yellow-50'
                      : 'border-[#e8eaef]'
                  }`}
                >
                  {state}
                  {limitedStates.includes(state) && (
                    <span className="block text-xs text-yellow-600 font-normal">Limited</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Inactive states */}
          <div>
            <h2 className="text-lg font-bold text-[#0a1628] mb-4 flex items-center gap-2">
              <XCircle size={16} className="text-[#9aa3b2]" />
              Not Currently Active
            </h2>
            <div className="flex flex-wrap gap-2">
              {inactiveStates.map((state) => (
                <span
                  key={state}
                  className="bg-[#f7f8fa] border border-[#e8eaef] rounded-lg px-3 py-1.5 text-sm text-[#9aa3b2]"
                >
                  {state}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container-wide max-w-3xl">
          <span className="section-label">FAQs</span>
          <h2 className="text-2xl font-bold text-[#0a1628] mb-8">Frequently Asked Questions</h2>
          <FAQAccordion items={faqItems} />
          <div className="mt-8">
            <Link href="/faq" className="btn-outline-dark">See All FAQs</Link>
          </div>
        </div>
      </section>

      <CTABanner
        title="Proven Team. Trusted Lending Partner."
        subtitle="Ready to get started? Get an estimate today and a member of our team will reach out within 24 hours."
        primaryLabel="Get an Estimate"
        primaryHref="/app"
      />
    </>
  );
}