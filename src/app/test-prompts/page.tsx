import { PromptCard } from '@/components/ui/PromptCard'

export default function TestPromptsPage() {
  return (
    <main className="min-h-screen p-8 max-w-3xl mx-auto">
      <h1 className="font-display text-3xl font-bold mb-8">Prompt Card Test Page</h1>

      <PromptCard
        title="Medical Bill Analysis"
        prompt={`Analyze this medical bill for potential errors. Look for:
1. Duplicate charges
2. Unbundled services (charging separately for things usually billed together)
3. Incorrect procedure codes
4. Services I didn't receive

Here's my bill:
[paste your itemized bill here]`}
        whyItWorks="This prompt instructs the AI to analyze the bill line by line, looking for common billing errors that healthcare providers often make. Studies show nearly 80% of medical bills contain mistakes."
        watchOutFor={[
          'AI may not catch all errors - always verify',
          'Some legitimate charges may look like duplicates',
          'Request an itemized bill first if you only have a summary',
        ]}
      />
    </main>
  )
}
