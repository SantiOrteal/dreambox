// Arma la narración del video: corta cada frase de la toma de ElevenLabs en sus silencios y la coloca
// en el segundo de su escena. El resultado (narracion-{lang}.wav, 35 s) lo usa render.mjs.
//
//   node voz/mezclar.mjs es
//
// Si se cambia la toma, mide de nuevo los silencios (ffmpeg -af silencedetect=noise=-35dB:d=0.25) y ajusta CUTS.
import { spawnSync } from 'node:child_process'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const HERE = dirname(fileURLToPath(import.meta.url))
const DURATION = 35

// [inicio en la toma, fin en la toma, segundo en que entra en el video]
const TAKES = {
  es: {
    file: 'santiago-es.mp3',
    cuts: [
      [0.0, 3.6, 0.3], // La información de tu planta, repartida entre sistemas viejos.
      [4.0, 6.85, 4.5], // Una sola plataforma, instalada en tu planta.
      [7.18, 9.45, 8.6], // Cada módulo nace de un proceso real.
      [9.86, 13.22, 12.2], // En PPAP, cada número de parte tiene su expediente,
      [13.48, 16.0, 15.8], // y los documentos quedan listos para el cliente.
      [16.39, 19.7, 19.6], // En Herramental, todo se captura en piso, desde un kiosco.
      [20.0, 21.85, 23.8], // Cada acción queda en su historial.
      [22.18, 26.5, 26.9], // On-premise, por módulos y hecha para proveedores Tier 1 y 2.
      [26.8, 30.5, 31.3], // Más de diez años en el piso de producción. Agenda una demo.
    ],
  },
  en: {
    file: 'santiago-en.mp3',
    cuts: [
      [0.0, 3.65, 0.3], // Your plant's information, scattered across aging systems.
      [4.48, 7.05, 4.5], // One platform, installed at your plant.
      [7.6, 10.22, 8.6], // Every module comes from a real process.
      [10.85, 14.3, 12.2], // With PPAP, every part number has its own file,
      [14.4, 16.45, 15.8], // and documents are ready for the customer.
      [17.08, 20.85, 19.6], // With Tooling, everything is captured on the floor, from a kiosk.
      [21.42, 23.6, 23.8], // Every action stays in its history.
      [24.08, 28.3, 26.85], // On-premise, by module, and built for Tier 1 and 2 suppliers.
      [28.72, 31.65, 31.35], // Over ten years on the shop floor. Book a demo.
    ],
  },
}

const lang = process.argv[2] || 'es'
const take = TAKES[lang]
if (!take) throw new Error(`No hay toma para "${lang}"`)

for (const [i, [from, to, at]] of take.cuts.entries()) {
  const next = take.cuts[i + 1]
  if (at + to - from > (next ? next[2] : DURATION)) throw new Error(`La frase ${i + 1} no cabe antes de la siguiente`)
}

const parts = take.cuts.map(
  ([from, to, at], i) =>
    `[0:a]atrim=${from}:${to},asetpts=PTS-STARTPTS,afade=t=in:d=0.015,afade=t=out:st=${(to - from - 0.015).toFixed(3)}:d=0.015,adelay=${Math.round(at * 1000)}[p${i}]`,
)
const mix = `${take.cuts.map((_, i) => `[p${i}]`).join('')}amix=inputs=${take.cuts.length}:normalize=0,apad,atrim=0:${DURATION},loudnorm=I=-16:TP=-1.5:LRA=11[out]`
const out = join(HERE, `narracion-${lang}.wav`)
const { status } = spawnSync(
  'ffmpeg',
  ['-y', '-hide_banner', '-loglevel', 'error', '-i', join(HERE, take.file), '-filter_complex', [...parts, mix].join(';'), '-map', '[out]', '-ar', '48000', '-ac', '1', out],
  { stdio: 'inherit' },
)
if (status) process.exit(status)
console.log(out)
