import { test, expect } from '@playwright/test'

test.describe('Theme Toggle', () => {
  test.beforeEach(async ({ context }) => {
    // Clear localStorage before each test
    await context.clearCookies()
  })

  test('dark mode is default on first load', async ({ page }) => {
    // Clear localStorage to simulate first visit
    await page.goto('/')
    await page.evaluate(() => localStorage.removeItem('theme'))
    await page.reload()

    const html = page.locator('html')
    await expect(html).toHaveClass(/dark/)
  })

  test('toggle switches from dark to light mode', async ({ page }) => {
    await page.goto('/')

    // Should start in dark mode
    const html = page.locator('html')
    await expect(html).toHaveClass(/dark/)

    // Click toggle (use first() since there are desktop and mobile toggles)
    const toggle = page.getByRole('button', { name: /switch to light mode/i }).first()
    await toggle.click()

    // Should now be light mode (no dark class)
    await expect(html).not.toHaveClass(/dark/)
  })

  test('toggle switches from light to dark mode', async ({ page }) => {
    await page.goto('/')

    // Switch to light first (use first() since there are desktop and mobile toggles)
    const toggle = page.getByRole('button', { name: /switch to light mode/i }).first()
    await toggle.click()

    const html = page.locator('html')
    await expect(html).not.toHaveClass(/dark/)

    // Click toggle again to go back to dark
    const darkToggle = page.getByRole('button', { name: /switch to dark mode/i }).first()
    await darkToggle.click()

    await expect(html).toHaveClass(/dark/)
  })

  test('theme preference persists across page reload', async ({ page }) => {
    await page.goto('/')

    // Switch to light mode (use first() since there are desktop and mobile toggles)
    const toggle = page.getByRole('button', { name: /switch to light mode/i }).first()
    await toggle.click()

    const html = page.locator('html')
    await expect(html).not.toHaveClass(/dark/)

    // Reload page
    await page.reload()

    // Should still be light mode
    await expect(html).not.toHaveClass(/dark/)
  })

  test('theme preference persists across navigation', async ({ page }) => {
    await page.goto('/')

    // Switch to light mode (use first() since there are desktop and mobile toggles)
    const toggle = page.getByRole('button', { name: /switch to light mode/i }).first()
    await toggle.click()

    const html = page.locator('html')
    await expect(html).not.toHaveClass(/dark/)

    // Navigate to another page (when it exists, for now just reload)
    await page.goto('/')

    // Should still be light mode
    await expect(html).not.toHaveClass(/dark/)
  })

  test('toggle button has correct ARIA labels', async ({ page }) => {
    await page.goto('/')

    // In dark mode, button should say "Switch to light mode" (use first() for desktop toggle)
    const darkModeToggle = page.getByRole('button', { name: /switch to light mode/i }).first()
    await expect(darkModeToggle).toBeVisible()

    // Click to switch to light
    await darkModeToggle.click()

    // In light mode, button should say "Switch to dark mode"
    const lightModeToggle = page.getByRole('button', { name: /switch to dark mode/i }).first()
    await expect(lightModeToggle).toBeVisible()
  })

  test('toggle is keyboard accessible', async ({ page }) => {
    await page.goto('/')

    const html = page.locator('html')
    await expect(html).toHaveClass(/dark/)

    // Tab to the toggle and press Enter (use first() for desktop toggle)
    await page.keyboard.press('Tab')
    await page.keyboard.press('Tab') // May need multiple tabs to reach toggle

    const toggle = page.getByRole('button', { name: /switch to light mode/i }).first()
    await toggle.focus()
    await page.keyboard.press('Enter')

    // Should switch to light mode
    await expect(html).not.toHaveClass(/dark/)

    // Press Space to switch back
    await page.keyboard.press('Space')
    await expect(html).toHaveClass(/dark/)
  })
})
