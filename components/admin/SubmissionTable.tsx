// components/admin/SubmissionTable.tsx
// Client Component wrapper: adds search + filter toolbar around SubmissionTableInner.
'use client';
import { useState } from 'react';
import SubmissionTableInner from './SubmissionTableInner';
import { StatusBadge } from './StatusBadge';
import { Search, Filter } from 'lucide-react';

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
export { StatusBadge } from './StatusBadge';

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
  detailHref: string;   // URL pattern with {id} placeholder
  totalCount: number;
}

export default function SubmissionTable({ title, subtitle, rows, columns, detailHref, totalCount }: Props) {
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

      {/* Server-rendered table */}
      <SubmissionTableInner
        rows={filtered}
        columns={columns}
        detailHref={detailHref}
        totalCount={totalCount}
      />
    </div>
  );
}
