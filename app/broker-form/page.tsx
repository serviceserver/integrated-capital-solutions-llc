import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: 'Broker Registration — Partner with Archwest Capital',
  description:
    'Register as a broker partner with Archwest Capital. Get access to our full loan product suite, dedicated support, and 24-hour term sheets for your real estate investor clients.',
  slug: '/broker-form',
  keywords: [
    'broker registration private lender',
    'become an Archwest broker',
    'mortgage broker partner program',
    'wholesale lender broker signup',
  ],
  noindex: false,
});

export default function BrokerFormPage() {
  return (
    <>
      <section className="section-dark pt-28 pb-14">
        <div className="container-wide">
          <Breadcrumb
            items={[
              { name: 'Brokers', href: '/brokers' },
              { name: 'Broker Registration', href: '/broker-form' },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-5 mb-4">
            Register as a Broker Partner
          </h1>
          <p className="text-white/65 text-lg max-w-xl">
            Join hundreds of brokers nationwide who trust Archwest Capital to deliver fast, reliable
            funding for their real estate investor clients.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form className="flex flex-col gap-5" aria-label="Broker registration form">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="bfFirst" className="text-sm font-semibold text-[#0a1628]">First Name *</label>
                    <input id="bfFirst" type="text" required placeholder="John"
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="bfLast" className="text-sm font-semibold text-[#0a1628]">Last Name *</label>
                    <input id="bfLast" type="text" required placeholder="Smith"
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="bfEmail" className="text-sm font-semibold text-[#0a1628]">Email Address *</label>
                    <input id="bfEmail" type="email" required placeholder="john@company.com"
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="bfPhone" className="text-sm font-semibold text-[#0a1628]">Phone Number *</label>
                    <input id="bfPhone" type="tel" required placeholder="(555) 000-0000"
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="bfCompany" className="text-sm font-semibold text-[#0a1628]">Company Name *</label>
                    <input id="bfCompany" type="text" required placeholder="Your brokerage name"
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="bfNMLS" className="text-sm font-semibold text-[#0a1628]">NMLS ID</label>
                    <input id="bfNMLS" type="text" placeholder="e.g. 1234567"
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="bfState" className="text-sm font-semibold text-[#0a1628]">Primary State(s) You Work In *</label>
                  <input id="bfState" type="text" required placeholder="e.g. California, Texas, Florida"
                    className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="bfVolume" className="text-sm font-semibold text-[#0a1628]">Estimated Monthly Loan Volume</label>
                  <select id="bfVolume"
                    className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all bg-white">
                    <option value="">Select volume range</option>
                    <option value="1-3">1–3 loans per month</option>
                    <option value="4-10">4–10 loans per month</option>
                    <option value="11-25">11–25 loans per month</option>
                    <option value="25+">25+ loans per month</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="bfProducts" className="text-sm font-semibold text-[#0a1628]">Loan Products of Interest</label>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {['Ground Up Construction', 'Fix & Flip', 'DSCR Rental', 'Bridge Loan'].map((p) => (
                      <label key={p} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" value={p}
                          className="w-4 h-4 accent-[#c8922a] rounded" />
                        <span className="text-sm text-[#0a1628]">{p}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="bfNotes" className="text-sm font-semibold text-[#0a1628]">Anything else you&apos;d like us to know?</label>
                  <textarea id="bfNotes" rows={4}
                    placeholder="Tell us about your business, your typical client, or any questions you have..."
                    className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all resize-none" />
                </div>
                <button type="submit" className="btn-primary justify-center py-3.5 text-base mt-2">
                  Submit Broker Registration
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
            <aside>
              <div className="bg-[#0a1628] rounded-2xl p-7 sticky top-24">
                <h2 className="text-white font-bold text-lg mb-5">Broker Partner Benefits</h2>
                <div className="flex flex-col gap-4 mb-8">
                  {[
                    'Dedicated Account Executive',
                    'Term sheet within 24 hours',
                    'Closings in as fast as 7 days',
                    'Access to all 4 loan products',
                    'Transparent broker compensation',
                    'Broker protection on your deals',
                  ].map((b) => (
                    <div key={b} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-[#c8922a] flex-shrink-0 mt-0.5" />
                      <span className="text-white/75 text-sm">{b}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-white/50 text-xs mb-1">Questions before registering?</p>
                  <Link href="/contact" className="text-[#c8922a] text-sm font-semibold hover:underline">
                    Contact our broker team →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}