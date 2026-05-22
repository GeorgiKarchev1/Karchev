'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type {
  BusinessProfileInput,
  ContentIdea,
  ContentPillar,
  HookTemplate,
  OSBootstrapResult,
  WeeklyPlanDay,
} from '@/lib/os/types'

const PROFILE_KEY = 'karchx-os.profile.v1'
const BOOTSTRAP_KEY = 'karchx-os.bootstrap.v1'

interface OSContextValue {
  hydrated: boolean
  profile: BusinessProfileInput | null
  bootstrap: OSBootstrapResult | null
  hasContent: boolean
  setProfile: (profile: BusinessProfileInput) => void
  setBootstrap: (bootstrap: OSBootstrapResult) => void
  updatePillars: (pillars: ContentPillar[]) => void
  updateIdeas: (ideas: ContentIdea[]) => void
  updateHooks: (hooks: HookTemplate[]) => void
  updatePlan: (plan: WeeklyPlanDay[]) => void
  reset: () => void
  regenerate: () => Promise<void>
}

const OSContext = createContext<OSContextValue | null>(null)

function readJSON<T>(key: string): T | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return null
    return JSON.parse(raw) as T
  } catch {
    return null
  }
}

function writeJSON(key: string, value: unknown) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage full or disabled — silently ignore */
  }
}

export function OSProvider({ children }: { children: ReactNode }) {
  const [profile, setProfileState] = useState<BusinessProfileInput | null>(null)
  const [bootstrap, setBootstrapState] = useState<OSBootstrapResult | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setProfileState(readJSON<BusinessProfileInput>(PROFILE_KEY))
    setBootstrapState(readJSON<OSBootstrapResult>(BOOTSTRAP_KEY))
    setHydrated(true)
  }, [])

  const setProfile = useCallback((next: BusinessProfileInput) => {
    setProfileState(next)
    writeJSON(PROFILE_KEY, next)
  }, [])

  const setBootstrap = useCallback((next: OSBootstrapResult) => {
    setBootstrapState(next)
    writeJSON(BOOTSTRAP_KEY, next)
  }, [])

  const updatePillars = useCallback((pillars: ContentPillar[]) => {
    setBootstrapState((current) => {
      if (!current) return current
      const next = { ...current, pillars }
      writeJSON(BOOTSTRAP_KEY, next)
      return next
    })
  }, [])

  const updateIdeas = useCallback((ideas: ContentIdea[]) => {
    setBootstrapState((current) => {
      if (!current) return current
      const next = { ...current, ideas }
      writeJSON(BOOTSTRAP_KEY, next)
      return next
    })
  }, [])

  const updateHooks = useCallback((hooks: HookTemplate[]) => {
    setBootstrapState((current) => {
      if (!current) return current
      const next = { ...current, hooks }
      writeJSON(BOOTSTRAP_KEY, next)
      return next
    })
  }, [])

  const updatePlan = useCallback((plan: WeeklyPlanDay[]) => {
    setBootstrapState((current) => {
      if (!current) return current
      const next = { ...current, weeklyPlan: plan }
      writeJSON(BOOTSTRAP_KEY, next)
      return next
    })
  }, [])

  const reset = useCallback(() => {
    setProfileState(null)
    setBootstrapState(null)
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(PROFILE_KEY)
      window.localStorage.removeItem(BOOTSTRAP_KEY)
    }
  }, [])

  const regenerate = useCallback(async () => {
    if (!profile) return
    const response = await fetch('/api/os/bootstrap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile),
    })
    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(data.error || 'Failed to regenerate')
    }
    const data = (await response.json()) as OSBootstrapResult
    setBootstrap(data)
  }, [profile, setBootstrap])

  const value = useMemo<OSContextValue>(
    () => ({
      hydrated,
      profile,
      bootstrap,
      hasContent: Boolean(bootstrap),
      setProfile,
      setBootstrap,
      updatePillars,
      updateIdeas,
      updateHooks,
      updatePlan,
      reset,
      regenerate,
    }),
    [
      hydrated,
      profile,
      bootstrap,
      setProfile,
      setBootstrap,
      updatePillars,
      updateIdeas,
      updateHooks,
      updatePlan,
      reset,
      regenerate,
    ]
  )

  return <OSContext.Provider value={value}>{children}</OSContext.Provider>
}

export function useOS() {
  const ctx = useContext(OSContext)
  if (!ctx) {
    throw new Error('useOS must be used within an OSProvider')
  }
  return ctx
}
