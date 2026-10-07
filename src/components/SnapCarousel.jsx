import { useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Carrusel horizontal con scroll nativo (snap): se desliza con el dedo, con la rueda/trackpad o con las flechas.
// La barra de abajo muestra cuánto del recorrido llevas. itemClassName define el ancho de cada tarjeta.
export default function SnapCarousel({ items, renderItem, getKey, itemClassName, labels, bleed = true, className = '' }) {
  const track = useRef(null)
  const reduce = useReducedMotion()
  const { scrollXProgress } = useScroll({ container: track })
  const [index, setIndex] = useState(0)

  // Posición de scroll en la que cada tarjeta queda alineada (el track es relative, así que offsetLeft es interno).
  function stops() {
    const el = track.current
    const pad = parseFloat(getComputedStyle(el).scrollPaddingLeft) || 0
    return [...el.children].map((s) => s.offsetLeft - pad)
  }

  function onScroll() {
    const el = track.current
    if (!el) return
    const left = el.scrollLeft
    // Al final del recorrido, la última tarjeta cuenta como activa aunque no llegue al borde izquierdo.
    if (left + el.clientWidth >= el.scrollWidth - 4) return setIndex(items.length - 1)
    const d = stops().map((s) => Math.abs(s - left))
    setIndex(d.indexOf(Math.min(...d)))
  }

  function go(i) {
    const el = track.current
    if (!el) return
    const left = stops()[Math.max(0, Math.min(items.length - 1, i))]
    el.scrollTo({ left, behavior: reduce ? 'auto' : 'smooth' })
  }

  const arrow =
    'grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-[0_2px_12px_rgba(0,0,0,0.06)] ring-1 ring-black/5 transition-[opacity,transform,scale] duration-150 ease-out active:scale-95 disabled:opacity-35'

  return (
    <div className={className}>
      <div
        ref={track}
        onScroll={onScroll}
        className={`no-scrollbar relative flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain ${
          bleed ? '-mx-5 scroll-px-5 px-5 sm:-mx-8 sm:scroll-px-8 sm:px-8' : ''
        }`}
      >
        {items.map((item, i) => (
          <div key={getKey(item, i)} className={`shrink-0 snap-start ${itemClassName}`}>
            {renderItem(item, i, i === index)}
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        <span className="relative h-1 flex-1 overflow-hidden rounded-full bg-black/10" aria-hidden="true">
          <motion.span style={{ scaleX: scrollXProgress }} className="absolute inset-0 origin-left rounded-full bg-brand" />
        </span>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label={labels.prev} className={arrow}>
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => go(index + 1)} disabled={index === items.length - 1} aria-label={labels.next} className={arrow}>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
