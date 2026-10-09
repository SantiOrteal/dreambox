import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check, CloudUpload, FileText, Globe, Headset, Lock, Sparkles } from 'lucide-react'
import FitStage from './FitStage'
import useCycle from './useCycle'
import { EASE } from '../constants'

// Variante 4: cuadrícula bento. Cada tarjeta muestra un servicio funcionando en bucle:
// soporte (chat que se resuelve), web (sitio que carga), IA (prompt y respuesta), nube (respaldo que sube).
// Con el cursor, cada tarjeta tiene un reflejo que lo sigue.
const W = 660
const H = 400

const pop = {
  initial: { opacity: 0, transform: 'translateY(8px) scale(0.96)' },
  animate: { opacity: 1, transform: 'translateY(0px) scale(1)' },
  exit: { opacity: 0, transform: 'translateY(-4px) scale(0.98)' },
  transition: { duration: 0.4, ease: EASE },
}

function BentoCard({ index, Icon, title, className, children }) {
  function onMove(e) {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
    e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
  }
  return (
    <motion.div
      initial={{ opacity: 0, transform: 'translateY(24px) scale(0.95)', filter: 'blur(6px)' }}
      animate={{ opacity: 1, transform: 'translateY(0px) scale(1)', filter: 'blur(0px)' }}
      transition={{ duration: 0.8, delay: 0.35 + index * 0.12, ease: EASE }}
      onPointerMove={onMove}
      className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white/75 p-3.5 shadow-[0_24px_50px_-28px_rgba(30,58,138,0.5)] ring-1 ring-black/5 backdrop-blur-xl ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(240px_circle_at_var(--mx)_var(--my),rgba(79,124,255,0.14),transparent_70%)]" />
      <div className="relative mb-2.5 flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-linear-to-br from-brand to-[#6d5cff] text-white">
          <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
        </span>
        <span className="text-[13px] font-semibold text-ink">{title}</span>
      </div>
      <div className="relative flex-1">{children}</div>
    </motion.div>
  )
}

// Soporte: el cliente reporta, el equipo responde y lo resuelve.
const CHAT = [1100, 1100, 1400, 2800, 450]
function SupportChat() {
  const step = useCycle(CHAT, { startDelay: 1200, still: 3 })
  return (
    <div className="flex h-full flex-col justify-end gap-1.5 text-[12.5px] leading-snug">
      <AnimatePresence mode="popLayout">
        {step >= 0 && step < 4 && (
          <motion.div key="q" {...pop} className="max-w-[85%] self-start rounded-2xl rounded-bl-md bg-black/5 px-3 py-2 text-ink">
            Se cayó el correo de todo el equipo 😩
          </motion.div>
        )}
        {step === 1 && (
          <motion.div key="typing" {...pop} className="flex gap-1 self-end rounded-2xl rounded-br-md bg-brand px-3 py-2.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/80" style={{ animationDelay: `${i * 0.12}s` }} />
            ))}
          </motion.div>
        )}
        {step >= 2 && step < 4 && (
          <motion.div key="a1" {...pop} className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-brand px-3 py-2 text-white">
            Ya lo vimos: era el DNS. Lo estamos corrigiendo.
          </motion.div>
        )}
        {step === 3 && (
          <motion.div key="a2" {...pop} className="max-w-[85%] self-end rounded-2xl rounded-br-md bg-brand px-3 py-2 text-white">
            Listo, ya les llegan los correos ✅
          </motion.div>
        )}
        {step === 3 && (
          <motion.div key="ok" {...pop} className="mt-1 flex items-center gap-1.5 self-center rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
            <Check className="h-3 w-3" strokeWidth={3} /> Resuelto en 6 min
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Web: el sitio carga (esqueleto → contenido) y marca su rendimiento.
const WEB = [1500, 3200]
function WebPreview() {
  const step = useCycle(WEB, { startDelay: 900, still: 1 })
  const loaded = step === 1
  return (
    <div className="flex h-full gap-3">
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl bg-white ring-1 ring-black/5">
        <div className="flex items-center gap-1.5 border-b border-black/5 px-2.5 py-1.5">
          <Lock className="h-2.5 w-2.5 text-emerald-600" />
          <span className="text-[10.5px] text-ink-subtle">tuempresa.mx</span>
          <motion.span
            key={step}
            className="ml-auto h-0.5 rounded-full bg-brand"
            initial={{ width: 0, opacity: 1 }}
            animate={{ width: loaded ? 40 : 30, opacity: loaded ? 0 : 1 }}
            transition={{ duration: loaded ? 0.5 : 1.4 }}
          />
        </div>
        <div className="relative flex-1 p-2">
          <div className={`h-9 rounded-lg transition-colors duration-700 ${loaded ? 'bg-linear-to-r from-brand to-[#6d5cff]' : 'animate-pulse bg-black/6'}`} />
          <div className="mt-1.5 grid grid-cols-3 gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-7 rounded-md transition-colors duration-700 ${loaded ? 'bg-brand-soft' : 'animate-pulse bg-black/6'}`}
                style={{ transitionDelay: loaded ? `${150 + i * 100}ms` : '0ms' }}
              />
            ))}
          </div>
          <div className={`mt-1.5 h-1.5 w-2/3 rounded-full transition-colors duration-700 ${loaded ? 'bg-ink/15' : 'animate-pulse bg-black/6'}`} />
        </div>
      </div>
      <div className="flex w-[92px] flex-col items-center justify-center gap-1">
        <svg viewBox="0 0 44 44" className="h-16 w-16 -rotate-90">
          <circle cx="22" cy="22" r="18" stroke="rgba(0,0,0,0.06)" strokeWidth="4" fill="none" />
          <motion.circle
            cx="22"
            cy="22"
            r="18"
            stroke="#10b981"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: loaded ? 0.98 : 0 }}
            transition={{ duration: loaded ? 1.2 : 0.3, ease: EASE }}
          />
        </svg>
        <span className="-mt-11 mb-5 text-[17px] font-semibold text-ink tabular-nums">{loaded ? 98 : '–'}</span>
        <span className="text-[10.5px] font-medium text-ink-subtle">Rendimiento</span>
      </div>
    </div>
  )
}

// IA: se escribe una pregunta y aparece la respuesta.
const PROMPT = 'Resume las ventas de octubre'
const AI = [2200, 700, 2800]
function AiPrompt() {
  const reduce = useReducedMotion()
  const step = useCycle(AI, { startDelay: 1500, still: 2 })
  const [chars, setChars] = useState(reduce ? PROMPT.length : 0)

  useEffect(() => {
    if (reduce) return
    if (step !== 0) return
    setChars(0)
    const id = setInterval(() => setChars((c) => (c >= PROMPT.length ? c : c + 1)), 55)
    return () => clearInterval(id)
  }, [step, reduce])

  return (
    <div className="flex h-full flex-col gap-1.5">
      <div className="truncate rounded-xl bg-white px-2.5 py-1.5 text-[12px] text-ink ring-1 ring-black/5">
        {step === -1 ? '' : PROMPT.slice(0, step === 0 ? chars : PROMPT.length)}
        <span className="ml-0.5 inline-block h-3 w-px translate-y-0.5 animate-pulse bg-brand" />
      </div>
      {step === 1 && (
        <div className="flex items-center gap-1.5 text-[11px] font-medium text-brand">
          <Sparkles className="h-3 w-3 animate-spin [animation-duration:2s]" /> Analizando…
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col gap-1">
          {[
            ['Ventas', '+18%', 0.9],
            ['Clientes nuevos', '+42', 0.65],
            ['Ticket promedio', '+6%', 0.45],
          ].map(([k, v, f], i) => (
            <motion.div key={k} {...pop} transition={{ ...pop.transition, delay: i * 0.15 }} className="text-[11px]">
              <div className="flex justify-between text-ink-muted">
                <span>{k}</span>
                <span className="font-semibold text-ink">{v}</span>
              </div>
              <div className="mt-0.5 h-1 overflow-hidden rounded-full bg-black/5">
                <motion.div
                  className="h-full rounded-full bg-linear-to-r from-brand to-[#6d5cff]"
                  initial={{ width: 0 }}
                  animate={{ width: `${f * 100}%` }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.15, ease: EASE }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

// Nube: archivos que se respaldan uno tras otro.
const FILES = ['Facturas.xlsx', 'Contratos.pdf', 'Nómina.csv']
const CLOUD = [2600, 2400]
function CloudBackup() {
  const step = useCycle(CLOUD, { startDelay: 1800, still: 1 })
  return (
    <div className="flex h-full flex-col gap-1.5">
      {FILES.map((f, i) => (
        <div key={f} className="flex items-center gap-2 rounded-lg bg-white px-2 py-1.5 ring-1 ring-black/5">
          <FileText className="h-3.5 w-3.5 shrink-0 text-brand" />
          <span className="min-w-0 flex-1">
            <span className="block truncate text-[11px] font-medium text-ink">{f}</span>
            <span className="mt-0.5 block h-1 overflow-hidden rounded-full bg-black/5">
              <motion.span
                key={`${f}-${step}`}
                className={`block h-full rounded-full ${step === 1 ? 'bg-emerald-500' : 'bg-brand'}`}
                initial={{ width: step === 1 ? '100%' : '0%' }}
                animate={{ width: step === -1 ? '0%' : '100%' }}
                transition={{ duration: 0.9, delay: step === 0 ? i * 0.55 : 0, ease: 'easeInOut' }}
              />
            </span>
          </span>
          {step === 1 && <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={3} />}
        </div>
      ))}
      <div className="mt-auto text-center text-[11px] font-semibold">
        {step === 1 ? <span className="text-emerald-600">Respaldo al día ✓</span> : <span className="text-brand">Subiendo…</span>}
      </div>
    </div>
  )
}

export default function BentoVisual({ style }) {
  return (
    <FitStage width={W} height={H} style={style}>
      <div className="grid h-full w-full grid-cols-[1fr_1fr_1fr] grid-rows-[1fr_1.1fr] gap-3 p-1">
        <BentoCard index={0} Icon={Headset} title="Soporte" className="row-span-2">
          <SupportChat />
        </BentoCard>
        <BentoCard index={1} Icon={Globe} title="Web" className="col-span-2">
          <WebPreview />
        </BentoCard>
        <BentoCard index={2} Icon={Sparkles} title="IA">
          <AiPrompt />
        </BentoCard>
        <BentoCard index={3} Icon={CloudUpload} title="Nube">
          <CloudBackup />
        </BentoCard>
      </div>
    </FitStage>
  )
}
