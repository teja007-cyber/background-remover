import { MetadataRoute } from 'next'

const SITE_URL = 'https://background-remover-ucpa.onrender.com'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/cookies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/dmca`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date('2026-07-28'),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog/how-to-remove-background-from-image`,
      lastModified: new Date('2026-07-28'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog/best-free-background-remover-tools`,
      lastModified: new Date('2026-07-27'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/blog/remove-white-background-ecommerce`,
      lastModified: new Date('2026-07-26'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/blog/background-remover-vs-photoshop`,
      lastModified: new Date('2026-07-25'),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]
}
