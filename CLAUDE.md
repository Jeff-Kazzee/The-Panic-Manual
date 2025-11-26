# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The Panic Manual is a free, content-focused website helping people understand and fight back against confusing institutional documents (medical bills, collection letters) using AI prompts. This is a **pre-development project**—the PRP (Product Requirements Prompt) document defines the specifications.

## Tech Stack (Planned)

- **Framework**: Next.js 15 App Router
- **Content**: MDX with custom React components
- **Styling**: Tailwind CSS with custom design system
- **Typography**: Fraunces (display) + Literata (body) variable fonts
- **Theme**: Dark mode default with accessible light mode toggle
- **Analytics**: Privacy-respecting (EthicalAds)
- **Deployment**: Vercel

## Key Requirements Document

`the-panic-manual-PRP-v2.md` is the source of truth for all specifications including:
- 5 core guides (3 medical bills, 2 debt collection)
- 40+ AI prompts with copy-to-clipboard
- Design system ("Civic Modernism with Warmth")
- AEO/SEO/Accessibility optimization requirements
- Ethical social proof (no fake testimonials)
- Schema markup (FAQPage, HowTo, Article)

## Design Constraints

**Required**:
- Distinctive typography (Fraunces + Literata, NOT generic sans-serif)
- Dark mode default (reduces stress for users reviewing financial documents)
- "Breath Box" component at top of every panic guide
- Copy-to-clipboard prompts with "Why This Works" explanations
- Local storage progress tracking
- Print-friendly CSS
- WCAG 2.1 AA accessibility compliance

**Banned**:
- Generic fonts (Inter, Roboto, Arial)
- Fake testimonials or fabricated success stories
- Contentlayer (unmaintained)
- System theme preference (dark must be explicit default)

## Content Structure (Planned)

```
src/content/guides/
  medical-bills/
    huge-medical-bill.mdx
    itemized-bill.mdx
    negotiate-payment.mdx
  debt-collection/
    collections-letter.mdx
    debt-validation.mdx

src/content/prompts/
  medical-bills.json
  debt-collection.json
```

## Performance Targets

- Lighthouse Performance: 95+
- Lighthouse Accessibility: 100
- Lighthouse SEO: 100
- LCP: <2.5s
- CLS: <0.1
- Total bundle: <100KB gzipped (excluding fonts)

## AI Crawler Requirements

- `robots.txt`: Permissive (allow all AI crawlers)
- `llms.txt`: AI context file with site overview and links
- `llms-full.txt`: Complete content export (generated at build)
