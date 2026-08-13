import { expect, test } from '@playwright/test'
import { readFile } from 'node:fs/promises'

const canvasSignature = (page) => page.locator('#myCanvas').evaluate((canvas) => canvas.toDataURL())

async function expectCanvasToChange(page, previousSignature) {
  await expect.poll(() => canvasSignature(page)).not.toBe(previousSignature)
}

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

  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Sauvegarder' }).click()
  const savedArtwork = await downloadPromise
  expect(savedArtwork.suggestedFilename()).toBe('art-genere.png')
  const savedPng = await readFile(await savedArtwork.path())
  expect(Array.from(savedPng.subarray(0, 8))).toEqual([137, 80, 78, 71, 13, 10, 26, 10])
  expect(savedPng.byteLength).toBeGreaterThan(10_000)

  const protocolPanel = page.getByTestId('protocol-panel')
  const appHeader = page.getByTestId('app-header')
  const motifPanelColor = await protocolPanel.evaluate((panel) => getComputedStyle(panel).backgroundColor)
  const motifHeaderColor = await appHeader.evaluate((header) => getComputedStyle(header).backgroundColor)
  await page.getByRole('tab', { name: 'Motifs 2' }).click()
  await expect.poll(() => protocolPanel.evaluate((panel) => getComputedStyle(panel).backgroundColor)).toBe('rgb(250, 247, 255)')
  await expect.poll(() => appHeader.evaluate((header) => getComputedStyle(header).backgroundColor)).toBe('rgb(112, 81, 141)')
  const secondMotifPanelColor = await protocolPanel.evaluate((panel) => getComputedStyle(panel).backgroundColor)
  const secondMotifHeaderColor = await appHeader.evaluate((header) => getComputedStyle(header).backgroundColor)
  await page.getByRole('tab', { name: 'Lignes' }).click()
  await expect(page.getByRole('tab', { name: 'Position' })).toBeVisible()
  await expect.poll(() => protocolPanel.evaluate((panel) => getComputedStyle(panel).backgroundColor)).toBe('rgb(243, 251, 248)')
  await expect.poll(() => appHeader.evaluate((header) => getComputedStyle(header).backgroundColor)).toBe('rgb(52, 116, 98)')
  const linesPanelColor = await protocolPanel.evaluate((panel) => getComputedStyle(panel).backgroundColor)
  const linesHeaderColor = await appHeader.evaluate((header) => getComputedStyle(header).backgroundColor)
  await page.getByRole('tab', { name: 'Fond' }).click()
  await expect(page.getByText('Nombre de couleurs')).toBeVisible()
  const colorPositionLabels = page.locator('.v-range-slider .v-slider-thumb__label')
  await expect(colorPositionLabels).toHaveCount(2)
  await expect(colorPositionLabels).toHaveText(['0.25', '0.75'])
  await expect(colorPositionLabels.first()).toBeVisible()
  await expect(colorPositionLabels.last()).toBeVisible()
  await expect.poll(() => protocolPanel.evaluate((panel) => getComputedStyle(panel).backgroundColor)).toBe('rgb(244, 248, 252)')
  await expect.poll(() => appHeader.evaluate((header) => getComputedStyle(header).backgroundColor)).toBe('rgb(71, 107, 145)')
  const backgroundPanelColor = await protocolPanel.evaluate((panel) => getComputedStyle(panel).backgroundColor)
  const backgroundHeaderColor = await appHeader.evaluate((header) => getComputedStyle(header).backgroundColor)
  expect(new Set([motifPanelColor, secondMotifPanelColor, linesPanelColor, backgroundPanelColor]).size).toBe(4)
  expect(new Set([motifHeaderColor, secondMotifHeaderColor, linesHeaderColor, backgroundHeaderColor]).size).toBe(4)
  await page.getByRole('tab', { name: 'Motifs 1' }).click()

  const seed = page.getByRole('textbox', { name: 'Position' })
  const beforeSeedChange = await canvasSignature(page)
  await seed.fill('Élève')
  await expect(seed).toHaveValue('Élève')
  await expectCanvasToChange(page, beforeSeedChange)

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

test('redraws immediately and keeps integer star controls valid', async ({ page }) => {
  await page.goto('./')
  await page.getByRole('button', { name: 'Commencer...' }).click()
  await expect(page.locator('.protocol-overlay')).toBeHidden()

  const typeSelect = page.locator('.v-select').first()
  const initialSignature = await canvasSignature(page)
  await typeSelect.click()
  await page.getByRole('option', { name: 'rectangle', exact: true }).click()
  await expectCanvasToChange(page, initialSignature)

  const rectangleSignature = await canvasSignature(page)
  await typeSelect.click()
  await page.getByRole('option', { name: 'étoile', exact: true }).click()
  await expectCanvasToChange(page, rectangleSignature)

  await page.locator('[role="tab"]:visible', { hasText: 'Détails' }).first().click()
  const pointSlider = page.getByRole('slider').last()
  await expect(pointSlider).toHaveAttribute('aria-valuenow', '5')

  const fivePointSignature = await canvasSignature(page)
  await pointSlider.focus()
  await pointSlider.press('ArrowRight')
  await expect(pointSlider).toHaveAttribute('aria-valuenow', '6')
  await expectCanvasToChange(page, fivePointSignature)

  const redMotifPixels = await page.locator('#myCanvas').evaluate((canvas) => {
    const pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data
    let count = 0
    for (let index = 0; index < pixels.length; index += 4) {
      if (pixels[index] > pixels[index + 1] * 1.35) count += 1
    }
    return count
  })
  expect(redMotifPixels).toBeGreaterThan(1_000)

  await page.getByRole('tab', { name: 'Lignes' }).click()
  await page.getByRole('tab', { name: 'Position' }).click()
  const beforeLineAngle = await canvasSignature(page)
  await page.getByRole('slider').first().focus()
  await page.getByRole('slider').first().press('ArrowRight')
  await expectCanvasToChange(page, beforeLineAngle)

  await page.getByRole('tab', { name: 'Fond' }).click()
  const colorCount = page.getByTestId('color-count')
  await expect(colorCount.getByRole('button')).toHaveCount(3)
  const beforeThirdColor = await canvasSignature(page)
  await colorCount.getByRole('button', { name: '3', exact: true }).click()
  await expect(page.getByRole('tab', { name: 'Couleur 3' })).toBeVisible()
  await expectCanvasToChange(page, beforeThirdColor)
})

test('keeps the experimental secondary route available', async ({ page }) => {
  await page.goto('./#/generated_art')
  await expect(page.getByRole('heading', { name: 'Carolinized' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Dessiner' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Étape suivante' })).toBeVisible()
  await expect(page.locator('#myCanvas')).toBeVisible()
})
