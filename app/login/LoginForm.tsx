// app/admin/login/LoginForm.tsx
'use client'
import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Eye, EyeOff, LogIn, AlertCircle, Loader2 } from 'lucide-react'

const inputBase =
  'w-full border-[1.5px] border-[#e8eaef] rounded-lg px-3.5 py-2.5 text-sm outline-none transition-colors duration-150 focus:border-[#c8922a] focus:ring-2 focus:ring-[#c8922a]/15 font-[family-name:inherit] bg-white'

export default function LoginForm() {
  const router        = useRouter()
  const searchParams  = useSearchParams()
  const callbackUrl   = searchParams.get('callbackUrl') ?? '/admin'

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPw,   setShowPw]   = useState(false)
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    if (res?.error) {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
      return
    }

    router.push(callbackUrl)
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">

      {/* Error banner */}
      {error && (
        <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          <AlertCircle size={15} className="text-red-500 shrink-0" />
          <span className="text-red-600 text-sm">{error}</span>
        </div>
      )}

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[0.8125rem] font-semibold text-[#0a1628]">
          Email Address
        </label>
        <input
          type="email"
          autoComplete="email"
          required
          placeholder="integratedcapitalsolutionsllc.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={inputBase}
          disabled={loading}
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label className="text-[0.8125rem] font-semibold text-[#0a1628]">
            Password
          </label>
        </div>
        <div className="relative">
          <input
            type={showPw ? 'text' : 'password'}
            autoComplete="current-password"
            required
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={`${inputBase} pr-11`}
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPw(p => !p)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa3b2] hover:text-[#4a5568] transition-colors p-0.5"
            tabIndex={-1}
            aria-label={showPw ? 'Hide password' : 'Show password'}
          >
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !email || !password}
        className="flex items-center justify-center gap-2 w-full bg-[#c8922a] hover:bg-[#e8a83a] disabled:bg-[#c8922a]/50 disabled:cursor-not-allowed text-white font-semibold text-sm rounded-lg py-3 transition-colors duration-150 mt-1"
      >
        {loading
          ? <><Loader2 size={16} className="animate-spin" /> Signing in…</>
          : <><LogIn size={16} /> Sign In</>
        }
      </button>

      {/* Help text */}
      <p className="text-center text-xs text-[#9aa3b2] leading-relaxed">
        Forgot your password? Contact{' '}
        <a
          href="mailto:integratedcapitalsolutionsllc.com"
          className="text-[#c8922a] hover:underline font-medium"
        >
          integratedcapitalsolutionsllc.com
        </a>
      </p>
    </form>
  )
}