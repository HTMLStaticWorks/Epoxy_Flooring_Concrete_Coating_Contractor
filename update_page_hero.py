import re

with open(r'assets\css\style.css', 'r', encoding='utf-8') as f:
    content = f.read()

target = """.page-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.18;
  z-index: 0;
}"""

replacement = """.page-hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 100%);
  z-index: 0;
}"""

if target in content:
    new_content = content.replace(target, replacement)
    with open(r'assets\css\style.css', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Updated .page-hero::before")
else:
    print("Could not find exact target for .page-hero::before")
