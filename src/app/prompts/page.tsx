'use client'

import Link from 'next/link'
import { useState } from 'react'
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
  // ==========================================
  // MEDICAL BILLS - BILL ANALYSIS (6 prompts)
  // ==========================================
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
    title: 'Explain This Bill in Plain English',
    prompt: `I received this medical bill and I don't understand what any of it means. Please explain each charge in simple, everyday language:

[PASTE YOUR BILL HERE]

For each line item, tell me:
1. What service or item this actually is (in plain English, not medical jargon)
2. Whether this charge is typical for this type of service
3. Any questions I should ask the billing department about this charge

I have no medical background - please explain it like you're talking to a friend.`,
    whyItWorks: 'Medical bills use confusing codes and abbreviations on purpose. Getting a plain-English translation helps you understand what you\'re actually being charged for, which is the first step to spotting problems.',
    watchOutFor: [
      'Some codes have multiple meanings - ask the hospital to confirm',
      'Prices shown may not include insurance adjustments yet',
      'This doesn\'t tell you if prices are fair - just what they mean',
    ],
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },
  {
    title: 'Compare My Bill to My EOB',
    prompt: `I have my hospital bill and my insurance company's Explanation of Benefits (EOB). Please help me compare them to make sure they match.

HOSPITAL BILL:
[PASTE YOUR BILL HERE]

INSURANCE EOB:
[PASTE YOUR EOB HERE]

Please check:
1. Do the charges on the bill match what insurance was billed?
2. Did the hospital apply my insurance correctly?
3. Is my "patient responsibility" amount the same on both?
4. Are there any charges the hospital billed me that weren't submitted to insurance?
5. Are there any discrepancies I should dispute?`,
    whyItWorks: 'Your bill and EOB should tell the same story. When they don\'t match, it usually means the hospital made a billing error or didn\'t properly apply your insurance benefits.',
    watchOutFor: [
      'EOB dates and bill dates may not match exactly',
      'Some services may be billed separately from the main visit',
      'Make sure you have the final EOB, not a preliminary one',
    ],
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },
  {
    title: 'Decode These CPT Codes',
    prompt: `My medical bill has these CPT codes and I need to understand what they mean:

[LIST YOUR CPT CODES HERE, e.g., 99213, 36415, 80053]

For each code, please tell me:
1. What service or procedure this code represents
2. Whether this is commonly billed together with any of the other codes (which could indicate bundling issues)
3. A typical price range for this code
4. Any common billing errors associated with this code`,
    whyItWorks: 'CPT codes are the "secret language" of medical billing. Understanding what each code means lets you verify you actually received those services and that they\'re coded correctly.',
    watchOutFor: [
      'Some codes look similar but mean very different things',
      'Modifier codes (like -25 or -59) can significantly change the meaning',
      'Price ranges vary widely by location and facility type',
    ],
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },
  {
    title: 'Check for Surprise Billing Violations',
    prompt: `I received a medical bill that might be "surprise billing" or "balance billing." Please help me determine if this is legal.

My situation:
- Service received: [DESCRIBE THE SERVICE]
- Where: [Hospital name and type - in-network or out-of-network]
- Date of service: [DATE]
- Was it an emergency? [YES/NO]
- Did I sign any consent forms for out-of-network care? [YES/NO/UNSURE]
- Bill amount: $[AMOUNT]
- What insurance covered: $[AMOUNT]
- What they want me to pay: $[AMOUNT]

Please explain:
1. Does the No Surprises Act apply to my situation?
2. Am I being illegally balance billed?
3. What protections do I have?
4. What should I do next?`,
    whyItWorks: 'The No Surprises Act (2022) protects you from many surprise bills. If a hospital or doctor violated this law, you may not have to pay the balance they\'re demanding.',
    watchOutFor: [
      'The law has some exceptions - ground ambulances aren\'t covered',
      'You may have signed away some protections without realizing',
      'State laws may provide additional protections',
    ],
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },
  {
    title: 'Audit My ER Bill',
    prompt: `I went to the emergency room and received a huge bill. Please help me audit it for common ER billing problems.

Visit details:
- Date: [DATE]
- Reason for visit: [DESCRIBE WHY YOU WENT]
- How long was I there? [APPROXIMATE TIME]
- What tests/procedures did I have? [LIST WHAT YOU REMEMBER]
- Was I admitted or discharged? [ADMITTED/DISCHARGED]

Here's my bill:
[PASTE YOUR ITEMIZED BILL HERE]

Please look for:
1. "Facility fees" that seem excessive
2. Charges for tests I don't remember getting
3. Upcoded ER visit levels (Level 4/5 when it should be lower)
4. Charges that don't match my length of stay
5. Duplicate charges for the same service`,
    whyItWorks: 'ER bills are notoriously inflated and error-prone. The ER "level" coding alone is frequently upcoded, and facility fees can be outrageous. This audit catches the most common ER billing abuses.',
    watchOutFor: [
      'You may have received tests while sedated or unconscious',
      'Multiple doctors may bill separately (you might get more bills)',
      'ER visits are expensive even when coded correctly',
    ],
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },

  // ==========================================
  // MEDICAL BILLS - ERROR DETECTION (5 prompts)
  // ==========================================
  {
    title: 'Find Duplicate Charges',
    prompt: `Please review this medical bill and identify any duplicate or redundant charges:

[PASTE YOUR ITEMIZED BILL HERE]

Look for:
1. The exact same service billed twice
2. Services billed on multiple dates that should only occur once
3. Charges for supplies that are typically included in a procedure fee
4. Lab tests that appear to be run twice unnecessarily
5. Medications listed multiple times

For each potential duplicate, explain why you think it might be an error and what I should ask the billing department.`,
    whyItWorks: 'Duplicate billing is one of the most common hospital billing errors. Studies show it happens in a significant percentage of bills, especially for supplies and lab work.',
    watchOutFor: [
      'Some services legitimately occur multiple times',
      'Different CPT codes might be for the same service at different times',
      'Ask for explanation - don\'t just assume it\'s wrong',
    ],
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },
  {
    title: 'Spot Unbundling Fraud',
    prompt: `Check this bill for "unbundling" - where services that should be billed as one package are separated into multiple charges to increase the total:

[PASTE YOUR ITEMIZED BILL HERE]

Main procedure I had: [DESCRIBE YOUR PROCEDURE]

Please identify:
1. Services that are typically included in the main procedure fee but billed separately
2. Lab panels that were "unbundled" into individual tests
3. Supplies that should be included in surgery fees
4. Anesthesia charges that seem separate from surgery
5. Any other charges that appear to be artificially separated

For each issue, explain the correct way it should have been billed.`,
    whyItWorks: 'Unbundling is illegal but common. Hospitals separate one procedure into multiple charges to get paid more. Knowing what should be bundled gives you ammunition to dispute.',
    watchOutFor: [
      'Some separate charges are legitimate',
      'Complex procedures may have valid multiple components',
      'Insurance companies also catch unbundling - check your EOB',
    ],
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },
  {
    title: 'Detect Upcoding',
    prompt: `I think my bill might have "upcoding" - being charged for a more expensive service than I received. Please analyze:

What I actually received:
- Type of visit: [Office visit / ER visit / Hospital stay / Procedure]
- Complexity: [Simple issue / Moderate / Complex - describe briefly]
- Time spent: [How long approximately]
- Tests/procedures: [What was actually done]

What I was charged (from my bill):
[PASTE RELEVANT CHARGES HERE]

Please check:
1. Is the visit level code appropriate for what I described?
2. Are procedure codes matching the actual services?
3. Is the diagnosis code accurate for my condition?
4. Any charges that suggest a more complex service than provided?`,
    whyItWorks: 'Upcoding means you\'re charged for a fancier service than you got - like being billed for a 45-minute complex visit when you saw the doctor for 10 minutes. It\'s illegal and surprisingly common.',
    watchOutFor: [
      'Doctors document things you might not remember',
      'Complexity isn\'t just about time - diagnosis matters too',
      'Your perception of "simple" might differ from medical standards',
    ],
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },
  {
    title: 'Check for Wrong Patient Charges',
    prompt: `I think some charges on my bill might be for services I never received, or might be for another patient. Please help me verify:

My visit details:
- Date(s) of service: [DATE(S)]
- Reason for visit: [WHY YOU WENT]
- What I remember receiving: [LIST SERVICES YOU REMEMBER]
- My diagnosis: [IF YOU KNOW IT]

My bill:
[PASTE YOUR ITEMIZED BILL HERE]

Please flag:
1. Any services that don't make sense for my diagnosis
2. Charges for body parts or conditions I don't have
3. Medications I would remember taking but didn't
4. Procedures that would have been memorable but I don't recall
5. Services dated when I wasn't at the facility`,
    whyItWorks: 'Patient identity mix-ups happen more often than you\'d think. If charges don\'t match your actual visit, you shouldn\'t pay for someone else\'s care.',
    watchOutFor: [
      'You may have received services while sedated',
      'Some services happen behind the scenes (lab work processing)',
      'Confirm with medical records, not just memory',
    ],
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },
  {
    title: 'Review Medication Charges',
    prompt: `Please review the medication charges on my hospital bill for potential errors:

[PASTE MEDICATION CHARGES FROM YOUR BILL]

While I was there, I remember being given: [LIST MEDICATIONS YOU REMEMBER]
My regular medications I brought from home: [LIST ANY YOU BROUGHT]

Please check:
1. Am I being charged for medications I brought from home?
2. Are there any extremely overpriced common medications (like $50 Tylenol)?
3. Do the quantities make sense for my length of stay?
4. Are there duplicate medication charges?
5. Any medications that don't match my condition?

Also tell me which charges are most worth disputing.`,
    whyItWorks: 'Medication markup is one of the worst hospital billing abuses. Hospitals charge $10-50 for pills that cost pennies. You shouldn\'t pay for meds you brought yourself or didn\'t take.',
    watchOutFor: [
      'IV medications are legitimately more expensive than pills',
      'You may have received medications you don\'t remember',
      'Some expensive medications might be correct but negotiable',
    ],
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },

  // ==========================================
  // MEDICAL BILLS - NEGOTIATION SCRIPTS (5 prompts)
  // ==========================================
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
    title: 'Phone Script: Disputing Billing Errors',
    prompt: `Write a phone script I can use to dispute these billing errors with the hospital:

Errors I found:
[LIST THE SPECIFIC ERRORS - e.g., duplicate charge for blood draw, wrong date of service, etc.]

Total amount I'm disputing: $[AMOUNT]

I need a script that:
1. Professionally states I'm disputing specific charges
2. References the specific line items and why they're wrong
3. Requests they put a hold on my account while investigating
4. Asks what documentation I need to provide
5. Gets a timeline for resolution
6. Documents the call properly`,
    whyItWorks: 'Calling with specific, documented errors is much more effective than vague complaints. Having a script keeps you focused and professional, even if the call gets stressful.',
    watchOutFor: [
      'Don\'t agree to pay anything until disputes are resolved',
      'Request the dispute be noted on your account in writing',
      'Set a calendar reminder to follow up if you don\'t hear back',
    ],
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },
  {
    title: 'Phone Script: Asking for a Discount',
    prompt: `Write a phone script for calling the hospital to negotiate a lower bill. My situation:

Original bill: $[AMOUNT]
Amount I can afford: $[AMOUNT]
My insurance status: [Insured - what % they covered / Uninsured]
Fair market price I researched: $[AMOUNT IF KNOWN]

Please give me a script that:
1. Opens professionally and explains I want to discuss my bill
2. Asks about available discounts (cash pay, prompt pay, self-pay rates)
3. Mentions the fair market price if I have it
4. Proposes a specific lower amount
5. Handles common pushback responses
6. Escalates to a supervisor if needed`,
    whyItWorks: 'Hospitals almost always have room to negotiate, but they won\'t offer discounts unless you ask. Having specific numbers and a calm, professional approach dramatically improves your chances.',
    watchOutFor: [
      'Don\'t accept the first offer - there\'s usually room to go lower',
      'Get any agreement in writing before paying',
      'Ask about interest-free payment plans as a backup',
    ],
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },
  {
    title: 'Phone Script: Charity Care Application',
    prompt: `Write a phone script for calling the hospital to ask about charity care or financial assistance programs.

My situation:
- Total bill: $[AMOUNT]
- Annual household income: $[AMOUNT]
- Family size: [NUMBER]
- Employment status: [EMPLOYED/UNEMPLOYED/PART-TIME]
- Other circumstances: [ANY HARDSHIP - job loss, other medical bills, etc.]

I need a script that:
1. Asks what financial assistance programs are available
2. Asks about income limits for charity care
3. Requests an application form
4. Asks what documentation I'll need (pay stubs, tax returns, etc.)
5. Gets a timeline for decisions
6. Asks if they can put a hold on the account while I apply`,
    whyItWorks: 'Most nonprofit hospitals are legally required to have charity care programs, but they often don\'t advertise them. Being direct about needing help and asking the right questions gets you access to these programs.',
    watchOutFor: [
      'Income limits vary widely by hospital and location',
      'Gather your documents before calling to speed up the process',
      'You can often apply retroactively for bills already sent',
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

  // ==========================================
  // MEDICAL BILLS - LETTER WRITING (4 prompts)
  // ==========================================
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
  {
    title: 'Formal Billing Dispute Letter',
    prompt: `Write a formal dispute letter for errors I found in my medical bill.

My information:
- Patient name: [NAME]
- Account number: [NUMBER]
- Date of service: [DATE]
- Hospital/Provider: [NAME]

Errors I'm disputing:
[LIST EACH ERROR - e.g., "Line item for blood draw on 3/15 - this service was never performed"]

Total disputed amount: $[AMOUNT]

Please write a letter that:
1. Clearly identifies the account and charges in dispute
2. Explains each error specifically with evidence
3. Requests a corrected bill within 30 days
4. States I dispute this debt until errors are resolved
5. Requests written confirmation of receipt
6. Mentions I'm keeping records of all correspondence`,
    whyItWorks: 'A written dispute creates a paper trail and legal documentation. It\'s harder for the hospital to ignore than a phone call, and you\'ll have proof if you need to escalate.',
    watchOutFor: [
      'Send via certified mail with return receipt',
      'Keep copies of everything you send',
      'Follow up if you don\'t get a response in 30 days',
    ],
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },
  {
    title: 'Appeal Insurance Denial Letter',
    prompt: `Help me write a letter to appeal my insurance company's denial of coverage.

Denial details:
- Insurance company: [NAME]
- Claim number: [NUMBER]
- Service denied: [DESCRIBE THE SERVICE]
- Date of service: [DATE]
- Denial reason given: [WHAT THEY SAID]
- Amount denied: $[AMOUNT]

Why I believe it should be covered:
[EXPLAIN YOUR REASONING]

Please write an appeal letter that:
1. References my policy and the specific denial
2. Explains why the service should be covered
3. Cites relevant policy language if possible
4. Includes medical necessity arguments
5. Requests a full review and reconsideration
6. Notes my right to external review if denied again`,
    whyItWorks: 'Insurance companies deny claims knowing most people won\'t appeal. But appeals are successful about 50% of the time. A well-documented appeal with medical necessity arguments significantly improves your odds.',
    watchOutFor: [
      'Check your appeal deadline - usually 180 days but varies',
      'Ask your doctor for a supporting letter',
      'You may have multiple levels of appeal available',
    ],
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },
  {
    title: 'Payment Plan Proposal Letter',
    prompt: `Write a letter proposing a payment plan for my medical bill.

My situation:
- Total amount owed: $[AMOUNT]
- Monthly amount I can afford: $[AMOUNT]
- Proposed payment duration: [NUMBER] months
- Reason for needing a payment plan: [BRIEF EXPLANATION]

Please write a letter that:
1. Acknowledges the debt professionally
2. Explains my current financial constraints
3. Proposes specific monthly payment amount
4. Requests no interest or late fees during the plan
5. Offers to set up automatic payments
6. Asks for written confirmation of the arrangement`,
    whyItWorks: 'Most hospitals prefer a payment plan over sending you to collections. By proposing specific terms in writing, you show good faith and create documentation of your agreement.',
    watchOutFor: [
      'Don\'t agree to more than you can actually afford',
      'Get the payment plan terms in writing before paying',
      'Some hospitals charge interest - try to negotiate it away',
    ],
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },

  // ==========================================
  // MEDICAL BILLS - RESEARCH (4 prompts)
  // ==========================================
  {
    title: 'Find Hospital Charity Care Policy',
    prompt: `Help me find and understand the charity care or financial assistance policy for this hospital:

Hospital name: [NAME]
Hospital location: [CITY, STATE]

Please:
1. Search for their charity care policy (it should be publicly available)
2. Explain the income limits for assistance (usually based on Federal Poverty Level)
3. Tell me what percentage of the bill might be forgiven at my income level
4. List what documents I'll likely need to apply
5. Explain the application process
6. Note any deadlines for applying

My annual household income is approximately $[AMOUNT] with [NUMBER] people in my household.`,
    whyItWorks: 'Nonprofit hospitals are legally required to have charity care policies and make them available. Knowing the specific policy for your hospital tells you exactly what you qualify for.',
    watchOutFor: [
      'Income limits vary widely between hospitals',
      'Some hospitals are more generous than legally required',
      'For-profit hospitals may have different (or no) programs',
    ],
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },
  {
    title: 'Understand My Insurance Benefits',
    prompt: `Help me understand my health insurance benefits for this situation:

My insurance type: [HMO/PPO/EPO/HDHP/etc. if you know]
My situation: [DESCRIBE YOUR MEDICAL SITUATION OR PROCEDURE]
Was the provider in-network? [YES/NO/UNSURE]

Please explain in simple terms:
1. What's the difference between deductible, copay, and coinsurance?
2. What does "out-of-pocket maximum" mean?
3. If I've hit my deductible, what should I still owe?
4. What happens if the provider was out-of-network?
5. What should I check on my Explanation of Benefits (EOB)?
6. What are common mistakes that lead to higher bills?`,
    whyItWorks: 'Insurance terminology is confusing on purpose. Understanding these basics helps you spot when you\'re being charged more than you should be.',
    watchOutFor: [
      'In-network vs out-of-network can dramatically change your costs',
      'Deductibles reset each year - timing matters',
      'Family vs individual limits are different',
    ],
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },
  {
    title: 'What Questions Should I Ask?',
    prompt: `I'm about to call about my medical bill and want to be prepared. Give me a complete list of questions to ask.

My situation:
- Type of bill: [Hospital / Doctor / Lab / etc.]
- What I'm trying to accomplish: [Understand charges / Dispute errors / Get a discount / Set up payment plan]
- Bill amount: $[AMOUNT]
- Time I have available for the call: [MINUTES]

Please give me:
1. Questions to ask when I first get through
2. Questions about specific charges
3. Questions about discounts or financial assistance
4. Questions to ask if they push back
5. Questions about next steps and documentation
6. Red flags to listen for in their answers`,
    whyItWorks: 'Going into a billing call with prepared questions keeps you in control of the conversation and ensures you don\'t forget to ask something important.',
    watchOutFor: [
      'Write down answers during the call',
      'Get names and direct numbers for follow-up',
      'Don\'t agree to anything on the spot - say you\'ll call back',
    ],
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },
  {
    title: 'Know My State\'s Patient Rights',
    prompt: `What patient billing rights and protections do I have in my state?

My state: [STATE]
My situation: [DESCRIBE BRIEFLY - e.g., surprise bill, collections threat, etc.]

Please tell me:
1. Does my state have surprise billing protections?
2. Are there limits on how much hospitals can charge?
3. What are the rules about medical debt and collections?
4. Do I have a right to an itemized bill?
5. Are there charity care requirements for hospitals?
6. Where can I file a complaint if I'm treated unfairly?
7. Are there any recent laws that might help my situation?`,
    whyItWorks: 'Many states have strong patient protections that go beyond federal law. Knowing your state\'s specific rules can give you powerful leverage in disputes.',
    watchOutFor: [
      'Laws change frequently - verify current rules',
      'Some protections only apply to certain insurance types',
      'State Attorney General offices can be helpful resources',
    ],
    category: 'Medical Bills',
    categorySlug: 'medical-bills',
  },

  // ==========================================
  // DEBT COLLECTION - ANALYSIS (5 prompts)
  // ==========================================
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
    title: 'Is This Collection Call Legal?',
    prompt: `I received a phone call from a debt collector. Help me determine if they broke any laws.

What happened on the call:
- Time of call: [TIME AND TIMEZONE]
- What they said their name was: [NAME]
- Company they claimed to represent: [COMPANY]
- Did they identify themselves as a debt collector? [YES/NO]
- What they claimed I owe: $[AMOUNT] for [WHAT DEBT]
- How they spoke to me: [DESCRIBE THEIR TONE AND WHAT THEY SAID]
- Did they threaten anything? [DESCRIBE ANY THREATS]
- Did they say they'd call others (family, employer)? [YES/NO]
- Did they use profanity or insults? [YES/NO]

Please tell me:
1. Did they violate any FDCPA rules?
2. Which specific violations occurred?
3. What can I do about these violations?
4. Should I send a cease communication letter?`,
    whyItWorks: 'Debt collectors must follow strict rules about when and how they can contact you. Violations can result in $1,000+ in damages per call, which can be leverage to settle or dismiss the debt.',
    watchOutFor: [
      'Document every call with date, time, and notes',
      'Consider recording calls if legal in your state',
      'Multiple violations can add up to significant damages',
    ],
    category: 'Debt Collection',
    categorySlug: 'debt-collection',
  },
  {
    title: 'Is This Debt Actually Mine?',
    prompt: `A collector is contacting me about a debt, but I'm not sure if it's legitimately mine. Help me figure out what to do.

What they claim:
- Original creditor: [NAME]
- Type of debt: [CREDIT CARD/MEDICAL/LOAN/etc.]
- Amount claimed: $[AMOUNT]
- Date they say it's from: [DATE OR TIMEFRAME]

What I remember:
- Did I have an account with this company? [YES/NO/UNSURE]
- If yes, did I pay it off? [YES/NO/UNSURE]
- Could this be identity theft? [POSSIBLE/UNLIKELY]
- Is this old enough to be past statute of limitations? [YEARS AGO]

Please help me:
1. Understand what I should verify before responding
2. Know what NOT to say to the collector
3. Determine if this could be a case of mistaken identity
4. Know what documents to request from them
5. Understand my options if I truly don't owe this`,
    whyItWorks: 'Many collection attempts are for debts that are wrong, already paid, past the statute of limitations, or belong to someone else. You have the right to make them prove the debt is valid and yours.',
    watchOutFor: [
      'Never confirm personal information (SSN, DOB) to prove it\'s you',
      'Don\'t make any payments until you verify the debt',
      'Request everything in writing, not just phone calls',
    ],
    category: 'Debt Collection',
    categorySlug: 'debt-collection',
  },
  {
    title: 'Check If Collector Is Licensed',
    prompt: `Help me verify if this debt collector is legitimate and licensed in my state.

Collector information:
- Company name: [NAME]
- Address they gave: [ADDRESS]
- Phone number: [NUMBER]
- Website (if any): [URL]
- My state: [STATE]

Please help me:
1. Find how to look up licensed debt collectors in my state
2. Understand what information legitimate collectors must provide
3. Identify red flags that suggest this might be a scam
4. Know what to do if they're not licensed
5. Find where to report unlicensed collectors`,
    whyItWorks: 'Many states require debt collectors to be licensed. If they\'re not licensed, the debt may be unenforceable and you can report them. This is powerful leverage.',
    watchOutFor: [
      'Scammers often use names similar to real companies',
      'Never give money to an unverified collector',
      'Report suspected scams to FTC and state AG',
    ],
    category: 'Debt Collection',
    categorySlug: 'debt-collection',
  },
  {
    title: 'Review Their Validation Response',
    prompt: `I sent a debt validation letter and received a response. Help me evaluate if they actually validated the debt.

What they sent me:
[DESCRIBE OR PASTE WHAT THEY PROVIDED]

What they should have provided:
1. Name of original creditor
2. Amount owed (broken down)
3. Proof they own or can collect the debt
4. Complete payment history
5. Proof I agreed to the original debt

Please tell me:
1. Did they actually validate the debt legally?
2. What's missing from their response?
3. If validation is insufficient, what are my options?
4. Should I respond to them, and if so, how?
5. Can I dispute this with credit bureaus now?`,
    whyItWorks: 'Many collectors can\'t properly validate debts, especially old ones. If they can\'t prove you owe it, they can\'t legally keep collecting, and it should come off your credit report.',
    watchOutFor: [
      'Just sending a bill is NOT proper validation',
      'They must show a chain of ownership for purchased debts',
      'Keep copies of everything they send',
    ],
    category: 'Debt Collection',
    categorySlug: 'debt-collection',
  },

  // ==========================================
  // DEBT COLLECTION - VALIDATION LETTERS (4 prompts)
  // ==========================================
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
    title: 'Cease and Desist Letter',
    prompt: `Write a cease and desist letter to stop a debt collector from contacting me.

Collector information:
- Company name: [NAME]
- Address: [ADDRESS]
- Account/Reference number: [NUMBER]

My situation: [CHOOSE ONE]
- I want them to stop all communication
- I only want them to communicate in writing
- I want them to only contact my attorney: [ATTORNEY NAME AND CONTACT]

Please write a letter that:
1. Clearly demands they cease contact under FDCPA Section 805(c)
2. States my preference for how/if they can contact me going forward
3. Warns them that violations will be documented
4. Preserves my right to dispute the debt
5. Is professional but firm`,
    whyItWorks: 'Under the FDCPA, you have the right to tell collectors to stop contacting you. They must comply (with limited exceptions). This stops harassment while you decide how to handle the debt.',
    watchOutFor: [
      'This doesn\'t make the debt go away',
      'They can still sue you even if they can\'t call',
      'Use certified mail with return receipt',
    ],
    category: 'Debt Collection',
    categorySlug: 'debt-collection',
  },
  {
    title: 'Dispute This Debt Letter',
    prompt: `Write a letter disputing this debt that a collector claims I owe.

Collector information:
- Company name: [NAME]
- Address: [ADDRESS]
- Account number: [NUMBER]
- Amount they claim: $[AMOUNT]

Why I'm disputing:
[SELECT ALL THAT APPLY]
- I don't recognize this debt
- I already paid this debt
- The amount is wrong
- The statute of limitations has passed
- This might be identity theft
- The creditor promised to forgive this debt
- Other: [EXPLAIN]

Please write a letter that:
1. Clearly states I dispute the debt
2. Explains my specific reasons
3. Requests they stop collection until providing validation
4. Mentions I'm keeping records of all violations
5. Is sent within the 30-day window (if applicable)`,
    whyItWorks: 'Disputing a debt in writing triggers legal protections. The collector must stop trying to collect until they validate, and if they can\'t validate, the debt often gets dropped.',
    watchOutFor: [
      'Send within 30 days of first contact for strongest protection',
      'Be specific about why you\'re disputing',
      'Keep copies of everything',
    ],
    category: 'Debt Collection',
    categorySlug: 'debt-collection',
  },
  {
    title: 'Identity Theft Dispute Letter',
    prompt: `Write letters disputing a debt that resulted from identity theft. I need letters for:
1. The debt collector
2. The original creditor
3. The credit bureaus

My information:
- My name: [NAME]
- Account being disputed: [ACCOUNT INFO FROM COLLECTION NOTICE]
- Collector name: [NAME]
- Fraudulent activity: [DESCRIBE WHAT HAPPENED]
- Police report number (if you have one): [NUMBER]
- FTC Identity Theft Report number (if you have one): [NUMBER]

Please write letters that:
1. Explain this debt is a result of identity theft
2. Request removal from my credit report
3. Include proper legal references
4. Request confirmation of removal in writing
5. Note my rights under FCRA and FDCPA`,
    whyItWorks: 'If the debt is from identity theft, you don\'t owe it. Providing proper documentation triggers legal obligations to remove it from your credit and stop collection.',
    watchOutFor: [
      'File a police report and FTC report first if you haven\'t',
      'You may need to provide an Identity Theft Affidavit',
      'Follow up if not resolved within 30 days',
    ],
    category: 'Debt Collection',
    categorySlug: 'debt-collection',
  },

  // ==========================================
  // DEBT COLLECTION - RIGHTS RESEARCH (4 prompts)
  // ==========================================
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
  {
    title: 'My State\'s Debt Collection Laws',
    prompt: `What additional debt collection protections does my state provide beyond federal law?

My state: [STATE]

Please explain:
1. Does my state have stricter rules than the federal FDCPA?
2. Are there licensing requirements for collectors?
3. What are the statute of limitations periods?
4. Are there restrictions on wage garnishment?
5. Does my state protect certain income from collection?
6. Are there special rules for medical debt?
7. Where can I file complaints in my state?`,
    whyItWorks: 'Many states have stronger protections than federal law. Some ban certain collection practices, have shorter statutes of limitations, or require collectors to be licensed.',
    watchOutFor: [
      'State laws change - verify current rules',
      'Some protections only apply to certain debt types',
      'Federal AND state laws apply - you get both sets of protections',
    ],
    category: 'Debt Collection',
    categorySlug: 'debt-collection',
  },
  {
    title: 'What Can They Actually Do?',
    prompt: `A debt collector is threatening various actions. Help me understand what they can and cannot legally do.

What they're threatening:
[SELECT ALL THAT APPLY]
- Report to credit bureaus
- Sue me
- Garnish my wages
- Take my house
- Take my car
- Freeze my bank account
- Contact my employer
- Contact my family
- Have me arrested
- Other: [SPECIFY]

My situation:
- Debt amount: $[AMOUNT]
- Type of debt: [TYPE]
- My state: [STATE]
- My employment status: [EMPLOYED/SELF-EMPLOYED/UNEMPLOYED]
- Do I own property? [YES/NO]

Please explain:
1. Which of these threats are legal?
2. Which are empty threats or illegal?
3. What realistically could happen?
4. What assets are protected in my state?
5. What should I do if they follow through?`,
    whyItWorks: 'Collectors often threaten actions they can\'t or won\'t take. Knowing what\'s actually possible helps you respond calmly and not panic into bad decisions.',
    watchOutFor: [
      'Threats to arrest you for civil debt are always illegal',
      'What they CAN do varies by state and debt type',
      'Document all illegal threats',
    ],
    category: 'Debt Collection',
    categorySlug: 'debt-collection',
  },

  // ==========================================
  // DEBT COLLECTION - RESPONSE STRATEGIES (4 prompts)
  // ==========================================
  {
    title: 'Should I Pay, Settle, or Fight?',
    prompt: `Help me decide the best strategy for dealing with this debt.

My situation:
- Debt amount: $[AMOUNT]
- Type of debt: [TYPE]
- How old is the debt: [YEARS/MONTHS]
- Who's collecting: [ORIGINAL CREDITOR or COLLECTOR NAME]
- Can I afford to pay it? [YES - FULL / YES - PARTIAL / NO]
- Is it on my credit report? [YES/NO]
- Have I been sued? [YES/NO]
- Do I have evidence of errors or violations? [YES/NO - DESCRIBE]

Please help me understand:
1. What are my realistic options?
2. Pros and cons of each option
3. How will each option affect my credit?
4. If I settle, what percentage should I aim for?
5. What should I do first?
6. What should I NEVER do?`,
    whyItWorks: 'Different situations call for different strategies. Paying a time-barred debt might restart the clock. Ignoring a valid debt might lead to a lawsuit. Understanding your specific situation helps you choose wisely.',
    watchOutFor: [
      'Never make decisions based on collector pressure',
      'Get any settlement agreement in writing BEFORE paying',
      'Partial payments can restart the statute of limitations',
    ],
    category: 'Debt Collection',
    categorySlug: 'debt-collection',
  },
  {
    title: 'Settlement Offer Letter',
    prompt: `Write a settlement offer letter for this debt.

My situation:
- Debt amount claimed: $[AMOUNT]
- What I can afford to pay: $[AMOUNT] as [LUMP SUM / PAYMENTS]
- Collector name: [NAME]
- Account number: [NUMBER]

I want to offer [X]% of the balance because:
[EXPLAIN YOUR REASONING - e.g., debt is old, I have limited income, statute of limitations is near, etc.]

Please write a letter that:
1. Offers a specific settlement amount
2. Explains why this is a reasonable offer
3. Requests they report as "paid in full" or "settled" to credit bureaus
4. Requires written acceptance before I send any money
5. Gives them a deadline to respond (30 days)
6. States the settlement is contingent on proper documentation`,
    whyItWorks: 'Collectors often buy debt for pennies on the dollar. They\'d rather get 30-50% than nothing. A well-written offer shows you\'re serious but won\'t be pushed around.',
    watchOutFor: [
      'NEVER send money until you have written agreement',
      'Get agreement on how it will be reported to credit bureaus',
      'Keep the settlement letter forever',
    ],
    category: 'Debt Collection',
    categorySlug: 'debt-collection',
  },
  {
    title: 'Respond to a Lawsuit',
    prompt: `I've been sued for a debt. Help me understand what to do.

Lawsuit details:
- Court: [NAME OF COURT]
- Creditor/Plaintiff: [WHO'S SUING]
- Amount claimed: $[AMOUNT]
- Response deadline: [DATE]
- Have I been served officially? [YES/NO]
- My state: [STATE]

My situation:
- Do I owe this debt? [YES/NO/UNSURE]
- Can I afford a lawyer? [YES/NO]
- Is this debt time-barred? [YES/NO/UNSURE]

Please explain:
1. What happens if I don't respond?
2. What should my answer include?
3. What defenses might apply to me?
4. How do I file my answer?
5. Should I try to settle before the court date?
6. What low-cost legal help is available?`,
    whyItWorks: 'Many people ignore debt lawsuits and get default judgments against them. Just showing up and filing an answer can lead to dismissal, settlement, or exposing the collector\'s lack of evidence.',
    watchOutFor: [
      'Missing the deadline = automatic loss',
      'You don\'t need a lawyer to file an answer',
      'Many debt suits are dismissed when challenged',
    ],
    category: 'Debt Collection',
    categorySlug: 'debt-collection',
  },
  {
    title: 'Credit Report Dispute Strategy',
    prompt: `Help me dispute this debt on my credit reports.

Debt details on my report:
- Creditor/Collector name: [NAME]
- Account number: [LAST 4 DIGITS]
- Amount shown: $[AMOUNT]
- Status shown: [IN COLLECTIONS / CHARGE OFF / etc.]

Why I want to dispute:
[SELECT ALL THAT APPLY]
- The debt isn't mine
- The amount is wrong
- It's past 7 years old
- I paid this already
- The collector can't validate it
- The dates are wrong
- This is duplicate reporting
- Other: [EXPLAIN]

Please help me:
1. Write a dispute letter for each credit bureau
2. Explain what evidence to include
3. Understand what happens after I dispute
4. Know my rights under FCRA
5. Plan next steps if dispute is rejected`,
    whyItWorks: 'Credit bureaus must investigate disputes within 30 days. If they can\'t verify the information, they must remove it. Many collection accounts disappear when properly disputed.',
    watchOutFor: [
      'Dispute with all three bureaus (Equifax, Experian, TransUnion)',
      'Keep copies of everything you send',
      'Follow up if you don\'t hear back in 30 days',
    ],
    category: 'Debt Collection',
    categorySlug: 'debt-collection',
  },

  // ==========================================
  // DEBT COLLECTION - COMMUNICATION SCRIPTS (4 prompts)
  // ==========================================
  {
    title: 'Phone Script: First Collector Call',
    prompt: `A debt collector just called me for the first time. Write a script for how to handle this call.

The call:
- Who called: [NAME/COMPANY if they said]
- What they claimed: $[AMOUNT] for [WHAT DEBT]
- Are they still on the line? [YES - HELP ME NOW / NO - FOR NEXT TIME]

I need a script that:
1. Gets their full company name, address, and callback number
2. Gets the account number and original creditor name
3. Does NOT admit the debt is mine
4. Does NOT agree to anything
5. Tells them I'll respond in writing
6. Ends the call professionally

Also tell me what I should NEVER say on this call.`,
    whyItWorks: 'The first contact call is crucial. What you say can be used against you. This script helps you gather information while protecting your rights.',
    watchOutFor: [
      'Never say "yes that\'s my debt" or "I\'ll pay you"',
      'Don\'t give them any personal information they don\'t already have',
      'Don\'t let them pressure you into a decision on the call',
    ],
    category: 'Debt Collection',
    categorySlug: 'debt-collection',
  },
  {
    title: 'What to Say If They Call at Work',
    prompt: `A debt collector called me at work. Help me handle this.

What happened:
- Did they tell your employer why they were calling? [YES/NO]
- Did they call your direct line or the main number? [DIRECT/MAIN]
- Have you told them not to call you at work before? [YES/NO]
- Did they leave a message with anyone else? [YES/NO - WHO?]

Please give me:
1. What to say RIGHT NOW if they call again at work
2. A letter demanding they stop calling my workplace
3. An explanation of whether they broke the law
4. How to document this for potential FDCPA claim
5. Script for if they call the main number again`,
    whyItWorks: 'Collectors cannot call you at work if they know or should know your employer disapproves. And they can NEVER tell your coworkers about your debt. This is a common violation worth documenting.',
    watchOutFor: [
      'Tell them "don\'t call me at work" - that triggers legal protection',
      'Document date, time, and what was said',
      'Calls to employers are often FDCPA violations',
    ],
    category: 'Debt Collection',
    categorySlug: 'debt-collection',
  },
  {
    title: 'Negotiation Script: Settle for Less',
    prompt: `Write a phone script for negotiating a settlement with a debt collector.

My situation:
- Debt amount: $[AMOUNT]
- What I can realistically pay: $[AMOUNT]
- Is this original creditor or collection agency? [ORIGINAL/COLLECTION]
- How old is the debt: [AGE]
- Is it affecting my credit? [YES/NO]

I want to settle for [X]% of the balance.

Please give me:
1. Opening statement
2. How to make my first offer (always start lower than my max)
3. Responses to their counter-offers
4. How to insist on written confirmation
5. What to say to get them to report it favorably to credit bureaus
6. How to end the call without committing if needed`,
    whyItWorks: 'Collectors expect negotiation. They often accept 30-60% of the balance. Having a script keeps you calm and strategic instead of emotional.',
    watchOutFor: [
      'NEVER give bank account or card info until you have written agreement',
      'Get the settlement in writing FIRST, then pay',
      'Ask for "paid in full" reporting, not "settled for less"',
    ],
    category: 'Debt Collection',
    categorySlug: 'debt-collection',
  },
  {
    title: 'How to Record Collection Calls',
    prompt: `I want to record my calls with debt collectors to document violations. Help me do this legally.

My state: [STATE]
The collector's state (if known): [STATE]

Please tell me:
1. Is it legal to record calls in my state?
2. Do I need to tell them I'm recording?
3. What should I say at the start of the call if I need consent?
4. What apps or tools can I use to record?
5. How should I store and organize recordings?
6. How can recordings help me if they violate the law?`,
    whyItWorks: 'Recorded proof of FDCPA violations is powerful. A single recorded threat or harassment could be worth $1,000 or more in statutory damages.',
    watchOutFor: [
      'Some states require all-party consent',
      'Always check your state\'s specific laws',
      'Even in one-party states, announcing recording is smart',
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
                      ? 'bg-[var(--color-primary-button)] text-white'
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
