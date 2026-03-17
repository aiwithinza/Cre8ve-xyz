const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    try {
        console.log('Starting puppeteer...');
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        const url = 'http://localhost:8080/profile.html';
        console.log(`Loading ${url}`);
        
        // Ensure the layout matches our 1920x1080 slide design
        await page.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
        
        // Wait until there are no more than 0 network connections
        await page.goto(url, { waitUntil: 'networkidle0' });
        
        console.log('Waiting for Tailwind CDN and fonts to render...');
        await new Promise(resolve => setTimeout(resolve, 4000));
        
        console.log('Generating PDF...');
        await page.pdf({
            path: 'Cre8ve_Company_Profile.pdf',
            width: '1920px',
            height: '1080px',
            printBackground: true,
            margin: { top: 0, right: 0, bottom: 0, left: 0 }
        });
        
        console.log('PDF generated successfully: Cre8ve_Company_Profile.pdf');
        await browser.close();
    } catch (error) {
        console.error('Error generating PDF:', error);
        process.exit(1);
    }
})();
