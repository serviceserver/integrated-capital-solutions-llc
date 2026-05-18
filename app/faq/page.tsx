// app/faq/page.tsx
import type { Metadata } from 'next';
import FAQAccordion from '@/components/FAQAccordion';
import SchemaScript from '@/components/SchemaScript';
import Breadcrumb from '@/components/Breadcrumb';
import { buildMetadata, faqPageSchema } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'FAQ — Frequently Asked Questions About Integrated Capital Solutions Loans',
  description:
    'Get answers to the most common questions about Integrated Capital Solutions loan products, borrower requirements, broker programs, DSCR, fix-and-flip, ground-up construction, and the loan process.',
  slug: '/faq',
  keywords: ['private lender FAQ', 'real estate investor loan questions', 'DSCR loan FAQ', 'fix flip loan requirements', 'bridge loan questions'],
});

const faqSections = [
  {
    id: 'general',
    label: 'General',
    items: [
      { question: 'What is Integrated Capital Solutions?', answer: 'Integrated Capital Solutions is a national, direct, private lender (non-bank) specializing in financing solutions for experienced residential real estate investors. We provide short-term and long-term loans for fix-and-flip, ground-up construction, DSCR rental, and bridge scenarios.' },
      { question: 'What loan types does Integrated Capital Solutionsoffer?', answer: 'We offer four core loan products: Ground Up Construction Loans (12–30 months), Fix & Flip Loans (6–30 months), DSCR Rental Loans (30 years), and Bridge Loans (6–15 months). Loan amounts range from $55,000 to $50M+.' },
      { question: 'Is Integrated Capital Solutionsa hard money lender?', answer: 'No. While Integrated Capital Solutionsis a private, non-bank lender, we are not a traditional hard money lender. We offer more competitive pricing, faster execution, and a higher level of service than most hard money lenders, with a focus on experienced investors.' },
      { question: 'What states does Integrated Capital Solutionslend in?', answer: 'Integrated Capital Solutionslends in most US states. Please contact us or start an estimate to confirm lending availability in your state. We are headquartered in Irvine, California, and operate as a national lender.' },
      { question: 'Does Integrated Capital Solutionsreport loans to credit bureaus?', answer: 'No. Integrated Capital Solutionsbusiness purpose loans are not reported to personal credit bureaus, as they are commercial loans made to LLCs or entities, not personal mortgages.' },
      { question: 'What are Archwest\'s closing timelines?', answer: 'Fix & Flip: 5–10 days (record: 1 day). Ground-Up: 7–14 days (record: 2 days). DSCR: 10–20 days (record: 3 days). Bridge: 7–14 days. All timelines begin from a complete loan inquiry submission.' },
    ],
  },
  {
    id: 'borrowers',
    label: 'Borrowers',
    items: [
      { question: 'What experience do I need to qualify?', answer: 'Fix & Flip loans require at least one completed project within the past 36 months. Ground Up Construction loans require three completed projects in the same period. DSCR and Bridge loans have more flexible experience requirements.' },
      { question: 'Do I need to borrow through an LLC?', answer: 'Yes. Integrated Capital Solutionsmakes commercial purpose loans to entities (LLCs, corporations, partnerships), not to individuals personally. Borrowers must have an entity established prior to closing.' },
      { question: 'What is the minimum credit score?', answer: 'Integrated Capital Solutionsgenerally requires a minimum FICO score of 680. Requirements may vary by loan product and scenario.' },
      { question: 'Are foreign nationals eligible?', answer: 'Yes, foreign nationals are eligible for certain Integrated Capital Solutionsloan products. Please contact us to discuss your specific situation and documentation requirements.' },
      { question: 'Can I finance an owner-occupied property?', answer: 'No. Integrated Capital Solutionsonly finances non-owner-occupied investment properties. Owner-occupied properties, mobile homes, and commercial properties are not eligible.' },
      { question: 'Can I self-manage a rental property financed by Archwest?', answer: 'Yes. Integrated Capital Solutionsdoes not require a third-party property management company. Borrowers may self-manage their rental properties.' },
    ],
  },
  {
    id: 'brokers',
    label: 'Brokers',
    items: [
      { question: 'Does Integrated Capital Solutionswork with mortgage brokers?', answer: 'Yes. Integrated Capital Solutions works extensively with mortgage brokers and real estate professionals and is always seeking new broker partnerships. Visit our Broker page to register.' },
      { question: 'How do brokers submit a file to Archwest?', answer: 'Brokers begin by completing the broker registration form on the Integrated Capital Solutionswebsite. Once approved, you will be connected with a dedicated Account Executive who will guide you through the submission process.' },
    ],
  },
  {
    id: 'products',
    label: 'Products',
    items: [
      { question: 'What is a DSCR loan and how does it work?', answer: 'A DSCR (Debt Service Coverage Ratio) loan qualifies borrowers based on the rental income of the investment property rather than the borrower\'s personal income. A DSCR of 1.0 means rent covers the loan payment; Integrated Capital Solutionsaccepts DSCR as low as 0.75.' },
      { question: 'What is the minimum loan amount?', answer: 'The minimum loan amount at Integrated Capital Solutionsis $55,000, with a maximum of $50M+.' },
      { question: 'Are Integrated Capital Solutionsloans fixed rate or adjustable rate?', answer: 'Integrated Capital Solutionsoffers both fixed-rate and adjustable-rate options depending on the loan product. DSCR rental loans are available in both 30-year fixed and ARM structures. Short-term products (Fix & Flip, Bridge, Ground Up) are typically interest-only with a fixed rate for the loan term.' },
      { question: 'Do Integrated Capital Solutionsloans have balloon payments?', answer: 'Short-term loans (Fix & Flip, Bridge, Ground Up) require repayment of the full principal at loan maturity. DSCR rental loans amortize over 30 years and may include a balloon payment depending on the product selected.' },
      { question: 'Can Integrated Capital Solutionsfinance both the purchase and rehab costs?', answer: 'Yes. Integrated Capital SolutionsFix & Flip loans cover up to 92.5% of the purchase price and 100% of rehabilitation costs within the approved budget. Ground Up loans cover up to 90% of total project costs (LTC).' },
      { question: 'What insurance is required?', answer: 'Borrowers are required to carry appropriate property insurance (builder\'s risk for construction, landlord or hazard insurance for rentals) with Integrated Capital Solutionsnamed as an additional insured. Flood insurance is required where applicable.' },
    ],
  },
  {
    id: 'process',
    label: 'Process',
    items: [
      { question: 'How fast will I receive a term sheet?', answer: 'Integrated Capital Solutionsdelivers term sheets within 24 hours of a complete loan inquiry submission. Our record is a same-day term sheet.' },
      { question: 'Can I choose my own title company or escrow officer?', answer: 'In most cases, yes. Integrated Capital Solutionsallows borrowers to select their preferred title and escrow provider, subject to approval. We maintain relationships with national title companies for transactions in all 50 states.' },
      { question: 'Where is Integrated Capital Solutions headquartered?', answer: 'Integrated Capital Solutions is headquartered at 18400 Von Karman Avenue, Suite 500, Irvine, California 92612. We lend nationwide.' },
      { question: 'Do I need an appraisal?', answer: 'Most Integrated Capital Solutionsloan products require an appraisal or BPO (broker price opinion) as part of the underwriting process. The type and requirement vary by loan product, property type, and loan amount. Your Account Executive will confirm the requirements for your specific loan.' },
      { question: 'How do construction draws work?', answer: 'For Ground Up and Fix & Flip loans, construction funds are held in a draw account and disbursed as work is completed and verified by inspection. Draws are processed within 24 hours of a completed draw request and inspection.' },
    ],
  },
];

// Flatten all FAQs for schema
const allFAQsForSchema = faqSections.flatMap((s) => s.items);

export default function FAQPage() {
  return (
    <>
      <SchemaScript schema={faqPageSchema(allFAQsForSchema)} />

      <section className="section-dark pt-28 pb-14">
        <div className="container-wide">
          <Breadcrumb items={[{ name: 'FAQ', href: '/faq' }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-5 mb-3">
            Got Questions? We&apos;ve Got Answers.
          </h1>
          <p className="text-white/65 text-lg max-w-2xl">
            Everything you need to know about Integrated Capital Solutions loan products, eligibility, and the loan process.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-wide max-w-4xl">
          {faqSections.map((section) => (
            <div key={section.id} id={section.id} className="mb-14 scroll-mt-24">
              <h2 className="text-xl font-bold text-[#0a1628] pb-3 border-b-2 border-[#c8922a] mb-6 inline-block pr-8">
                {section.label}
              </h2>
              <FAQAccordion items={section.items} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}