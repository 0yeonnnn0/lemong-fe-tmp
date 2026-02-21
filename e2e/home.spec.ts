import { test, expect } from '@playwright/test'

test('홈페이지가 정상적으로 표시된다', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Lemong' })).toBeVisible()
})
