import urllib.request, re
urls = set()
for query in ['warehouse', 'garage', 'industrial-floor', 'concrete-texture', 'epoxy']:
    req = urllib.request.Request(f'https://unsplash.com/s/photos/{query}', headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
    try:
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            matches = re.findall(r'https://images\.unsplash\.com/photo-[0-9a-zA-Z\-]+', html)
            for m in matches:
                urls.add(m)
    except Exception as e:
        print(query, e)
urls = list(urls)
print(f'Found {len(urls)} unique images.')
with open('image_pool.txt', 'w') as f:
    for u in urls:
        f.write(u + '\n')

