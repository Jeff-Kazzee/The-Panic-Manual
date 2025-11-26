'use client'

import { useId, useSyncExternalStore, useCallback } from 'react'

interface ChecklistItem {
  id: string
  label: string
}

interface ProgressChecklistProps {
  guideId: string
  items: ChecklistItem[]
}

// Subscribe to nothing for mounted check
const emptySubscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

// Create a localStorage store for a specific key
function createLocalStorageStore(key: string) {
  const listeners = new Set<() => void>()

  const subscribe = (callback: () => void) => {
    listeners.add(callback)
    return () => listeners.delete(callback)
  }

  const getSnapshot = () => {
    if (typeof window === 'undefined') return null
    return localStorage.getItem(key)
  }

  const getServerSnapshotValue = () => null

  const setValue = (value: string) => {
    localStorage.setItem(key, value)
    listeners.forEach((listener) => listener())
  }

  return { subscribe, getSnapshot, getServerSnapshot: getServerSnapshotValue, setValue }
}

export function ProgressChecklist({ guideId, items }: ProgressChecklistProps) {
  const headingId = useId()
  const storageKey = `progress-${guideId}`

  const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot)

  // Create store for this specific key
  const store = createLocalStorageStore(storageKey)

  const rawValue = useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot)

  // Parse the stored value into a Set
  const checkedItems: Set<string> = (() => {
    if (!rawValue) return new Set()
    try {
      return new Set(JSON.parse(rawValue))
    } catch {
      return new Set()
    }
  })()

  const handleToggle = useCallback(
    (itemId: string) => {
      const next = new Set(checkedItems)
      if (next.has(itemId)) {
        next.delete(itemId)
      } else {
        next.add(itemId)
      }
      store.setValue(JSON.stringify([...next]))
    },
    [checkedItems, store]
  )

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
      className="rounded-2xl border border-[var(--color-background-200)] bg-[var(--color-background-100)] p-5 md:p-6 elevation-1"
      role="region"
      aria-labelledby={headingId}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 id={headingId} className="font-display text-lg font-semibold">
          Your Progress
        </h3>
        <span
          data-testid="progress-percentage"
          className={`text-sm font-medium transition-colors duration-300 ${isComplete ? 'text-[var(--color-success)]' : 'text-[var(--color-text-muted)]'}`}
        >
          {progress}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-3 bg-[var(--color-background-200)] rounded-full mb-5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Progress: ${progress}%`}
        />
      </div>

      {/* Checklist items */}
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={item.id} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
            <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl hover:bg-[var(--color-background-200)] transition-all duration-200 group">
              <div className="relative flex-shrink-0">
                <input
                  type="checkbox"
                  checked={checkedItems.has(item.id)}
                  onChange={() => handleToggle(item.id)}
                  className="w-5 h-5 rounded-md border-2 border-[var(--color-background-300)] text-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:ring-offset-[var(--color-background)] cursor-pointer transition-all duration-200"
                />
                {checkedItems.has(item.id) && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg
                      className="w-3 h-3 text-white animate-check-bounce"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <span
                className={`transition-all duration-200 ${
                  checkedItems.has(item.id)
                    ? 'line-through text-[var(--color-text-muted)] opacity-70'
                    : 'group-hover:text-[var(--color-primary)]'
                }`}
              >
                {item.label}
              </span>
            </label>
          </li>
        ))}
      </ul>

      {/* Completion message */}
      {isComplete && (
        <div className="mt-5 p-4 bg-[var(--color-success)] bg-opacity-10 rounded-xl text-center border border-[var(--color-success)] border-opacity-20 animate-fade-in-scale">
          <p className="text-[var(--color-success)] font-semibold">
            🎉 Complete! Great work taking control of your situation.
          </p>
        </div>
      )}
    </div>
  )
}
