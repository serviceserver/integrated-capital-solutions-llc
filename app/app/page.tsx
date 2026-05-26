// app/app/page.tsx
'use client';

import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';
import Breadcrumb from '@/components/Breadcrumb';
import Link from 'next/link';
import { CheckCircle, Loader2, AlertCircle, Check } from 'lucide-react';
import { useState } from 'react';

// export const metadata = buildMetadata({
//   title: 'Get an Estimate - Start Your Loan Application',
//   description:
//     'Get a same-day quote from Integrated Capital Solutions. Fill out our quick loan inquiry form and receive a term sheet within 24 hours for fix-and-flip, ground-up, DSCR, or bridge loans.',
//   slug: '/app',
//   keywords: [
//     'real estate loan application',
//     'get loan estimate',
//     'private lender quote',
//     'fix flip loan inquiry',
//     'DSCR loan application',
//     'hard money loan quote',
//   ],
// });

const loanTypes = [
  'GROUND_UP',
  'FIX_AND_FLIP',
  'DSCR_RENTAL',
  'BRIDGE_LOAN',
];

const LOAN_TYPE_LABELS: Record<string, string> = {
  GROUND_UP: 'Ground Up Construction',
  FIX_AND_FLIP: 'Fix & Flip',
  DSCR_RENTAL: 'DSCR Rental',
  BRIDGE_LOAN: 'Bridge Loan',
};

const benefits = [
  'Term sheet within 24 hours',
  'No obligation, no hard credit pull',
  'Dedicated Account Executive assigned',
  'Close in as fast as 7 days',
];

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function AppPage() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors]   = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    loanType: '', propertyAddress: '', loanAmount: '', experience: '', notes: '',
  });

  function onField(key: string) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm(f => ({ ...f, [key]: e.target.value }));
      setErrors(er => { const n = { ...er }; delete n[key]; return n; });
    };
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrors({});

    const res = await fetch('/api/submissions/loan-inquiry', {
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
      <>
        <section className="section-dark pt-28 pb-14">
          <div className="container-wide">
            <Breadcrumb items={[{ name: 'Get an Estimate', href: '/app' }]} />
            <div className="bg-[#0a1628] rounded-2xl p-12 text-center max-w-xl mx-auto mt-8">
              <div className="w-16 h-16 rounded-full bg-[#c8922a]/20 flex items-center justify-center mx-auto mb-5">
                <Check size={32} className="text-[#c8922a]" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">Application Received!</h1>
              <p className="text-white/70 text-base leading-relaxed">
                Thank you for your inquiry. A member of our team will reach out within 24 hours
                with a personalized term sheet for your <strong>{LOAN_TYPE_LABELS[form.loanType] || form.loanType}</strong>.
              </p>
              <Link href="/" className="btn-primary inline-flex mt-6">
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </>
    );
  }

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
              <form className="flex flex-col gap-5" aria-label="Loan estimate inquiry form" onSubmit={onSubmit} noValidate>
                {status === 'error' && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-sm">
                    <AlertCircle size={15} className="shrink-0" />
                    Something went wrong. Please try again.
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="appFirst" className="text-sm font-semibold text-[#0a1628]">First Name *</label>
                    <input id="appFirst" type="text" required placeholder="John" value={form.firstName} onChange={onField('firstName')}
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                    {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="appLast" className="text-sm font-semibold text-[#0a1628]">Last Name *</label>
                    <input id="appLast" type="text" required placeholder="Smith" value={form.lastName} onChange={onField('lastName')}
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                    {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="appEmail" className="text-sm font-semibold text-[#0a1628]">Email Address *</label>
                    <input id="appEmail" type="email" required placeholder="john@example.com" value={form.email} onChange={onField('email')}
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="appPhone" className="text-sm font-semibold text-[#0a1628]">Phone Number *</label>
                    <input id="appPhone" type="tel" required placeholder="(555) 000-0000" value={form.phone} onChange={onField('phone')}
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="appLoanType" className="text-sm font-semibold text-[#0a1628]">Loan Type *</label>
                  <select id="appLoanType" required value={form.loanType} onChange={onField('loanType')}
                    className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all bg-white">
                    <option value="">Select loan type</option>
                    {loanTypes.map((t) => <option key={t} value={t}>{LOAN_TYPE_LABELS[t]}</option>)}
                  </select>
                  {errors.loanType && <p className="text-xs text-red-500 mt-1">{errors.loanType}</p>}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="appPropertyAddress" className="text-sm font-semibold text-[#0a1628]">Property Address</label>
                    <input id="appPropertyAddress" type="text" placeholder="123 Main St, City, State" value={form.propertyAddress} onChange={onField('propertyAddress')}
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="appLoanAmount" className="text-sm font-semibold text-[#0a1628]">Estimated Loan Amount *</label>
                    <input id="appLoanAmount" type="text" required placeholder="e.g. $500,000" value={form.loanAmount} onChange={onField('loanAmount')}
                      className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all" />
                    {errors.loanAmount && <p className="text-xs text-red-500 mt-1">{errors.loanAmount}</p>}
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="appExperience" className="text-sm font-semibold text-[#0a1628]">Investment Experience</label>
                  <select id="appExperience" value={form.experience} onChange={onField('experience')}
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
                  <textarea id="appNotes" rows={4} placeholder="Tell us about your project, timeline, or any specific questions..." value={form.notes} onChange={onField('notes')}
                    className="border border-[#e8eaef] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/20 transition-all resize-none" />
                </div>
                <button type="submit" disabled={status === 'loading'} className="btn-primary justify-center py-3.5 text-base mt-2 disabled:opacity-70 disabled:cursor-not-allowed">
                  {status === 'loading' ? (
                    <><Loader2 size={16} className="animate-spin" /> Submitting…</>
                  ) : (
                    'Submit Loan Inquiry'
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
            <aside className="lg:col-span-1">
              <div className="bg-[#0a1628] rounded-2xl p-7 sticky top-24">
                <h2 className="text-white font-bold text-lg mb-5">What to Expect</h2>
                <div className="flex flex-col gap-4 mb-8">
                  {benefits.map((b) => (
                    <div key={b} className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-[#c8922a] shrink-0 mt-0.5" />
                      <span className="text-white/75 text-sm">{b}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-white/50 text-xs mb-3">Prefer to speak with someone?</p>
                  <a href="mailto:info@integratedcapitalsolutionsllc.com"
                    className="text-[#c8922a] font-bold text-lg hover:text-[#e8a83a] transition-colors">
                    info@integratedcapitalsolutionsllc.com
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
