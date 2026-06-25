// components/admin/AdminHeader.tsx
'use client';
import { useEffect, useRef } from 'react'
import { Bell, Menu, X, Search } from 'lucide-react'

interface Props {
  user?: { name?: string | null; email?: string | null; image?: string | null }
  isMobile?: boolean
  onMenuClick?: () => void
  mobileOpen?: boolean
}

export default function AdminHeader({ user, isMobile, onMenuClick, mobileOpen }: Props) {
  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.[0].toUpperCase() ?? 'A'

  // Lock body scroll when mobile menu is open
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [mobileOpen])

  return (
    <div style={{
      height: 60, background: '#fff', borderBottom: '1px solid #e8eaef',
      display: 'flex', alignItems: 'center',
      padding: '0 1.25rem',
      flexShrink: 0, position: 'sticky', top: '4rem', zIndex: 20,
    }}>
      {/* ── Hamburger / close toggle (mobile only) ── */}
      {isMobile && (
        <button
          onClick={onMenuClick}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: 38, height: 38, flexShrink: 0,
            background: 'transparent', border: '1.5px solid #e8eaef',
            borderRadius: 8, cursor: 'pointer', marginRight: '0.75rem',
            color: '#0a1628',
          }}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      )}

      {/* ── Search ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.5rem',
        background: '#f7f8fa', border: '1px solid #e8eaef', borderRadius: 7,
        padding: '0.4rem 0.875rem',
        width: isMobile ? '100%' : 260, flexShrink: isMobile ? 1 : 0,
      }}>
        <Search size={14} color="#9aa3b2" />
        <input
          placeholder="Search submissions..."
          style={{
            border: 'none', background: 'none', outline: 'none',
            fontSize: '0.8125rem', color: '#2d3748',
            width: '100%', fontFamily: 'inherit',
          }}
        />
      </div>

      {/* ── Right side ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0, marginLeft: 'auto' }}>
        <button style={{
          width: 34, height: 34, borderRadius: 7, border: '1px solid #e8eaef',
          background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <Bell size={15} color="#9aa3b2" />
        </button>

        {/* Hide name/email text on mobile; keep avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%', background: '#c8922a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 700 }}>{initials}</span>
          </div>
          {!isMobile && (
            <div style={{ overflow: 'hidden', maxWidth: 160 }}>
              <p style={{
                fontSize: '0.8125rem', fontWeight: 600, color: '#0a1628',
                margin: 0, lineHeight: 1.2,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>{user?.name ?? 'Admin'}</p>
              <p style={{
                fontSize: '0.6875rem', color: '#9aa3b2', margin: 0,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>{user?.email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
