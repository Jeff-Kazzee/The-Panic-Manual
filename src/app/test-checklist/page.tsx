import { ProgressChecklist } from '@/components/ui/ProgressChecklist'

export default function TestChecklistPage() {
  const items = [
    { id: 'step-1', label: 'Request an itemized bill' },
    { id: 'step-2', label: 'Review each line item' },
    { id: 'step-3', label: 'Identify potential errors' },
    { id: 'step-4', label: 'Research fair pricing' },
    { id: 'step-5', label: 'Draft dispute letter' },
  ]

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen p-8 max-w-2xl mx-auto outline-none">
      <h1 className="font-display text-3xl font-bold mb-8">Progress Checklist Test Page</h1>
      <h2 className="sr-only">Checklist</h2>
      <ProgressChecklist guideId="test-guide-1" items={items} />
    </main>
  )
}
