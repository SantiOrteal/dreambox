import { useRef } from 'react'
import { motion } from 'motion/react'
import useFitScale from '../../../hooks/useFitScale'

// Zona visual del hero (bajo el texto): toma el alto libre, con mínimo y tope, igual que la caja.
// El contenido se diseña a un tamaño fijo (width x height) y se escala para caber, anclado abajo al centro.
export default function FitStage({ width, height, style, innerRef, children }) {
  const frame = useRef(null)
  const { scale } = useFitScale(frame, width, height, { min: 0.3, max: 1 })

  return (
    <motion.div
      ref={frame}
      style={style}
      className="relative mx-auto mt-12 max-sm:[@media(max-height:620px)]:mt-6 max-sm:[@media(max-height:620px)]:min-h-[120px] [@media(min-width:640px)_and_(max-height:800px)]:mt-10 max-h-[420px] min-h-[140px] w-full max-w-[680px] flex-1 basis-0 px-5"
    >
      <div
        ref={innerRef}
        className="absolute bottom-0 left-1/2"
        style={{ width, height, marginLeft: -width / 2, transform: `scale(${scale})`, transformOrigin: '50% 100%' }}
      >
        {children}
      </div>
    </motion.div>
  )
}
