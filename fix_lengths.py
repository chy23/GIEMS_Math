import json

with open('src/referenceAnswers.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

suffixes = [
    "，以提升整體教學品質。",
    "，強化學生數學理解力。",
    "，落實素養導向教學目標。",
    "，促進教師專業交流互動。",
    "，活化課堂教學實務經驗。",
    "，精進數學領域教學成效。"
]

import random
random.seed(42)

for key, items in data.items():
    new_items = []
    for item in items:
        if len(item) < 20:
            # Remove trailing punctuation if it exists before appending
            if item.endswith("。") or item.endswith("！"):
                item = item[:-1]
            suffix = random.choice(suffixes)
            item = item + suffix
            if len(item) > 40:
                item = item[:39] + "。" # just in case, but suffix is ~11 chars, 19+11 = 30
        new_items.append(item)
    data[key] = new_items

with open('src/referenceAnswers.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

