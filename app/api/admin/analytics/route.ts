import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '../../../../lib/auth'
import { getGoogleAccessToken, isGoogleConfigured } from '../../../../lib/google'

export const runtime = 'nodejs'

const SCOPE = 'https://www.googleapis.com/auth/analytics.readonly'

async function authorized(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value ?? ''
  return verifyToken(token)
}

type Row = { dimensionValues?: { value: string }[]; metricValues?: { value: string }[] }
type Report = { rows?: Row[]; metadata?: { timeZone?: string } }

function dim(r: Row, i = 0) {
  return r.dimensionValues?.[i]?.value ?? ''
}
function num(r: Row | undefined, i = 0) {
  return Number(r?.metricValues?.[i]?.value ?? 0)
}
function rows(reports: Report[], i: number) {
  return reports[i]?.rows ?? []
}
function toList(reports: Report[], i: number) {
  return rows(reports, i).map((r) => ({ label: dim(r), value: num(r) }))
}

// Metric order for the summary request. Index-based reads below depend on it.
const SUMMARY_METRICS = [
  'activeUsers',
  'newUsers',
  'screenPageViews',
  'sessions',
  'bounceRate',
  'engagementRate',
  'averageSessionDuration',
] as const

// Date ranges for the summary request, in declaration order.
// GA4 allows at most 4 date ranges per request.
const SUMMARY_RANGES = [
  { startDate: 'today', endDate: 'today' }, // date_range_0
  { startDate: '6daysAgo', endDate: 'today' }, // date_range_1  (7 days incl. today)
  { startDate: '27daysAgo', endDate: 'today' }, // date_range_2  (28 days incl. today)
  { startDate: '55daysAgo', endDate: '28daysAgo' }, // date_range_3  (the 28 days before that)
]

/**
 * Index a multi-date-range report by its `dateRange` dimension.
 *
 * When a request carries several dateRanges, GA4 injects a `dateRange`
 * dimension ("date_range_0", "date_range_1", …) and then applies its normal
 * ordering — by default the first metric, descending. So the rows come back
 * sorted by value, NOT in the order the ranges were declared. Reading
 * `rows[0]` as "the first range" silently mixes up periods (it used to report
 * the 28-day total as "today" and today's total as the 28-day figure).
 * Always map through the dimension value.
 */
function byDateRange(report: Report | undefined): Map<number, Row> {
  const map = new Map<number, Row>()
  for (const r of report?.rows ?? []) {
    const match = /^date_range_(\d+)$/.exec(dim(r))
    if (match) map.set(Number(match[1]), r)
  }
  return map
}

export async function GET(req: NextRequest) {
  if (!(await authorized(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const propertyId = process.env.GA4_PROPERTY_ID
  if (!isGoogleConfigured() || !propertyId) {
    return NextResponse.json({ configured: false })
  }

  let token: string | null
  try {
    token = await getGoogleAccessToken([SCOPE])
  } catch {
    token = null
  }
  if (!token) return NextResponse.json({ error: 'Google auth failed' }, { status: 502 })

  const endpoint = `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:batchRunReports`
  const last28 = { startDate: '27daysAgo', endDate: 'today' }

  async function batch(requests: unknown[]): Promise<Report[]> {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ requests }),
      cache: 'no-store',
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      throw new Error(detail.slice(0, 500))
    }
    const json = (await res.json()) as { reports?: Report[] }
    return json.reports ?? []
  }

  // batchRunReports accepts at most 5 requests, so the nine reports we need
  // are split across two batches. The second batch is best-effort: losing the
  // secondary breakdowns should not blank out the whole dashboard.
  let primary: Report[]
  try {
    primary = await batch([
      // 0 — summary totals for today / 7d / 28d / previous 28d
      {
        dateRanges: SUMMARY_RANGES,
        metrics: SUMMARY_METRICS.map((name) => ({ name })),
      },
      // 1 — daily timeseries (28d)
      {
        dateRanges: [last28],
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }, { name: 'sessions' }],
        orderBys: [{ dimension: { dimensionName: 'date' } }],
        limit: 40,
      },
      // 2 — top pages by views (28d)
      {
        dateRanges: [last28],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 10,
      },
      // 3 — acquisition channels (28d)
      {
        dateRanges: [last28],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 8,
      },
      // 4 — countries (28d)
      {
        dateRanges: [last28],
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
        limit: 8,
      },
    ])
  } catch (e) {
    return NextResponse.json(
      { error: 'GA4 request failed', detail: e instanceof Error ? e.message : '' },
      { status: 502 }
    )
  }

  let secondary: Report[] = []
  try {
    secondary = await batch([
      // 0 — devices (28d)
      {
        dateRanges: [last28],
        dimensions: [{ name: 'deviceCategory' }],
        metrics: [{ name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
      },
      // 1 — cities (28d) — the local-market signal for Bulgaria
      {
        dateRanges: [last28],
        dimensions: [{ name: 'city' }],
        metrics: [{ name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
        limit: 8,
      },
      // 2 — new vs returning (28d)
      {
        dateRanges: [last28],
        dimensions: [{ name: 'newVsReturning' }],
        metrics: [{ name: 'activeUsers' }],
      },
      // 3 — landing pages (28d): where sessions actually start
      {
        dateRanges: [last28],
        dimensions: [{ name: 'landingPage' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 8,
      },
    ])
  } catch {
    // Secondary breakdowns are optional; the core numbers still render.
  }

  const summary = byDateRange(primary[0])
  const summaryFor = (rangeIndex: number) => {
    const r = summary.get(rangeIndex)
    return {
      users: num(r, 0),
      newUsers: num(r, 1),
      pageViews: num(r, 2),
      sessions: num(r, 3),
      bounceRate: num(r, 4),
      engagementRate: num(r, 5),
      avgSessionDuration: num(r, 6),
    }
  }

  const countries = toList(primary, 4).map((c) => ({ label: c.label, users: c.value }))
  const totalCountryUsers = countries.reduce((sum, c) => sum + c.users, 0)
  const bulgariaUsers = countries.find((c) => c.label === 'Bulgaria')?.users ?? 0

  return NextResponse.json({
    configured: true,
    meta: {
      propertyId,
      timeZone: primary[1]?.metadata?.timeZone ?? 'Europe/Sofia',
      generatedAt: new Date().toISOString(),
    },
    today: summaryFor(0),
    last7: summaryFor(1),
    last28: summaryFor(2),
    prev28: summaryFor(3),
    // Share of the last 28 days' users located in Bulgaria — the target market.
    bulgaria: {
      users: bulgariaUsers,
      share: totalCountryUsers ? bulgariaUsers / totalCountryUsers : 0,
    },
    timeseries: rows(primary, 1).map((r) => ({
      date: dim(r),
      users: num(r, 0),
      pageViews: num(r, 1),
      sessions: num(r, 2),
    })),
    topPages: toList(primary, 2).map((p) => ({ path: p.label, views: p.value })),
    channels: toList(primary, 3).map((c) => ({ label: c.label, sessions: c.value })),
    countries,
    devices: toList(secondary, 0).map((d) => ({ label: d.label, users: d.value })),
    cities: toList(secondary, 1).map((c) => ({ label: c.label, users: c.value })),
    newVsReturning: toList(secondary, 2).map((n) => ({ label: n.label, users: n.value })),
    landingPages: toList(secondary, 3).map((l) => ({ path: l.label, sessions: l.value })),
  })
}
