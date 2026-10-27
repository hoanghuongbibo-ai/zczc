// Parallel exporter: N headless Chromium workers each render a slice of frames and stream JPEGs into their own
// ffmpeg (x264); the slices are concatenated and muxed with the page's soundtrack + the narration.
// usage: node tools/export-par.mjs <page.html> <out.mp4> <fps> <workers> <narration.mp3>   (paths relative to houdini/)
// HIRES=1.5 in the environment renders natively at 1920×1080 (js/hires.js)
import { chromium } from 'playwright';
import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const [page_, out, fpsA = '30', nA = '4', narr, segArg] = process.argv.slice(2);
const fps = +fpsA, N = +nA, exe = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const tmp = path.join(path.dirname(path.resolve(root, out)), '.parts'); fs.mkdirSync(tmp, { recursive: true });
async function openPage() { const b = await chromium.launch({ executablePath: exe, args: ['--allow-file-access-from-files'] }); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
  await p.goto(pathToFileURL(path.join(root, page_)).href + '?t=0' + (process.env.HIRES ? '&k=' + process.env.HIRES : '')); await p.waitForFunction(() => window.READY === true, null, { timeout: 120000 }); return [b, p]; }
if (segArg != null) {   // worker
  const [i0, i1, k] = segArg.split(':').map(Number);
  const [b, p] = await openPage();
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '21', '-pix_fmt', 'yuv420p', '-r', String(fps), path.join(tmp, `seg${k}.mp4`)], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = i0; f < i1; f++) {
    const b64 = await p.evaluate(t => { window.renderAt(t); return document.getElementById('stage').toDataURL('image/jpeg', .93).split(',')[1]; }, f / fps);
    if (!ff.stdin.write(Buffer.from(b64, 'base64'))) await new Promise(r => ff.stdin.once('drain', r));
    if ((f - i0) % 300 === 0) console.log(`[w${k}] ${f - i0}/${i1 - i0}`);
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); await b.close(); process.exit(0);
}
const [b, p] = await openPage();
const duration = await p.evaluate(() => window.Show.duration), frames = Math.round(duration * fps);
const pcm = Buffer.from(await p.evaluate(() => window.renderSoundtrack()), 'base64'); fs.writeFileSync(path.join(tmp, 'music.raw'), pcm); await b.close();
console.log('soundtrack ok;', frames, 'frames,', N, 'workers');
const per = Math.ceil(frames / N), kids = [];
for (let k = 0; k < N; k++) { const i0 = k * per, i1 = Math.min(frames, i0 + per); kids.push(new Promise((res, rej) => { const c = spawn('node', [fileURLToPath(import.meta.url), page_, out, fpsA, nA, narr || '', `${i0}:${i1}:${k}`], { stdio: 'inherit' }); c.on('close', code => code ? rej(new Error('worker ' + k + ' failed')) : res()); })); }
await Promise.all(kids);
fs.writeFileSync(path.join(tmp, 'list.txt'), Array.from({ length: N }, (_, k) => `file 'seg${k}.mp4'`).join('\n'));
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', path.join(tmp, 'list.txt'), '-c', 'copy', path.join(tmp, 'video.mp4')], { stdio: 'inherit' });
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(tmp, 'video.mp4'), '-f', 's16le', '-ar', '44100', '-ac', '1', '-i', path.join(tmp, 'music.raw'), '-i', path.join(root, narr),
  '-filter_complex', '[1:a]volume=1.0[m];[2:a]volume=1.0[v];[m][v]amix=inputs=2:duration=longest:normalize=0,alimiter=limit=0.84:level=false[a]',
  '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-t', String(duration), path.resolve(root, out)], { stdio: 'inherit' });
console.log('wrote', out);
