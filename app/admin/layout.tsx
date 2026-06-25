// app/admin/layout.tsx
'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import AdminSidebar from '@/components/admin/AdminSidebar'
import AdminHeader from '@/components/admin/AdminHeader'

const MOBILE_BREAKPOINT = 768
const SIDEBAR_WIDTH = 240

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    function check() {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      if (window.innerWidth < MOBILE_BREAKPOINT) setMobileOpen(false)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const sidebarStyle: React.CSSProperties = isMobile
    ? {
        position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 60,
        width: SIDEBAR_WIDTH,
        transition: 'transform 0.25s ease',
        transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
        pointerEvents: mobileOpen ? 'auto' : 'none',
      }
    : {
        position: 'sticky', top: 0,
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
      }

  const mainStyle: React.CSSProperties = isMobile
    ? {
        flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0,
        paddingLeft: 0,
      }
    : {
        flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0,
        paddingLeft: 0,
      }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f7f8fa' }}>
      {/* Mobile back-drop */}
      {isMobile && mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 55,
            background: 'rgba(0,0,0,0.45)',
            transition: 'opacity 0.2s',
          }}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - only show if not on login page */}
      {!isLoginPage && (
        <AdminSidebar
          style={sidebarStyle}
          mobileOpen={mobileOpen}
          onClose={() => setMobileOpen(false)}
        />
      )}

      {/* Right column */}
      <div style={mainStyle}>
        {/* Header - only show if not on login page */}
        {!isLoginPage && (
          <AdminHeader
            isMobile={isMobile}
            onMenuClick={() => setMobileOpen(v => !v)}
            mobileOpen={mobileOpen}
          />
        )}
        <main style={{ flex: 1, padding: isMobile ? '1rem' : '2rem', overflowY: 'auto', marginTop: isLoginPage ? 0 : '4rem' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
