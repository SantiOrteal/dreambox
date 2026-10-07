import { motion, useReducedMotion } from 'motion/react'
import { useT } from '../../i18n'
import {
  ArrowRight,
  CircleCheck,
  CloudUpload,
  FileText,
  Inbox,
  KeyRound,
  Lock,
  Mail,
  MonitorSmartphone,
  Search,
  Send,
  Sparkles,
  UserRound,
} from 'lucide-react'

// Mini escenas que muestran cada servicio en acción. Se montan de nuevo al cambiar de servicio,
// así que cada pieza entra con un pequeño escalonado (explicación, no decoración).

const pop = { type: 'spring', duration: 0.55, bounce: 0.18 }
const card = 'rounded-2xl bg-white shadow-[0_1px_2px_rgba(11,26,63,0.06),0_12px_32px_-12px_rgba(11,26,63,0.18)]'

function useEnter() {
  const reduce = useReducedMotion()
  return (delay = 0, from = 'translateY(14px) scale(0.97)') => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, transform: from },
    animate: { opacity: 1, transform: 'translateY(0px) scale(1)' },
    transition: reduce ? { duration: 0.3, delay: delay * 0.5 } : { ...pop, delay },
  })
}

function Chip({ enter, delay, className = '', children }) {
  return (
    <motion.p
      {...enter(delay)}
      className={`absolute flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-3.5 py-2 text-[13px] font-medium text-ink shadow-[0_8px_24px_-8px_rgba(11,26,63,0.25)] ${className}`}
    >
      {children}
    </motion.p>
  )
}

function SupportScene() {
  const enter = useEnter()
  const t = useT().serviceScenes.support
  const steps = ['9:02', '9:10', '9:24'].map((time, i) => ({ time, label: t.steps[i] }))
  return (
    <div className="relative w-full max-w-[340px]">
      <motion.div {...enter(0.05)} className={`${card} p-5`}>
        <p className="text-[12px] font-medium text-ink-subtle">{t.ticket}</p>
        <p className="mt-1 text-[16px] font-semibold leading-snug text-ink">{t.issue}</p>
        <ol className="mt-4 space-y-3">
          {steps.map((s, i) => (
            <motion.li key={s.time} {...enter(0.35 + i * 0.3)} className="flex items-center gap-3 text-[14px]">
              <span
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${
                  i === steps.length - 1 ? 'bg-[#1f9d55] text-white' : 'bg-brand-soft text-brand'
                }`}
              >
                <CircleCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
              </span>
              <span className="flex-1 text-ink">{s.label}</span>
              <span className="tabular-nums text-ink-subtle">{s.time}</span>
            </motion.li>
          ))}
        </ol>
      </motion.div>
      <Chip enter={enter} delay={1.4} className="-right-3 -top-4 sm:-right-8">
        <UserRound className="h-4 w-4 text-brand" /> {t.chip}
      </Chip>
    </div>
  )
}

function WebScene() {
  const enter = useEnter()
  const t = useT().serviceScenes.web
  return (
    <div className="relative w-full max-w-[380px]">
      <motion.div {...enter(0.05)} className={`${card} overflow-hidden`}>
        <div className="flex items-center gap-1.5 border-b border-black/6 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-3 flex-1 rounded-md bg-paper px-2.5 py-1 text-[11px] text-ink-subtle">{t.url}</span>
        </div>
        <div className="p-5">
          <motion.div {...enter(0.3)} className="h-3 w-2/3 rounded-full bg-ink/80" />
          <motion.div {...enter(0.38)} className="mt-2 h-3 w-1/2 rounded-full bg-ink/80" />
          <motion.div {...enter(0.46)} className="mt-4 h-2 w-5/6 rounded-full bg-black/10" />
          <motion.div {...enter(0.5)} className="mt-1.5 h-2 w-3/4 rounded-full bg-black/10" />
          <motion.div {...enter(0.6)} className="mt-4 inline-flex rounded-full bg-brand px-4 py-1.5 text-[11px] font-medium text-white">
            {t.button}
          </motion.div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div key={i} {...enter(0.7 + i * 0.08)} className="aspect-4/3 rounded-lg bg-linear-to-br/srgb from-brand-soft to-[#e3f2fd]" />
            ))}
          </div>
        </div>
      </motion.div>
      <Chip enter={enter} delay={1.1} className="-left-3 top-[58%] sm:-left-10">
        <Search className="h-4 w-4 text-brand" /> {t.google}
      </Chip>
      <Chip enter={enter} delay={1.35} className="-bottom-4 -right-2 sm:-right-8">
        <MonitorSmartphone className="h-4 w-4 text-[#1f9d55]" /> {t.mobile}
      </Chip>
    </div>
  )
}

function MaintenanceScene() {
  const enter = useEnter()
  const reduce = useReducedMotion()
  const t = useT().serviceScenes.maintenance
  const checks = t.checks
  return (
    <div className="relative w-full max-w-[340px]">
      <motion.div {...enter(0.05)} className={`${card} p-5`}>
        <div className="flex items-center justify-between">
          <p className="text-[16px] font-semibold text-ink">{t.title}</p>
          <span className="flex items-center gap-1.5 text-[12px] font-medium text-[#1f9d55]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1f9d55] opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1f9d55]" />
            </span>
            {t.live}
          </span>
        </div>
        <ul className="mt-4 space-y-2.5">
          {checks.map((c, i) => (
            <motion.li key={c} {...enter(0.3 + i * 0.22)} className="flex items-center justify-between text-[14px]">
              <span className="text-ink">{c}</span>
              <CircleCheck className="h-[18px] w-[18px] text-[#1f9d55]" strokeWidth={2.25} />
            </motion.li>
          ))}
        </ul>
        <motion.div {...enter(1)} className="mt-4 border-t border-black/6 pt-4">
          <div className="flex justify-between text-[13px]">
            <span className="text-ink-muted">{t.backups}</span>
            <span className="font-medium tabular-nums text-ink">{t.backupsValue}</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-black/6">
            <motion.div
              initial={{ transform: reduce ? 'scaleX(1)' : 'scaleX(0)' }}
              animate={{ transform: 'scaleX(1)' }}
              transition={{ duration: 1.1, delay: 1.1, ease: [0.23, 1, 0.32, 1] }}
              className="h-full origin-left rounded-full bg-brand"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

function AutomationScene() {
  const enter = useEnter()
  const t = useT().serviceScenes.automation
  const nodes = [
    { icon: Inbox, label: t.nodes[0], tone: 'bg-white text-ink' },
    { icon: Sparkles, label: t.nodes[1], tone: 'bg-linear-to-br/srgb from-brand to-[#6d5cff] text-white' },
    { icon: Send, label: t.nodes[2], tone: 'bg-white text-ink' },
  ]
  return (
    <div className="flex w-full max-w-[320px] flex-col items-stretch">
      {nodes.map((n, i) => (
        <div key={n.label} className="flex flex-col items-center">
          {i > 0 && (
            <motion.span
              initial={{ transform: 'scaleY(0)' }}
              animate={{ transform: 'scaleY(1)' }}
              transition={{ duration: 0.35, delay: 0.2 + i * 0.45, ease: [0.23, 1, 0.32, 1] }}
              className="h-7 w-0.5 origin-top rounded-full bg-brand/40"
            />
          )}
          <motion.div
            {...enter(0.05 + i * 0.45)}
            className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 shadow-[0_12px_32px_-12px_rgba(11,26,63,0.25)] ${n.tone}`}
          >
            <n.icon className="h-5 w-5 shrink-0" />
            <span className="text-[15px] font-medium">{n.label}</span>
          </motion.div>
        </div>
      ))}
      <motion.p {...enter(1.5)} className="mt-4 self-center text-[13px] font-medium text-ink-muted">
        {t.note}
      </motion.p>
    </div>
  )
}

function CloudScene() {
  const enter = useEnter()
  const t = useT().serviceScenes.cloud
  return (
    <div className="relative grid h-[260px] w-full max-w-[380px] place-items-center">
      <motion.div
        {...enter(0.05, 'scale(0.9)')}
        className="grid h-28 w-28 place-items-center rounded-[32px] bg-linear-to-br/srgb from-brand to-navy text-white shadow-[0_24px_48px_-16px_rgba(47,91,234,0.6)]"
      >
        <Lock className="h-11 w-11" strokeWidth={1.6} />
      </motion.div>
      <Chip enter={enter} delay={0.4} className="left-0 top-4">
        <Mail className="h-4 w-4 text-brand" /> {t.email}
      </Chip>
      <Chip enter={enter} delay={0.6} className="right-0 top-14">
        <CloudUpload className="h-4 w-4 text-[#0a84ff]" /> {t.backup}
      </Chip>
      <Chip enter={enter} delay={0.8} className="bottom-12 left-2">
        <KeyRound className="h-4 w-4 text-[#6d5cff]" /> {t.twoFactor}
      </Chip>
      <Chip enter={enter} delay={1} className="bottom-0 right-4">
        <FileText className="h-4 w-4 text-[#1f9d55]" /> {t.files}
      </Chip>
    </div>
  )
}

function SystemsScene() {
  const enter = useEnter()
  const reduce = useReducedMotion()
  const t = useT().serviceScenes.systems
  const bars = [0.45, 0.62, 0.5, 0.78, 0.66, 0.92]
  return (
    <div className="relative w-full max-w-[360px]">
      <motion.div {...enter(0.05)} className={`${card} p-5`}>
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[12px] font-medium text-ink-subtle">{t.orders}</p>
            <p className="mt-0.5 text-[28px] font-semibold tabular-nums leading-none tracking-tight text-ink">38</p>
          </div>
          <span className="rounded-full bg-[#e8f6ee] px-2.5 py-1 text-[12px] font-medium text-[#1f9d55]">{t.trend}</span>
        </div>
        <div className="mt-5 flex h-28 items-end gap-2.5">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              initial={{ transform: reduce ? 'scaleY(1)' : 'scaleY(0)' }}
              animate={{ transform: 'scaleY(1)' }}
              transition={{ duration: 0.8, delay: 0.3 + i * 0.07, ease: [0.23, 1, 0.32, 1] }}
              style={{ height: `${h * 100}%` }}
              className={`flex-1 origin-bottom rounded-md ${i === bars.length - 1 ? 'bg-brand' : 'bg-brand/20'}`}
            />
          ))}
        </div>
        <div className="mt-4 space-y-2 border-t border-black/6 pt-4 text-[13px]">
          {t.rows.map(([k, v], i) => (
            <motion.p key={k} {...enter(0.9 + i * 0.15)} className="flex justify-between">
              <span className="text-ink-muted">{k}</span>
              <span className="font-medium text-ink">{v}</span>
            </motion.p>
          ))}
        </div>
      </motion.div>
      <Chip enter={enter} delay={1.3} className="-bottom-4 -left-3 sm:-left-8">
        {t.chip} <ArrowRight className="h-3.5 w-3.5 text-brand" />
      </Chip>
    </div>
  )
}

// Los módulos pasan uno a uno del sistema anterior a la plataforma nueva; el último sigue en camino.
function ModernizationScene() {
  const enter = useEnter()
  const t = useT().serviceScenes.modernization
  const last = t.modules.length - 1
  const step = (i) => 0.5 + i * 0.4
  return (
    <div className="relative w-full max-w-[400px]">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
        <motion.div {...enter(0.05)} className="rounded-2xl bg-white/60 p-3.5 ring-1 ring-inset ring-black/6 sm:p-4">
          <p className="text-[12px] font-medium text-ink-subtle">{t.before}</p>
          <ul className="mt-3 space-y-2">
            {t.modules.map((m, i) => (
              <motion.li
                key={m}
                initial={{ opacity: 1 }}
                animate={{ opacity: i === last ? 1 : 0.35 }}
                transition={{ duration: 0.3, delay: step(i) }}
                className="rounded-lg bg-black/5 px-2.5 py-2 text-[13px] text-ink-muted"
              >
                {m}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.span {...enter(0.3)} className="grid h-8 w-8 place-items-center rounded-full bg-brand text-white">
          <ArrowRight className="h-4 w-4" />
        </motion.span>

        <motion.div {...enter(0.15)} className={`${card} p-3.5 sm:p-4`}>
          <p className="text-[12px] font-medium text-brand">{t.after}</p>
          <ul className="mt-3 space-y-2">
            {t.modules.map((m, i) =>
              i === last ? (
                <motion.li
                  key={m}
                  {...enter(step(i))}
                  className="rounded-lg border border-dashed border-brand/40 px-2.5 py-[7px] text-[13px] text-ink-subtle"
                >
                  {t.next}
                </motion.li>
              ) : (
                <motion.li
                  key={m}
                  {...enter(step(i), 'translateX(-16px) scale(0.97)')}
                  className="flex items-center justify-between gap-2 rounded-lg bg-brand-soft px-2.5 py-2 text-[13px] font-medium text-ink"
                >
                  {m}
                  <CircleCheck className="h-3.5 w-3.5 shrink-0 text-[#1f9d55]" strokeWidth={2.5} />
                </motion.li>
              ),
            )}
          </ul>
        </motion.div>
      </div>
      <Chip enter={enter} delay={2.2} className="-bottom-12 left-1/2 -translate-x-1/2">
        <span className="h-2 w-2 rounded-full bg-[#1f9d55]" /> {t.chip}
      </Chip>
    </div>
  )
}

// Fondo del escenario por servicio: suave y dentro de la paleta de la marca.
export const scenes = {
  soporte: { Scene: SupportScene, bg: 'from-[#e8eeff] to-[#f4f6ff]' },
  web: { Scene: WebScene, bg: 'from-[#e6f1ff] to-[#f3f8ff]' },
  mantenimiento: { Scene: MaintenanceScene, bg: 'from-[#e6f5ec] to-[#f4fbf6]' },
  automatizacion: { Scene: AutomationScene, bg: 'from-[#ece8ff] to-[#f6f4ff]' },
  cloud: { Scene: CloudScene, bg: 'from-[#e3f0fd] to-[#f2f8fe]' },
  sistemas: { Scene: SystemsScene, bg: 'from-[#e9edf7] to-[#f5f7fb]' },
  modernizacion: { Scene: ModernizationScene, bg: 'from-[#e8eeff] to-[#f5f3ff]' },
}
