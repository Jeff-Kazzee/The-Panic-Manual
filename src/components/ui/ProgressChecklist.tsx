'use client'

import { useState, useEffect, useId } from 'react'

interface ChecklistItem {
  id: string
  label: string
}

interface ProgressChecklistProps {
  guideId: string
  items: ChecklistItem[]
}

export function ProgressChecklist({ guideId, items }: ProgressChecklistProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())
  const [mounted, setMounted] = useState(false)
  const headingId = useId()

  const storageKey = `progress-${guideId}`

  useEffect(() => {
    // Load from localStorage on mount
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setCheckedItems(new Set(parsed))
      } catch {
        // Invalid data, start fresh
      }
    }
    setMounted(true)
  }, [storageKey])

  useEffect(() => {
    // Save to localStorage when checkedItems changes
    if (mounted) {
      localStorage.setItem(storageKey, JSON.stringify([...checkedItems]))
    }
  }, [checkedItems, storageKey, mounted])

  const handleToggle = (itemId: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev)
      if (next.has(itemId)) {
        next.delete(itemId)
      } else {
        next.add(itemId)
      }
      return next
    })
  }

  const progress = items.length > 0 ? Math.round((checkedItems.size / items.length) * 100) : 0
  const isComplete = progress === 100

  if (!mounted) {
    // Prevent hydration mismatch
    return (
      <div className="rounded-xl border border-[var(--color-background-200)] bg-[var(--color-background-100)] p-4 md:p-6">
        <div className="h-6 bg-[var(--color-background-200)] rounded animate-pulse mb-4" />
        {items.map((item) => (
          <div key={item.id} className="h-8 bg-[var(--color-background-200)] rounded animate-pulse mb-2" />
        ))}
      </div>
    )
  }

  return (
    <div
      className="rounded-xl border border-[var(--color-background-200)] bg-[var(--color-background-100)] p-4 md:p-6"
      role="region"
      aria-labelledby={headingId}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 id={headingId} className="font-display text-lg font-semibold">
          Your Progress
        </h3>
        <span
          data-testid="progress-percentage"
          className={`text-sm font-medium ${isComplete ? 'text-[var(--color-success)]' : 'text-[var(--color-text-muted)]'}`}
        >
          {progress}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-[var(--color-background-200)] rounded-full mb-4 overflow-hidden">
        <div
          className="h-full bg-[var(--color-primary)] transition-all duration-300 rounded-full"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>

      {/* Checklist items */}
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <label className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-[var(--color-background-200)] transition-colors">
              <input
                type="checkbox"
                checked={checkedItems.has(item.id)}
                onChange={() => handleToggle(item.id)}
                className="w-5 h-5 rounded border-2 border-[var(--color-background-300)] text-[var(--color-primary)] focus:ring-[var(--color-primary)] focus:ring-offset-[var(--color-background)] cursor-pointer"
              />
              <span className={checkedItems.has(item.id) ? 'line-through text-[var(--color-text-muted)]' : ''}>
                {item.label}
              </span>
            </label>
          </li>
        ))}
      </ul>

      {/* Completion message */}
      {isComplete && (
        <div className="mt-4 p-4 bg-[var(--color-success)] bg-opacity-10 rounded-lg text-center">
          <p className="text-[var(--color-success)] font-semibold">
            🎉 Complete! Great work taking control of your situation.
          </p>
        </div>
      )}
    </div>
  )
}
