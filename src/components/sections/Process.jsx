import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'motion/react'
import { ArrowRight, Check, FileText, HeartHandshake, MessagesSquare, Rocket } from 'lucide-react'
import { useT } from '../../i18n'
import Reveal from '../Reveal'
import { stepVisuals } from '../process/StepVisuals'

const icons = { MessagesSquare, FileText, Rocket, HeartHandshake }
const EASE = [0.23, 1, 0.32, 1]
// Recorrido de scroll para pasar por los cuatro pasos (escritorio): corto, cerca de un giro de rueda por paso.
const TRACK_EXTRA = '52vh'

// Panel azul: anillo de progreso, la escena del paso activo y su título.
function StagePanel({ active, progress, reduce }) {
  const { process, processSection: copy } = useT()
  const step = process[active]
  const Icon = icons[step.icon]
  const Visual = stepVisuals[active]
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] bg-navy-deep p-9 text-white">
      <div aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand/40 blur-3xl" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]"
      />

      <div className="relative flex items-center gap-5">
        <div className="relative h-20 w-20 shrink-0">
          <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90" aria-hidden="true">
            <circle cx="50" cy="50" r="46" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3" />
            <motion.circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="#7b9dff"
              strokeWidth="3"
              strokeLinecap="round"
              style={{ pathLength: reduce ? 1 : progress }}
            />
          </svg>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={active}
              initial={{ opacity: 0, transform: 'scale(0.8) rotate(-10deg)' }}
              animate={{ opacity: 1, transform: 'scale(1) rotate(0deg)' }}
              exit={{ opacity: 0, transform: 'scale(0.8) rotate(10deg)' }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
              className="absolute inset-0 grid place-items-center"
            >
              <Icon className="h-8 w-8" strokeWidth={1.5} />
            </motion.span>
          </AnimatePresence>
        </div>
        <div>
          <p className="text-[15px] text-white/60">
            {copy.step(active + 1, process.length)}
          </p>
          <div className="mt-2 flex gap-1.5" aria-hidden="true">
            {process.map((p, i) => (
              <span
                key={p.title}
                className={`h-1 w-8 rounded-full transition-colors duration-300 ${i <= active ? 'bg-[#7b9dff]' : 'bg-white/15'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center py-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transform: 'translateY(-8px)' }}
            transition={{ duration: 0.25, ease: EASE }}
            className="w-full max-w-[400px]"
          >
            <Visual />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            initial={{ opacity: 0, transform: 'translateY(16px)' }}
            animate={{ opacity: 1, transform: 'translateY(0px)' }}
            exit={{ opacity: 0, transform: 'translateY(-16px)' }}
            transition={{ duration: 0.3, ease: EASE }}
            className="flex flex-wrap items-end justify-between gap-3"
          >
            <p className="text-[36px] font-semibold leading-[1.05] tracking-[-0.03em]">{step.title}</p>
            <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[14px] text-white/85">{step.detail}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// Texto de un paso: lo que hacemos y lo que te llevas.
function StepCopy({ step, i, as: Title = 'h3' }) {
  const copy = useT().processSection
  return (
    <>
      <p className="text-[15px] font-semibold text-brand">
        <span className="tabular-nums text-ink-subtle">0{i + 1}</span>
        <span className="mx-2 text-ink-subtle">·</span>
        {step.detail}
      </p>
      <Title className="mt-2 text-[32px] font-semibold tracking-[-0.025em] text-ink md:text-[40px]">{step.title}</Title>
      <p className="mt-3 max-w-[44ch] text-[19px] leading-[1.5] text-ink-muted">{step.body}</p>
      <ul className="mt-5 space-y-2 text-[16px] text-ink">
        {step.items.map((it) => (
          <li key={it} className="flex items-start gap-2.5">
            <span className="mt-[3px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {it}
          </li>
        ))}
      </ul>
      <p className="mt-5 inline-flex flex-wrap gap-x-1.5 rounded-2xl bg-white px-4 py-3 text-[15px] shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
        <span className="font-semibold text-ink">{copy.takeaway}</span>
        <span className="text-ink-muted">{step.outcome}</span>
      </p>
    </>
  )
}

// Escritorio: la sección se queda fija y un recorrido corto de scroll pasa de un paso a otro.
// El texto del paso activo aparece junto al panel, a su misma altura. Los pasos también se eligen con clic.
function PinnedSteps({ reduce }) {
  const { process, processSection: copy } = useT()
  const track = useRef(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: track, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(process.length - 1, Math.max(0, Math.floor(v * process.length))))
  })

  function goTo(i) {
    const el = track.current
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY
    const distance = el.offsetHeight - window.innerHeight
    window.scrollTo({ top: top + ((i + 0.5) / process.length) * distance, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <div ref={track} className="relative hidden lg:block" style={{ height: `calc(100dvh + ${TRACK_EXTRA})` }}>
      <div className="sticky top-0 flex h-[100dvh] items-center pt-14">
        <div className="grid h-[min(560px,calc(100dvh-140px))] w-full grid-cols-2 gap-12">
          <StagePanel active={active} progress={progress} reduce={reduce} />

          <div className="flex min-h-0 flex-col">
            {/* Selector de pasos */}
            <div role="tablist" aria-label={copy.tabsLabel} className="flex flex-wrap gap-1.5">
              {process.map((step, i) => (
                <button
                  key={step.title}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-controls={`paso-${i}`}
                  onClick={() => goTo(i)}
                  className={`hit whitespace-nowrap rounded-full px-3.5 py-2.5 text-[13px] font-medium transition-[background-color,color] duration-200 ease-out ${
                    i === active ? 'bg-ink text-white' : 'bg-white text-ink-muted hover:text-ink'
                  }`}
                >
                  {step.title}
                </button>
              ))}
            </div>

            {/* Todos los pasos quedan en el HTML (SEO); solo se ve el activo */}
            <div className="grid flex-1 items-center">
              {process.map((step, i) => {
                const isActive = i === active
                return (
                  <motion.div
                    key={step.title}
                    id={`paso-${i}`}
                    role="tabpanel"
                    aria-hidden={!isActive}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      transform: reduce || isActive ? 'translateY(0px)' : `translateY(${i < active ? -16 : 16}px)`,
                    }}
                    transition={{ duration: 0.4, ease: EASE, delay: isActive ? 0.08 : 0 }}
                    className={`[grid-area:1/1] ${isActive ? '' : 'pointer-events-none'}`}
                  >
                    <StepCopy step={step} i={i} />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Process() {
  const { process, processSection: copy } = useT()
  const reduce = useReducedMotion()

  return (
    <section id="proceso" aria-labelledby="proceso-title" className="bg-[#f5f5f7]/60 py-24 md:py-32 lg:pb-16">
      <div className="wrap">
        <Reveal as="h2" id="proceso-title" className="headline max-w-[20ch]">
          {copy.title}
        </Reveal>
        <Reveal as="p" delay={0.06} className="mt-4 max-w-[40rem] text-[19px] leading-[1.45] text-ink-muted">
          {copy.subtitle}
        </Reveal>

        <PinnedSteps reduce={reduce} />

        {/* Móvil y tablet: lista de pasos, cada uno con su escena */}
        <ol className="mt-14 space-y-16 lg:hidden">
          {process.map((step, i) => {
            const Icon = icons[step.icon]
            const Visual = stepVisuals[i]
            return (
              <li key={step.title}>
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white text-brand shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <StepCopy step={step} i={i} as="p" />
                <div className="mt-6 rounded-[24px] bg-navy-deep p-5 sm:p-6">
                  <Visual />
                </div>
              </li>
            )
          })}
        </ol>

        <Reveal className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[28px] bg-white p-8 shadow-[0_2px_12px_rgba(0,0,0,0.04)] sm:flex-row sm:items-center md:p-10 lg:mt-8">
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
