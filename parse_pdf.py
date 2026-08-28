import pdfplumber
import json
import re

pdf_path = "/Users/chiahua/.gemini/antigravity/brain/147558ff-4d95-470c-a7ba-1c1ac3d99437/.user_uploaded/media_1787923253721.pdf"

data = []

with pdfplumber.open(pdf_path) as pdf:
    for page in pdf.pages[:18]: # Pages 1 to 18
        tables = page.extract_tables()
        for table in tables:
            for row in table:
                if not row or not row[0]: continue
                col1 = row[0].replace('\n', '')
                col2 = row[1].replace('\n', '') if len(row) > 1 and row[1] else ''
                
                # Extract code and description
                match = re.match(r'\[([A-Z0-9-]+)\](.*)', col1)
                if match:
                    code = match.group(1).strip()
                    desc = match.group(2).strip()
                    data.append({
                        "code": code,
                        "description": desc,
                        "strategy": col2
                    })

with open('src/curriculum_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Extracted {len(data)} items")
