import { motion, useTransform } from 'motion/react'
import BoxLayer from './BoxLayer'

const sparkles = [
  { cx: 132, cy: 70, r: 2.5, delay: '0s' },
  { cx: 276, cy: 52, r: 2, delay: '-0.8s' },
  { cx: 236, cy: 18, r: 1.6, delay: '-1.6s' },
  { cx: 156, cy: 28, r: 1.8, delay: '-2.2s' },
]

// Chispas que salen de la abertura sin parar, como brasas: cada una con su punto, desvío, tamaño y ritmo.
// Posiciones fijas (no aleatorias) para que el HTML pre-renderizado y el del navegador coincidan.
const embers = [
  { x: 168, y: 150, dx: -18, r: 1.8, dur: 3.2, delay: 0 },
  { x: 214, y: 156, dx: 14, r: 1.4, dur: 3.8, delay: -0.6 },
  { x: 190, y: 146, dx: -6, r: 2.2, dur: 3.4, delay: -1.3 },
  { x: 236, y: 150, dx: 22, r: 1.5, dur: 4.1, delay: -2 },
  { x: 152, y: 156, dx: -26, r: 1.2, dur: 3.6, delay: -2.6 },
  { x: 202, y: 160, dx: 4, r: 1.7, dur: 3, delay: -0.3 },
  { x: 178, y: 162, dx: -12, r: 1.3, dur: 4.4, delay: -1.8 },
  { x: 226, y: 162, dx: 10, r: 2, dur: 3.5, delay: -3.1 },
  { x: 196, y: 152, dx: 18, r: 1.1, dur: 3.9, delay: -2.3 },
  { x: 244, y: 158, dx: 28, r: 1.3, dur: 4.6, delay: -1 },
]

// Capa HTML que cubre exactamente la escena (el SVG de la caja ocupa todo el escenario).
const layer = 'pointer-events-none absolute inset-0'

// Halo detrás de la caja. Aparece con la caja encendida y luego late despacio (solo opacidad de la capa).
export function BoxHalo({ glow }) {
  return (
    <motion.div style={{ opacity: glow }} className={layer}>
      <div className={`${layer} animate-breathe motion-reduce:animate-none`}>
        <BoxLayer>
          <ellipse cx="200" cy="100" rx="240" ry="180" fill="url(#halo)" />
        </BoxLayer>
      </div>
    </motion.div>
  )
}

// Rayos de luz que salen del interior al levantar la tapa. El desenfoque se dibuja una vez;
// el crecimiento, la respiración y el balanceo se aplican a la capa entera.
export function BoxRays({ progress, glow }) {
  const scaleY = useTransform(progress, [0.14, 0.5], [0.3, 1])
  const origin = { transformOrigin: '50% 47.2%' } // (200, 170) en el SVG: la abertura de la caja

  return (
    <motion.div style={{ opacity: glow, scaleY, ...origin }} className={layer}>
      <div className={`${layer} animate-sway motion-reduce:animate-none`} style={origin}>
        <div className={`${layer} animate-breathe motion-reduce:animate-none`}>
          <BoxLayer>
            <g filter="url(#rayBlur)">
              <path d="M170 170 120 -60h40l30 230Z" fill="url(#ray)" opacity="0.55" />
              <path d="M188 170 178 -90h36l-4 260Z" fill="url(#ray)" opacity="0.8" />
              <path d="M210 170 250 -60h36l-58 230Z" fill="url(#ray)" opacity="0.55" />
            </g>
          </BoxLayer>
        </div>
      </div>
    </motion.div>
  )
}

// Destellos y chispas: en su propio SVG pequeño y sin filtros, así redibujarlo cada cuadro es barato.
export function BoxSparks({ glow }) {
  return (
    <motion.div style={{ opacity: glow }} className={layer}>
      <BoxLayer>
        <g fill="#ffffff">
          {sparkles.map((s) => (
            <circle
              key={`${s.cx}-${s.cy}`}
              cx={s.cx}
              cy={s.cy}
              r={s.r}
              className="animate-twinkle motion-reduce:animate-none"
              style={{ animationDelay: s.delay }}
            />
          ))}
        </g>
        {/* Chispas: solo con movimiento (con movimiento reducido no se muestran) */}
        <g className="motion-reduce:hidden">
          {embers.map((e) => (
            <circle
              key={`${e.x}-${e.y}`}
              cx={e.x}
              cy={e.y}
              r={e.r}
              fill={e.r > 1.6 ? '#ffffff' : '#c7d4ff'}
              className="animate-spark [animation-fill-mode:backwards]"
              style={{
                '--dx': `${e.dx}px`,
                animationDuration: `${e.dur}s`,
                animationDelay: `${e.delay}s`,
                transformBox: 'fill-box',
                transformOrigin: 'center',
              }}
            />
          ))}
        </g>
      </BoxLayer>
    </motion.div>
  )
}
