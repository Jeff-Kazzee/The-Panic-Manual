import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { BreathBox } from '@/components/ui/BreathBox'

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen relative outline-none overflow-hidden">
      {/* Hero background - multi-layered gradient */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Primary glow from top */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 100% 60% at 50% -10%, var(--color-primary), transparent 70%)',
            opacity: 0.2,
          }}
        />
        {/* Accent glow from corner */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 50% 50% at 90% 10%, var(--color-accent), transparent 60%)',
            opacity: 0.15,
          }}
        />
        {/* Secondary glow from left */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 40% 60% at 10% 30%, var(--color-primary), transparent 50%)',
            opacity: 0.1,
          }}
        />
        {/* Mesh gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              conic-gradient(from 180deg at 50% 50%,
                transparent 0deg,
                var(--color-primary) 60deg,
                transparent 120deg,
                var(--color-accent) 180deg,
                transparent 240deg,
                var(--color-primary) 300deg,
                transparent 360deg
              )
            `,
            opacity: 0.03,
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <div className="max-w-4xl mx-auto pt-16 md:pt-24 px-6 md:px-8 relative">
        {/* Hero Section */}
        <header className="text-center mb-16 animate-fade-in-up">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            The Panic Manual
          </h1>
          <p className="text-text-muted text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
            AI-powered guides to fight back against confusing medical bills and collection letters
          </p>
        </header>

        {/* Breath Box */}
        <div className="mb-16 animate-fade-in-up stagger-1">
          <BreathBox
            message="You're not going to jail. This is solvable. Let's figure it out together."
          />
        </div>

        {/* What landed in your mailbox? */}
        <section aria-labelledby="mailbox-heading" className="mb-16 animate-fade-in-up stagger-2">
          <h2 id="mailbox-heading" className="font-display text-2xl md:text-3xl font-semibold mb-8 text-center">
            What landed in your mailbox?
          </h2>
          <nav aria-label="Guide categories">
            <ul className="grid gap-6 md:grid-cols-2" data-testid="category-nav">
              <li className="animate-fade-in-up stagger-3">
                <Link
                  href="/guides/medical-bills"
                  className="group block p-8 rounded-2xl border border-[var(--color-background-200)] bg-[var(--color-background-100)] hover-lift focus-ring text-center relative overflow-hidden"
                >
                  <span
                    className="text-5xl block mb-4 transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  >
                    🏥
                  </span>
                  <span className="font-display text-xl font-semibold block mb-2">Medical Bills</span>
                  <span className="text-[var(--color-text-muted)] text-sm block">
                    Fight back against confusing hospital bills
                  </span>
                </Link>
              </li>
              <li className="animate-fade-in-up stagger-4">
                <Link
                  href="/guides/debt-collection"
                  className="group block p-8 rounded-2xl border border-[var(--color-background-200)] bg-[var(--color-background-100)] hover-lift focus-ring text-center relative overflow-hidden"
                >
                  <span
                    className="text-5xl block mb-4 transition-transform duration-300 group-hover:scale-110"
                    aria-hidden="true"
                  >
                    📬
                  </span>
                  <span className="font-display text-xl font-semibold block mb-2">Debt Collection</span>
                  <span className="text-[var(--color-text-muted)] text-sm block">
                    Know your rights when collectors call
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </section>

        {/* Quick links */}
        <div className="text-center pb-12 animate-fade-in-up stagger-5">
          <Link
            href="/guides"
            className="inline-flex items-center gap-1 text-[var(--color-primary)] hover:underline focus-ring rounded px-2 py-1 transition-colors"
          >
            Browse all guides
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <span className="mx-4 text-[var(--color-text-muted)]">|</span>
          <Link
            href="/prompts"
            className="inline-flex items-center gap-1 text-[var(--color-primary)] hover:underline focus-ring rounded px-2 py-1 transition-colors"
          >
            Prompt library
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  )
}
