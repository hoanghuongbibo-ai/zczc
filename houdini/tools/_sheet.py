# python3 tools/_sheet.py <dir> <prefix-out> [cols rows] — contact sheets of the stills in dir
import sys, glob
from PIL import Image, ImageDraw
d, out = sys.argv[1], sys.argv[2]; cols, rows = (int(sys.argv[3]), int(sys.argv[4])) if len(sys.argv) > 4 else (4, 4)
fs = sorted(glob.glob(d + '/s*.jpg') + glob.glob(d + '/s*.png')); n = cols * rows
for k in range(0, len(fs), n):
    s = Image.new('RGB', (cols * 480, rows * 270)); dr = ImageDraw.Draw(s)
    for i, f in enumerate(fs[k:k + n]): s.paste(Image.open(f).convert('RGB').resize((480, 270)), ((i % cols) * 480, (i // cols) * 270)); dr.text(((i % cols) * 480 + 6, (i // cols) * 270 + 252), f.split('/')[-1], fill=(255, 0, 0))
    s.save(f'{out}_{k // n:02d}.png')
print(len(fs))
