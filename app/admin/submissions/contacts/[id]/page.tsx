// app/admin/submissions/contacts/[id]/page.tsx
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import SubmissionDetail from '@/components/admin/SubmissionDetail'

export const dynamic = 'force-dynamic'

export default async function ContactDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) redirect('/admin/login')

  const { id } = await params
  const record = await prisma.contactSubmission.findUnique({ where: { id } })
  if (!record) notFound()

  const fields = [
    { label: 'First Name', value: record.firstName },
    { label: 'Last Name',  value: record.lastName },
    { label: 'Email',      value: record.email,  type: 'email' as const },
    { label: 'Phone',      value: record.phone,  type: 'phone' as const },
    { label: 'Company',    value: record.company ?? '—' },
    { label: 'Message',    value: record.message, type: 'text' as const },
  ]

  return (
    <SubmissionDetail
      title="Contact Submission"
      backHref="/admin/submissions/contacts"
      backLabel="Contact Forms"
      record={{ ...record, createdAt: record.createdAt.toISOString(), updatedAt: record.updatedAt.toISOString() }}
      fields={fields}
      patchEndpoint={`/api/submissions/contact/${record.id}`}
      deleteEndpoint={`/api/submissions/contact/${record.id}`}
      deleteRedirect="/admin/submissions/contacts"
      statusOptions={['NEW','IN_REVIEW','CONTACTED','CLOSED','SPAM']}
    />
  )
}
