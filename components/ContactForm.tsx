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

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', company: '',
    phone: '', email: '', message: '',
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  function set(k: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm(p => ({ ...p, [k]: e.target.value }));
      setErrors(p => { const n = { ...p }; delete n[k]; return n; });
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrors({});

    const res = await fetch('/api/submissions/contact', {
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
        <h3 className="text-lg font-bold text-green-800 mb-2">Message Sent!</h3>
        <p className="text-green-700 text-sm leading-relaxed">
          We&apos;ll get back to you shortly. For urgent matters, call{' '}
          <a href="tel:18449222724" className="font-bold underline">(844) 922-2724</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      {status === 'error' && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-red-600 text-sm">
          <AlertCircle size={15} className="flex-shrink-0" />
          Something went wrong. Please try again or call (844) 922-2724.
        </div>
      )}

      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="First Name" required error={errors.firstName}>
          <input
            className={errors.firstName ? inputError : inputBase}
            value={form.firstName}
            onChange={set('firstName')}
            required
            placeholder="John"
          />
        </Field>
        <Field label="Last Name" required error={errors.lastName}>
          <input
            className={errors.lastName ? inputError : inputBase}
            value={form.lastName}
            onChange={set('lastName')}
            required
            placeholder="Smith"
          />
        </Field>
      </div>

      <Field label="Company" error={errors.company}>
        <input
          className={inputBase}
          value={form.company}
          onChange={set('company')}
          placeholder="Your company name"
        />
      </Field>

      <Field label="Phone" required error={errors.phone}>
        <input
          type="tel"
          className={errors.phone ? inputError : inputBase}
          value={form.phone}
          onChange={set('phone')}
          required
          placeholder="(555) 000-0000"
        />
      </Field>

      <Field label="Email" required error={errors.email}>
        <input
          type="email"
          className={errors.email ? inputError : inputBase}
          value={form.email}
          onChange={set('email')}
          required
          placeholder="john@example.com"
        />
      </Field>

      <Field label="Message" required error={errors.message}>
        <textarea
          className={`${errors.message ? inputError : inputBase} resize-none`}
          value={form.message}
          onChange={set('message')}
          required
          rows={5}
          placeholder="How can we help you?"
        />
      </Field>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary w-full justify-center py-3.5 text-[0.9375rem] disabled:opacity-70 disabled:cursor-not-allowed mt-1"
      >
        {status === 'loading' ? (
          <>
            <Loader2 size={16} className="animate-spin" /> Sending…
          </>
        ) : (
          'Send Message'
        )}
      </button>
    </form>
  );
}