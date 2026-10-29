// Parallel exporter for dynasty/ pages: N browser pages render interleaved frame ranges at once, then ffmpeg muxes
// the frames with the narration (from Show.narrationOffset, default 0) and the synthesised soundtrack.
// usage (from the repo root): node dynasty/tools/export.mjs dynasty/<page>.html dynasty/out/<name>.mp4 [fps=30] [workers=4]
import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const [pageArg, outArg, fpsArg = '30', workersArg = '4'] = process.argv.slice(2);
const fps = +fpsArg, workers = +workersArg, root = process.cwd();
const pageFile = path.resolve(root, pageArg), out = path.resolve(root, outArg);
const tmp = fs.mkdtempSync(path.join(process.env.TMPDIR || '/tmp', 'dyn-'));
fs.mkdirSync(path.dirname(out), { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || '/opt/pw-browsers/chromium', args: ['--allow-file-access-from-files'] });
async function open() {
  const p = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(pathToFileURL(pageFile).href + '?t=0');
  await p.waitForFunction(() => window.READY === true, null, { timeout: 60000 });
  if (errs.length) throw new Error(errs.join('\n'));
  return p;
}
const pages = await Promise.all(Array.from({ length: workers }, open));
const info = await pages[0].evaluate(() => ({ duration: Show.duration, narration: Show.narration, offset: Show.narrationOffset || 0 }));
const frames = Math.round(info.duration * fps), t0 = Date.now();
let done = 0;
await Promise.all(pages.map(async (p, w) => {
  for (let f = w; f < frames; f += workers) {
    const b64 = await p.evaluate(t => { window.renderAt(t); return document.getElementById('stage').toDataURL('image/jpeg', .93).split(',')[1]; }, f / fps);
    fs.writeFileSync(path.join(tmp, `f${String(f).padStart(6, '0')}.jpg`), Buffer.from(b64, 'base64'));
    if (++done % 300 === 0) console.log(`frame ${done}/${frames}  ${((Date.now() - t0) / 1000).toFixed(0)}s`);
  }
}));
const pcm = Buffer.from(await pages[0].evaluate(() => window.renderSoundtrack()), 'base64');
fs.writeFileSync(path.join(tmp, 'music.raw'), pcm);
await browser.close();

const narr = path.resolve(path.dirname(pageFile), info.narration);
execFileSync('ffmpeg', ['-y', '-loglevel', 'error',
  '-framerate', String(fps), '-i', path.join(tmp, 'f%06d.jpg'),
  '-f', 's16le', '-ar', '44100', '-ac', '1', '-i', path.join(tmp, 'music.raw'),
  '-ss', String(info.offset), '-t', String(info.duration), '-i', narr,
  '-filter_complex', '[1:a][2:a]amix=inputs=2:duration=first:normalize=0,volume=-1.5dB,alimiter=limit=0.84:level=false[a]',
  '-map', '0:v', '-map', '[a]', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-preset', 'medium', '-c:a', 'aac', '-b:a', '160k',
  '-t', String(info.duration), out], { stdio: 'inherit' });
fs.rmSync(tmp, { recursive: true, force: true });
console.log('wrote', path.relative(root, out), `${frames} frames in ${((Date.now() - t0) / 1000).toFixed(0)}s`);
