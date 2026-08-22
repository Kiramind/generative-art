import { expect, test } from '@playwright/test'

test('keeps the canvas size stable across motif redraws on high-density displays', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('button', { name: 'Commencer...' }).click()
  await page.locator('[role="tab"]:visible', { hasText: 'Détails' }).first().click()

  const canvas = page.locator('#myCanvas')
  const initialBox = await canvas.boundingBox()
  const densitySlider = page.getByRole('slider').first()

  for (let change = 0; change < 5; change += 1) {
    await densitySlider.focus()
    await densitySlider.press('ArrowRight')
  }

  await expect(canvas).toHaveCSS('width', `${initialBox.width}px`)
  await expect(canvas).toHaveCSS('height', `${initialBox.height}px`)
})
