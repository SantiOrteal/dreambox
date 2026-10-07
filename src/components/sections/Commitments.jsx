import { motion, useReducedMotion } from 'motion/react'
import { Check, CircleCheck, UserRound } from 'lucide-react'
import { useT } from '../../i18n'
import Reveal, { seen } from '../Reveal'

const EASE = [0.23, 1, 0.32, 1]
const pop = { type: 'spring', duration: 0.5, bounce: 0.2 }

// Cada compromiso trae una mini escena que lo demuestra (explicación, se reproduce una vez al entrar).

function enter(reduce, delay = 0) {
  return {
    initial: reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(10px) scale(0.96)' },
    whileInView: { opacity: 1, transform: 'translateY(0px) scale(1)' },
    viewport: seen,
    transition: { ...pop, delay },
  }
}

function ChatScene({ reduce }) {
  const t = useT().commitmentsSection.chat
  return (
    <div className="flex flex-col gap-2.5 text-[15px]">
      <motion.p {...enter(reduce, 0.1)} className="max-w-[80%] self-start rounded-2xl rounded-bl-md bg-white/10 px-4 py-2.5 text-white">
        {t.question}
      </motion.p>
      <motion.p {...enter(reduce, 0.7)} className="max-w-[80%] self-end rounded-2xl rounded-br-md bg-brand px-4 py-2.5 text-white">
        {t.answer}
      </motion.p>
      <motion.p
        {...enter(reduce, 1.4)}
        className="flex items-center gap-2 self-end rounded-full bg-white/10 px-3 py-1.5 text-[13px] text-white/85"
      >
        <CircleCheck className="h-4 w-4 text-[#4ade80]" /> {t.resolved}
      </motion.p>
    </div>
  )
}

function PlanScene({ reduce }) {
  const t = useT().commitmentsSection.plan
  const rows = t.rows
  return (
    <div className="rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
      <p className="text-[13px] font-semibold text-ink">{t.title}</p>
      <ul className="mt-3 space-y-2 text-[14px] text-ink-muted">
        {rows.map((r, i) => (
          <motion.li key={r} {...enter(reduce, 0.15 + i * 0.12)} className="flex items-center gap-2">
            <Check className="h-4 w-4 text-brand" strokeWidth={2.5} /> {r}
          </motion.li>
        ))}
      </ul>
      <motion.p {...enter(reduce, 0.6)} className="mt-3 border-t border-line pt-3 text-[13px] font-medium text-ink">
        {t.footer}
      </motion.p>
    </div>
  )
}

function OwnerScene() {
  const t = useT().commitmentsSection.owner
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
      <span className="relative grid h-11 w-11 place-items-center rounded-full bg-navy text-white">
        <UserRound className="h-5 w-5" />
        <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#22c55e]" />
      </span>
      <span>
        <span className="block text-[14px] font-semibold text-ink">{t.name}</span>
        <span className="block text-[13px] text-ink-muted">{t.status}</span>
      </span>
    </div>
  )
}

// El switch de "Mes a mes" termina siempre encendido: fondo y bolita dependen del mismo disparador.
// Con movimiento reducido ya aparece encendido.
function ToggleScene({ reduce }) {
  const t = useT().commitmentsSection.toggle
  const off = { track: { backgroundColor: 'rgba(0,0,0,0.1)' }, knob: { transform: 'translateX(0px)' } }
  const on = { track: { backgroundColor: '#2f5bea' }, knob: { transform: 'translateX(16px)' } }
  return (
    <motion.div
      initial={reduce ? 'on' : 'off'}
      whileInView="on"
      viewport={seen}
      className="space-y-3 rounded-2xl bg-white p-4 text-[15px] shadow-[0_2px_12px_rgba(0,0,0,0.05)] sm:max-w-sm"
    >
      <div className="flex items-center justify-between text-ink-subtle">
        <span className="line-through decoration-ink-subtle/60">{t.annual}</span>
        <span className="h-6 w-10 rounded-full bg-black/10" />
      </div>
      <div className="flex items-center justify-between font-medium text-ink">
        <span>{t.monthly}</span>
        <motion.span
          className="relative h-6 w-10 rounded-full"
          variants={{ off: off.track, on: on.track }}
          transition={{ duration: 0.25, delay: 0.5, ease: 'easeOut' }}
        >
          <motion.span
            className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow-sm"
            variants={{ off: off.knob, on: on.knob }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.15, delay: 0.5 }}
          />
        </motion.span>
      </div>
    </motion.div>
  )
}

const cells = {
  respuesta: { span: 'md:col-span-2', tone: 'bg-navy-deep text-white', sub: 'text-white/65', Scene: ChatScene },
  precio: { span: '', tone: 'bg-white/75 text-ink ring-1 ring-black/4 backdrop-blur-xs', sub: 'text-ink-muted', Scene: PlanScene },
  contacto: { span: '', tone: 'bg-brand-soft text-navy', sub: 'text-navy/70', Scene: OwnerScene },
  contrato: { span: 'md:col-span-2', tone: 'bg-white/75 text-ink ring-1 ring-black/4 backdrop-blur-xs', sub: 'text-ink-muted', Scene: ToggleScene },
}

export default function Commitments() {
  const t = useT()
  const { commitments } = t
  const reduce = useReducedMotion()
  return (
    <section aria-labelledby="compromisos-title" className="py-24 md:py-32">
      <div className="wrap">
        <Reveal as="h2" id="compromisos-title" className="headline max-w-[20ch]">
          {t.commitmentsSection.title}
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {commitments.map((c, i) => {
            const { span, tone, sub, Scene } = cells[c.id]
            const wide = span !== ''
            return (
              <motion.article
                key={c.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(24px) scale(0.97)' }}
                whileInView={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
                viewport={seen}
                transition={{ duration: 0.9, delay: (i % 2) * 0.08, ease: EASE }}
                className={`flex flex-col gap-8 rounded-[28px] p-8 sm:p-10 ${span} ${tone} ${
                  wide ? 'md:flex-row md:items-end md:justify-between' : 'justify-between'
                }`}
              >
                <div>
                  <h3 className={`font-semibold leading-none tracking-[-0.03em] ${wide ? 'text-5xl sm:text-[3.5rem]' : 'text-[2.5rem] sm:text-5xl'}`}>
                    {c.value}
                  </h3>
                  <p className={`mt-4 max-w-[26ch] text-[19px] leading-[1.4] ${sub}`}>{c.label}</p>
                </div>
                <div className={wide ? 'md:w-[48%]' : ''}>
                  <Scene reduce={reduce} />
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
