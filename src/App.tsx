import React, { useState } from 'react';

function App() {
  const [district, setDistrict] = useState('');
  const [school, setSchool] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [subject, setSubject] = useState('');

  const [highPassDims, setHighPassDims] = useState<string[]>([]);
  const [goodAbilities, setGoodAbilities] = useState('');
  const [lowPassDims, setLowPassDims] = useState<string[]>([]);
  const [needsImprovementAbilities, setNeedsImprovementAbilities] = useState('');

  const dimensionsList = ['數與計算', '量與實測', '空間與形狀', '關係'];
  
  const handleDimChange = (dim: string, type: 'high' | 'low') => {
    if (type === 'high') {
      setHighPassDims(prev => prev.includes(dim) ? prev.filter(d => d !== dim) : [...prev, dim]);
    } else {
      setLowPassDims(prev => prev.includes(dim) ? prev.filter(d => d !== dim) : [...prev, dim]);
    }
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
            <div className="flex items-start">
              <span className="mr-2">1.</span>
              <div className="flex-1 leading-loose">
                (與全市學生作答答對率相比)本校學生
                <span className="inline-flex flex-wrap items-center gap-2 mx-2 border-b-2 border-gray-200 pb-1">
                  {dimensionsList.map(dim => (
                    <label key={dim} className="cursor-pointer flex items-center space-x-1">
                      <input 
                        type="checkbox" 
                        checked={highPassDims.includes(dim)}
                        onChange={() => handleDimChange(dim, 'high')}
                      />
                      <span>{dim}向度</span>
                    </label>
                  ))}
                </span>
                通過率較高，表示在
                <input 
                  type="text" 
                  className="border-b-2 border-gray-400 mx-2 w-48 text-center focus:outline-none focus:border-blue-500" 
                  value={goodAbilities}
                  onChange={(e) => setGoodAbilities(e.target.value)}
                  placeholder="能力說明"
                />
                的能力方面，表現良好。
              </div>
            </div>

            <div className="flex items-start">
              <span className="mr-2">2.</span>
              <div className="flex-1 leading-loose">
                (與全市學生作答答對率相比)本校學生
                <span className="inline-flex flex-wrap items-center gap-2 mx-2 border-b-2 border-gray-200 pb-1">
                  {dimensionsList.map(dim => (
                    <label key={dim} className="cursor-pointer flex items-center space-x-1">
                      <input 
                        type="checkbox" 
                        checked={lowPassDims.includes(dim)}
                        onChange={() => handleDimChange(dim, 'low')}
                      />
                      <span>{dim}向度</span>
                    </label>
                  ))}
                </span>
                通過率較低，表示在
                <input 
                  type="text" 
                  className="border-b-2 border-gray-400 mx-2 w-48 text-center focus:outline-none focus:border-blue-500" 
                  value={needsImprovementAbilities}
                  onChange={(e) => setNeedsImprovementAbilities(e.target.value)}
                  placeholder="能力說明"
                />
                的能力方面，尚需加強。
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4">二、【改善教學及定期評量命題策略】</h2>
          <p className="mb-4 text-gray-700 text-sm">
            --各校應參考國語文和數學、英語文檢測試題答案、命題架構與答對率分析等統計數據，分析各項能力指標，擬定具體教學目標，尋找合適教學素材，並設計適當教學策略與方法，<span className="text-red-500 underline underline-offset-2">進一步作為改善學生定期學習評量之命題(例如：於高年級國語文和數學定期評量紙筆測驗增加多元題型之命題型式)</span>。
          </p>
          
          <table className="w-full border-collapse border border-black text-center mb-6">
            <thead>
              <tr className="border-b border-black font-bold">
                <th className="border-r border-black p-2 w-1/4">亟需改善之項目</th>
                <th className="border-r border-black p-2 w-2/4 text-red-500 underline underline-offset-2">改善教學及定期評量命題策略</th>
                <th className="p-2 w-1/4">實施年級</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2].map((row) => (
                <tr key={row} className="border-b border-black">
                  <td className="border-r border-black p-0">
                    <textarea className="w-full h-full p-2 min-h-[60px] resize-none focus:outline-none focus:bg-blue-50" placeholder="請輸入項目..."></textarea>
                  </td>
                  <td className="border-r border-black p-0">
                    <textarea className="w-full h-full p-2 min-h-[60px] resize-none focus:outline-none focus:bg-blue-50" placeholder="請輸入策略..."></textarea>
                  </td>
                  <td className="p-0">
                    <input type="text" className="w-full h-full p-2 text-center focus:outline-none focus:bg-blue-50" placeholder="例如: 高年級" />
                  </td>
                </tr>
              ))}
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
