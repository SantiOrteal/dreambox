import { motion, useReducedMotion } from 'motion/react'
import { seen } from './Reveal'

// Titular con letras que caen desde arriba y se asientan con un pequeño rebote.
// Sin desenfoque: solo opacidad y transform. La cascada letra a letra da la fluidez.
const LAND = [0.34, 1.56, 0.64, 1] // easeOutBack: aterriza pasando apenas su posición y vuelve

export default function SplitText({ text, as = 'h2', className, delay = 0, stagger = 0.022, trigger = 'view', ...rest }) {
  const reduce = useReducedMotion()
  const Tag = as
  const hidden = reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(-0.6em) rotate(-8deg)' }
  const shown = { opacity: 1, transform: 'translateY(0em) rotate(0deg)' }
  const play = trigger === 'load' ? { animate: shown } : { whileInView: shown, viewport: seen }

  let n = 0
  return (
    <Tag className={className} aria-label={text} {...rest}>
      {text.split(' ').map((word, wi) => (
        <span key={wi} aria-hidden="true">
          {/* Cada palabra no se parte entre líneas */}
          <span className="inline-block whitespace-nowrap">
            {[...word].map((ch, ci) => {
              const i = n++
              return (
                <motion.span
                  key={ci}
                  className="inline-block origin-bottom"
                  initial={hidden}
                  {...play}
                  transition={{
                    opacity: { duration: 0.35, delay: delay + i * stagger, ease: 'easeOut' },
                    transform: { duration: reduce ? 0.3 : 0.75, delay: delay + i * stagger, ease: LAND },
                  }}
                >
                  {ch}
                </motion.span>
              )
            })}
          </span>{' '}
        </span>
      ))}
    </Tag>
  )
}
