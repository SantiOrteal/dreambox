import { motion, useReducedMotion, useTransform } from 'motion/react'
import { CHARGE_AT, CHARGE_DURATION, TRACE_AT } from './constants'

// Trazos de circuito (como los del logo) que llegan desde los bordes hacia la caja.
// Se dibujan al cargar; luego un pulso de luz corre por todos a la vez hasta la caja (la "enciende")
// y después siguen pasando pulsos sueltos, como energía que alimenta los servicios.
const left = [
  'M0 610H250l60-60h150',
  'M0 700H190l60 60h170',
  'M90 900V810l60-60h200',
  'M0 520h120l40-40h120',
]
const right = [
  'M1440 610H1190l-60-60h-150',
  'M1440 700H1250l-60 60h-170',
  'M1350 900V810l-60-60h-200',
  'M1440 520h-120l-40-40h-120',
]

const nodes = [
  [460, 550],
  [420, 760],
  [350, 750],
  [280, 480],
]

const charged = CHARGE_AT + CHARGE_DURATION

export default function CircuitLines({ pointer }) {
  const reduce = useReducedMotion()
  const paths = [...left, ...right]
  const allNodes = [...nodes, ...nodes.map(([x, y]) => [1440 - x, y])]
  // Al fondo: se mueve poco y en sentido contrario al cursor.
  const x = useTransform(pointer.x, [-1, 1], [10, -10])
  const y = useTransform(pointer.y, [-1, 1], [6, -6])

  return (
    <motion.svg
      aria-hidden="true"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
      style={{ x, y }}
    >
      <defs>
        <linearGradient id="trace" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2f5bea" stopOpacity="0.05" />
          <stop offset="0.35" stopColor="#2f5bea" stopOpacity="0.28" />
          <stop offset="0.65" stopColor="#6d5cff" stopOpacity="0.28" />
          <stop offset="1" stopColor="#6d5cff" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {paths.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="url(#trace)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: TRACE_AT + (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}

      {/* Carga: un pulso por trazo, todos llegan juntos a la caja */}
      {!reduce &&
        paths.map((d, i) => (
          <motion.path
            key={`c-${d}`}
            d={d}
            pathLength="100"
            stroke={i < left.length ? '#4f7cff' : '#6d5cff'}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="14 200"
            initial={{ strokeDashoffset: 14, opacity: 0 }}
            animate={{ strokeDashoffset: -100, opacity: [0, 1, 1, 0] }}
            transition={{
              duration: CHARGE_DURATION,
              delay: CHARGE_AT,
              ease: 'easeIn',
              opacity: { duration: CHARGE_DURATION, delay: CHARGE_AT, times: [0, 0.1, 0.85, 1] },
            }}
          />
        ))}

      {/* Pulsos: un tramo corto de luz que viaja por el trazo, en bucle */}
      {!reduce &&
        paths.map((d, i) =>
          i % 2 === 0 ? (
            <path
              key={`p-${d}`}
              d={d}
              pathLength="100"
              stroke={i < left.length ? '#4f7cff' : '#6d5cff'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="6 200"
              className="animate-pulse-trace [animation-fill-mode:backwards] motion-reduce:hidden"
              style={{ animationDelay: `${charged + 1.2 + i * 0.7}s`, opacity: 0.7 }}
            />
          ) : null,
        )}

      {/* Nodos: aparecen con los trazos y destellan cuando pasa la carga */}
      {allNodes.map(([cx, cy], i) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="3.5"
          stroke="#4f7cff"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial={reduce ? false : { opacity: 0, scale: 0.4, fill: '#fbfbfd' }}
          animate={
            reduce
              ? { opacity: 1, fill: '#fbfbfd' }
              : { opacity: 1, scale: [0.4, 1, 1, 1.8, 1], fill: ['#fbfbfd', '#fbfbfd', '#fbfbfd', '#9fb5ff', '#fbfbfd'] }
          }
          transition={{
            duration: charged + 0.5 - (TRACE_AT + 0.6),
            delay: TRACE_AT + 0.6 + (i % 4) * 0.04,
            times: [0, 0.15, 0.5, 0.6, 1],
          }}
        />
      ))}
    </motion.svg>
  )
}
