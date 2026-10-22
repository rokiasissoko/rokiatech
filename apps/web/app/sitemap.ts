import type { MetadataRoute } from 'next'
import { pressVideos, videoWatchPath } from '@/lib/press'

const SITE_URL = 'https://rokiatech.co'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/work`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/research`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/press`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'yearly', priority: 0.5 },
    ...pressVideos.map(({ slug }) => ({
      url: `${SITE_URL}${videoWatchPath(slug)}`,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),
  ]
}
