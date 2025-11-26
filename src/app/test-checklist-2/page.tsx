import { ProgressChecklist } from '@/components/ui/ProgressChecklist'

export default function TestChecklist2Page() {
  const items = [
    { id: 'step-1', label: 'Read the collection letter carefully' },
    { id: 'step-2', label: 'Note the debt validation deadline' },
    { id: 'step-3', label: 'Send debt validation request' },
  ]

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <h1 className="font-display text-3xl font-bold mb-8">Different Guide Checklist</h1>
      <ProgressChecklist guideId="test-guide-2" items={items} />
    </main>
  )
}
