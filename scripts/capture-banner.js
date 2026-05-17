const puppeteer = require('puppeteer');
const path = require('path');

async function capture() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1584, height: 396, deviceScaleFactor: 2 });
  
  const fileUrl = 'file://' + path.resolve(__dirname, '../public/assets/banners/linkedin-banner-prayaga-v2.html');
  console.log('Navigating to:', fileUrl);

  await page.goto(fileUrl, { waitUntil: 'networkidle0' });

  const outputPath = path.resolve(__dirname, '../public/assets/banners/linkedin-banner-prayaga-v2.png');
  await page.screenshot({ path: outputPath });
  
  console.log('Saved to:', outputPath);
  await browser.close();
}

capture().catch(console.error);
