const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/curriculum_data.json', 'utf8'));
data.forEach(item => {
    if (item.theme.includes('數') && item.theme.includes('計')) item.theme = '數與計算';
    if (item.theme.includes('量') || item.theme.includes('實測')) item.theme = '量與實測';
    if (item.theme.includes('空') || item.theme.includes('形')) item.theme = '空間與形狀';
    if (item.theme.includes('關')) item.theme = '關係';
});
fs.writeFileSync('src/curriculum_data.json', JSON.stringify(data, null, 2));
