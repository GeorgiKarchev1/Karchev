'use client'

import { useEffect, useState } from 'react'
import {
  Users, Eye, MousePointerClick, Search, Loader2, TrendingUp, Globe2, Monitor, RefreshCw, AlertCircle,
} from 'lucide-react'

interface Summary {
  users: number
  pageViews: number
  sessions: number
  bounceRate: number
  avgSessionDuration: number
}
interface Analytics {
  configured: boolean
  today?: Summary
  last7?: Summary
  last28?: Summary
  timeseries?: { date: string; users: number; pageViews: number }[]
  topPages?: { path: string; views: number }[]
  channels?: { label: string; sessions: number }[]
  countries?: { label: string; users: number }[]
  devices?: { label: string; users: number }[]
  error?: string
}
interface SeoRow {
  query?: string
  page?: string
  clicks: number
  impressions: number
  ctr: number
  position: number
}
interface Seo {
  configured: boolean
  range?: { startDate: string; endDate: string }
  totals?: { clicks: number; impressions: number; ctr: number; position: number }
  queries?: SeoRow[]
  pages?: SeoRow[]
  error?: string
}

const nf = new Intl.NumberFormat('bg-BG')
const fmt = (n: number) => nf.format(Math.round(n))
const pct = (n: number) => `${(n * 100).toFixed(1)}%`
const dur = (s: number) => `${Math.floor(s / 60)}м ${Math.round(s % 60)}с`

function Stat({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl border-2 border-[#2d232e]/10 bg-white/60 p-4">
      <div className="flex items-center gap-2 text-[#534b52] mb-2">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-widest text-[#2d232e]/40">{label}</span>
      </div>
      <div className="text-2xl font-black text-[#2d232e]">{value}</div>
      {sub && <div className="text-xs text-[#2d232e]/40 mt-1">{sub}</div>}
    </div>
  )
}

function BarList({ rows, max, unit }: { rows: { label: string; value: number }[]; max: number; unit?: string }) {
  if (!rows.length) return <p className="text-sm text-[#2d232e]/40 py-2">Няма данни.</p>
  return (
    <div className="space-y-2">
      {rows.map((r) => (
        <div key={r.label} className="flex items-center gap-3">
          <div className="w-40 truncate text-xs font-medium text-[#2d232e]/70" title={r.label}>{r.label || '(direct)'}</div>
          <div className="flex-1 h-5 rounded-full bg-[#2d232e]/5 overflow-hidden">
            <div className="h-full rounded-full bg-[#534b52]" style={{ width: `${max ? (r.value / max) * 100 : 0}%` }} />
          </div>
          <div className="w-16 text-right text-xs font-bold text-[#2d232e]">{fmt(r.value)}{unit}</div>
        </div>
      ))}
    </div>
  )
}

function SetupCard({ what }: { what: string }) {
  return (
    <div className="rounded-2xl border-2 border-amber-300/50 bg-amber-50 p-6">
      <div className="flex items-center gap-2 mb-3 text-amber-700">
        <AlertCircle className="w-5 h-5" />
        <span className="font-black">{what} не е свързан още</span>
      </div>
      <p className="text-sm text-amber-900/80 leading-relaxed mb-3">
        За да виждаш реални данни, свържи Google service account (еднократна настройка):
      </p>
      <ol className="text-sm text-amber-900/80 space-y-1.5 list-decimal list-inside leading-relaxed">
        <li>Google Cloud → създай <b>Service Account</b>, изтегли JSON ключа.</li>
        <li>Enable <b>Google Analytics Data API</b> и <b>Search Console API</b>.</li>
        <li>GA4 → Admin → Property Access → добави service account имейла като <b>Viewer</b>.</li>
        <li>Search Console → Settings → Users → добави service account имейла.</li>
        <li>Сложи env променливите във Vercel: <code className="text-xs">GOOGLE_SERVICE_ACCOUNT_EMAIL</code>, <code className="text-xs">GOOGLE_SERVICE_ACCOUNT_KEY</code>, <code className="text-xs">GA4_PROPERTY_ID</code>, <code className="text-xs">GSC_SITE_URL</code>.</li>
      </ol>
    </div>
  )
}

export default function AdminStats() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [seo, setSeo] = useState<Seo | null>(null)
  const [loading, setLoading] = useState(true)

  async function load() {
    setLoading(true)
    const [a, s] = await Promise.all([
      fetch('/api/admin/analytics', { cache: 'no-store' }).then((r) => r.json()).catch(() => ({ configured: false, error: 'fetch' })),
      fetch('/api/admin/seo', { cache: 'no-store' }).then((r) => r.json()).catch(() => ({ configured: false, error: 'fetch' })),
    ])
    setAnalytics(a)
    setSeo(s)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-[#534b52]" />
      </div>
    )
  }

  const maxPageViews = Math.max(1, ...(analytics?.topPages ?? []).map((p) => p.views))
  const maxChannel = Math.max(1, ...(analytics?.channels ?? []).map((c) => c.sessions))
  const maxCountry = Math.max(1, ...(analytics?.countries ?? []).map((c) => c.users))
  const maxDevice = Math.max(1, ...(analytics?.devices ?? []).map((d) => d.users))
  const tsMax = Math.max(1, ...(analytics?.timeseries ?? []).map((d) => d.users))

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-widest text-[#2d232e]/40">Трафик & SEO · последните 28 дни</p>
        <button onClick={load} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border-2 border-[#2d232e]/15 text-xs font-bold hover:border-[#2d232e]/40 transition-colors">
          <RefreshCw className="w-3.5 h-3.5" /> Обнови
        </button>
      </div>

      {/* ===== TRAFFIC ===== */}
      <section>
        <h2 className="flex items-center gap-2 font-black text-lg mb-4"><TrendingUp className="w-5 h-5 text-[#534b52]" /> Трафик (Google Analytics)</h2>

        {analytics?.configured && analytics.last28 ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Stat icon={<Users className="w-4 h-4" />} label="Посетители днес" value={fmt(analytics.today?.users ?? 0)} sub={`${fmt(analytics.last7?.users ?? 0)} за 7 дни`} />
              <Stat icon={<Users className="w-4 h-4" />} label="Посетители (28д)" value={fmt(analytics.last28.users)} sub={`${fmt(analytics.last28.sessions)} сесии`} />
              <Stat icon={<Eye className="w-4 h-4" />} label="Прегледи (28д)" value={fmt(analytics.last28.pageViews)} />
              <Stat icon={<MousePointerClick className="w-4 h-4" />} label="Bounce / Сесия" value={pct(analytics.last28.bounceRate)} sub={`~${dur(analytics.last28.avgSessionDuration)} средно`} />
            </div>

            {/* timeseries */}
            {analytics.timeseries && analytics.timeseries.length > 0 && (
              <div className="rounded-2xl border-2 border-[#2d232e]/10 bg-white/60 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2d232e]/40 mb-3">Посетители по дни</p>
                <div className="flex items-end gap-[3px] h-32">
                  {analytics.timeseries.map((d) => (
                    <div key={d.date} className="flex-1 bg-[#534b52]/80 hover:bg-[#534b52] rounded-t transition-colors" style={{ height: `${(d.users / tsMax) * 100}%` }} title={`${d.date}: ${d.users} посетители`} />
                  ))}
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-5">
              <div className="rounded-2xl border-2 border-[#2d232e]/10 bg-white/60 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2d232e]/40 mb-3">Топ страници</p>
                <BarList rows={(analytics.topPages ?? []).map((p) => ({ label: p.path, value: p.views }))} max={maxPageViews} />
              </div>
              <div className="rounded-2xl border-2 border-[#2d232e]/10 bg-white/60 p-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2d232e]/40 mb-3">Източници на трафик</p>
                <BarList rows={(analytics.channels ?? []).map((c) => ({ label: c.label, value: c.sessions }))} max={maxChannel} />
              </div>
              <div className="rounded-2xl border-2 border-[#2d232e]/10 bg-white/60 p-4">
                <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#2d232e]/40 mb-3"><Globe2 className="w-3.5 h-3.5" /> Държави</p>
                <BarList rows={(analytics.countries ?? []).map((c) => ({ label: c.label, value: c.users }))} max={maxCountry} />
              </div>
              <div className="rounded-2xl border-2 border-[#2d232e]/10 bg-white/60 p-4">
                <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#2d232e]/40 mb-3"><Monitor className="w-3.5 h-3.5" /> Устройства</p>
                <BarList rows={(analytics.devices ?? []).map((d) => ({ label: d.label, value: d.users }))} max={maxDevice} />
              </div>
            </div>
          </div>
        ) : analytics?.error ? (
          <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-4 text-sm text-red-700">Грешка при зареждане на Analytics: {analytics.error}</div>
        ) : (
          <SetupCard what="Google Analytics" />
        )}
      </section>

      {/* ===== SEO ===== */}
      <section>
        <h2 className="flex items-center gap-2 font-black text-lg mb-4"><Search className="w-5 h-5 text-[#534b52]" /> SEO (Google Search Console)</h2>

        {seo?.configured && seo.totals ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Stat icon={<MousePointerClick className="w-4 h-4" />} label="Кликове" value={fmt(seo.totals.clicks)} />
              <Stat icon={<Eye className="w-4 h-4" />} label="Impressions" value={fmt(seo.totals.impressions)} />
              <Stat icon={<TrendingUp className="w-4 h-4" />} label="CTR" value={pct(seo.totals.ctr)} />
              <Stat icon={<Search className="w-4 h-4" />} label="Ср. позиция" value={seo.totals.position.toFixed(1)} />
            </div>

            <div className="grid lg:grid-cols-2 gap-5">
              <div className="rounded-2xl border-2 border-[#2d232e]/10 bg-white/60 p-4 overflow-x-auto">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2d232e]/40 mb-3">Топ ключови думи</p>
                <SeoTable rows={seo.queries ?? []} firstCol="query" firstLabel="Заявка" />
              </div>
              <div className="rounded-2xl border-2 border-[#2d232e]/10 bg-white/60 p-4 overflow-x-auto">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#2d232e]/40 mb-3">Топ страници (търсене)</p>
                <SeoTable rows={seo.pages ?? []} firstCol="page" firstLabel="Страница" />
              </div>
            </div>
          </div>
        ) : seo?.error ? (
          <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-4 text-sm text-red-700">Грешка при зареждане на Search Console: {seo.error}</div>
        ) : (
          <SetupCard what="Search Console" />
        )}
      </section>
    </div>
  )
}

function SeoTable({ rows, firstCol, firstLabel }: { rows: SeoRow[]; firstCol: 'query' | 'page'; firstLabel: string }) {
  if (!rows.length) return <p className="text-sm text-[#2d232e]/40 py-2">Няма данни още.</p>
  return (
    <table className="w-full text-xs">
      <thead>
        <tr className="text-[#2d232e]/40 text-left">
          <th className="font-bold pb-2 pr-2">{firstLabel}</th>
          <th className="font-bold pb-2 px-2 text-right">Клик</th>
          <th className="font-bold pb-2 px-2 text-right">Impr.</th>
          <th className="font-bold pb-2 px-2 text-right">CTR</th>
          <th className="font-bold pb-2 pl-2 text-right">Поз.</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => {
          const label = (firstCol === 'query' ? r.query : r.page) ?? ''
          return (
            <tr key={i} className="border-t border-[#2d232e]/5">
              <td className="py-1.5 pr-2 max-w-[220px] truncate font-medium text-[#2d232e]/80" title={label}>{label}</td>
              <td className="py-1.5 px-2 text-right font-bold">{fmt(r.clicks)}</td>
              <td className="py-1.5 px-2 text-right text-[#2d232e]/60">{fmt(r.impressions)}</td>
              <td className="py-1.5 px-2 text-right text-[#2d232e]/60">{pct(r.ctr)}</td>
              <td className="py-1.5 pl-2 text-right text-[#2d232e]/60">{r.position.toFixed(1)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
