// Edge-compatible admin session tokens.
//
// A session token is an HMAC-signed, expiring, per-login-unique value:
//   base64url(JSON{ exp, nonce }) + "." + base64url(HMAC-SHA256(payload, secret))
// This means: a leaked cookie is useless after `exp`, every login gets a fresh
// token, and rotating ADMIN_SECRET instantly invalidates every outstanding
// session. No default-secret fallback — if ADMIN_SECRET is unset the admin area
// fails closed (locked) rather than open.

const encoder = new TextEncoder()

function getSecret(): string | null {
  const s = process.env.ADMIN_SECRET
  if (!s || s === 'karchev-admin-secret' || s.length < 16) return null
  return s
}

function base64url(bytes: Uint8Array): string {
  let str = ''
  for (let i = 0; i < bytes.length; i++) str += String.fromCharCode(bytes[i])
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function base64urlToBytes(input: string): Uint8Array {
  let s = input.replace(/-/g, '+').replace(/_/g, '/')
  if (s.length % 4) s += '='.repeat(4 - (s.length % 4))
  const bin = atob(s)
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}

async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(data))
  return base64url(new Uint8Array(sig))
}

// Constant-time comparison of two equal-length strings.
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

export const COOKIE_NAME = 'admin_session'
export const COOKIE_MAX_AGE = 60 * 60 * 12 // 12 hours

// Issue a fresh, expiring, signed session token. Returns null if the server is
// misconfigured (no usable ADMIN_SECRET), in which case login must be refused.
export async function signToken(): Promise<string | null> {
  const secret = getSecret()
  if (!secret) return null
  const nonce = base64url(crypto.getRandomValues(new Uint8Array(16)))
  const exp = Math.floor(Date.now() / 1000) + COOKIE_MAX_AGE
  const payload = base64url(encoder.encode(JSON.stringify({ exp, nonce })))
  const sig = await hmac(secret, payload)
  return `${payload}.${sig}`
}

export async function verifyToken(token: string): Promise<boolean> {
  const secret = getSecret()
  if (!secret || !token) return false
  const dot = token.indexOf('.')
  if (dot < 1) return false
  const payload = token.slice(0, dot)
  const sig = token.slice(dot + 1)

  const expected = await hmac(secret, payload)
  if (!timingSafeEqual(sig, expected)) return false

  try {
    const decoded = JSON.parse(new TextDecoder().decode(base64urlToBytes(payload)))
    if (typeof decoded?.exp !== 'number') return false
    if (Math.floor(Date.now() / 1000) > decoded.exp) return false
  } catch {
    return false
  }
  return true
}

// Constant-time password check. Both sides are HMACed to a fixed-length digest
// first, so neither the comparison nor the password length leaks via timing.
export async function passwordMatches(input: unknown): Promise<boolean> {
  const expected = process.env.ADMIN_PASSWORD
  const secret = getSecret()
  if (!expected || !secret || typeof input !== 'string') return false
  const a = await hmac(secret, input)
  const b = await hmac(secret, expected)
  return timingSafeEqual(a, b)
}
