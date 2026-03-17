const fs = require('fs');

async function run() {
    const pdfjsLib = require('pdfjs-dist/legacy/build/pdf.js');
    const loadingTask = pdfjsLib.getDocument('Brand-Guidelines/Cre8ve_Brand_Book_16x9.pdf');
    const pdfDocument = await loadingTask.promise;
    
    console.log('Pages: ' + pdfDocument.numPages);
    
    for (let i = 1; i <= pdfDocument.numPages; i++) {
        const page = await pdfDocument.getPage(i);
        const textContent = await page.getTextContent();
        console.log(`Page ${i} text length: ${textContent.items.length}`);
    }
}
run().catch(console.error);
