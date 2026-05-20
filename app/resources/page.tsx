import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import Breadcrumb from '@/components/Breadcrumb';
import CTABanner from '@/components/CTABanner';
import { MapPin, HelpCircle, BookOpen, HardHat } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Resources to Guide Your Lending Journey',
  description:
    'Explore expert insights, essential FAQs, lending terms, lending locations, and key tools to make informed decisions and streamline your loan process with Integrated Capital Solutions.',
  slug: '/resources',
  keywords: [
    'lending resources',
    'private lender FAQ',
    'construction loan forms',
    'glossary',
    'lending locations map',
  ],
});

const resources = [
  {
    icon: <MapPin size={22} />,
    label: 'WHERE WE LEND',
    title: 'Find Lending Opportunities Near You',
    desc: 'Looking for financing in your state? Our lending map shows where we operate, making it easy for you to explore available loan programs in your area.',
    cta: 'View Lending Map',
    href: '/lending-locations',
  },
  {
    icon: <HelpCircle size={22} />,
    label: 'LEARN',
    title: 'Your Questions, Answered',
    desc: 'Our FAQ section covers everything from loan eligibility and approval timelines to rates and repayment options. Get the information you need to move forward with confidence.',
    cta: 'Browse FAQs',
    href: '/faq',
  },
  {
    icon: <BookOpen size={22} />,
    label: 'LEARN',
    title: 'Understand Loan Terminology',
    desc: 'A comprehensive glossary of lending and investment terms to help you navigate financing with confidence. From ARV to DSCR to LTC - we define it all.',
    cta: 'Explore Glossary',
    href: '/glossary',
  },
  {
    icon: <HardHat size={22} />,
    label: 'CONSTRUCTION DRAW',
    title: 'Support and Loan Management',
    desc: 'Our dedicated construction loan support team is here to assist you every step of the way. Access essential resources, get expert guidance, and manage your loan with ease.',
    cta: 'View Construction Loan Resources',
    href: '/construction-draw',
  },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="section-dark pt-28 pb-14">
        <div className="container-wide">
          <Breadcrumb items={[{ name: 'Resources', href: '/resources' }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-5 mb-4">
            Resources to Guide Your Lending Journey
          </h1>
          <p className="text-white/65 text-lg max-w-2xl">
            Explore expert insights, essential FAQs, lending terms, and key tools to make informed
            decisions and streamline your loan process.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {resources.map((r) => (
              <article
                key={r.href}
                className="bg-white border border-[#e8eaef] rounded-2xl p-8 hover:shadow-lg transition-shadow flex flex-col gap-5"
              >
                <div>
                  <span className="section-label">{r.label}</span>
                  <div className="w-12 h-12 rounded-xl bg-[#0a1628] flex items-center justify-center text-[#c8922a] mb-4">
                    {r.icon}
                  </div>
                  <h2 className="text-xl font-bold text-[#0a1628] mb-3">{r.title}</h2>
                  <p className="text-[#4a5568] text-sm leading-relaxed">{r.desc}</p>
                </div>
                <Link href={r.href} className="btn-primary self-start">
                  {r.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title="Proven Team. Trusted Lending Partner."
        subtitle="With extensive industry expertise and an unwavering commitment to service, our team has successfully partnered with thousands of investors on projects nationwide."
        primaryLabel="Get an Estimate"
        primaryHref="/app"
      />
    </>
  );
}