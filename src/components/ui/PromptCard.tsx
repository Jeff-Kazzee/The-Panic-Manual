'use client'

import { useState, useId } from 'react'

interface PromptCardProps {
  title: string
  prompt: string
  whyItWorks: string
  watchOutFor?: string[]
}

export function PromptCard({ title, prompt, whyItWorks, watchOutFor }: PromptCardProps) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const contentId = useId()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="prompt-card rounded-2xl border border-[var(--color-background-200)] bg-[var(--color-background-100)] p-5 md:p-6 elevation-1 hover-lift transition-all duration-300">
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="font-display text-lg font-semibold">{title}</h3>
        <button
          onClick={handleCopy}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
            transition-all duration-200 press-effect focus-ring
            ${
              copied
                ? 'bg-[var(--color-success)] text-white'
                : 'bg-[var(--color-primary)] text-white hover:brightness-110'
            }
          `}
          aria-label={copied ? 'Copied to clipboard' : 'Copy prompt to clipboard'}
        >
          {copied ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 animate-check-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      <div className="relative">
        <pre className="bg-[var(--color-background-200)] rounded-xl p-4 overflow-x-auto text-sm whitespace-pre-wrap font-body mb-4 border border-[var(--color-background-300)]">
          {prompt}
        </pre>
      </div>

      <div className="border-t border-[var(--color-background-200)] pt-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2 text-[var(--color-primary)] hover:underline focus-ring rounded px-1 py-0.5"
          aria-expanded={expanded}
          aria-controls={contentId}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Why This Works
        </button>

        <div
          id={contentId}
          className={`grid transition-all duration-300 ease-out ${expanded ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr]'}`}
        >
          <div className={`overflow-hidden ${expanded ? '' : 'invisible'}`}>
            <p className="text-[var(--color-text-muted)] mb-4 animate-fade-in">{whyItWorks}</p>

            {watchOutFor && watchOutFor.length > 0 && (
              <div className="bg-[var(--color-accent)] bg-opacity-10 rounded-xl p-4 border border-[var(--color-accent)] border-opacity-20 animate-fade-in stagger-1">
                <p className="font-semibold mb-2 text-[var(--color-accent)]">Watch Out For:</p>
                <ul className="list-disc list-inside text-[var(--color-text-muted)] space-y-1">
                  {watchOutFor.map((item, index) => (
                    <li key={index} className="animate-slide-in-right" style={{ animationDelay: `${index * 50}ms` }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
