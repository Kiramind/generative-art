import { expect, test } from '@playwright/test'

test('renders the deterministic initial protocol at this screen size', async ({ page }) => {
  await page.goto('./')
  await expect(page.getByRole('heading', { name: 'Art Généré' })).toBeVisible()
  await expect(page.getByAltText('Logo Art généré')).toBeVisible()
  await expect(page.locator('#myCanvas')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Commencer...' })).toBeVisible()

  const motifPixelCount = await page.locator('#myCanvas').evaluate((canvas) => {
    const pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data
    let count = 0
    for (let index = 0; index < pixels.length; index += 4) {
      const red = pixels[index]
      const green = pixels[index + 1]
      const blue = pixels[index + 2]
      if (red > green * 1.35 || green > blue * 1.35) count += 1
    }
    return count
  })
  expect(motifPixelCount).toBeGreaterThan(10_000)

  if (!process.env.CI) {
    await expect(page).toHaveScreenshot('initial.png', { fullPage: true })
  }
})

test('supports the main editing workflow', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('button', { name: 'Commencer...' }).click()
  await expect(page.getByRole('button', { name: 'Commencer...' })).toBeHidden()

  const popupPromise = page.waitForEvent('popup')
  await page.getByRole('button', { name: 'Sauvegarder' }).click()
  const savedArtwork = await popupPromise
  await expect(savedArtwork.locator('img')).toBeVisible()
  await savedArtwork.close()

  const protocolPanel = page.getByTestId('protocol-panel')
  const motifPanelColor = await protocolPanel.evaluate((panel) => getComputedStyle(panel).backgroundColor)
  await page.getByRole('tab', { name: 'Lignes' }).click()
  await expect(page.getByRole('tab', { name: 'Position' })).toBeVisible()
  await expect.poll(() => protocolPanel.evaluate((panel) => getComputedStyle(panel).backgroundColor)).toBe('rgb(243, 251, 248)')
  const linesPanelColor = await protocolPanel.evaluate((panel) => getComputedStyle(panel).backgroundColor)
  await page.getByRole('tab', { name: 'Fond' }).click()
  await expect(page.getByText('Nombre de couleurs')).toBeVisible()
  await expect.poll(() => protocolPanel.evaluate((panel) => getComputedStyle(panel).backgroundColor)).toBe('rgb(244, 248, 252)')
  const backgroundPanelColor = await protocolPanel.evaluate((panel) => getComputedStyle(panel).backgroundColor)
  expect(new Set([motifPanelColor, linesPanelColor, backgroundPanelColor]).size).toBe(3)
  await page.getByRole('tab', { name: 'Motifs 1' }).click()

  const seed = page.getByRole('textbox', { name: 'Position' })
  await seed.fill('Élève')
  await expect(seed).toHaveValue('Élève')
  await expect(page.locator('#myCanvas')).toBeVisible()

  await page.locator('[role="tab"]:visible', { hasText: 'Détails' }).first().click()
  const detailsPanel = page.locator('.slider-panel:visible')
  const firstSliderTooltip = detailsPanel.locator('.v-slider-thumb__label').first()
  await expect(firstSliderTooltip).toBeVisible()
  const panelBox = await detailsPanel.boundingBox()
  const tooltipBox = await firstSliderTooltip.boundingBox()
  expect(tooltipBox.y - panelBox.y).toBeGreaterThanOrEqual(12)

  if (!process.env.CI) {
    await page.evaluate(() => window.scrollTo(0, 0))
    await expect(page).toHaveScreenshot('editor.png', { fullPage: true })
  }
})

test('keeps the experimental secondary route available', async ({ page }) => {
  await page.goto('./#/generated_art')
  await expect(page.getByRole('heading', { name: 'Carolinized' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Dessiner' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Étape suivante' })).toBeVisible()
  await expect(page.locator('#myCanvas')).toBeVisible()
})
