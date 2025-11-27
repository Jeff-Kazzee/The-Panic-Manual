import { test, expect } from '@playwright/test'

// Clipboard permissions only work in Chromium
const chromiumOnly = test.extend({})
chromiumOnly.skip(({ browserName }) => browserName !== 'chromium', 'Clipboard tests only run on Chromium')

test.describe('PromptCard', () => {
  test('copy button is visible on prompt card', async ({ page }) => {
    await page.goto('/test-prompts')

    const copyButton = page.getByRole('button', { name: /copy/i })
    await expect(copyButton).toBeVisible()
  })

  chromiumOnly('clicking copy writes prompt to clipboard', async ({ page, context }) => {
    // Grant clipboard permissions (Chromium only)
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])

    await page.goto('/test-prompts')

    const copyButton = page.getByRole('button', { name: /copy/i })
    await copyButton.click()

    // Read from clipboard
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText())
    expect(clipboardText).toContain('Analyze this medical bill')
  })

  chromiumOnly('copy success feedback is shown', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])

    await page.goto('/test-prompts')

    const copyButton = page.getByRole('button', { name: /copy/i })
    await copyButton.click()

    // Should show "Copied!" or checkmark feedback
    await expect(page.getByText(/copied/i)).toBeVisible()

    // After delay, should return to "Copy"
    await page.waitForTimeout(2500)
    await expect(copyButton).toBeVisible()
  })

  test('"Why This Works" section is expandable', async ({ page }) => {
    await page.goto('/test-prompts')

    // Initially collapsed
    const whySection = page.getByText(/analyze the bill line by line/i)
    await expect(whySection).not.toBeVisible()

    // Click to expand
    const expandButton = page.getByRole('button', { name: /why this works/i })
    await expandButton.click()

    // Now visible
    await expect(whySection).toBeVisible()

    // Click again to collapse
    await expandButton.click()
    await expect(whySection).not.toBeVisible()
  })

  chromiumOnly('copy button is keyboard accessible with Enter', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])

    await page.goto('/test-prompts')

    const copyButton = page.getByRole('button', { name: /copy/i })
    await copyButton.focus()
    await page.keyboard.press('Enter')

    // Should show copied feedback
    await expect(page.getByText(/copied/i)).toBeVisible()
  })

  chromiumOnly('copy button is keyboard accessible with Space', async ({ page, context }) => {
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])

    await page.goto('/test-prompts')

    const copyButton = page.getByRole('button', { name: /copy/i })
    await copyButton.focus()
    await page.keyboard.press('Space')

    // Should show copied feedback
    await expect(page.getByText(/copied/i)).toBeVisible()
  })

  test('expand button is keyboard accessible', async ({ page }) => {
    await page.goto('/test-prompts')

    const expandButton = page.getByRole('button', { name: /why this works/i })
    await expandButton.focus()
    await page.keyboard.press('Enter')

    // Section should be visible
    const whySection = page.getByText(/analyze the bill line by line/i)
    await expect(whySection).toBeVisible()
  })

  test('prompt card has proper ARIA attributes', async ({ page }) => {
    await page.goto('/test-prompts')

    // Check that the expandable region has proper aria-expanded
    const expandButton = page.getByRole('button', { name: /why this works/i })
    await expect(expandButton).toHaveAttribute('aria-expanded', 'false')

    await expandButton.click()
    await expect(expandButton).toHaveAttribute('aria-expanded', 'true')
  })
})
