import Link from 'next/link'
import { FileText, Users, MessageSquare, Briefcase, ArrowRight } from 'lucide-react'

const LINK_STYLE = {
  display: 'flex', flexDirection: 'column', width: '100%',
  background: '#fff', border: '1px solid #e8eaef', borderRadius: 12,
  padding: '1.5rem', textDecoration: 'none', color: 'inherit',
  transition: 'box-shadow 0.2s, transform 0.2s',
} as React.CSSProperties

const cards = [
  {
    title: 'Loan Inquiries',
    description: 'Short-term loan inquiries submitted through the "Get an Estimate" form.',
    href: '/admin/submissions/loan-inquiries',
    icon: FileText,
    color: '#c8922a',
  },
  {
    title: 'Broker Registrations',
    description: 'New broker partner registration requests and applications.',
    href: '/admin/submissions/brokers',
    icon: Users,
    color: '#3b82f6',
  },
  {
    title: 'Contact Forms',
    description: 'Messages sent via the website contact form.',
    href: '/admin/submissions/contacts',
    icon: MessageSquare,
    color: '#10b981',
  },
  {
    title: 'Job Applications',
    description: 'Careers applications submitted through the careers page.',
    href: '/admin/submissions/careers',
    icon: Briefcase,
    color: '#8b5cf6',
  },
]

export const metadata = { title: 'Submissions' }

export default function SubmissionsPage() {
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.375rem', fontWeight: 700, color: '#0a1628', margin: 0 }}>All Submissions</h1>
        <p style={{ color: '#9aa3b2', fontSize: '0.875rem', margin: '0.25rem 0 0' }}>
          Select a submission type to review and manage records.
        </p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {cards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.href}
              href={card.href}
              className="hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] hover:-translate-y-[2px]"
              style={LINK_STYLE}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 10,
                background: `${card.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1rem',
              }}>
                <Icon size={22} color={card.color} />
              </div>
              <h2 style={{
                fontSize: '1rem', fontWeight: 700, color: '#0a1628', margin: '0 0 0.5rem',
              }}>
                {card.title}
              </h2>
              <p style={{
                fontSize: '0.8125rem', color: '#9aa3b2', lineHeight: 1.6,
                flex: 1, margin: '0 0 1rem',
              }}>
                {card.description}
              </p>
              <span style={{
                fontSize: '0.8125rem', fontWeight: 600, color: card.color,
                display: 'inline-flex', alignItems: 'center', gap: '0.375rem',
              }}>
                View records <ArrowRight size={13} />
              </span>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
