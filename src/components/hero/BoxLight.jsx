import { motion, useTransform } from 'motion/react'

const sparkles = [
  { cx: 132, cy: 70, r: 2.5, delay: '0s' },
  { cx: 276, cy: 52, r: 2, delay: '-0.8s' },
  { cx: 236, cy: 18, r: 1.6, delay: '-1.6s' },
  { cx: 156, cy: 28, r: 1.8, delay: '-2.2s' },
]

// Halo detrás de la caja: va dentro del SVG, antes del cuerpo.
export function BoxHalo({ glow }) {
  return <motion.ellipse cx="200" cy="100" rx="240" ry="180" fill="url(#halo)" style={{ opacity: glow }} />
}

// Rayos de luz y destellos que salen del interior cuando se levanta la tapa.
export default function BoxLight({ progress, glow }) {
  const raysTransform = useTransform(progress, [0.14, 0.5], ['scale(1, 0.3)', 'scale(1, 1)'])

  return (
    <>
      <motion.g
        style={{ opacity: glow, transform: raysTransform, transformOrigin: '200px 170px', transformBox: 'view-box' }}
        filter="url(#rayBlur)"
      >
        <path d="M170 170 120 -60h40l30 230Z" fill="url(#ray)" opacity="0.55" />
        <path d="M188 170 178 -90h36l-4 260Z" fill="url(#ray)" opacity="0.8" />
        <path d="M210 170 250 -60h36l-58 230Z" fill="url(#ray)" opacity="0.55" />
      </motion.g>

      <motion.g style={{ opacity: glow }} fill="#ffffff">
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
      </motion.g>
    </>
  )
}
