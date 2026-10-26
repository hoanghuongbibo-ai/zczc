"""Search Wikimedia Commons for a photo/clip and fetch only public-domain or CC BY files, with credits.

usage:
  python3 tools/commons.py search "Last Spike Craigellachie" [--video] [-n 10]   # list candidates and their licences
  python3 tools/commons.py get "File:The Last Spike.jpg" canada/assets/img last-spike [--width 1600]
`get` refuses anything that is not PD/CC0 or CC BY (no BY-SA, NC, ND), saves <dir>/<slug>.<ext> and appends the credit to <dir>/CREDITS.md.
"""
import json, re, sys, urllib.parse, urllib.request, html, os
API = 'https://commons.wikimedia.org/w/api.php'
UA = {'User-Agent': 'houdini-video-tools/1.0 (educational history videos)'}

def api(**p):
    p.update(format='json', formatversion=2)
    with urllib.request.urlopen(urllib.request.Request(API + '?' + urllib.parse.urlencode(p), headers=UA), timeout=30) as r:
        return json.load(r)

def strip(s): return html.unescape(re.sub(r'<[^>]+>', '', s or '')).strip()

def licence_ok(meta):
    lic = (meta.get('LicenseShortName', {}).get('value') or '').strip(); low = lic.lower()
    if any(k in low for k in ('-sa', ' sa', 'share', 'nc', '-nd', ' nd', 'fair use', 'gfdl')): return False, lic
    if low.startswith(('public domain', 'pd', 'cc0', 'no restrictions')) or low.startswith('cc by ') or low.startswith('cc-by-') or low == 'cc by': return True, lic
    return False, lic

def info(titles, width=1600):
    d = api(action='query', titles='|'.join(titles), prop='imageinfo', iiprop='url|extmetadata|mime|size', iiurlwidth=width)
    return d['query']['pages']

def search(q, video=False, n=10):
    term = q + (' filetype:video' if video else ' filetype:bitmap')
    hits = api(action='query', list='search', srsearch=term, srnamespace=6, srlimit=n)['query']['search']
    if not hits: print('no results'); return
    for p in info([h['title'] for h in hits]):
        ii = (p.get('imageinfo') or [{}])[0]; m = ii.get('extmetadata', {}); ok, lic = licence_ok(m)
        print(('OK  ' if ok else 'NO  ') + f"{p['title']}  [{lic}]  {ii.get('width')}x{ii.get('height')}  by {strip(m.get('Artist', {}).get('value'))[:60]}")

def get(title, outdir, slug, width=1600):
    p = info([title], width)[0]; ii = p['imageinfo'][0]; m = ii['extmetadata']; ok, lic = licence_ok(m)
    if not ok: sys.exit(f'refused: {title} is licensed "{lic}" — only public domain or CC BY files may be used')
    url = ii.get('thumburl') or ii['url']; ext = os.path.splitext(urllib.parse.urlparse(url).path)[1].lower() or '.jpg'
    os.makedirs(outdir, exist_ok=True); dest = os.path.join(outdir, slug + ext)
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=60) as r, open(dest, 'wb') as f: f.write(r.read())
    author = strip(m.get('Artist', {}).get('value')) or 'unknown'; desc = ii.get('descriptionurl') or f"https://commons.wikimedia.org/wiki/{urllib.parse.quote(title.replace(' ', '_'))}"
    line = f"- **{slug}{ext}**: \"{title[5:] if title.startswith('File:') else title}\" by {author}, {lic}, via Wikimedia Commons: {desc}\n"
    cred = os.path.join(outdir, 'CREDITS.md'); new = not os.path.exists(cred)
    with open(cred, 'a') as f:
        if new: f.write('# Image credits (Wikimedia Commons; public domain or CC BY only)\n\n')
        f.write(line)
    print('saved', dest); print(line.strip())

if __name__ == '__main__':
    a = sys.argv[1:]
    if not a: sys.exit(__doc__)
    if a[0] == 'search': search(a[1], '--video' in a, int(a[a.index('-n') + 1]) if '-n' in a else 10)
    elif a[0] == 'get': get(a[1], a[2], a[3], int(a[a.index('--width') + 1]) if '--width' in a else 1600)
    else: sys.exit(__doc__)
