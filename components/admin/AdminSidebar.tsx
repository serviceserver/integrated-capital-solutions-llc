// components/admin/AdminSidebar.tsx
// Position style is always injected by AdminLayout via the passed wrapper prop.
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, FileText, Users, MessageSquare, Briefcase,
  ChevronRight, Settings, LogOut, X,
} from 'lucide-react';

const nav = [
  { label: 'Dashboard',       href: '/admin',                             icon: LayoutDashboard },
  { label: 'Loan Inquiries',  href: '/admin/submissions/loan-inquiries',  icon: FileText },
  { label: 'Broker Registrations', href: '/admin/submissions/brokers',   icon: Users },
  { label: 'Contact Forms',   href: '/admin/submissions/contacts',        icon: MessageSquare },
  { label: 'Job Applications',href: '/admin/submissions/careers',         icon: Briefcase },
];

// Panel markup - no layout/positioning of its own.
function SidebarPanel({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%',marginTop: '4rem', background: '#0a1628', color: '#fff' }}>
      {/* Logo */}
      <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 28, height: 28, borderRadius: 5, background: '#c8922a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#fff', fontWeight: 900, fontSize: 13 }}>A</span>
            </div>
            <div>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 13, letterSpacing: '-0.2px' }}>Integrated Capital Solutions</span>
              <span style={{ color: '#c8922a', fontWeight: 300, fontSize: 13 }}> CAPITAL</span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32,
              background: 'rgba(255,255,255,0.08)', border: 'none', borderRadius: 6,
              color: 'rgba(255,255,255,0.65)', cursor: 'pointer' }}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 10 }}>Admin Dashboard</p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '1rem 0', overflowY: 'auto' }}>
        {nav.map(item => {
          const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} onClick={onClose} style={{
              display: 'flex', alignItems: 'center', gap: '0.625rem',
              padding: '0.625rem 1.25rem', margin: '0.125rem 0.5rem',
              borderRadius: 6, textDecoration: 'none', transition: 'background 0.15s',
              background: active ? 'rgba(200,146,42,0.15)' : 'transparent',
              color: active ? '#c8922a' : 'rgba(255,255,255,0.6)',
            }}>
              <Icon size={16} />
              <span style={{ fontSize: '0.8125rem', fontWeight: active ? 600 : 400 }}>{item.label}</span>
              {active && <ChevronRight size={12} style={{ marginLeft: 'auto' }} />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '0.75rem 0' }}>
        <Link href="/admin/settings" onClick={onClose} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', padding: '0.625rem 1.25rem', margin: '0 0.5rem', borderRadius: 6, color: 'rgba(255,255,255,0.45)', textDecoration: 'none', fontSize: '0.8125rem' }}>
          <Settings size={15} /> Settings
        </Link>
        <form action="/api/auth/signout" method="POST">
          <button type="submit" style={{
            display: 'flex', width: '100%',
            alignItems: 'center', gap: '0.625rem', padding: '0.625rem 1.25rem', margin: '0 0.5rem',
            borderRadius: 6, color: 'rgba(255,255,255,0.45)', background: 'none',
            border: 'none', cursor: 'pointer', fontSize: '0.8125rem', fontFamily: 'inherit',
          }}>
            <LogOut size={15} /> Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}

interface Props {
  // Injected by AdminLayout — controls the fixed positioning styles.
  style: React.CSSProperties;
  // Present when this sidebar is rendering as an off-screen mobile drawer.
  mobileOpen?: boolean;
  // Called by the panel "close" button or Link onClick.
  onClose?: () => void;
}

export default function AdminSidebar({ style, mobileOpen, onClose }: Props) {
  return (
    <aside style={{ ...style, display: 'flex', flexDirection: 'column', flexShrink: 0, height: '100vh' }}>
      <SidebarPanel onClose={onClose ?? (() => {})} />
    </aside>
  );
}
