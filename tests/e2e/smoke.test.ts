import { test, expect } from '@playwright/test'

test.describe('Smoke Tests', () => {
  test('homepage loads with dark mode by default', async ({ page }) => {
    await page.goto('/')

    // Check page loads
    await expect(page).toHaveTitle(/Panic Manual/)

    // Check dark mode is active
    const html = page.locator('html')
    await expect(html).toHaveClass(/dark/)

    // Check main heading
    await expect(page.getByRole('heading', { level: 1 })).toContainText('The Panic Manual')
  })

  test('breath box is visible on homepage', async ({ page }) => {
    await page.goto('/')

    // Check breath box content
    await expect(page.getByText('Take a breath')).toBeVisible()
    await expect(page.getByText("You're not going to jail")).toBeVisible()
  })
})
