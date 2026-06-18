import re
import os

filepath = 'index.html'

with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Regular expression to remove the FEATURED PROJECTS section entirely
pattern = re.compile(r'<!-- ================================================================\s*FEATURED PROJECTS\s*================================================================ -->\s*<section class="bg-section" id="projects">.*?</section>\s*', re.DOTALL)

new_content, count = pattern.subn('', content)

if count > 0:
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f"Success: Removed {count} instance(s) of Featured Projects section.")
else:
    print("Error: Could not find the Featured Projects section to remove.")
