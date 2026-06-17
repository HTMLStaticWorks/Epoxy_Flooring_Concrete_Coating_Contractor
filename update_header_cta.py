import os
import re

for filename in os.listdir('.'):
    if not filename.endswith('.html'):
        continue
        
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Remove login and sign up from nav links
    # Matches <li ... login.html ...>...</li> and <li ... register.html ...>...</li>
    # The login block might look like: <li class="nav-item ms-lg-2"><a class="nav-link" href="login.html"><i class="fas fa-user me-1"></i>Login</a></li><li class="nav-item"><a class="nav-link" href="register.html">Sign Up</a></li>
    
    new_content = re.sub(
        r'<li[^>]*>\s*<a[^>]*href="login\.html"[^>]*>.*?</a>\s*</li>\s*<li[^>]*>\s*<a[^>]*href="register\.html"[^>]*>.*?</a>\s*</li>',
        '',
        content,
        flags=re.DOTALL | re.IGNORECASE
    )

    # If login isn't right next to register, maybe they are separate:
    new_content = re.sub(r'<li[^>]*>\s*<a[^>]*href="login\.html"[^>]*>.*?</a>\s*</li>', '', new_content, flags=re.DOTALL | re.IGNORECASE)
    new_content = re.sub(r'<li[^>]*>\s*<a[^>]*href="register\.html"[^>]*>.*?</a>\s*</li>', '', new_content, flags=re.DOTALL | re.IGNORECASE)

    # 2. Put a primary CTA for signup in the header.
    # The header actions area usually contains:
    # <div class="header-actions ...">
    #   ...
    #   <a class="nav-link header-quote-btn ms-1" href="booking.html">...</a>
    # </div>
    # We will insert the Sign Up CTA right before the booking.html CTA, so they are both in the header actions block.
    # ONLY if it doesn't already have the register CTA in header-actions.
    if 'href="register.html"' not in new_content[new_content.find('header-actions'):new_content.find('header-actions')+500]:
        signup_cta = '<a class="nav-link header-quote-btn ms-1" href="register.html"><i class="fas fa-user-plus me-1"></i> Sign Up</a>\n'
        new_content = re.sub(
            r'(<a\s+class="nav-link\s+header-quote-btn\s+ms-1"\s+href="booking\.html">)',
            signup_cta + r'\1',
            new_content
        )

    if new_content != content:
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {filename}')
    else:
        print(f'No changes needed for {filename}')
