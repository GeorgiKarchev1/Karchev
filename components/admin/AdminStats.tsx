'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  Users, Eye, Search, Loader2, TrendingUp, TrendingDown, Globe2, Monitor,
  RefreshCw, AlertCircle, Minus, MapPin, Clock, MousePointerClick, Repeat,
  LogIn, ShieldCheck,
} from 'lucide-react'

/* ---------------------------------- types --------------------------------- */

interface Summary {
  users: number
  newUsers: number
  pageViews: number
  sessions: number
  bounceRate: number
  engagementRate: number
  avgSessionDuration: number
}
interface Labelled { label: string; users: number }
interface Analytics {
  configured: boolean
  meta?: { propertyId: string; timeZone: string; generatedAt: string }
  today?: Summary
  last7?: Summary
  last28?: Summary
  prev28?: Summary
  bulgaria?: { users: number; share: number }
  timeseries?: { date: string; users: number; pageViews: number; sessions: number }[]
  topPages?: { path: string; views: number }[]
  landingPages?: { path: string; sessions: number }[]
  channels?: { label: string; sessions: number }[]
  countries?: Labelled[]
  cities?: Labelled[]
  devices?: Labelled[]
  newVsReturning?: Labelled[]
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

/* -------------------------------- formatting ------------------------------- */

const nf = new Intl.NumberFormat('bg-BG')
const fmt = (n: number) => nf.format(Math.round(n))
const pct = (n: number, digits = 0) => `${(n * 100).toFixed(digits)}%`

/** Duration as a compact Bulgarian string: "2м 10с" / "48с". */
function dur(s: number): string {
  const total = Math.round(s)
  const min = Math.floor(total / 60)
  const sec = total % 60
  return min > 0 ? `${min}м ${sec}с` : `${sec}с`
}

/** GA4 hands back dates as "YYYYMMDD". */
function parseGaDate(raw: string): Date | null {
  const m = /^(\d{4})(\d{2})(\d{2})$/.exec(raw)
  if (!m) return null
  return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]))
}
function shortDate(raw: string): string {
  const d = parseGaDate(raw)
  if (!d) return raw
  return d.toLocaleDateString('bg-BG', { day: 'numeric', month: 'short' })
}

/** Human-readable names for GA4's English dimension values. */
const DEVICE_LABELS: Record<string, string> = {
  mobile: 'Телефон', desktop: 'Компютър', tablet: 'Таблет', smarttv: 'Телевизор',
}
const VISITOR_LABELS: Record<string, string> = {
  new: 'Нови', returning: 'Връщащи се',
}
const CHANNEL_LABELS: Record<string, string> = {
  'Organic Search': 'Google търсене',
  'Direct': 'Директно',
  'Referral': 'От друг сайт',
  'Organic Social': 'Социални мрежи',
  'Paid Search': 'Платени реклами',
  'Email': 'Имейл',
  'Unassigned': 'Неопределено',
  'Organic Video': 'Видео',
}
const COUNTRY_LABELS: Record<string, string> = {
  Bulgaria: 'България', 'United States': 'САЩ', Germany: 'Германия',
  'United Kingdom': 'Великобритания', Netherlands: 'Нидерландия', Ireland: 'Ирландия',
  Greece: 'Гърция', Romania: 'Румъния', Turkey: 'Турция', France: 'Франция',
  Spain: 'Испания', Italy: 'Италия', Poland: 'Полша', Canada: 'Канада',
}
const translate = (map: Record<string, string>, raw: string) =>
  map[raw] ?? (raw === '(not set)' ? 'Неизвестно' : raw || 'Неизвестно')

/** City names come through untranslated; only the "(not set)" placeholder needs handling. */
const cityLabel = (raw: string) => translate({}, raw)

/* -------------------------------- primitives ------------------------------- */

/**
 * Share of visitors who had been here before.
 *
 * GA4 counts activeUsers and newUsers with different aggregations, so on a
 * short or still-open window newUsers can exceed activeUsers. Clamp rather
 * than render a negative percentage.
 */
function returningShare(s: Summary): number {
  if (!s.users) return 0
  return Math.min(1, Math.max(0, 1 - s.newUsers / s.users))
}

const CARD = 'rounded-2xl border-2 border-[#2d232e]/10 bg-white/70'

/**
 * Period-over-period change. `invert` marks metrics where down is good
 * (bounce rate), so the colour still reads green when the number improves.
 */
function Delta({ current, previous, invert = false }: { current: number; previous: number; invert?: boolean }) {
  if (!previous) {
    return <span className="text-[11px] font-semibold text-[#2d232e]/35">нов период</span>
  }
  const change = (current - previous) / previous
  const flat = Math.abs(change) < 0.005
  const better = invert ? change < 0 : change > 0
  const tone = flat ? 'text-[#2d232e]/40' : better ? 'text-emerald-600' : 'text-red-500'
  const Icon = flat ? Minus : change > 0 ? TrendingUp : TrendingDown
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${tone}`}>
      <Icon className="h-3 w-3 shrink-0" />
      {flat ? 'без промяна' : `${change > 0 ? '+' : ''}${(change * 100).toFixed(0)}%`}
    </span>
  )
}

function Kpi({
  icon, label, value, hint, current, previous, invert,
}: {
  icon: React.ReactNode
  label: string
  value: string
  hint?: string
  current?: number
  previous?: number
  invert?: boolean
}) {
  return (
    <div className={`${CARD} p-4`}>
      <div className="mb-2 flex items-center gap-1.5 text-[#534b52]">
        <span className="shrink-0">{icon}</span>
        <span className="text-[10px] font-bold uppercase leading-tight tracking-widest text-[#2d232e]/45">
          {label}
        </span>
      </div>
      <div className="text-2xl font-black leading-none text-[#2d232e] sm:text-3xl">{value}</div>
      <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1">
        {current !== undefined && previous !== undefined && (
          <Delta current={current} previous={previous} invert={invert} />
        )}
        {hint && <span className="text-[11px] text-[#2d232e]/45">{hint}</span>}
      </div>
    </div>
  )
}

function Panel({ title, icon, note, children, className = '' }: {
  title: string
  icon?: React.ReactNode
  note?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section className={`${CARD} p-4 sm:p-5 ${className}`}>
      <div className="mb-1 flex items-center gap-1.5">
        {icon}
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#2d232e]/50">{title}</h3>
      </div>
      {note && <p className="mb-3 text-[11px] leading-snug text-[#2d232e]/40">{note}</p>}
      <div className={note ? '' : 'mt-3'}>{children}</div>
    </section>
  )
}

/** Ranked horizontal bars — readable at any width, with the share in context. */
function BarList({ rows, unit = '' }: { rows: { label: string; value: number }[]; unit?: string }) {
  if (!rows.length) return <p className="py-3 text-sm text-[#2d232e]/40">Няма данни за този период.</p>
  const max = Math.max(1, ...rows.map((r) => r.value))
  const total = rows.reduce((s, r) => s + r.value, 0)
  return (
    <ul className="space-y-2.5">
      {rows.map((r) => (
        <li key={r.label}>
          <div className="mb-1 flex items-baseline justify-between gap-3">
            <span className="min-w-0 truncate text-xs font-semibold text-[#2d232e]/80" title={r.label}>
              {r.label}
            </span>
            <span className="shrink-0 text-xs font-bold text-[#2d232e] tabular-nums">
              {fmt(r.value)}{unit}
              {total > 0 && (
                <span className="ml-1.5 font-medium text-[#2d232e]/35">
                  {Math.round((r.value / total) * 100)}%
                </span>
              )}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#2d232e]/[0.07]">
            <div
              className="h-full rounded-full bg-[#534b52] transition-[width] duration-500"
              style={{ width: `${(r.value / max) * 100}%` }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

/**
 * Daily-visitors area chart. Drawn as inline SVG on a 0–100 viewBox so it
 * scales to any container width — the old version was 3px-wide bars with no
 * axis, which was unreadable on a phone.
 */
function TrendChart({ data }: { data: { date: string; users: number; sessions: number }[] }) {
  const [active, setActive] = useState<number | null>(null)
  if (data.length < 2) return <p className="py-3 text-sm text-[#2d232e]/40">Още няма достатъчно данни за графика.</p>

  const max = Math.max(1, ...data.map((d) => d.users))
  const step = 100 / (data.length - 1)
  const x = (i: number) => i * step
  const y = (v: number) => 100 - (v / max) * 100

  const line = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(2)},${y(d.users).toFixed(2)}`).join(' ')
  const area = `${line} L100,100 L0,100 Z`
  const shown = active ?? data.length - 1
  const point = data[shown]
  const ticks = [0, Math.floor((data.length - 1) / 2), data.length - 1]

  function pickNearest(event: React.PointerEvent<HTMLDivElement>) {
    const box = event.currentTarget.getBoundingClientRect()
    if (!box.width) return
    const ratio = (event.clientX - box.left) / box.width
    const index = Math.round(ratio * (data.length - 1))
    setActive(Math.min(data.length - 1, Math.max(0, index)))
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <span className="text-2xl font-black tabular-nums text-[#2d232e]">{fmt(point.users)}</span>
          <span className="ml-1.5 text-xs font-semibold text-[#2d232e]/50">
            посетители · {shortDate(point.date)}
          </span>
        </div>
        <span className="text-[11px] font-medium text-[#2d232e]/40">връх: {fmt(max)}/ден</span>
      </div>

      <div
        className="relative h-40 w-full touch-pan-y"
        onPointerMove={pickNearest}
        onPointerDown={pickNearest}
        onPointerLeave={() => setActive(null)}
      >
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
          {/* horizontal gridlines */}
          {[0, 25, 50, 75, 100].map((g) => (
            <line key={g} x1="0" y1={g} x2="100" y2={g} stroke="#2d232e" strokeOpacity="0.07" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
          ))}
          <defs>
            <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#534b52" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#534b52" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#trendFill)" />
          <path d={line} fill="none" stroke="#534b52" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
          <line
            x1={x(shown)} y1="0" x2={x(shown)} y2="100"
            stroke="#2d232e" strokeOpacity="0.25" strokeWidth="1" vectorEffect="non-scaling-stroke"
          />
          <circle cx={x(shown)} cy={y(point.users)} r="3.5" fill="#2d232e" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* Keyboard path: one control that walks the series, so the chart is
            reachable without a pointer. */}
        <input
          type="range"
          min={0}
          max={data.length - 1}
          value={shown}
          onChange={(e) => setActive(Number(e.target.value))}
          aria-label="Избери ден от графиката"
          aria-valuetext={`${shortDate(point.date)}: ${point.users} посетители`}
          className="absolute inset-x-0 bottom-0 h-11 w-full cursor-pointer opacity-0"
        />
      </div>

      <div className="mt-2 flex justify-between text-[10px] font-semibold uppercase tracking-wider text-[#2d232e]/35">
        {ticks.map((t) => <span key={t}>{shortDate(data[t].date)}</span>)}
      </div>
    </div>
  )
}

function SeoTable({ rows, firstCol, firstLabel }: {
  rows: SeoRow[]
  firstCol: 'query' | 'page'
  firstLabel: string
}) {
  if (!rows.length) {
    return (
      <p className="py-3 text-sm text-[#2d232e]/40">
        Още няма данни. Google показва търсения едва след като сайтът започне да се появява в резултатите.
      </p>
    )
  }
  return (
    // Tables are the one thing allowed to scroll sideways — inside its own container.
    <div className="-mx-1 overflow-x-auto px-1">
      <table className="w-full min-w-[420px] text-xs">
        <thead>
          <tr className="text-left text-[#2d232e]/40">
            <th className="pb-2 pr-2 font-bold">{firstLabel}</th>
            <th className="px-2 pb-2 text-right font-bold">Кликове</th>
            <th className="px-2 pb-2 text-right font-bold">Показвания</th>
            <th className="px-2 pb-2 text-right font-bold">CTR</th>
            <th className="pb-2 pl-2 text-right font-bold">Позиция</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const label = (firstCol === 'query' ? r.query : r.page) ?? ''
            const display = firstCol === 'page' ? label.replace(/^https?:\/\/[^/]+/, '') || '/' : label
            return (
              <tr key={`${label}-${i}`} className="border-t border-[#2d232e]/5">
                <td className="max-w-[240px] truncate py-2 pr-2 font-medium text-[#2d232e]/85" title={label}>
                  {display}
                </td>
                <td className="px-2 py-2 text-right font-bold tabular-nums">{fmt(r.clicks)}</td>
                <td className="px-2 py-2 text-right tabular-nums text-[#2d232e]/60">{fmt(r.impressions)}</td>
                <td className="px-2 py-2 text-right tabular-nums text-[#2d232e]/60">{pct(r.ctr, 1)}</td>
                <td className="py-2 pl-2 text-right tabular-nums text-[#2d232e]/60">{r.position.toFixed(1)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function SetupCard({ what }: { what: string }) {
  return (
    <div className="rounded-2xl border-2 border-amber-300/50 bg-amber-50 p-5 sm:p-6">
      <div className="mb-3 flex items-center gap-2 text-amber-700">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <span className="font-black">{what} не е свързан още</span>
      </div>
      <p className="mb-3 text-sm leading-relaxed text-amber-900/80">
        За да виждаш реални данни, свържи Google service account (еднократна настройка):
      </p>
      <ol className="list-inside list-decimal space-y-1.5 text-sm leading-relaxed text-amber-900/80">
        <li>Google Cloud → създай <b>Service Account</b>, изтегли JSON ключа.</li>
        <li>Enable <b>Google Analytics Data API</b> и <b>Search Console API</b>.</li>
        <li>GA4 → Admin → Property Access → добави service account имейла като <b>Viewer</b>.</li>
        <li>Search Console → Settings → Users → добави service account имейла.</li>
        <li>
          Сложи env променливите във Vercel: <code className="text-xs">GOOGLE_SERVICE_ACCOUNT_EMAIL</code>,{' '}
          <code className="text-xs">GOOGLE_SERVICE_ACCOUNT_KEY</code>,{' '}
          <code className="text-xs">GA4_PROPERTY_ID</code>, <code className="text-xs">GSC_SITE_URL</code>.
        </li>
      </ol>
    </div>
  )
}

function ErrorCard({ what, detail }: { what: string; detail?: string }) {
  return (
    <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-4 text-sm text-red-700">
      <p className="font-bold">Грешка при зареждане на {what}</p>
      {detail && <p className="mt-1 break-words text-xs text-red-600/80">{detail}</p>}
    </div>
  )
}

/* ---------------------------------- screen --------------------------------- */

export default function AdminStats() {
  const [analytics, setAnalytics] = useState<Analytics | null>(null)
  const [seo, setSeo] = useState<Seo | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  const load = useCallback(async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    const [a, s] = await Promise.all([
      fetch('/api/admin/analytics', { cache: 'no-store' })
        .then((r) => r.json())
        .catch(() => ({ configured: false, error: 'Връзката се провали' })),
      fetch('/api/admin/seo', { cache: 'no-store' })
        .then((r) => r.json())
        .catch(() => ({ configured: false, error: 'Връзката се провали' })),
    ])
    setAnalytics(a)
    setSeo(s)
    setLoading(false)
    setRefreshing(false)
  }, [])

  useEffect(() => { load() }, [load])

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 py-20 text-[#534b52]">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span className="text-sm font-semibold">Зареждам данните от Google…</span>
      </div>
    )
  }

  const a28 = analytics?.last28
  const aPrev = analytics?.prev28
  const ready = Boolean(analytics?.configured && a28)
  const updatedAt = analytics?.meta?.generatedAt
    ? new Date(analytics.meta.generatedAt).toLocaleTimeString('bg-BG', { hour: '2-digit', minute: '2-digit' })
    : null

  return (
    <div className="space-y-8">
      {/* ---- context bar: what you're looking at, and when it was fetched ---- */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-xl font-black leading-tight text-[#2d232e] sm:text-2xl">Как се справя сайтът</h1>
          <p className="mt-1 text-xs text-[#2d232e]/50">
            Трафик за последните 28 дни, сравнен с предходните 28.
            {updatedAt && <> Обновено в {updatedAt} ч.</>}
          </p>
        </div>
        <button
          onClick={() => load(true)}
          disabled={refreshing}
          className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border-2 border-[#2d232e]/15 px-4 text-xs font-bold transition-colors hover:border-[#2d232e]/40 disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          Обнови
        </button>
      </div>

      {/* ================================ TRAFFIC ============================= */}
      {!analytics?.configured && !analytics?.error ? (
        <SetupCard what="Google Analytics" />
      ) : analytics?.error ? (
        <ErrorCard what="Google Analytics" detail={analytics.error} />
      ) : ready && a28 && aPrev ? (
        <div className="space-y-5">
          {/* headline numbers, each against the previous 28 days */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Kpi
              icon={<Users className="h-4 w-4" />}
              label="Посетители"
              value={fmt(a28.users)}
              current={a28.users}
              previous={aPrev.users}
              hint={`${fmt(aPrev.users)} преди`}
            />
            <Kpi
              icon={<LogIn className="h-4 w-4" />}
              label="Посещения"
              value={fmt(a28.sessions)}
              current={a28.sessions}
              previous={aPrev.sessions}
              hint={`${fmt(aPrev.sessions)} преди`}
            />
            <Kpi
              icon={<Eye className="h-4 w-4" />}
              label="Видени страници"
              value={fmt(a28.pageViews)}
              current={a28.pageViews}
              previous={aPrev.pageViews}
              hint={`${fmt(aPrev.pageViews)} преди`}
            />
            <Kpi
              icon={<Clock className="h-4 w-4" />}
              label="Средно на посещение"
              value={dur(a28.avgSessionDuration)}
              current={a28.avgSessionDuration}
              previous={aPrev.avgSessionDuration}
              hint={`${dur(aPrev.avgSessionDuration)} преди`}
            />
          </div>

          {/* quality + recency row */}
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Kpi
              icon={<MousePointerClick className="h-4 w-4" />}
              label="Задържат се"
              value={pct(a28.engagementRate)}
              current={a28.engagementRate}
              previous={aPrev.engagementRate}
              hint="разглеждат сайта"
            />
            <Kpi
              icon={<Repeat className="h-4 w-4" />}
              label="Връщат се"
              value={a28.users ? pct(returningShare(a28)) : '0%'}
              hint={`${fmt(a28.newUsers)} нови от ${fmt(a28.users)}`}
            />
            <Kpi
              icon={<Users className="h-4 w-4" />}
              label="Днес"
              value={fmt(analytics.today?.users ?? 0)}
              hint={`${fmt(analytics.last7?.users ?? 0)} за 7 дни`}
            />
            <Kpi
              icon={<MapPin className="h-4 w-4" />}
              label="От България"
              value={analytics.bulgaria ? pct(analytics.bulgaria.share) : '—'}
              hint={analytics.bulgaria ? `${fmt(analytics.bulgaria.users)} посетители` : undefined}
            />
          </div>

          <Panel
            title="Посетители по дни"
            note="Посочи ден в графиката, за да видиш точната стойност."
          >
            <TrendChart data={analytics.timeseries ?? []} />
          </Panel>

          <div className="grid gap-4 lg:grid-cols-2">
            <Panel
              title="Откъде идват"
              icon={<Globe2 className="h-3.5 w-3.5 text-[#534b52]" />}
              note="Канал на посещенията — колко дойдоха от Google, колко директно."
            >
              <BarList rows={(analytics.channels ?? []).map((c) => ({
                label: translate(CHANNEL_LABELS, c.label), value: c.sessions,
              }))} />
            </Panel>

            <Panel
              title="Първа страница"
              note="Страницата, с която посетителят влиза в сайта. Тук печелиш или губиш посетителя."
            >
              <BarList rows={(analytics.landingPages ?? []).map((p) => ({
                label: p.path || '/', value: p.sessions,
              }))} />
            </Panel>

            <Panel title="Най-гледани страници" note="Общо прегледи за 28 дни.">
              <BarList rows={(analytics.topPages ?? []).map((p) => ({
                label: p.path || '/', value: p.views,
              }))} />
            </Panel>

            <Panel
              title="Градове"
              icon={<MapPin className="h-3.5 w-3.5 text-[#534b52]" />}
              note="Най-важният сигнал за местен пазар."
            >
              <BarList rows={(analytics.cities ?? []).map((c) => ({
                label: cityLabel(c.label), value: c.users,
              }))} />
            </Panel>

            <Panel title="Държави" icon={<Globe2 className="h-3.5 w-3.5 text-[#534b52]" />}>
              <BarList rows={(analytics.countries ?? []).map((c) => ({
                label: translate(COUNTRY_LABELS, c.label), value: c.users,
              }))} />
            </Panel>

            <Panel
              title="Устройства"
              icon={<Monitor className="h-3.5 w-3.5 text-[#534b52]" />}
              note="Ако телефонът води, мобилният изглед е приоритет."
            >
              <BarList rows={(analytics.devices ?? []).map((d) => ({
                label: translate(DEVICE_LABELS, d.label), value: d.users,
              }))} />
            </Panel>
          </div>
        </div>
      ) : (
        <SetupCard what="Google Analytics" />
      )}

      {/* ================================== SEO =============================== */}
      <div className="space-y-5">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-black text-[#2d232e]">
            <Search className="h-5 w-5 text-[#534b52]" />
            Google търсене
          </h2>
          <p className="mt-1 text-xs text-[#2d232e]/50">
            {seo?.range
              ? `Данни от Search Console за ${seo.range.startDate} – ${seo.range.endDate} (Google изостава с 2–3 дни).`
              : 'Данни от Search Console.'}
          </p>
        </div>

        {!seo?.configured && !seo?.error ? (
          <SetupCard what="Search Console" />
        ) : seo?.error ? (
          <ErrorCard what="Search Console" detail={seo.error} />
        ) : seo?.totals ? (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <Kpi icon={<MousePointerClick className="h-4 w-4" />} label="Кликове" value={fmt(seo.totals.clicks)} hint="влизания от Google" />
              <Kpi icon={<Eye className="h-4 w-4" />} label="Показвания" value={fmt(seo.totals.impressions)} hint="появи в резултатите" />
              <Kpi icon={<TrendingUp className="h-4 w-4" />} label="CTR" value={pct(seo.totals.ctr, 1)} hint="кликат от видяното" />
              <Kpi icon={<Search className="h-4 w-4" />} label="Средна позиция" value={seo.totals.position.toFixed(1)} hint="1 = най-горе" />
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <Panel
                title="Търсения"
                note="Какво пишат хората в Google, преди да стигнат до сайта. Google скрива редките търсения, затова сборът тук е по-малък от общите кликове."
              >
                <SeoTable rows={seo.queries ?? []} firstCol="query" firstLabel="Заявка" />
              </Panel>
              <Panel title="Страници в Google" note="Кои страници излизат в резултатите.">
                <SeoTable rows={seo.pages ?? []} firstCol="page" firstLabel="Страница" />
              </Panel>
            </div>
          </div>
        ) : (
          <SetupCard what="Search Console" />
        )}
      </div>

      {/* ---- provenance: makes it checkable that these are real Google numbers ---- */}
      {(analytics?.meta || seo?.range) && (
        <footer className="flex flex-wrap items-center gap-x-4 gap-y-1.5 rounded-2xl border-2 border-[#2d232e]/[0.07] bg-white/40 px-4 py-3 text-[11px] text-[#2d232e]/45">
          <span className="inline-flex items-center gap-1.5 font-bold text-emerald-700">
            <ShieldCheck className="h-3.5 w-3.5" /> Реални данни от Google
          </span>
          {analytics?.meta && <span>GA4 property {analytics.meta.propertyId}</span>}
          {analytics?.meta && <span>Часова зона {analytics.meta.timeZone}</span>}
          <span>Няма демо или примерни стойности.</span>
        </footer>
      )}
    </div>
  )
}
