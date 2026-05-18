// app/fix-flip/page.tsx
import type { Metadata } from 'next';
import ProductPageLayout from '@/components/ProductPageLayout';
import { buildMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = buildMetadata({
  title: 'Fix and Flip Loans — Fast Funding for Renovation Investors',
  description:
    'Archwest Capital offers fix and flip loans up to 95% LTC, 100% rehab costs covered, closings in as fast as 7 days, and term sheets within 24 hours. Nationwide private lender.',
  slug: '/fix-flip',
  keywords: [
    'fix and flip loans',
    'hard money rehab loan',
    'renovation financing',
    '100% rehab funding',
    'fix flip lender',
    'private rehab loan',
    '95% LTC fix flip',
  ],
});

const extraFAQs = [
  {
    question: 'What is a fix and flip loan?',
    answer:
      'A fix and flip loan is a short-term bridge loan used to purchase and renovate a property with the intent to sell it for a profit. Archwest covers up to 95% of total project costs, including 100% of rehabilitation costs, with interest charged only on drawn amounts.',
  },
  {
    question: 'Does Archwest finance 100% of rehab costs?',
    answer:
      'Yes. Archwest provides up to 100% of rehabilitation costs within the approved budget. Funds are distributed through a draw process as work is completed and verified.',
  },
  {
    question: 'How fast can I close a fix and flip loan?',
    answer:
      'Archwest can close fix and flip loans in as little as 7 days. Our record closing time is 1 day. You will receive a term sheet within 24 hours of submitting your loan inquiry.',
  },
  {
    question: 'What properties qualify for fix and flip financing?',
    answer:
      'Eligible properties include non-owner-occupied SFR, condos, townhomes, 2–4 plexes, and multifamily up to 9 units. ADU conversions are also eligible. Owner-occupied properties, mobile homes, and commercial properties do not qualify.',
  },
];

export default function FixFlipPage() {
  return (
    <ProductPageLayout
      heroTitle="Fix & Flip"
      heroSubtitle="Industry-leading speed, rates, and leverage for residential real estate renovation investors. Up to 95% LTC and 100% of rehab costs covered nationwide."
      activeTab="Fix & Flip"
      slug="/fix-flip"
      extraFAQs={extraFAQs}
      specs={[
        { label: 'Term', value: '6 to 30 Months' },
        { label: 'Loan Amount', value: '$150K to $5M+' },
        { label: 'LTC', value: 'Up to 95%' },
        { label: 'Purchase', value: 'Up to 92.5%' },
        { label: 'Rehab', value: '100% of Costs' },
        {
          label: 'Property Types',
          value:
            'Non-Owner Occupied SFR, Condo, Townhome, 2–4 Plex, Multifamily Up to 9 Units, ADU Conversions OK',
        },
      ]}
      highlights={[
        { text: 'Term Sheet Within 24 Hours' },
        { text: 'Closings as Fast as 7 Days' },
        { text: 'Interest on Drawn Amounts Only' },
        { text: '100% of Rehab Funding Available' },
      ]}
      bodyContent={
        <div>
          <h2 className="text-2xl font-bold text-[#0a1628] mb-4">Funding That Fits Your Strategy</h2>
          <div className="divider" />
          <p className="text-[#4a5568] leading-relaxed mb-4">
            Our Fix and Flip loans provide the speed and flexibility you need to purchase, renovate, and
            sell properties profitably. With up to 95% LTC and 100% of rehab costs covered, you can
            maximize leverage and move on more deals simultaneously.
          </p>
          <p className="text-[#4a5568] leading-relaxed mb-4">
            Interest is charged only on drawn amounts — not on the total loan commitment — keeping your
            carrying costs low throughout the renovation. Combined with closings as fast as 7 days and
            term sheets in under 24 hours, Archwest gives renovation investors a decisive edge.
          </p>
          <p className="text-[#4a5568] leading-relaxed mb-6">
            We work with investors across the US on everything from single-unit flips to multi-property
            portfolios, providing a consistent, reliable capital partner at every stage.
          </p>
          <div className="bg-[#f7f8fa] rounded-xl p-5 border border-[#e8eaef]">
            <p className="text-sm font-semibold text-[#0a1628] mb-1">Have a deal under contract?</p>
            <p className="text-sm text-[#4a5568]">
              Get your term sheet in 24 hours.{' '}
              <Link href="/app" className="text-[#c8922a] font-semibold hover:underline">
                Start your estimate →
              </Link>
            </p>
          </div>
        </div>
      }
      whyTitle="Industry-Leading Fix & Flip Terms"
      whyItems={[
        {
          title: 'Market-Leading Leverage',
          desc: 'Up to 95% LTC and 100% of rehab costs covered, so you preserve capital for more deals.',
        },
        {
          title: 'Same-Day Term Sheets',
          desc: 'Receive a full term sheet within 24 hours of your loan inquiry — no waiting, no guessing.',
        },
        {
          title: 'Closings in Days, Not Weeks',
          desc: 'Close in as little as 7 days. Our record is 1 day from application to funded loan.',
        },
        {
          title: 'Efficient Draw Management',
          desc: 'Our in-house team handles draw requests quickly so your renovation never loses momentum.',
        },
      ]}
    />
  );
}