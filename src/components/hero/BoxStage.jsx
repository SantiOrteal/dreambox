import { useRef } from 'react'
import { motion, useTransform } from 'motion/react'
import useFitScale from '../../hooks/useFitScale'
import OpeningBox from './OpeningBox'
import pieceLayout from './pieceLayout'
import { EASE, STAGE_H, STAGE_W } from './constants'

// Zona de la caja: toma el alto que queda libre bajo el texto (con mínimo y tope),
// así texto + caja + indicador siempre caben en pantalla y quedan centrados juntos.
// El escenario de tamaño fijo se escala para caber; las tarjetas se acomodan al espacio real.
// Con el cursor, el escenario se inclina un poco en 3D (la caja queda al fondo, las tarjetas al frente).
export default function BoxStage({ progress, pointer, style }) {
  const frame = useRef(null)
  const fit = useFitScale(frame, STAGE_W, STAGE_H, { min: 0.3 })
  const { scale } = fit
  const layout = pieceLayout(fit)

  const rotateY = useTransform(pointer.x, [-1, 1], [-7, 7])
  const rotateX = useTransform(pointer.y, [-1, 1], [5, -5])
  const x = useTransform(pointer.x, [-1, 1], [-8, 8])

  return (
    <motion.div
      ref={frame}
      style={style}
      className="relative mx-auto mt-12 max-sm:[@media(max-height:620px)]:mt-6 max-sm:[@media(max-height:620px)]:min-h-[120px] [@media(min-width:640px)_and_(max-height:800px)]:mt-10 max-h-[420px] min-h-[140px] w-full max-w-[600px] flex-1 basis-0 px-5 perspective-[1200px]"
    >
      <motion.div
        initial={{ opacity: 0, transform: 'translateY(40px) scale(0.92)' }}
        animate={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
        transition={{ duration: 1.1, delay: 0.35, ease: EASE }}
        className="absolute inset-0"
      >
        <motion.div style={{ rotateX, rotateY, x }} className="absolute inset-0 transform-3d">
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
              <OpeningBox progress={progress} layout={layout} pointer={pointer} />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
