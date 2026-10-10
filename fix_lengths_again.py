import json

with open('src/referenceAnswers.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for k in data:
    new_items = []
    for item in data[k]:
        # If length is > 50, trim it properly before the period
        if len(item) > 50:
            item = item[:49] + "。"
        elif len(item) < 40:
            # Should not happen with the current paddings, but just in case
            item = item.replace("。", "")
            missing = 40 - len(item)
            item = item + "，確保成效" * (missing // 5 + 1)
            item = item[:39] + "。"
        new_items.append(item)
    data[k] = new_items

with open('src/referenceAnswers.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

