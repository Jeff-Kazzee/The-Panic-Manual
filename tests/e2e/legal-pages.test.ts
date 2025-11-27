import { test, expect } from '@playwright/test'

test.describe('Legal & Info Pages', () => {
  test.describe('Privacy Policy', () => {
    test('page loads with correct content', async ({ page }) => {
      await page.goto('/privacy')

      await expect(page.getByRole('heading', { level: 1 })).toContainText('Privacy Policy')
      await expect(page.getByText('The Short Version')).toBeVisible()
      // Use exact: true to avoid matching multiple elements
      await expect(page.getByText("We don't track you", { exact: true })).toBeVisible()
      await expect(page.getByText("We don't sell your data", { exact: true })).toBeVisible()
      await expect(page.getByText("We don't show ads", { exact: true })).toBeVisible()
    })

    test('has breadcrumb navigation', async ({ page }) => {
      await page.goto('/privacy')

      const breadcrumb = page.getByRole('navigation', { name: 'Breadcrumb' })
      await expect(breadcrumb).toBeVisible()
      await expect(breadcrumb.getByRole('link', { name: 'Home' })).toBeVisible()
    })

    test('contact email is present', async ({ page }) => {
      await page.goto('/privacy')
      await expect(page.getByRole('link', { name: 'privacy@thepanicmanual.com' })).toBeVisible()
    })
  })

  test.describe('Terms of Use', () => {
    test('page loads with correct content', async ({ page }) => {
      await page.goto('/terms')

      await expect(page.getByRole('heading', { level: 1 })).toContainText('Terms of Use')
      await expect(page.getByText('This Is Educational Content')).toBeVisible()
      await expect(page.getByText('Legal advice')).toBeVisible()
      await expect(page.getByText('Medical advice')).toBeVisible()
      await expect(page.getByText('Financial advice')).toBeVisible()
    })

    test('has disclaimer box', async ({ page }) => {
      await page.goto('/terms')
      await expect(page.getByText('We are not lawyers, doctors, or financial advisors')).toBeVisible()
    })
  })

  test.describe('About Page', () => {
    test('page loads with mission statement', async ({ page }) => {
      await page.goto('/about')

      await expect(page.getByRole('heading', { level: 1 })).toContainText("shouldn't need a lawyer")
      await expect(page.getByText('The Problem')).toBeVisible()
      await expect(page.getByText('The Solution')).toBeVisible()
      await expect(page.getByText('Our Values')).toBeVisible()
    })

    test('has statistics', async ({ page }) => {
      await page.goto('/about')
      await expect(page.getByText('80%')).toBeVisible()
      await expect(page.getByText('medical bills contain errors')).toBeVisible()
    })

    test('has values grid', async ({ page }) => {
      await page.goto('/about')
      await expect(page.getByText('Free Forever')).toBeVisible()
      await expect(page.getByText('Privacy First')).toBeVisible()
      await expect(page.getByText('No Shame')).toBeVisible()
      await expect(page.getByText('Plain Language')).toBeVisible()
    })

    test('has contact email', async ({ page }) => {
      await page.goto('/about')
      await expect(page.getByRole('link', { name: 'hello@thepanicmanual.com' })).toBeVisible()
    })
  })

  test.describe('Footer Links', () => {
    test('footer links navigate to correct pages', async ({ page }) => {
      await page.goto('/')

      // Privacy
      await page.getByRole('contentinfo').getByRole('link', { name: 'Privacy Policy' }).click()
      await expect(page).toHaveURL('/privacy')
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Privacy Policy')

      // Terms
      await page.goto('/')
      await page.getByRole('contentinfo').getByRole('link', { name: 'Terms of Use' }).click()
      await expect(page).toHaveURL('/terms')
      await expect(page.getByRole('heading', { level: 1 })).toContainText('Terms of Use')

      // About
      await page.goto('/')
      await page.getByRole('contentinfo').getByRole('link', { name: 'Our Mission' }).click()
      await expect(page).toHaveURL('/about')
    })
  })
})
