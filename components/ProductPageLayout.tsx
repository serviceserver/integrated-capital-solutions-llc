// components/ProductPageLayout.tsx
import Link from 'next/link';
import ProcessSteps from './ProcessSteps';
import FAQAccordion from './FAQAccordion';
import CTABanner from './CTABanner';
import Breadcrumb from './Breadcrumb';
import SchemaScript from './SchemaScript';
import { loanProductSchema, faqPageSchema } from '@/lib/seo';
import { Check } from 'lucide-react';

const productTabs = [
  { label: 'Ground Up', href: '/ground-up' },
  { label: 'Fix & Flip', href: '/fix-flip' },
  { label: 'DSCR', href: '/dscr-rental' },
  { label: 'Bridge', href: '/bridge-loan' },
];

const standardFAQs = [
  {
    question: 'What is Integrated Capital Solutions and who is your audience?',
    answer:
      'Integrated Capital Solutions is a national, direct, private lender (non-bank) specializing in financing solutions for residential real estate investors. With a proven track record and deep industry expertise, we are the go-to partner for experienced investors seeking fast, flexible, and reliable funding.',
  },
  {
    question: 'What kind of loan products do you offer?',
    answer:
      'We provide short-term bridge loans for fix-and-flip projects and new ground-up construction, as well as long-term financing solutions for rental properties. Our flexible loan options are designed to support real estate investors at every stage of their investment journey.',
  },
  {
    question: 'How do I start my loan application process?',
    answer:
      'You can begin instantly and obtain a quick quote at Integrated Capital Solutionscapital.com/app. Once complete, a member of our team will connect with you to gather more information and prepare a term sheet.',
  },
  {
    question: 'How quickly can I get approved and funded?',
    answer:
      'Fix & Flip Loans typically close in 5–10 days (record: 1 day). Ground-Up Loans generally close in 7–14 days (record: 2 days). DSCR Loans usually close in 10–20 days (record: 3 days).',
  },
  {
    question: 'Do you work with first time investors?',
    answer:
      'We typically work with experienced investors who have completed at least one prior investment. Fix & Flip requires at least one completed project in the past 36 months. Ground-Up requires three completed projects in that period.',
  },
  {
    question: 'Do you work with brokers?',
    answer:
      'Yes, we work extensively with brokers and are always looking for new partnerships. Visit our Broker page at Integrated Capital Solutionscapital.com/brokers to learn more.',
  },
];

interface WhyItem {
  title: string;
  desc: string;
}

interface Highlight {
  text: string;
}

interface Spec {
  label: string;
  value: string;
}

interface ProductPageLayoutProps {
  heroTitle: string;
  heroImage?: string;
  heroSubtitle: string;
  activeTab: string;
  slug: string; // e.g. '/ground-up'
  specs: Spec[];
  highlights: Highlight[];
  bodyImage?: string;
  bodyContent: React.ReactNode;
  whyTitle?: string;
  whyItems?: WhyItem[];
  extraFAQs?: { question: string; answer: string }[];
}

export default function ProductPageLayout({
  heroTitle,
  heroImage,
  heroSubtitle,
  activeTab,
  slug,
  specs,
  highlights,
  bodyImage,
  bodyContent,
  whyTitle,
  whyItems,
  extraFAQs = [],
}: ProductPageLayoutProps) {
  const allFAQs = [...extraFAQs, ...standardFAQs];

  return (
    <>
      {/* Structured data */}
      <SchemaScript
        schema={[
          loanProductSchema({
            name: heroTitle,
            description: heroSubtitle,
            url: slug,
          }),
          faqPageSchema(allFAQs),
        ]}
      />

      {/* Hero */}
      <section className="section-dark pt-28 pb-16 h-125" style={{backgroundImage: `url('${heroImage}')`, width: '100%', height: "500px", backgroundSize: 'cover', backgroundPosition: "center"}} aria-label={`${heroTitle} loan hero`}>
      <div className="absolute inset-0 bg-linear-to-b from-[#0a1628]/80 to-[#0a1628]/75 h-125" />
        <div className="container-wide z-20" >
          <Breadcrumb items={[{ name: 'Products', href: '/products' }, { name: heroTitle, href: slug }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-5 mb-4 animate-fadeUp">
            {heroTitle}
          </h1>
          <p className="text-white/70 text-lg max-w-2xl animate-fadeUp delay-100">{heroSubtitle}</p>

          {/* Product Tab Strip */}
          <nav aria-label="Loan product tabs" className="flex gap-0 border-b border-white/20 mt-10 overflow-x-auto">
            {productTabs.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className={`px-5 py-3 text-sm font-semibold border-b-2 transition-colors whitespace-nowrap z-20 ${
                  tab.label === activeTab
                    ? 'text-white border-[#c8922a]'
                    : 'text-white/50 border-transparent hover:text-white/80'
                }`}
                aria-current={tab.label === activeTab ? 'page' : undefined}
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Loan Details + Body */}
      <section className="py-16" aria-label="Loan details">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Specs card */}
            <div className="bg-white border border-[#e8eaef] rounded-xl overflow-hidden shadow-sm  top-24">
              <div className="bg-[#0a1628] px-6 py-5">
                <h2 className="text-white font-bold text-xl">{heroTitle} Loan Details</h2>
              </div>
              <div className="px-6 py-5">
                {specs.map((s) => (
                  <div key={s.label} className="spec-row">
                    <span className="spec-label">{s.label}</span>
                    <span className="spec-value">{s.value}</span>
                  </div>
                ))}
                <div className="mt-6 flex flex-col gap-3">
                  <Link href="/app" className="btn-primary w-full justify-center">
                    Get an Estimate
                  </Link>
                  <Link href="/contact" className="btn-outline-dark w-full justify-center">
                    Speak to a Loan Expert
                  </Link>
                </div>
              </div>
            </div>

            {/* Body content */}
            <article className="prose-Integrated Capital Solutions">{bodyContent}</article>
          </div>
        </div>
      </section>


      {/* Highlights */}
      <section className="section-light py-14" aria-label="Loan highlights">
        <div className="container-wide">
          <span className="section-label">LOAN HIGHLIGHTS</span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0a1628] mb-10">
            Key Features of Our {heroTitle} Loan
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 border border-[#e8eaef] flex flex-col gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0a1628] flex items-center justify-center">
                  <Check size={18} className="text-[#c8922a]" />
                </div>
                <p className="text-sm font-semibold text-[#0a1628] leading-snug">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
            <section className="section-dark pt-40 pb-36" style={{backgroundImage: `url('${bodyImage}')`, width: '100%', height: "100%", backgroundSize: 'cover', backgroundPosition: "center"}} aria-label={`${heroTitle} loan hero`}></section>

      {/* Why Integrated Capital Solutions */}
      {whyItems && (
        <section className="py-16" aria-label="Why choose Integrated Capital Solutions">
          <div className="container-wide">
            <span className="section-label">WHY Integrated Capital Solutions</span>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0a1628] mb-10">
              {whyTitle || 'The Integrated Capital Solutions Difference'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {whyItems.map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#c8922a]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#c8922a] font-bold text-sm">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#0a1628] mb-1">{item.title}</h3>
                    <p className="text-sm text-[#4a5568] leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process */}
      <section className="section-light py-16" aria-label="Loan process">
        <div className="container-wide">
          <span className="section-label">OUR PROCESS</span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0a1628] mb-10">
            From Application to Funding in Days
          </h2>
          <ProcessSteps />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16" aria-label="Frequently asked questions">
        <div className="container-wide max-w-3xl">
          <span className="section-label">FAQs</span>
          <h2 className="text-2xl md:text-3xl font-bold text-[#0a1628] mb-8">
            {heroTitle} Loan - Frequently Asked Questions
          </h2>
          <FAQAccordion items={allFAQs} />
          <div className="mt-8">
            <Link href="/faq" className="btn-outline-dark">
              See All FAQs
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <CTABanner
        title="Proven Team. Trusted Lending Partner."
        subtitle="With extensive industry expertise and an unwavering commitment to service, our team has successfully partnered with thousands of real estate investors on projects nationwide."
        primaryLabel="Get an Estimate"
        primaryHref="/app"
        secondaryLabel="Talk to an Expert"
        secondaryHref="/contact"
      />
    </>
  );
}