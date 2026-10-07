import { motion, useReducedMotion } from 'motion/react'
import { CalendarCheck, Check, CircleCheck, FileText, Video } from 'lucide-react'
import { LogoMark } from '../Logo'
import { seen } from '../Reveal'
import { useT } from '../../i18n'

// Mini escenas sobre fondo azul oscuro que muestran qué pasa en cada paso.
// Entran una sola vez al verse; en el panel fijo se vuelven a montar al cambiar de paso.

const EASE = [0.23, 1, 0.32, 1]
const pop = { type: 'spring', duration: 0.55, bounce: 0.18 }
const glass = 'rounded-2xl bg-white/[0.07] ring-1 ring-inset ring-white/10'

function useEnter() {
  const reduce = useReducedMotion()
  return (delay = 0) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(12px) scale(0.97)' },
    whileInView: { opacity: 1, transform: 'translateY(0px) scale(1)' },
    viewport: seen,
    transition: reduce ? { duration: 0.3 } : { ...pop, delay },
  })
}

function CallVisual() {
  const enter = useEnter()
  const reduce = useReducedMotion()
  const t = useT().stepScenes.call
  const bars = [0.4, 0.75, 0.5, 1, 0.65, 0.85, 0.45, 0.7, 0.55]
  return (
    <motion.div {...enter(0)} className={`${glass} p-5`}>
      <div className="flex items-center justify-between text-[13px]">
        <span className="flex items-center gap-2 font-medium text-white">
          <Video className="h-4 w-4 text-[#7b9dff]" /> {t.title}
        </span>
        <span className="flex items-center gap-1.5 text-white/60">
          <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" /> {t.live}
        </span>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3">
        <motion.div {...enter(0.2)} className="grid aspect-4/3 place-items-center rounded-xl bg-white/6">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/15 text-[15px] font-semibold text-white">{t.you}</span>
        </motion.div>
        <motion.div {...enter(0.35)} className="grid aspect-4/3 place-items-center rounded-xl bg-brand/30">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white">
            <LogoMark className="h-7 w-7" />
          </span>
        </motion.div>
      </div>
      <div className="mt-4 flex h-6 items-center justify-center gap-1" aria-hidden="true">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            style={{ height: `${h * 100}%` }}
            animate={reduce ? undefined : { transform: ['scaleY(0.35)', 'scaleY(1)', 'scaleY(0.35)'] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.09, ease: 'easeInOut' }}
            className="w-1 rounded-full bg-[#7b9dff]"
          />
        ))}
      </div>
    </motion.div>
  )
}

function ProposalVisual() {
  const enter = useEnter()
  const t = useT().stepScenes.proposal
  const rows = t.rows
  return (
    <motion.div {...enter(0)} className="relative rounded-2xl bg-white p-5 text-ink">
      <div className="flex items-center gap-2 text-[13px] font-medium text-ink-muted">
        <FileText className="h-4 w-4 text-brand" /> {t.title}
      </div>
      <ol className="mt-4 space-y-2.5 text-[14px]">
        {rows.map((r, i) => (
          <motion.li key={r} {...enter(0.2 + i * 0.15)} className="flex items-center gap-3">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-soft text-[12px] font-semibold text-brand">
              {i + 1}
            </span>
            {r}
          </motion.li>
        ))}
      </ol>
      <motion.div {...enter(0.7)} className="mt-4 flex items-center justify-between border-t border-black/6 pt-4 text-[14px]">
        <span className="text-ink-muted">{t.price}</span>
        <span className="font-semibold">{t.priceValue}</span>
      </motion.div>
      <motion.span
        {...enter(1.1)}
        className="absolute -right-2 -top-3 flex items-center gap-1.5 rounded-full bg-[#1f9d55] px-3 py-1.5 text-[12px] font-semibold text-white shadow-lg"
      >
        <Check className="h-3.5 w-3.5" strokeWidth={3} /> {t.approved}
      </motion.span>
    </motion.div>
  )
}

function RolloutVisual() {
  const enter = useEnter()
  const reduce = useReducedMotion()
  const t = useT().stepScenes.rollout
  const tasks = t.tasks
  return (
    <motion.div {...enter(0)} className={`${glass} p-5`}>
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-[13px]">
        <span className="font-medium text-white">{t.title}</span>
        <span className="text-white/60">{t.note}</span>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ transform: reduce ? 'scaleX(1)' : 'scaleX(0)' }}
          whileInView={{ transform: 'scaleX(1)' }}
          viewport={seen}
          transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
          className="h-full origin-left rounded-full bg-[#7b9dff]"
        />
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-2.5">
        {tasks.map((t, i) => (
          <motion.li key={t} {...enter(0.35 + i * 0.35)} className="flex items-center gap-2 rounded-xl bg-white/6 px-3 py-2.5 text-[14px] text-white">
            <CircleCheck className="h-4 w-4 text-[#4ade80]" /> {t}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

function SupportVisual() {
  const enter = useEnter()
  const t = useT().stepScenes.report
  const stats = t.stats
  return (
    <motion.div {...enter(0)} className={`${glass} p-5`}>
      <div className="flex items-center justify-between text-[13px]">
        <span className="flex items-center gap-2 font-medium text-white">
          <CalendarCheck className="h-4 w-4 text-[#7b9dff]" /> {t.title}
        </span>
        <span className="text-white/60">{t.example}</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {stats.map((s, i) => (
          <motion.div key={s.label} {...enter(0.2 + i * 0.15)} className="rounded-xl bg-white/6 p-3">
            <p className="text-[22px] font-semibold tabular-nums leading-none text-white">{s.value}</p>
            <p className="mt-1.5 text-[12px] leading-tight text-white/60">{s.label}</p>
          </motion.div>
        ))}
      </div>
      <motion.p {...enter(0.75)} className="mt-3 rounded-xl bg-brand px-3.5 py-2.5 text-[13px] text-white">
        {t.tip}
      </motion.p>
    </motion.div>
  )
}

export const stepVisuals = [CallVisual, ProposalVisual, RolloutVisual, SupportVisual]
