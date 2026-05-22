// app/admin/submissions/brokers/page.tsx
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import SubmissionTableInner from '@/components/admin/SubmissionTableInner'
import { StatusBadge } from '@/components/admin/StatusBadge'

export const metadata = { title: 'Broker Registrations' }
export const dynamic = 'force-dynamic'

export default async function BrokersPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')

  const rows = await prisma.brokerRegistration.findMany({ orderBy: { createdAt: 'desc' } })

  const columns = [
    { key: 'name', label: 'Name', render: (r: any) => <span style={{ fontWeight: 600, color: '#0a1628' }}>{r.firstName} {r.lastName}</span> },
    { key: 'company', label: 'Company', render: (r: any) => <span style={{ fontWeight: 500 }}>{r.company}</span> },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'states', label: 'States', render: (r: any) => <span style={{ color: '#4a5568', fontSize: '0.8125rem' }}>{r.states}</span> },
    { key: 'status', label: 'Status', render: (r: any) => <StatusBadge status={r.status} /> },
    { key: 'createdAt', label: 'Submitted', render: (r: any) => <span style={{ color: '#9aa3b2', whiteSpace: 'nowrap' }}>{new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span> },
  ]

  return (
    <SubmissionTableInner
      title="Broker Registrations"
      subtitle="All broker partner registration requests"
      rows={rows}
      columns={columns}
      detailHref="/admin/submissions/brokers/{id}"
      totalCount={rows.length}
    />
  )
}
