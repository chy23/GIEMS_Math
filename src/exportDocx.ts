import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, BorderStyle, WidthType, AlignmentType } from "docx";
import { saveAs } from "file-saver";
import type { DimensionItem } from "./App";

export const exportToDocx = async (
  titleData: { district: string; school: string; academicYear: string; subject: string },
  sec1Items: DimensionItem[],
  sec2TableRows: { item: string; strategy: string; grade: string }[],
  sec3Text: string,
  sec4Text: string,
  sec5Text: string
) => {
  const { district, school, academicYear, subject } = titleData;

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: `新北市${district || '___'}區${school || '___'}國民小學${academicYear || '___'}學年度【${subject || '○○'}科能力檢測】結果分析及因應措施範例`,
                bold: true,
                size: 32,
              }),
            ],
            spacing: { after: 400 },
          }),
          
          new Paragraph({
            children: [
              new TextRun({ text: "一、【檢測結果分析】", bold: true, size: 28 }),
            ],
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: `可依【${subject || '○○'}科檢測評量向度與題目分類細目表】進行分析，例如：`, size: 24 }),
            ],
            spacing: { after: 200 },
          }),
          ...sec1Items.map((item, index) => {
            const statusText = item.status === 'higher' ? '高於' : item.status === 'similar' ? '接近' : item.status === 'lower' ? '低於' : '___';
            const suffix = item.status === 'higher' ? '表現良好' : item.status === 'similar' ? '保持穩定' : item.status === 'lower' ? '需稍加強' : '___';
            return new Paragraph({
              children: [
                new TextRun({ text: `${index + 1}. `, size: 24 }),
                new TextRun({ text: `(與全市學生作答答對率相比)本校學生${item.name === '整體' ? '整體' : `${item.name}向度`}通過率`, size: 24 }),
                new TextRun({ text: `${statusText}`, size: 24, bold: true }),
                new TextRun({ text: `市平均${item.id === 'overall' ? '。' : `，表示在${item.ability || '___'}的能力方面，${suffix}。`}`, size: 24 }),
              ],
              spacing: { after: 120 },
              indent: { left: 360 }
            });
          }),

          new Paragraph({
            children: [
              new TextRun({ text: "二、【改善教學及定期評量命題策略】", bold: true, size: 28 }),
            ],
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "--各校應參考國語文和數學、英語文檢測試題答案、命題架構與答對率分析等統計數據，分析各項能力指標，擬定具體教學目標，尋找合適教學素材，並設計適當教學策略與方法，進一步作為改善學生定期學習評量之命題(例如：於高年級國語文和數學定期評量紙筆測驗增加多元題型之命題型式)。", size: 20 }),
            ],
            spacing: { after: 200 },
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            borders: {
              top: { style: BorderStyle.SINGLE, size: 1 },
              bottom: { style: BorderStyle.SINGLE, size: 1 },
              left: { style: BorderStyle.SINGLE, size: 1 },
              right: { style: BorderStyle.SINGLE, size: 1 },
              insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
              insideVertical: { style: BorderStyle.SINGLE, size: 1 },
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: "亟需改善之項目", alignment: AlignmentType.CENTER })] }),
                  new TableCell({ children: [new Paragraph({ text: "改善教學及定期評量命題策略", alignment: AlignmentType.CENTER })] }),
                  new TableCell({ children: [new Paragraph({ text: "實施年級", alignment: AlignmentType.CENTER })] }),
                ],
              }),
              ...sec2TableRows.map(row => (
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph({ text: row.item })] }),
                    new TableCell({ children: [new Paragraph({ text: row.strategy })] }),
                    new TableCell({ children: [new Paragraph({ text: row.grade, alignment: AlignmentType.CENTER })] }),
                  ],
                })
              ))
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({ text: "三、【教師增能規劃】", bold: true, size: 28 }),
            ],
            spacing: { before: 400, after: 200 },
          }),
          ...sec3Text.split('\n').map(line => new Paragraph({ children: [new TextRun({ text: line, size: 24 })], spacing: { after: 120 } })),

          new Paragraph({
            children: [
              new TextRun({ text: "四、【學習扶助教學規劃】", bold: true, size: 28 }),
            ],
            spacing: { before: 400, after: 200 },
          }),
          ...sec4Text.split('\n').map(line => new Paragraph({ children: [new TextRun({ text: line, size: 24 })], spacing: { after: 120 } })),

          new Paragraph({
            children: [
              new TextRun({ text: "五、其他因應措施", bold: true, size: 28 }),
            ],
            spacing: { before: 400, after: 200 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "--各校視需要自行撰寫", size: 20 }),
            ],
            spacing: { after: 200 },
          }),
          ...sec5Text.split('\n').map(line => new Paragraph({ children: [new TextRun({ text: line, size: 24 })], spacing: { after: 120 } })),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, "檢測結果分析及因應措施.docx");
};
