import { test, expect } from '@playwright/test'

// Clipboard permissions only work in Chromium
const chromiumOnly = test.extend({})
chromiumOnly.skip(({ browserName }) => browserName !== 'chromium', 'Clipboard tests only run on Chromium')

test.describe('Story 5.2: Guide Completion Journey', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test to ensure clean state
    await page.goto('/guides/medical-bills/huge-medical-bill')
    await page.evaluate(() => {
      localStorage.clear()
    })
    await page.reload()
  })

  test('BreathBox appears at guide start', async ({ page }) => {
    await page.goto('/guides/medical-bills/huge-medical-bill')

    // Breath box should be visible
    const breathBox = page.getByTestId('breath-box')
    await expect(breathBox).toBeVisible()

    // Should contain reassuring content
    await expect(breathBox.getByText(/take a breath/i)).toBeVisible()
    await expect(breathBox.getByText(/not going to jail/i)).toBeVisible()
  })

  test('BreathBox appears on debt collection guide', async ({ page }) => {
    await page.goto('/guides/debt-collection/collections-letter')

    const breathBox = page.getByTestId('breath-box')
    await expect(breathBox).toBeVisible()

    // Debt collection specific breath message
    await expect(breathBox.getByText(/don't panic/i)).toBeVisible()
  })

  chromiumOnly('user can copy multiple prompts', async ({ page, context }) => {
    // Grant clipboard permissions (Chromium only)
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])

    await page.goto('/guides/medical-bills/huge-medical-bill')

    // Find all copy buttons
    const copyButtons = page.getByRole('button', { name: /copy/i })
    const buttonCount = await copyButtons.count()

    // Should have at least 2 prompts
    expect(buttonCount).toBeGreaterThanOrEqual(2)

    // Copy first prompt
    await copyButtons.first().click()
    await expect(page.getByText(/copied/i).first()).toBeVisible()

    // Wait for "Copied!" to reset
    await page.waitForTimeout(2500)

    // Copy second prompt
    await copyButtons.nth(1).click()
    await expect(page.getByText(/copied/i).first()).toBeVisible()
  })

  test('user can check off progress items', async ({ page }) => {
    await page.goto('/guides/medical-bills/huge-medical-bill')

    // Wait for component to mount
    await page.waitForSelector('[data-testid="progress-percentage"]')

    // Progress should start at 0%
    const progressText = page.getByTestId('progress-percentage')
    await expect(progressText).toContainText('0%')

    // Get checkboxes
    const checkboxes = page.getByRole('checkbox')
    const checkboxCount = await checkboxes.count()
    expect(checkboxCount).toBeGreaterThan(0)

    // Check the first item
    await checkboxes.first().click()

    // Progress should update
    await expect(progressText).not.toContainText('0%')
  })

  test('100% progress shows completion message', async ({ page }) => {
    await page.goto('/guides/medical-bills/huge-medical-bill')

    // Wait for component to mount
    await page.waitForSelector('[data-testid="progress-percentage"]')

    // Check all items
    const checkboxes = page.getByRole('checkbox')
    const checkboxCount = await checkboxes.count()

    for (let i = 0; i < checkboxCount; i++) {
      await checkboxes.nth(i).click()
    }

    // Progress should be 100%
    await expect(page.getByTestId('progress-percentage')).toContainText('100%')

    // Completion message should appear
    await expect(page.getByText(/complete.*great work/i)).toBeVisible()
  })

  test('progress persists after page reload', async ({ page }) => {
    await page.goto('/guides/medical-bills/huge-medical-bill')

    // Wait for component to mount
    await page.waitForSelector('[data-testid="progress-percentage"]')

    // Check first two items
    const checkboxes = page.getByRole('checkbox')
    await checkboxes.nth(0).click()
    await checkboxes.nth(1).click()

    // Note the progress percentage
    const progressBefore = await page.getByTestId('progress-percentage').textContent()

    // Reload the page
    await page.reload()

    // Wait for component to mount again
    await page.waitForSelector('[data-testid="progress-percentage"]')

    // Progress should be the same
    await expect(page.getByTestId('progress-percentage')).toContainText(progressBefore || '')

    // Checkboxes should still be checked
    await expect(checkboxes.nth(0)).toBeChecked()
    await expect(checkboxes.nth(1)).toBeChecked()
  })

  test('print button is available', async ({ page }) => {
    await page.goto('/guides/medical-bills/huge-medical-bill')

    // Print button should be visible
    const printButton = page.getByRole('button', { name: /print this guide/i })
    await expect(printButton).toBeVisible()
  })

  test('guide has correct heading hierarchy', async ({ page }) => {
    await page.goto('/guides/medical-bills/huge-medical-bill')

    // Should have h1 for guide title
    const h1 = page.getByRole('heading', { level: 1 })
    await expect(h1).toBeVisible()
    await expect(h1).toContainText('I Got a Huge Medical Bill')

    // Should have h2 for sections
    await expect(page.getByRole('heading', { level: 2, name: /your progress/i })).toBeVisible()
    await expect(page.getByRole('heading', { level: 2, name: /ai prompts/i })).toBeVisible()
  })

  test('guide progress is guide-specific', async ({ page }) => {
    // Check items on one guide
    await page.goto('/guides/medical-bills/huge-medical-bill')
    await page.waitForSelector('[data-testid="progress-percentage"]')

    const checkboxes1 = page.getByRole('checkbox')
    await checkboxes1.nth(0).click()
    await checkboxes1.nth(1).click()

    // Navigate to different guide
    await page.goto('/guides/medical-bills/itemized-bill')
    await page.waitForSelector('[data-testid="progress-percentage"]')

    // This guide should have 0% progress
    await expect(page.getByTestId('progress-percentage')).toContainText('0%')

    // No checkboxes should be checked
    const checkboxes2 = page.getByRole('checkbox')
    const count = await checkboxes2.count()
    for (let i = 0; i < count; i++) {
      await expect(checkboxes2.nth(i)).not.toBeChecked()
    }

    // Go back to first guide - should still have progress
    await page.goto('/guides/medical-bills/huge-medical-bill')
    await page.waitForSelector('[data-testid="progress-percentage"]')

    await expect(checkboxes1.nth(0)).toBeChecked()
    await expect(checkboxes1.nth(1)).toBeChecked()
  })
})
