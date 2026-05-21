// app/api/auth/signout/route.ts
import { signOut } from '@/lib/auth'

// Server Action handler — call signOut directly so the session cookie is cleared
export async function POST() {
  await signOut({ redirectTo: '/admin/login' })
}

// Support GET for direct navigation / middleware fallback
export async function GET() {
  await signOut({ redirectTo: '/admin/login' })
}
