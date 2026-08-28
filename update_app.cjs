const fs = require('fs');

let content = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Add selectedSubThemes state
content = content.replace(
    'const [selectedDimensions, setSelectedDimensions] = useState<string[]>([]);',
    'const [selectedDimensions, setSelectedDimensions] = useState<string[]>([]);\n  const [selectedSubThemes, setSelectedSubThemes] = useState<string[]>([]);'
);

// 2. Update updateItem
content = content.replace(
    'setSelectedDimensions(prev => prev.includes(changedItem.name) ? prev : [...prev, changedItem.name]);',
    `setSelectedDimensions(prev => prev.includes(changedItem.name) ? prev : [...prev, changedItem.name]);
        const abilities = changedItem.ability.split('、').filter(Boolean);
        if (abilities.length > 0) {
           setSelectedSubThemes(prev => {
             const newSet = new Set([...prev, ...abilities]);
             return Array.from(newSet);
           });
        }`
);

// 3. Update sampledCurriculum logic
content = content.replace(
    /const sampledCurriculum = useMemo\(\(\) => \{[\s\S]*?return result\.sort\(/,
    `const sampledCurriculum = useMemo(() => {
    if (selectedSubThemes.length === 0) return [];
    
    const itemsByGradeAndSub: Record<string, Record<string, CurriculumItem[]>> = {
      '1': {}, '2': {}, '3': {}, '4': {}, '5': {}, '6': {}
    };

    curriculumData.forEach((item: any) => {
      const parts = item.code.split('-');
      if (parts.length < 2) return;
      const grade = parts[1];
      if (!itemsByGradeAndSub[grade]) return;

      const sub = item.matchedAbility;
      if (selectedSubThemes.includes(sub)) {
        if (!itemsByGradeAndSub[grade][sub]) itemsByGradeAndSub[grade][sub] = [];
        itemsByGradeAndSub[grade][sub].push(item);
      }
    });

    const result: CurriculumItem[] = [];

    ['1', '2', '3', '4', '5', '6'].forEach(grade => {
      const subsForGrade = Object.keys(itemsByGradeAndSub[grade]);
      if (subsForGrade.length === 0) return;

      const targetCount = Math.floor(Math.random() * 3) + 6; // 6, 7, or 8
      const selectedForGrade: CurriculumItem[] = [];
      
      const pools = subsForGrade.map(sub => {
        const arr = [...itemsByGradeAndSub[grade][sub]];
        return arr.sort(() => 0.5 - Math.random());
      });

      let added = true;
      while (selectedForGrade.length < targetCount && added) {
        added = false;
        for (let pool of pools) {
          if (selectedForGrade.length >= targetCount) break;
          if (pool.length > 0) {
            selectedForGrade.push(pool.pop()!);
            added = true;
          }
        }
      }

      result.push(...selectedForGrade);
    });

    return result.sort(`
);

// 4. Update Section 2 UI
const uiOld = `<div className="mb-4">
            <label className="mr-2 font-bold text-gray-800">請勾選欲改善之向度：</label>
            <div className="flex gap-4 mt-2 mb-2 flex-wrap">
              {['數與計算', '量與實測', '空間與形狀', '關係'].map(dim => (
                <label key={dim} className="flex items-center cursor-pointer bg-gray-100 px-3 py-1 rounded border border-gray-300">
                  <input 
                    type="checkbox" 
                    className="mr-2"
                    checked={selectedDimensions.includes(dim)}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedDimensions(prev => [...prev, dim]);
                      else setSelectedDimensions(prev => prev.filter(d => d !== dim));
                    }}
                  />
                  {dim}
                </label>
              ))}
            </div>
            <span className="text-sm text-gray-500 block">第一大題評估為「低於」市平均的向度會自動帶入此處，您也可以手動勾選調整。</span>
          </div>`;

const uiNew = `<div className="mb-4">
            <label className="mr-2 font-bold text-gray-800">請勾選欲改善之向度與次主題：</label>
            <div className="flex flex-col gap-2 mt-2 mb-2">
              {['數與計算', '量與實測', '空間與形狀', '關係'].map(dim => {
                const dimId = Object.keys(abilityOptions).find(k => initialItems.find(i => i.id === k)?.name === dim)!;
                const subs = abilityOptions[dimId] || [];
                return (
                  <div key={dim} className="flex items-center bg-gray-100 p-3 rounded border border-gray-300 min-h-[48px]">
                    <label className="flex items-center cursor-pointer font-bold w-32 shrink-0">
                      <input 
                        type="checkbox" 
                        className="mr-2 w-4 h-4"
                        checked={selectedDimensions.includes(dim)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedDimensions(prev => [...prev, dim]);
                          else setSelectedDimensions(prev => prev.filter(d => d !== dim));
                        }}
                      />
                      {dim}
                    </label>
                    <div className="flex flex-wrap gap-4 ml-4">
                      {selectedDimensions.includes(dim) && subs.map(sub => (
                        <label key={sub} className="flex items-center cursor-pointer text-sm text-gray-700 hover:text-blue-600">
                          <input 
                            type="checkbox" 
                            className="mr-1 w-4 h-4"
                            checked={selectedSubThemes.includes(sub)}
                            onChange={(e) => {
                              if (e.target.checked) setSelectedSubThemes(prev => [...prev, sub]);
                              else setSelectedSubThemes(prev => prev.filter(s => s !== sub));
                            }}
                          />
                          {sub}
                        </label>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <span className="text-sm text-gray-500 block">第一大題評估為「低於」市平均的向度及其選取的次主題會自動帶入此處，您也可以手動勾選調整。</span>
          </div>`;

content = content.replace(uiOld, uiNew);

fs.writeFileSync('src/App.tsx', content);
