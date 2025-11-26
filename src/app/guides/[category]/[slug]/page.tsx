import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { PromptCard } from '@/components/ui/PromptCard'
import { ProgressChecklist } from '@/components/ui/ProgressChecklist'
import { PrintButton } from '@/components/ui/PrintButton'
import { notFound } from 'next/navigation'

interface GuideData {
  title: string
  description: string
  categoryTitle: string
  breathMessage: {
    title: string
    body: string
  }
  prompts: {
    title: string
    prompt: string
    whyItWorks: string
    watchOutFor?: string[]
  }[]
  checklistItems: {
    id: string
    label: string
  }[]
}

const guidesData: Record<string, Record<string, GuideData>> = {
  'medical-bills': {
    'huge-medical-bill': {
      title: 'I Got a Huge Medical Bill',
      description: 'Complete workflow for analyzing and fighting unexpected medical bills using AI',
      categoryTitle: 'Medical Bills',
      breathMessage: {
        title: 'Take a breath.',
        body: "You're not going to jail over a medical bill. This is solvable. Studies show nearly 80% of medical bills contain errors. Let's find them together.",
      },
      prompts: [
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
        },
      ],
      checklistItems: [
        { id: 'request-itemized', label: 'Request an itemized bill' },
        { id: 'review-insurance', label: 'Review insurance explanation of benefits (EOB)' },
        { id: 'analyze-ai', label: 'Analyze bill with AI for errors' },
        { id: 'research-prices', label: 'Research fair prices for procedures' },
        { id: 'document-errors', label: 'Document all potential errors found' },
        { id: 'contact-billing', label: 'Contact billing department' },
        { id: 'request-reduction', label: 'Request itemized reduction or payment plan' },
      ],
    },
    'itemized-bill': {
      title: 'How to Request an Itemized Bill',
      description: 'Get the documentation you need to find billing errors',
      categoryTitle: 'Medical Bills',
      breathMessage: {
        title: 'You have the right to see what you\'re being charged for.',
        body: 'Every patient has the legal right to an itemized bill. The billing department may push back, but stay firm. An itemized bill is your most powerful tool.',
      },
      prompts: [
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
        },
      ],
      checklistItems: [
        { id: 'locate-account', label: 'Locate your account number' },
        { id: 'call-billing', label: 'Call billing department' },
        { id: 'request-itemized', label: 'Request itemized bill with CPT codes' },
        { id: 'document-call', label: 'Document who you spoke with' },
        { id: 'follow-up-writing', label: 'Follow up in writing if needed' },
        { id: 'receive-bill', label: 'Receive and review itemized bill' },
      ],
    },
    'negotiate-payment': {
      title: 'Negotiating Medical Bills',
      description: 'Financial hardship programs and payment negotiation strategies',
      categoryTitle: 'Medical Bills',
      breathMessage: {
        title: 'Almost every bill is negotiable.',
        body: 'Hospitals expect negotiation. They have financial hardship programs, charity care, and payment plans that they rarely advertise. You just have to ask the right questions.',
      },
      prompts: [
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
          whyItWorks: 'A well-written hardship letter documents your situation formally and triggers the hospital\'s obligation to review you for financial assistance programs. Many hospitals are required by law to offer charity care.',
        },
      ],
      checklistItems: [
        { id: 'gather-financials', label: 'Gather financial documentation' },
        { id: 'research-charity', label: 'Research hospital charity care policy' },
        { id: 'calculate-offer', label: 'Calculate what you can realistically pay' },
        { id: 'write-letter', label: 'Write financial hardship letter' },
        { id: 'submit-application', label: 'Submit financial assistance application' },
        { id: 'follow-up', label: 'Follow up on application status' },
      ],
    },
  },
  'debt-collection': {
    'collections-letter': {
      title: 'I Got a Collections Letter',
      description: 'What to do when a debt collector contacts you',
      categoryTitle: 'Debt Collection',
      breathMessage: {
        title: 'Don\'t panic. Don\'t pay anything yet.',
        body: 'A collections letter feels scary, but you have rights. The Fair Debt Collection Practices Act (FDCPA) protects you. The first step is always to validate the debt - never pay something you haven\'t verified.',
      },
      prompts: [
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
        },
      ],
      checklistItems: [
        { id: 'dont-pay', label: 'Do NOT pay anything yet' },
        { id: 'document-receipt', label: 'Document when you received the letter' },
        { id: 'verify-legitimacy', label: 'Verify the collector is legitimate' },
        { id: 'check-sol', label: 'Check statute of limitations in your state' },
        { id: 'send-validation', label: 'Send debt validation letter (within 30 days)' },
        { id: 'send-certified', label: 'Send via certified mail with return receipt' },
        { id: 'keep-copies', label: 'Keep copies of all correspondence' },
      ],
    },
    'debt-validation': {
      title: 'Debt Validation Rights',
      description: 'Your FDCPA rights and how to request debt validation',
      categoryTitle: 'Debt Collection',
      breathMessage: {
        title: 'Knowledge is power.',
        body: 'The FDCPA gives you powerful rights that most people don\'t know about. Debt collectors count on your ignorance. Let\'s change that.',
      },
      prompts: [
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
        },
      ],
      checklistItems: [
        { id: 'learn-rights', label: 'Learn your FDCPA rights' },
        { id: 'check-sol', label: 'Check statute of limitations' },
        { id: 'request-validation', label: 'Request debt validation in writing' },
        { id: 'document-violations', label: 'Document any collector violations' },
        { id: 'review-credit', label: 'Review credit report for accuracy' },
        { id: 'consider-options', label: 'Consider your response options' },
      ],
    },
  },
}

interface PageProps {
  params: Promise<{
    category: string
    slug: string
  }>
}

export default async function GuidePage({ params }: PageProps) {
  const { category, slug } = await params

  const categoryData = guidesData[category]
  if (!categoryData) {
    notFound()
  }

  const guide = categoryData[slug]
  if (!guide) {
    notFound()
  }

  return (
    <main id="main-content" tabIndex={-1} className="min-h-screen p-8 outline-none">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="max-w-3xl mx-auto">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <li><Link href="/" className="hover:text-[var(--color-primary)]">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/guides" className="hover:text-[var(--color-primary)]">Guides</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href={`/guides/${category}`} className="hover:text-[var(--color-primary)]">{guide.categoryTitle}</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{guide.title}</li>
          </ol>
        </nav>

        <h1 className="font-display text-4xl font-bold mb-4">{guide.title}</h1>
        <p className="text-[var(--color-text-muted)] text-lg mb-8">{guide.description}</p>

        {/* Breath Box */}
        <div
          className="p-6 rounded-xl border-l-4 border-primary mb-8"
          style={{ backgroundColor: 'var(--color-breath)' }}
          data-testid="breath-box"
        >
          <p className="font-display text-xl mb-2">{guide.breathMessage.title}</p>
          <p className="text-[var(--color-text-muted)]">{guide.breathMessage.body}</p>
        </div>

        {/* Progress Checklist */}
        <section className="mb-12">
          <h2 className="font-display text-2xl font-semibold mb-4">Your Progress</h2>
          <ProgressChecklist guideId={`${category}-${slug}`} items={guide.checklistItems} />
        </section>

        {/* Prompts Section */}
        <section>
          <h2 className="font-display text-2xl font-semibold mb-6">AI Prompts</h2>
          <div className="space-y-6">
            {guide.prompts.map((prompt, index) => (
              <PromptCard
                key={index}
                title={prompt.title}
                prompt={prompt.prompt}
                whyItWorks={prompt.whyItWorks}
                watchOutFor={prompt.watchOutFor}
              />
            ))}
          </div>
        </section>

        {/* Print styles message */}
        <div className="mt-12 p-4 border border-[var(--color-background-200)] rounded-lg text-center print:hidden">
          <p className="text-[var(--color-text-muted)] text-sm">
            Need a physical copy? <PrintButton />
          </p>
        </div>
      </div>
    </main>
  )
}
