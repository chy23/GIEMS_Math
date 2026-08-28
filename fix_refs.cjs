const fs = require('fs');
let data = JSON.parse(fs.readFileSync('src/curriculum_data.json', 'utf8'));

let count = 0;
data.forEach(item => {
    if (item.strategy && item.strategy.match(/同\s*([A-Z0-9-]+)\s*備註/)) {
        const match = item.strategy.match(/同\s*([A-Z0-9-]+)\s*備註/);
        const targetCode = match[1];
        const targetItem = data.find(i => i.code === targetCode);
        if (targetItem) {
            item.strategy = item.strategy.replace(match[0], targetItem.strategy);
            count++;
        }
    }
});

fs.writeFileSync('src/curriculum_data.json', JSON.stringify(data, null, 2));
console.log(`Replaced ${count} references`);
