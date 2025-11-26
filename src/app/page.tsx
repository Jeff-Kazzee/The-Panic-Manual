import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen p-8 relative outline-none">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="max-w-4xl mx-auto pt-12">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-center">
          The Panic Manual
        </h1>
        <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto text-center mb-12">
          AI-powered guides to fight back against confusing medical bills and collection letters
        </p>

        {/* Breath Box */}
        <div className="p-6 rounded-xl border-l-4 border-primary mb-12" style={{ backgroundColor: 'var(--color-breath)' }}>
          <p className="font-display text-xl mb-2">Take a breath.</p>
          <p className="text-text-muted">
            You&apos;re not going to jail. This is solvable. Let&apos;s figure it out together.
          </p>
        </div>

        {/* What landed in your mailbox? */}
        <section aria-labelledby="mailbox-heading" className="mb-12">
          <h2 id="mailbox-heading" className="font-display text-2xl font-semibold mb-6 text-center">
            What landed in your mailbox?
          </h2>
          <nav aria-label="Guide categories">
            <ul className="grid gap-4 md:grid-cols-2" data-testid="category-nav">
              <li>
                <Link
                  href="/guides/medical-bills"
                  className="block p-6 rounded-xl border border-[var(--color-background-200)] bg-[var(--color-background-100)] hover:border-[var(--color-primary)] transition-colors text-center"
                >
                  <span className="text-4xl block mb-3" aria-hidden="true">🏥</span>
                  <span className="font-display text-xl font-semibold block mb-2">Medical Bills</span>
                  <span className="text-[var(--color-text-muted)] text-sm">
                    Fight back against confusing hospital bills
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/guides/debt-collection"
                  className="block p-6 rounded-xl border border-[var(--color-background-200)] bg-[var(--color-background-100)] hover:border-[var(--color-primary)] transition-colors text-center"
                >
                  <span className="text-4xl block mb-3" aria-hidden="true">📬</span>
                  <span className="font-display text-xl font-semibold block mb-2">Debt Collection</span>
                  <span className="text-[var(--color-text-muted)] text-sm">
                    Know your rights when collectors call
                  </span>
                </Link>
              </li>
            </ul>
          </nav>
        </section>

        {/* Quick links */}
        <div className="text-center">
          <Link href="/guides" className="text-[var(--color-primary)] hover:underline">
            Browse all guides →
          </Link>
          <span className="mx-4 text-[var(--color-text-muted)]">|</span>
          <Link href="/prompts" className="text-[var(--color-primary)] hover:underline">
            Prompt library →
          </Link>
        </div>
      </div>
    </main>
  );
}
