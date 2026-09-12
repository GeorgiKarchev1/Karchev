import { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            // /admin is the CMS, /os the internal content tool, /api has no
            // crawlable content. The old '/private/' rule guarded a path that
            // has never existed in this app.
            disallow: ['/admin', '/os', '/api/'],
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    }
}
