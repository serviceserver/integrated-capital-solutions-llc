// app/broker-form/page.tsx
'use client';

import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';
import { CheckCircle, Loader2, AlertCircle, Check } from 'lucide-react';
import { useState } from 'react';

// export const metadata = buildMetadata({
//   title: 'Broker Registration - Partner with Integrated Capital Solutions',
//   description:
//     'Register as a broker partner with Integrated Capital Solutions. Get access to our full loan product suite, dedicated support, and 24-hour term sheets for your investor clients.',
//   slug: '/broker-form',
//   keywords: [
//     'broker registration private lender',
//     'become an Integrated Capital Solutionsbroker',
//     'mortgage broker partner program',
//     'wholesale lender broker signup',
//   ],
//   noindex: false,
// });

const PRODUCTS = ['Ground Up Construction', 'Fix & Flip', 'DSCR Rental', 'Bridge Loan'];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function BrokerFormPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors]   = useState<Record<string, string>>({});
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    company: '', nmlsId: '', states: '', monthlyVolume: '',
    products: [] as string[], notes: '',
  });

  function onField(key: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm(f => ({ ...f, [key]: e.target.value }));
      setErrors(er => { const n = { ...er }; delete n[key]; return n; });
    };
  }

  function toggleProduct(p: string) {
    setForm(f => ({
      ...f,
      products: f.products.includes(p)
        ? f.products.filter(x => x !== p)
        : [...f.products, p],
    }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrors({});

    const res = await fetch('/api/submissions/broker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.status === 422) {
      const flat: Record<string, string> = {};
      for (const [k, v] of Object.entries(data.issues ?? {}))
        flat[k] = (v as string[])[0];
      setErrors(flat);
      setStatus('idle');
      return;
    }

    setStatus(res.ok ? 'success' : 'error');
  }

  if (status === 'success') {
    return (
      <section className="section-dark pt-28 pb-14">
        <div className="container-wide">
          <Breadcrumb
            items={[
              { name: 'Brokers', href: '/brokers' },
              { name: 'Broker Registration', href: '/broker-form' },
            ]}
          />
          <div className="bg-[#0a1628] rounded-2xl p-12 text-center max-w-xl mx-auto mt-8">
            <div className="w-16 h-16 rounded-full bg-[#c8922a]/20 flex items-center justify-center mx-auto mb-5">
              <Check size={32} className="text-[#c8922a]" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">Registration Received!</h1>
            <p className="text-white/70 text-base leading-relaxed">
              Welcome to the Integrated Capital Solutions broker partner program. Our team will review
              your registration and reach out within 24 hours.
            </p>
            <Link href="/brokers" className="btn-primary inline-flex mt-6">
              Back to Broker Page
            </Link>
          </div>
        </div>
      </section>
    );
  }

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
            Join hundreds of brokers nationwide who trust Integrated Capital Solutions to deliver fast, reliable
            funding for their investor clients.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form className="flex flex-col gap-5" aria-label="Broker registration form" onSubmit={onSubmit} noValidate>
                {status === 'error' && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-sm">
                    <AlertCircle size={15} className="shrink-0" />
                    Something went wrong. Please try again.
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="bfFirst" className="text-sm font-semibold text-[#0a1628]">First Name *</label>
                    <input id="bfFirst" type="text" required placeholder="John" value={form.firstName} onChange={onField('firstName')}
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                    {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="bfLast" className="text-sm font-semibold text-[#0a1628]">Last Name *</label>
                    <input id="bfLast" type="text" required placeholder="Smith" value={form.lastName} onChange={onField('lastName')}
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                    {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="bfEmail" className="text-sm font-semibold text-[#0a1628]">Email Address *</label>
                    <input id="bfEmail" type="email" required placeholder="john@company.com" value={form.email} onChange={onField('email')}
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="bfPhone" className="text-sm font-semibold text-[#0a1628]">Phone Number *</label>
                    <input id="bfPhone" type="tel" required placeholder="(555) 000-0000" value={form.phone} onChange={onField('phone')}
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="bfCompany" className="text-sm font-semibold text-[#0a1628]">Company Name *</label>
                    <input id="bfCompany" type="text" required placeholder="Your brokerage name" value={form.company} onChange={onField('company')}
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                    {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company}</p>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="bfNMLS" className="text-sm font-semibold text-[#0a1628]">NMLS ID</label>
                    <input id="bfNMLS" type="text" placeholder="e.g. 1234567" value={form.nmlsId} onChange={onField('nmlsId')}
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="bfState" className="text-sm font-semibold text-[#0a1628]">Primary State(s) You Work In *</label>
                  <input id="bfState" type="text" required placeholder="e.g. California, Texas, Florida" value={form.states} onChange={onField('states')}
                    className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                  {errors.states && <p className="text-xs text-red-500 mt-1">{errors.states}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="bfVolume" className="text-sm font-semibold text-[#0a1628]">Estimated Monthly Loan Volume</label>
                  <select id="bfVolume" value={form.monthlyVolume} onChange={onField('monthlyVolume')}
                    className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all bg-white">
                    <option value="">Select volume range</option>
                    <option value="1-3">1–3 loans per month</option>
                    <option value="4-10">4–10 loans per month</option>
                    <option value="11-25">11–25 loans per month</option>
                    <option value="25+">25+ loans per month</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-[#0a1628]">Loan Products of Interest *</label>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {PRODUCTS.map((p) => (
                      <label key={p} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={form.products.includes(p)} onChange={() => toggleProduct(p)}
                          className="w-4 h-4 accent-[#c8922a] rounded" />
                        <span className="text-sm text-[#0a1628]">{p}</span>
                      </label>
                    ))}
                  </div>
                  {errors.products && <p className="text-xs text-red-500 mt-1">{errors.products}</p>}
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="bfNotes" className="text-sm font-semibold text-[#0a1628]">Anything else you&apos;d like us to know?</label>
                  <textarea id="bfNotes" rows={4} placeholder="Tell us about your business, your typical client, or any questions you have..." value={form.notes} onChange={onField('notes')}
                    className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all resize-none" />
                </div>
                <button type="submit" disabled={status === 'loading'} className="btn-primary justify-center py-3.5 text-base mt-2 disabled:opacity-70 disabled:cursor-not-allowed">
                  {status === 'loading' ? (
                    <><Loader2 size={16} className="animate-spin" /> Submitting…</>
                  ) : (
                    'Submit Broker Registration'
                  )}
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
                      <CheckCircle size={16} className="text-[#c8922a] shrink-0 mt-0.5" />
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
