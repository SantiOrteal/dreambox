import { useEffect, useState } from 'react'

// Escala que hace caber un contenido de tamaño fijo (width x height) dentro del elemento observado.
// También devuelve las medidas del elemento, el ancho de la ventana y su margen superior,
// para que quien lo use pueda acomodar contenido que sobresale del recuadro.
export default function useFitScale(ref, width, height, { min = 0.45, max = 1.05 } = {}) {
  const [fit, setFit] = useState({ scale: 1, frameW: width, frameH: height, viewportW: 1280, gapAbove: 48 })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const box = entry.contentRect
      setFit({
        scale: Math.max(min, Math.min(box.width / width, box.height / height, max)),
        frameW: box.width,
        frameH: box.height,
        viewportW: window.innerWidth,
        gapAbove: parseFloat(getComputedStyle(el).marginTop) || 0,
      })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref, width, height, min, max])

  return fit
}
