// app/admin/page.tsx
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { FileText, Users, MessageSquare, Briefcase, Clock } from 'lucide-react'

export const metadata = { title: 'Dashboard' }
export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
  const session = await auth()
  if (!session) redirect('/admin/login')

  const [
    loanTotal, loanNew,
    brokerTotal, brokerNew,
    contactTotal, contactNew,
    careerTotal, careerNew,
    recentLoans, recentBrokers, recentContacts, recentCareers,
  ] = await Promise.all([
    prisma.loanInquiry.count(),
    prisma.loanInquiry.count({ where: { status: 'NEW' } }),
    prisma.brokerRegistration.count(),
    prisma.brokerRegistration.count({ where: { status: 'NEW' } }),
    prisma.contactSubmission.count(),
    prisma.contactSubmission.count({ where: { status: 'NEW' } }),
    prisma.jobApplication.count(),
    prisma.jobApplication.count({ where: { status: 'NEW' } }),
    prisma.loanInquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.brokerRegistration.findMany({ orderBy: { createdAt: 'desc' }, take: 3 }),
    prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' }, take: 3 }),
    prisma.jobApplication.findMany({ orderBy: { createdAt: 'desc' }, take: 3 }),
  ])

  const stats = [
    { label: 'Loan Inquiries',       total: loanTotal,    newCount: loanNew,    icon: FileText,      href: '/admin/submissions/loan-inquiries', color: '#3b82f6' },
    { label: 'Broker Registrations', total: brokerTotal,  newCount: brokerNew,  icon: Users,         href: '/admin/submissions/brokers',        color: '#8b5cf6' },
    { label: 'Contact Forms',        total: contactTotal, newCount: contactNew, icon: MessageSquare, href: '/admin/submissions/contacts',        color: '#10b981' },
    { label: 'Job Applications',     total: careerTotal,  newCount: careerNew,  icon: Briefcase,     href: '/admin/submissions/careers',         color: '#f59e0b' },
  ]

  const allRecent = [
    ...recentLoans.map(r => ({ type: 'Loan Inquiry', name: `${r.firstName} ${r.lastName}`, sub: r.loanType.replace(/_/g,' '), date: r.createdAt, status: r.status, href: `/admin/submissions/loan-inquiries/${r.id}` })),
    ...recentBrokers.map(r => ({ type: 'Broker', name: `${r.firstName} ${r.lastName}`, sub: r.company, date: r.createdAt, status: r.status, href: `/admin/submissions/brokers/${r.id}` })),
    ...recentContacts.map(r => ({ type: 'Contact', name: `${r.firstName} ${r.lastName}`, sub: r.email, date: r.createdAt, status: r.status, href: `/admin/submissions/contacts/${r.id}` })),
    ...recentCareers.map(r => ({ type: 'Application', name: `${r.firstName} ${r.lastName}`, sub: r.position, date: r.createdAt, status: r.status, href: `/admin/submissions/careers/${r.id}` })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime()).slice(0, 10)

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#0a1628', margin: 0 }}>Dashboard</h1>
        <p style={{ color: '#9aa3b2', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          Welcome back, {session.user?.name ?? 'Admin'}
        </p>
      </div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        {stats.map(s => {
          const Icon = s.icon
          return (
            <Link key={s.href} href={s.href} style={{ textDecoration: 'none' }}>
              <div style={{ background: '#fff', border: '1px solid #e8eaef', borderRadius: 10, padding: '1.25rem 1.5rem', transition: 'box-shadow 0.15s', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.875rem' }}>
                  <div style={{ width: 38, height: 38, borderRadius: 9, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={18} color={s.color} />
                  </div>
                  {s.newCount > 0 && (
                    <span style={{ background: '#ef4444', color: '#fff', fontSize: '0.6875rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: 100 }}>
                      {s.newCount} new
                    </span>
                  )}
                </div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0a1628', lineHeight: 1 }}>{s.total}</div>
                <div style={{ fontSize: '0.8125rem', color: '#9aa3b2', marginTop: '0.3rem' }}>{s.label}</div>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Recent activity */}
      <div style={{ background: '#fff', border: '1px solid #e8eaef', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '1.125rem 1.5rem', borderBottom: '1px solid #e8eaef', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={15} color="#c8922a" />
          <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: '#0a1628', margin: 0 }}>Recent Activity</h2>
        </div>
        {/* Desktop table */}
        <div style={{ overflowX: 'auto' }} className="admin-table-container">
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr style={{ background: '#f7f8fa' }}>
                {['Name', 'Type', 'Details', 'Status', 'Date'].map(h => (
                  <th key={h} style={{ padding: '0.625rem 1.25rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9aa3b2' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {allRecent.map((r, i) => (
                <tr key={i} style={{ borderTop: '1px solid #f0f2f5' }}>
                  <td style={{ padding: '0.875rem 1.25rem' }}>
                    <Link href={r.href} style={{ fontWeight: 600, color: '#0a1628', fontSize: '0.875rem', textDecoration: 'none' }}>
                      {r.name}
                    </Link>
                  </td>
                  <td style={{ padding: '0.875rem 1.25rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#4a5568' }}>{r.type}</span>
                  </td>
                  <td style={{ padding: '0.875rem 1.25rem', color: '#9aa3b2', fontSize: '0.8125rem' }}>{r.sub}</td>
                  <td style={{ padding: '0.875rem 1.25rem' }}>
                    <StatusBadge status={r.status} />
                  </td>
                  <td style={{ padding: '0.875rem 1.25rem', color: '#9aa3b2', fontSize: '0.8125rem', whiteSpace: 'nowrap' }}>
                    {new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                </tr>
              ))}
              {allRecent.length === 0 && (
                <tr>
                  <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#9aa3b2', fontSize: '0.875rem' }}>
                    No submissions yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Mobile cards */}
        <div style={{ display: 'none' }} className="mobile-cards">
          {allRecent.map((r, i) => (
            <div key={i} style={{ padding: '1rem', borderBottom: '1px solid #f0f2f5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <Link href={r.href} style={{ fontWeight: 600, color: '#0a1628', fontSize: '0.875rem', textDecoration: 'none' }}>
                    {r.name}
                  </Link>
                </div>
                <StatusBadge status={r.status} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', fontSize: '0.75rem' }}>
                <span style={{ color: '#9aa3b2' }}><strong style={{ color: '#9aa3b2', fontWeight: 600 }}>Type:</strong> {r.type}</span>
                <span style={{ color: '#9aa3b2' }}><strong style={{ color: '#9aa3b2', fontWeight: 600 }}>Details:</strong> {r.sub}</span>
                <span style={{ color: '#9aa3b2' }}><strong style={{ color: '#9aa3b2', fontWeight: 600 }}>Date:</strong> {new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          ))}
          {allRecent.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#9aa3b2', fontSize: '0.875rem' }}>
              No submissions yet
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, [string, string]> = {
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
  }
  const [bg, color] = map[status] ?? ['#f3f4f6', '#6b7280']
  return (
    <span style={{ background: bg, color, fontSize: '0.6875rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: 100, whiteSpace: 'nowrap', letterSpacing: '0.05em' }}>
      {status.replace(/_/g, ' ')}
    </span>
  )
}