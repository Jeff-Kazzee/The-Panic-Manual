'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { PromptCard } from '@/components/ui/PromptCard'

interface Prompt {
  title: string
  prompt: string
  whyItWorks: string
  watchOutFor?: string[]
  category: string
  categorySlug: string
}

const allPrompts: Prompt[] = [
  // Medical Bills
  {
    title: 'Analyze My Medical Bill',
    prompt: `I received a medical bill and need help understanding it. Please analyze this bill for:

1. Duplicate charges (same service billed twice)
2. Unbundled services (procedures that should be billed together)
3. Upcoding (charged for more expensive procedure than performed)
4. Services I may not have received
5. Charges that seem unusually high

Here's my bill:
[PASTE YOUR ITEMIZED BILL HERE]

Please list each potential issue you find with the specific line item and explain why it might be an error.`,
    whyItWorks: 'This prompt gives the AI a structured checklist of the most common billing errors. By asking it to analyze each line item against these specific categories, you get actionable findings rather than vague observations.',
    watchOutFor: [
      'AI may flag legitimate charges as errors - always verify before disputing',
      'You need an ITEMIZED bill, not just a summary statement',
      'Run this prompt in multiple AI tools to compare findings',
    ],
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },
  {
    title: 'Research Fair Prices',
    prompt: `I was charged $[AMOUNT] for the following medical procedure:
- Procedure: [NAME OR DESCRIPTION]
- CPT Code (if known): [CODE]
- Location: [CITY, STATE]
- Setting: [Hospital outpatient / Inpatient / Doctor's office / ER]

Please help me understand:
1. What is the typical price range for this procedure in my area?
2. What is the Medicare reimbursement rate for this CPT code?
3. What percentage above the fair price is my bill?
4. What negotiation leverage does this give me?`,
    whyItWorks: 'Knowing the fair market price and Medicare rates gives you concrete data to negotiate with. Hospitals often charge 3-10x Medicare rates, and pointing this out in negotiations can lead to significant reductions.',
    watchOutFor: [
      'Prices vary significantly by region and facility type',
      'AI pricing data may be outdated - verify with fairhealthconsumer.org',
      'Medicare rates are a floor, not necessarily the "right" price',
    ],
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },
  {
    title: 'Phone Script: Requesting Itemized Bill',
    prompt: `Help me prepare a phone script for calling the hospital billing department to request an itemized bill. I need:

1. A professional opening that establishes my right to this information
2. Specific language to use if they try to redirect me to the summary
3. How to request CPT codes and service dates be included
4. What to say if they claim they can't provide it
5. How to document the call for my records

My account number is: [ACCOUNT NUMBER]
Date of service: [DATE]
Patient name: [NAME]`,
    whyItWorks: 'Having a script prevents you from being caught off-guard by common deflection tactics. Billing departments often try to provide summary statements instead of true itemized bills - this script helps you insist on what you need.',
    watchOutFor: [
      'Write down the name of everyone you speak with',
      'Note the date and time of each call',
      'Follow up phone requests with written requests',
    ],
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },
  {
    title: 'Financial Hardship Letter Generator',
    prompt: `Help me write a financial hardship letter to request a reduction in my medical bill.

My situation:
- Total bill amount: $[AMOUNT]
- My annual household income: $[INCOME]
- Number of dependents: [NUMBER]
- Special circumstances: [Any job loss, other medical bills, etc.]
- Amount I can reasonably pay: $[AMOUNT]

Please write a professional letter that:
1. Explains my financial situation without over-sharing
2. References the hospital's charity care program
3. Proposes a specific reduced amount or payment plan
4. Maintains a respectful but firm tone
5. Requests a response within 30 days`,
    whyItWorks: "A well-written hardship letter documents your situation formally and triggers the hospital's obligation to review you for financial assistance programs. Many hospitals are required by law to offer charity care.",
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },
  // Debt Collection
  {
    title: 'Analyze Collections Letter',
    prompt: `I received a debt collection letter. Please help me analyze it for:

1. Required disclosures (is this a legitimate collection attempt?)
2. Red flags that might indicate a scam
3. Information I should verify before responding
4. My rights under the FDCPA
5. Time-sensitive deadlines I need to know about

Here's the letter:
[PASTE COLLECTIONS LETTER TEXT HERE]

Please identify any FDCPA violations and explain my next steps.`,
    whyItWorks: 'Collection letters must contain specific information required by law. This prompt helps you identify whether the letter is legitimate, what your rights are, and whether the collector has already violated any laws.',
    watchOutFor: [
      'Never admit the debt is yours until validated',
      'The 30-day validation period is critical',
      'Some "collection letters" are scams',
    ],
    category: 'Debt Collection',
    categorySlug: 'debt-collection',
  },
  {
    title: 'Debt Validation Letter',
    prompt: `Generate a debt validation letter I can send to this debt collector. Include:

1. A formal request for validation under FDCPA Section 809(b)
2. Request for original creditor information
3. Request for complete payment history
4. Request for proof they are licensed to collect in my state
5. Notice that I dispute the debt until validated
6. Instruction to cease contact until validation is provided

Collector name: [NAME]
Collector address: [ADDRESS]
Account/Reference number: [NUMBER]
Alleged amount: $[AMOUNT]`,
    whyItWorks: 'You have 30 days from first contact to request validation, and the collector must stop collection activity until they provide it. Many debts cannot be properly validated, which can get them dismissed entirely.',
    category: 'Debt Collection',
    categorySlug: 'debt-collection',
  },
  {
    title: 'FDCPA Rights Explainer',
    prompt: `Explain my rights under the Fair Debt Collection Practices Act (FDCPA) in plain language. Specifically:

1. What are collectors prohibited from doing?
2. What information must they provide me?
3. What is the debt validation process?
4. What are the time limits for validation?
5. What can I do if they violate my rights?
6. How do I document violations?

Please give me specific examples of violations to watch for.`,
    whyItWorks: 'Understanding your rights transforms you from a victim into an informed negotiator. Many collectors rely on intimidation, but they must follow strict rules - and violations can be used against them.',
    category: 'Debt Collection',
    categorySlug: 'debt-collection',
  },
  {
    title: 'Statute of Limitations Checker',
    prompt: `Help me determine if this debt is past the statute of limitations.

Debt information:
- Type of debt: [Credit card / Medical / Personal loan / etc.]
- Original creditor: [NAME]
- My state of residence: [STATE]
- State where debt was incurred: [STATE]
- Date of last payment: [DATE]
- Date account became delinquent: [DATE]

Please explain:
1. What is the statute of limitations for this debt type in my state?
2. Has the statute likely expired?
3. What actions could restart the clock?
4. What are my options if the debt is time-barred?`,
    whyItWorks: 'Time-barred debts cannot be sued upon, though collectors can still try to collect. Knowing whether your debt is time-barred dramatically changes your negotiating position.',
    watchOutFor: [
      'Making any payment can restart the clock',
      'Acknowledging the debt in writing can restart the clock',
      'Different states have different statutes',
    ],
    category: 'Debt Collection',
    categorySlug: 'debt-collection',
  },
]

const categories = [
  { slug: 'all', label: 'All Prompts' },
  { slug: 'medical-bills', label: 'Medical Bills' },
  { slug: 'debt-collection', label: 'Debt Collection' },
]

export default function PromptsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPrompts = allPrompts.filter((prompt) => {
    const matchesCategory = selectedCategory === 'all' || prompt.categorySlug === selectedCategory
    const matchesSearch =
      searchQuery === '' ||
      prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prompt.prompt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen p-8 outline-none">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="max-w-4xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <li><Link href="/" className="hover:text-[var(--color-primary)]">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">Prompt Library</li>
          </ol>
        </nav>

        <h1 className="font-display text-4xl font-bold mb-4">Prompt Library</h1>
        <p className="text-[var(--color-text-muted)] text-lg mb-8">
          Copy-paste AI prompts to help you fight back against confusing documents
        </p>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Category Filter */}
          <fieldset>
            <legend className="sr-only">Filter by category</legend>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Category filter" data-testid="category-filter">
              {categories.map((category) => (
                <button
                  key={category.slug}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.slug
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'bg-[var(--color-background-200)] hover:bg-[var(--color-background-300)]'
                  }`}
                  aria-pressed={selectedCategory === category.slug}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </fieldset>

          {/* Search */}
          <div className="flex-1">
            <label htmlFor="prompt-search" className="sr-only">Search prompts</label>
            <input
              id="prompt-search"
              type="search"
              placeholder="Search prompts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[var(--color-background-200)] border border-[var(--color-background-300)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              data-testid="prompt-search"
            />
          </div>
        </div>

        {/* Results count */}
        <p className="text-[var(--color-text-muted)] text-sm mb-6" aria-live="polite">
          Showing {filteredPrompts.length} prompt{filteredPrompts.length !== 1 ? 's' : ''}
        </p>

        {/* Prompts Grid */}
        <div className="space-y-6" data-testid="prompts-list">
          {filteredPrompts.map((prompt, index) => (
            <div key={index}>
              <p className="text-xs text-[var(--color-text-muted)] mb-2 uppercase tracking-wide">
                {prompt.category}
              </p>
              <PromptCard
                title={prompt.title}
                prompt={prompt.prompt}
                whyItWorks={prompt.whyItWorks}
                watchOutFor={prompt.watchOutFor}
              />
            </div>
          ))}
        </div>

        {filteredPrompts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[var(--color-text-muted)]">No prompts found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all')
                setSearchQuery('')
              }}
              className="text-[var(--color-primary)] hover:underline mt-2"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
