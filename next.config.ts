import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  // The previous site lived under /bg and /en with a blog and service pages.
  // Those URLs are indexed, so they 308 to the new single-page home (or the
  // matching legal page) instead of 404-ing and losing their link equity.
  async redirects() {
    return [
      { source: '/politiki/poveritelnost', destination: '/legal/privacy', permanent: true },
      { source: '/politiki/obshti-uslovia', destination: '/legal/terms-of-service', permanent: true },
      { source: '/politiki/biskvitki', destination: '/legal/cookies', permanent: true },
      { source: '/policies/privacy-policy', destination: '/legal/privacy', permanent: true },
      { source: '/policies/terms-of-service', destination: '/legal/terms-of-service', permanent: true },
      { source: '/bg', destination: '/', permanent: true },
      { source: '/bg/:path*', destination: '/', permanent: true },
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/:path*', destination: '/', permanent: true },
      { source: '/blog/:path*', destination: '/', permanent: true },
      { source: '/resources/karchx-12-proverki.pdf', destination: '/karchx-12-proverki.pdf', permanent: true },
      { source: '/tools', destination: '/', permanent: true },
      { source: '/estimate', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
