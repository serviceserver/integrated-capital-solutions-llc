// app/admin/submissions/loan-inquiries/[id]/page.tsx
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import SubmissionDetail from '@/components/admin/SubmissionDetail'

export const dynamic = 'force-dynamic'

const LOAN_TYPE_LABELS: Record<string, string> = {
  GROUND_UP: 'Ground Up Construction', FIX_AND_FLIP: 'Fix & Flip',
  DSCR_RENTAL: 'DSCR Rental', BRIDGE_LOAN: 'Bridge Loan',
}

export default async function LoanInquiryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) redirect('/admin/login')

  const { id } = await params
  const record = await prisma.loanInquiry.findUnique({ where: { id } })
  if (!record) notFound()

  const fields = [
    { label: 'First Name',       value: record.firstName },
    { label: 'Last Name',        value: record.lastName },
    { label: 'Email',            value: record.email, type: 'email' as const },
    { label: 'Phone',            value: record.phone, type: 'phone' as const },
    { label: 'Loan Type',        value: LOAN_TYPE_LABELS[record.loanType] ?? record.loanType },
    { label: 'Loan Amount',      value: record.loanAmount },
    { label: 'Property Address', value: record.propertyAddress ?? '—' },
    { label: 'Experience',       value: record.experience ?? '—' },
    { label: 'Notes',            value: record.notes ?? '—', type: 'text' as const },
  ]

  return (
    <SubmissionDetail
      title="Loan Inquiry"
      backHref="/admin/submissions/loan-inquiries"
      backLabel="Loan Inquiries"
      record={{ ...record, createdAt: record.createdAt.toISOString(), updatedAt: record.updatedAt.toISOString() }}
      fields={fields}
      patchEndpoint={`/api/submissions/loan-inquiry/${record.id}`}
      deleteEndpoint={`/api/submissions/loan-inquiry/${record.id}`}
      deleteRedirect="/admin/submissions/loan-inquiries"
      statusOptions={['NEW','IN_REVIEW','CONTACTED','QUALIFIED','CLOSED','SPAM']}
    />
  )
}