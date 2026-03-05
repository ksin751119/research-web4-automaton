import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const HTML_PATH = path.join(ROOT, 'index.html');
const OUTPUT_PATH = path.join(ROOT, 'output', 'conway-automaton.pdf');

const TOTAL_SLIDES = 13;

// A4 landscape: 297mm × 210mm. At 96dpi: 1123 × 794 px
const VIEWPORT_W = 1123;
const VIEWPORT_H = 794;
const DEVICE_SCALE = 2; // 2x for sharp output

async function main() {
  console.log('Launching Chromium...');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: VIEWPORT_W, height: VIEWPORT_H },
    deviceScaleFactor: DEVICE_SCALE,
  });
  const page = await context.newPage();

  // Load the HTML file
  const fileUrl = `file://${HTML_PATH}`;
  console.log(`Loading ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  // Wait for Google Fonts to load
  await page.evaluate(() => document.fonts.ready);
  console.log('Fonts loaded.');

  // Inject CSS to hide interactive UI elements
  await page.addStyleTag({
    content: `
      #nav-dots,
      #slide-counter,
      #edit-hotzone,
      #edit-toggle,
      #cursor-aura,
      .edit-bar,
      [id^="progress"] {
        display: none !important;
      }
      /* Disable scroll-snap so scrollIntoView works reliably */
      html {
        scroll-snap-type: none !important;
      }
    `,
  });

  // Force all animations to their final visible state
  await page.evaluate(() => {
    document.querySelectorAll('.anim-fade, .anim-scale, .anim-left, .anim-right').forEach(el => {
      el.classList.add('visible');
    });
    document.querySelectorAll('.seq-flow').forEach(el => {
      el.classList.add('seq-revealed');
    });
  });

  const screenshots = [];

  for (let i = 1; i <= TOTAL_SLIDES; i++) {
    console.log(`Capturing slide ${i}/${TOTAL_SLIDES}...`);

    // Scroll to the slide
    await page.evaluate((slideNum) => {
      const el = document.getElementById('slide-' + slideNum);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }, i);

    // Wait for scroll to settle + canvas particles to draw
    await page.waitForTimeout(800);

    // Screenshot the viewport
    const buf = await page.screenshot({
      type: 'png',
      clip: { x: 0, y: 0, width: VIEWPORT_W, height: VIEWPORT_H },
    });
    screenshots.push(buf);
  }

  await browser.close();
  console.log('Browser closed. Assembling PDF...');

  // Assemble PDF with pdf-lib
  const pdfDoc = await PDFDocument.create();

  // A4 landscape in PDF points: 841.89 × 595.28
  const A4_W = 841.89;
  const A4_H = 595.28;

  for (let i = 0; i < screenshots.length; i++) {
    const pngImage = await pdfDoc.embedPng(screenshots[i]);
    const pdfPage = pdfDoc.addPage([A4_W, A4_H]);
    pdfPage.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: A4_W,
      height: A4_H,
    });
  }

  const pdfBytes = await pdfDoc.save();
  await writeFile(OUTPUT_PATH, pdfBytes);
  console.log(`PDF saved to ${OUTPUT_PATH} (${screenshots.length} pages)`);
}

main().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
