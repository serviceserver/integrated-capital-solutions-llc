// app/dscr-rental/page.tsx
import type { Metadata } from 'next';
import ProductPageLayout from '@/components/ProductPageLayout';
import { buildMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = buildMetadata({
  title: 'DSCR Rental Loans - Long-Term Financing for Rental Properties',
  description:
    'Archwest Capital DSCR rental loans offer 30-year terms, up to 80% LTV, DSCR as low as 0.75, and support for short-term rentals. No personal income verification required.',
  slug: '/dscr-rental',
  keywords: [
    'DSCR loan',
    'debt service coverage ratio loan',
    'rental property loan',
    'no income verification rental loan',
    'investor rental financing',
    'long-term rental loan',
    'Airbnb VRBO loan',
    '30 year rental loan',
  ],
});

const extraFAQs = [
  {
    question: 'What is a DSCR loan?',
    answer:
      'A DSCR (Debt Service Coverage Ratio) loan qualifies borrowers based on the rental income of the property rather than the borrower\'s personal income. If the property\'s rental income covers the debt payments, the borrower can qualify - making it ideal for investors with complex finances or growing portfolios.',
  },
  {
    question: 'What is the minimum DSCR Archwest requires?',
    answer:
      'Archwest accepts a minimum DSCR as low as 0.75, offering more flexibility than many lenders who require a minimum of 1.0 or higher.',
  },
  {
    question: 'Can I finance a short-term rental (Airbnb or VRBO) with a DSCR loan?',
    answer:
      'Yes. Archwest allows short-term rental income to be used for DSCR qualification, making our program ideal for Airbnb and VRBO investment properties.',
  },
  {
    question: 'Do I need to provide personal income documentation for a DSCR loan?',
    answer:
      'No. DSCR loans do not require personal income verification such as W-2s or tax returns. Qualification is based solely on the property\'s rental income relative to the loan payments.',
  },
];

export default function DSCRPage() {
  return (
    <ProductPageLayout
      heroTitle="DSCR Rental"
      heroImage='/rent.JPG'
      heroSubtitle="Competitive and flexible DSCR rental loans to help investors tap into existing equity and build long-term rental portfolios. No personal income verification required."
      activeTab="DSCR"
      slug="/dscr-rental"
      extraFAQs={extraFAQs}
      specs={[
        { label: 'Term', value: '30 Years' },
        { label: 'Loan Amount', value: '$75K to $2.5M' },
        { label: 'LTV', value: 'Up to 80%' },
        { label: 'LTV Cashout', value: 'Up to 75%' },
        { label: 'Min DSCR', value: 'As Low as 0.75' },
        {
          label: 'Property Types',
          value:
            'Non-Owner Occupied SFR, Condo, Townhome, 2–4 Plex, Multifamily Up to 9 Units, Short-Term Rentals OK',
        },
      ]}
      highlights={[
        { text: 'Free 30-Day Rate Lock' },
        { text: 'Up to $3.5M Loan Amount' },
        { text: 'No Max Per Unit Rent' },
        { text: 'Min DSCR as Low as 0.75' },
      ]}
      bodyImage='/town.JPG'
      bodyContent={
        <div>
          <h2 className="text-2xl font-bold text-[#0a1628] mb-4">
            Flexible Rental Property Financing - Based on Cash Flow, Not Income
          </h2>
          <div className="divider" />
          <p className="text-[#4a5568] leading-relaxed mb-4">
            Our DSCR Rental Loan is a 30-year financing solution designed for investors who want to build
            or expand a long-term rental portfolio without the complexity of income documentation.
            Qualification is based on the property&apos;s DSCR - the ratio of rental income to debt payments
            - not your personal tax returns.
          </p>
          <p className="text-[#4a5568] leading-relaxed mb-4">
            With a minimum DSCR as low as 0.75, support for short-term rentals, and no cap on per-unit
            rent, our program gives you the flexibility to finance a wide range of rental strategies -
            from single-family holds to small multifamily portfolios to Airbnb investments.
          </p>
          <p className="text-[#4a5568] leading-relaxed mb-6">
            Lock your rate for 30 days at application and close with certainty, knowing your terms won&apos;t
            change before funding.
          </p>
          <div className="bg-[#f7f8fa] rounded-xl p-5 border border-[#e8eaef]">
            <p className="text-sm font-semibold text-[#0a1628] mb-1">Building a rental portfolio?</p>
            <p className="text-sm text-[#4a5568]">
              See your rate in minutes.{' '}
              <Link href="/app" className="text-[#c8922a] font-semibold hover:underline">
                Get an estimate →
              </Link>
            </p>
          </div>
        </div>
      }
      whyTitle="Built for Buy-and-Hold Investors"
      whyItems={[
        {
          title: 'No Income Verification',
          desc: 'Qualify based on the property\'s cash flow (DSCR), not personal W-2s or tax returns.',
        },
        {
          title: 'Short-Term Rentals Welcome',
          desc: 'Finance Airbnb and VRBO properties using projected short-term rental income.',
        },
        {
          title: 'Portfolio Lending',
          desc: 'Bundle multiple rental properties into a single loan for simplified portfolio management.',
        },
        {
          title: '30-Day Free Rate Lock',
          desc: 'Lock your rate at application and close with certainty - no surprises at the table.',
        },
      ]}
    />
  );
}