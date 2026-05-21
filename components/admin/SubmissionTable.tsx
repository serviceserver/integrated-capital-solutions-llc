// components/admin/SubmissionTable.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, Search, Filter } from 'lucide-react';

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

export function StatusBadge({ status }: { status: string }) {
  const [bg, color] = STATUS_COLORS[status] ?? ['#f3f4f6', '#6b7280'];
  return (
    <span style={{ background: bg, color, fontSize: '0.6875rem', fontWeight: 700, padding: '0.2rem 0.625rem', borderRadius: 100, whiteSpace: 'nowrap', letterSpacing: '0.04em' }}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}

interface Column {
  key: string;
  label: string;
  render?: (row: any) => React.ReactNode;
}

interface Props {
  title: string;
  subtitle?: string;
  rows: any[];
  columns: Column[];
  detailHref: (row: any) => string;
  statusOptions: string[];
  totalCount: number;
}

export default function SubmissionTable({
  title, subtitle, rows, columns, detailHref, statusOptions, totalCount,
}: Props) {
  const [search, setSearch] = useState('');

  const filtered = rows.filter(row => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return Object.values(row).some(v => String(v ?? '').toLowerCase().includes(q));
  });

  return (
    <div>
      {/* Page header */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#0a1628', margin: 0 }}>{title}</h1>
        {subtitle && <p style={{ color: '#9aa3b2', fontSize: '0.875rem', margin: '0.25rem 0 0' }}>{subtitle}</p>}
      </div>

      {/* Toolbar */}
      <div style={{ background: '#fff', border: '1px solid #e8eaef', borderRadius: '10px 10px 0 0', padding: '0.875rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f7f8fa', border: '1px solid #e8eaef', borderRadius: 7, padding: '0.4rem 0.875rem', width: 260 }}>
          <Search size={14} color="#9aa3b2" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            style={{ border: 'none', background: 'none', outline: 'none', fontSize: '0.8125rem', color: '#2d3748', width: '100%', fontFamily: 'inherit' }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9aa3b2', fontSize: '0.8125rem' }}>
          <Filter size={13} />
          <span>{totalCount} total</span>
          {search && <span>· {filtered.length} shown</span>}
        </div>
      </div>

      {/* Table */}
      <div style={{ background: '#fff', border: '1px solid #e8eaef', borderTop: 'none', borderRadius: '0 0 10px 10px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ background: '#f7f8fa', borderBottom: '1px solid #e8eaef' }}>
                {columns.map(col => (
                  <th key={col.key} style={{ padding: '0.6rem 1.125rem', textAlign: 'left', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9aa3b2', whiteSpace: 'nowrap' }}>
                    {col.label}
                  </th>
                ))}
                <th style={{ padding: '0.6rem 1.125rem', textAlign: 'left', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9aa3b2' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={row.id ?? i} style={{ borderBottom: '1px solid #f0f2f5', transition: 'background 0.1s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#fafbfc')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  {columns.map(col => (
                    <td key={col.key} style={{ padding: '0.875rem 1.125rem', fontSize: '0.875rem', color: '#2d3748', maxWidth: 220 }}>
                      {col.render ? col.render(row) : (
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                          {row[col.key] ?? '—'}
                        </span>
                      )}
                    </td>
                  ))}
                  <td style={{ padding: '0.875rem 1.125rem' }}>
                    <Link href={detailHref(row)} style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#c8922a', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 1} style={{ padding: '3rem', textAlign: 'center', color: '#9aa3b2', fontSize: '0.875rem' }}>
                    {search ? 'No results match your search.' : 'No submissions yet.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}