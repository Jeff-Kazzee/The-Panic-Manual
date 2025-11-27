import Link from 'next/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[var(--color-background-100)] border-t border-[var(--color-background-200)] mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Column */}
          <div>
            <h2 className="font-display text-sm font-semibold text-[var(--color-text)] uppercase tracking-wider mb-4">
              Navigate
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/guides"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors focus-ring rounded px-1 -ml-1"
                >
                  Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/prompts"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors focus-ring rounded px-1 -ml-1"
                >
                  Prompts
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h2 className="font-display text-sm font-semibold text-[var(--color-text)] uppercase tracking-wider mb-4">
              Legal
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors focus-ring rounded px-1 -ml-1"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors focus-ring rounded px-1 -ml-1"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h2 className="font-display text-sm font-semibold text-[var(--color-text)] uppercase tracking-wider mb-4">
              About
            </h2>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors focus-ring rounded px-1 -ml-1"
                >
                  Our Mission
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-[var(--color-background-200)]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-[var(--color-text-muted)] text-sm">
              &copy; {currentYear} The Panic Manual. Made with care.
            </p>
            <p className="text-[var(--color-text-muted)] text-sm">
              Free resources to help you fight back.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
