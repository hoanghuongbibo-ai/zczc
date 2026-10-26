// Render thumbnail.html to PNG: node render.mjs [out.png]
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
let chromium; try { ({ chromium } = require('playwright')); } catch { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
import { fileURLToPath } from 'url';
import path from 'path';
const dir = path.dirname(fileURLToPath(import.meta.url));
const out = process.argv[2] || path.join(dir, 'venice-thumbnail.png');
const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
p.on('pageerror', e => console.log('ERR', e.message));
await p.goto('file://' + path.join(dir, 'thumbnail.html'));
await p.waitForFunction(() => window.DONE === true, null, { timeout: 15000 });
await p.locator('canvas').screenshot({ path: out });
await b.close();
console.log(out);
