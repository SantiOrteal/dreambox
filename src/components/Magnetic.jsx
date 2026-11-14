import { useRef } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

// Envuelve un botón para que se acerque un poco al cursor cuando pasa cerca y regrese sin rebote al salir.
// Solo con mouse y con movimiento permitido; en táctil no hace nada.
export default function Magnetic({ strength = 0.2, className = 'inline-flex', children }) {
  const root = useRef(null)

  useGSAP(
    (_, contextSafe) => {
      const el = root.current
      if (!window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return

      const x = gsap.quickTo(el, 'x', { duration: 0.3, ease: 'power3' })
      const y = gsap.quickTo(el, 'y', { duration: 0.3, ease: 'power3' })

      const move = contextSafe((e) => {
        const r = el.getBoundingClientRect()
        x((e.clientX - (r.left + r.width / 2)) * strength)
        y((e.clientY - (r.top + r.height / 2)) * strength)
      })
      const leave = contextSafe(() => gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: 'power3.out' }))

      el.addEventListener('pointermove', move)
      el.addEventListener('pointerleave', leave)
      return () => {
        el.removeEventListener('pointermove', move)
        el.removeEventListener('pointerleave', leave)
      }
    },
    { scope: root },
  )

  return (
    <span ref={root} className={className}>
      {children}
    </span>
  )
}
