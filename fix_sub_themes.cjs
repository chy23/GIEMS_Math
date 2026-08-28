const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/curriculum_data.json', 'utf8'));
data.forEach(item => {
    if (item.subTheme === '整數與') item.subTheme = '整數與運算';
    if (item.subTheme === '量與') item.subTheme = '量與實測';
    if (item.subTheme === '因數與') item.subTheme = '因數與倍數';
    if (item.subTheme === '分數/小數') item.subTheme = '分數/小數與運算';
    if (item.theme === '實測') item.theme = '量與實測'; // just in case
    // user's ability options match:
    // num_calc: ['整數與運算', '分數\\小數與運算', '因數倍數', '比例', '速度'],
    if (item.subTheme === '因數與倍數') item.subTheme = '因數倍數';
    if (item.subTheme === '整數與加減') item.subTheme = '整數與運算';
    if (item.subTheme === '分數') item.subTheme = '分數\\小數與運算';
    if (item.subTheme === '分數/小數與運算') item.subTheme = '分數\\小數與運算';
    
    // measure: ['面積', '重量', '體積', '容積', '時間計算'],
    // space_shape: ['平面與立體'],
    if (['形體的認識', '平面圖形', '平面與立體'].includes(item.subTheme)) item.subTheme = '平面與立體';
    
    // relation: ['併式與關係', '數量關係'],
    if (item.subTheme === '性質與關係') item.subTheme = '併式與關係';
});
fs.writeFileSync('src/curriculum_data.json', JSON.stringify(data, null, 2));
