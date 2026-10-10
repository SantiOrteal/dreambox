import { motion, useTransform } from 'motion/react'
import { STAGE_H, STAGE_W, pieces } from './constants'

// Punto de salida en la abertura de la caja y centro de las tarjetas antes de moverse (px del escenario).
const SX = STAGE_W / 2
const SY = STAGE_H * 0.4
const ANCHOR_Y = STAGE_H * 0.42

// Trazo de energía de la caja a una tarjeta: se dibuja mientras la tarjeta sale y luego,
// cada tanto, un pulso de luz viaja de la caja hacia ella (como en los circuitos del fondo).
// Termina en el centro de la tarjeta, así la tarjeta tapa la punta aunque se mueva con el cursor o al flotar.
function Link({ piece, index, progress, layout }) {
  const { x, y, from } = piece
  const ex = SX + x * layout.spread
  const ey = ANCHOR_Y + y * layout.lift
  const d = `M${SX} ${SY} C${SX + x * 0.15} ${SY - 90} ${ex} ${ey + 70} ${ex} ${ey}`
  const drawn = useTransform(progress, [from + 0.1, from + 0.34], [0, 1])
  const live = useTransform(progress, [0.9, 1], [0, 1])

  return (
    <>
      {/* Trazo con un halo suave debajo (un trazo ancho y transparente, sin desenfoque: es más ligero) */}
      <motion.path d={d} stroke="#4f7cff" strokeOpacity="0.16" strokeWidth="7" strokeLinecap="round" style={{ pathLength: drawn }} />
      <motion.path d={d} stroke="url(#energy)" strokeWidth="2" strokeLinecap="round" style={{ pathLength: drawn }} />
      <motion.g style={{ opacity: live }} className="motion-reduce:hidden">
        {[
          { stroke: '#7b9dff', width: 9, opacity: 0.35 },
          { stroke: '#ffffff', width: 3.5, opacity: 1 },
        ].map((layer) => (
          <path
            key={layer.width}
            d={d}
            pathLength="100"
            stroke={layer.stroke}
            strokeWidth={layer.width}
            strokeLinecap="round"
            strokeDasharray="5 200"
            strokeOpacity={layer.opacity}
            className="animate-pulse-trace [animation-fill-mode:backwards]"
            style={{ animationDuration: `${3.2 + index * 0.5}s`, animationDelay: `${0.4 + index * 0.9}s` }}
          />
        ))}
      </motion.g>
    </>
  )
}

export default function EnergyLinks({ progress, layout }) {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      fill="none"
    >
      <defs>
        <linearGradient id="energy" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#c7d4ff" />
          <stop offset="1" stopColor="#4f7cff" stopOpacity="0.8" />
        </linearGradient>
      </defs>
      {pieces.map((piece, i) => (
        <Link key={i} index={i} piece={piece} progress={progress} layout={layout} />
      ))}
    </svg>
  )
}
