import { motion, useReducedMotion } from 'motion/react'
import { OPEN_AT } from './constants'

// Piso de circuito bajo la caja: una rejilla isométrica que se desvanece hacia los bordes.
// Se ilumina con la caja y, al abrirse, una onda de luz recorre el piso (y se repite de vez en cuando).
// Va al fondo del SVG de la caja, en sus mismas coordenadas (400 x 360).
const CX = 200
const CY = 318
const SLOPE = 90 / 160 // inclinación de las aristas de la caja
const STEP = 24
const lines = Array.from({ length: 17 }, (_, i) => (i - 8) * STEP).flatMap((k) => [
  `M-160 ${CY + k + SLOPE * (-160 - CX)}L560 ${CY + k + SLOPE * (560 - CX)}`,
  `M-160 ${CY + k - SLOPE * (-160 - CX)}L560 ${CY + k - SLOPE * (560 - CX)}`,
])

export default function BoxFloor({ glow }) {
  const reduce = useReducedMotion()
  return (
    <g aria-hidden="true">
      <defs>
        <radialGradient id="floorFade" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="floorMask" maskUnits="userSpaceOnUse" x="-160" y="180" width="720" height="280">
          <ellipse cx={CX} cy={CY} rx="320" ry="120" fill="url(#floorFade)" />
        </mask>
      </defs>

      <g mask="url(#floorMask)">
        {/* Rejilla tenue siempre; se aviva cuando la caja se enciende */}
        <g stroke="#4f7cff" strokeWidth="0.8" strokeOpacity="0.14">
          {lines.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        <motion.g style={{ opacity: glow }} stroke="#7b9dff" strokeWidth="0.8" strokeOpacity="0.22">
          {lines.map((d) => (
            <path key={d} d={d} />
          ))}
        </motion.g>

        {/* Onda de luz que sale de la caja al abrirse y luego, cada tanto, otra vez */}
        {!reduce && (
          <motion.ellipse
            cx={CX}
            cy={CY}
            fill="none"
            stroke="#7b9dff"
            strokeWidth="2.5"
            initial={{ rx: 40, ry: 22, opacity: 0 }}
            animate={{ rx: [40, 320], ry: [22, 180], opacity: [0, 0.85, 0] }}
            transition={{ duration: 2.2, delay: OPEN_AT + 0.35, ease: [0.22, 1, 0.36, 1], repeat: Infinity, repeatDelay: 5 }}
          />
        )}
      </g>
    </g>
  )
}
