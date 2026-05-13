'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)
  const router = useRouter()

  useEffect(() => {
    let active = true

    async function checkSession() {
      const res = await fetch('/api/admin/auth', { cache: 'no-store' })
      if (!active) return

      if (res.ok) {
        const data = await res.json() as { authenticated?: boolean }
        if (data.authenticated) {
          router.replace('/admin/dashboard')
          return
        }
      }

      setCheckingSession(false)
    }

    checkSession()

    return () => {
      active = false
    }
  }, [router])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      router.push('/admin/dashboard')
    } else {
      const data = await res.json()
      setError(data.error ?? 'Грешна парола')
      setLoading(false)
    }
  }

  if (checkingSession) {
    return (
      <main className="min-h-screen bg-[#f1f0ea] flex items-center justify-center px-4">
        <div className="flex items-center gap-3 text-[#534b52]">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="text-sm font-bold tracking-wide">Проверка на сесия...</span>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f1f0ea] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-[#2d232e] flex items-center justify-center">
            <Lock className="w-5 h-5 text-[#f1f0ea]" />
          </div>
        </div>
        <h1 className="text-2xl font-black text-[#2d232e] text-center mb-2">Admin панел</h1>
        <p className="text-sm text-[#2d232e]/50 text-center mb-8">Само за оторизирани потребители</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Парола"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-[#2d232e]/20 bg-white focus:outline-none focus:border-[#2d232e] text-[#2d232e] placeholder:text-[#2d232e]/30 font-medium transition-colors"
            required
            autoFocus
          />
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#2d232e] text-[#f1f0ea] font-bold text-sm tracking-wide hover:bg-[#534b52] disabled:opacity-50 transition-colors"
          >
            {loading ? 'Влизане...' : 'Влез'}
          </button>
        </form>
      </div>
    </main>
  )
}
