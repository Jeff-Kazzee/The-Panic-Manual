import Link from 'next/link'
import { notFound } from 'next/navigation'

interface CategoryData {
  title: string
  description: string
  icon: string
  guides: {
    slug: string
    title: string
    description: string
  }[]
}

const categoriesData: Record<string, CategoryData> = {
  'medical-bills': {
    title: 'Medical Bills',
    description: 'Fight back against confusing hospital bills and insurance claims',
    icon: '🏥',
    guides: [
      {
        slug: 'huge-medical-bill',
        title: 'I Got a Huge Medical Bill',
        description: 'Complete workflow for analyzing and fighting unexpected medical bills',
      },
      {
        slug: 'itemized-bill',
        title: 'How to Request an Itemized Bill',
        description: 'Get the documentation you need to find billing errors',
      },
      {
        slug: 'negotiate-payment',
        title: 'Negotiating Medical Bills',
        description: 'Financial hardship programs and payment negotiation strategies',
      },
      {
        slug: 'predatory-tactics',
        title: 'Predatory Billing Tactics Exposed',
        description: 'How hospitals and collectors manipulate you, and how to fight back',
      },
    ],
  },
  'debt-collection': {
    title: 'Debt Collection',
    description: 'Know your rights when collectors come calling',
    icon: '📬',
    guides: [
      {
        slug: 'collections-letter',
        title: 'I Got a Collections Letter',
        description: 'What to do when a debt collector contacts you',
      },
      {
        slug: 'debt-validation',
        title: 'Debt Validation Rights',
        description: 'Your FDCPA rights and how to request debt validation',
      },
    ],
  },
  'using-ai': {
    title: 'Using AI Safely',
    description: 'Protect your privacy while getting AI help with your documents',
    icon: '🛡️',
    guides: [
      {
        slug: 'why-trust-ai',
        title: 'Why You Can Trust AI for This',
        description: 'How AI levels the playing field and why it works for document analysis',
      },
      {
        slug: 'protect-your-privacy',
        title: 'Protecting Your Privacy with AI',
        description: 'How to safely share documents with AI without exposing sensitive data',
      },
      {
        slug: 'getting-started',
        title: 'Getting Started with AI Tools',
        description: 'A beginner-friendly guide to using ChatGPT, Claude, and other AI tools',
      },
    ],
  },
  'job-search': {
    title: 'Job Search',
    description: 'Use AI to land your next opportunity',
    icon: '🎯',
    guides: [
      {
        slug: 'analyze-job-posting',
        title: 'Analyzing Job Postings',
        description: 'Decode what companies really want and spot red flags before applying',
      },
      {
        slug: 'match-your-skills',
        title: 'Matching Your Skills to Jobs',
        description: 'Find your transferable skills and craft your unique value proposition',
      },
      {
        slug: 'stand-out-applications',
        title: 'Standing Out in Applications',
        description: 'Creative strategies to get noticed by hiring managers',
      },
    ],
  },
}

interface PageProps {
  params: Promise<{
    category: string
  }>
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params

  const categoryData = categoriesData[category]
  if (!categoryData) {
    notFound()
  }

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen p-8 outline-none">
      <div className="max-w-4xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <li><Link href="/" className="hover:text-[var(--color-primary)]">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/guides" className="hover:text-[var(--color-primary)]">Guides</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{categoryData.title}</li>
          </ol>
        </nav>

        <div className="flex items-center gap-4 mb-8">
          <span className="text-5xl" aria-hidden="true">{categoryData.icon}</span>
          <div>
            <h1 className="font-display text-4xl font-bold">{categoryData.title}</h1>
            <p className="text-[var(--color-text-muted)] text-lg">{categoryData.description}</p>
          </div>
        </div>

        <ul className="grid gap-4" data-testid={`guide-list-${category}`}>
          {categoryData.guides.map((guide) => (
            <li key={guide.slug}>
              <Link
                href={`/guides/${category}/${guide.slug}`}
                className="block p-6 rounded-xl border border-[var(--color-background-200)] bg-[var(--color-background-100)] hover:border-[var(--color-primary)] transition-colors"
              >
                <h2 className="font-display text-xl font-semibold mb-2">{guide.title}</h2>
                <p className="text-[var(--color-text-muted)]">{guide.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
