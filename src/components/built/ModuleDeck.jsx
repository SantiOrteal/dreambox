import { useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useT } from '../../i18n'
import { moduleScenes } from '../manufacturing/ModuleScenes'

const SPRING = { type: 'spring', duration: 0.6, bounce: 0.18 }
// Se animan como valores sueltos (y, scale, rotate) para que convivan con el arrastre en x.
// Posición de las tarjetas que quedan detrás: un poco más abajo, más chicas y ligeramente giradas.
const behind = [
  { y: 0, scale: 1, rotate: 0 },
  { y: 18, scale: 0.94, rotate: 3.5 },
  { y: 34, scale: 0.88, rotate: -3 },
]

// Mazo de módulos: la tarjeta de enfrente se arrastra a un lado (o se usan las flechas) y pasa al fondo.
export default function ModuleDeck() {
  const { manufacturing: m, builtSection } = useT()
  const labels = builtSection.deck
  const reduce = useReducedMotion()
  const [front, setFront] = useState(0)
  const n = m.modules.length
  const step = (d) => setFront((f) => (f + d + n) % n)

  return (
    <div role="group" aria-roledescription="carousel" aria-label={labels.label} className="mx-auto w-full max-w-[440px]">
      <div className="relative h-[446px]">
        {m.modules.map((mod, i) => {
          const depth = (i - front + n) % n
          const pose = behind[Math.min(depth, behind.length - 1)]
          const isFront = depth === 0
          const { Scene, bg } = moduleScenes[mod.id]
          return (
            <motion.article
              key={mod.id}
              aria-hidden={!isFront}
              initial={false}
              animate={reduce ? { y: 0, scale: 1, rotate: 0, opacity: isFront ? 1 : 0 } : { ...pose, opacity: 1 }}
              transition={SPRING}
              style={{ zIndex: n - depth, touchAction: 'pan-y' }}
              drag={isFront && !reduce ? 'x' : false}
              dragSnapToOrigin
              dragElastic={0.6}
              onDragEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 70 || Math.abs(info.velocity.x) > 500) step(info.offset.x < 0 ? 1 : -1)
              }}
              className={`absolute inset-x-0 top-0 flex h-[410px] flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_1px_2px_rgba(11,26,63,0.05),0_24px_48px_-24px_rgba(11,26,63,0.28)] ${
                isFront && !reduce ? 'cursor-grab active:cursor-grabbing' : ''
              }`}
            >
              {/* Las tarjetas de atrás solo muestran su silueta */}
              <motion.div
                initial={false}
                animate={{ opacity: isFront ? 1 : 0 }}
                transition={{ duration: 0.25, delay: isFront ? 0.15 : 0 }}
                className="flex h-full flex-col"
              >
                <div className={`relative grid h-[220px] shrink-0 place-items-center bg-linear-to-br/srgb px-6 ${bg}`}>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(11,26,63,0.08)_1px,transparent_1px)] bg-size-[22px_22px] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]"
                  />
                  {/* La escena se monta de nuevo al pasar al frente, así su animación se repite */}
                  <div aria-hidden="true" className="relative flex w-full justify-center">
                    {isFront ? <Scene key={`front-${front}`} /> : <Scene />}
                  </div>
                </div>
                <div className="p-7">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h4 className="text-[22px] font-semibold tracking-[-0.02em] text-ink">{mod.title}</h4>
                    {mod.soon && (
                      <span className="rounded-full bg-[#fff4e0] px-2.5 py-1 text-[12px] font-medium text-[#9a5b00]">{m.soon}</span>
                    )}
                  </div>
                  <p className="mt-2 text-[16px] leading-normal text-ink-muted">{mod.body}</p>
                </div>
              </motion.div>
            </motion.article>
          )
        })}
      </div>

      <div className="mt-8 flex items-center justify-between">
        <div className="flex gap-1.5" aria-hidden="true">
          {m.modules.map((mod, i) => (
            <span
              key={mod.id}
              className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ease-out ${i === front ? 'w-6 bg-brand' : 'w-1.5 bg-black/15'}`}
            />
          ))}
        </div>
        <p className="sr-only" aria-live="polite">
          {m.modules[front].title}
        </p>
        <div className="flex gap-2">
          {[
            { d: -1, label: labels.prev, Icon: ChevronLeft },
            { d: 1, label: labels.next, Icon: ChevronRight },
          ].map(({ d, label, Icon }) => (
            <button
              key={d}
              type="button"
              onClick={() => step(d)}
              aria-label={label}
              className="grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-[0_2px_12px_rgba(0,0,0,0.06)] ring-1 ring-black/5 transition-[transform,scale] duration-150 ease-out active:scale-95"
            >
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
