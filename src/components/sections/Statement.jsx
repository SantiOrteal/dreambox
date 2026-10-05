import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react'
import { useT } from '../../i18n'

// Storytelling en pantalla completa. El scroll solo elige qué frase se muestra;
// el cambio entre frases es una transición con tiempo propio, así se ve igual de suave
// sin importar la velocidad de la rueda o del dedo.
const EASE = [0.22, 1, 0.36, 1]

function Phrase({ text, last }) {
  const words = text.split(' ')
  return (
    <motion.p
      className={`absolute inset-x-5 text-center font-semibold tracking-[-0.035em] ${
        last
          ? 'text-[2.75rem] leading-[1.02] text-brand sm:text-7xl sm:leading-none md:text-[6.5rem]'
          : 'text-[2.25rem] leading-[1.06] text-ink sm:text-6xl sm:leading-none md:text-[5rem]'
      }`}
      aria-hidden="true"
      exit={{ opacity: 0, transform: 'translateY(-48px)', transition: { duration: 0.45, ease: EASE } }}
    >
      {words.map((w, i) => (
        <span key={i}>
          <span className="mb-[-0.14em] mt-[-0.1em] inline-block overflow-hidden pb-[0.14em] pt-[0.1em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ transform: 'translateY(110%)', opacity: 0 }}
              animate={{ transform: 'translateY(0%)', opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.12 + i * 0.05, ease: EASE }}
            >
              {w}
            </motion.span>
          </span>{' '}
        </span>
      ))}
    </motion.p>
  )
}

export default function Statement() {
  const { story: copy } = useT()
  const story = copy.lines
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const inView = useInView(ref, { amount: 0.25 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setIndex(Math.min(story.length - 1, Math.max(0, Math.floor(v * story.length * 1.05))))
  })

  if (reduce) {
    return (
      <section ref={ref} aria-label={copy.label} className="py-28 md:py-40">
        <div className="wrap space-y-6 text-center">
          {story.map((t, i) => (
            <p
              key={t}
              className={`font-semibold tracking-[-0.03em] ${i === story.length - 1 ? 'text-5xl text-brand md:text-7xl' : 'text-3xl text-ink md:text-5xl'}`}
            >
              {t}
            </p>
          ))}
        </div>
      </section>
    )
  }

  const last = index === story.length - 1

  return (
    <section ref={ref} aria-label={copy.label} className="relative h-[320vh]">
      <h2 className="sr-only">{story.join(' ')}</h2>
      <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden">
        {/* Halo que acompaña la respuesta final */}
        <motion.div
          aria-hidden="true"
          animate={{ opacity: last ? 1 : 0, transform: last ? 'scale(1)' : 'scale(0.8)' }}
          transition={{ duration: 1.2, ease: EASE }}
          className="pointer-events-none absolute left-1/2 top-1/2 ml-[-300px] mt-[-300px] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(79,124,255,0.22),transparent_65%)]"
        />

        <div className="relative flex w-full max-w-[1200px] items-center justify-center" style={{ minHeight: '40vh' }}>
          <AnimatePresence>{inView && <Phrase key={index} text={story[index]} last={last} />}</AnimatePresence>
        </div>

        <motion.p
          animate={{ opacity: last ? 1 : 0, transform: last ? 'translateY(0px)' : 'translateY(16px)' }}
          transition={{ duration: 0.8, delay: last ? 0.5 : 0, ease: EASE }}
          className="absolute inset-x-5 bottom-[18%] mx-auto max-w-lg text-center text-[19px] leading-[1.45] text-ink-muted sm:text-[21px]"
        >
          {copy.tagline}
        </motion.p>

        {/* Progreso de la historia */}
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2" aria-hidden="true">
          {story.map((t, i) => (
            <span key={t} className="relative h-1 w-8 overflow-hidden rounded-full bg-black/10">
              <motion.span
                initial={false}
                animate={{ transform: i <= index ? 'scaleX(1)' : 'scaleX(0)' }}
                transition={{ duration: 0.5, ease: EASE }}
                className="absolute inset-0 origin-left rounded-full bg-ink"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
