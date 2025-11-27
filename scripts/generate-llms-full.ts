/**
 * Generate llms-full.txt - Complete content export for AI crawlers
 *
 * This script generates a comprehensive text file containing all guide and prompt
 * content for AI systems to index. Run at build time with: npm run generate:llms
 *
 * See: https://llmstxt.org/
 */

import * as fs from 'fs'
import * as path from 'path'

// Guide content - mirrors what's in the application
const guides = {
  'medical-bills': [
    {
      slug: 'huge-medical-bill',
      title: 'I Got a Huge Medical Bill',
      description: 'Complete workflow for analyzing and fighting unexpected medical bills',
      content: `
## The Breath

You're not going to debtor's prison. Medical bills are negotiable—often dramatically so. Studies show nearly 80% of medical bills contain errors. You have more power here than you think.

## What You Need to Know

Medical billing is intentionally opaque. Hospitals routinely charge different prices to different people for the same procedure. Insurance companies negotiate massive discounts that individuals never see. The "chargemaster" price you received is essentially a fantasy number.

## Your Action Plan

1. **Don't pay anything yet** - You have time. Most bills won't go to collections for 90-180 days.
2. **Request an itemized bill** - Call billing and ask for a complete itemized statement with CPT codes.
3. **Check for errors** - Use AI to analyze your itemized bill for duplicate charges, upcoding, and services you didn't receive.
4. **Research fair prices** - Look up Medicare rates and fair prices for your procedures.
5. **Negotiate** - Call billing, explain your situation, and ask for a reduction or payment plan.
6. **Apply for financial assistance** - Most hospitals have charity care programs.
7. **Get everything in writing** - Document all agreements before paying.

## Common Billing Errors to Look For

- Duplicate charges for the same service
- Upcoding (charging for more expensive procedures)
- Unbundling (charging separately for items that should be grouped)
- Charges for services you didn't receive
- Incorrect quantities
- Balance billing for in-network care
`,
    },
    {
      slug: 'itemized-bill',
      title: 'How to Request an Itemized Bill',
      description: 'Getting the documentation you need to find billing errors',
      content: `
## The Breath

Requesting an itemized bill is your legal right. This document is essential for finding errors and negotiating. You're not being difficult—you're being smart.

## Why You Need an Itemized Bill

A summary statement only shows totals. An itemized bill shows every individual charge with CPT/HCPCS codes, which you can research and verify. This is where you find the errors.

## How to Request

1. Call the billing department number on your bill
2. Say: "I'd like to request a fully itemized bill with all CPT and HCPCS codes"
3. Ask for it to be sent via mail AND email
4. Note the date, time, and name of who you spoke with
5. Follow up if you don't receive it within 7-10 days

## What to Look For

- Every line item should have a code (CPT, HCPCS, or revenue code)
- Quantities should match your memory of the visit
- Dates should be accurate
- Descriptions should match services you actually received
`,
    },
    {
      slug: 'negotiate-payment',
      title: 'Negotiating Medical Bills',
      description: 'Financial hardship programs and payment negotiation strategies',
      content: `
## The Breath

Hospitals negotiate bills every day. Insurance companies pay a fraction of the listed price. You can too. This is normal business practice, not charity.

## Negotiation Strategies

### Ask for the Cash Pay Discount
Many hospitals offer 20-50% discounts for paying without insurance or paying in full.

### Request Financial Assistance
Non-profit hospitals are required to have charity care programs. Ask for an application.

### Propose a Realistic Payment Plan
If you can't pay in full, propose monthly payments you can actually afford.

### Compare to Medicare Rates
Medicare typically pays 20-40% of chargemaster prices. Use this as a negotiation baseline.

### Document Everything
Get any agreement in writing before making payments.

## Sample Scripts

"I've reviewed my itemized bill and have some concerns about [specific charges]. I'd like to discuss a reduction."

"I'm unable to pay this amount. Can you tell me about your financial assistance program?"

"What discount do you offer for paying in full today?"
`,
    },
    {
      slug: 'predatory-tactics',
      title: 'Predatory Billing Tactics Exposed',
      description: 'How hospitals and collectors manipulate you, and how to fight back',
      content: `
## The Breath

Knowledge is power. Understanding these tactics helps you recognize when you're being manipulated—and how to respond.

## Common Predatory Tactics

### Urgency Pressure
"This must be paid within 30 days or it goes to collections!" Reality: You usually have much more time.

### Threatening Credit Scores
Medical debt reporting rules have changed. Paid medical debt no longer appears on credit reports, and unpaid medical debt under $500 isn't reported.

### Refusing to Itemize
They're required to provide itemized bills. Refusing is a red flag.

### Balance Billing
Charging you the difference between their rate and insurance payment for in-network care is often illegal.

### Bundling Errors
Charging for items separately that should be included in a procedure fee.

## How to Fight Back

- Document everything in writing
- Know your rights under your state's laws
- File complaints with your state attorney general
- Consider small claims court for clear violations
- Report HIPAA violations if your information is shared improperly
`,
    },
  ],
  'debt-collection': [
    {
      slug: 'collections-letter',
      title: 'I Got a Collections Letter',
      description: 'What to do when a debt collector contacts you',
      content: `
## The Breath

Getting a collections letter is scary, but you have significant legal protections. The Fair Debt Collection Practices Act (FDCPA) gives you powerful rights. Don't panic—get informed.

## Your First Steps

1. **Don't ignore it, but don't panic either** - You have 30 days to respond.
2. **Don't admit to the debt** - Saying "yes, I owe this" can restart the statute of limitations.
3. **Request debt validation in writing** - This is your most important protection.
4. **Check the statute of limitations** - Old debts may be time-barred.
5. **Verify the collector is legitimate** - Scammers pose as collectors.

## Your Rights Under FDCPA

- Collectors can't call before 8am or after 9pm
- They must stop calling your workplace if you ask
- They can't use abusive or threatening language
- They must validate the debt if you request it
- They can't discuss your debt with others (except spouse/attorney)

## Red Flags for Scams

- Demanding immediate payment via wire transfer or gift cards
- Refusing to provide written verification
- Threatening arrest or jail
- Won't give you their company name and address
`,
    },
    {
      slug: 'debt-validation',
      title: 'Debt Validation Rights',
      description: 'Your FDCPA rights and how to request debt validation',
      content: `
## The Breath

Debt validation is your legal right. Collectors must prove the debt is valid, is yours, and that they have the right to collect it. Many collection attempts fail this test.

## What is Debt Validation?

Within 30 days of first contact, you can send a written request asking the collector to verify:
- The original creditor
- The amount owed (with itemization)
- That the debt is actually yours
- That they have the legal right to collect

## How to Request Validation

1. Send your request via certified mail with return receipt
2. Keep copies of everything
3. Send within 30 days of their first contact
4. During validation, they must stop collection attempts

## What Happens After Your Request

The collector must either:
- Provide complete validation documentation, OR
- Stop all collection activity

If they can't validate, they can't legally continue collecting.

## Sample Validation Letter

"I am requesting validation of this debt pursuant to the Fair Debt Collection Practices Act, 15 U.S.C. § 1692g. Please provide: the name of the original creditor, the amount of the alleged debt with an itemization, and proof that you are authorized to collect this debt. Until this debt is validated, please cease all collection activity."
`,
    },
  ],
  'using-ai': [
    {
      slug: 'why-trust-ai',
      title: 'Why You Can Trust AI for This',
      description: 'How AI levels the playing field and why it works for document analysis',
      content: `
## The Breath

AI isn't magic, and it's not always right. But for analyzing documents and researching your rights, it's an incredibly powerful tool that levels the playing field against institutions with armies of lawyers and billing specialists.

## Why AI Works for Document Analysis

### Pattern Recognition
AI excels at finding patterns in complex documents—exactly what you need when looking for billing errors or legal violations.

### No Emotional Baggage
AI doesn't get intimidated by legal language or large numbers. It analyzes objectively.

### Tireless Research
AI can help you understand laws, regulations, and precedents that would take hours to research manually.

### Accessible Expertise
Tasks that once required expensive professionals are now accessible to everyone.

## Important Caveats

- Always verify AI responses with official sources
- Run important prompts multiple times
- Try different AI tools to compare answers
- AI is a tool, not a replacement for professional advice when needed
- Don't share sensitive personal information unnecessarily
`,
    },
    {
      slug: 'protect-your-privacy',
      title: 'Protecting Your Privacy with AI',
      description: 'How to safely share documents with AI without exposing sensitive data',
      content: `
## The Breath

Your privacy matters. You can get AI help without exposing all your personal information. A few simple practices keep you protected.

## Before Sharing Documents

### Redact Sensitive Information
Remove or black out:
- Social Security numbers
- Full date of birth
- Account numbers
- Medical record numbers
- Your full address

### Keep What's Relevant
The AI needs:
- Procedure descriptions and codes
- Dates of service
- Charge amounts
- Your general situation

### Use Anonymous Descriptions
Instead of "my wife Jane," say "my spouse" or "a family member."

## Safe AI Practices

1. Don't share passwords or full financial account numbers
2. Use AI tools with clear privacy policies
3. Consider paid tiers for better data protection
4. Delete conversation history when done
5. Don't share documents containing others' personal information without consent

## What AI Tools Actually Do With Your Data

Most major AI tools:
- Don't permanently store conversations on free tiers
- Offer options to opt out of training data usage
- Have enterprise options with stronger privacy guarantees

Read the privacy policy of any tool you use for sensitive matters.
`,
    },
    {
      slug: 'getting-started',
      title: 'Getting Started with AI Tools',
      description: 'A beginner-friendly guide to using ChatGPT, Claude, and other AI tools',
      content: `
## The Breath

You don't need to be technical to use AI effectively. These tools are designed to understand natural language—just talk to them like you'd talk to a knowledgeable friend.

## Recommended AI Tools

### ChatGPT (OpenAI)
- Most popular, widely tested
- Free tier available
- Good for general analysis

### Claude (Anthropic)
- Excellent for long documents
- Strong reasoning abilities
- Good for nuanced situations

### Perplexity
- Great for research with sources
- Shows where information comes from
- Good for fact-checking

## How to Get Good Results

### Be Specific
Instead of: "Help with my bill"
Try: "I received a hospital bill for $15,000. I had outpatient surgery for [procedure]. Can you help me understand what questions to ask about these charges?"

### Provide Context
Share relevant details about your situation, timeline, and what you've already tried.

### Ask Follow-Up Questions
AI conversations are iterative. Ask for clarification, more detail, or alternative approaches.

### Verify Important Information
For legal rights or medical information, always verify with official sources.

## Your First Prompt

Try this to get started:
"I'm dealing with [your situation]. I'm feeling overwhelmed and don't know where to start. Can you help me understand my options and create a simple action plan?"
`,
    },
  ],
  'job-search': [
    {
      slug: 'analyze-job-posting',
      title: 'Analyzing Job Postings',
      description: 'Decode what companies really want and spot red flags before applying',
      content: `
## The Breath

Job postings are marketing documents, not accurate job descriptions. Learning to read between the lines saves you time and helps you apply strategically.

## What to Analyze

### Required vs. Preferred Qualifications
"Required" often means "nice to have." If you meet 60-70% of requirements, apply anyway.

### Salary Transparency
Many states now require salary ranges. If it's missing, that's often a red flag.

### Company Culture Clues
"Fast-paced environment" = potentially understaffed
"Self-starter" = limited training/support
"Wear many hats" = unclear role boundaries
"Competitive salary" = often below market

### Role Clarity
Vague responsibilities suggest the company doesn't know what they need.

## Red Flags

- Constantly reposted (high turnover)
- Unrealistic requirements for the salary level
- "Other duties as assigned" as a major component
- No clear reporting structure
- Emphasizes "passion" over fair compensation

## How AI Can Help

Paste the job posting and ask:
- "What are the actual requirements vs. nice-to-haves?"
- "What red flags do you see in this posting?"
- "What questions should I ask in an interview about this role?"
`,
    },
    {
      slug: 'match-your-skills',
      title: 'Matching Your Skills to Jobs',
      description: 'Find your transferable skills and craft your unique value proposition',
      content: `
## The Breath

You have more relevant skills than you think. Most valuable skills transfer across industries. Your unique combination of experiences is your competitive advantage.

## Identifying Transferable Skills

### Hard Skills That Transfer
- Data analysis (spreadsheets, reports)
- Project management
- Writing and communication
- Technical tools (software, systems)
- Research abilities

### Soft Skills That Matter
- Problem-solving
- Team collaboration
- Client/customer relations
- Leadership and mentoring
- Adaptability

## Creating Your Value Proposition

Combine:
1. Your unique background
2. Specific skills relevant to the role
3. Results you've achieved
4. How you'll solve their problems

## How AI Can Help

Share your resume and a job posting:
- "What transferable skills from my experience match this role?"
- "How should I frame my [industry] background for this [new industry] position?"
- "What gaps should I address in my cover letter?"
`,
    },
    {
      slug: 'stand-out-applications',
      title: 'Standing Out in Applications',
      description: 'Creative strategies to get noticed by hiring managers',
      content: `
## The Breath

Most applications blur together. Small strategic choices can make yours memorable. It's not about gimmicks—it's about showing you understand their needs.

## Standing Out Strategies

### Research the Company
Reference specific company initiatives, recent news, or stated values in your cover letter.

### Quantify Your Impact
"Increased sales by 25%" is better than "improved sales performance."

### Address Their Pain Points
Show you understand challenges they face and how you'd solve them.

### Customize Every Application
Generic applications get generic responses (or none).

### Follow Up Strategically
A brief, professional follow-up shows genuine interest.

## What Not to Do

- Gimmicks that prioritize attention over substance
- Following up too frequently
- Lying or exaggerating
- Ignoring application instructions
- Being overly casual too early

## How AI Can Help

- "Help me customize this cover letter for [company name]"
- "How can I quantify the impact of [your achievement]?"
- "What questions show I've researched this company?"
- "Review my application for [role] and suggest improvements"
`,
    },
  ],
}

// Prompt categories - mirrors what's in the application
const prompts = {
  'medical-bills': [
    {
      title: 'Analyze My Medical Bill for Errors',
      prompt: `I received a medical bill that I need help analyzing. Here are the details:

[Paste your itemized bill here - remove personal info like SSN, full DOB, account numbers]

Please help me:
1. Identify any potential billing errors (duplicates, upcoding, unbundling)
2. Flag charges that seem unusually high
3. Note any charges I should ask for clarification on
4. Suggest questions to ask the billing department`,
      whyItWorks: 'AI excels at pattern recognition in complex documents.',
    },
    {
      title: 'Compare My Charges to Fair Prices',
      prompt: `I'm trying to understand if my medical charges are reasonable. Here are the procedures I was charged for:

[List procedures and amounts]

Please help me:
1. Find typical Medicare reimbursement rates for these procedures
2. Identify which charges seem significantly above market rates
3. Suggest negotiation talking points based on fair pricing`,
      whyItWorks: 'Gives you objective data for negotiations.',
    },
    {
      title: 'Draft a Financial Hardship Letter',
      prompt: `I need help writing a financial hardship letter to request a reduction in my medical bill.

My situation:
- Bill amount: [amount]
- My annual income: [range]
- Dependents: [number]
- Circumstances: [brief explanation]

Please draft a professional letter that:
1. Explains my financial situation
2. Requests their financial assistance program application
3. Proposes a reduced amount or payment plan
4. Maintains a respectful but firm tone`,
      whyItWorks: 'Proper formatting and tone improve success rates.',
    },
  ],
  'debt-collection': [
    {
      title: 'Draft a Debt Validation Letter',
      prompt: `I received a collection notice and need to request debt validation under the FDCPA.

Collection agency: [name]
Amount claimed: [amount]
Date of first contact: [date]

Please draft a formal debt validation letter that:
1. Cites the relevant FDCPA provisions
2. Requests full documentation of the debt
3. Asks for proof of their authority to collect
4. Instructs them to cease contact until validated
5. Is professional and legally sound`,
      whyItWorks: 'Proper legal citations strengthen your position.',
    },
    {
      title: 'Check if Debt is Time-Barred',
      prompt: `I need help understanding if a debt might be past the statute of limitations.

State where I live: [state]
State where debt originated: [state]
Type of debt: [credit card/medical/etc]
Date of last payment: [date]
Date of last activity: [date]

Please help me:
1. Determine the applicable statute of limitations
2. Calculate if the debt might be time-barred
3. Explain what this means for my options
4. Warn me about actions that could restart the clock`,
      whyItWorks: 'Statute of limitations varies by state and debt type.',
    },
    {
      title: 'Respond to a Lawsuit',
      prompt: `I've been served with a debt collection lawsuit and need help understanding my options.

Details:
- Court: [small claims/civil]
- Amount claimed: [amount]
- Response deadline: [date]
- What they're claiming: [brief description]

Please help me:
1. Understand my options for responding
2. Identify potential defenses
3. Know what to research before the deadline
4. Understand when I should consider getting a lawyer`,
      whyItWorks: 'Understanding options helps you make informed decisions.',
    },
  ],
  'job-search': [
    {
      title: 'Analyze This Job Posting',
      prompt: `Please analyze this job posting and help me understand what they're really looking for:

[Paste job posting]

Help me:
1. Identify true requirements vs. nice-to-haves
2. Spot any red flags or concerning language
3. Understand the company culture clues
4. Generate questions I should ask in an interview`,
      whyItWorks: 'Objective analysis reveals what companies actually need.',
    },
    {
      title: 'Match My Experience to This Role',
      prompt: `Here's my background and a job I'm interested in. Help me identify how my experience matches:

My experience:
[Brief summary of your background]

Job posting:
[Paste job posting]

Please:
1. Identify transferable skills I should highlight
2. Suggest how to frame my experience for this role
3. Note any gaps I should address
4. Recommend specific achievements to emphasize`,
      whyItWorks: 'External perspective reveals connections you might miss.',
    },
    {
      title: 'Customize My Cover Letter',
      prompt: `Help me customize this cover letter for a specific company:

My draft cover letter:
[Paste your draft]

Job posting:
[Paste job posting]

About the company:
[Any research you've done]

Please:
1. Adjust the letter to address their specific needs
2. Add company-specific references
3. Strengthen weak sections
4. Make it more memorable while staying professional`,
      whyItWorks: 'Customization dramatically improves response rates.',
    },
  ],
}

function generateLlmsFull(): string {
  let content = `# The Panic Manual - Complete Content Export

> Free guides and AI prompts helping people understand and fight back against confusing medical bills, collection letters, and other institutional documents.

This file contains the complete content of The Panic Manual for AI indexing purposes.
Generated: ${new Date().toISOString()}

---

# GUIDES

`

  // Add all guides
  for (const [category, categoryGuides] of Object.entries(guides)) {
    content += `## ${category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}\n\n`

    for (const guide of categoryGuides) {
      content += `### ${guide.title}\n\n`
      content += `**URL**: https://thepanicmanual.com/guides/${category}/${guide.slug}\n`
      content += `**Description**: ${guide.description}\n\n`
      content += guide.content.trim() + '\n\n'
      content += '---\n\n'
    }
  }

  content += `\n# PROMPT LIBRARY\n\n`

  // Add all prompts
  for (const [category, categoryPrompts] of Object.entries(prompts)) {
    content += `## ${category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Prompts\n\n`

    for (const prompt of categoryPrompts) {
      content += `### ${prompt.title}\n\n`
      content += '```\n' + prompt.prompt.trim() + '\n```\n\n'
      content += `**Why This Works**: ${prompt.whyItWorks}\n\n`
    }
  }

  content += `---

# ABOUT THE PANIC MANUAL

The Panic Manual is a free resource helping people understand and fight back against confusing institutional documents. We use AI tools to level the playing field.

## Our Philosophy

- We treat users as intelligent adults being manipulated by opaque systems
- AI is a tool to level the playing field, not a replacement for professional advice
- Always verify AI outputs—run prompts multiple times, try different LLMs
- Medical and debt systems are designed to confuse; clarity is power

## Technical Details

- Built with Next.js 15 and React 19
- Privacy-first: No cookies, no tracking, no analytics
- Local storage only for progress tracking
- Print-friendly CSS for offline use
- WCAG 2.1 AA accessibility compliant
- Dark mode default

## Important Disclaimers

- All content is educational, not legal or financial advice
- We have no sponsors, affiliates, or paid placements
- Users should always consult professionals for serious legal/financial decisions

---

End of content export.
For more information, visit: https://thepanicmanual.com
`

  return content
}

// Main execution
const outputPath = path.join(process.cwd(), 'public', 'llms-full.txt')
const content = generateLlmsFull()

fs.writeFileSync(outputPath, content, 'utf-8')
console.log(`Generated llms-full.txt at ${outputPath}`)
console.log(`File size: ${(content.length / 1024).toFixed(2)} KB`)
