// app/login/page.tsx
import { Suspense } from 'react'
import type { Metadata } from 'next'
import LoginForm from './LoginForm'

export const metadata: Metadata = {
  title: 'Admin Login | Archwest Capital',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
      </div>

      <div className="relative w-full max-w-[420px]">

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.4)] overflow-hidden">
          {/* Card header strip */}
          <div className="bg-[#f7f8fa] border-b border-[#e8eaef] px-8 py-5">
            <h2 className="text-base font-bold text-[#0a1628]">Sign in to your account</h2>
          </div>

          {/* Form area */}
          <div className="px-8 py-7">
            <Suspense fallback={<LoginFormSkeleton />}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

function LoginFormSkeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="h-4 w-24 bg-gray-200 rounded" />
      <div className="h-10 bg-gray-100 rounded-lg" />
      <div className="h-4 w-20 bg-gray-200 rounded mt-2" />
      <div className="h-10 bg-gray-100 rounded-lg" />
      <div className="h-11 bg-gray-200 rounded-lg mt-2" />
    </div>
  )
}