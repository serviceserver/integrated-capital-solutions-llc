// components/admin/SubmissionTableInner.tsx
// Pure Server Component: rows and column markup only — no state, no hooks.
import Link from 'next/link'
import { StatusBadge } from './StatusBadge'

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
  detailHref: string;    // URL pattern with {id} placeholder
  totalCount: number;
}

function resolveDetailHref(pattern: string, row: any) {
  return pattern.replace('{id}', row.id)
}

export default function SubmissionTableInner({
  title, subtitle, rows, columns, detailHref, totalCount,
}: Props) {
  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#0a1628', margin: 0 }}>{title}</h1>
        {subtitle && <p style={{ color: '#9aa3b2', fontSize: '0.875rem', margin: '0.25rem 0 0' }}>{subtitle}</p>}
      </div>
      <div style={{ background: '#fff', border: '1px solid #e8eaef', borderRadius: '10px', overflow: 'hidden' }}>
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
              {rows.map((row, i) => (
                <tr key={row.id ?? i} style={{ borderBottom: '1px solid #f0f2f5' }}>
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
                    <Link href={resolveDetailHref(detailHref, row)} style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#c8922a', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={columns.length + 1} style={{ padding: '3rem', textAlign: 'center', color: '#9aa3b2', fontSize: '0.875rem' }}>
                    No submissions yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
