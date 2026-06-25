// app/admin/settings/ContactContentForm.tsx
'use client'
import { useState } from 'react'

const FIELDS = [
  { key: 'contact_email', label: 'Contact Email', placeholder: 'info@integratedcapitalsolutionsllc.com' },
  { key: 'contact_phone', label: 'Phone', placeholder: '(844) 922-2724' },
  { key: 'contact_address', label: 'Address', placeholder: '18400 Von Karman Ave., Suite 500, Irvine, CA 92612' },
  { key: 'contact_hours', label: 'Business Hours', placeholder: 'Mon – Fri, 8:30 AM – 5:00 PM PT' },
  { key: 'loan_servicing_address', label: 'Loan Servicing Address', placeholder: '2175 Hunting Valley lane, Streetsboro, OH, 44241' },
  { key: 'payoff_email', label: 'Payoff Request Email', placeholder: 'curtis@integratedcapitalsolutionsllc.com' },
  { key: 'servicing_email', label: 'Servicing Email', placeholder: 'info@integratedcapitalsolutionsllc.com' },
]

export default function ContactContentForm({ initial }: { initial: Record<string, string> }) {
  const [values, setValues] = useState<Record<string, string>>(() => {
    const start: Record<string, string> = {}
    for (const f of FIELDS) start[f.key] = initial[f.key] ?? ''
    return start
  })
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (key: string, val: string) => {
    setValues(v => ({ ...v, [key]: val }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'contact_email', value: values.contact_email }),
      })
      // For simplicity, send all fields in parallel
      await Promise.all(
        FIELDS.map(f =>
          fetch('/api/admin/content', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key: f.key, value: values[f.key] }),
          })
        )
      )
      setMessage('Saved successfully')
      setTimeout(() => setMessage(''), 3000)
    } catch {
      setMessage('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gap: '1rem', maxWidth: 560 }}>
        {FIELDS.map(f => (
          <div key={f.key}>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#4a5568', marginBottom: '0.375rem' }}>
              {f.label}
            </label>
            <input
              type="text"
              value={values[f.key]}
              onChange={e => handleChange(f.key, e.target.value)}
              placeholder={f.placeholder}
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                background: '#fff',
                border: '1px solid #e8eaef',
                borderRadius: 6,
                fontSize: '0.875rem',
                color: '#0a1628',
                outline: 'none',
              }}
            />
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          type="submit"
          disabled={saving}
          style={{
            padding: '0.625rem 1.25rem',
            background: '#c8922a',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            fontSize: '0.875rem',
            fontWeight: 600,
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        {message && (
          <span style={{ fontSize: '0.8125rem', color: message.startsWith('Failed') ? '#ef4444' : '#10b981' }}>
            {message}
          </span>
        )}
      </div>
    </form>
  )
}
