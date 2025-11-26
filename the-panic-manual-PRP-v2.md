# The Panic Manual - Product Requirements Prompt v2.0

> **AI-Powered Financial Agency for Life's Worst Mail**

Build a production-ready, content-focused website that helps people understand and fight back against confusing institutional documents using AI. Next.js 15 App Router + MDX + Tailwind CSS design system + privacy-respecting analytics + distinctive "Civic Modernism with Warmth" visual identity + comprehensive AEO/SEO optimization.

---

## Goal

Build The Panic Manual MVP - a free, ad-supported website featuring:

- **5 Core Panic Guides** across 2 categories (Medical Bills, Debt Collection)
- **40+ AI Prompts** organized by scenario, with copy-to-clipboard functionality
- **Distinctive "Civic Modernism with Warmth" design** using Fraunces + Literata typography
- **Dark Mode Default** with accessible Light Mode toggle
- **Interactive UI components**: Breath Box, Prompt Cards, Progress Checklists
- **Ethical Social Proof**: Community Impact Counter, Methodology Transparency, Trust Architecture
- **AI Toolkit** with editorial (non-sponsored) tool comparisons
- **Full AEO/SEO/Accessibility optimization** with schema markup and llms.txt
- **Privacy-respecting monetization** via EthicalAds + optional donations

**End State**: Production-deployed site on Vercel with Lighthouse scores 95+ (Performance), 100 (Accessibility), 100 (SEO), excellent Answer Engine visibility, and print-friendly guide styles.

---

## Why

### Business Value

- **Fills a gap**: No existing resource teaches people HOW to use AI effectively for high-stakes document analysis
- **Evergreen content**: Medical bills and debt collection are perennial problems with strong organic search intent
- **Trust-building positioning**: "No sponsors, no affiliates" differentiates from affiliate-heavy personal finance sites
- **Foundation for expansion**: MVP categories prove model for Housing, Insurance, Tax, Employment panic guides
- **AEO-First Strategy**: Optimized to be cited in AI-generated answers (ChatGPT, Perplexity, Google AI Overviews)

### User Impact

- **Immediate relief**: "The Breath" section lowers cortisol before tactical guidance
- **Empowerment**: Treats users as "intelligent adults being manipulated" not confused people needing hand-holding
- **Real results**: Users learn transferable AI skills, not just one-time answers
- **Verification mindset**: Teaches healthy AI skepticism - run prompts multiple times, try different LLMs

### Technical Innovation

- **MDX-powered content** with custom React components embedded in guides
- **Local storage progress tracking** for multi-step guides (dopamine hits during depressing processes)
- **Copy-to-clipboard prompts** with syntax highlighting and "Why This Works" expandable sections
- **Print-friendly CSS** so users can print guides and letters
- **Structured data/Schema markup** for AEO optimization
- **llms.txt and robots.txt** for AI crawler guidance

---

## What

### User-Visible Features

**Core Pages**:

1. **Home (/)** - Brand thesis, "What landed in your mailbox?" quick navigation, community impact, trust signals
2. **Guides Hub (/guides)** - Category navigation with search/filter
3. **Individual Guides (/guides/[category]/[slug])** - Full panic guide with all sections
4. **Prompt Library (/prompts)** - Browsable/searchable copy-paste prompts (40+ prompts)
5. **AI Toolkit (/ai-toolkit)** - Editorial AI tool comparisons, usage tutorials
6. **About (/about)** - Mission, methodology transparency, why no sponsors, trust statement
7. **Verification (/verification)** - AI verification philosophy and practices
8. **Donate (/donate)** - Optional donation page (no guilt)

**Interactive Components**:

- **Breath Box**: Calming reassurance at top of every guide ("You're not going to jail")
- **Prompt Cards**: Copy-paste blocks with one-click copy, syntax highlighting, expandable "Why This Works"
- **Progress Checklist**: Interactive checkboxes with local storage persistence and completion percentage
- **Community Impact Counter**: Aggregate anonymized usage statistics (not testimonials)
- **Methodology Cards**: How each guide was researched and verified

---

## Content Strategy: 5 Guides + 40+ Prompts

### Guide Structure (5 Core Guides)

**Medical Bills (3 guides)**:
1. `huge-medical-bill.mdx` - Anchor guide: Complete analysis and negotiation workflow
2. `itemized-bill.mdx` - How to request and analyze itemized statements
3. `negotiate-payment.mdx` - Financial hardship programs and payment negotiation

**Debt Collection (2 guides)**:
4. `collections-letter.mdx` - Anchor guide: What to do when you get a collection letter
5. `debt-validation.mdx` - FDCPA rights and validation letter templates

### Prompt Library Structure (40+ Prompts)

Prompts organized by **category** and **scenario**, each with:
- Title
- The prompt itself (copy-to-clipboard)
- "Why This Works" explanation
- "Watch Out For" warnings
- Follow-up prompt suggestions

**Medical Bills Prompts (20+)**:
- Bill analysis prompts (5-6)
- Error detection prompts (4-5)
- Negotiation script prompts (4-5)
- Letter writing prompts (3-4)
- Research prompts (3-4)

**Debt Collection Prompts (20+)**:
- Validation letter prompts (4-5)
- Rights research prompts (4-5)
- Response strategy prompts (4-5)
- Statute of limitations prompts (3-4)
- Communication script prompts (3-4)

---

## Ethical Social Proof Strategy

### ❌ REMOVED: Fake Testimonials

The original PRP included fabricated "WinCard" testimonials with made-up savings amounts and anonymized stories. These are ethically problematic because:
- They deceive users about the existence of real success stories
- They undermine trust when detected
- They set unrealistic expectations
- They're potentially illegal under FTC guidelines

### ✅ REPLACEMENT: Trust Architecture

**1. Community Impact Counter** (Real aggregated data only when available)
```tsx
interface CommunityImpact {
  promptsCopied: number      // Real analytics data
  guidesViewed: number       // Real analytics data
  toolkitVisits: number      // Real analytics data
  // NO fabricated savings amounts or testimonial counts
}
```

Display only when you have REAL data to show. Start with:
- "Join [X] people learning to fight back" (based on actual unique visitors)
- "Prompts copied [Y] times" (based on actual copy events tracked)

**2. Methodology Transparency Cards**
```tsx
interface MethodologyCard {
  guideTitle: string
  researchSources: string[]   // Actual sources consulted
  lastUpdated: Date           // Real last-reviewed date
  expertReviewed: boolean     // Only true if actually reviewed
  knownLimitations: string[]  // Honest limitations
}
```

Each guide includes a "How This Guide Was Made" section showing:
- Sources consulted (government websites, legal aid resources, consumer protection guides)
- Last update date
- Known limitations and edge cases
- Disclaimer about AI limitations

**3. Trust Signals (Honest Ones)**
```tsx
// ACCEPTABLE trust signals
const trustSignals = {
  noSponsors: true,           // Verifiable claim
  noAffiliates: true,         // Verifiable claim
  openSource: boolean,        // Link to repo if true
  noTracking: boolean,        // Privacy-respecting analytics
  citedSources: number,       // Actual source count per guide
}
```

**4. User Submission System (Future Feature)**
When ready to collect REAL testimonials:
- Implement a submission form with verification
- Include consent for anonymized sharing
- Never fabricate or enhance stories
- Display only verified submissions

**5. External Validation**
- Link to third-party reviews (if any exist)
- Display any press mentions (when earned)
- Show community discussions (Reddit threads mentioning the resource, etc.)

---

## Dark Mode Default + Accessible Light Mode

### Theme Strategy

**Default: Dark Mode** - Reduces eye strain for users stressed about financial documents
**Toggle: Light Mode** - Essential for accessibility (some users have conditions requiring light backgrounds)

### Implementation

```tsx
// src/app/layout.tsx - Dark mode by default
<html lang="en" suppressHydrationWarning>
  <head>
    <script
      dangerouslySetInnerHTML={{
        __html: `
          try {
            // Default to dark, unless user explicitly chose light
            if (localStorage.theme === 'light') {
              document.documentElement.classList.remove('dark')
            } else {
              document.documentElement.classList.add('dark')
              // Store dark as explicit choice if no preference set
              if (!localStorage.theme) {
                localStorage.theme = 'dark'
              }
            }
          } catch (_) {
            document.documentElement.classList.add('dark')
          }
        `,
      }}
    />
  </head>
  <body>
    <ThemeProvider 
      attribute="class" 
      defaultTheme="dark"  // Dark is now default
      enableSystem={false}  // Don't follow system - we default dark
    >
      {children}
    </ThemeProvider>
  </body>
</html>
```

### Color Palette: Dark Mode Primary

```css
:root {
  /* Light Mode Variables (when .dark is NOT present) */
  --color-background: #FDFCFA;
  --color-background-50: #FDFCFA;
  --color-background-100: #F7F5F2;
  --color-background-200: #EFECEA;
  --color-text: #1E1E1E;
  --color-text-muted: #4A4A4A;
  --color-breath: #EDF3F7;
}

.dark {
  /* Dark Mode Variables (DEFAULT) */
  --color-background: #0F1419;
  --color-background-50: #0F1419;
  --color-background-100: #1A2128;
  --color-background-200: #252D35;
  --color-background-300: #2F3942;
  --color-text: #F5F5F5;
  --color-text-muted: #A0A0A0;
  --color-text-light: #707070;
  --color-breath: #1A2835;
  
  /* Adjusted accent colors for dark mode contrast */
  --color-primary: #6BA3C7;      /* Lighter blue for dark bg */
  --color-accent: #E8956A;        /* Slightly lighter orange */
  --color-success: #7AAD7A;       /* Lighter green */
}
```

### Accessibility Requirements for Light Mode

Light mode must meet WCAG 2.1 AA standards:
- Contrast ratio minimum 4.5:1 for normal text
- Contrast ratio minimum 3:1 for large text and UI components
- Focus indicators clearly visible
- No loss of information when switching modes
- `prefers-reduced-motion` support in both modes

### Theme Toggle Component

```tsx
// src/components/ui/ThemeToggle.tsx
'use client'

import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg bg-background-200 hover:bg-background-300 transition-colors"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <SunIcon className="w-5 h-5" aria-hidden="true" />
      ) : (
        <MoonIcon className="w-5 h-5" aria-hidden="true" />
      )}
      <span className="sr-only">
        {theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </button>
  )
}
```

---

## AEO + SEO + Accessibility Optimization

### Answer Engine Optimization (AEO) Strategy

AEO ensures content is cited in AI-generated answers (ChatGPT, Perplexity, Google AI Overviews).

**Content Structure for AEO**:

1. **Inverted Pyramid Format**
   - Lead with the direct answer (first 50-100 words)
   - Expand with supporting details
   - End with edge cases and caveats

2. **Question-Based Headings**
   - Use H2/H3 headings in question form: "What should I do first?", "How do I request an itemized bill?"
   - These match natural language queries

3. **Clear, Quotable Summaries**
   - Each section starts with a 2-3 sentence summary that AI can extract
   - Use the "TL;DR" pattern at section tops

4. **Structured Lists**
   - Numbered steps for processes
   - Bullet points for options/alternatives
   - Comparison tables for "X vs Y" queries

**Example AEO-Optimized Section**:
```mdx
## What should I do when I receive a huge medical bill?

**The first thing you should do is NOT pay the bill immediately.** Medical bills 
frequently contain errors—studies show nearly 80% have mistakes. Instead, request 
an itemized bill, which breaks down every charge, then use AI tools to analyze it 
for duplicate charges, upcoding, and billing errors.

### Step 1: Request an Itemized Bill

Call the billing department and request a complete itemized bill (not just a 
summary). This is your legal right. The itemized bill will show every charge 
with CPT codes, allowing you to identify potential errors.

<PromptCard 
  title="Request Itemized Bill Script"
  prompt="..."
/>
```

### Schema Markup Implementation

**FAQPage Schema** (for guide pages):
```tsx
// src/lib/schema.ts
export function generateFAQSchema(faqs: {question: string, answer: string}[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}
```

**HowTo Schema** (for step-by-step guides):
```tsx
export function generateHowToSchema(guide: {
  title: string
  description: string
  steps: {name: string, text: string}[]
  totalTime?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": guide.title,
    "description": guide.description,
    "step": guide.steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text
    })),
    ...(guide.totalTime && { "totalTime": guide.totalTime })
  }
}
```

**Article Schema** (for all content pages):
```tsx
export function generateArticleSchema(article: {
  title: string
  description: string
  datePublished: string
  dateModified: string
  author: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.description,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "author": {
      "@type": "Organization",
      "name": "The Panic Manual"
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Panic Manual",
      "logo": {
        "@type": "ImageObject",
        "url": "https://thepanicmanual.com/images/logo.png"
      }
    }
  }
}
```

### SEO Technical Requirements

**Meta Tags Strategy**:
```tsx
// src/app/guides/[category]/[slug]/page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const guide = await getGuide(params.category, params.slug)
  
  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      authors: ['The Panic Manual'],
      tags: guide.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
    },
    alternates: {
      canonical: `https://thepanicmanual.com/guides/${params.category}/${params.slug}`,
    },
  }
}
```

**Technical SEO Checklist**:
- [ ] XML Sitemap at `/sitemap.xml`
- [ ] Canonical URLs on all pages
- [ ] Proper heading hierarchy (single H1, logical H2-H6)
- [ ] Image alt text for all images
- [ ] Internal linking structure between related guides
- [ ] 301 redirects for any URL changes
- [ ] Core Web Vitals optimization (LCP < 2.5s, CLS < 0.1, FID < 100ms)

### Accessibility (WCAG 2.1 AA Compliance)

**Requirements**:
- [ ] Color contrast minimum 4.5:1 (7:1 for AAA where possible)
- [ ] Keyboard navigation throughout
- [ ] Skip links for screen readers
- [ ] ARIA labels where needed (not on native elements)
- [ ] Focus indicators visible in both themes
- [ ] `prefers-reduced-motion` respected
- [ ] Form labels associated with inputs
- [ ] Error messages clearly associated with fields
- [ ] Link text descriptive (no "click here")

**Skip Link Implementation**:
```tsx
// src/components/layout/SkipLink.tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 
                 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white 
                 focus:rounded-lg"
    >
      Skip to main content
    </a>
  )
}
```

---

## robots.txt and llms.txt Specifications

### robots.txt (Permissive)

```txt
# robots.txt for The Panic Manual
# We welcome all crawlers - our mission is to help as many people as possible

User-agent: *
Allow: /

# Allow AI crawlers explicitly
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

# Standard exclusions
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

# Sitemap location
Sitemap: https://thepanicmanual.com/sitemap.xml
```

### llms.txt (AI Context File)

Create at `/public/llms.txt`:

```markdown
# The Panic Manual

> Free guides and AI prompts helping people understand and fight back against confusing 
> medical bills, collection letters, and other institutional documents. No sponsors, 
> no affiliates—just practical help.

The Panic Manual teaches people how to use AI tools (ChatGPT, Claude, etc.) to analyze 
complex financial documents, find errors in medical bills, understand their rights in 
debt collection, and write effective dispute letters. Our approach combines emotional 
support ("The Breath") with tactical AI prompts.

## Core Philosophy

- We treat users as intelligent adults being manipulated by opaque systems
- AI is a tool to level the playing field, not a replacement for professional advice
- Always verify AI outputs—run prompts multiple times, try different LLMs
- Medical and debt systems are designed to confuse; clarity is power

## Guides

- [I Got a Huge Medical Bill](https://thepanicmanual.com/guides/medical-bills/huge-medical-bill): Complete workflow for analyzing and fighting medical bills using AI
- [How to Request an Itemized Bill](https://thepanicmanual.com/guides/medical-bills/itemized-bill): Getting the documentation you need to find billing errors
- [Negotiating Medical Bills](https://thepanicmanual.com/guides/medical-bills/negotiate-payment): Financial hardship programs and payment negotiation strategies
- [I Got a Collections Letter](https://thepanicmanual.com/guides/debt-collection/collections-letter): What to do when a debt collector contacts you
- [Debt Validation Rights](https://thepanicmanual.com/guides/debt-collection/debt-validation): Your FDCPA rights and how to request debt validation

## Prompt Library

- [Medical Bill Prompts](https://thepanicmanual.com/prompts/medical-bills): 20+ prompts for analyzing bills, finding errors, negotiating
- [Debt Collection Prompts](https://thepanicmanual.com/prompts/debt-collection): 20+ prompts for validation, rights research, response strategies

## Resources

- [AI Toolkit](https://thepanicmanual.com/ai-toolkit): Editorial comparisons of AI tools for document analysis
- [Verification Guide](https://thepanicmanual.com/verification): How to verify AI outputs and avoid errors
- [About Us](https://thepanicmanual.com/about): Our mission and methodology

## Key Information

- All content is educational, not legal or financial advice
- We have no sponsors, affiliates, or paid placements
- Content is regularly updated with latest regulatory information
- Users should always consult professionals for serious legal/financial decisions
```

### llms-full.txt (Complete Content Export)

Create a script to generate `/public/llms-full.txt` at build time:

```typescript
// scripts/generate-llms-full.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

async function generateLlmsFull() {
  const guidesDir = path.join(process.cwd(), 'src/content/guides')
  const promptsDir = path.join(process.cwd(), 'src/content/prompts')
  
  let content = `# The Panic Manual - Complete Content

> Free guides and AI prompts helping people understand and fight back against 
> confusing institutional documents.

---

`

  // Add all guides
  const categories = ['medical-bills', 'debt-collection']
  for (const category of categories) {
    const categoryPath = path.join(guidesDir, category)
    const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.mdx'))
    
    for (const file of files) {
      const filePath = path.join(categoryPath, file)
      const fileContent = fs.readFileSync(filePath, 'utf8')
      const { data, content: mdxContent } = matter(fileContent)
      
      content += `## ${data.title}\n\n`
      content += `**Category**: ${category}\n`
      content += `**Description**: ${data.description}\n\n`
      content += mdxContent + '\n\n---\n\n'
    }
  }

  // Add prompts
  content += `# Prompt Library\n\n`
  const promptFiles = fs.readdirSync(promptsDir).filter(f => f.endsWith('.json'))
  for (const file of promptFiles) {
    const filePath = path.join(promptsDir, file)
    const prompts = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    
    content += `## ${file.replace('.json', '').replace('-', ' ')} Prompts\n\n`
    for (const prompt of prompts) {
      content += `### ${prompt.title}\n\n`
      content += `\`\`\`\n${prompt.prompt}\n\`\`\`\n\n`
      if (prompt.whyItWorks) {
        content += `**Why This Works**: ${prompt.whyItWorks}\n\n`
      }
    }
  }

  fs.writeFileSync(
    path.join(process.cwd(), 'public/llms-full.txt'),
    content
  )
}

generateLlmsFull()
```

Add to `package.json`:
```json
{
  "scripts": {
    "generate-llms": "tsx scripts/generate-llms-full.ts",
    "build": "npm run generate-llms && next build"
  }
}
```

---

## Enhanced Design System

### Visual Identity: "Civic Modernism with Warmth"

**Core Principles**:
- **Civic**: Clean, trustworthy, institutional (government-grade seriousness)
- **Modern**: Contemporary typography and spacing
- **Warmth**: Approachable, not cold; empowering, not clinical

**BANNED Aesthetics** (from frontend-design.md):
- Generic sans-serif fonts (Inter, Roboto, Arial)
- Purple gradients on white
- Cookie-cutter layouts
- Generic AI slop
- Predictable component patterns

**REQUIRED Elements**:
- Distinctive typography (Fraunces + Literata)
- Bold aesthetic direction with clear hierarchy
- Intentional motion (staggered reveals, scroll-triggered)
- Visual depth (subtle textures, layered elements)
- Generous negative space

### Typography System

```css
/* Font imports */
@import '@fontsource-variable/fraunces';
@import '@fontsource-variable/literata';

:root {
  --font-display: 'Fraunces Variable', Georgia, serif;
  --font-body: 'Literata Variable', Georgia, serif;
}

/* Display headings - Fraunces with optical sizing */
.text-display-xl {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  line-height: 1.1;
  font-variation-settings: 'opsz' 72, 'SOFT' 50, 'WONK' 1;
  letter-spacing: -0.02em;
}

.text-display-lg {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 600;
  line-height: 1.2;
  font-variation-settings: 'opsz' 48, 'SOFT' 30;
}

/* Body text - Literata for readability */
.text-body-lg {
  font-family: var(--font-body);
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 1.75;
  font-variation-settings: 'opsz' 14;
}

.text-body {
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.75;
}
```

### Motion Design

```css
/* Reduced motion preference respected */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Staggered reveal for lists */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stagger-item {
  animation: fadeInUp 0.5s ease-out forwards;
  opacity: 0;
}

.stagger-item:nth-child(1) { animation-delay: 0ms; }
.stagger-item:nth-child(2) { animation-delay: 100ms; }
.stagger-item:nth-child(3) { animation-delay: 200ms; }
/* ... etc */
```

### Component Design Specifications

**Breath Box** (Enhanced):
```tsx
interface BreathBoxProps {
  children: React.ReactNode
  variant?: 'default' | 'urgent' | 'reassuring'
}

// Breath box with subtle animation and texture
<div className="
  breath-box 
  bg-breath 
  rounded-xl 
  p-6 
  mb-8 
  border-l-4 
  border-primary
  relative
  overflow-hidden
  before:absolute 
  before:inset-0 
  before:bg-noise 
  before:opacity-5
">
```

**Prompt Card** (Enhanced for AEO):
```tsx
interface PromptCardProps {
  title: string
  prompt: string
  whyItWorks: string
  watchOutFor: string[]
  followUps?: string[]
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime?: string
  // Schema markup data
  category: string
  dateUpdated: string
}
```

---

## Technical Requirements

### Performance Budgets

| Metric | Target | Notes |
|--------|--------|-------|
| Time to Interactive (TTI) | <2s on 4G | Critical for stressed users |
| First Contentful Paint (FCP) | <1s | Immediate visual feedback |
| Largest Contentful Paint (LCP) | <2.5s | Core Web Vital |
| Cumulative Layout Shift (CLS) | <0.1 | No layout shifts |
| Total bundle | <100KB gzipped | Excluding fonts |
| Font loading | swap + preload | No FOUT |

### Browser Support

- Chrome 90+ (and Chromium-based)
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari iOS 14+
- Chrome Android 90+

### Accessibility Compliance

- WCAG 2.1 Level AA (required)
- WCAG 2.1 Level AAA (target for text contrast)
- Section 508 compliance
- Screen reader tested (VoiceOver, NVDA)
- Keyboard navigation complete

---

## File Structure

```
panic-manual/
├── public/
│   ├── robots.txt                    # Permissive crawler rules
│   ├── llms.txt                      # AI context file
│   ├── llms-full.txt                 # Complete content export (generated)
│   ├── sitemap.xml                   # XML sitemap (generated)
│   ├── fonts/
│   │   ├── Fraunces-Variable.woff2
│   │   └── Literata-Variable.woff2
│   └── images/
│       └── og-default.png
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout (dark mode default)
│   │   ├── page.tsx                  # Home page
│   │   ├── globals.css               # Design system CSS
│   │   ├── sitemap.ts                # Dynamic sitemap generation
│   │   ├── robots.ts                 # Dynamic robots.txt (optional)
│   │   │
│   │   ├── guides/
│   │   │   ├── page.tsx              # Guides hub
│   │   │   └── [category]/
│   │   │       └── [slug]/
│   │   │           └── page.tsx      # Individual guide
│   │   │
│   │   ├── prompts/
│   │   │   ├── page.tsx              # Prompt library
│   │   │   └── [category]/
│   │   │       └── page.tsx          # Category prompts
│   │   │
│   │   ├── ai-toolkit/
│   │   │   └── page.tsx
│   │   │
│   │   ├── about/
│   │   │   └── page.tsx              # Includes methodology
│   │   │
│   │   ├── verification/
│   │   │   └── page.tsx
│   │   │
│   │   └── donate/
│   │       └── page.tsx
│   │
│   ├── components/
│   │   ├── ui/
│   │   │   ├── BreathBox.tsx
│   │   │   ├── PromptCard.tsx
│   │   │   ├── ProgressChecklist.tsx
│   │   │   ├── CommunityImpact.tsx   # Ethical social proof
│   │   │   ├── MethodologyCard.tsx   # Guide research transparency
│   │   │   ├── ThemeToggle.tsx
│   │   │   └── CopyButton.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── SkipLink.tsx          # Accessibility
│   │   │
│   │   ├── seo/
│   │   │   ├── SchemaMarkup.tsx      # JSON-LD injection
│   │   │   └── MetaTags.tsx
│   │   │
│   │   └── mdx/
│   │       ├── MDXComponents.tsx
│   │       └── index.ts
│   │
│   ├── content/
│   │   ├── guides/
│   │   │   ├── medical-bills/
│   │   │   │   ├── huge-medical-bill.mdx
│   │   │   │   ├── itemized-bill.mdx
│   │   │   │   └── negotiate-payment.mdx
│   │   │   └── debt-collection/
│   │   │       ├── collections-letter.mdx
│   │   │       └── debt-validation.mdx
│   │   │
│   │   └── prompts/
│   │       ├── medical-bills.json    # 20+ prompts
│   │       └── debt-collection.json  # 20+ prompts
│   │
│   ├── lib/
│   │   ├── mdx.ts
│   │   ├── prompts.ts
│   │   ├── schema.ts                 # Schema.org generators
│   │   └── analytics.ts              # Privacy-respecting tracking
│   │
│   ├── hooks/
│   │   ├── useCopyToClipboard.ts
│   │   ├── useLocalStorage.ts
│   │   └── useProgress.ts
│   │
│   └── types/
│       └── index.ts
│
├── scripts/
│   └── generate-llms-full.ts         # Build-time content export
│
└── tests/
    ├── unit/
    └── e2e/
```

---

## Validation Checklist

### Before Launch

**Technical**:
- [ ] Lighthouse Performance: 95+
- [ ] Lighthouse Accessibility: 100
- [ ] Lighthouse SEO: 100
- [ ] Lighthouse Best Practices: 100
- [ ] All Core Web Vitals pass
- [ ] Schema markup validates (Google Rich Results Test)
- [ ] robots.txt accessible and correct
- [ ] llms.txt accessible and formatted correctly
- [ ] sitemap.xml generated and submitted

**Content**:
- [ ] All 5 guides complete with proper structure
- [ ] All 40+ prompts written with explanations
- [ ] Each guide has FAQPage schema
- [ ] Each guide has HowTo schema where applicable
- [ ] All content follows AEO best practices (inverted pyramid, question headings)

**Accessibility**:
- [ ] Keyboard navigation works throughout
- [ ] Screen reader testing complete
- [ ] Color contrast meets WCAG AA (4.5:1 minimum)
- [ ] Focus indicators visible in both themes
- [ ] Skip links work correctly
- [ ] All images have alt text

**Social Proof**:
- [ ] NO fake testimonials present
- [ ] Community impact shows only real data (or is hidden until data exists)
- [ ] Methodology transparency on each guide
- [ ] Trust signals are all verifiable claims

---

## Anti-Patterns to Avoid

- ❌ Don't use fake testimonials or fabricated success stories
- ❌ Don't use Contentlayer (unmaintained)
- ❌ Don't use generic fonts (Inter, Roboto, Arial)
- ❌ Don't skip the Breath Box on panic guides
- ❌ Don't hardcode content that should be in MDX
- ❌ Don't use external fonts without preloading
- ❌ Don't store sensitive data in localStorage
- ❌ Don't forget print styles
- ❌ Don't skip schema markup on guide pages
- ❌ Don't use system theme preference (default dark explicitly)
- ❌ Don't use ARIA roles on native semantic elements
- ❌ Don't create fake urgency or scarcity signals

---

## Summary

This PRP v2.0 provides:

✅ **Ethical social proof** replacing fake testimonials with honest trust signals
✅ **Dark mode default** with accessible light mode option
✅ **Comprehensive AEO strategy** for AI answer engine visibility
✅ **Full SEO optimization** with schema markup and technical requirements
✅ **WCAG 2.1 AA accessibility** compliance
✅ **robots.txt and llms.txt** specifications for AI crawler guidance
✅ **Focused content strategy** (5 guides + 40+ prompts)
✅ **Enhanced design system** with detailed specifications
✅ **Complete file structure** and implementation guidance

**Confidence Score: 9/10**

The 1-point deduction accounts for:
- Content creation (guides + prompts) requires domain expertise beyond this PRP
- Real community impact data won't exist at launch
- EthicalAds publisher approval may take time
- llms.txt is still an emerging standard with uncertain adoption

**Recommended Next Steps**:
1. Create project scaffold with dark mode default
2. Implement robots.txt and llms.txt immediately
3. Build one complete guide with full AEO optimization as template
4. Create prompt library structure with 5-10 prompts per category
5. Iterate on remaining guides following the template
6. Track analytics to build real community impact data over time
