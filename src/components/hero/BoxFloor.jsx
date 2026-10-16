import { motion, useReducedMotion } from 'motion/react'
import BoxLayer from './BoxLayer'
import { OPEN_AT } from './constants'

// Piso de circuito bajo la caja: una rejilla isométrica que se desvanece hacia los bordes.
// Se ilumina con la caja y, al abrirse, una onda de luz recorre el piso (y se repite de vez en cuando).
// La rejilla se dibuja una sola vez; encenderla es solo la opacidad de su capa. La onda va en su propia capa.
const CX = 200
const CY = 318
const SLOPE = 90 / 160 // inclinación de las aristas de la caja
const STEP = 24
const lines = Array.from({ length: 17 }, (_, i) => (i - 8) * STEP).flatMap((k) => [
  `M-160 ${CY + k + SLOPE * (-160 - CX)}L560 ${CY + k + SLOPE * (560 - CX)}`,
  `M-160 ${CY + k - SLOPE * (-160 - CX)}L560 ${CY + k - SLOPE * (560 - CX)}`,
])
const layer = 'pointer-events-none absolute inset-0'

function Grid({ id, stroke, opacity }) {
  return (
    <BoxLayer>
      <defs>
        <radialGradient id={`${id}Fade`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.55" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id={`${id}Mask`} maskUnits="userSpaceOnUse" x="-160" y="180" width="720" height="280">
          <ellipse cx={CX} cy={CY} rx="320" ry="120" fill={`url(#${id}Fade)`} />
        </mask>
      </defs>
      <g mask={`url(#${id}Mask)`} stroke={stroke} strokeWidth="0.8" strokeOpacity={opacity}>
        {lines.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </BoxLayer>
  )
}

export default function BoxFloor({ glow }) {
  const reduce = useReducedMotion()
  return (
    <>
      {/* Rejilla tenue siempre; la versión clara aparece cuando la caja se enciende */}
      <Grid id="floor" stroke="#4f7cff" opacity="0.14" />
      <motion.div style={{ opacity: glow }} className={layer}>
        <Grid id="floorLit" stroke="#7b9dff" opacity="0.22" />
      </motion.div>

      {/* Onda de luz que sale de la caja al abrirse y luego, cada tanto, otra vez.
          Se apaga sola al crecer, así no necesita la máscara de la rejilla. */}
      {!reduce && (
        <BoxLayer>
          <motion.ellipse
            cx={CX}
            cy={CY}
            fill="none"
            stroke="#7b9dff"
            strokeWidth="2.5"
            initial={{ rx: 40, ry: 22, opacity: 0 }}
            animate={{ rx: [40, 110, 300], ry: [22, 62, 169], opacity: [0, 0.75, 0] }}
            transition={{ duration: 2.2, delay: OPEN_AT + 0.35, ease: [0.22, 1, 0.36, 1], times: [0, 0.25, 1], repeat: Infinity, repeatDelay: 5 }}
          />
        </BoxLayer>
      )}
    </>
  )
}
