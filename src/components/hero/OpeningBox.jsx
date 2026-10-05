import { motion, useTransform } from 'motion/react'
import BoxDefs, { RIM_IN, RIM_OUT } from './BoxDefs'
import BoxLid from './BoxLid'
import BoxLight, { BoxHalo } from './BoxLight'
import ServicePiece from './ServicePiece'
import { pieces } from './constants'
import { useT } from '../../i18n'

const FACE_LEFT = 'M40 144 200 234v106L40 250Z'
const FACE_RIGHT = 'M200 234 360 144v106L200 340Z'
const FLOOR = 'M200 159 342 239 200 319 58 239Z'

// La caja de DreamBox: empieza cerrada y se destapa solo con el scroll.
// Capas, de atrás hacia adelante: sombra, halo, interior, borde, cuerpo, logo, aristas, luz y tapa.
export default function OpeningBox({ progress, layout }) {
  const { hero } = useT()
  const lidShade = useTransform(progress, [0.08, 0.25], [1, 0])
  const glow = useTransform(progress, [0.12, 0.45], [0, 1])

  return (
    <>
      <svg
        viewBox="0 0 400 360"
        className="absolute inset-x-0 bottom-0 w-full overflow-visible"
        role="img"
        aria-label={hero.boxLabel}
      >
        <BoxDefs />

        {/* Sombras en el suelo: se encogen un poco cuando la caja sube al flotar */}
        <g className="animate-float-shadow [transform-box:fill-box] [transform-origin:center] motion-reduce:animate-none">
          <ellipse cx="200" cy="344" rx="180" ry="26" fill="#0b1a3f" opacity="0.2" filter="url(#softShadow)" />
          <ellipse cx="200" cy="341" rx="115" ry="9" fill="#0b1a3f" opacity="0.32" filter="url(#contactShadow)" />
        </g>

        <BoxHalo glow={glow} />

        <g className="animate-float motion-reduce:animate-none">
          {/* Interior azul: paredes del fondo y piso que se ilumina al abrir */}
          <g clipPath="url(#opening)">
            <path d="M58 144 200 64v95L58 239Z" fill="url(#wallL)" />
            <path d="M200 64 342 144v95L200 159Z" fill="url(#wallR)" />
            <path d={FLOOR} fill="url(#floorLight)" />
            <motion.path d={FLOOR} fill="url(#floorGlow)" style={{ opacity: glow }} />
          </g>

          {/* Espesor de las paredes: el borde superior de la abertura */}
          <path d={`${RIM_OUT} ${RIM_IN}`} fillRule="evenodd" fill="url(#rim)" />
          <path d="M58 144 200 224 342 144" fill="none" stroke="#1e3a8a" strokeOpacity="0.25" />

          <path d={FACE_LEFT} fill="url(#faceLeft)" />
          <path d={FACE_RIGHT} fill="url(#faceRight)" />

          {/* Logo original grabado en la cara frontal, en perspectiva isométrica */}
          <image
            href="/brand/logo-full-white.png"
            width="32"
            height="26.37"
            preserveAspectRatio="xMidYMid meet"
            transform="matrix(2.6 1.4625 0 2.6 78.4 184.3)"
            opacity="0.6"
          />

          {/* Sombra de la tapa sobre las caras: desaparece al levantarla */}
          <motion.g style={{ opacity: lidShade }}>
            <path d={FACE_LEFT} fill="url(#lidAO)" />
            <path d={FACE_RIGHT} fill="url(#lidAO)" />
          </motion.g>

          {/* Aristas */}
          <path d="M40 144 200 234 360 144" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeWidth="1.2" />
          <path d="M200 234v106" stroke="url(#edgeV)" strokeWidth="1.6" />
          <path d="M40 144v106" stroke="url(#edgeV)" strokeOpacity="0.5" />
          <path d="M40 250 200 340 360 250" fill="none" stroke="#0b1a3f" strokeOpacity="0.3" />

          <BoxLight progress={progress} glow={glow} />
          <BoxLid progress={progress} />
        </g>
      </svg>

      {pieces.map((piece, i) => (
        <ServicePiece key={i} piece={piece} label={hero.pieces[i]} progress={progress} layout={layout} />
      ))}
    </>
  )
}
