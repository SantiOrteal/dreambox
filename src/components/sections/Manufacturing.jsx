import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useT } from '../../i18n'
import Reveal, { seen } from '../Reveal'
import { moduleScenes } from '../manufacturing/ModuleScenes'
import { preselectService } from '../../lib/contactIntent'

const EASE = [0.23, 1, 0.32, 1]

// Convierte **negritas** en <strong>.
function rich(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') ? (
      <strong key={i} className="font-semibold text-ink">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  )
}

// Tono de cada dato clave, en el mismo lenguaje de tarjetas que "Lo que puedes esperar de nosotros".
const factTones = [
  { tone: 'bg-navy-deep text-white', sub: 'text-white/65' },
  { tone: 'bg-white/75 text-ink ring-1 ring-black/4 backdrop-blur-xs', sub: 'text-ink-muted' },
  { tone: 'bg-brand-soft text-navy', sub: 'text-navy/70' },
]

// Software para manufactura: qué es Dreambox Manufacturing, tres datos clave, módulos destacados y el resto de módulos.
export default function Manufacturing() {
  const { manufacturing: m } = useT()
  const reduce = useReducedMotion()

  return (
    <section id="manufactura" aria-labelledby="manufactura-title" className="bg-paper/60 py-24 md:py-32">
      <div className="wrap">
        <Reveal as="p" className="text-[17px] font-semibold text-brand">
          {m.eyebrow}
        </Reveal>
        <Reveal as="h2" id="manufactura-title" delay={0.04} className="headline mt-3 max-w-[22ch]">
          {m.title}
        </Reveal>
        <Reveal as="p" delay={0.08} className="mt-5 max-w-160 text-[19px] leading-[1.45] text-ink-muted">
          {rich(m.body)}
        </Reveal>
        <Reveal delay={0.12} className="mt-8 flex flex-wrap gap-3">
          <a href="#contacto" onClick={() => preselectService('manufactura')} className="btn-primary gap-2 px-6 py-3 text-[17px]">
            {m.cta} <ArrowRight className="h-4 w-4" />
          </a>
          <a href="#caso" className="btn-secondary px-6 py-3 text-[17px]">
            {m.secondary}
          </a>
        </Reveal>

        {/* Tres datos clave */}
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {m.facts.map((f, i) => {
            const { tone, sub } = factTones[i]
            return (
              <motion.article
                key={f.value}
                initial={reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(24px) scale(0.97)' }}
                whileInView={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
                viewport={seen}
                transition={{ duration: 0.9, delay: i * 0.08, ease: EASE }}
                className={`rounded-[28px] p-8 sm:p-10 ${tone}`}
              >
                <h3 className="text-[2.5rem] font-semibold leading-none tracking-[-0.03em] sm:text-5xl">{f.value}</h3>
                <p className={`mt-4 text-[17px] leading-[1.45] ${sub}`}>{f.label}</p>
              </motion.article>
            )
          })}
        </div>

        {/* Módulos destacados */}
        <Reveal as="h3" className="mt-24 text-[28px] font-semibold leading-[1.1] tracking-[-0.02em] text-ink md:text-[36px]">
          {m.modulesTitle}
        </Reveal>
        <Reveal as="p" delay={0.06} className="mt-3 max-w-160 text-[19px] leading-[1.45] text-ink-muted">
          {m.modulesBody}
        </Reveal>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {m.modules.map((mod, i) => {
            const { Scene, bg } = moduleScenes[mod.id]
            return (
              <Reveal as="article" key={mod.id} delay={i * 0.08} className="flex flex-col overflow-hidden rounded-[28px] bg-white">
                <div className={`relative grid h-[250px] place-items-center bg-linear-to-br/srgb px-6 ${bg}`}>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(11,26,63,0.08)_1px,transparent_1px)] bg-size-[22px_22px] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]"
                  />
                  <div aria-hidden="true" className="relative flex w-full justify-center">
                    <Scene />
                  </div>
                </div>
                <div className="p-7 sm:p-8">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h4 className="text-[22px] font-semibold tracking-[-0.02em] text-ink">{mod.title}</h4>
                    {mod.soon && (
                      <span className="rounded-full bg-[#fff4e0] px-2.5 py-1 text-[12px] font-medium text-[#9a5b00]">{m.soon}</span>
                    )}
                  </div>
                  <p className="mt-2 text-[16px] leading-normal text-ink-muted">{mod.body}</p>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* El resto de los módulos */}
        <Reveal className="mt-4 rounded-[28px] bg-white p-7 sm:p-8">
          <h3 className="text-[17px] font-semibold text-ink">{m.alsoTitle}</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {m.also.map((item) => {
              const label = typeof item === 'string' ? item : item.label
              return (
                <li key={label} className="flex items-center gap-2 rounded-full bg-paper px-3.5 py-2 text-[14px] text-ink">
                  {label}
                  {item.soon && <span className="text-[12px] font-medium text-[#9a5b00]">· {m.soon}</span>}
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
