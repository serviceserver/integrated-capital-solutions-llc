// components/admin/AdminHeader.tsx
'use client';
import { Bell, Search } from 'lucide-react';

interface Props {
  user?: { name?: string | null; email?: string | null; image?: string | null }
}

export default function AdminHeader({ user }: Props) {
  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.[0].toUpperCase() ?? 'A';

  return (
    <header style={{
      height: 60, background: '#fff', borderBottom: '1px solid #e8eaef',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 1.75rem', flexShrink: 0, position: 'sticky', top: 0, zIndex: 20,
    }}>
      {/* Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f7f8fa', border: '1px solid #e8eaef', borderRadius: 7, padding: '0.4rem 0.875rem', width: 260 }}>
        <Search size={14} color="#9aa3b2" />
        <input placeholder="Search submissions..." style={{ border: 'none', background: 'none', outline: 'none', fontSize: '0.8125rem', color: '#2d3748', width: '100%', fontFamily: 'inherit' }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Bell */}
        <button style={{ width: 34, height: 34, borderRadius: 7, border: '1px solid #e8eaef', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <Bell size={15} color="#9aa3b2" />
        </button>
        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#c8922a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>{initials}</span>
          </div>
          <div>
            <p style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#0a1628', margin: 0, lineHeight: 1.2 }}>{user?.name ?? 'Admin'}</p>
            <p style={{ fontSize: '0.6875rem', color: '#9aa3b2', margin: 0 }}>{user?.email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}