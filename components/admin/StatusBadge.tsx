// components/admin/StatusBadge.tsx
const STATUS_COLORS: Record<string, [string, string]> = {
  NEW:          ['#dbeafe', '#1d4ed8'],
  IN_REVIEW:    ['#fef3c7', '#b45309'],
  CONTACTED:    ['#d1fae5', '#065f46'],
  QUALIFIED:    ['#ede9fe', '#6d28d9'],
  CLOSED:       ['#f3f4f6', '#6b7280'],
  SPAM:         ['#fee2e2', '#b91c1c'],
  REVIEWING:    ['#fef3c7', '#b45309'],
  PHONE_SCREEN: ['#dbeafe', '#1d4ed8'],
  INTERVIEW:    ['#ede9fe', '#6d28d9'],
  OFFER:        ['#d1fae5', '#065f46'],
  HIRED:        ['#d1fae5', '#065f46'],
  REJECTED:     ['#fee2e2', '#b91c1c'],
};

export function StatusBadge({ status }: { status: string }) {
  const [bg, color] = STATUS_COLORS[status] ?? ['#f3f4f6', '#6b7280'];
  return (
    <span style={{ background: bg, color, fontSize: '0.6875rem', fontWeight: 700, padding: '0.2rem 0.625rem', borderRadius: 100, whiteSpace: 'nowrap', letterSpacing: '0.04em' }}>
      {status.replace(/_/g, ' ')}
    </span>
  );
}
