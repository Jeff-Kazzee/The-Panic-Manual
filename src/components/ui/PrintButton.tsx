'use client'

export function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="text-[var(--color-primary)] underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] rounded"
    >
      Print this guide
    </button>
  )
}
