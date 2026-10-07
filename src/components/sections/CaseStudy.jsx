import { motion, useReducedMotion } from 'motion/react'
import { Check, Minus } from 'lucide-react'
import { useT } from '../../i18n'
import Reveal, { seen } from '../Reveal'

const EASE = [0.23, 1, 0.32, 1]

// Caso de estudio (bloque oscuro: antes → ahora) y, debajo, cómo modernizamos cualquier sistema existente.
export default function CaseStudy() {
  const { caseStudy: c, modernize: mz } = useT()
  const reduce = useReducedMotion()
  const rise = (delay) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(24px)' },
    whileInView: { opacity: 1, transform: 'translateY(0px)' },
    viewport: seen,
    transition: { duration: 0.9, delay, ease: EASE },
  })

  return (
    <section id="caso" aria-labelledby="caso-title" className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1240px] px-3 sm:px-6">
        <div className="relative isolate overflow-hidden rounded-[36px] bg-navy-deep px-5 py-14 text-white sm:px-10 md:rounded-[44px] md:py-20 lg:px-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -right-32 -top-40 h-[480px] w-[480px] rounded-full bg-brand/40 blur-[110px]" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-size-[22px_22px] mask-[linear-gradient(to_bottom,black,transparent_70%)]" />
          </div>

          <Reveal as="p" className="text-[15px] font-semibold text-brand-light sm:text-[17px]">
            {c.eyebrow}
          </Reveal>
          <Reveal
            as="h2"
            id="caso-title"
            delay={0.04}
            className="mt-4 max-w-[20ch] text-[2.25rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl sm:leading-none"
          >
            {c.title}
          </Reveal>
          <Reveal as="p" delay={0.08} className="mt-6 max-w-160 text-[19px] leading-normal text-white/70">
            {c.body}
          </Reveal>

          <div className="mt-12 grid gap-4 md:grid-cols-2">
            <motion.div {...rise(0)} className="rounded-[24px] bg-white/6 p-7 ring-1 ring-inset ring-white/10 sm:p-8">
              <h3 className="text-[15px] font-semibold uppercase tracking-[0.08em] text-white/55">{c.beforeTitle}</h3>
              <ul className="mt-5 space-y-4 text-[17px] leading-[1.45] text-white/75">
                {c.before.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[3px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-white/10 text-white/60">
                      <Minus className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...rise(0.1)} className="rounded-[24px] bg-white p-7 text-ink sm:p-8">
              <h3 className="text-[15px] font-semibold uppercase tracking-[0.08em] text-brand">{c.afterTitle}</h3>
              <ul className="mt-5 space-y-4 text-[17px] leading-[1.45]">
                {c.after.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-[3px] grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Solo con una cita real del cliente (caseStudy.testimonial en es.js y en.js) */}
          {c.testimonial && (
            <Reveal as="figure" className="mt-12 max-w-[46ch]">
              <blockquote className="text-[22px] font-medium leading-[1.4] tracking-[-0.01em]">“{c.testimonial.quote}”</blockquote>
              <figcaption className="mt-5 text-[15px] text-white/60">
                <span className="font-semibold text-white">{c.testimonial.name}</span>, {c.testimonial.role}
                {c.testimonial.company && ` · ${c.testimonial.company}`}
              </figcaption>
            </Reveal>
          )}
        </div>
      </div>

      {/* Cómo modernizamos un sistema existente (aplica a cualquier giro, no solo manufactura) */}
      <div className="wrap mt-20 md:mt-28">
        <Reveal as="h2" className="headline max-w-[20ch]">
          {mz.title}
        </Reveal>
        <Reveal as="p" delay={0.06} className="mt-4 max-w-160 text-[19px] leading-[1.45] text-ink-muted">
          {mz.body}
        </Reveal>

        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {mz.steps.map((s, i) => (
            <motion.li key={s.title} {...rise(i * 0.08)} className="tile p-7 sm:p-8">
              <span className="text-[15px] font-semibold tabular-nums text-brand">0{i + 1}</span>
              <h3 className="mt-3 text-[22px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">{s.title}</h3>
              <p className="mt-2 text-[16px] leading-normal text-ink-muted">{s.body}</p>
            </motion.li>
          ))}
        </ol>

        <Reveal as="ul" className="mt-6 flex flex-wrap gap-2">
          {mz.stack.map((tech) => (
            <li key={tech} className="rounded-full bg-white px-3.5 py-2 text-[14px] font-medium text-ink ring-1 ring-inset ring-black/8">
              {tech}
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
