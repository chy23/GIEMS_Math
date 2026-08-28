import json
import re

data = []
current_code = None
current_desc = []
current_remark = []

with open('raw_text.txt', 'r', encoding='utf-8') as f:
    text = f.read()

# pypdf output has text. We need to find codes like N-1-1, S-1-2
# The pattern is usually: (N|S|G|R|A|F|D)-[1-6]-[1-9][0-9]?
pattern = re.compile(r'^([A-Z]-[1-6]-\d+)', re.MULTILINE)

# Split by codes
matches = list(pattern.finditer(text))
for i in range(len(matches)):
    code = matches[i].group(1)
    start_pos = matches[i].end()
    end_pos = matches[i+1].start() if i+1 < len(matches) else len(text)
    
    segment = text[start_pos:end_pos].strip()
    
    # Heuristic: the segment contains Description, Remark, Reference tools, Learning performance.
    # Learning performance is usually like n-I-1, s-II-2 at the end.
    perf_pattern = re.search(r'[a-z]-[I|V]+-\d+', segment)
    if perf_pattern:
        segment = segment[:perf_pattern.start()]
    
    # We just grab the whole segment as description for now.
    desc = segment.replace('\n', '')
    
    data.append({
        'code': code,
        'description': desc,
        'remark': ''
    })

with open('src/curriculum_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Extracted {len(data)} items.")
