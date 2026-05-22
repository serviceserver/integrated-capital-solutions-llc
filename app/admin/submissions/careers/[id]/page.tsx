// app/admin/submissions/careers/[id]/page.tsx
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'
import { redirect, notFound } from 'next/navigation'
import SubmissionDetail from '@/components/admin/SubmissionDetail'

export const dynamic = 'force-dynamic'

export default async function CareerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()
  if (!session) redirect('/admin/login')

  const { id } = await params
  const record = await prisma.jobApplication.findUnique({ where: { id } })
  if (!record) notFound()

  const fields = [
    { label: 'First Name', value: record.firstName },
    { label: 'Last Name',  value: record.lastName },
    { label: 'Email',      value: record.email,  type: 'email' as const },
    { label: 'Phone',      value: record.phone ?? '—', type: 'phone' as const },
    { label: 'Position',   value: record.position },
    { label: 'About',      value: record.aboutText ?? '—', type: 'text' as const },
    { label: 'Resume',     value: record.resumeName ?? '—', type: 'default' as const },
  ]

  return (
    <SubmissionDetail
      title="Job Application"
      backHref="/admin/submissions/careers"
      backLabel="Job Applications"
      record={{ ...record, createdAt: record.createdAt.toISOString(), updatedAt: record.updatedAt.toISOString() }}
      fields={fields}
      patchEndpoint={`/api/submissions/careers/${record.id}`}
      deleteEndpoint={`/api/submissions/careers/${record.id}`}
      deleteRedirect="/admin/submissions/careers"
      statusOptions={['NEW','REVIEWING','PHONE_SCREEN','INTERVIEW','OFFER','HIRED','REJECTED']}
    />
  )
}
