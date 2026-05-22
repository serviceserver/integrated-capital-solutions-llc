'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';

type Status = 'idle' | 'loading' | 'success' | 'error';

const inputBase =
  'w-full border-[1.5px] border-[#e8eaef] rounded-lg px-3.5 py-2.5 text-sm font-[family-name:inherit] outline-none transition-colors duration-150 focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/15 bg-white';

const inputError =
  'w-full border-[1.5px] border-red-400 rounded-lg px-3.5 py-2.5 text-sm font-[family-name:inherit] outline-none transition-colors duration-150 focus:border-red-500 focus:ring-2 focus:ring-red-200 bg-white';

const labelBase = 'block text-[0.8125rem] font-semibold text-[#0a1628] mb-1.5';

interface FieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ label, error, required, children }: FieldProps) {
  return (
    <div>
      <label className={labelBase}>
        {label} {required && <span className="text-[#c8922a]">*</span>}
      </label>
      {children}
      {error && (
        <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={11} /> {error}
        </p>
      )}
    </div>
  );
}

const PRODUCTS = [
  'Ground Up Construction',
  'Fix & Flip',
  'DSCR Rental',
  'Bridge Loan',
];

export default function BrokerForm() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    company: '', nmlsId: '', states: '',
    monthlyVolume: '', notes: '', products: [] as string[],
  });
  const [status, setStatus]   = useState<Status>('idle');
  const [errors, setErrors]   = useState<Record<string, string>>({});

  function set(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm(p => ({ ...p, [k]: e.target.value }));
      setErrors(p => { const n = { ...p }; delete n[k]; return n; });
    };
  }

  function toggleProduct(p: string) {
    setForm(prev => ({
      ...prev,
      products: prev.products.includes(p)
        ? prev.products.filter(x => x !== p)
        : [...prev.products, p],
    }));
    setErrors(p => { const n = { ...p }; delete n['products']; return n; });
  }

  async function handleSubmit(e: React.FormEvent) {
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
      <div className="bg-green-50 border-[1.5px] border-green-200 rounded-xl p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-green-800 mb-2">Registration Received!</h3>
        <p className="text-green-700 leading-relaxed text-sm">
          A dedicated Account Executive will reach out within{' '}
          <strong>1 business day</strong> to get you onboarded. Questions? Call{' '}
          <a href="mailto:info@integratedcapitalsolutionsllc.com" className="font-bold underline">info@integratedcapitalsolutionsllc.com</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {status === 'error' && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-sm">
          <AlertCircle size={15} className="shrink-0" />
          Something went wrong. Please try again.
        </div>
      )}

      {/* Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="First Name" required error={errors.firstName}>
          <input className={errors.firstName ? inputError : inputBase}
            value={form.firstName} onChange={set('firstName')} required placeholder="John" />
        </Field>
        <Field label="Last Name" required error={errors.lastName}>
          <input className={errors.lastName ? inputError : inputBase}
            value={form.lastName} onChange={set('lastName')} required placeholder="Smith" />
        </Field>
      </div>

      {/* Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Email" required error={errors.email}>
          <input type="email" className={errors.email ? inputError : inputBase}
            value={form.email} onChange={set('email')} required placeholder="john@company.com" />
        </Field>
        <Field label="Phone" required error={errors.phone}>
          <input type="tel" className={errors.phone ? inputError : inputBase}
            value={form.phone} onChange={set('phone')} required placeholder="(555) 000-0000" />
        </Field>
      </div>

      {/* Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Company Name" required error={errors.company}>
          <input className={errors.company ? inputError : inputBase}
            value={form.company} onChange={set('company')} required placeholder="Your brokerage name" />
        </Field>
        <Field label="NMLS ID" error={errors.nmlsId}>
          <input className={inputBase}
            value={form.nmlsId} onChange={set('nmlsId')} placeholder="e.g. 1234567" />
        </Field>
      </div>

      {/* States */}
      <Field label="Primary State(s) You Work In" required error={errors.states}>
        <input className={errors.states ? inputError : inputBase}
          value={form.states} onChange={set('states')} required
          placeholder="e.g. California, Texas, Florida" />
      </Field>

      {/* Volume */}
      <Field label="Estimated Monthly Loan Volume" error={errors.monthlyVolume}>
        <select className={inputBase} value={form.monthlyVolume} onChange={set('monthlyVolume')}>
          <option value="">Select volume range</option>
          <option value="1-3">1–3 loans / month</option>
          <option value="4-10">4–10 loans / month</option>
          <option value="11-25">11–25 loans / month</option>
          <option value="25+">25+ loans / month</option>
        </select>
      </Field>

      {/* Products */}
      <div>
        <label className={labelBase}>
          Products of Interest <span className="text-[#c8922a]">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2.5 mt-0.5">
          {PRODUCTS.map(p => (
            <label
              key={p}
              className={`flex items-center gap-2.5 cursor-pointer rounded-lg border-[1.5px] px-3.5 py-2.5 text-sm font-medium transition-colors duration-150 ${
                form.products.includes(p)
                  ? 'border-[#c8922a] bg-[#c8922a]/6 text-[#0a1628]'
                  : 'border-[#e8eaef] text-[#4a5568] hover:border-[#c8922a]/40'
              }`}
            >
              <input
                type="checkbox"
                className="accent-[#c8922a] w-4 h-4 shrink-0"
                checked={form.products.includes(p)}
                onChange={() => toggleProduct(p)}
              />
              {p}
            </label>
          ))}
        </div>
        {errors.products && (
          <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
            <AlertCircle size={11} /> {errors.products}
          </p>
        )}
      </div>

      {/* Notes */}
      <Field label="Anything else you'd like us to know?" error={errors.notes}>
        <textarea
          className={`${inputBase} resize-none`}
          value={form.notes}
          onChange={set('notes')}
          rows={4}
          placeholder="Tell us about your business, your typical clients, or any questions…"
        />
      </Field>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full justify-center py-3.5 text-[0.9375rem] disabled:opacity-70 disabled:cursor-not-allowed mt-1"
      >
        {status === 'loading' ? (
          <><Loader2 size={16} className="animate-spin" /> Submitting…</>
        ) : (
          'Submit Broker Registration'
        )}
      </button>

      <p className="text-xs text-[#9aa3b2] text-center">
        By submitting, you agree to our{' '}
        <Link href="/terms-of-use" className="text-[#c8922a] hover:underline">Terms of Use</Link>
        {' '}and{' '}
        <Link href="/privacy-policy" className="text-[#c8922a] hover:underline">Privacy Policy</Link>.
      </p>
    </form>
  );
}