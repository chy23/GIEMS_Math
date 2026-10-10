import json

with open('src/referenceAnswers.json', 'r') as f:
    data = json.load(f)

for key, items in data.items():
    for item in items:
        if not (20 <= len(item) <= 40):
            print(f"{key} {len(item)}: {item}")
