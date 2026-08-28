const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('/Users/chiahua/.gemini/antigravity/brain/147558ff-4d95-470c-a7ba-1c1ac3d99437/.user_uploaded/media_1787922248518.pdf');

pdf(dataBuffer).then(function(data) {
    const text = data.text;
    const items = [];
    // Basic regex to find [CODE] followed by description
    // The PDF text might be messy
    const regex = /\[([A-Z0-9-]+)\]\s*([^\[]+)/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
        const code = match[1].trim();
        const content = match[2].trim();
        
        // This is a rough extraction. We need to split the content into Description, Strategy, Grade
        // In the PDF, the text usually flows from left to right, or top to bottom.
        // If pdf-parse returns just raw text, it might mix the columns.
        items.push({ code, raw: content });
    }
    fs.writeFileSync('raw_pdf.json', JSON.stringify(items, null, 2));
    console.log(`Extracted ${items.length} raw items`);
});
