// app/bridge-loan/page.tsx
import type { Metadata } from 'next';
import ProductPageLayout from '@/components/ProductPageLayout';
import { buildMetadata } from '@/lib/seo';
import Link from 'next/link';

export const metadata: Metadata = buildMetadata({
  title: 'Bridge Loans for Real Estate Investors - Fast Short-Term Financing',
  description:
    'Archwest Capital bridge loans offer closings in as fast as 7 days, up to 80% LTV, no prepayment penalties, and flexible use cases for acquisition, refinance, or stabilization.',
  slug: '/bridge-loan',
  keywords: [
    'bridge loan real estate',
    'short term real estate loan',
    'private bridge lender',
    'bridge financing investor',
    'no prepayment penalty bridge loan',
    'fast bridge loan',
    '80% LTV bridge loan',
  ],
});

const extraFAQs = [
  {
    question: 'What is a real estate bridge loan?',
    answer:
      'A bridge loan is a short-term loan that provides immediate capital to acquire, refinance, or stabilize an investment property while the borrower arranges permanent financing or sells the asset. Bridge loans typically carry 6–15 month terms and are ideal when speed or flexibility is critical.',
  },
  {
    question: 'What can I use an Archwest bridge loan for?',
    answer:
      'Bridge loans can be used for property acquisition, cash-out refinance, partner buyout, stabilization of a value-add asset, or as gap financing while transitioning into a long-term DSCR rental loan.',
  },
  {
    question: 'Are there prepayment penalties on Archwest bridge loans?',
    answer:
      'No. Archwest bridge loans have no prepayment penalties, giving you the freedom to pay off the loan early when your project is complete or your long-term financing is in place.',
  },
  {
    question: 'Can I convert a bridge loan into a long-term rental loan?',
    answer:
      'Yes. Archwest bridge loans are designed to transition seamlessly into a 30-year DSCR rental loan once the property is stabilized, making it easy to move from short-term capital to a long-term hold strategy.',
  },
];

export default function BridgeLoanPage() {
  return (
    <ProductPageLayout
      heroTitle="Bridge Loan"
      heroImage='/loan.JPG'
      heroSubtitle="Fast, flexible short-term capital for real estate investors. Acquisition, refinance, stabilization, and partner buyouts - close in as little as 7 days with no prepayment penalties."
      activeTab="Bridge"
      slug="/bridge-loan"
      extraFAQs={extraFAQs}
      specs={[
        { label: 'Term', value: '6 to 15 Months' },
        { label: 'Loan Amount', value: '$150K to $5M+' },
        { label: 'LTV', value: 'Up to 80%' },
        { label: 'LTV Cashout', value: 'Up to 75%' },
        {
          label: 'Property Types',
          value: 'Non-Owner Occupied SFR, Condo, Townhome, 2–4 Plex, Multifamily Up to 9 Units',
        },
      ]}
      highlights={[
        { text: 'Closings as Quick as 7 Days' },
        { text: 'Flexible Use Cases' },
        { text: 'No Prepayment Penalties' },
        { text: 'Seamless Transition to DSCR' },
      ]}
      bodyContent={
        <div>
          <h2 className="text-2xl font-bold text-[#0a1628] mb-4">
            Short-Term Capital. Long-Term Strategy.
          </h2>
          <div className="divider" />
          <p className="text-[#4a5568] leading-relaxed mb-4">
            When opportunity moves fast, your financing needs to move faster. Archwest bridge loans give
            experienced investors the speed and flexibility to act decisively - whether you&apos;re acquiring a
            new asset, pulling equity out of an existing property, buying out a partner, or bridging a
            property to stabilization before a long-term hold.
          </p>
          <p className="text-[#4a5568] leading-relaxed mb-4">
            With closings in as little as 7 days, no prepayment penalties, and a seamless path to
            transitioning into a 30-year DSCR rental loan, our bridge product is engineered for investors
            who think beyond the transaction.
          </p>
          <p className="text-[#4a5568] leading-relaxed mb-6">
            Up to 80% LTV on acquisitions and 75% on cash-out refinances, with competitive rates and
            personalized service throughout.
          </p>
          <div className="bg-[#f7f8fa] rounded-xl p-5 border border-[#e8eaef]">
            <p className="text-sm font-semibold text-[#0a1628] mb-1">Need to move fast?</p>
            <p className="text-sm text-[#4a5568]">
              Get a term sheet in 24 hours.{' '}
              <Link href="/app" className="text-[#c8922a] font-semibold hover:underline">
                Start your estimate →
              </Link>
            </p>
          </div>
        </div>
      }
      whyTitle="When Speed Is Everything"
      whyItems={[
        {
          title: 'Fastest Closings in Private Lending',
          desc: 'Close in as little as 7 days. Our record is same-week from loan inquiry to funded loan.',
        },
        {
          title: 'No Prepayment Penalties',
          desc: 'Pay off your bridge loan early when your deal closes - no fees, no penalties, no friction.',
        },
        {
          title: 'Flexible Use Cases',
          desc: 'Acquisition, cash-out refi, stabilization, or partner buyout - we structure the loan around your strategy.',
        },
        {
          title: 'Seamless Path to Long-Term Hold',
          desc: 'Transition directly into a 30-year DSCR rental loan when you\'re ready to hold the property.',
        },
      ]}
    />
  );
}