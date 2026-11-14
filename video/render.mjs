// Renderiza composition.html cuadro por cuadro con Chrome y lo comprime con ffmpeg.
// El tiempo lo controla este script (no el reloj del navegador), así que ningún cuadro se pierde.
//
//   node render.mjs                     todas las versiones (es/en, wide/tall)
//   node render.mjs es wide             una sola versión
//   node render.mjs --still es wide 16  un cuadro de prueba en el segundo 16 (se guarda en STILLS o aquí)
//   node render.mjs --audio es          solo cambia la voz de los videos ya generados, sin volver a renderizar
//
// Si existe voz/narracion-{lang}.wav (se arma con voz/mezclar.mjs), el video lleva voz; si no, sale sin audio.
// Salidas en public/media/: manufactura-{lang}-{format}.webm, .mp4 y -poster.webp
// Requiere ffmpeg con libvpx-vp9, libx264 y libwebp. CHROME_PATH permite usar otro navegador.
import { spawn } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import puppeteer from 'puppeteer-core'

const HERE = dirname(fileURLToPath(import.meta.url))
const OUT = resolve(HERE, '../public/media')
const FPS = 30
const SIZES = { wide: [1280, 720], tall: [720, 900] } // en CSS; se capturan a 1.5x (1920x1080 y 1080x1350)
const POSTER_AT = 16 // segundo que se usa como imagen de portada
const COLOR = ['-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv']

const CHROME = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
].find((p) => p && existsSync(p))

// Entrada y códecs de la voz para cada contenedor; sin narración, el video va sin pista de audio.
function voice(lang) {
  const file = join(HERE, 'voz', `narracion-${lang}.wav`)
  if (!existsSync(file)) return { input: [], webm: ['-an'], mp4: ['-an'] }
  const map = ['-map', '0:v', '-map', '1:a', '-shortest']
  return { input: ['-i', file], webm: [...map, '-c:a', 'libopus', '-b:a', '64k'], mp4: [...map, '-c:a', 'aac', '-b:a', '96k'] }
}

// Pone la voz actual en los videos ya generados, copiando la imagen tal cual.
async function remux(lang, format) {
  const v = voice(lang)
  for (const ext of ['webm', 'mp4']) {
    const file = join(OUT, `manufactura-${lang}-${format}.${ext}`)
    const tmp = file.replace(`.${ext}`, `.tmp.${ext}`)
    await run(['-i', file, ...v.input, '-c:v', 'copy', ...v[ext], ...(ext === 'mp4' ? ['-movflags', '+faststart'] : []), tmp]).done
    // Copiar y borrar en vez de renombrar: en Windows falla si el servidor de desarrollo tiene el archivo abierto.
    copyFileSync(tmp, file)
    rmSync(tmp)
  }
  console.log(`manufactura-${lang}-${format}: voz actualizada`)
}

function run(args, stdin = false) {
  const child = spawn('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...args], { stdio: [stdin ? 'pipe' : 'ignore', 'inherit', 'inherit'] })
  const done = new Promise((ok, fail) => child.on('close', (code) => (code ? fail(new Error(`ffmpeg salió con ${code}`)) : ok())))
  return { child, done }
}

async function open(browser, lang, format) {
  const page = await browser.newPage()
  const [width, height] = SIZES[format]
  await page.setViewport({ width, height, deviceScaleFactor: 1.5 })
  await page.goto(`${pathToFileURL(join(HERE, 'composition.html'))}?lang=${lang}&format=${format}`)
  await page.waitForFunction('window.ready === true')
  return page
}

async function still(browser, lang, format, t) {
  const page = await open(browser, lang, format)
  await page.evaluate((s) => window.seek(s), t)
  const file = join(process.env.STILLS || HERE, `still-${lang}-${format}-${t}.jpg`)
  writeFileSync(file, Buffer.from(await page.screenshot({ type: 'jpeg', quality: 85 })))
  console.log(file)
  await page.close()
}

async function render(browser, lang, format) {
  const name = `manufactura-${lang}-${format}`
  const tmp = mkdtempSync(join(tmpdir(), 'dreambox-video-'))
  const master = join(tmp, 'master.mp4')
  const page = await open(browser, lang, format)
  const duration = await page.evaluate(() => window.duration)
  const frames = Math.round(duration * FPS)
  const cdp = await page.createCDPSession()
  const [width, height] = SIZES[format]
  // Sin scale, la captura directa sale a 1x aunque el viewport pida 1.5x.
  const clip = { x: 0, y: 0, width, height, scale: 1.5 }

  // Copia casi sin pérdida; de aquí salen los archivos finales. Los JPEG traen rango de color completo y el
  // decodificador por hardware de Chrome rechaza un VP9 así, por eso se convierte al estándar de video (BT.709).
  const { child, done } = run(
    ['-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-', '-vf', 'scale=in_range=pc:out_range=tv:out_color_matrix=bt709,format=yuv420p', ...COLOR, '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '10', master],
    true,
  )
  const started = Date.now()
  for (let i = 0; i < frames; i++) {
    await page.evaluate((s) => window.seek(s), i / FPS)
    const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 95, optimizeForSpeed: true, clip })
    if (!child.stdin.write(Buffer.from(data, 'base64'))) await new Promise((ok) => child.stdin.once('drain', ok))
    if (i % 150 === 0) console.log(`${name}: ${i}/${frames} (${Math.round((Date.now() - started) / 1000)} s)`)
  }
  child.stdin.end()
  await done
  await page.close()

  const v = voice(lang)
  await run(['-i', master, ...v.input, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '36', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '2', '-pix_fmt', 'yuv420p', ...COLOR, ...v.webm, join(OUT, `${name}.webm`)]).done
  await run(['-i', master, ...v.input, '-c:v', 'libx264', '-preset', 'slow', '-crf', '25', '-profile:v', 'high', '-level', '4.1', '-pix_fmt', 'yuv420p', ...COLOR, '-movflags', '+faststart', ...v.mp4, join(OUT, `${name}.mp4`)]).done
  await run(['-ss', String(POSTER_AT), '-i', master, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '78', join(OUT, `${name}-poster.webp`)]).done
  rmSync(tmp, { recursive: true, force: true })
  console.log(`${name}: listo`)
}

const args = process.argv.slice(2)
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--allow-file-access-from-files', '--force-color-profile=srgb'] })
try {
  if (args[0] === '--audio') {
    for (const format of ['wide', 'tall']) await remux(args[1], format)
  } else if (args[0] === '--still') {
    await still(browser, args[1], args[2], Number(args[3]))
  } else {
    mkdirSync(OUT, { recursive: true })
    const langs = args[0] ? [args[0]] : ['es', 'en']
    const formats = args[1] ? [args[1]] : ['wide', 'tall']
    for (const lang of langs) for (const format of formats) await render(browser, lang, format)
  }
} finally {
  await browser.close()
}
