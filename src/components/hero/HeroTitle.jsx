import { motion, useReducedMotion } from 'motion/react'
import { EASE } from './constants'

// Titular que se revela palabra por palabra: cada una sube desde detrás de una máscara
// y se enfoca (de borroso a nítido). El último tramo, después de la coma, lleva el degradado de la marca.
export default function HeroTitle({ text, delay = 0, stagger = 0.06, className }) {
  const reduce = useReducedMotion()
  const comma = text.indexOf(',')
  const words = text.split(' ')
  const accentFrom = comma === -1 ? words.length : text.slice(0, comma + 1).split(' ').length

  return (
    <h1 className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} aria-hidden="true">
          {/* La máscara deja espacio arriba y abajo para acentos y descendentes (í, g, p, y) */}
          <span className="-my-[0.12em] inline-block overflow-hidden py-[0.12em] align-bottom">
            <motion.span
              className={`inline-block ${i >= accentFrom ? 'text-gradient' : ''}`}
              initial={reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(105%)', filter: 'blur(8px)' }}
              animate={{ opacity: 1, transform: 'translateY(0%)', filter: 'blur(0px)' }}
              transition={{ duration: reduce ? 0.3 : 0.9, delay: delay + i * stagger, ease: EASE }}
            >
              {word}
            </motion.span>
          </span>{' '}
        </span>
      ))}
    </h1>
  )
}
