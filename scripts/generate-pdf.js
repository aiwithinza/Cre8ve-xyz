#!/usr/bin/env node
/**
 * Cre8ve Brand Book PDF Generator
 * Captures /brand page from the Next.js dev server and exports as PDF.
 *
 * Usage: node scripts/generate-pdf.js [--url http://localhost:3000]
 */

const puppeteer = require('puppeteer')
const path = require('path')

const URL = process.argv.find(a => a.startsWith('http')) || 'http://localhost:3000/brand'
const OUT = path.resolve(__dirname, '../Brand-Guidelines/Cre8ve-Brand-Book.pdf')

;(async () => {
  console.log('Launching browser…')
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  const page = await browser.newPage()

  // Large viewport so layout renders at desktop widths
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 })

  console.log(`Navigating to ${URL} …`)
  await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 })

  // Wait for fonts
  await page.evaluate(() => document.fonts.ready)
  await new Promise(r => setTimeout(r, 1000))

  // Scroll through the entire page to trigger all whileInView animations,
  // then force any remaining opacity:0 elements fully visible.
  console.log('Triggering scroll animations…')
  await page.evaluate(async () => {
    const sleep = ms => new Promise(r => setTimeout(r, ms))
    const totalHeight = document.body.scrollHeight
    const step = 400

    for (let pos = 0; pos <= totalHeight; pos += step) {
      window.scrollTo(0, pos)
      await sleep(80)
    }
    // Settle at bottom so last sections are triggered
    await sleep(800)
    window.scrollTo(0, 0)
    await sleep(500)
  })

  // Force all framer-motion elements to their visible end-state.
  // Elements that haven't entered the viewport have inline opacity:0 applied.
  await page.addStyleTag({
    content: `
      /* Force all animated content visible for PDF export */
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
      }

      /* Override Framer Motion whileInView hidden initial states */
      [style*="opacity: 0"],
      [style*="opacity:0"] {
        opacity: 1 !important;
      }
      [style*="translateY(28px)"],
      [style*="translateY(24px)"] {
        transform: translateY(0) !important;
      }

      /*
       * Fix 1: gradient text (WebkitBackgroundClip:text + WebkitTextFillColor:transparent)
       * Chrome PDF engine does not clip backgrounds to text - the gradient renders as
       * a solid colour block. Override to a solid orange instead.
       */
      [style*="-webkit-text-fill-color: transparent"],
      [style*="-webkit-text-fill-color:transparent"] {
        -webkit-text-fill-color: #FF7A1A !important;
        background-image: none !important;
      }

      /*
       * Fix 2: Surface Hierarchy cards — Level 1 (rgba(6,6,6,0.5)) and Level 2
       * (rgba(255,255,255,0.02)) are effectively invisible on a black background.
       * Give them a readable border + slight tint so all three tiers are visible.
       */
      [style*="rgba(6,6,6"] {
        background: #0e0e0e !important;
        border: 1px solid rgba(255,255,255,0.12) !important;
      }
      [style*="rgba(255,255,255,0.02"] {
        background: #1a1a1a !important;
        border: 1px solid rgba(255,255,255,0.1) !important;
      }
    `,
  })

  // Final settle
  await new Promise(r => setTimeout(r, 1500))

  console.log('Generating PDF…')
  await page.pdf({
    path: OUT,
    format: 'A4',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    displayHeaderFooter: false,
  })

  await browser.close()
  console.log(`\nPDF saved → ${OUT}`)
})().catch(err => {
  console.error('PDF generation failed:', err.message)
  process.exit(1)
})
