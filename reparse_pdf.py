import pdfplumber
import json
import re

pdf_path = "/Users/chiahua/.gemini/antigravity/brain/147558ff-4d95-470c-a7ba-1c1ac3d99437/.user_uploaded/media_1787932607886.pdf"

data = []
current_theme = ""
current_sub_theme = ""

with pdfplumber.open(pdf_path) as pdf:
    for page in pdf.pages:
        tables = page.extract_tables()
        for table in tables:
            for row in table:
                if not row or len(row) < 4: continue
                
                # Sometimes theme/sub-theme are merged or empty if spanning multiple rows
                theme_val = (row[0] or "").replace('\n', '').strip()
                sub_theme_val = (row[1] or "").replace('\n', '').strip()
                col_item = (row[2] or "").replace('\n', '').strip()
                col_strategy = (row[3] or "").replace('\n', '').strip()
                
                if theme_val and theme_val != "主題":
                    current_theme = theme_val
                if sub_theme_val and sub_theme_val != "次主題":
                    current_sub_theme = sub_theme_val
                    
                match = re.match(r'\[([A-Z0-9-]+)\](.*)', col_item)
                if match:
                    code = match.group(1).strip()
                    desc = match.group(2).strip()
                    data.append({
                        "theme": current_theme,
                        "subTheme": current_sub_theme,
                        "code": code,
                        "description": desc,
                        "strategy": col_strategy
                    })

with open('src/curriculum_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print(f"Extracted {len(data)} items")
