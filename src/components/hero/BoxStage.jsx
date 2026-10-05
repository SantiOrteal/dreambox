import { useRef } from 'react'
import { motion } from 'motion/react'
import useFitScale from '../../hooks/useFitScale'
import OpeningBox from './OpeningBox'
import pieceLayout from './pieceLayout'
import { EASE, STAGE_H, STAGE_W } from './constants'

// Zona de la caja: toma el alto que queda libre bajo el texto (con mínimo y tope),
// así texto + caja + indicador siempre caben en pantalla y quedan centrados juntos.
// El escenario de tamaño fijo se escala para caber; las tarjetas se acomodan al espacio real.
export default function BoxStage({ progress }) {
  const frame = useRef(null)
  const fit = useFitScale(frame, STAGE_W, STAGE_H, { min: 0.3 })
  const { scale } = fit
  const layout = pieceLayout(fit)

  return (
    <div
      ref={frame}
      className="relative mx-auto mt-12 max-sm:[@media(max-height:620px)]:mt-6 max-sm:[@media(max-height:620px)]:min-h-[120px] [@media(min-width:640px)_and_(max-height:800px)]:mt-10 max-h-[420px] min-h-[140px] w-full max-w-[600px] flex-1 basis-0 px-5"
    >
      <motion.div
        initial={{ opacity: 0, transform: 'translateY(40px)' }}
        animate={{ opacity: 1, transform: 'translateY(0px)' }}
        transition={{ duration: 1.2, delay: 0.5, ease: EASE }}
        className="absolute inset-0"
      >
        <div
          className="absolute bottom-0 left-1/2"
          style={{
            width: STAGE_W,
            height: STAGE_H,
            marginLeft: -STAGE_W / 2,
            transform: `scale(${scale})`,
            transformOrigin: '50% 100%',
          }}
        >
          <div className="relative h-full w-full">
            <OpeningBox progress={progress} layout={layout} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
