import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import SubmissionTableInner from '@/components/admin/SubmissionTableInner'
import { StatusBadge } from '@/components/admin/StatusBadge'

export const metadata = { title: 'Contact Forms' }
export const dynamic = 'force-dynamic'

export default async function ContactsPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')

  const rows = await prisma.contactSubmission.findMany({ orderBy: { createdAt: 'desc' } })

  const columns = [
    { key: 'name', label: 'Name', render: (r: any) => <span style={{ fontWeight: 600, color: '#0a1628' }}>{r.firstName} {r.lastName}</span> },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'company', label: 'Company', render: (r: any) => <span style={{ color: '#4a5568' }}>{r.company ?? '—'}</span> },
    { key: 'message', label: 'Message', render: (r: any) => <span style={{ color: '#9aa3b2', fontSize: '0.8125rem' }}>{r.message.slice(0, 60)}{r.message.length > 60 ? '…' : ''}</span> },
    { key: 'status', label: 'Status', render: (r: any) => <StatusBadge status={r.status} /> },
    { key: 'createdAt', label: 'Submitted', render: (r: any) => <span style={{ color: '#9aa3b2', whiteSpace: 'nowrap' }}>{new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span> },
  ]

  return (
    <SubmissionTableInner
      title="Contact Form Submissions"
      subtitle="All messages submitted through the website contact form"
      rows={rows}
      columns={columns}
      detailHref="/admin/submissions/contacts/{id}"
      totalCount={rows.length}
    />
  )
}
