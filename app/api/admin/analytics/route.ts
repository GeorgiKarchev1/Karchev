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
type Report = { rows?: Row[]; totals?: Row[] }

function dim(r: Row, i = 0) {
  return r.dimensionValues?.[i]?.value ?? ''
}
function num(r: Row | undefined, i = 0) {
  return Number(r?.metricValues?.[i]?.value ?? 0)
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

  const body = {
    requests: [
      // 0 — totals across today / 7d / 28d
      {
        dateRanges: [
          { startDate: 'today', endDate: 'today' },
          { startDate: '7daysAgo', endDate: 'today' },
          { startDate: '28daysAgo', endDate: 'today' },
        ],
        metrics: [
          { name: 'activeUsers' },
          { name: 'screenPageViews' },
          { name: 'sessions' },
          { name: 'bounceRate' },
          { name: 'averageSessionDuration' },
        ],
      },
      // 1 — daily timeseries (28d)
      {
        dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'date' }],
        metrics: [{ name: 'activeUsers' }, { name: 'screenPageViews' }],
        orderBys: [{ dimension: { dimensionName: 'date' } }],
      },
      // 2 — top pages (28d)
      {
        dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'pagePath' }],
        metrics: [{ name: 'screenPageViews' }],
        orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
        limit: 10,
      },
      // 3 — channels / sources (28d)
      {
        dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'sessionDefaultChannelGroup' }],
        metrics: [{ name: 'sessions' }],
        orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
        limit: 8,
      },
      // 4 — countries (28d)
      {
        dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
        dimensions: [{ name: 'country' }],
        metrics: [{ name: 'activeUsers' }],
        orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
        limit: 8,
      },
    ],
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    return NextResponse.json({ error: 'GA4 request failed', detail: detail.slice(0, 500) }, { status: 502 })
  }

  const json = (await res.json()) as { reports?: Report[] }
  const reports = json.reports ?? []
  const totals = reports[0]?.rows ?? [] // one row per dateRange (today, 7d, 28d)

  const summaryFor = (idx: number) => ({
    users: num(totals[idx], 0),
    pageViews: num(totals[idx], 1),
    sessions: num(totals[idx], 2),
    bounceRate: num(totals[idx], 3),
    avgSessionDuration: num(totals[idx], 4),
  })

  // Second batch: device breakdown (kept separate so the first batch stays ≤5).
  let devices: { label: string; users: number }[] = []
  try {
    const devRes = await fetch(endpoint, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        requests: [
          {
            dateRanges: [{ startDate: '28daysAgo', endDate: 'today' }],
            dimensions: [{ name: 'deviceCategory' }],
            metrics: [{ name: 'activeUsers' }],
            orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
          },
        ],
      }),
      cache: 'no-store',
    })
    if (devRes.ok) {
      const dj = (await devRes.json()) as { reports?: Report[] }
      devices = (dj.reports?.[0]?.rows ?? []).map((r) => ({ label: dim(r), users: num(r) }))
    }
  } catch {
    // device breakdown is best-effort
  }

  return NextResponse.json({
    configured: true,
    today: summaryFor(0),
    last7: summaryFor(1),
    last28: summaryFor(2),
    timeseries: (reports[1]?.rows ?? []).map((r) => ({
      date: dim(r),
      users: num(r, 0),
      pageViews: num(r, 1),
    })),
    topPages: (reports[2]?.rows ?? []).map((r) => ({ path: dim(r), views: num(r) })),
    channels: (reports[3]?.rows ?? []).map((r) => ({ label: dim(r), sessions: num(r) })),
    countries: (reports[4]?.rows ?? []).map((r) => ({ label: dim(r), users: num(r) })),
    devices,
  })
}
