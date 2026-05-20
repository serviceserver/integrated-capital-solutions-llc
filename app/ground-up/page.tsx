// app/ground-up/page.tsx
import type { Metadata } from 'next';
import ProductPageLayout from '@/components/ProductPageLayout';
import { buildMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = buildMetadata({
  title: 'Ground Up Construction Loans for Investors',
  description:
    'Integrated Capital Solutions offers ground up construction loans from $250K to $5M+, up to 90% LTC, 12–30 month terms, and closings as fast as 7 days. Built for experienced builders and developers.',
  slug: '/ground-up',
  keywords: [
    'ground up construction loan',
    'new construction financing',
    'residential construction lender',
    'private construction loan',
    'builder financing',
    '90% LTC construction loan',
    'hard money construction loan',
  ],
});

const extraFAQs = [
  {
    question: 'What is a ground up construction loan?',
    answer:
      'A ground up construction loan is a short-term loan that finances the construction of a new residential property from scratch on raw land or after a teardown. Integrated Capital Solutions provides these loans to experienced builders with competitive LTC, fast draws, and closings as fast as 7 days.',
  },
  {
    question: 'What LTC does Integrated Capital Solutions offer on ground up construction loans?',
    answer:
      'Integrated Capital Solutions offers up to 90% LTC (loan-to-cost) on ground up construction projects, with a maximum LTV (loan-to-value) of 75% based on the completed value of the property.',
  },
  {
    question: 'How do construction draws work?',
    answer:
      'Once your loan is funded, construction draws are processed within 24 hours of a request and inspection. Our dedicated construction team manages the draw process to ensure your project never loses momentum.',
  },
  {
    question: 'Do I need prior experience to qualify?',
    answer:
      'Yes. Ground up construction loans generally require at least three completed ground-up projects within the past 36 months. This ensures projects are managed by experienced developers who can execute on time and on budget.',
  },
];

export default function GroundUpPage() {
  return (
    <ProductPageLayout
      heroTitle="Ground Up Construction"
      heroImage='/construction-site.JPG'
      heroSubtitle="Competitive financing for experienced builders and developers with shovel-ready ground-up and mid-construction investment projects. Close in as fast as 7 days."
      activeTab="Ground Up"
      slug="/ground-up"
      extraFAQs={extraFAQs}
      specs={[
        { label: 'Term', value: '12 to 30 Months' },
        { label: 'Loan Amount', value: '$250K to $5M+' },
        { label: 'LTC', value: 'Up to 90%' },
        { label: 'LTV', value: 'Up to 75%' },
        {
          label: 'Property Types',
          value:
            'Non-Owner Occupied SFR, Condo, Townhome, 2–4 Plex, Multifamily Up to 9 Units, Infill, ADU, Community Builds',
        },
      ]}
      highlights={[
        { text: 'Close in as Fast as 7 Days' },
        { text: '24-Hour Construction Draws' },
        { text: 'Competitive Pricing & Terms' },
        { text: 'Dedicated Construction Team' },
      ]}
      bodyImage='/contruction-worker.JPG'
      bodyContent={
        <div>
          <h2 className="text-2xl font-bold text-[#0a1628] mb-4">
            Power Your Next Build with Speed and Certainty
          </h2>
          <div className="divider" />
          <p className="text-[#4a5568] leading-relaxed mb-4">
            Ground up construction demands speed, flexibility, and reliable capital. Our Ground Up
            Construction Loan is built for experienced investors ready to turn raw land or
            teardown sites into profitable residential developments.
          </p>
          <p className="text-[#4a5568] leading-relaxed mb-4">
            With competitive terms, strong leverage up to 90% LTC, and financing tailored to a wide range
            of property types - including single-family homes, small multifamily, infill projects, and
            ADUs - we deliver the certainty and resources you need to bring your vision to life.
          </p>
          <p className="text-[#4a5568] leading-relaxed mb-6">
            From blueprint to completion, our dedicated construction lending team manages draws within 24
            hours, so your project stays on schedule and on budget.
          </p>
          <div className="bg-[#f7f8fa] rounded-xl p-5 border border-[#e8eaef]">
            <p className="text-sm font-semibold text-[#0a1628] mb-1">Ready to build?</p>
            <p className="text-sm text-[#4a5568]">
              Get a term sheet within 24 hours.{' '}
              <Link href="/app" className="text-[#c8922a] font-semibold hover:underline">
                Start your estimate →
              </Link>
            </p>
          </div>
        </div>
      }
      whyTitle="A Lender Built for Builders"
      whyItems={[
        {
          title: 'Competitive Pricing',
          desc: 'We offer some of the most competitive rates and terms in the private lending industry for construction projects.',
        },
        {
          title: 'Speed You Can Count On',
          desc: 'Close in as fast as 7 days from inquiry to funding. Construction draws processed within 24 hours.',
        },
        {
          title: 'Deep Construction Expertise',
          desc: 'Our dedicated construction lending team understands the unique demands of ground-up projects and ensures smooth execution.',
        },
        {
          title: 'End-to-End Service',
          desc: 'From easy draw requests to future takeout solutions, we support your project from groundbreaking to sale.',
        },
      ]}
    />
  );
}