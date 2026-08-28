from pypdf import PdfReader
import json
import re

reader = PdfReader("/Users/chiahua/.gemini/antigravity/brain/147558ff-4d95-470c-a7ba-1c1ac3d99437/.user_uploaded/media_1787919567399.pdf")
text = ""
for page in reader.pages:
    text += page.extract_text() + "\n"

# The text contains lines like "N-1-1" followed by description.
# Let's save the raw text to a file first so we can examine it.
with open("raw_text.txt", "w", encoding="utf-8") as f:
    f.write(text)

