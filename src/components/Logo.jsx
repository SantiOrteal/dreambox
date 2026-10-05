import { motion, useReducedMotion } from 'motion/react'
import { useT } from '../i18n'

const EASE = [0.23, 1, 0.32, 1]

// Marca dibujada para el nav: cuatro esquinas de circuito forman una caja alrededor de un chip central.
// Inspirada en el logo original "DREAMBOX DEV" (trazos de circuito con nodos).
const traces = [
  'M4 12V4h8', // esquina superior izquierda
  'M28 12V4h-8', // esquina superior derecha
  'M4 20v8h8', // esquina inferior izquierda
  'M28 20v8h-8', // esquina inferior derecha
  'M12 16H8', // conexión izquierda
  'M20 16h4', // conexión derecha
]
const nodes = [
  [12, 4],
  [20, 4],
  [12, 28],
  [20, 28],
  [7, 16],
  [25, 16],
]

export function LogoMark({ className = 'h-7 w-7', animated = false }) {
  const reduce = useReducedMotion()
  const draw = animated && !reduce
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="none">
      <defs>
        <linearGradient id="dbx-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2f5bea" />
          <stop offset="1" stopColor="#6d5cff" />
        </linearGradient>
      </defs>
      {traces.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="url(#dbx-grad)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={draw ? { pathLength: 0 } : false}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, delay: 0.1 + i * 0.05, ease: EASE }}
        />
      ))}
      {nodes.map(([cx, cy], i) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          r="1.7"
          fill="url(#dbx-grad)"
          initial={draw ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25, delay: 0.5 + i * 0.04 }}
        />
      ))}
      <motion.rect
        x="12"
        y="12"
        width="8"
        height="8"
        rx="2"
        fill="url(#dbx-grad)"
        style={{ transformOrigin: '16px 16px' }}
        initial={draw ? { opacity: 0, scale: 0.6 } : false}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', duration: 0.5, bounce: 0.2, delay: 0.35 }}
      />
    </svg>
  )
}

// Logo original de DreamBox Dev (public/brand/logo-original.jpg), recortado y adaptado al fondo.
//  - logo-wordmark-dark.png: para fondos claros
//  - logo-wordmark-light.png: colores originales, para fondos oscuros
const originals = {
  dark: '/brand/logo-wordmark-dark.png',
  light: '/brand/logo-wordmark-light.png',
}
const RATIO = 692 / 111

function OriginalLogo({ tone, height }) {
  return (
    <img
      src={originals[tone]}
      alt="DreamBox Dev"
      width={Math.round(height * RATIO)}
      height={height}
      style={{ height, width: 'auto' }}
      draggable="false"
    />
  )
}

// variant="mark": marca dibujada + texto (nav). variant="original": imagen del logo original (footer).
export default function Logo({ className = '', animated = false, tone = 'dark', variant = 'mark', height = 30, href = '#inicio' }) {
  const t = useT()
  return (
    <a href={href} className={`group flex items-center gap-2 ${className}`} aria-label={t.common.logoLabel}>
      {variant === 'original' ? (
        <OriginalLogo tone={tone} height={height} />
      ) : (
        <>
          <LogoMark animated={animated} />
          <span className="flex items-baseline gap-1.5 leading-none">
            <span className={`text-[15px] font-semibold tracking-[0.12em] ${tone === 'light' ? 'text-white' : 'text-ink'}`}>
              DREAMBOX
            </span>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-brand">DEV</span>
          </span>
        </>
      )}
    </a>
  )
}
