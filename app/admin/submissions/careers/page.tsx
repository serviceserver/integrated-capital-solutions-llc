// app/admin/submissions/careers/page.tsx
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import SubmissionTableInner from '@/components/admin/SubmissionTableInner'
import { StatusBadge } from '@/components/admin/StatusBadge'

export const metadata = { title: 'Job Applications' }
export const dynamic = 'force-dynamic'

export default async function CareersPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')

  const rows = await prisma.jobApplication.findMany({ orderBy: { createdAt: 'desc' } })

  // Careers use ApplicationStatus — need a separate map
  const APP_COLORS: Record<string, [string, string]> = {
    REVIEWING:    ['#fef3c7', '#b45309'],
    PHONE_SCREEN: ['#dbeafe', '#1d4ed8'],
    INTERVIEW:    ['#ede9fe', '#6d28d9'],
    OFFER:        ['#d1fae5', '#065f46'],
    HIRED:        ['#d1fae5', '#065f46'],
    REJECTED:     ['#fee2e2', '#b91c1c'],
    NEW:          ['#dbeafe', '#1d4ed8'],
  }

  function AppBadge({ status }: { status: string }) {
    const [bg, color] = APP_COLORS[status] ?? ['#f3f4f6', '#6b7280']
    return (
      <span style={{ background: bg, color, fontSize: '0.6875rem', fontWeight: 700, padding: '0.2rem 0.625rem', borderRadius: 100, whiteSpace: 'nowrap', letterSpacing: '0.04em' }}>
        {status.replace(/_/g, ' ')}
      </span>
    )
  }

  const columns = [
    { key: 'name', label: 'Name', render: (r: any) => <span style={{ fontWeight: 600, color: '#0a1628' }}>{r.firstName} {r.lastName}</span> },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'position', label: 'Position', render: (r: any) => <span style={{ fontWeight: 500, color: '#0a1628' }}>{r.position}</span> },
    { key: 'status', label: 'Status', render: (r: any) => <AppBadge status={r.status} /> },
    { key: 'createdAt', label: 'Applied', render: (r: any) => <span style={{ color: '#9aa3b2', whiteSpace: 'nowrap' }}>{new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span> },
  ]

  return (
    <SubmissionTableInner
      title="Job Applications"
      subtitle="Careers applications submitted through the website"
      rows={rows}
      columns={columns}
      detailHref="/admin/submissions/careers/{id}"
      totalCount={rows.length}
    />
  )
}
