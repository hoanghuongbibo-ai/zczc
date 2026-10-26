// Render a thumbnail page to PNG (+ a 1280x720 JPG beside it):
//   node thumbnails/render.mjs thumbnails/venice/b-reflection.html
import { createRequire } from 'module';
import { execFileSync } from 'child_process';
import path from 'path';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const page = path.resolve(process.argv[2]), out = process.argv[3] || page.replace(/\.html$/, '.png');
const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
p.on('pageerror', e => console.log('ERR', e.message));
await p.goto('file://' + page);
await p.waitForFunction(() => window.DONE === true, null, { timeout: 15000 });
await p.locator('canvas').screenshot({ path: out });
await b.close();
execFileSync('python3', ['-c', `from PIL import Image; Image.open('${out}').convert('RGB').resize((1280,720),Image.LANCZOS).save('${out.replace(/\.png$/, '-1280.jpg')}',quality=92)`]);
console.log(out);
