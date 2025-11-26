'use client'

import { useId } from 'react'

interface BreathBoxProps {
  message: string
  title?: string
}

export function BreathBox({ message, title = 'Take a breath.' }: BreathBoxProps) {
  const titleId = useId()

  return (
    <div
      className="breath-box relative p-6 md:p-8 rounded-2xl overflow-hidden"
      role="region"
      aria-labelledby={titleId}
      style={{ backgroundColor: 'var(--color-breath)' }}
    >
      {/* Animated border */}
      <div
        className="absolute inset-0 rounded-2xl border-2 border-[var(--color-primary)] animate-breathe-border pointer-events-none"
        aria-hidden="true"
      />

      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(135deg, var(--color-primary), transparent)',
          opacity: 0.05,
        }}
      />

      <div className="relative">
        <p
          id={titleId}
          className="font-display text-2xl md:text-3xl mb-3 font-semibold"
        >
          {title}
        </p>
        <p className="text-text-muted text-lg md:text-xl leading-relaxed">
          {message}
        </p>
      </div>
    </div>
  )
}
