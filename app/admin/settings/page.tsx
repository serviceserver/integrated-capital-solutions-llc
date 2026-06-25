// app/admin/settings/page.tsx
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import ContactContentForm from './ContactContentForm'

export const metadata = { title: 'Settings' }
export const dynamic = 'force-dynamic'

export default async function AdminSettingsPage() {
  const session = await auth()
  if (!session) redirect('/admin/login')

  const contents = await prisma.siteContent.findMany()
  const initial: Record<string, string> = {}
  for (const c of contents) initial[c.key] = c.value

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#0a1628', margin: 0 }}>Settings</h1>
        <p style={{ color: '#9aa3b2', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          Manage your admin account and preferences
        </p>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e8eaef', borderRadius: 10, padding: '2rem', marginBottom: '1.5rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0a1628', margin: '0 0 0.25rem' }}>Account Information</h2>
          <p style={{ color: '#9aa3b2', fontSize: '0.8125rem', margin: 0 }}>Your admin profile details</p>
        </div>

        <div style={{ display: 'grid', gap: '1rem', maxWidth: 480 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#4a5568', marginBottom: '0.375rem' }}>Name</label>
            <div style={{ padding: '0.625rem 0.875rem', background: '#f7f8fa', border: '1px solid #e8eaef', borderRadius: 6, fontSize: '0.875rem', color: '#0a1628' }}>
              {session.user?.name ?? 'Admin'}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#4a5568', marginBottom: '0.375rem' }}>Email</label>
            <div style={{ padding: '0.625rem 0.875rem', background: '#f7f8fa', border: '1px solid #e8eaef', borderRadius: 6, fontSize: '0.875rem', color: '#0a1628' }}>
              {session.user?.email ?? ''}
            </div>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#4a5568', marginBottom: '0.375rem' }}>Role</label>
            <div style={{ padding: '0.625rem 0.875rem', background: '#f7f8fa', border: '1px solid #e8eaef', borderRadius: 6, fontSize: '0.875rem', color: '#0a1628' }}>
              {(session.user as any)?.role ?? 'ADMIN'}
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #e8eaef', borderRadius: 10, padding: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#0a1628', margin: '0 0 0.25rem' }}>Contact Page Content</h2>
          <p style={{ color: '#9aa3b2', fontSize: '0.8125rem', margin: 0 }}>Update the information displayed on the public Contact page</p>
        </div>

        <ContactContentForm initial={initial} />
      </div>
    </div>
  )
}
