import { useEffect } from 'react'
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import { Check, Globe, HardDrive, Mail, Server, Timer } from 'lucide-react'
import FitStage from './FitStage'
import useCycle from './useCycle'
import { EASE } from '../constants'

// Variante 1: panel de monitoreo en vivo. Cuenta el mensaje del título:
// todo opera en verde y los tickets que entran se resuelven en minutos.
const W = 640
const H = 400

const systems = [
  { Icon: Mail, name: 'Correo' },
  { Icon: Server, name: 'Servidor' },
  { Icon: Globe, name: 'Sitio web' },
  { Icon: HardDrive, name: 'Respaldos' },
]

const tickets = [
  { title: 'Impresora no imprime', who: 'Recepción', time: '9 min', system: -1 },
  { title: 'Servidor lento', who: 'Contabilidad', time: '14 min', system: 1 },
  { title: 'Correo no sincroniza', who: 'Ventas', time: '7 min', system: 0 },
]
// Por ticket: nuevo → en proceso → resuelto (ms).
const STEPS = tickets.flatMap(() => [1300, 1800, 2400])

const spark = [38, 30, 34, 22, 26, 18, 24, 12, 16, 10, 14, 6]
const SPARK_D = spark.map((y, i) => `${i === 0 ? 'M' : 'L'}${(i * 200) / (spark.length - 1)} ${y + 4}`).join(' ')

function Uptime() {
  const reduce = useReducedMotion()
  const v = useMotionValue(reduce ? 99.98 : 97)
  const text = useTransform(v, (n) => `${n.toFixed(2)}%`)
  useEffect(() => {
    if (reduce) return
    const c = animate(v, 99.98, { duration: 2, delay: 0.6, ease: EASE })
    return () => c.stop()
  }, [reduce, v])
  return <motion.span>{text}</motion.span>
}

function Card({ delay, className, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, transform: 'translateY(16px)' }}
      animate={{ opacity: 1, transform: 'translateY(0px)' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={`rounded-2xl bg-white/80 ring-1 ring-black/5 ${className}`}
    >
      {children}
    </motion.div>
  )
}

export default function DashboardVisual({ pointer, style }) {
  const step = useCycle(STEPS, { startDelay: 1600, still: 2 })
  const ticket = tickets[Math.max(0, Math.floor(step / 3))]
  const state = step < 0 ? -1 : step % 3

  const rotateY = useTransform(pointer.x, [-1, 1], [-6, 6])
  const rotateX = useTransform(pointer.y, [-1, 1], [5, -5])
  const nearX = useTransform(pointer.x, [-1, 1], [-22, 22])
  const nearY = useTransform(pointer.y, [-1, 1], [-14, 14])

  return (
    <FitStage width={W} height={H} style={style}>
      <div className="relative h-full w-full perspective-[1400px]">
        <motion.div
          initial={{ opacity: 0, transform: 'translateY(40px) scale(0.94)', filter: 'blur(8px)' }}
          animate={{ opacity: 1, transform: 'translateY(0px) scale(1)', filter: 'blur(0px)' }}
          transition={{ duration: 1, delay: 0.3, ease: EASE }}
          className="absolute inset-x-[50px] bottom-2 top-6"
        >
          <motion.div
            style={{ rotateX, rotateY }}
            className="flex h-full flex-col gap-3 rounded-[28px] bg-white/60 p-4 shadow-[0_40px_80px_-30px_rgba(30,58,138,0.45),0_2px_8px_rgba(15,23,42,0.06)] ring-1 ring-white/80 backdrop-blur-xl"
          >
            {/* Barra superior */}
            <div className="flex items-center gap-2 px-1">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 text-[13px] font-semibold text-ink">Panel DreamBox</span>
              <span className="ml-auto flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500 motion-reduce:animate-none" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </span>
                En vivo
              </span>
            </div>

            <div className="grid flex-1 grid-cols-[1fr_1.15fr] gap-3">
              {/* Sistemas */}
              <Card delay={0.6} className="flex flex-col gap-1 p-3">
                <span className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">Sistemas</span>
                {systems.map(({ Icon, name }, i) => {
                  const busy = ticket.system === i && state === 1
                  return (
                    <motion.div
                      key={name}
                      initial={{ opacity: 0, transform: 'translateX(-8px)' }}
                      animate={{ opacity: 1, transform: 'translateX(0px)' }}
                      transition={{ duration: 0.5, delay: 0.8 + i * 0.08, ease: EASE }}
                      className="flex items-center gap-2 rounded-xl px-1.5 py-1.5"
                    >
                      <span className="grid h-7 w-7 place-items-center rounded-lg bg-brand-soft">
                        <Icon className="h-3.5 w-3.5 text-brand" />
                      </span>
                      <span className="text-[13px] font-medium text-ink">{name}</span>
                      <span
                        className={`ml-auto flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold transition-colors duration-500 ${busy ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-500 ${busy ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                        {busy ? 'Atendiendo' : 'Operando'}
                      </span>
                    </motion.div>
                  )
                })}
              </Card>

              {/* Disponibilidad */}
              <Card delay={0.7} className="flex flex-col p-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">Disponibilidad · 30 días</span>
                <span className="mt-1 text-[34px] font-semibold leading-none tracking-tight text-ink tabular-nums">
                  <Uptime />
                </span>
                <svg viewBox="0 0 200 48" className="mt-auto w-full overflow-visible" fill="none">
                  <defs>
                    <linearGradient id="dash-area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#2f5bea" stopOpacity="0.22" />
                      <stop offset="1" stopColor="#2f5bea" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d={`${SPARK_D} L200 48 L0 48Z`}
                    fill="url(#dash-area)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.6 }}
                  />
                  <motion.path
                    d={SPARK_D}
                    stroke="#2f5bea"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.4, delay: 0.9, ease: EASE }}
                  />
                  <motion.circle
                    cx="200"
                    cy={spark.at(-1) + 4}
                    r="3.5"
                    fill="#2f5bea"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.2 }}
                  />
                  <circle cx="200" cy={spark.at(-1) + 4} r="3.5" fill="#2f5bea" className="animate-ping motion-reduce:hidden" style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
                </svg>
              </Card>
            </div>

            {/* Ticket en curso */}
            <Card delay={0.8} className="relative h-[62px] overflow-hidden px-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {state >= 0 && (
                  <motion.div
                    key={ticket.title}
                    initial={{ opacity: 0, transform: 'translateY(100%)' }}
                    animate={{ opacity: 1, transform: 'translateY(0%)' }}
                    exit={{ opacity: 0, transform: 'translateY(-100%)' }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="flex h-[62px] items-center gap-3"
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-500 ${state === 2 ? 'bg-emerald-500 text-white' : 'bg-brand-soft text-brand'}`}
                    >
                      {state === 2 ? <Check className="h-4.5 w-4.5" strokeWidth={3} /> : <Timer className="h-4.5 w-4.5" />}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-semibold text-ink">{ticket.title}</span>
                      <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-black/5">
                        <motion.span
                          className={`block h-full rounded-full ${state === 2 ? 'bg-emerald-500' : 'bg-brand'}`}
                          initial={{ width: '0%' }}
                          animate={{ width: state === 0 ? '12%' : state === 1 ? '70%' : '100%' }}
                          transition={{ duration: state === 1 ? 1.6 : 0.5, ease: EASE }}
                        />
                      </span>
                    </span>
                    <span className="w-[112px] shrink-0 text-right text-[12px] font-semibold">
                      {state === 0 && <span className="text-brand">Nuevo · {ticket.who}</span>}
                      {state === 1 && <span className="text-amber-600">En proceso…</span>}
                      {state === 2 && <span className="text-emerald-600">Resuelto en {ticket.time}</span>}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        </motion.div>

        {/* Tarjetas flotantes, más cerca de la pantalla: se mueven más con el cursor */}
        <motion.div style={{ x: nearX, y: nearY }} className="pointer-events-none absolute inset-0">
          <motion.div
            initial={{ opacity: 0, transform: 'translateY(12px) scale(0.9)' }}
            animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
            transition={{ type: 'spring', duration: 0.7, bounce: 0.35, delay: 1.3 }}
            className="absolute right-0 top-0 flex animate-float items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_20px_40px_-16px_rgba(30,58,138,0.4)] ring-1 ring-black/5 motion-reduce:animate-none"
          >
            <span className="grid h-8 w-8 place-items-center rounded-xl bg-brand text-white">
              <Timer className="h-4 w-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-[11px] text-ink-subtle">Respuesta promedio</span>
              <span className="block text-[15px] font-semibold text-ink">8 min</span>
            </span>
          </motion.div>

          <AnimatePresence>
            {state === 2 && (
              <motion.div
                key={`ok-${ticket.title}`}
                initial={{ opacity: 0, transform: 'translateY(10px) scale(0.9)' }}
                animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
                exit={{ opacity: 0, transform: 'translateY(-6px) scale(0.96)' }}
                transition={{ type: 'spring', duration: 0.6, bounce: 0.3 }}
                className="absolute bottom-[86px] left-0 flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow-[0_20px_40px_-16px_rgba(30,58,138,0.4)] ring-1 ring-black/5"
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-emerald-500 text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-[13px] font-semibold text-ink">Ticket cerrado</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </FitStage>
  )
}
