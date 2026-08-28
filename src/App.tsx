import React, { useState } from 'react';

function App() {
  const [district, setDistrict] = useState('');
  const [school, setSchool] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [subject, setSubject] = useState('');

  const [highPassQs, setHighPassQs] = useState('');
  const [goodAbilities, setGoodAbilities] = useState('');
  const [lowPassQs, setLowPassQs] = useState('');
  const [needsImprovementAbilities, setNeedsImprovementAbilities] = useState('');

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
                (與全市學生作答答對率相比)本校學生第
                <input 
                  type="text" 
                  className="border-b-2 border-gray-400 mx-2 w-32 text-center focus:outline-none focus:border-blue-500" 
                  value={highPassQs}
                  onChange={(e) => setHighPassQs(e.target.value)}
                  placeholder="題號"
                />
                題通過率較高，表示在
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
                (與全市學生作答答對率相比)本校學生第
                <input 
                  type="text" 
                  className="border-b-2 border-gray-400 mx-2 w-32 text-center focus:outline-none focus:border-blue-500" 
                  value={lowPassQs}
                  onChange={(e) => setLowPassQs(e.target.value)}
                  placeholder="題號"
                />
                題通過率較低，表示在
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

      </div>
    </div>
  );
}

export default App;
