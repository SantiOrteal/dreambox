import { motion, useReducedMotion } from 'motion/react'

// Trazos de circuito (como los del logo) que llegan desde los bordes hacia la caja.
// Se dibujan una vez al cargar y luego recorren pulsos de luz por algunos trazos.
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

export default function CircuitLines() {
  const reduce = useReducedMotion()
  const paths = [...left, ...right]
  const allNodes = [...nodes, ...nodes.map(([x, y]) => [1440 - x, y])]

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
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
          transition={{ duration: 1.6, delay: 0.6 + (i % 4) * 0.12, ease: [0.22, 1, 0.36, 1] }}
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
              style={{ animationDelay: `${2.4 + i * 0.7}s`, opacity: 0.7 }}
            />
          ) : null,
        )}

      {allNodes.map(([cx, cy], i) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="3.5"
          fill="#fbfbfd"
          stroke="#4f7cff"
          strokeOpacity="0.45"
          strokeWidth="1.5"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 1.6 + (i % 4) * 0.1 }}
        />
      ))}
    </svg>
  )
}
