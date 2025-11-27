import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About | The Panic Manual',
  description: 'Why we built The Panic Manual and how you can help.',
}

export default function AboutPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen py-12 px-6 outline-none">
      <article className="max-w-3xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <li><Link href="/" className="hover:text-[var(--color-primary)]">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">About</li>
          </ol>
        </nav>

        <header className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">
            You shouldn&apos;t need a lawyer to read your mail.
          </h1>
          <p className="text-[var(--color-text-muted)] text-xl leading-relaxed">
            Medical bills and collection letters are designed to confuse you. We&apos;re here to change that.
          </p>
        </header>

        <div className="prose prose-lg max-w-none space-y-10">
          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">The Problem</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
              Every year, millions of Americans receive bills they don&apos;t understand for amounts they can&apos;t afford. The system is broken:
            </p>
            <ul className="space-y-3 text-[var(--color-text-muted)]">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-accent)] font-semibold">80%</span>
                <span>of medical bills contain errors</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-accent)] font-semibold">43%</span>
                <span>of people with debt in collections don&apos;t know they owe it</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-accent)] font-semibold">$140B+</span>
                <span>in medical debt sits on Americans&apos; credit reports</span>
              </li>
            </ul>
            <p className="text-[var(--color-text-muted)] leading-relaxed mt-4">
              The institutions sending these documents have armies of lawyers and billing specialists. You have... Google. That&apos;s not a fair fight.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">The Solution</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
              AI has changed the game. Tools like ChatGPT and Claude can analyze complex documents, explain jargon in plain English, spot billing errors, and help you craft responses—all for free.
            </p>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              But most people don&apos;t know what to ask. That&apos;s where we come in.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">What We Do</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
              The Panic Manual gives you:
            </p>
            <ul className="space-y-4 text-[var(--color-text-muted)]">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-primary)] text-xl">📋</span>
                <div>
                  <strong className="text-[var(--color-text)]">Step-by-step guides</strong>
                  <p className="mt-1 mb-0">Walk through the entire process, from opening the envelope to resolution</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-primary)] text-xl">🤖</span>
                <div>
                  <strong className="text-[var(--color-text)]">Copy-paste AI prompts</strong>
                  <p className="mt-1 mb-0">Expert-crafted prompts that get useful answers, not generic ones</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-primary)] text-xl">💡</span>
                <div>
                  <strong className="text-[var(--color-text)]">&quot;Why This Works&quot; explanations</strong>
                  <p className="mt-1 mb-0">Understand the strategy, not just the tactics</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-primary)] text-xl">✓</span>
                <div>
                  <strong className="text-[var(--color-text)]">Progress tracking</strong>
                  <p className="mt-1 mb-0">Keep track of what you&apos;ve done (saved on your device, not our servers)</p>
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">Our Values</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-5 rounded-xl border border-[var(--color-background-200)] bg-[var(--color-background-100)]">
                <h3 className="font-display text-lg font-semibold mb-2">Free Forever</h3>
                <p className="text-[var(--color-text-muted)] text-sm mb-0">
                  Financial stress shouldn&apos;t require a credit card to solve. No paywalls, ever.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-[var(--color-background-200)] bg-[var(--color-background-100)]">
                <h3 className="font-display text-lg font-semibold mb-2">Privacy First</h3>
                <p className="text-[var(--color-text-muted)] text-sm mb-0">
                  No tracking, no analytics, no selling your data. Your business is your business.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-[var(--color-background-200)] bg-[var(--color-background-100)]">
                <h3 className="font-display text-lg font-semibold mb-2">No Shame</h3>
                <p className="text-[var(--color-text-muted)] text-sm mb-0">
                  Debt isn&apos;t a moral failing. You&apos;re not broken. The system is.
                </p>
              </div>
              <div className="p-5 rounded-xl border border-[var(--color-background-200)] bg-[var(--color-background-100)]">
                <h3 className="font-display text-lg font-semibold mb-2">Plain Language</h3>
                <p className="text-[var(--color-text-muted)] text-sm mb-0">
                  No legalese, no condescension. We explain things like a knowledgeable friend.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">How You Can Help</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
              If this resource helped you, consider:
            </p>
            <ul className="space-y-3 text-[var(--color-text-muted)]">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-primary)]">→</span>
                <span><strong className="text-[var(--color-text)]">Sharing it</strong> with someone who needs it</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-primary)]">→</span>
                <span><strong className="text-[var(--color-text)]">Suggesting improvements</strong> — we&apos;re always learning</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-primary)]">→</span>
                <span><strong className="text-[var(--color-text)]">Contributing content</strong> — especially if you have professional expertise</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">Get in Touch</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              Questions, suggestions, or just want to say hi?{' '}
              <a href="mailto:hello@thepanicmanual.com" className="text-[var(--color-primary)] hover:underline">
                hello@thepanicmanual.com
              </a>
            </p>
          </section>

          <section className="pt-8 border-t border-[var(--color-background-200)]">
            <p className="text-[var(--color-text-muted)] italic">
              &quot;The best time to fight a bill was when it arrived. The second best time is now.&quot;
            </p>
          </section>
        </div>
      </article>
    </main>
  )
}
