import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

// Avanza por pasos en bucle: durations[i] = milisegundos que dura el paso i.
// Arranca después de `startDelay` ms. Con movimiento reducido se queda en el paso `still`.
export default function useCycle(durations, { startDelay = 0, still = durations.length - 1 } = {}) {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(-1)

  useEffect(() => {
    if (reduce) return
    const id = setTimeout(() => setStep((s) => (s + 1) % durations.length), step === -1 ? startDelay : durations[step])
    return () => clearTimeout(id)
  }, [step, reduce, durations, startDelay])

  return reduce ? still : step
}
