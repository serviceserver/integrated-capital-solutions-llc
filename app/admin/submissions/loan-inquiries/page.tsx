// app/admin/submissions/loan-inquiries/page.tsx
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import SubmissionTable from '@/components/admin/SubmissionTable'
import { StatusBadge } from '@/components/admin/SubmissionTable'

export const metadata = { title: 'Loan Inquiries' }
export const dynamic = 'force-dynamic'

const LOAN_TYPE_LABELS: Record<string, string> = {
  GROUND_UP: 'Ground Up', FIX_AND_FLIP: 'Fix & Flip',
  DSCR_RENTAL: 'DSCR Rental', BRIDGE_LOAN: 'Bridge Loan',
}

export default async function LoanInquiriesPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')

  const rows = await prisma.loanInquiry.findMany({ orderBy: { createdAt: 'desc' } })

  const columns = [
    {
      key: 'name', label: 'Name',
      render: (r: any) => <span style={{ fontWeight: 600, color: '#0a1628' }}>{r.firstName} {r.lastName}</span>,
    },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    {
      key: 'loanType', label: 'Loan Type',
      render: (r: any) => <span style={{ fontWeight: 500, color: '#0a1628' }}>{LOAN_TYPE_LABELS[r.loanType] ?? r.loanType}</span>,
    },
    { key: 'loanAmount', label: 'Amount' },
    {
      key: 'status', label: 'Status',
      render: (r: any) => <StatusBadge status={r.status} />,
    },
    {
      key: 'createdAt', label: 'Submitted',
      render: (r: any) => <span style={{ color: '#9aa3b2', whiteSpace: 'nowrap' }}>{new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>,
    },
  ]

  return (
    <SubmissionTable
      title="Loan Inquiries"
      subtitle="All loan estimate requests submitted through the website"
      rows={rows}
      columns={columns}
      detailHref={r => `/admin/submissions/loan-inquiries/${r.id}`}
      statusOptions={['NEW','IN_REVIEW','CONTACTED','QUALIFIED','CLOSED','SPAM']}
      totalCount={rows.length}
    />
  )
}