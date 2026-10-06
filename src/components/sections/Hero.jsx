import { useEffect, useRef } from 'react'
import { animate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import BoxStage from '../hero/BoxStage'
import CircuitLines from '../hero/CircuitLines'
import HeroCopy from '../hero/HeroCopy'
import ScrollCue from '../hero/ScrollCue'
import { OPEN_AT, OPEN_DURATION } from '../hero/constants'

// Hero de una pantalla: al cargar, los circuitos llevan un pulso de luz hasta la caja,
// la caja se enciende, se destapa sola y salen los servicios. Después sigue al cursor con parallax.
// Al hacer scroll el hero solo se desvanece y se aleja; no se queda fijo.
export default function Hero() {
  const section = useRef(null)
  const reduce = useReducedMotion()

  // Progreso de apertura de la caja: 0 = cerrada, 1 = abierta con los servicios afuera.
  const opened = useMotionValue(reduce ? 1 : 0)
  useEffect(() => {
    if (reduce) {
      opened.set(1)
      return
    }
    // Lineal: cada pieza (tapa, luz, tarjetas) aplica su propia curva sobre su tramo.
    const controls = animate(opened, 1, { duration: OPEN_DURATION, delay: OPEN_AT, ease: 'linear' })
    return () => controls.stop()
  }, [reduce, opened])

  // Cursor en -1..1 respecto al centro del hero (solo con mouse; en táctil se queda en 0).
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const pointer = {
    x: useSpring(px, { stiffness: 60, damping: 18, mass: 0.8 }),
    y: useSpring(py, { stiffness: 60, damping: 18, mass: 0.8 }),
  }
  function onPointerMove(e) {
    if (reduce || e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    px.set(((e.clientX - r.left) / r.width) * 2 - 1)
    py.set(((e.clientY - r.top) / r.height) * 2 - 1)
  }
  function onPointerLeave() {
    px.set(0)
    py.set(0)
  }

  // Salida al hacer scroll: el texto sube y se desvanece, la caja baja y se aleja un poco.
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] })
  const copyStyle = {
    y: useTransform(scrollYProgress, [0, 0.6], [0, -60]),
    opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]),
  }
  const stageStyle = {
    y: useTransform(scrollYProgress, [0, 1], [0, 140]),
    scale: useTransform(scrollYProgress, [0, 1], [1, 0.9]),
    opacity: useTransform(scrollYProgress, [0.3, 0.9], [1, 0]),
  }

  return (
    <section ref={section} id="inicio" className="relative">
      <div
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="relative flex h-dvh min-h-[560px] flex-col items-center justify-center overflow-hidden pb-5 pt-18 max-sm:[@media(max-height:620px)]:pb-3 max-sm:[@media(max-height:620px)]:pt-16"
      >
        <CircuitLines pointer={pointer} />
        <HeroCopy style={reduce ? undefined : copyStyle} />
        <BoxStage progress={opened} pointer={pointer} style={reduce ? undefined : stageStyle} />
        <ScrollCue progress={scrollYProgress} />
      </div>
    </section>
  )
}
