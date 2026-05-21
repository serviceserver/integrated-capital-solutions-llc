// app/admin/submissions/brokers/[id]/page.tsx
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import SubmissionDetail from '@/components/admin/SubmissionDetail'

export const dynamic = 'force-dynamic'

export default async function BrokerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) redirect('/admin/login')

  const { id } = await params
  const record = await prisma.brokerRegistration.findUnique({ where: { id } })
  if (!record) notFound()

  const STATUS_OPTIONS = ['NEW','IN_REVIEW','CONTACTED','QUALIFIED','CLOSED','SPAM']

  const fields = [
    { label: 'First Name',       value: record.firstName },
    { label: 'Last Name',        value: record.lastName },
    { label: 'Email',            value: record.email, type: 'email' as const },
    { label: 'Phone',            value: record.phone, type: 'phone' as const },
    { label: 'Company',          value: record.company },
    { label: 'NMLS ID',          value: record.nmlsId ?? '—' },
    { label: 'States',           value: record.states },
    { label: 'Monthly Volume',   value: record.monthlyVolume ?? '—' },
    { label: 'Products',         value: Array.isArray(record.products) ? record.products.join(', ') : '—' },
    { label: 'Notes',            value: record.notes ?? '—', type: 'text' as const },
  ]

  return (
    <SubmissionDetail
      title="Broker Registration"
      backHref="/admin/submissions/brokers"
      backLabel="Broker Registrations"
      record={{
        ...record,
        createdAt: record.createdAt.toISOString(),
        updatedAt: record.updatedAt.toISOString(),
      }}
      fields={fields}
      patchEndpoint={`/api/submissions/broker/${record.id}`}
      deleteEndpoint={`/api/submissions/broker/${record.id}`}
      deleteRedirect="/admin/submissions/brokers"
      statusOptions={STATUS_OPTIONS}
    />
  )
}
