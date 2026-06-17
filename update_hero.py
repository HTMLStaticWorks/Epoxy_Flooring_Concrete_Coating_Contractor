import os
import re

mapping = {
    'index.html': 'assets/img/hero/index_hero.png',
    'home-2.html': 'assets/img/hero/home2_hero.png',
    'about.html': 'assets/img/hero/about_hero.png',
    'services.html': 'assets/img/hero/services_hero.png',
    'service-details.html': 'assets/img/hero/service_details_hero.png',
    'gallery.html': 'assets/img/hero/gallery_hero.png',
    'pricing.html': 'https://images.unsplash.com/photo-1541888062-8176512803b8?w=1920&q=80&fit=crop',
    'blog.html': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80&fit=crop',
    'blog-details.html': 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1920&q=80&fit=crop',
    'booking.html': 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80&fit=crop',
    'contact.html': 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&fit=crop',
    '404.html': 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1920&q=80&fit=crop',
    'coming-soon.html': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=80&fit=crop'
}

for filename, img_url in mapping.items():
    if not os.path.exists(filename):
        continue
    
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the hero div and update its background-image
    # Usually it's: style="background-image:url('...');"
    # We will use re.sub with a function to only replace if it's the first one, or we can just replace the first occurrence
    # We'll search for <div class="page-hero" ... > or <div class="hero-bg-image" ... >
    
    def replacer(match):
        return f'{match.group(1)}\'{img_url}\'{match.group(2)}'

    if 'index.html' in filename:
        new_content = re.sub(r'(class="hero-bg-image" style="background-image:url\()[\'\"]?.*?[\'\"]?(\))', replacer, content, count=1)
    else:
        new_content = re.sub(r'(class="page-hero" style="background-image:url\()[\'\"]?.*?[\'\"]?(\))', replacer, content, count=1)

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_content)
    print(f'Updated {filename} with {img_url}')
