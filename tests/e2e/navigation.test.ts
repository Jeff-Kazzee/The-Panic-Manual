import { test, expect } from '@playwright/test'

test.describe('Global Navigation', () => {
  // Desktop tests - use large viewport
  test.use({ viewport: { width: 1280, height: 720 } })

  test('header is visible on all pages', async ({ page }) => {
    // Check homepage
    await page.goto('/')
    await expect(page.getByRole('link', { name: 'The Panic Manual' })).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Guides' })).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Prompts' })).toBeVisible()

    // Check guides page
    await page.goto('/guides')
    await expect(page.getByRole('link', { name: 'The Panic Manual' })).toBeVisible()

    // Check prompts page
    await page.goto('/prompts')
    await expect(page.getByRole('link', { name: 'The Panic Manual' })).toBeVisible()
  })

  test('footer is visible on all pages', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Made with care')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Privacy Policy' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Terms of Use' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Our Mission' })).toBeVisible()
  })

  test('logo navigates to homepage', async ({ page }) => {
    await page.goto('/guides')
    await page.getByRole('link', { name: 'The Panic Manual' }).click()
    await expect(page).toHaveURL('/')
  })

  test('nav links work correctly', async ({ page }) => {
    await page.goto('/')

    // Navigate to Guides
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Guides' }).click()
    await expect(page).toHaveURL('/guides')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Panic Guides')

    // Navigate to Prompts
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Prompts' }).click()
    await expect(page).toHaveURL('/prompts')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Prompt Library')
  })

  test('header becomes sticky on scroll', async ({ page }) => {
    await page.goto('/prompts') // Long page

    // Scroll down
    await page.evaluate(() => window.scrollBy(0, 200))
    await page.waitForTimeout(300)

    // Header should still be visible at top
    const header = page.locator('header')
    await expect(header).toBeVisible()
    const boundingBox = await header.boundingBox()
    expect(boundingBox?.y).toBe(0)
  })
})

test.describe('Mobile Navigation', () => {
  // Mobile tests - use small viewport
  test.use({ viewport: { width: 375, height: 667 } })

  test('hamburger menu opens mobile nav', async ({ page }) => {
    await page.goto('/')

    // Desktop nav should be hidden on mobile
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeHidden()

    // Open hamburger menu
    const menuButton = page.getByRole('button', { name: 'Open menu' })
    await expect(menuButton).toBeVisible()
    await menuButton.click()

    // Mobile nav should be visible
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Guides' })).toBeVisible()
  })

  test('mobile nav closes on link click', async ({ page }) => {
    await page.goto('/')

    // Open and click link
    await page.getByRole('button', { name: 'Open menu' }).click()
    await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'Guides' }).click()

    // Should navigate and close menu
    await expect(page).toHaveURL('/guides')
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden()
  })

  test('mobile nav closes on escape key', async ({ page }) => {
    await page.goto('/')

    await page.getByRole('button', { name: 'Open menu' }).click()
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden()
  })
})
