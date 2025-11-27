import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://thepanicmanual.com'

  // Static pages
  const staticPages = [
    '',
    '/guides',
    '/prompts',
    '/about',
    '/privacy',
    '/terms',
  ]

  // Guide categories and their guides
  const guides = [
    // Medical Bills
    { category: 'medical-bills', slug: 'huge-medical-bill' },
    { category: 'medical-bills', slug: 'itemized-bill' },
    { category: 'medical-bills', slug: 'negotiate-payment' },
    { category: 'medical-bills', slug: 'predatory-tactics' },
    // Debt Collection
    { category: 'debt-collection', slug: 'collections-letter' },
    { category: 'debt-collection', slug: 'debt-validation' },
    // Using AI
    { category: 'using-ai', slug: 'why-trust-ai' },
    { category: 'using-ai', slug: 'protect-your-privacy' },
    { category: 'using-ai', slug: 'getting-started' },
    // Job Search
    { category: 'job-search', slug: 'analyze-job-posting' },
    { category: 'job-search', slug: 'match-your-skills' },
    { category: 'job-search', slug: 'stand-out-applications' },
  ]

  const now = new Date()

  return [
    // Static pages
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page}`,
      lastModified: now,
      changeFrequency: page === '' ? 'weekly' as const : 'monthly' as const,
      priority: page === '' ? 1 : page === '/guides' ? 0.9 : 0.7,
    })),

    // Guide pages
    ...guides.map((guide) => ({
      url: `${baseUrl}/guides/${guide.category}/${guide.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
