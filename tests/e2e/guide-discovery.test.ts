import { test, expect } from '@playwright/test'

test.describe('Story 5.1: Guide Discovery Journey', () => {
  test('homepage has "What landed in your mailbox?" navigation', async ({ page }) => {
    await page.goto('/')

    // Check the navigation section exists
    await expect(page.getByRole('heading', { name: /what landed in your mailbox/i })).toBeVisible()

    // Check category cards are present
    const categoryNav = page.getByTestId('category-nav')
    await expect(categoryNav).toBeVisible()
    await expect(categoryNav.getByRole('link', { name: /medical bills/i })).toBeVisible()
    await expect(categoryNav.getByRole('link', { name: /debt collection/i })).toBeVisible()
  })

  test('category selection navigates to guide list', async ({ page }) => {
    await page.goto('/')

    // Click on Medical Bills category
    await page.getByRole('link', { name: /medical bills/i }).first().click()

    // Should navigate to the category page
    await expect(page).toHaveURL('/guides/medical-bills')

    // Should show category title
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Medical Bills')

    // Should show list of guides
    const guideList = page.getByTestId('guide-list-medical-bills')
    await expect(guideList).toBeVisible()

    // Should have at least one guide listed
    const guides = guideList.getByRole('link')
    await expect(guides).toHaveCount(3) // huge-medical-bill, itemized-bill, negotiate-payment
  })

  test('Debt Collection category navigation works', async ({ page }) => {
    await page.goto('/')

    // Click on Debt Collection category
    await page.getByRole('link', { name: /debt collection/i }).first().click()

    // Should navigate to the category page
    await expect(page).toHaveURL('/guides/debt-collection')

    // Should show category title
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Debt Collection')

    // Should show list of guides
    const guideList = page.getByTestId('guide-list-debt-collection')
    await expect(guideList).toBeVisible()

    // Should have guides listed
    const guides = guideList.getByRole('link')
    await expect(guides).toHaveCount(2) // collections-letter, debt-validation
  })

  test('guide list links to individual guide page', async ({ page }) => {
    await page.goto('/guides/medical-bills')

    // Click on a specific guide
    await page.getByRole('link', { name: /I Got a Huge Medical Bill/i }).click()

    // Should navigate to the guide page
    await expect(page).toHaveURL('/guides/medical-bills/huge-medical-bill')

    // Should show guide title
    await expect(page.getByRole('heading', { level: 1 })).toContainText('I Got a Huge Medical Bill')
  })

  test('breadcrumb navigation works from guide page', async ({ page }) => {
    await page.goto('/guides/medical-bills/huge-medical-bill')

    // Breadcrumb should be visible
    const breadcrumb = page.getByRole('navigation', { name: /breadcrumb/i })
    await expect(breadcrumb).toBeVisible()

    // Should have proper hierarchy
    await expect(breadcrumb.getByRole('link', { name: 'Home' })).toBeVisible()
    await expect(breadcrumb.getByRole('link', { name: 'Guides' })).toBeVisible()
    await expect(breadcrumb.getByRole('link', { name: 'Medical Bills' })).toBeVisible()

    // Click Guides breadcrumb
    await breadcrumb.getByRole('link', { name: 'Guides' }).click()
    await expect(page).toHaveURL('/guides')

    // Navigate back to guide
    await page.goto('/guides/medical-bills/huge-medical-bill')

    // Click Home breadcrumb
    await breadcrumb.getByRole('link', { name: 'Home' }).click()
    await expect(page).toHaveURL('/')
  })

  test('guides hub page shows all categories', async ({ page }) => {
    await page.goto('/guides')

    // Should have main heading
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Panic Guides')

    // Should show both categories (use level 2 to target category headers specifically)
    await expect(page.getByRole('heading', { level: 2, name: /medical bills/i })).toBeVisible()
    await expect(page.getByRole('heading', { level: 2, name: /debt collection/i })).toBeVisible()

    // Should have guide lists for each category
    await expect(page.getByTestId('guide-list-medical-bills')).toBeVisible()
    await expect(page.getByTestId('guide-list-debt-collection')).toBeVisible()
  })

  test('full user journey: homepage to guide', async ({ page }) => {
    // Start at homepage
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('The Panic Manual')

    // Use "What landed in your mailbox?" navigation
    await page.getByRole('link', { name: /medical bills/i }).first().click()

    // Now on category page
    await expect(page).toHaveURL('/guides/medical-bills')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Medical Bills')

    // Select a specific guide
    await page.getByRole('link', { name: /itemized bill/i }).click()

    // Now on individual guide
    await expect(page).toHaveURL('/guides/medical-bills/itemized-bill')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('How to Request an Itemized Bill')
  })
})
