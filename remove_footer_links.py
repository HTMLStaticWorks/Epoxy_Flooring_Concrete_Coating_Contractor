import os
import re

for filename in os.listdir('.'):
    if not filename.endswith('.html'):
        continue
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find and remove <div class="footer-bottom-links">...</div>
    new_content = re.sub(
        r'<div\s+class="footer-bottom-links">.*?</div>',
        '',
        content,
        flags=re.DOTALL | re.IGNORECASE
    )

    if new_content != content:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Removed footer-bottom-links from {filename}')
    else:
        print(f'No match in {filename}')
