import urllib.request, json, re
urls = set()
for query in ['warehouse', 'garage', 'industrial', 'concrete', 'interior architecture']:
    req = urllib.request.Request(f'https://unsplash.com/napi/search/photos?query={query}&per_page=30', headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            for res in data['results']:
                urls.add(res['urls']['raw'].split('?')[0])
    except Exception as e:
        print(e)
urls = list(urls)
print(f'Found {len(urls)} unique images.')
with open('image_pool.txt', 'w') as f:
    for u in urls:
        f.write(u + '\n')

