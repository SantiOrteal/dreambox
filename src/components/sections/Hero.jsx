import { useRef } from 'react'
import { useMotionValue, useReducedMotion, useScroll, useSpring } from 'motion/react'
import BoxStage from '../hero/BoxStage'
import CircuitLines from '../hero/CircuitLines'
import HeroCopy from '../hero/HeroCopy'
import ScrollCue from '../hero/ScrollCue'

// Hero fijo en pantalla: mientras el usuario hace scroll, la caja de DreamBox se abre
// y salen los servicios. Con movimiento reducido, la caja se muestra ya abierta y sin sección fija.
export default function Hero() {
  const section = useRef(null)
  const reduce = useReducedMotion()

  // Progreso 0 = caja cerrada arriba de la página; 1 = final de la sección fija.
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end end'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6, restDelta: 0.0005 })
  const opened = useMotionValue(1)

  return (
    <section ref={section} id="inicio" className={`relative ${reduce ? '' : 'h-[260vh]'}`}>
      <div
        className={`${reduce ? 'min-h-[100dvh]' : 'sticky top-0 h-[100dvh]'} relative flex flex-col items-center justify-center overflow-hidden pb-5 pt-[4.5rem] max-sm:[@media(max-height:620px)]:pb-3 max-sm:[@media(max-height:620px)]:pt-16`}
      >
        <CircuitLines />
        <HeroCopy />
        <BoxStage progress={reduce ? opened : smooth} />
        {!reduce && <ScrollCue progress={smooth} sectionRef={section} />}
      </div>
    </section>
  )
}
