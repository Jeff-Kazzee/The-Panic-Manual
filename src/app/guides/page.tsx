import Link from 'next/link'

interface GuideCategory {
  slug: string
  title: string
  description: string
  icon: string
  guides: {
    slug: string
    title: string
    description: string
  }[]
}

const categories: GuideCategory[] = [
  {
    slug: 'medical-bills',
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
  {
    slug: 'debt-collection',
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
  {
    slug: 'using-ai',
    title: 'Using AI Safely',
    description: 'How to use AI tools effectively while protecting your privacy',
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
  {
    slug: 'job-search',
    title: 'Job Search',
    description: 'Use AI to find better jobs and stand out from the crowd',
    icon: '💼',
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
]

export default function GuidesPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen p-8 outline-none">
      <div className="max-w-4xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <li><Link href="/" className="hover:text-[var(--color-primary)]">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Guides</li>
          </ol>
        </nav>

        <h1 className="font-display text-4xl font-bold mb-4">Panic Guides</h1>
        <p className="text-[var(--color-text-muted)] text-lg mb-12">
          Step-by-step guides to help you navigate confusing financial situations
        </p>

        <div className="space-y-12">
          {categories.map((category) => (
            <section key={category.slug} aria-labelledby={`category-${category.slug}`}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl" aria-hidden="true">{category.icon}</span>
                <div>
                  <h2 id={`category-${category.slug}`} className="font-display text-2xl font-semibold">
                    {category.title}
                  </h2>
                  <p className="text-[var(--color-text-muted)]">{category.description}</p>
                </div>
              </div>

              <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" data-testid={`guide-list-${category.slug}`}>
                {category.guides.map((guide) => (
                  <li key={guide.slug}>
                    <Link
                      href={`/guides/${category.slug}/${guide.slug}`}
                      className="block p-6 rounded-xl border border-[var(--color-background-200)] bg-[var(--color-background-100)] hover:border-[var(--color-primary)] transition-colors"
                    >
                      <h3 className="font-display text-lg font-semibold mb-2">{guide.title}</h3>
                      <p className="text-[var(--color-text-muted)] text-sm">{guide.description}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  )
}
