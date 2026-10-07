import { motion, useReducedMotion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

// Zona de "ya se vio": el área visible (menos el 8% inferior) y todo lo que queda arriba de ella.
// Así, si el scroll pasa rápido por encima de un bloque sin detenerse, al quedar arriba también se muestra
// y nunca se queda vacío esperando a que vuelvas a subir.
export const seen = { once: true, margin: '100000px 0px -8% 0px' }

// Aparición al entrar en pantalla: sube un poco con una curva larga y suave.
export default function Reveal({ as = 'div', delay = 0, className, children, ...rest }) {
  const reduce = useReducedMotion()
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(28px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={seen}
      transition={{ duration: reduce ? 0.3 : 1.1, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  )
}
