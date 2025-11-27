import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Use | The Panic Manual',
  description: 'Terms of use for The Panic Manual - educational content, not legal advice.',
}

export default function TermsPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen py-12 px-6 outline-none">
      <article className="max-w-3xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <li><Link href="/" className="hover:text-[var(--color-primary)]">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Terms of Use</li>
          </ol>
        </nav>

        <header className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Terms of Use</h1>
          <p className="text-[var(--color-text-muted)] text-lg">
            Last updated: November 2024
          </p>
        </header>

        <div className="prose prose-lg max-w-none space-y-8">
          {/* Important Notice Box */}
          <div
            className="p-6 rounded-xl border-l-4 border-[var(--color-accent)]"
            style={{ backgroundColor: 'var(--color-breath)' }}
          >
            <h2 className="font-display text-xl font-semibold mb-3 mt-0">Important: This Is Educational Content</h2>
            <p className="text-[var(--color-text-muted)] mb-0 leading-relaxed">
              The Panic Manual provides <strong className="text-[var(--color-text)]">educational information</strong> to help you understand your options. We are not lawyers, doctors, or financial advisors. Nothing here is professional advice.
            </p>
          </div>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">What We Provide</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
              The Panic Manual offers:
            </p>
            <ul className="space-y-3 text-[var(--color-text-muted)]">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-primary)]">•</span>
                <span>Educational guides about navigating medical bills and debt collection</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-primary)]">•</span>
                <span>AI prompt templates you can use with ChatGPT, Claude, and similar tools</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-primary)]">•</span>
                <span>General information about your rights as a consumer</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-primary)]">•</span>
                <span>Starting points for your own research</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">What We Don&apos;t Provide</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
              Our content is <strong className="text-[var(--color-text)]">not</strong> a substitute for:
            </p>
            <ul className="space-y-3 text-[var(--color-text-muted)]">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-accent)]">✕</span>
                <span><strong className="text-[var(--color-text)]">Legal advice</strong> — If you&apos;re being sued, consult a lawyer</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-accent)]">✕</span>
                <span><strong className="text-[var(--color-text)]">Medical advice</strong> — Questions about your health? See a doctor</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-accent)]">✕</span>
                <span><strong className="text-[var(--color-text)]">Financial advice</strong> — Major money decisions? Consult a professional</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-accent)]">✕</span>
                <span><strong className="text-[var(--color-text)]">Tax advice</strong> — Debt forgiveness has tax implications—ask a CPA</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">Accuracy &amp; Limitations</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
              We work hard to keep our information accurate, but:
            </p>
            <ul className="space-y-3 text-[var(--color-text-muted)]">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-text)]">•</span>
                <span>Laws change. What&apos;s true today may not be true tomorrow.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-text)]">•</span>
                <span>Laws vary by state. Your state may have different rules.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-text)]">•</span>
                <span>Every situation is unique. General advice may not apply to you.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-text)]">•</span>
                <span>AI tools can make mistakes. Always verify their outputs.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">Using AI Tools</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
              When you use our prompts with AI services like ChatGPT or Claude:
            </p>
            <ul className="space-y-3 text-[var(--color-text-muted)]">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-text)]">•</span>
                <span>You&apos;re interacting with <em>their</em> service, not ours</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-text)]">•</span>
                <span>AI outputs can be wrong, outdated, or hallucinated</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-text)]">•</span>
                <span>You&apos;re responsible for verifying any AI-generated information</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-text)]">•</span>
                <span>Protect your privacy when sharing documents with AI—see our <Link href="/guides/using-ai/protect-your-privacy" className="text-[var(--color-primary)] hover:underline">privacy guide</Link></span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">Your Responsibility</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              By using this site, you agree to use the information responsibly. Verify facts before acting on them. Seek professional help when you need it. Don&apos;t rely solely on our guides—or any single resource—for important decisions.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">Free to Use</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              The Panic Manual is free. You can share our guides and prompts. We just ask that you don&apos;t misrepresent the content or claim it as your own.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              Questions? Reach out at{' '}
              <a href="mailto:hello@thepanicmanual.com" className="text-[var(--color-primary)] hover:underline">
                hello@thepanicmanual.com
              </a>
            </p>
          </section>

          <section className="pt-8 border-t border-[var(--color-background-200)]">
            <p className="text-[var(--color-text-muted)] text-sm">
              We may update these terms as needed. Continued use of the site constitutes acceptance of updated terms.
            </p>
          </section>
        </div>
      </article>
    </main>
  )
}
