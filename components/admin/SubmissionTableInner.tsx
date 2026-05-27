// components/admin/SubmissionTableInner.tsx
// Pure Server Component: rows and column markup only — no state, no hooks.
import Link from 'next/link'

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
      {/* Desktop table */}
      <div style={{ overflowX: 'auto' }} className="admin-table-container">
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
      {/* Mobile cards */}
      <div style={{ display: 'none' }} className="mobile-cards">
        {rows.map((row, i) => (
          <div key={row.id ?? i} style={{ background: '#fff', border: '1px solid #e8eaef', borderRadius: 10, padding: '1rem', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
              <div>
                {columns.find(c => c.key === 'name')?.render ? columns.find(c => c.key === 'name')!.render!(row) : <span style={{ fontWeight: 600, color: '#0a1628' }}>{row.firstName} {row.lastName}</span>}
              </div>
              <Link href={resolveDetailHref(detailHref, row)} style={{ fontSize: '0.75rem', fontWeight: 600, color: '#c8922a', textDecoration: 'none', whiteSpace: 'nowrap' }}>
                View →
              </Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {columns.filter(c => c.key !== 'name' && c.key !== 'status').map(col => (
                <div key={col.key} style={{ display: 'flex', fontSize: '0.75rem' }}>
                  <span style={{ color: '#9aa3b2', fontWeight: 600, minWidth: 90, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.6875rem' }}>{col.label}:</span>
                  <span style={{ color: '#2d3748', flex: 1, marginLeft: '0.5rem' }}>
                    {col.render ? col.render(row) : (row[col.key] ?? '—')}
                  </span>
                </div>
              ))}
              {columns.find(c => c.key === 'status')?.render && (
                <div style={{ display: 'flex', fontSize: '0.75rem', alignItems: 'center', gap: '0.375rem' }}>
                  <span style={{ color: '#9aa3b2', fontWeight: 600, minWidth: 90, textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.6875rem' }}>Status:</span>
                  {columns.find(c => c.key === 'status')!.render!(row)}
                </div>
              )}
            </div>
          </div>
        ))}
        {rows.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#9aa3b2', fontSize: '0.875rem' }}>
            No submissions yet.
          </div>
        )}
      </div>
    </div>
  )
}
