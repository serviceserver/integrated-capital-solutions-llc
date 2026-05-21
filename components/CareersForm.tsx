'use client';
import { useState } from 'react';
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

const OPEN_ROLES = [
  'Account Executive',
  'Loan Closing Associate',
  'Loan Processor',
  'Loan Underwriter',
  'General Application',
];

export default function CareersForm() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', position: '', aboutText: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function set(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setForm(p => ({ ...p, [k]: e.target.value }));
      setErrors(p => { const n = { ...p }; delete n[k]; return n; });
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrors({});

    const res = await fetch('/api/submissions/careers', {
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
      <div className="bg-green-50 border-[1.5px] border-green-200 rounded-xl p-8 text-center">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={28} className="text-green-600" />
        </div>
        <h3 className="text-lg font-bold text-green-800 mb-2">Application Received!</h3>
        <p className="text-green-700 text-sm leading-relaxed">
          Our team will carefully review your application. If your background is a strong match,
          we&apos;ll reach out to schedule a conversation.
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
          <input
            className={errors.firstName ? inputError : inputBase}
            value={form.firstName} onChange={set('firstName')}
            required placeholder="John"
          />
        </Field>
        <Field label="Last Name" required error={errors.lastName}>
          <input
            className={errors.lastName ? inputError : inputBase}
            value={form.lastName} onChange={set('lastName')}
            required placeholder="Smith"
          />
        </Field>
      </div>

      {/* Contact */}
      <Field label="Email" required error={errors.email}>
        <input
          type="email"
          className={errors.email ? inputError : inputBase}
          value={form.email} onChange={set('email')}
          required placeholder="john@example.com"
        />
      </Field>

      <Field label="Phone" error={errors.phone}>
        <input
          type="tel"
          className={inputBase}
          value={form.phone} onChange={set('phone')}
          placeholder="(555) 000-0000"
        />
      </Field>

      {/* Position */}
      <Field label="Position Interested In" required error={errors.position}>
        <select
          className={errors.position ? inputError : inputBase}
          value={form.position} onChange={set('position')} required
        >
          <option value="">Select a role</option>
          {OPEN_ROLES.map(r => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </Field>

      {/* About */}
      <Field label="Tell us about yourself" error={errors.aboutText}>
        <textarea
          className={`${inputBase} resize-none`}
          value={form.aboutText} onChange={set('aboutText')}
          rows={5}
          placeholder="Briefly describe your experience and what you're looking for…"
        />
      </Field>

      {/* Resume note */}
      <p className="text-xs text-[#9aa3b2] bg-[#f7f8fa] border border-[#e8eaef] rounded-lg px-4 py-3 leading-relaxed">
        📎 To attach a resume, apply directly via LinkedIn using the button above, or email your resume to{' '}
        <a href="mailto:careers@archwestcapital.com" className="text-[#c8922a] font-semibold hover:underline">
          careers@archwestcapital.com
        </a>
        {' '}with the role in the subject line.
      </p>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full justify-center py-3.5 text-[0.9375rem] disabled:opacity-70 disabled:cursor-not-allowed mt-1"
      >
        {status === 'loading' ? (
          <><Loader2 size={16} className="animate-spin" /> Submitting…</>
        ) : (
          'Submit Application'
        )}
      </button>
    </form>
  );
}