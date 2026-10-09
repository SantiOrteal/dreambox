import { useEffect } from 'react'
import { animate, useMotionValue, useReducedMotion } from 'motion/react'
import BoxStage from '../BoxStage'
import { OPEN_AT, OPEN_DURATION } from '../constants'

// Variante 0: la caja que se abre sola cuando le llega el pulso de los circuitos.
export default function BoxVisual({ pointer, style }) {
  const reduce = useReducedMotion()
  // Progreso de apertura: 0 = cerrada, 1 = abierta con los servicios afuera.
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

  return <BoxStage progress={opened} pointer={pointer} style={style} />
}
