import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Get an Estimate - Start Your Loan Application',
  description:
    'Get a same-day quote from Integrated Capital Solutions. Fill out our quick loan inquiry form and receive a term sheet within 24 hours for fix-and-flip, ground-up, DSCR, or bridge loans.',
  slug: '/app',
  keywords: [
    'real estate loan application',
    'get loan estimate',
    'private lender quote',
    'fix flip loan inquiry',
    'DSCR loan application',
    'hard money loan quote',
  ],
});

const loanTypes = [
  'Ground Up Construction',
  'Fix & Flip',
  'DSCR Rental',
  'Bridge Loan',
];

const benefits = [
  'Term sheet within 24 hours',
  'No obligation, no hard credit pull',
  'Dedicated Account Executive assigned',
  'Close in as fast as 7 days',
];

export default function AppPage() {
  return (
    <>
      <section className="section-dark pt-28 pb-14">
        <div className="container-wide">
          <Breadcrumb items={[{ name: 'Get an Estimate', href: '/app' }]} />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-5 mb-4">
            Get an Estimate
          </h1>
          <p className="text-white/65 text-lg max-w-xl">
            Fill out the quick form below and a member of our team will reach out within 24 hours with
            a personalized term sheet.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form className="flex flex-col gap-5" aria-label="Loan estimate inquiry form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="appFirst" className="text-sm font-semibold text-[#0a1628]">First Name *</label>
                    <input id="appFirst" type="text" required placeholder="John"
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="appLast" className="text-sm font-semibold text-[#0a1628]">Last Name *</label>
                    <input id="appLast" type="text" required placeholder="Smith"
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="appEmail" className="text-sm font-semibold text-[#0a1628]">Email Address *</label>
                    <input id="appEmail" type="email" required placeholder="john@example.com"
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="appPhone" className="text-sm font-semibold text-[#0a1628]">Phone Number *</label>
                    <input id="appPhone" type="tel" required placeholder="(555) 000-0000"
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="appLoanType" className="text-sm font-semibold text-[#0a1628]">Loan Type *</label>
                  <select id="appLoanType" required
                    className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all bg-white">
                    <option value="">Select loan type</option>
                    {loanTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="appPropertyAddress" className="text-sm font-semibold text-[#0a1628]">Property Address</label>
                    <input id="appPropertyAddress" type="text" placeholder="123 Main St, City, State"
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="appLoanAmount" className="text-sm font-semibold text-[#0a1628]">Estimated Loan Amount *</label>
                    <input id="appLoanAmount" type="text" required placeholder="e.g. $500,000"
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="appExperience" className="text-sm font-semibold text-[#0a1628]">Investment Experience</label>
                  <select id="appExperience"
                    className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all bg-white">
                    <option value="">Select experience level</option>
                    <option value="1-2">1–2 completed projects</option>
                    <option value="3-5">3–5 completed projects</option>
                    <option value="6-10">6–10 completed projects</option>
                    <option value="10+">10+ completed projects</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="appNotes" className="text-sm font-semibold text-[#0a1628]">Additional Notes</label>
                  <textarea id="appNotes" rows={4}
                    placeholder="Tell us about your project, timeline, or any specific questions..."
                    className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all resize-none" />
                </div>
                <button type="submit" className="btn-primary justify-center py-3.5 text-base mt-2">
                  Submit Loan Inquiry
                </button>
                <p className="text-xs text-[#9aa3b2] text-center">
                  By submitting, you agree to our{' '}
                  <Link href="/terms-of-use" className="underline hover:text-[#c8922a]">Terms of Use</Link>{' '}
                  and{' '}
                  <Link href="/privacy-policy" className="underline hover:text-[#c8922a]">Privacy Policy</Link>.
                </p>
              </form>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="bg-[#0a1628] rounded-2xl p-7 sticky top-24">
                <h2 className="text-white font-bold text-lg mb-5">What to Expect</h2>
                <div className="flex flex-col gap-4 mb-8">
                  {benefits.map((b) => (
                    <div key={b} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-[#c8922a] flex-shrink-0 mt-0.5" />
                      <span className="text-white/75 text-sm">{b}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-white/50 text-xs mb-3">Prefer to speak with someone?</p>
                  <a href="tel:18449222724"
                    className="text-[#c8922a] font-bold text-lg hover:text-[#e8a83a] transition-colors">
                    (844) 922-2724
                  </a>
                  <p className="text-white/40 text-xs mt-1">Mon – Fri, 8:30 AM – 5:00 PM PT</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}