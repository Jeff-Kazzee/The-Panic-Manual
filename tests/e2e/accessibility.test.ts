import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Accessibility', () => {
  test('homepage has no a11y violations', async ({ page }) => {
    await page.goto('/')

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('test-prompts page has no a11y violations', async ({ page }) => {
    await page.goto('/test-prompts')

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('test-checklist page has no a11y violations', async ({ page }) => {
    await page.goto('/test-checklist')

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()

    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('skip link is present and works', async ({ page }) => {
    await page.goto('/')

    // Skip link should exist (may be visually hidden until focused)
    const skipLink = page.getByRole('link', { name: /skip to main content/i })
    await expect(skipLink).toBeAttached()

    // Focus the skip link
    await skipLink.focus()

    // Should be visible when focused
    await expect(skipLink).toBeVisible()

    // Click skip link
    await skipLink.click()

    // Focus should move to main content
    const mainContent = page.locator('#main-content')
    await expect(mainContent).toBeFocused()
  })

  test('focus order is logical on homepage', async ({ page }) => {
    await page.goto('/')

    // Tab through interactive elements and verify logical order
    const focusOrder: string[] = []

    // Tab multiple times and record what gets focused
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab')
      const focusedElement = await page.evaluate(() => {
        const el = document.activeElement
        return el?.tagName + (el?.getAttribute('aria-label') || el?.textContent?.slice(0, 20) || '')
      })
      focusOrder.push(focusedElement)
    }

    // Skip link should be first focusable element
    expect(focusOrder[0]).toContain('Skip')
  })

  test('color contrast passes in dark mode', async ({ page }) => {
    await page.goto('/')

    // Ensure dark mode is active
    const html = page.locator('html')
    await expect(html).toHaveClass(/dark/)

    // Run axe with color-contrast rules
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze()

    // Filter for color-contrast violations
    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    )

    expect(contrastViolations).toEqual([])
  })

  test('color contrast passes in light mode', async ({ page }) => {
    await page.goto('/')

    // Switch to light mode
    const toggle = page.getByRole('button', { name: /switch to light mode/i })
    await toggle.click()

    // Verify light mode is active
    const html = page.locator('html')
    await expect(html).not.toHaveClass(/dark/)

    // Run axe with color-contrast rules
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze()

    // Filter for color-contrast violations
    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    )

    expect(contrastViolations).toEqual([])
  })

  test('all interactive elements have accessible names', async ({ page }) => {
    await page.goto('/')

    // Check buttons have accessible names
    const buttons = page.getByRole('button')
    const buttonCount = await buttons.count()

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i)
      const name = await button.getAttribute('aria-label') || await button.textContent()
      expect(name).toBeTruthy()
    }
  })

  test('images have alt text', async ({ page }) => {
    await page.goto('/')

    // Get all images
    const images = page.locator('img')
    const imageCount = await images.count()

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i)
      const alt = await img.getAttribute('alt')
      const role = await img.getAttribute('role')

      // Image should have alt text OR be decorative (role="presentation" or empty alt)
      const isDecorative = role === 'presentation' || alt === ''
      const hasAlt = alt !== null

      expect(isDecorative || hasAlt).toBeTruthy()
    }
  })

  test('headings follow proper hierarchy', async ({ page }) => {
    await page.goto('/')

    // Get all headings
    const headings = await page.evaluate(() => {
      const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      return Array.from(headingElements).map((h) => parseInt(h.tagName[1]))
    })

    // Should have exactly one h1
    const h1Count = headings.filter((level) => level === 1).length
    expect(h1Count).toBe(1)

    // Heading levels should not skip (e.g., h1 -> h3)
    for (let i = 1; i < headings.length; i++) {
      const diff = headings[i] - headings[i - 1]
      // Can decrease or increase by 1, but never skip levels going deeper
      expect(diff).toBeLessThanOrEqual(1)
    }
  })
})
