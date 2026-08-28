const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/curriculum_data.json', 'utf8'));

data.forEach(item => {
    let sub = '';
    const d = item.description + ' ' + item.strategy;
    if (d.match(/速度/)) sub = '速度';
    else if (item.theme === '數與計算') {
        if (d.match(/因數|倍數/)) sub = '因數倍數';
        else if (d.match(/比例|比值|正比/)) sub = '比例';
        else if (d.match(/分母|分數|小數/)) sub = '分數\\小數與運算';
        else sub = '整數與運算';
    } else if (item.theme === '量與實測') {
        if (d.match(/時間|時|分|秒|鐘面|日曆|年|月|日|星期/)) sub = '時間計算';
        else if (d.match(/重量|公克|公斤|公噸|天平/)) sub = '重量';
        else if (d.match(/體積|立方/)) sub = '體積';
        else if (d.match(/容積|容量|公升|毫升/)) sub = '容積';
        else sub = '面積'; // default
    } else if (item.theme === '空間與形狀') {
        sub = '平面與立體';
    } else if (item.theme === '關係') {
        if (d.match(/併式|加減|乘除|混合/)) sub = '併式與關係';
        else sub = '數量關係';
    } else {
        sub = item.subTheme;
    }
    item.matchedAbility = sub;
});
fs.writeFileSync('src/curriculum_data.json', JSON.stringify(data, null, 2));
