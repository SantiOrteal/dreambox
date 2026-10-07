import { motion, useReducedMotion, useTransform } from 'motion/react'
import FitStage from './FitStage'
import { useT } from '../../../i18n'
import { CHARGE_AT, CHARGE_DURATION, EASE, pieces } from '../constants'

// Variante 5: la marca de DreamBox en grande. Sus trazos se dibujan mientras los circuitos del fondo
// la alimentan; cuando llega el pulso, el chip central se enciende y de las esquinas salen los servicios.
// Luego la marca respira y la recorren pulsos de luz.
const W = 560
const H = 400
const SIZE = 250 // lado de la marca, en px del escenario
const U = SIZE / 32 // px por unidad del logo
const ON = CHARGE_AT + CHARGE_DURATION

const traces = ['M4 12V4h8', 'M28 12V4h-8', 'M4 20v8h8', 'M28 20v8h-8', 'M12 16H8', 'M20 16h4']
const nodes = [
  [12, 4],
  [20, 4],
  [12, 28],
  [20, 28],
  [7, 16],
  [25, 16],
]
// Servicio que sale de cada esquina: [x, y] del nodo de salida (logo) y desplazamiento final (px).
const tags = [
  { at: [4, 4], dx: -90, dy: -36 },
  { at: [28, 4], dx: 90, dy: -36 },
  { at: [4, 28], dx: -90, dy: 30 },
  { at: [28, 28], dx: 90, dy: 30 },
]

export default function LogoVisual({ pointer, style }) {
  const { hero } = useT()
  const reduce = useReducedMotion()
  const rotateY = useTransform(pointer.x, [-1, 1], [-12, 12])
  const rotateX = useTransform(pointer.y, [-1, 1], [9, -9])
  const chipX = useTransform(pointer.x, [-1, 1], [-6, 6])
  const chipY = useTransform(pointer.y, [-1, 1], [-6, 6])
  const left = W / 2 - SIZE / 2
  const top = H / 2 - SIZE / 2 + 10

  return (
    <FitStage width={W} height={H} style={style}>
      <div className="relative h-full w-full perspective-[1000px]">
        {/* Resplandor que se enciende con la carga y luego respira */}
        <motion.div
          className="absolute rounded-full bg-[radial-gradient(circle,rgba(79,124,255,0.4),rgba(109,92,255,0.15)_45%,transparent_70%)]"
          style={{ left: W / 2 - 220, top: top + SIZE / 2 - 220, width: 440, height: 440 }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={reduce ? { opacity: 1, scale: 1 } : { opacity: [0, 1, 0.75, 1], scale: [0.5, 1.15, 0.95, 1] }}
          transition={{ duration: 1.6, delay: ON - 0.1, times: [0, 0.2, 0.6, 1], ease: 'easeOut' }}
        />

        {/* Onda expansiva al encenderse */}
        {!reduce &&
          [0, 0.18].map((d) => (
            <motion.div
              key={d}
              className="absolute rounded-[28%] border-2 border-brand-light"
              style={{ left, top, width: SIZE, height: SIZE }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: [0, 0.6, 0], scale: [0.6, 1.5] }}
              transition={{ duration: 1.3, delay: ON + d, ease: 'easeOut' }}
            />
          ))}

        <motion.div style={{ rotateX, rotateY, left, top, width: SIZE, height: SIZE }} className="absolute transform-3d">
          <svg viewBox="0 0 32 32" className="h-full w-full overflow-visible" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="logo-v-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#2f5bea" />
                <stop offset="1" stopColor="#6d5cff" />
              </linearGradient>
              <filter id="logo-v-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="0.8" />
              </filter>
            </defs>

            {/* Trazos: primero una guía tenue, luego el trazo de color */}
            {traces.map((d, i) => (
              <g key={d}>
                <path d={d} stroke="#2f5bea" strokeOpacity="0.1" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                <motion.path
                  d={d}
                  stroke="url(#logo-v-grad)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.9, delay: 0.5 + i * 0.1, ease: EASE }}
                />
                {/* Pulso que recorre el trazo en bucle */}
                {!reduce && (
                  <motion.path
                    d={d}
                    pathLength="1"
                    stroke="#ffffff"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                    strokeDasharray="0.18 1.2"
                    filter="url(#logo-v-glow)"
                    initial={{ strokeDashoffset: 0.18, opacity: 0 }}
                    animate={{ strokeDashoffset: -1, opacity: 1 }}
                    transition={{
                      strokeDashoffset: { duration: 1.6, delay: ON + 0.6 + i * 0.35, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' },
                      opacity: { duration: 0.2, delay: ON + 0.6 + i * 0.35 },
                    }}
                  />
                )}
              </g>
            ))}

            {nodes.map(([cx, cy], i) => (
              <motion.circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r="1.3"
                fill="url(#logo-v-grad)"
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                initial={reduce ? false : { opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', duration: 0.5, bounce: 0.5, delay: 1.1 + i * 0.06 }}
              />
            ))}
          </svg>

          {/* Chip central: se enciende con la carga y flota un poco por delante */}
          <motion.div
            style={{ x: chipX, y: chipY, left: 12 * U, top: 12 * U, width: 8 * U, height: 8 * U }}
            className="absolute"
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.3, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', duration: 0.7, bounce: 0.45, delay: ON - 0.05 }}
              className="relative h-full w-full overflow-hidden rounded-[22%] bg-linear-to-br from-brand to-[#6d5cff] shadow-[0_18px_40px_-8px_rgba(79,92,240,0.7)]"
            >
              {/* Brillo que barre el chip */}
              <div className="absolute inset-y-0 -left-full w-full animate-[chip-shine_3.2s_ease-in-out_infinite] bg-linear-to-r from-transparent via-white/45 to-transparent [animation-delay:2.4s] motion-reduce:hidden" />
              <div className="absolute inset-[22%] rounded-[18%] border border-white/40" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Servicios que salen de las esquinas */}
        {tags.map(({ at: [lx, ly], dx, dy }, i) => {
          const { Icon } = pieces[i]
          return (
            <motion.div
              key={i}
              className="absolute -ml-[56px] -mt-[18px] flex w-[112px] items-center gap-2 rounded-full bg-white/90 py-1.5 pl-1.5 pr-3.5 shadow-[0_14px_30px_-14px_rgba(30,58,138,0.5)] ring-1 ring-black/5 backdrop-blur-md"
              style={{ left: left + lx * U, top: top + ly * U }}
              initial={reduce ? false : { opacity: 0, x: 0, y: 0, scale: 0.4 }}
              animate={{ opacity: 1, x: dx, y: dy, scale: 1 }}
              transition={{ type: 'spring', duration: 0.9, bounce: 0.35, delay: ON + 0.25 + i * 0.1 }}
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-soft">
                <Icon className="h-3.5 w-3.5 text-brand" strokeWidth={2} />
              </span>
              <span className="text-[13.5px] font-semibold text-ink">{hero.pieces[i]}</span>
            </motion.div>
          )
        })}
      </div>
    </FitStage>
  )
}
