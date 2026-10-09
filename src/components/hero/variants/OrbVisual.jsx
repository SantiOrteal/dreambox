import { useEffect } from 'react'
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import FitStage from './FitStage'
import { useT } from '../../../i18n'
import { EASE, pieces } from '../constants'

// Variante 3: núcleo luminoso de la marca con los cuatro servicios orbitando en una elipse inclinada.
// Las tarjetas pasan por delante y por detrás del orbe; con el cursor el orbe se desplaza y cambia su brillo.
const W = 600
const H = 420
const CX = W / 2
const CY = 230
const RX = 240
const RY = 86
const TILT = (-10 * Math.PI) / 180

function orbitPoint(deg, spread) {
  const a = (deg * Math.PI) / 180
  const ex = Math.cos(a) * RX * spread
  const ey = Math.sin(a) * RY * spread
  return {
    x: ex * Math.cos(TILT) - ey * Math.sin(TILT),
    y: ex * Math.sin(TILT) + ey * Math.cos(TILT),
    depth: Math.sin(a), // 1 = al frente, -1 = atrás
  }
}

function OrbitChip({ angle, spread, offset, Icon, label }) {
  const pos = (a, s) => orbitPoint(a + offset, s)
  const x = useTransform([angle, spread], ([a, s]) => pos(a, s).x)
  const y = useTransform([angle, spread], ([a, s]) => pos(a, s).y)
  const depth = useTransform(angle, (a) => pos(a, 1).depth)
  const scale = useTransform(depth, [-1, 1], [0.78, 1.08])
  const opacity = useTransform([depth, spread], ([d, s]) => Math.min(1, s * 1.5) * (0.55 + (d + 1) * 0.225))
  const zIndex = useTransform(depth, (d) => (d > 0 ? 30 : 5))
  const blur = useTransform(depth, [-1, -0.2, 1], ['blur(1.5px)', 'blur(0px)', 'blur(0px)'])

  return (
    <motion.div
      style={{ x, y, scale, opacity, zIndex, filter: blur, left: CX, top: CY }}
      className="absolute -ml-[60px] -mt-[26px] flex w-[120px] items-center gap-2 rounded-2xl bg-white/85 px-2.5 py-2 shadow-[0_18px_36px_-16px_rgba(30,58,138,0.45)] ring-1 ring-white backdrop-blur-md"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-linear-to-br from-brand to-[#6d5cff] text-white">
        <Icon className="h-4 w-4" strokeWidth={2} />
      </span>
      <span className="text-[14px] font-semibold text-ink">{label}</span>
    </motion.div>
  )
}

export default function OrbVisual({ pointer, style }) {
  const { hero } = useT()
  const reduce = useReducedMotion()
  const angle = useMotionValue(20)
  const spread = useMotionValue(reduce ? 1 : 0)

  useEffect(() => {
    if (reduce) return
    const s = animate(spread, 1, { type: 'spring', duration: 1.4, bounce: 0.25, delay: 1 })
    // Gira rápido al salir y luego se asienta en una órbita lenta y continua.
    const a = animate(angle, [20, 200], { duration: 2.2, delay: 1, ease: EASE })
    let loop
    a.then(() => {
      loop = animate(angle, [200, 560], { duration: 36, ease: 'linear', repeat: Infinity })
    })
    return () => {
      s.stop()
      a.stop()
      loop?.stop()
    }
  }, [reduce, angle, spread])

  const ox = useTransform(pointer.x, [-1, 1], [-14, 14])
  const oy = useTransform(pointer.y, [-1, 1], [-10, 10])
  const shineX = useTransform(pointer.x, [-1, 1], ['22%', '48%'])
  const shineY = useTransform(pointer.y, [-1, 1], ['18%', '40%'])
  const shine = useTransform(
    [shineX, shineY],
    ([sx, sy]) => `radial-gradient(circle at ${sx} ${sy}, rgba(255,255,255,0.85), rgba(255,255,255,0) 38%)`,
  )
  const ringRotate = useTransform(pointer.x, [-1, 1], [-3, 3])

  return (
    <FitStage width={W} height={H} style={style}>
      <div className="relative h-full w-full">
        {/* Resplandor detrás del orbe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
          className="absolute h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(79,124,255,0.35),rgba(109,92,255,0.12)_45%,transparent_70%)]"
          style={{ left: CX, top: CY }}
        />

        {/* Órbita */}
        <motion.svg
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 h-full w-full overflow-visible"
          fill="none"
          style={{ rotate: ringRotate }}
        >
          <motion.ellipse
            cx={CX}
            cy={CY}
            rx={RX}
            ry={RY}
            transform={`rotate(-10 ${CX} ${CY})`}
            stroke="url(#orb-ring)"
            strokeWidth="2"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.6, delay: 0.8, ease: EASE }}
          />
          <defs>
            <linearGradient id="orb-ring" x1="0" x2="1">
              <stop offset="0" stopColor="#2f5bea" stopOpacity="0.15" />
              <stop offset="0.5" stopColor="#6d5cff" stopOpacity="0.7" />
              <stop offset="1" stopColor="#2f5bea" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Orbe */}
        <motion.div
          style={{ x: ox, y: oy, left: CX, top: CY, zIndex: 20 }}
          className="absolute -ml-[90px] -mt-[90px] h-[180px] w-[180px]"
        >
          <motion.div
            initial={{ opacity: 0, transform: 'scale(0.4)', filter: 'blur(20px)' }}
            animate={{ opacity: 1, transform: 'scale(1)', filter: 'blur(0px)' }}
            transition={{ duration: 1.3, delay: 0.25, ease: EASE }}
            className="h-full w-full"
          >
            <div className="relative h-full w-full animate-[orb-breathe_6s_ease-in-out_infinite] overflow-hidden rounded-full bg-[radial-gradient(circle_at_35%_30%,#c7d4ff,#4f7cff_38%,#2f5bea_62%,#1a2f86)] shadow-[0_40px_90px_-20px_rgba(47,91,234,0.65),inset_0_-20px_40px_rgba(11,26,63,0.45)] motion-reduce:animate-none">
              {/* Remolino de color en el interior */}
              <div className="absolute -inset-1/4 animate-spin bg-[conic-gradient(from_0deg,#6d5cff,#38bdf8,#4f7cff,#a78bfa,#6d5cff)] opacity-70 mix-blend-screen blur-xl [animation-duration:14s] motion-reduce:animate-none" />
              <div className="absolute -inset-1/4 animate-spin bg-[conic-gradient(from_90deg,transparent,#ffffff55,transparent_40%)] blur-xl [animation-direction:reverse] [animation-duration:9s] motion-reduce:animate-none" />
              {/* Reflejo que sigue al cursor */}
              <motion.div className="absolute inset-0" style={{ background: shine }} />
              <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/40" />
            </div>
          </motion.div>
        </motion.div>

        {pieces.map((p, i) => (
          <OrbitChip key={i} angle={angle} spread={spread} offset={i * 90} Icon={p.Icon} label={hero.pieces[i]} />
        ))}
      </div>
    </FitStage>
  )
}
