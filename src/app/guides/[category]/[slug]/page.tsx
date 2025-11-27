import Link from 'next/link'
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
    'predatory-tactics': {
      title: 'Predatory Billing Tactics Exposed',
      description: 'How hospitals and collectors manipulate you, and how to fight back',
      categoryTitle: 'Medical Bills',
      breathMessage: {
        title: 'Knowledge is your armor.',
        body: "These companies use psychology and confusion as weapons. Once you understand their playbook, their tactics lose their power over you. You're about to learn exactly what they don't want you to know.",
      },
      prompts: [
        {
          title: 'Decode Manipulative Language',
          prompt: `I received this letter/bill and want to understand if they're using manipulative tactics. Please analyze for:

1. Artificial urgency (fake deadlines, "act now" language)
2. Vague threats that don't cite specific laws
3. Emotional manipulation (shame, fear, guilt)
4. Confusing jargon designed to intimidate
5. Hidden terms or conditions

Here's the document:
[PASTE YOUR DOCUMENT HERE]

For each tactic you find, explain:
- What they're trying to make me feel
- Why this tactic is effective
- The reality behind their claim
- How I should actually respond`,
          whyItWorks: 'Billing departments and collectors are trained in persuasion psychology. Naming their tactics breaks the spell. Once you see "this is a fear tactic, not a legal requirement," you can respond rationally.',
          watchOutFor: [
            'Some urgent language IS legitimate (court dates, statute deadlines)',
            'Just because language is manipulative doesn\'t mean the underlying debt is fake',
            'Document manipulative tactics - they can be evidence of violations',
          ],
        },
        {
          title: 'Identify Common Hospital Billing Scams',
          prompt: `Review this hospital bill and help me identify any predatory or deceptive practices:

[PASTE YOUR BILL HERE]

Look for these specific tactics:
1. "Chargemaster" pricing (prices inflated 10-20x actual cost)
2. Facility fees that double the cost for the same service
3. Charging for services during "observation" vs. admission (Medicare trap)
4. Balance billing for emergency services (may be illegal)
5. Unbundling services to increase the total
6. Charging for items typically included in procedure fees
7. "Self-pay" rates that are actually higher than insured rates

For each issue found, explain the tactic and my options.`,
          whyItWorks: 'Hospitals have entire departments dedicated to maximizing revenue extraction. Knowing their specific tactics lets you challenge inflated charges with precision.',
        },
        {
          title: 'Analyze Collector Intimidation Tactics',
          prompt: `A debt collector contacted me and I want to understand their tactics. Here's what happened:

How they contacted me: [PHONE/LETTER/TEXT/EMAIL]
What they said: [DESCRIBE THEIR MESSAGE]
Tone used: [THREATENING/FRIENDLY/URGENT/PROFESSIONAL]
Specific claims they made: [LIST ANY THREATS OR PROMISES]
Did they mention: lawsuits? wage garnishment? credit damage? jail? [NOTE WHAT THEY SAID]

Please analyze:
1. Which of their claims are likely real vs. empty threats?
2. Did they violate any FDCPA rules with their tactics?
3. What psychological pressure tactics are they using?
4. What's the most likely reality of my situation?
5. How should I respond to their specific claims?`,
          whyItWorks: 'Collectors are trained to create fear and urgency. Most of their scary-sounding threats are either illegal or empty. Understanding which is which lets you respond calmly.',
          watchOutFor: [
            'Document everything - violations can be worth $1,000+ each',
            'Some threats ARE real - lawsuits do happen',
            'Never admit the debt is yours during these interactions',
          ],
        },
      ],
      checklistItems: [
        { id: 'identify-tactics', label: 'Identify manipulation tactics being used' },
        { id: 'document-everything', label: 'Document all communications' },
        { id: 'check-legality', label: 'Check if their tactics violate any laws' },
        { id: 'research-rights', label: 'Research your specific rights' },
        { id: 'plan-response', label: 'Plan your response strategy' },
        { id: 'dont-react-emotionally', label: 'Don\'t react emotionally to pressure' },
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
  'using-ai': {
    'why-trust-ai': {
      title: 'Why You Can Trust AI for This',
      description: 'How AI levels the playing field and why it works for document analysis',
      categoryTitle: 'Using AI Safely',
      breathMessage: {
        title: 'AI is your equalizer.',
        body: "Hospitals have billing departments with decades of experience. Collectors have scripts tested on millions of people. AI gives you access to that same level of knowledge - instantly, for free. It's finally a fair fight.",
      },
      prompts: [
        {
          title: 'Verify AI Advice',
          prompt: `I asked AI for advice about [TOPIC] and got this response:

[PASTE THE AI RESPONSE HERE]

Please help me verify this information:
1. Is this advice generally accurate and up-to-date?
2. Are there any important caveats or exceptions?
3. What should I double-check from official sources?
4. Are there any risks in following this advice?
5. What questions should I ask a professional to confirm?

I want to trust but verify before taking action.`,
          whyItWorks: 'AI can make mistakes or have outdated information. This "trust but verify" prompt helps you catch errors before they cost you.',
          watchOutFor: [
            'Run important advice through multiple AI tools (ChatGPT AND Claude)',
            'Laws and procedures change - verify dates and current rules',
            'AI is not a substitute for professional legal/medical/financial advice',
          ],
        },
        {
          title: 'Explain AI Analysis to Others',
          prompt: `I used AI to analyze my [BILL/LETTER/DOCUMENT] and found these issues:

[LIST WHAT AI FOUND]

I need to explain this to [BILLING DEPARTMENT/COLLECTOR/FAMILY MEMBER/LAWYER] who doesn\'t understand AI.

Please help me:
1. Explain these findings in plain language without mentioning AI
2. Present the logic of why these are legitimate concerns
3. Cite any laws, regulations, or industry standards that support my position
4. Suggest how to frame this so they take me seriously
5. Anticipate their counter-arguments and prepare responses`,
          whyItWorks: 'Some people dismiss "I asked a computer" but will listen to well-researched arguments. This prompt translates AI analysis into persuasive human language.',
        },
        {
          title: 'Understand AI Limitations',
          prompt: `I'm about to use AI to help with my [DESCRIBE YOUR SITUATION].

Before I start, help me understand:
1. What is AI good at in this situation?
2. What are AI's limitations here?
3. What information should I NOT share with AI?
4. What should I verify independently?
5. When should I definitely consult a human professional?

Be honest about what AI can and can't do for my specific situation.`,
          whyItWorks: 'Understanding AI limitations helps you use it appropriately. AI is powerful but not omniscient - knowing its boundaries makes you a smarter user.',
        },
      ],
      checklistItems: [
        { id: 'understand-strengths', label: 'Understand what AI is good at' },
        { id: 'understand-limits', label: 'Understand AI limitations' },
        { id: 'verify-important', label: 'Always verify important information' },
        { id: 'use-multiple', label: 'Use multiple AI tools for comparison' },
        { id: 'know-when-professional', label: 'Know when to consult professionals' },
        { id: 'document-sources', label: 'Document your sources and reasoning' },
      ],
    },
    'protect-your-privacy': {
      title: 'Protecting Your Privacy with AI',
      description: 'How to safely share documents with AI without exposing sensitive data',
      categoryTitle: 'Using AI Safely',
      breathMessage: {
        title: 'You can protect yourself.',
        body: "You don't have to share everything to get help. AI can analyze your documents effectively even when you redact sensitive information. Here's how to stay safe.",
      },
      prompts: [
        {
          title: 'Redact My Document',
          prompt: `I need to share a [BILL/LETTER/DOCUMENT] with AI but want to protect my privacy first.

Please tell me:
1. What information I should ALWAYS remove before sharing (SSN, DOB, etc.)
2. What information is safe to share for analysis purposes
3. What I can replace with placeholders (like [MY NAME] or [MY ADDRESS])
4. Whether removing this info will affect the analysis quality
5. A step-by-step process for safely preparing my document

I'm sharing: [BRIEFLY DESCRIBE THE DOCUMENT TYPE]`,
          whyItWorks: 'This gives you a personalized checklist for sanitizing your specific document type. Different documents have different sensitive data.',
          watchOutFor: [
            'Account numbers can often be shortened to last 4 digits',
            'Names and addresses are often needed for letter templates',
            'Dollar amounts and dates are usually safe and necessary for analysis',
          ],
        },
        {
          title: 'Review Data Retention Policies',
          prompt: `I want to understand how different AI tools handle my data. Please explain in simple terms:

1. What typically happens to data I paste into AI chat tools?
2. What's the difference between chat history being saved vs. used for training?
3. What should I look for in privacy policies?
4. How do I use these tools in the most private way possible?
5. Are there AI tools that are more privacy-focused than others?

I'm particularly concerned about: [LIST YOUR CONCERNS - identity theft, employer seeing, etc.]`,
          whyItWorks: 'Understanding how your data is handled lets you make informed choices. Not all AI tools are equally private.',
        },
      ],
      checklistItems: [
        { id: 'identify-sensitive', label: 'Identify sensitive information in your documents' },
        { id: 'redact-ssn', label: 'Redact Social Security numbers' },
        { id: 'redact-account', label: 'Redact full account numbers (keep last 4)' },
        { id: 'consider-names', label: 'Consider replacing names with placeholders' },
        { id: 'check-privacy', label: 'Check AI tool privacy settings' },
        { id: 'use-incognito', label: 'Consider using incognito/private mode' },
      ],
    },
    'getting-started': {
      title: 'Getting Started with AI Tools',
      description: 'A beginner-friendly guide to using ChatGPT, Claude, and other AI tools',
      categoryTitle: 'Using AI Safely',
      breathMessage: {
        title: 'Anyone can do this.',
        body: "If you can write an email or send a text message, you can use AI. There's no special knowledge required. You're just having a conversation - and the AI will help guide you.",
      },
      prompts: [
        {
          title: 'First-Timer Introduction',
          prompt: `I'm completely new to using AI tools and I'm trying to [DESCRIBE WHAT YOU WANT TO DO].

Please help me like I've never used AI before:
1. What should I type to get started?
2. How do I explain what I need?
3. What if the AI doesn't understand me?
4. How do I ask follow-up questions?
5. What mistakes do beginners commonly make?

I'm a bit nervous about this - please be patient and explain things simply.`,
          whyItWorks: 'AI tools are actually very forgiving and patient. Starting with "I\'m new" sets the right tone and gets you simpler, clearer responses.',
        },
        {
          title: 'Learn to Ask Better Questions',
          prompt: `I'm learning to use AI better. I tried asking about [TOPIC] but didn't get useful results.

Here's what I originally asked:
[PASTE YOUR ORIGINAL QUESTION]

Here's what I actually needed:
[DESCRIBE WHAT YOU WERE HOPING TO LEARN]

Please help me:
1. What was wrong with my original question?
2. How should I have phrased it?
3. What additional context would have helped?
4. Give me 3 better versions of my question
5. What are general tips for asking AI good questions?`,
          whyItWorks: 'Learning to "prompt" AI well is a skill. This meta-prompt helps you improve your prompting ability over time.',
        },
        {
          title: 'Which AI Tool Should I Use?',
          prompt: `I need to [DESCRIBE YOUR TASK] and I'm not sure which AI tool to use.

Please compare the main free options for someone who is:
- Technical skill level: [BEGINNER/INTERMEDIATE/ADVANCED]
- Budget: [FREE ONLY / CAN PAY A LITTLE / COST DOESN'T MATTER]
- Privacy concerns: [LOW / MEDIUM / HIGH]
- What I'm doing: [DESCRIBE YOUR USE CASE]

For each option, tell me:
- Best for: [what tasks]
- Pros: [advantages]
- Cons: [disadvantages]
- How to access it
- Any free limitations`,
          whyItWorks: 'Different AI tools have different strengths. This helps you pick the right tool for your specific situation.',
        },
      ],
      checklistItems: [
        { id: 'choose-tool', label: 'Choose an AI tool to start with' },
        { id: 'create-account', label: 'Create a free account' },
        { id: 'try-simple', label: 'Try a simple question first' },
        { id: 'practice-followup', label: 'Practice asking follow-up questions' },
        { id: 'learn-from-mistakes', label: 'Learn from unhelpful responses' },
        { id: 'bookmark-prompts', label: 'Bookmark prompts that work well' },
      ],
    },
  },
  'job-search': {
    'analyze-job-posting': {
      title: 'Analyzing Job Postings',
      description: 'Decode what companies really want and spot red flags before applying',
      categoryTitle: 'Job Search',
      breathMessage: {
        title: 'Not every job deserves your application.',
        body: "Quality beats quantity in job searching. Learning to read between the lines of job postings saves you time, protects you from toxic workplaces, and helps you focus on opportunities where you'll actually thrive.",
      },
      prompts: [
        {
          title: 'Analyze This Job Posting',
          prompt: `Please analyze this job posting and help me understand what they really want:

[PASTE THE JOB POSTING HERE]

Please evaluate:

RED FLAGS - Look for warning signs:
- Vague job descriptions or "wearing many hats"
- Unrealistic requirements for the salary/level
- "Fast-paced" or "startup mentality" (may mean overwork)
- No salary range listed
- Very short posting or extremely long requirements list

GREEN FLAGS - Look for positive signs:
- Clear responsibilities and expectations
- Reasonable experience requirements
- Mentions of work-life balance, growth, or training
- Salary transparency
- Specific about team structure and reporting

DECODE THE LANGUAGE:
- What do they actually need vs. nice-to-have?
- What's the real experience level they want?
- What does this tell us about company culture?

Give me your honest assessment: Is this worth applying to?`,
          whyItWorks: 'Job postings are marketing documents. Companies don\'t always say what they mean. This prompt helps you read between the lines.',
          watchOutFor: [
            'No job is perfect - some red flags are minor',
            'Green flags can be exaggerated - verify in interviews',
            'Your priorities matter - a red flag for some is fine for others',
          ],
        },
        {
          title: 'Research This Company',
          prompt: `I'm considering applying to [COMPANY NAME] for a [JOB TITLE] role.

Please help me research this company:

1. COMPANY BASICS:
- What does this company do?
- How big are they (employees, revenue if known)?
- How long have they been around?
- What's their reputation in the industry?

2. CULTURE SIGNALS:
- What do employee reviews say (Glassdoor themes)?
- How do they present themselves on social media?
- What values do they claim vs. demonstrate?

3. FINANCIAL HEALTH:
- For startups: funding stage and runway concerns?
- For public companies: recent performance?
- Any layoffs, restructuring, or concerning news?

4. GROWTH & STABILITY:
- Are they growing, stable, or struggling?
- What's the typical tenure of employees?
- Is this role new or replacing someone?

Based on this research, what should I be cautious about? What's exciting?`,
          whyItWorks: 'Applying without research is like buying a car without test driving it. This research reveals things the job posting won\'t tell you.',
        },
        {
          title: 'Spot Fake or Scam Job Postings',
          prompt: `I found this job posting and something feels off. Please help me determine if it's legitimate or potentially a scam:

[PASTE THE JOB POSTING OR DESCRIBE THE OPPORTUNITY]

Red flags for scams:
- Asking for money upfront (training fees, equipment costs)
- Too-good-to-be-true salary for minimal requirements
- Vague about what the company does
- Poor grammar/spelling in official communications
- Asking for sensitive personal info before interviewing
- No verifiable company presence online
- Offering the job without a real interview
- Pressure to decide quickly

Please analyze this posting and tell me:
1. Is this likely legitimate or suspicious?
2. What specific red flags do you see?
3. How can I verify if it's real?
4. What should I do next?`,
          whyItWorks: 'Job scams are increasingly sophisticated. This prompt helps you identify warning signs before you waste time or expose yourself to fraud.',
        },
      ],
      checklistItems: [
        { id: 'read-carefully', label: 'Read the full job posting carefully' },
        { id: 'identify-flags', label: 'Identify red and green flags' },
        { id: 'research-company', label: 'Research the company online' },
        { id: 'check-glassdoor', label: 'Check Glassdoor reviews' },
        { id: 'verify-legitimacy', label: 'Verify the posting is legitimate' },
        { id: 'decide-proceed', label: 'Decide if it\'s worth applying' },
      ],
    },
    'match-your-skills': {
      title: 'Matching Your Skills to Jobs',
      description: 'Find your transferable skills and craft your unique value proposition',
      categoryTitle: 'Job Search',
      breathMessage: {
        title: 'You have more skills than you realize.',
        body: "Most people undersell themselves because they don't see how their experience translates. Skills from completely different fields often transfer perfectly. Let's discover what makes you uniquely valuable.",
      },
      prompts: [
        {
          title: 'Find My Transferable Skills',
          prompt: `I'm applying for jobs in [TARGET FIELD/ROLE] but my background is in [YOUR BACKGROUND].

Help me identify my transferable skills:

MY EXPERIENCE:
[Describe your work history, even informal or volunteer work]

MY EDUCATION:
[Describe any training, certifications, or self-learning]

THE JOB REQUIRES:
[Paste key requirements from job posting OR describe the role]

Please help me:
1. Identify skills from my experience that transfer to this role
2. Reframe my experience using language from the new field
3. Find hidden skills I might not realize I have
4. Identify any real gaps I need to address
5. Suggest how to present my unusual background as a strength`,
          whyItWorks: 'Career changers often have MORE valuable skills because they bring diverse perspectives. This prompt helps you see and communicate that value.',
          watchOutFor: [
            'Don\'t oversell - genuine transferable skills only',
            'Some gaps are real and need addressing',
            'The way you frame experience matters enormously',
          ],
        },
        {
          title: 'Write My Value Proposition',
          prompt: `Help me write a clear, compelling value proposition for my job search.

WHO I AM:
- Current/most recent role: [TITLE]
- Years of experience: [NUMBER]
- Industry background: [INDUSTRIES]
- Key accomplishments: [2-3 ACHIEVEMENTS WITH NUMBERS IF POSSIBLE]

WHO I WANT TO WORK FOR:
- Target role: [JOB TITLE]
- Target industry: [INDUSTRY]
- Type of company: [STARTUP/CORPORATE/NONPROFIT/etc.]

MY UNIQUE ANGLE:
- What I do differently than others: [YOUR DIFFERENTIATOR]
- Problems I'm especially good at solving: [PROBLEMS]

Please create:
1. A one-sentence positioning statement
2. A 30-second "elevator pitch"
3. A three-sentence career story
4. Key talking points for interviews
5. LinkedIn headline and summary suggestions`,
          whyItWorks: 'Most people describe what they DO instead of the VALUE they create. This prompt helps you articulate why someone should hire YOU specifically.',
        },
        {
          title: 'Identify My Skill Gaps',
          prompt: `I want to apply for [JOB TITLE] positions. Please help me honestly assess my gaps.

THE JOB TYPICALLY REQUIRES:
[PASTE REQUIREMENTS OR DESCRIBE THE ROLE]

MY CURRENT SKILLS:
[HONESTLY LIST WHAT YOU CAN DO]

MY EXPERIENCE:
[DESCRIBE YOUR RELEVANT BACKGROUND]

Please help me understand:
1. Which requirements am I definitely qualified for?
2. Which requirements am I partially qualified for?
3. Which requirements are genuine gaps?
4. For each gap: How critical is it? How hard to learn?
5. Which gaps can I learn quickly vs. need significant time?
6. How should I prioritize filling these gaps?
7. Can I apply now, or should I skill up first?

Be honest - I'd rather know the truth than waste time.`,
          whyItWorks: 'Honest gap assessment prevents you from applying to jobs you can\'t get while also preventing you from underselling yourself on jobs you CAN get.',
        },
      ],
      checklistItems: [
        { id: 'list-experience', label: 'List all your experience (including informal)' },
        { id: 'identify-transferable', label: 'Identify transferable skills' },
        { id: 'assess-gaps', label: 'Honestly assess your gaps' },
        { id: 'write-value-prop', label: 'Write your value proposition' },
        { id: 'update-linkedin', label: 'Update LinkedIn with new positioning' },
        { id: 'prepare-story', label: 'Prepare your career story' },
      ],
    },
    'stand-out-applications': {
      title: 'Standing Out in Applications',
      description: 'Creative strategies to get noticed by hiring managers',
      categoryTitle: 'Job Search',
      breathMessage: {
        title: 'Generic applications get generic results.',
        body: "Hiring managers see hundreds of applications that all look the same. Standing out doesn't require tricks - it requires showing genuine interest and specific value. Here's how to be memorable for the right reasons.",
      },
      prompts: [
        {
          title: 'Write a Tailored Cover Letter',
          prompt: `Help me write a cover letter that stands out for this specific job:

THE JOB:
[PASTE JOB POSTING OR KEY DETAILS]

THE COMPANY:
[COMPANY NAME AND WHAT YOU KNOW ABOUT THEM]

MY RELEVANT EXPERIENCE:
[YOUR TOP 2-3 RELEVANT ACCOMPLISHMENTS]

WHY I WANT THIS SPECIFIC JOB:
[GENUINE REASONS - not just "I need a job"]

Please write a cover letter that:
1. Opens with something specific about THIS company (not generic)
2. Connects my experience directly to their stated needs
3. Shows I understand their challenges or goals
4. Is concise (under 300 words)
5. Ends with a clear, confident call to action
6. Sounds like a human, not a template

DO NOT use phrases like:
- "I am writing to express my interest..."
- "I believe I would be a great fit..."
- "Please find attached..."`,
          whyItWorks: 'Generic cover letters get skipped. Specific, genuine letters that show you understand the company get read and remembered.',
          watchOutFor: [
            'Don\'t be so creative you seem unprofessional',
            'Proofread carefully - errors kill applications',
            'Match the company\'s tone (formal vs. casual)',
          ],
        },
        {
          title: 'Find and Reach Out to Hiring Managers',
          prompt: `I want to reach out directly to someone at [COMPANY NAME] about the [JOB TITLE] role.

Help me:
1. How to find the hiring manager or relevant person on LinkedIn
2. What to look for in their profile to personalize outreach
3. Write a short, professional LinkedIn message that:
   - Isn't pushy or desperate
   - Shows genuine interest in the company
   - Offers value, not just asks for something
   - Gives them a reason to respond
4. When to send and when to follow up
5. What NOT to do (common mistakes)

My relevant background for context: [BRIEF DESCRIPTION]`,
          whyItWorks: 'Direct outreach to decision-makers bypasses the resume black hole. But it must be done respectfully and add value, not just beg for attention.',
        },
        {
          title: 'Prepare for Behavioral Interviews',
          prompt: `Help me prepare for behavioral interviews for a [JOB TITLE] position.

THE JOB REQUIRES:
[KEY SKILLS AND RESPONSIBILITIES FROM POSTING]

MY EXPERIENCE:
[RELEVANT BACKGROUND]

Please help me prepare STAR-format stories for common questions:
1. "Tell me about a time you [handled conflict/led a team/solved a problem/etc.]"
2. "Describe a situation where you [relevant skill from job posting]"
3. "Give an example of when you [another relevant skill]"

For each story, help me structure it as:
- Situation: Brief context (2 sentences)
- Task: What was your responsibility (1 sentence)
- Action: Specific steps YOU took (3-4 sentences)
- Result: Quantified outcomes if possible (1-2 sentences)

Also suggest:
- Questions I should ask them
- Red flags to watch for during the interview
- How to follow up after`,
          whyItWorks: 'Behavioral interviews follow predictable patterns. Preparing stories in advance makes you seem polished, confident, and self-aware.',
        },
      ],
      checklistItems: [
        { id: 'research-company', label: 'Thoroughly research the company' },
        { id: 'tailor-resume', label: 'Tailor resume to the specific job' },
        { id: 'write-cover', label: 'Write a personalized cover letter' },
        { id: 'find-contacts', label: 'Find and reach out to relevant contacts' },
        { id: 'prepare-stories', label: 'Prepare STAR-format interview stories' },
        { id: 'prepare-questions', label: 'Prepare questions to ask them' },
        { id: 'follow-up', label: 'Follow up appropriately after applying' },
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
