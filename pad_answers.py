import json
import random

with open('src/referenceAnswers.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Clean existing
for k in data:
    for i in range(len(data[k])):
        item = data[k][i]
        if item.endswith("。"):
            item = item[:-1]
        for suffix in ["，以提升整體教學品質", "，精進數學領域教學成效", "，落實素養導向教學目標", "，強化學生數學理解力", "，活化課堂教學實務經驗", "，促進教師專業交流"]:
            item = item.replace(suffix, "")
        data[k][i] = item

paddings = {
    5: "，促成效。",
    6: "，提升成效。",
    7: "，精進教學品質。",
    8: "，落實素養導向。",
    9: "，建立扎實的基礎。",
    10: "，引發主動學習動機。",
    11: "，全面提升整體教學品質。",
    12: "，幫助學生穩固數學能力。",
    13: "，營造充滿樂趣的學習氛圍。",
    14: "，培養學生解決實際問題素養。",
    15: "，有效解決教學現場的各項困境。",
    16: "，結合親師力量共同打造優質環境。",
    17: "，期望能大幅降低學生對數學的恐懼。",
    18: "，透過系統化的引導讓孩子愛上學數學。",
    19: "，藉由多元豐富的活動設計激發學習潛能。",
    20: "，進一步帶動全校師生重視數學並熱情參與。",
    21: "，並將數學知識靈活應用於日常生活與校園中。",
    22: "，持續追蹤並改善學生的迷思概念與各項運算弱點。",
    23: "，透過橫向聯繫與資源整合建立穩健的校園支持網絡。",
    24: "，從校園情境與行政資源雙管齊下全面提升數學學力。",
    25: "，有效串聯各年級教學重點並建立完善的學習評估機制。",
    26: "，幫助每位孩子都能在充滿鼓勵的環境中穩健地進步成長。",
    27: "，藉此引導學生在具體操作中體會抽象的數學概念與邏輯思維。",
    28: "，讓第一線教育工作者能獲得最實用的支持並轉化為教學動能。",
    29: "，期望能翻轉傳統刻板印象並賦予數學課程更多元活潑的生命力。",
    30: "，透過循序漸進的引導與陪伴，讓所有學生都能找到適合的學習節奏。"
}

# If needed padding > 30, we can chain two.
random.seed(123)

for k in data:
    new_items = []
    for item in data[k]:
        target_len = random.randint(40, 50)
        missing = target_len - len(item)
        
        if missing < 5:
            # Force it to be at least 40 by adding a standard 10-char padding if missing is too small
            target_len = 45
            missing = target_len - len(item)
            
        pad_str = ""
        while missing > 30:
            part = random.randint(10, 20)
            pad_str += paddings[part][:-1] # remove period
            missing -= part - 1
            
        pad_str += paddings[missing]
        
        final_str = item + pad_str
        new_items.append(final_str)
    data[k] = new_items

with open('src/referenceAnswers.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

