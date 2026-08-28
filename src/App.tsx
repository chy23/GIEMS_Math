import React, { useState } from 'react';
import curriculumData from './curriculum_data.json';

type Status = 'higher' | 'similar' | 'lower' | '';

interface DimensionItem {
  id: string;
  name: string;
  status: Status;
  ability: string;
}

interface CurriculumItem {
  code: string;
  description: string;
  remark: string;
}

const initialItems: DimensionItem[] = [
  { id: 'overall', name: '整體', status: '', ability: '' },
  { id: 'num_calc', name: '數與計算', status: '', ability: '' },
  { id: 'measure', name: '量與實測', status: '', ability: '' },
  { id: 'space_shape', name: '空間與形狀', status: '', ability: '' },
  { id: 'relation', name: '關係', status: '', ability: '' },
  { id: 'concept', name: '概念理解', status: '', ability: '' },
  { id: 'process', name: '程序執行', status: '', ability: '' },
  { id: 'problem_solving', name: '解題思考', status: '', ability: '' },
];

function App() {
  const [district, setDistrict] = useState('');
  const [school, setSchool] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [subject, setSubject] = useState('');

  const [items, setItems] = useState<DimensionItem[]>(initialItems);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const updateItem = (id: string, field: keyof DimensionItem, value: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };
  
  const getResultSuffix = (status: Status) => {
    if (status === 'higher') return '表現良好';
    if (status === 'similar') return '保持穩定';
    if (status === 'lower') return '需稍加強';
    return '...';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 shadow-sm border border-gray-200">
        
        {/* Title Section */}
        <h1 className="text-2xl font-bold text-center mb-10 leading-relaxed">
          新北市
          <input 
            type="text" 
            className="border-b-2 border-gray-400 mx-2 w-24 text-center focus:outline-none focus:border-blue-500" 
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            placeholder="區"
          />
          區
          <input 
            type="text" 
            className="border-b-2 border-gray-400 mx-2 w-32 text-center focus:outline-none focus:border-blue-500" 
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            placeholder="校名"
          />
          國民小學
          <input 
            type="text" 
            className="border-b-2 border-gray-400 mx-2 w-20 text-center focus:outline-none focus:border-blue-500" 
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            placeholder="學年度"
          />
          學年度【
          <input 
            type="text" 
            className="border-b-2 border-gray-400 mx-2 w-24 text-center focus:outline-none focus:border-blue-500" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="科目"
          />
          科能力檢測】結果分析及因應措施範例
        </h1>

        {/* Section 1 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">一、【檢測結果分析】</h2>
          <p className="mb-4 text-gray-700">
            可依【<span className="font-semibold">{subject || '○○'}</span>科檢測評量向度與題目分類細目表】進行分析，例如：
          </p>
          
          <div className="space-y-6 ml-4">
            {items.map((item, index) => {
              // Grouping headers logic
              let groupHeader = null;
              if (index === 0) groupHeader = <h3 className="font-bold text-lg text-blue-800 mb-2 mt-4">整體</h3>;
              if (index === 1) groupHeader = <h3 className="font-bold text-lg text-blue-800 mb-2 mt-8">學習內容分析</h3>;
              if (index === 5) groupHeader = <h3 className="font-bold text-lg text-blue-800 mb-2 mt-8">學習表現分析</h3>;

              return (
                <React.Fragment key={item.id}>
                  {groupHeader}
                  <div className="flex items-start">
                    <span className="mr-2">{index + 1}.</span>
                    <div className="flex-1 leading-loose">
                      (與全市學生作答答對率相比)本校學生{item.name === '整體' ? '整體' : `${item.name}向度`}通過率
                      <select 
                        className="border-b-2 border-gray-400 mx-2 text-center focus:outline-none focus:border-blue-500 bg-transparent text-blue-700 font-semibold cursor-pointer"
                        value={item.status}
                        onChange={(e) => updateItem(item.id, 'status', e.target.value as Status)}
                      >
                        <option value="">(請選擇)</option>
                        <option value="higher">高於</option>
                        <option value="similar">接近</option>
                        <option value="lower">略低於</option>
                      </select>
                      市平均
                      {item.id === 'overall' ? '。' : (
                        <>
                          ，表示在
                          <input 
                            type="text" 
                            className="border-b-2 border-gray-400 mx-2 w-64 text-center focus:outline-none focus:border-blue-500" 
                            value={item.ability}
                            onChange={(e) => updateItem(item.id, 'ability', e.target.value)}
                            placeholder="請填入能力說明(參考圖五)"
                          />
                          的能力方面，
                          <span className="font-semibold text-green-700">
                            {item.status ? getResultSuffix(item.status) : '(將依選擇自動變更)'}
                          </span>。
                        </>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">二、【改善教學及定期評量命題策略】</h2>
          <p className="mb-4 text-gray-700 text-sm">
            --各校應參考國語文和數學、英語文檢測試題答案、命題架構與答對率分析等統計數據，分析各項能力指標，擬定具體教學目標，尋找合適教學素材，並設計適當教學策略與方法，<span className="text-red-500 underline underline-offset-2">進一步作為改善學生定期學習評量之命題(例如：於高年級國語文和數學定期評量紙筆測驗增加多元題型之命題型式)</span>。
          </p>

          <div className="mb-4">
            <label className="mr-2 font-bold text-gray-800">請選擇主題類別：</label>
            <select 
              className="border border-gray-400 p-2 rounded focus:outline-none focus:border-blue-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">(請選擇)</option>
              <option value="N">N (數與量)</option>
              <option value="S">S (空間與形狀)</option>
              <option value="R">R (關係)</option>
              <option value="D">D (資料與不確定性)</option>
            </select>
            <span className="text-sm text-gray-500 ml-3">選取後將自動帶入該類別 1~6 年級的課綱資料。</span>
          </div>
          
          <table className="w-full border-collapse border border-black text-center mb-6">
            <thead>
              <tr className="border-b border-black font-bold">
                <th className="border-r border-black p-2 w-1/4">亟需改善之項目</th>
                <th className="border-r border-black p-2 w-2/4 text-red-500 underline underline-offset-2">改善教學及定期評量命題策略</th>
                <th className="p-2 w-1/4">實施年級</th>
              </tr>
            </thead>
            <tbody>
              {selectedCategory === '' ? (
                <tr className="border-b border-black">
                  <td colSpan={3} className="p-4 text-gray-500">請先於上方選擇主題類別以帶入資料。</td>
                </tr>
              ) : (
                curriculumData
                  .filter((item: CurriculumItem) => item.code.startsWith(`${selectedCategory}-`))
                  .map((item: CurriculumItem, index: number) => {
                    const grade = item.code.split('-')[1]; // Extracted from N-X-Y
                    return (
                      <tr key={`${item.code}-${index}`} className="border-b border-black">
                        <td className="border-r border-black p-2 text-left align-top text-sm">
                          <span className="font-bold text-blue-700">[{item.code}]</span><br/>
                          {item.description}
                        </td>
                        <td className="border-r border-black p-0">
                          <textarea className="w-full h-full p-2 min-h-[80px] resize-none focus:outline-none focus:bg-blue-50" placeholder="請輸入策略..."></textarea>
                        </td>
                        <td className="p-0 align-top">
                          <input type="text" className="w-full h-full p-2 text-center focus:outline-none focus:bg-blue-50 font-bold" defaultValue={`${grade}年級`} />
                        </td>
                      </tr>
                    );
                  })
              )}
            </tbody>
          </table>
        </section>

        {/* Section 3 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">三、【教師增能規劃】</h2>
          <textarea 
            className="w-full border border-gray-400 p-4 min-h-[120px] focus:outline-none focus:border-blue-500 rounded-sm"
            placeholder="請輸入教師增能規劃內容..."
          ></textarea>
        </section>

        {/* Section 4 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">四、【學習扶助教學規劃】</h2>
          <textarea 
            className="w-full border border-gray-400 p-4 min-h-[120px] focus:outline-none focus:border-blue-500 rounded-sm"
            placeholder="請輸入學習扶助教學規劃內容..."
          ></textarea>
        </section>

        {/* Section 5 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">五、其他因應措施</h2>
          <p className="mb-2 text-gray-700 text-sm">--各校視需要自行撰寫</p>
          <textarea 
            className="w-full border border-gray-400 p-4 min-h-[120px] focus:outline-none focus:border-blue-500 rounded-sm"
            placeholder="請輸入其他因應措施..."
          ></textarea>
        </section>

      </div>
    </div>
  );
}

export default App;
