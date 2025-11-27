import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | The Panic Manual',
  description: 'How we protect your privacy - no tracking, no ads, just help.',
}

export default function PrivacyPage() {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen py-12 px-6 outline-none">
      <article className="max-w-3xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <li><Link href="/" className="hover:text-[var(--color-primary)]">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Privacy Policy</li>
          </ol>
        </nav>

        <header className="mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-[var(--color-text-muted)] text-lg">
            Last updated: November 2024
          </p>
        </header>

        <div className="prose prose-lg max-w-none space-y-8">
          {/* TL;DR Box */}
          <div
            className="p-6 rounded-xl border border-[var(--color-background-200)] bg-[var(--color-background-100)]"
          >
            <h2 className="font-display text-xl font-semibold mb-3 mt-0">The Short Version</h2>
            <ul className="space-y-2 text-[var(--color-text-muted)] list-none pl-0 mb-0">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-success)] mt-1">✓</span>
                <span>We don&apos;t track you</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-success)] mt-1">✓</span>
                <span>We don&apos;t sell your data (we don&apos;t have any to sell)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-success)] mt-1">✓</span>
                <span>We don&apos;t show ads</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-success)] mt-1">✓</span>
                <span>Your progress stays on your device</span>
              </li>
            </ul>
          </div>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">What We Collect</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              <strong className="text-[var(--color-text)]">Nothing.</strong> We don&apos;t use analytics. We don&apos;t have cookies. We don&apos;t track your visits, your clicks, or your reading habits. We built this site to help people, not to harvest data.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">Local Storage</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
              We use your browser&apos;s local storage for two things:
            </p>
            <ul className="space-y-3 text-[var(--color-text-muted)]">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-primary)] font-semibold">1.</span>
                <span><strong className="text-[var(--color-text)]">Theme preference</strong> — Whether you prefer dark or light mode</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-primary)] font-semibold">2.</span>
                <span><strong className="text-[var(--color-text)]">Checklist progress</strong> — Which steps you&apos;ve completed in our guides</span>
              </li>
            </ul>
            <p className="text-[var(--color-text-muted)] leading-relaxed mt-4">
              This data never leaves your device. We can&apos;t see it. We can&apos;t access it. It&apos;s yours. You can clear it anytime in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">Third-Party Services</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
              We keep external dependencies minimal:
            </p>
            <ul className="space-y-3 text-[var(--color-text-muted)]">
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-text)]">•</span>
                <span><strong className="text-[var(--color-text)]">Hosting</strong> — Vercel, for serving the site. They have their own <a href="https://vercel.com/legal/privacy-policy" className="text-[var(--color-primary)] hover:underline" target="_blank" rel="noopener noreferrer">privacy policy</a>.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[var(--color-text)]">•</span>
                <span><strong className="text-[var(--color-text)]">Fonts</strong> — Self-hosted. No Google Fonts, no external font services.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">AI Prompts &amp; Your Documents</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
              When you copy our AI prompts and paste your documents into ChatGPT, Claude, or other AI services, that data goes to <em>those</em> companies—not to us. We never see your bills, letters, or personal information.
            </p>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              Check out our <Link href="/guides/using-ai/protect-your-privacy" className="text-[var(--color-primary)] hover:underline">privacy guide for AI tools</Link> to learn how to safely share documents with AI services.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">Contact</h2>
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              Questions about privacy? Reach out at{' '}
              <a href="mailto:privacy@thepanicmanual.com" className="text-[var(--color-primary)] hover:underline">
                privacy@thepanicmanual.com
              </a>
            </p>
          </section>

          <section className="pt-8 border-t border-[var(--color-background-200)]">
            <p className="text-[var(--color-text-muted)] text-sm">
              We may update this policy as the site evolves. Material changes will be noted at the top of this page.
            </p>
          </section>
        </div>
      </article>
    </main>
  )
}
