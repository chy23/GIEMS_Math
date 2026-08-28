const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/curriculum_data.json', 'utf8'));
const unique = [...new Set(data.map(i => i.subTheme))];
console.log(unique);
