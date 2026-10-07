import { motion, useReducedMotion } from 'motion/react'
import { CircleCheck, Clock, Package, Wrench } from 'lucide-react'
import { useT } from '../../i18n'
import { seen } from '../Reveal'

// Mini escenas de los módulos de manufactura (ejemplos ilustrativos). Entran una vez al verse.

const pop = { type: 'spring', duration: 0.55, bounce: 0.18 }
const card = 'rounded-2xl bg-white shadow-[0_1px_2px_rgba(11,26,63,0.06),0_12px_32px_-12px_rgba(11,26,63,0.18)]'

export function useEnter() {
  const reduce = useReducedMotion()
  return (delay = 0, from = 'translateY(12px) scale(0.97)') => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, transform: from },
    whileInView: { opacity: 1, transform: 'translateY(0px) scale(1)' },
    viewport: seen,
    transition: reduce ? { duration: 0.3, delay: delay * 0.5 } : { ...pop, delay },
  })
}

function PpapScene() {
  const enter = useEnter()
  const t = useT().manufacturingScenes.ppap
  return (
    <motion.div {...enter(0.05)} className={`${card} w-full max-w-[290px] p-4`}>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[15px] font-semibold text-ink">{t.title}</p>
        <p className="text-[11px] text-ink-subtle">{t.part}</p>
      </div>
      <ul className="mt-3 space-y-2">
        {t.items.map((it, i) => (
          <motion.li key={it.label} {...enter(0.3 + i * 0.2)} className="flex items-center justify-between gap-2 text-[13px]">
            <span className="text-ink">{it.label}</span>
            <span
              className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                it.done ? 'bg-[#e8f6ee] text-[#1f7a45]' : 'bg-[#fff4e0] text-[#9a5b00]'
              }`}
            >
              {it.done ? <CircleCheck className="h-3 w-3" strokeWidth={2.5} /> : <Clock className="h-3 w-3" strokeWidth={2.5} />}
              {it.status}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

// Kiosco en piso: el operador toca "Limpieza" y queda registrado.
function ToolingScene() {
  const enter = useEnter()
  const reduce = useReducedMotion()
  const t = useT().manufacturingScenes.tooling
  const picked = 1
  return (
    <motion.div {...enter(0.05)} className="relative w-full max-w-[290px] rounded-2xl bg-navy-deep p-4 text-white shadow-[0_12px_32px_-12px_rgba(11,26,63,0.45)]">
      <p className="text-[11px] text-white/60">{t.header}</p>
      <p className="mt-1 flex items-center gap-2 text-[17px] font-semibold">
        <Wrench className="h-4 w-4 text-brand-light" /> {t.tool}
      </p>
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {t.actions.map((a, i) => (
          <motion.span
            key={a}
            initial={false}
            whileInView={i === picked ? { backgroundColor: '#2f5bea' } : undefined}
            viewport={seen}
            transition={{ duration: 0.2, delay: reduce ? 0 : 0.9 }}
            className="rounded-lg bg-white/10 px-1 py-3 text-center text-[12px] font-medium"
          >
            {a}
          </motion.span>
        ))}
      </div>
      <motion.p
        {...enter(1.3)}
        className="absolute -bottom-4 right-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[12px] font-medium text-ink shadow-[0_8px_24px_-8px_rgba(11,26,63,0.35)]"
      >
        <CircleCheck className="h-3.5 w-3.5 text-[#1f9d55]" strokeWidth={2.5} /> {t.saved}
      </motion.p>
    </motion.div>
  )
}

// Corrida: el producto terminado y el lote de cada componente que entró en ella.
function TraceScene() {
  const enter = useEnter()
  const t = useT().manufacturingScenes.trace
  return (
    <motion.div {...enter(0.05)} className={`${card} w-full max-w-[290px] p-4`}>
      <p className="text-[11px] font-medium text-ink-subtle">{t.title}</p>
      <div className="mt-2 flex items-center gap-2.5 rounded-xl bg-brand-soft px-3 py-2.5">
        <Package className="h-4 w-4 shrink-0 text-brand" />
        <span className="text-[13px]">
          <span className="block text-[11px] text-ink-subtle">{t.product}</span>
          <span className="font-semibold text-ink">{t.productValue}</span>
        </span>
      </div>
      <ul className="ml-4 border-l border-dashed border-brand/40 pl-3">
        {t.components.map((c, i) => (
          <motion.li key={c.name} {...enter(0.4 + i * 0.25, 'translateX(-10px)')} className="flex items-center justify-between gap-2 pt-2.5 text-[13px]">
            <span>
              <span className="block text-ink">{c.name}</span>
              <span className="block text-[11px] tabular-nums text-ink-subtle">{c.lot}</span>
            </span>
            <CircleCheck className="h-4 w-4 shrink-0 text-[#1f9d55]" strokeWidth={2.25} />
          </motion.li>
        ))}
      </ul>
    </motion.div>
  )
}

export const moduleScenes = {
  ppap: { Scene: PpapScene, bg: 'from-[#e8eeff] to-[#f4f6ff]' },
  herramental: { Scene: ToolingScene, bg: 'from-[#e9edf7] to-[#f5f7fb]' },
  trazabilidad: { Scene: TraceScene, bg: 'from-[#e6f5ec] to-[#f4fbf6]' },
}
