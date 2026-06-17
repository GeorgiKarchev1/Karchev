import { NextRequest, NextResponse } from 'next/server'
import { verifyToken, COOKIE_NAME } from '../../../../lib/auth'
import { getGoogleAccessToken, isGoogleConfigured } from '../../../../lib/google'

export const runtime = 'nodejs'

const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly'

async function authorized(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value ?? ''
  return verifyToken(token)
}

function ymd(d: Date): string {
  return d.toISOString().slice(0, 10)
}

type GscRow = { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number }

export async function GET(req: NextRequest) {
  if (!(await authorized(req))) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const siteUrl = process.env.GSC_SITE_URL
  if (!isGoogleConfigured() || !siteUrl) {
    return NextResponse.json({ configured: false })
  }

  let token: string | null
  try {
    token = await getGoogleAccessToken([SCOPE])
  } catch {
    token = null
  }
  if (!token) return NextResponse.json({ error: 'Google auth failed' }, { status: 502 })

  // GSC data lags ~2-3 days; query a 28-day window ending 3 days ago.
  const end = new Date()
  end.setDate(end.getDate() - 3)
  const start = new Date(end)
  start.setDate(start.getDate() - 28)
  const startDate = ymd(start)
  const endDate = ymd(end)

  const endpoint = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(
    siteUrl
  )}/searchAnalytics/query`

  async function query(dimensions: string[], rowLimit = 25): Promise<GscRow[]> {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ startDate, endDate, dimensions, rowLimit }),
      cache: 'no-store',
    })
    if (!res.ok) {
      const detail = await res.text().catch(() => '')
      throw new Error(detail.slice(0, 500))
    }
    const json = (await res.json()) as { rows?: GscRow[] }
    return json.rows ?? []
  }

  try {
    const [totalsRows, queries, pages, timeseries] = await Promise.all([
      query([], 1),
      query(['query'], 25),
      query(['page'], 25),
      query(['date'], 90),
    ])

    const t = totalsRows[0]
    return NextResponse.json({
      configured: true,
      range: { startDate, endDate },
      totals: t
        ? { clicks: t.clicks, impressions: t.impressions, ctr: t.ctr, position: t.position }
        : { clicks: 0, impressions: 0, ctr: 0, position: 0 },
      queries: queries.map((r) => ({
        query: r.keys?.[0] ?? '',
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: r.position,
      })),
      pages: pages.map((r) => ({
        page: r.keys?.[0] ?? '',
        clicks: r.clicks,
        impressions: r.impressions,
        ctr: r.ctr,
        position: r.position,
      })),
      timeseries: timeseries.map((r) => ({
        date: r.keys?.[0] ?? '',
        clicks: r.clicks,
        impressions: r.impressions,
      })),
    })
  } catch (e) {
    return NextResponse.json(
      { error: 'Search Console request failed', detail: e instanceof Error ? e.message : '' },
      { status: 502 }
    )
  }
}
