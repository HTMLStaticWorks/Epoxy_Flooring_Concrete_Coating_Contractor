import urllib.request, re, urllib.parse
urls = set()
for query in ['epoxy+floor+unsplash', 'warehouse+interior+unsplash', 'garage+floor+unsplash', 'concrete+texture+unsplash', 'industrial+interior+unsplash']:
    req = urllib.request.Request(f'https://html.duckduckgo.com/html/?q={query}', headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            # Extract URLs from duckduckgo search results
            for m in re.findall(r'unsplash\.com/photos/([a-zA-Z0-9\-]+)', html):
                urls.add(f'https://images.unsplash.com/photo-{m}')
            for m in re.findall(r'https://images\.unsplash\.com/photo-[a-zA-Z0-9\-]+', html):
                urls.add(m)
    except Exception as e:
        print(query, e)

print(f'Found {len(urls)} unique images.')
with open('image_pool.txt', 'w') as f:
    for u in list(urls):
        f.write(u + '\n')

