import { test, expect } from '@playwright/test'

test.describe('Progress Checklist', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/test-checklist')
    await page.evaluate(() => localStorage.clear())
    await page.reload()
  })

  test('checkboxes are unchecked by default', async ({ page }) => {
    const checkboxes = page.getByRole('checkbox')
    const count = await checkboxes.count()
    expect(count).toBeGreaterThan(0)

    // All should be unchecked
    for (let i = 0; i < count; i++) {
      await expect(checkboxes.nth(i)).not.toBeChecked()
    }
  })

  test('checking item updates progress percentage', async ({ page }) => {
    // Initially 0%
    const progress = page.getByTestId('progress-percentage')
    await expect(progress).toHaveText('0%')

    // Check first item
    const checkboxes = page.getByRole('checkbox')
    await checkboxes.first().check()

    // Progress should increase (5 items, 1 checked = 20%)
    await expect(progress).toHaveText('20%')
  })

  test('progress persists after page reload', async ({ page }) => {
    // Check first two items
    const checkboxes = page.getByRole('checkbox')
    await checkboxes.nth(0).check()
    await checkboxes.nth(1).check()

    // Get current progress
    const progress = page.getByTestId('progress-percentage')
    const progressText = await progress.textContent()

    // Reload page
    await page.reload()

    // Progress should be the same
    await expect(progress).toContainText(progressText!)

    // Checkboxes should still be checked
    await expect(checkboxes.nth(0)).toBeChecked()
    await expect(checkboxes.nth(1)).toBeChecked()
  })

  test('progress is guide-specific (different localStorage key)', async ({ page }) => {
    // Check items on first guide
    const checkboxes = page.getByRole('checkbox')
    await checkboxes.first().check()

    // Navigate to different guide
    await page.goto('/test-checklist-2')
    await page.waitForLoadState('networkidle')

    // Checkboxes should be unchecked (different guide)
    const checkboxes2 = page.getByRole('checkbox')
    await expect(checkboxes2.first()).not.toBeChecked()

    // Go back to first guide
    await page.goto('/test-checklist')

    // First item should still be checked
    await expect(checkboxes.first()).toBeChecked()
  })

  test('all items checked shows completion state', async ({ page }) => {
    const checkboxes = page.getByRole('checkbox')
    const count = await checkboxes.count()

    // Check all items
    for (let i = 0; i < count; i++) {
      await checkboxes.nth(i).check()
    }

    // Should show 100% and completion message
    const progress = page.getByTestId('progress-percentage')
    await expect(progress).toContainText('100%')

    const completionMessage = page.getByText(/complete|done|finished/i)
    await expect(completionMessage).toBeVisible()
  })

  test('unchecking item decreases progress', async ({ page }) => {
    const checkboxes = page.getByRole('checkbox')
    const progress = page.getByTestId('progress-percentage')

    // Check two items
    await checkboxes.nth(0).check()
    await checkboxes.nth(1).check()

    const progressAfterTwo = await progress.textContent()

    // Uncheck one
    await checkboxes.nth(0).uncheck()

    // Progress should decrease
    const progressAfterOne = await progress.textContent()
    expect(parseInt(progressAfterOne!)).toBeLessThan(parseInt(progressAfterTwo!))
  })

  test('checkboxes are keyboard accessible', async ({ page }) => {
    const checkboxes = page.getByRole('checkbox')

    // Focus first checkbox and press Space
    await checkboxes.first().focus()
    await page.keyboard.press('Space')

    await expect(checkboxes.first()).toBeChecked()

    // Press Space again to uncheck
    await page.keyboard.press('Space')
    await expect(checkboxes.first()).not.toBeChecked()
  })
})
