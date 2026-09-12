/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@vercel/blob'],
    // lucide-react ships ~1000 icons; make the per-icon tree-shaking explicit
    // rather than relying on the bundler inferring it.
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
    ],
  },
  // Performance optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Enable React strict mode for better performance insights
  reactStrictMode: true,
  // The case-studies section was retired; its URLs may still be indexed, so send
  // them to the language home rather than letting them 404.
  //
  // The unprefixed routes below used to be `redirect()` calls inside page
  // components, which answer 307 (temporary) and cost a serverless render.
  // Declaring them here makes them permanent 308s resolved at the edge, so any
  // link equity on the old URLs consolidates onto the locale-prefixed ones.
  async redirects() {
    return [
      { source: '/bg/kazusi', destination: '/bg', permanent: true },
      { source: '/bg/kazusi/:slug*', destination: '/bg', permanent: true },
      { source: '/en/case-studies', destination: '/en', permanent: true },
      { source: '/en/case-studies/:slug*', destination: '/en', permanent: true },
      { source: '/', destination: '/bg', permanent: true },
      { source: '/blog', destination: '/bg/blog', permanent: true },
      // Exclude anything with a file extension: public/blog/ holds the post
      // thumbnails, and a bare ':slug*' matched those too, 308-ing every
      // thumbnail to a 404 instead of serving the SVG.
      { source: '/blog/:slug((?!.*\\.).*)', destination: '/bg/blog/:slug', permanent: true },
      { source: '/tools', destination: '/bg/tools', permanent: true },
      { source: '/estimate', destination: '/bg/estimate', permanent: true },
    ]
  },
  async headers() {
    // Analytics scripts already live on the site (GA4, Tag Manager, MS Clarity);
    // they must be explicitly allowed or the CSP would silently stop tracking.
    const analytics = [
      'https://www.googletagmanager.com',
      'https://*.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://*.google-analytics.com',
      'https://*.analytics.google.com',
      'https://www.clarity.ms',
      'https://*.clarity.ms',
    ].join(' ')

    // Next.js dev mode (webpack HMR / React Refresh) evaluates bundled code via
    // eval(); without 'unsafe-eval' the dev client crashes and nothing hydrates
    // (framer-motion content stays invisible). Production never needs eval, so it
    // stays strict.
    const isDev = process.env.NODE_ENV !== 'production'
    const scriptEval = isDev ? " 'unsafe-eval'" : ''

    const csp = [
      "default-src 'self'",
      // Next.js injects inline bootstrap scripts; 'unsafe-inline' is required
      // without a nonce setup. XSS is additionally mitigated by HTML sanitization.
      `script-src 'self' 'unsafe-inline'${scriptEval} ${analytics}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https:",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      'upgrade-insecure-requests',
    ].join('; ')

    return [
      {
        // Files under public/ are served with `max-age=0` by default, so the
        // logo and social images were revalidated on every page load. They are
        // not content-hashed, so cache for a day and refresh in the background
        // rather than marking them immutable.
        source: '/:all*(svg|png|jpg|jpeg|webp|avif|ico|woff2)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        // The admin CMS and the internal content-OS tool have no business in
        // search results. robots.txt stops the crawl; this stops the URL being
        // indexed anyway if someone links to it. Works for client components,
        // which cannot export `metadata`.
        source: '/:path(admin|os)/:rest*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/:path(admin|os)',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
      {
        source: '/:path*',
        headers: [
          { key: 'Content-Security-Policy', value: csp },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
