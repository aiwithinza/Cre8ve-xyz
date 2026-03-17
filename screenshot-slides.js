const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto('file:///Users/cre8ve/Cre8ve.xyz/Brand-Guidelines/brand_book.html', { waitUntil: 'networkidle0' });
    
    // Evaluate the number of slides
    const numSlides = await page.evaluate(() => document.querySelectorAll('.slide').length);
    console.log(`Found ${numSlides} slides.`);

    // Hide overflow on body to prevent scrolling issues? No, standard 
    
    for (let i = 0; i < numSlides; i++) {
        const slideBoundingBox = await page.evaluate((index) => {
            const el = document.querySelectorAll('.slide')[index];
            const { x, y, width, height } = el.getBoundingClientRect();
            return { x, y: y + window.scrollY, width, height }; // include scrollY to get absolute Y
        }, i);

        await page.screenshot({
            path: `Brand-Guidelines/slide_${i + 1}.png`,
            clip: slideBoundingBox
        });
        console.log(`Saved slide_${i + 1}.png`);
    }

    await browser.close();
})();
