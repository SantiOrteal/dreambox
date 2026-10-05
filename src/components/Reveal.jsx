import { motion, useReducedMotion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

// Aparición al entrar en pantalla: sube un poco con una curva larga y suave.
export default function Reveal({ as = 'div', delay = 0, className, children, ...rest }) {
  const reduce = useReducedMotion()
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(28px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: reduce ? 0.3 : 1.1, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Comp>
  )
}
