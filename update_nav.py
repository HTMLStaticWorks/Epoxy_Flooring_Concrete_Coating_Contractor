import os
import re

for filename in os.listdir('.'):
    if not filename.endswith('.html'):
        continue
        
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    def replacer(match):
        li_start = match.group(1)
        a_class = match.group(2)
        
        # If we are in home-2.html, the Home 2 link should be active!
        if filename == 'home-2.html':
            # ensure 'active' is not in Home 1's class if we are in home-2
            a_class_no_active = a_class.replace('active', '').strip()
            # if a_class_no_active becomes empty, keep the class attribute but empty, or just 'nav-link'
            if not a_class_no_active:
                a_class_no_active = 'nav-link'
            return f'{li_start}<a class="{a_class_no_active}" href="index.html">Home 1</a></li>\n<li class="nav-item"><a class="nav-link active" href="home-2.html">Home 2</a></li>'
        else:
            # Home 1 keeps its current classes (which might be active for index.html)
            return f'{li_start}<a class="{a_class}" href="index.html">Home 1</a></li>\n<li class="nav-item"><a class="nav-link" href="home-2.html">Home 2</a></li>'

    # Pattern: match <li class="nav-item"><a class="..." href="index.html">Home</a></li>
    new_content = re.sub(
        r'(<li[^>]*>)\s*<a\s+class="([^"]*)"\s+href="index\.html">\s*Home\s*</a>\s*</li>',
        replacer,
        content
    )
    
    if new_content != content:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated nav bar in {filename}')
    else:
        print(f'No match found in {filename}')
