import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { ArrowRight, Boxes, ChevronLeft, ChevronRight, Cloud, Globe, Headset, Pause, Play, RefreshCw, ShieldCheck, Sparkles } from 'lucide-react'
import es from '../../i18n/es'
import { useT } from '../../i18n'
import Reveal from '../Reveal'
import { scenes } from '../services/ServiceScenes'

const icons = { Boxes, Globe, Headset, ShieldCheck, Sparkles, Cloud, RefreshCw }
const AUTOPLAY_MS = 6500
const EASE = [0.23, 1, 0.32, 1]
// Ambos idiomas tienen los mismos servicios, en el mismo orden.
const n = es.services.length
const wrapIndex = (i) => ((i % n) + n) % n

// Barra del avance automático. Se monta de nuevo solo al cambiar de servicio; al pausar se congela donde va
// y al terminar de llenarse pasa al siguiente. Con movimiento reducido no hay avance (ni animación).
function Progress({ running, reduce, onEnd, className }) {
  return (
    <span
      onAnimationEnd={onEnd}
      className={`absolute inset-0 origin-left ${className}`}
      style={
        reduce
          ? { transform: 'scaleX(1)' }
          : { animation: `fill ${AUTOPLAY_MS}ms linear forwards`, animationPlayState: running ? 'running' : 'paused' }
      }
    />
  )
}

// Enlace opcional de un servicio (por ejemplo, "Ver proyectos"). Fuera del servicio activo no recibe foco.
function ServiceLink({ link, active }) {
  if (!link) return null
  return (
    <a href={link.href} tabIndex={active ? undefined : -1} className="link mt-4 text-[15px]">
      {link.label} <ArrowRight className="h-3.5 w-3.5" />
    </a>
  )
}

const control =
  'grid h-10 w-10 place-items-center rounded-full bg-white/80 text-ink/70 shadow-xs backdrop-blur-sm transition-[background-color,color,transform,scale] duration-150 ease-out hover:bg-white hover:text-ink active:scale-95 '

const arrow =
  'grid h-11 w-11 place-items-center rounded-full bg-paper text-ink/70 transition-[background-color,color,transform,scale] duration-150 ease-out hover:text-ink active:scale-95'

function Controls({ reduce, running, onToggle, onStep, labels, className }) {
  return (
    <div className={`items-center gap-2 ${className}`}>
      {!reduce && (
        <button type="button" onClick={onToggle} aria-label={running ? labels.pause : labels.play} className={control}>
          {running ? <Pause className="h-3.5 w-3.5" fill="currentColor" /> : <Play className="h-3.5 w-3.5" fill="currentColor" />}
        </button>
      )}
      <button type="button" onClick={() => onStep(-1)} aria-label={labels.prev} className={control}>
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button type="button" onClick={() => onStep(1)} aria-label={labels.next} className={control}>
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  )
}

function useTabKeys(go, refs) {
  return (e, index) => {
    const keys = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }
    let next
    if (e.key in keys) next = wrapIndex(index + keys[e.key])
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = n - 1
    else return
    e.preventDefault()
    go(next)
    refs.current[next]?.focus()
  }
}

export default function Services() {
  const t = useT()
  const { services, servicesSection: copy } = t
  const section = useRef(null)
  const pillRow = useRef(null)
  const listTabs = useRef([])
  const pillTabs = useRef([])
  const reduce = useReducedMotion()
  const inView = useInView(section, { amount: 0.3 })
  const [[active, dir], setState] = useState([0, 1])
  const [playing, setPlaying] = useState(true)
  const [hovered, setHovered] = useState(false)
  const running = playing && !hovered && inView && !reduce
  const service = services[active]
  const { Scene, bg } = scenes[service.id]

  const go = (index) => setState(([cur]) => [wrapIndex(index), index >= cur ? 1 : -1])
  const step = (delta) => setState(([cur]) => [wrapIndex(cur + delta), delta])
  const listKeys = useTabKeys(go, listTabs)
  const pillKeys = useTabKeys(go, pillTabs)

  // Avance automático: lo marca la barra (onEnd). Se pausa al pausar, con el mouse encima o fuera de vista.
  const advance = () => step(1)

  // El botón refleja si avanza o no. Reanudar desde el botón también quita la pausa del mouse encima.
  function togglePlay() {
    if (running) return setPlaying(false)
    setPlaying(true)
    setHovered(false)
  }

  // En móvil, mantiene visible la pestaña activa dentro de su fila (sin mover la página).
  useEffect(() => {
    const row = pillRow.current
    const pill = pillTabs.current[active]
    if (!row || !pill || row.scrollWidth <= row.clientWidth) return
    row.scrollTo({ left: pill.offsetLeft - (row.clientWidth - pill.offsetWidth) / 2, behavior: reduce ? 'auto' : 'smooth' })
  }, [active, reduce])

  // Pausa solo con el mouse (o el foco) sobre las opciones o sobre la tarjeta, no en el espacio vacío alrededor.
  const pauseOnHover = {
    onPointerEnter: (e) => e.pointerType === 'mouse' && setHovered(true),
    onPointerLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: (e) => !e.currentTarget.contains(e.relatedTarget) && setHovered(false),
  }

  const shift = reduce ? 0 : 48
  const controls = { reduce, running, onToggle: togglePlay, onStep: step, labels: copy }

  return (
    <section ref={section} id="servicios" aria-labelledby="servicios-title" className="bg-paper/60 py-24 md:py-32">
      <div className="wrap">
        <Reveal as="h2" id="servicios-title" className="headline max-w-[18ch]">
          {copy.title}
        </Reveal>
        <Reveal as="p" delay={0.06} className="mt-4 max-w-160 text-[19px] leading-[1.45] text-ink-muted">
          {copy.subtitle}
        </Reveal>

        <Reveal
          delay={0.12}
          className="mt-10 grid grid-cols-[minmax(0,1fr)] items-start gap-5 md:mt-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12"
        >
          {/* Móvil y tablet: pestañas compactas en una fila deslizable */}
          <div
            ref={pillRow}
            {...pauseOnHover}
            role="tablist"
            aria-label={copy.tabsLabel}
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:hidden"
          >
            {services.map((s, i) => {
              const Icon = icons[s.icon]
              const selected = i === active
              return (
                <button
                  key={s.id}
                  ref={(el) => (pillTabs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`svc-pill-${s.id}`}
                  aria-selected={selected}
                  aria-controls="svc-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => go(i)}
                  onKeyDown={(e) => pillKeys(e, i)}
                  className={`relative flex shrink-0 items-center gap-2 overflow-hidden rounded-full px-4 py-3 text-[15px] font-medium transition-[background-color,color] duration-200 ease-out ${
                    selected ? 'bg-ink text-white' : 'bg-white text-ink-muted hover:text-ink'
                  }`}
                >
                  {selected && <Progress running={running} reduce={reduce} onEnd={advance} className="bg-white/[0.14]" />}
                  <Icon className="relative h-4 w-4" />
                  <span className="relative">{s.short}</span>
                </button>
              )
            })}
          </div>

          {/* Escritorio: lista vertical; el servicio activo se despliega con su detalle */}
          <div {...pauseOnHover} role="tablist" aria-label={copy.tabsLabel} aria-orientation="vertical" className="hidden lg:block">
            {services.map((s, i) => {
              const Icon = icons[s.icon]
              const selected = i === active
              return (
                <div key={s.id} className="relative border-b border-black/8">
                  <button
                    ref={(el) => (listTabs.current[i] = el)}
                    type="button"
                    role="tab"
                    id={`svc-tab-${s.id}`}
                    aria-selected={selected}
                    aria-controls="svc-panel"
                    tabIndex={selected ? 0 : -1}
                    onClick={() => go(i)}
                    onKeyDown={(e) => listKeys(e, i)}
                    className="group flex w-full items-center gap-4 py-5 text-left"
                  >
                    <span
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl transition-[background-color,color] duration-200 ease-out ${
                        selected ? 'bg-brand text-white' : 'bg-white text-ink-muted group-hover:text-ink'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span
                      className={`text-[19px] font-semibold tracking-[-0.01em] transition-colors duration-200 ${
                        selected ? 'text-ink' : 'text-ink-muted group-hover:text-ink'
                      }`}
                    >
                      {s.title}
                    </span>
                  </button>

                  {/* Todo el detalle queda en el HTML (SEO); solo se despliega el del servicio activo */}
                  <div
                    aria-hidden={!selected}
                    className={`grid transition-[grid-template-rows,opacity] duration-400 ease-out motion-reduce:transition-none ${
                      selected ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-6 pl-14">
                        <p className="text-[16px] leading-normal text-ink-muted">{s.body}</p>
                        <ul className="mt-3 space-y-1 text-[15px] text-ink">
                          {s.points.map((p) => (
                            <li key={p} className="flex items-center gap-2">
                              <span className="h-1 w-1 rounded-full bg-brand" /> {p}
                            </li>
                          ))}
                        </ul>
                        <ServiceLink link={s.link} active={selected} />
                      </div>
                    </div>
                  </div>

                  {selected && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 overflow-hidden">
                      <Progress running={running} reduce={reduce} onEnd={advance} className="bg-brand" />
                    </span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Escenario: muestra el servicio activo. En móvil también se cambia deslizando. */}
          <motion.div
            {...pauseOnHover}
            id="svc-panel"
            role="tabpanel"
            aria-labelledby={`svc-tab-${service.id}`}
            onPanEnd={(_, info) => {
              const { x, y } = info.offset
              if (Math.abs(x) > 50 && Math.abs(x) > Math.abs(y)) step(x < 0 ? 1 : -1)
            }}
            style={{ touchAction: 'pan-y' }}
            className="relative overflow-hidden rounded-[32px] bg-white"
          >
            <div className="relative h-[380px] sm:h-[440px] lg:h-[560px]">
              <AnimatePresence initial={false} custom={dir}>
                <motion.div
                  key={service.id}
                  custom={dir}
                  variants={{
                    enter: (d) => ({ opacity: 0, transform: `translateX(${d * shift}px)` }),
                    center: { opacity: 1, transform: 'translateX(0px)' },
                    exit: (d) => ({ opacity: 0, transform: `translateX(${d * -shift}px)` }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.5, ease: EASE }}
                  className={`absolute inset-0 grid place-items-center bg-linear-to-br/srgb px-8 py-10 ${bg}`}
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(11,26,63,0.08)_1px,transparent_1px)] bg-size-[22px_22px] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]"
                  />
                  <div className="relative flex w-full justify-center">
                    <Scene />
                  </div>
                </motion.div>
              </AnimatePresence>

              <Controls {...controls} className="absolute bottom-4 right-4 z-10 hidden lg:flex" />
            </div>

            {/* Móvil y tablet: el texto va debajo de la escena */}
            <div className="relative px-6 pb-7 pt-4 sm:px-8 lg:hidden">
              {/* Justo debajo de la escena: flechas a los lados de los puntos de posición, y pausa junto a los puntos */}
              <div className="mb-5 flex items-center justify-between">
                <button type="button" onClick={() => step(-1)} aria-label={copy.prev} className={arrow}>
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="flex items-center gap-3">
                  {!reduce && (
                    <button
                      type="button"
                      onClick={togglePlay}
                      aria-label={running ? copy.pause : copy.play}
                      className="hit grid h-8 w-8 place-items-center rounded-full text-ink/60 transition-colors hover:text-ink"
                    >
                      {running ? <Pause className="h-3.5 w-3.5" fill="currentColor" /> : <Play className="h-3.5 w-3.5" fill="currentColor" />}
                    </button>
                  )}
                  <div aria-hidden="true" className="flex gap-1.5">
                    {services.map((s, i) => (
                      <span
                        key={s.id}
                        className={`h-1.5 rounded-full transition-[width,background-color] duration-300 ease-out ${
                          i === active ? 'w-5 bg-brand' : 'w-1.5 bg-black/15'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <button type="button" onClick={() => step(1)} aria-label={copy.next} className={arrow}>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

              {/* Todos los servicios quedan en el HTML con su título (SEO); solo se ve el activo.
                  Al ocupar la misma celda, la tarjeta mide siempre lo mismo y no salta al cambiar. */}
              <div className="grid">
                {services.map((s, i) => {
                  const isActive = i === active
                  return (
                    <motion.div
                      key={s.id}
                      aria-hidden={!isActive}
                      initial={false}
                      animate={{
                        opacity: isActive ? 1 : 0,
                        transform: reduce || isActive ? 'translateY(0px)' : 'translateY(8px)',
                      }}
                      transition={{ duration: 0.3, ease: EASE, delay: isActive ? 0.1 : 0 }}
                      className={`[grid-area:1/1] ${isActive ? '' : 'pointer-events-none'}`}
                    >
                      <h3 className="text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">{s.title}</h3>
                      <p className="mt-2 text-[16px] leading-normal text-ink-muted">{s.body}</p>
                      <ul className="mt-4 space-y-1.5 text-[15px] text-ink">
                        {s.points.map((p) => (
                          <li key={p} className="flex items-center gap-2">
                            <span className="h-1 w-1 shrink-0 rounded-full bg-brand" /> {p}
                          </li>
                        ))}
                      </ul>
                      <ServiceLink link={s.link} active={isActive} />
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}
