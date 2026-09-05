import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site.config'
import { guides } from '@/lib/guides'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    '',
    '/download',
    '/app',
    '/features',
    '/changelog',
    '/guides',
    '/faq',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
    '/user-content-disclaimer',
    '/dmca',
    '/cookie-policy',
  ]

  const guidePaths = guides.map((g) => `/guides/${g.slug}`)

  return [...staticPaths, ...guidePaths].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' || path === '/download' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : path === '/download' ? 0.9 : 0.6,
  }))
}
