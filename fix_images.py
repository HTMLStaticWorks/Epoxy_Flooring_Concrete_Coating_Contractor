import glob, re, random
from urllib.parse import urlparse

# Get all HTML files
files = glob.glob('*.html')

# Find all unique image URLs
img_regex = re.compile(r'(?:src|data-lightbox)=[\'"](https://(?:images\.unsplash\.com|images\.pexels\.com)[^\'"]+)[\'"]')
pool = set()
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        for match in img_regex.findall(file.read()):
            # strip query params to get base url, but keep them for Pexels if they don't have query params
            base = match.split('?')[0]
            pool.add(base)

pool = list(pool)
pool.sort() # Ensure consistent order before shuffling
print(f'Found {len(pool)} unique premium images.')

# For each file, shuffle the pool and replace images
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # We will find all matches in the file, and replace them one by one
    matches = img_regex.findall(content)
    if not matches:
        continue
        
    local_pool = pool[:]
    random.seed(f) # seed by filename so it's reproducible
    random.shuffle(local_pool)
    
    def replacer(m):
        full_match = m.group(0)
        old_url = m.group(2)
        # get next image from local_pool
        next_img = local_pool.pop(0)
        local_pool.append(next_img) # put it at the end to wrap around
        
        # Add query params back for Unsplash for proper sizing if it was unsplash
        new_url = next_img
        if 'unsplash.com' in next_img:
            # check if old url had size params, if so try to maintain them
            if '?' in old_url:
                new_url = next_img + '?' + old_url.split('?')[1]
            else:
                new_url = next_img + '?w=800&q=80&fit=crop'
        
        return full_match.replace(old_url, new_url)

    full_regex = re.compile(r'((?:src|data-lightbox)=[\'"])(https://(?:images\.unsplash\.com|images\.pexels\.com)[^\'"]+)([\'"])')
    
    new_content = full_regex.sub(replacer, content)
    
    with open(f, 'w', encoding='utf-8') as file:
        file.write(new_content)
    
    print(f'Updated {len(matches)} images in {f}')
