import { JWT } from 'google-auth-library'

// Server-side Google API access via a service account. The service account must
// be granted:
//   - "Viewer" on the GA4 property  -> reads traffic via the Analytics Data API
//   - added as a user in Search Console for the property -> reads SEO metrics
// Credentials come from env (never the client):
//   GOOGLE_SERVICE_ACCOUNT_EMAIL  service account email
//   GOOGLE_SERVICE_ACCOUNT_KEY    its private key (PEM; \n may be escaped)
//   GA4_PROPERTY_ID               numeric GA4 property id (NOT the G-XXXX tag)
//   GSC_SITE_URL                  e.g. "sc-domain:karchev.xyz" or "https://karchev.xyz/"

export function isGoogleConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  )
}

export async function getGoogleAccessToken(scopes: string[]): Promise<string | null> {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!email || !rawKey) return null

  // Vercel/.env store the PEM with literal "\n"; restore real newlines.
  const key = rawKey.replace(/\\n/g, '\n')
  const jwt = new JWT({ email, key, scopes })
  const { token } = await jwt.getAccessToken()
  return token ?? null
}
