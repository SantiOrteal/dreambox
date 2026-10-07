import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react'
import { Check, Minus } from 'lucide-react'
import { useT } from '../../i18n'
import { seen } from '../Reveal'
import SnapCarousel from '../SnapCarousel'

const EASE = [0.23, 1, 0.32, 1]

// Comparador antes / ahora. La primera vez que se ve, pasa solo de "Antes" a "Ahora" (si nadie lo tocó).
function Compare() {
  const { caseStudy: c, builtSection } = useT()
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [mode, setMode] = useState('before')
  const [touched, setTouched] = useState(false)
  const now = mode === 'after'

  useEffect(() => {
    if (!inView || touched) return
    const id = setTimeout(() => setMode('after'), reduce ? 0 : 1800)
    return () => clearTimeout(id)
  }, [inView, touched, reduce])

  const pick = (m) => {
    setTouched(true)
    setMode(m)
  }
  const items = now ? c.after : c.before
  const options = [
    { id: 'before', label: c.beforeTitle },
    { id: 'after', label: c.afterTitle },
  ]

  return (
    <div ref={ref}>
      <div role="radiogroup" aria-label={builtSection.compare} className="inline-flex rounded-full bg-white/10 p-1">
        {options.map((o) => {
          const on = mode === o.id
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => pick(o.id)}
              className={`relative rounded-full px-5 py-2 text-[15px] font-semibold transition-colors duration-200 ${on ? (o.id === 'after' ? 'text-white' : 'text-navy-deep') : 'text-white/60 hover:text-white'}`}
            >
              {on && (
                <motion.span
                  layoutId="compare-knob"
                  transition={{ type: 'spring', duration: 0.45, bounce: 0.15 }}
                  className={`absolute inset-0 rounded-full ${o.id === 'after' ? 'bg-brand' : 'bg-white/85'}`}
                />
              )}
              <span className="relative">{o.label}</span>
            </button>
          )
        })}
      </div>

      <motion.div
        animate={{ backgroundColor: now ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,0.06)' }}
        transition={{ duration: 0.5, ease: EASE }}
        className={`mt-5 min-h-[264px] rounded-[24px] p-7 ring-1 ring-inset sm:p-8 ${now ? 'ring-transparent' : 'ring-white/10'}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.ul
            key={mode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`space-y-4 text-[17px] leading-[1.45] ${now ? 'text-ink' : 'text-white/75'}`}
          >
            {items.map((item, i) => (
              <motion.li
                key={item}
                initial={reduce ? false : { opacity: 0, transform: 'translateY(8px)' }}
                animate={{ opacity: 1, transform: 'translateY(0px)' }}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.08, ease: EASE }}
                className="flex items-start gap-3"
              >
                <span
                  className={`mt-[3px] grid h-5 w-5 shrink-0 place-items-center rounded-full ${now ? 'bg-brand-soft text-brand' : 'bg-white/10 text-white/60'}`}
                >
                  {now ? <Check className="h-3 w-3" strokeWidth={3} /> : <Minus className="h-3 w-3" strokeWidth={3} />}
                </span>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </motion.div>

      {/* Solo para lectores de pantalla y buscadores: las dos listas completas */}
      <div className="sr-only">
        <h4>{c.beforeTitle}</h4>
        <ul>{c.before.map((x) => <li key={x}>{x}</li>)}</ul>
        <h4>{c.afterTitle}</h4>
        <ul>{c.after.map((x) => <li key={x}>{x}</li>)}</ul>
      </div>
    </div>
  )
}

const dot = 'grid h-9 w-9 place-items-center rounded-full bg-brand text-[15px] font-semibold tabular-nums text-white'

function StepCard({ step, i, numbered = true }) {
  return (
    <div className="h-full rounded-[24px] bg-white p-7 ring-1 ring-inset ring-black/6">
      {numbered && <span className={`${dot} mb-5`}>{i + 1}</span>}
      <h5 className=" text-[21px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">{step.title}</h5>
      <p className="mt-2 text-[16px] leading-normal text-ink-muted">{step.body}</p>
    </div>
  )
}

// Pestaña del caso de estudio: bloque oscuro con el comparador y, debajo, cómo modernizamos cualquier sistema.
export default function CasePanel() {
  const { caseStudy: c, modernize: mz, builtSection } = useT()
  const reduce = useReducedMotion()

  return (
    <div>
      <div className="relative isolate overflow-hidden rounded-[32px] bg-navy-deep px-6 py-10 text-white sm:px-10 sm:py-12 lg:px-14 lg:py-14">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -right-32 -top-40 h-[480px] w-[480px] rounded-full bg-brand/40 blur-[110px]" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-size-[22px_22px] mask-[linear-gradient(to_bottom,black,transparent_70%)]" />
        </div>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
          <div>
            <p className="text-[15px] font-semibold text-brand-light">{c.eyebrow}</p>
            <h3 className="mt-4 text-[30px] font-semibold leading-[1.08] tracking-[-0.025em] md:text-[40px]">{c.title}</h3>
            <p className="mt-5 text-[18px] leading-normal text-white/70">{c.body}</p>
          </div>
          <Compare />
        </div>

        {/* Solo con una cita real del cliente (caseStudy.testimonial en es.js y en.js) */}
        {c.testimonial && (
          <figure className="mt-12 max-w-[46ch] border-t border-white/10 pt-10">
            <blockquote className="text-[22px] font-medium leading-[1.4] tracking-[-0.01em]">“{c.testimonial.quote}”</blockquote>
            <figcaption className="mt-5 text-[15px] text-white/60">
              <span className="font-semibold text-white">{c.testimonial.name}</span>, {c.testimonial.role}
              {c.testimonial.company && ` · ${c.testimonial.company}`}
            </figcaption>
          </figure>
        )}
      </div>

      {/* Cómo modernizamos un sistema existente (aplica a cualquier giro) */}
      <div className="mt-16">
        <h4 className="text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink md:text-[32px]">{mz.title}</h4>
        <p className="mt-3 max-w-160 text-[18px] leading-[1.45] text-ink-muted">{mz.body}</p>

        {/* Escritorio: línea de tiempo que se dibuja al verse, con los pasos colgando de ella */}
        <div className="relative mt-10 hidden md:block">
          <motion.span
            aria-hidden="true"
            initial={{ transform: reduce ? 'scaleX(1)' : 'scaleX(0)' }}
            whileInView={{ transform: 'scaleX(1)' }}
            viewport={seen}
            transition={{ duration: 1.4, ease: EASE }}
            className="absolute left-[16.66%] right-[16.66%] top-[17px] h-0.5 origin-left bg-linear-to-r/srgb from-brand to-brand/25"
          />
          <ol className="relative grid grid-cols-3 gap-4">
            {mz.steps.map((s, i) => (
              <motion.li
                key={s.title}
                initial={reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(16px)' }}
                whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                viewport={seen}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.35, ease: EASE }}
              >
                <span className={`${dot} relative mx-auto`}>{i + 1}</span>
                <div className="mt-6 h-[calc(100%-60px)]">
                  <StepCard step={s} i={i} numbered={false} />
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        {/* Móvil: carrusel */}
        <SnapCarousel
          className="mt-8 md:hidden"
          items={mz.steps}
          getKey={(s) => s.title}
          itemClassName="w-[82%]"
          labels={builtSection.carousel}
          renderItem={(s, i) => <StepCard step={s} i={i} />}
        />

        <ul className="mt-6 flex flex-wrap gap-2">
          {mz.stack.map((tech) => (
            <li key={tech} className="rounded-full bg-white px-3.5 py-2 text-[14px] font-medium text-ink ring-1 ring-inset ring-black/8">
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
