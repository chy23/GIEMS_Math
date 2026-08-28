const fs = require('fs');
const { execSync } = require('child_process');

try {
    const rawText = execSync('pdftotext -layout /Users/chiahua/.gemini/antigravity/brain/147558ff-4d95-470c-a7ba-1c1ac3d99437/.user_uploaded/media_1787932504697.pdf -', { encoding: 'utf-8' });
    console.log(rawText.slice(0, 500));
} catch (e) {
    console.log("pdftotext not found, will use pdfplumber in python");
}
