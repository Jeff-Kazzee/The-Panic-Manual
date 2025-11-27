import { test, expect } from '@playwright/test'

// Clipboard permissions only work in Chromium
const chromiumOnly = test.extend({})
chromiumOnly.skip(({ browserName }) => browserName !== 'chromium', 'Clipboard tests only run on Chromium')

test.describe('Story 5.3: Prompt Library Journey', () => {
  test('prompt library page lists all categories', async ({ page }) => {
    await page.goto('/prompts')

    // Should have main heading
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Prompt Library')

    // Should have category filter buttons
    const categoryFilter = page.getByTestId('category-filter')
    await expect(categoryFilter).toBeVisible()

    // All categories should be present
    await expect(categoryFilter.getByRole('button', { name: /all prompts/i })).toBeVisible()
    await expect(categoryFilter.getByRole('button', { name: /medical bills/i })).toBeVisible()
    await expect(categoryFilter.getByRole('button', { name: /debt collection/i })).toBeVisible()
  })

  test('category filter works', async ({ page }) => {
    await page.goto('/prompts')

    // Initially should show all prompts
    const promptsList = page.getByTestId('prompts-list')
    await expect(promptsList).toBeVisible()

    // Count initial prompts
    const allPromptCards = promptsList.locator('[class*="rounded-xl"]')
    const initialCount = await allPromptCards.count()
    expect(initialCount).toBeGreaterThan(4)

    // Filter to Medical Bills only
    await page.getByRole('button', { name: /medical bills/i }).click()

    // Should show only medical bill prompts
    await expect(page.getByText(/showing \d+ prompts?/i)).toBeVisible()

    // All visible prompts should be medical bill category
    const categoryLabels = page.locator('[data-testid="prompts-list"] .uppercase')
    const labelCount = await categoryLabels.count()
    for (let i = 0; i < labelCount; i++) {
      await expect(categoryLabels.nth(i)).toContainText('Medical Bills')
    }

    // Filter to Debt Collection
    await page.getByRole('button', { name: /debt collection/i }).click()

    // All visible prompts should be debt collection category
    const debtLabels = page.locator('[data-testid="prompts-list"] .uppercase')
    const debtLabelCount = await debtLabels.count()
    for (let i = 0; i < debtLabelCount; i++) {
      await expect(debtLabels.nth(i)).toContainText('Debt Collection')
    }
  })

  test('search/filter prompts works', async ({ page }) => {
    await page.goto('/prompts')

    const searchInput = page.getByTestId('prompt-search')
    await expect(searchInput).toBeVisible()

    // Search for specific term
    await searchInput.fill('validation')

    // Should filter results
    await expect(page.getByText(/showing \d+ prompts?/i)).toBeVisible()

    // Results should contain the search term
    const promptTitles = page.getByRole('heading', { level: 3 })
    const count = await promptTitles.count()
    expect(count).toBeGreaterThan(0)

    // At least one result should contain "validation"
    let foundMatch = false
    for (let i = 0; i < count; i++) {
      const text = await promptTitles.nth(i).textContent()
      if (text?.toLowerCase().includes('validation')) {
        foundMatch = true
        break
      }
    }
    expect(foundMatch).toBe(true)
  })

  test('search with no results shows empty state', async ({ page }) => {
    await page.goto('/prompts')

    const searchInput = page.getByTestId('prompt-search')
    await searchInput.fill('xyznonexistent123')

    // Should show no results message
    await expect(page.getByText(/no prompts found/i)).toBeVisible()

    // Should have clear filters button
    const clearButton = page.getByRole('button', { name: /clear filters/i })
    await expect(clearButton).toBeVisible()

    // Click clear filters
    await clearButton.click()

    // Should show all prompts again
    await expect(page.getByText(/no prompts found/i)).not.toBeVisible()
    await expect(page.getByTestId('prompts-list')).toBeVisible()
  })

  chromiumOnly('copy prompt from library page', async ({ page, context }) => {
    // Grant clipboard permissions (Chromium only)
    await context.grantPermissions(['clipboard-read', 'clipboard-write'])

    await page.goto('/prompts')

    // Find copy button
    const copyButton = page.getByRole('button', { name: /copy/i }).first()
    await expect(copyButton).toBeVisible()

    // Click copy
    await copyButton.click()

    // Should show copied feedback
    await expect(page.getByText(/copied/i).first()).toBeVisible()
  })

  test('prompt cards have expandable "Why This Works" section', async ({ page }) => {
    await page.goto('/prompts')

    // Find a "Why This Works" button
    const expandButton = page.getByRole('button', { name: /why this works/i }).first()
    await expect(expandButton).toBeVisible()

    // Initially collapsed
    await expect(expandButton).toHaveAttribute('aria-expanded', 'false')

    // Click to expand
    await expandButton.click()

    // Should be expanded
    await expect(expandButton).toHaveAttribute('aria-expanded', 'true')

    // Content should be visible
    // The content panel should now be visible
    const contentId = await expandButton.getAttribute('aria-controls')
    if (contentId) {
      const content = page.locator(`#${contentId}`)
      await expect(content).toBeVisible()
    }
  })

  test('combined filter and search', async ({ page }) => {
    await page.goto('/prompts')

    // Filter to Medical Bills
    await page.getByRole('button', { name: /medical bills/i }).click()

    // Then search for "bill"
    const searchInput = page.getByTestId('prompt-search')
    await searchInput.fill('bill')

    // Should show filtered and searched results
    await expect(page.getByText(/showing \d+ prompts?/i)).toBeVisible()

    // All results should be Medical Bills category
    const categoryLabels = page.locator('[data-testid="prompts-list"] .uppercase')
    const labelCount = await categoryLabels.count()
    for (let i = 0; i < labelCount; i++) {
      await expect(categoryLabels.nth(i)).toContainText('Medical Bills')
    }
  })

  test('breadcrumb navigation works', async ({ page }) => {
    await page.goto('/prompts')

    const breadcrumb = page.getByRole('navigation', { name: /breadcrumb/i })
    await expect(breadcrumb).toBeVisible()

    // Click Home
    await breadcrumb.getByRole('link', { name: 'Home' }).click()
    await expect(page).toHaveURL('/')
  })

  test('can navigate from homepage to prompts', async ({ page }) => {
    await page.goto('/')

    // Click prompt library link
    await page.getByRole('link', { name: /prompt library/i }).click()

    await expect(page).toHaveURL('/prompts')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Prompt Library')
  })
})
