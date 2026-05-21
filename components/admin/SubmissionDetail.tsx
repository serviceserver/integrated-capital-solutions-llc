// components/admin/SubmissionDetail.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Trash2, AlertTriangle } from 'lucide-react';

const STATUS_COLORS: Record<string, [string, string]> = {
  NEW:          ['#dbeafe', '#1d4ed8'],
  IN_REVIEW:    ['#fef3c7', '#b45309'],
  CONTACTED:    ['#d1fae5', '#065f46'],
  QUALIFIED:    ['#ede9fe', '#6d28d9'],
  CLOSED:       ['#f3f4f6', '#6b7280'],
  SPAM:         ['#fee2e2', '#b91c1c'],
  REVIEWING:    ['#fef3c7', '#b45309'],
  PHONE_SCREEN: ['#dbeafe', '#1d4ed8'],
  INTERVIEW:    ['#ede9fe', '#6d28d9'],
  OFFER:        ['#d1fae5', '#065f46'],
  HIRED:        ['#d1fae5', '#065f46'],
  REJECTED:     ['#fee2e2', '#b91c1c'],
};

export interface DetailField {
  label: string;
  value: string;
  type?: 'email' | 'phone' | 'text' | 'default';
}

interface Props {
  title: string;
  backHref: string;
  backLabel: string;
  record: {
    id: string;
    status: string;
    assignedTo?: string | null;
    internalNotes?: string | null;
    createdAt: string;
    updatedAt: string;
  };
  fields: DetailField[];
  patchEndpoint: string;
  deleteEndpoint: string;
  deleteRedirect: string;
  statusOptions: string[];
}

export default function SubmissionDetail({
  title, backHref, backLabel, record, fields,
  patchEndpoint, deleteEndpoint, deleteRedirect, statusOptions,
}: Props) {
  const router = useRouter();
  const [status, setStatus]           = useState(record.status);
  const [assignedTo, setAssignedTo]   = useState(record.assignedTo ?? '');
  const [notes, setNotes]             = useState(record.internalNotes ?? '');
  const [saving, setSaving]           = useState(false);
  const [saved, setSaved]             = useState(false);
  const [deleting, setDeleting]       = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError]             = useState('');

  async function handleSave() {
    setSaving(true); setError('');
    try {
      const res = await fetch(patchEndpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, assignedTo, internalNotes: notes }),
      });
      if (!res.ok) throw new Error('Failed to save');
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(deleteEndpoint, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete');
      router.push(deleteRedirect);
    } catch {
      setError('Failed to delete. Please try again.');
      setDeleting(false);
      setConfirmDelete(false);
    }
  }

  const [bgBadge, colorBadge] = STATUS_COLORS[status] ?? ['#f3f4f6', '#6b7280'];

  return (
    <div>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <Link href={backHref} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: '#9aa3b2', fontSize: '0.8125rem', textDecoration: 'none', marginBottom: '0.5rem' }}>
            <ArrowLeft size={13} /> Back to {backLabel}
          </Link>
          <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#0a1628', margin: 0 }}>
            {title} Detail
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => setConfirmDelete(true)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', background: '#fff', border: '1.5px solid #fecaca', color: '#dc2626', borderRadius: 7, padding: '0.5rem 1rem', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            <Trash2 size={13} /> Delete
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', background: saved ? '#10b981' : '#c8922a', color: '#fff', border: 'none', borderRadius: 7, padding: '0.5rem 1.25rem', fontSize: '0.8125rem', fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', fontFamily: 'inherit', transition: 'background 0.2s' }}
          >
            <Save size={13} />
            {saving ? 'Saving…' : saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {error && (
        <div style={{ background: '#fee2e2', border: '1px solid #fecaca', borderRadius: 7, padding: '0.75rem 1rem', color: '#dc2626', fontSize: '0.8125rem', marginBottom: '1.25rem' }}>
          {error}
        </div>
      )}

      {/* Delete confirm modal */}
      {confirmDelete && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: '#fff', borderRadius: 12, padding: '2rem', maxWidth: 400, width: '100%', boxShadow: '0 24px 64px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={18} color="#dc2626" />
              </div>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#0a1628' }}>Confirm Delete</h3>
            </div>
            <p style={{ color: '#4a5568', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              This will permanently delete this submission and cannot be undone.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
              <button onClick={() => setConfirmDelete(false)} style={{ background: '#f7f8fa', border: '1px solid #e8eaef', borderRadius: 7, padding: '0.5rem 1.25rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', color: '#4a5568' }}>
                Cancel
              </button>
              <button onClick={handleDelete} disabled={deleting} style={{ background: '#dc2626', color: '#fff', border: 'none', borderRadius: 7, padding: '0.5rem 1.25rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
                {deleting ? 'Deleting…' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.25rem', alignItems: 'start' }}>
        {/* Submission data */}
        <div style={{ background: '#fff', border: '1px solid #e8eaef', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ padding: '1.125rem 1.5rem', borderBottom: '1px solid #e8eaef', background: '#f7f8fa' }}>
            <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0a1628', margin: 0 }}>Submission Details</h2>
          </div>
          <div style={{ padding: '0 1.5rem' }}>
            {fields.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', padding: '0.875rem 0', borderBottom: i < fields.length - 1 ? '1px solid #f0f2f5' : 'none', alignItems: 'flex-start' }}>
                <div style={{ minWidth: 140, fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9aa3b2', paddingTop: '0.125rem' }}>
                  {f.label}
                </div>
                <div style={{ flex: 1, fontSize: '0.875rem', color: '#0a1628', lineHeight: 1.6 }}>
                  {f.type === 'email' ? (
                    <a href={`mailto:${f.value}`} style={{ color: '#c8922a' }}>{f.value}</a>
                  ) : f.type === 'phone' ? (
                    <a href={`tel:${f.value}`} style={{ color: '#c8922a' }}>{f.value}</a>
                  ) : (
                    f.value
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Admin sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Meta */}
          <div style={{ background: '#fff', border: '1px solid #e8eaef', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e8eaef', background: '#f7f8fa' }}>
              <h2 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0a1628', margin: 0 }}>Submission Info</h2>
            </div>
            <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9aa3b2', margin: '0 0 0.375rem' }}>ID</p>
                <p style={{ fontSize: '0.75rem', color: '#4a5568', fontFamily: 'monospace', margin: 0, wordBreak: 'break-all' }}>{record.id}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9aa3b2', margin: '0 0 0.375rem' }}>Submitted</p>
                <p style={{ fontSize: '0.8125rem', color: '#0a1628', margin: 0 }}>
                  {new Date(record.createdAt).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9aa3b2', margin: '0 0 0.375rem' }}>Last Updated</p>
                <p style={{ fontSize: '0.8125rem', color: '#0a1628', margin: 0 }}>
                  {new Date(record.updatedAt).toLocaleString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div style={{ background: '#fff', border: '1px solid #e8eaef', borderRadius: 10, overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e8eaef', background: '#f7f8fa' }}>
              <h2 style={{ fontSize: '0.8125rem', fontWeight: 700, color: '#0a1628', margin: 0 }}>Manage</h2>
            </div>
            <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Status select */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0a1628', display: 'block', marginBottom: '0.375rem' }}>Status</label>
                <div style={{ position: 'relative' }}>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value)}
                    style={{ width: '100%', appearance: 'none', border: '1.5px solid #e8eaef', borderRadius: 7, padding: '0.5rem 2rem 0.5rem 0.75rem', fontSize: '0.8125rem', fontFamily: 'inherit', background: '#fff', cursor: 'pointer', outline: 'none' }}
                  >
                    {statusOptions.map(s => (
                      <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                    ))}
                  </select>
                </div>
                <div style={{ marginTop: '0.375rem' }}>
                  <span style={{ background: bgBadge, color: colorBadge, fontSize: '0.6875rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 100 }}>
                    {status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>

              {/* Assigned to */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0a1628', display: 'block', marginBottom: '0.375rem' }}>Assigned To</label>
                <input
                  value={assignedTo}
                  onChange={e => setAssignedTo(e.target.value)}
                  placeholder="Team member name or email"
                  style={{ width: '100%', border: '1.5px solid #e8eaef', borderRadius: 7, padding: '0.5rem 0.75rem', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => (e.target.style.borderColor = '#c8922a')}
                  onBlur={e => (e.target.style.borderColor = '#e8eaef')}
                />
              </div>

              {/* Internal notes */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0a1628', display: 'block', marginBottom: '0.375rem' }}>Internal Notes</label>
                <textarea
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  rows={5}
                  placeholder="Add private notes visible only to admins…"
                  style={{ width: '100%', border: '1.5px solid #e8eaef', borderRadius: 7, padding: '0.5rem 0.75rem', fontSize: '0.8125rem', fontFamily: 'inherit', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                  onFocus={e => (e.target.style.borderColor = '#c8922a')}
                  onBlur={e => (e.target.style.borderColor = '#e8eaef')}
                />
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                style={{ background: saved ? '#10b981' : '#c8922a', color: '#fff', border: 'none', borderRadius: 7, padding: '0.625rem', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', transition: 'background 0.2s' }}
              >
                <Save size={14} />
                {saving ? 'Saving…' : saved ? 'Saved!' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}