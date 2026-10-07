import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { ArrowRight, Check, FileText, HeartHandshake, MessagesSquare, Pause, Play, Rocket } from 'lucide-react'
import { useT } from '../../i18n'
import Reveal from '../Reveal'
import SnapCarousel from '../SnapCarousel'
import { stepVisuals } from '../process/StepVisuals'

const icons = { MessagesSquare, FileText, Rocket, HeartHandshake }
const AUTOPLAY_MS = 7000
// Proporción de la franja abierta frente a cada franja cerrada.
const OPEN_GROW = 8
const GAP = 12

// Lo que hacemos en el paso y lo que te llevas (sobre fondo azul marino).
function StepCopy({ step, as: Title = 'h3' }) {
  const copy = useT().processSection
  return (
    <>
      <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[13px] text-white/85">{step.detail}</p>
      <Title className="mt-4 text-[30px] font-semibold leading-[1.05] tracking-[-0.03em] text-white xl:text-[36px]">{step.title}</Title>
      <p className="mt-3 text-[17px] leading-normal text-white/70">{step.body}</p>
      <ul className="mt-5 space-y-2 text-[15px] text-white">
        {step.items.map((it) => (
          <li key={it} className="flex items-start gap-2.5">
            <span className="mt-[3px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-brand text-white">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {it}
          </li>
        ))}
      </ul>
      <p className="mt-6 border-t border-white/10 pt-5 text-[15px]">
        <span className="font-semibold text-white">{copy.takeaway}</span> <span className="text-white/70">{step.outcome}</span>
      </p>
    </>
  )
}

function Glow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/40 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-size-[22px_22px] mask-[linear-gradient(to_bottom,black,transparent_70%)]" />
    </div>
  )
}

// Escritorio: acordeón horizontal. El paso activo se abre a lo ancho con su escena y avanza solo;
// los demás quedan como franjas con su título en vertical. Se pausa con el mouse encima o al enfocar.
function Accordion() {
  const { process, processSection: copy } = useT()
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const tabs = useRef([])
  const inView = useInView(ref, { amount: 0.4 })
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hovered, setHovered] = useState(false)
  const [openWidth, setOpenWidth] = useState(720)
  const running = playing && !hovered && inView && !reduce
  const n = process.length

  // Ancho final de la franja abierta: el contenido se dibuja ya con ese ancho para no reacomodarse mientras crece.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const free = entry.contentRect.width - GAP * (n - 1)
      setOpenWidth((free * OPEN_GROW) / (OPEN_GROW + n - 1))
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [n])

  // El avance lo marca la propia barra: al pausar solo se congela (no se reinicia) y al terminar de llenarse pasa al siguiente.
  const next = () => setActive((a) => (a + 1) % n)

  // El botón refleja si avanza o no. Reanudar desde el botón también quita la pausa del mouse encima.
  function togglePlay() {
    if (running) return setPlaying(false)
    setPlaying(true)
    setHovered(false)
  }

  function onKeyDown(e, i) {
    const keys = { ArrowRight: 1, ArrowLeft: -1 }
    if (!(e.key in keys)) return
    e.preventDefault()
    const next = (i + keys[e.key] + n) % n
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <div
      ref={ref}
      role="tablist"
      aria-label={copy.tabsLabel}
      onPointerEnter={(e) => e.pointerType === 'mouse' && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHovered(false)}
      style={{ gap: GAP }}
      className="mt-14 hidden h-[580px] lg:flex"
    >
      {process.map((step, i) => {
        const on = i === active
        const Icon = icons[step.icon]
        const Visual = stepVisuals[i]
        return (
          <div
            key={step.title}
            style={{ flexGrow: on ? OPEN_GROW : 1, flexBasis: 0 }}
            className={`group relative min-w-0 overflow-hidden rounded-[28px] transition-[flex-grow,background-color] duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none ${
              on ? 'bg-navy-deep' : 'bg-white hover:bg-brand-soft'
            }`}
          >
            <button
              ref={(el) => (tabs.current[i] = el)}
              type="button"
              role="tab"
              id={`paso-tab-${i}`}
              aria-selected={on}
              aria-controls={`paso-${i}`}
              tabIndex={on ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`absolute inset-0 z-10 rounded-[28px] ${on ? 'pointer-events-none' : ''}`}
            >
              <span className="sr-only">{step.title}</span>
            </button>

            {/* Franja cerrada: ícono arriba y título en vertical */}
            <div
              aria-hidden="true"
              className={`absolute inset-0 flex flex-col items-center justify-between py-8 transition-opacity duration-300 ${on ? 'opacity-0' : 'opacity-100 delay-200'}`}
            >
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-soft text-brand transition-colors duration-300 group-hover:bg-white">
                <Icon className="h-6 w-6" strokeWidth={1.5} />
              </span>
              <span className="rotate-180 text-[26px] font-semibold tracking-[-0.02em] text-ink [writing-mode:vertical-rl]">{step.title}</span>
            </div>

            {/* Paso abierto: texto y escena, con el ancho final de la franja */}
            <AnimatePresence>
              {on && (
                <motion.div
                  id={`paso-${i}`}
                  role="tabpanel"
                  aria-labelledby={`paso-tab-${i}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.5, delay: reduce ? 0 : 0.35 } }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                  style={{ width: openWidth }}
                  className="absolute inset-y-0 left-0"
                >
                  <Glow />
                  <div className="relative grid h-full grid-cols-[minmax(0,1fr)_300px] gap-7 p-9 pb-14">
                    <div className="flex flex-col">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-white">
                        <Icon className="h-6 w-6" strokeWidth={1.5} />
                      </span>
                      <div className="mt-auto">
                        <StepCopy step={step} />
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-full">
                        <Visual />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Avance automático: barra que se llena en la franja abierta */}
            {on && (
              <div className="absolute inset-x-9 bottom-5 z-20 flex items-center gap-3">
                <span className="relative h-0.5 flex-1 overflow-hidden rounded-full bg-white/15">
                  {/* Solo se reinicia al cambiar de paso; pausar congela la animación donde va.
                      Con movimiento reducido no hay avance automático (y la animación no se aplica). */}
                  <span
                    key={active}
                    onAnimationEnd={next}
                    className="absolute inset-0 origin-left bg-[#7b9dff]"
                    style={
                      reduce
                        ? { transform: 'scaleX(1)' }
                        : { animation: `fill ${AUTOPLAY_MS}ms linear forwards`, animationPlayState: running ? 'running' : 'paused' }
                    }
                  />
                </span>
                {!reduce && (
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={running ? copy.pause : copy.play}
                    className="hit grid h-7 w-7 place-items-center rounded-full text-white/70 transition-colors hover:text-white"
                  >
                    {running ? <Pause className="h-3.5 w-3.5" fill="currentColor" /> : <Play className="h-3.5 w-3.5" fill="currentColor" />}
                  </button>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// Móvil y tablet: carrusel de tarjetas azul marino, cada una con su escena.
function StepsCarousel() {
  const { process, processSection: copy } = useT()
  return (
    <SnapCarousel
      className="mt-10 lg:hidden"
      items={process}
      getKey={(s) => s.title}
      itemClassName="w-[86%] sm:w-[62%]"
      labels={copy}
      renderItem={(step, i, active) => {
        const Visual = stepVisuals[i]
        return (
          <div
            className={`relative h-full overflow-hidden rounded-[28px] bg-navy-deep p-6 transition-[opacity,transform] duration-500 sm:p-7 ${
              active ? 'opacity-100' : 'scale-[0.97] opacity-70'
            }`}
          >
            <Glow />
            <div className="relative">
              <Visual />
              <div className="mt-7">
                <StepCopy step={step} as="p" />
              </div>
            </div>
          </div>
        )
      }}
    />
  )
}

export default function Process() {
  const { processSection: copy } = useT()

  return (
    <section id="proceso" aria-labelledby="proceso-title" className="py-24 md:py-32">
      <div className="wrap">
        <Reveal as="h2" id="proceso-title" className="headline max-w-[20ch]">
          {copy.title}
        </Reveal>
        <Reveal as="p" delay={0.06} className="mt-4 max-w-160 text-[19px] leading-[1.45] text-ink-muted">
          {copy.subtitle}
        </Reveal>

        <Accordion />
        <StepsCarousel />

        <Reveal className="mt-12 flex flex-col items-start justify-between gap-6 rounded-[28px] bg-paper p-8 sm:flex-row sm:items-center md:p-10">
          <div>
            <p className="text-[24px] font-semibold tracking-[-0.02em] text-ink md:text-[28px]">{copy.ctaTitle}</p>
            <p className="mt-1.5 text-[17px] text-ink-muted">{copy.ctaBody}</p>
          </div>
          <a href="#contacto" className="btn-primary shrink-0 gap-2 px-6 py-3 text-[17px]">
            {copy.ctaButton} <ArrowRight className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}
