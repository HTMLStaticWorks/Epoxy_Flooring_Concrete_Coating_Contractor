import glob, re, collections
from urllib.parse import urlparse

files = glob.glob('*.html')
img_regex = re.compile(r'(?:src|data-lightbox)=\"([^\"]+)\"')
urls = []
for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
        for match in img_regex.findall(content):
            if 'unsplash.com' in match or 'pexels.com' in match:
                urls.append((f, match))

counts = collections.defaultdict(list)
for f, url in urls:
    base_url = url.split('?')[0]
    counts[base_url].append(f)

for base_url, files_used in counts.items():
    print(f'{base_url}: {len(files_used)} times in {len(set(files_used))} files')

