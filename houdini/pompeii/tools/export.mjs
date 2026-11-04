// Parallel exporter for the Pompeii video: N headless pages each render a frame range and pipe JPEG frames
// straight into their own ffmpeg (no PNGs on disk); the score + foley is synthesised in Node; then concat + mux.
// usage (from houdini/): node pompeii/tools/export.mjs pompeii/index.html pompeii/out/pompeii.mp4 [fps=30] [workers=3] [from] [to]
import { chromium } from 'playwright';
import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { pathToFileURL } from 'node:url';

const [pageArg = 'pompeii/index.html', out = 'pompeii/out/pompeii.mp4', fpsArg = '30', wArg = '3', fromArg, toArg] = process.argv.slice(2);
const fps = +fpsArg, workers = +wArg, pagePath = path.resolve(pageArg), dir = path.dirname(pagePath);
const tmp = fs.mkdtempSync(path.join(process.env.TMPDIR || '/tmp', 'pomp-'));
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined, args: ['--allow-file-access-from-files'] });
const open = async () => { const p = await browser.newPage({ viewport: { width: 1280, height: 720 } }); p.on('pageerror', e => console.error('pageerror', e.message)); await p.goto(pathToFileURL(pagePath).href + '?t=0'); await p.waitForFunction(() => window.READY === true, null, { timeout: 120000 }); return p; };
const first = await open();
const info = await first.evaluate(() => ({ duration: Show.duration, narration: Show.narration, sfx: Show.sfx, moods: Show.moods }));
const t0 = fromArg ? +fromArg : 0, t1 = toArg ? +toArg : info.duration;
const f0 = Math.round(t0 * fps), f1 = Math.round(t1 * fps), total = f1 - f0, per = Math.ceil(total / workers);
console.log(`rendering ${total} frames (${t0}-${t1}s) with ${workers} workers`);
const pages = [first]; for (let i = 1; i < workers; i++) pages.push(await open());
let done = 0; const start = Date.now();
await Promise.all(pages.map(async (p, w) => {
  const a = f0 + w * per, b = Math.min(f1, a + per); if (a >= b) return;
  const seg = path.join(tmp, `seg${w}.mp4`);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '21', '-pix_fmt', 'yuv420p', '-threads', '1', seg], { stdio: ['pipe', 'inherit', 'inherit'] });
  const closed = new Promise(r => ff.on('close', r));
  for (let f = a; f < b; f++) {
    const b64 = await p.evaluate(t => { window.renderAt(t); return document.getElementById('stage').toDataURL('image/jpeg', .93).split(',')[1]; }, f / fps);
    if (!ff.stdin.write(Buffer.from(b64, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if (++done % 900 === 0) { const el = (Date.now() - start) / 1000; console.log(`frame ${done}/${total}  ${el.toFixed(0)}s  eta ${(el / done * (total - done) / 60).toFixed(1)} min`); }
  }
  ff.stdin.end(); await closed;
}));
await browser.close();

// soundtrack in Node
const ctx = { console, Math, Float32Array, Int16Array }; ctx.globalThis = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(dir, 'js/psound.js'), 'utf8'), ctx);
const buf = ctx.PSound.render({ duration: info.duration, sfx: info.sfx, moods: info.moods });
const i16 = new Int16Array(buf.length); for (let i = 0; i < buf.length; i++) i16[i] = Math.max(-1, Math.min(1, buf[i])) * 32767;
fs.writeFileSync(path.join(tmp, 'music.raw'), Buffer.from(i16.buffer));

const segs = pages.map((_, w) => path.join(tmp, `seg${w}.mp4`)).filter(f => fs.existsSync(f));
fs.writeFileSync(path.join(tmp, 'list.txt'), segs.map(s => `file '${s}'`).join('\n'));
fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', path.join(tmp, 'list.txt'),
  '-ss', String(t0), '-f', 's16le', '-ar', '44100', '-ac', '1', '-i', path.join(tmp, 'music.raw'),
  '-ss', String(t0), '-i', path.join(dir, info.narration),
  '-filter_complex', '[1:a][2:a]amix=inputs=2:duration=first:normalize=0,volume=-1.5dB,alimiter=limit=0.84:level=false[a]',
  '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '160k', '-t', String(t1 - t0), '-movflags', '+faststart', path.resolve(out)], { stdio: 'inherit' });
fs.rmSync(tmp, { recursive: true, force: true });
console.log('wrote', out, ((Date.now() - start) / 60000).toFixed(1), 'min');
