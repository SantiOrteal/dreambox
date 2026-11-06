import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Play, RotateCcw } from 'lucide-react'
import { useT } from '../../i18n'
import { preselectService } from '../../lib/contactIntent'

// Registra en Analytics quién lo reproduce y quién llega al final (solo si el visitante aceptó las cookies).
const track = (action) => window.gtag?.('event', 'video_manufactura', { action })

// Video de Dreambox Manufacturing (se genera con video/render.mjs). Antes de pulsar "reproducir" solo se
// descarga la portada, así que no afecta la velocidad de la página. Al terminar ofrece agendar la demo.
//
// Para comparar la página sin el video: agrega ?video=off a la dirección.
export default function ManufacturingVideo({ className }) {
  const { manufacturing: m } = useT()
  const v = m.video
  const video = useRef(null)
  const [state, setState] = useState('idle') // idle | playing | ended
  const [src, setSrc] = useState(null)
  const [off, setOff] = useState(false)

  // Se lee después de montar para que coincida con el HTML pre-renderizado.
  useEffect(() => setOff(new URLSearchParams(location.search).get('video') === 'off'), [])

  // Arranca al montar el video, todavía dentro del clic. Si el navegador lo impide, quedan los controles.
  useEffect(() => {
    if (src) video.current.play().catch(() => {})
  }, [src])

  if (off) return null

  const file = (format) => `/media/manufactura-${v.lang}-${format}`

  function play() {
    // Vertical en celular: en horizontal el texto quedaría demasiado chico.
    setSrc(file(window.matchMedia('(max-width: 639px)').matches ? 'tall' : 'wide'))
    setState('playing')
    track('play')
  }

  // Algunos decodificadores fallan con un WebM ya iniciado, y el navegador no intenta solo la siguiente fuente.
  function fallback() {
    const el = video.current
    if (el.currentSrc.endsWith('.mp4')) return
    const at = el.currentTime
    el.src = `${src}.mp4`
    el.currentTime = at
    el.play().catch(() => {})
  }

  function replay() {
    setState('playing')
    video.current.currentTime = 0
    video.current.play()
  }

  return (
    <figure className={className}>
      <div className="relative aspect-4/5 overflow-hidden rounded-[24px] bg-navy-deep sm:aspect-video">
        {src && (
          <video
            ref={video}
            className="absolute inset-0 h-full w-full"
            controls
            playsInline
            preload="auto"
            aria-label={v.label}
            onError={fallback}
            onEnded={() => {
              setState('ended')
              track('ended')
            }}
          >
            <source src={`${src}.webm`} type="video/webm" />
            <source src={`${src}.mp4`} type="video/mp4" />
          </video>
        )}

        {state === 'idle' && (
          <button type="button" onClick={play} aria-label={v.play} className="group absolute inset-0 block h-full w-full cursor-pointer">
            <picture>
              <source media="(min-width: 640px)" srcSet={`${file('wide')}-poster.webp`} />
              <img src={`${file('tall')}-poster.webp`} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
            </picture>
            <span className="absolute inset-0 bg-navy-deep/35 transition-colors duration-150 group-hover:bg-navy-deep/20" />
            <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 whitespace-nowrap rounded-full bg-brand py-3.5 pl-5 pr-6 text-[17px] font-medium text-white shadow-[0_12px_32px_-8px_rgba(11,26,63,0.6)] transition-[scale,background-color] duration-150 group-hover:bg-brand-hover group-active:scale-[0.97]">
              <Play className="h-5 w-5 fill-current" />
              {v.play}
            </span>
          </button>
        )}

        {state === 'ended' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-navy-deep/85 px-6 text-center text-white">
            <a href="#contacto" onClick={() => preselectService('manufactura')} className="btn-primary gap-2 px-6 py-3 text-[17px]">
              {m.cta} <ArrowRight className="h-4 w-4" />
            </a>
            <button type="button" onClick={replay} className="inline-flex cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-[15px] text-white/80 transition-colors duration-150 hover:text-white">
              <RotateCcw className="h-4 w-4" /> {v.replay}
            </button>
          </div>
        )}
      </div>
      {/* Lo que dice y muestra el video, para lectores de pantalla y quien lo vea sin sonido. */}
      <figcaption className="sr-only">{v.transcript}</figcaption>
    </figure>
  )
}
