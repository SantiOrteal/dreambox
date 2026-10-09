import { motion, useReducedMotion, useTransform } from 'motion/react'
import BoxDefs, { RIM_IN, RIM_OUT } from './BoxDefs'
import BoxFloor from './BoxFloor'
import BoxLid from './BoxLid'
import BoxLight, { BoxHalo } from './BoxLight'
import EnergyLinks from './EnergyLinks'
import ServicePiece from './ServicePiece'
import { CHARGE_AT, CHARGE_DURATION, pieces } from './constants'
import { useT } from '../../i18n'

const FACE_LEFT = 'M40 144 200 234v106L40 250Z'
const FACE_RIGHT = 'M200 234 360 144v106L200 340Z'
const FLOOR = 'M200 159 342 239 200 319 58 239Z'
const OUTLINE = 'M40 144 200 54 360 144v106L200 340 40 250Z'

// La caja de DreamBox: empieza cerrada, se enciende cuando le llega el pulso de los circuitos y se destapa sola.
// Capas, de atrás hacia adelante: piso de circuito, sombra, halo, interior, borde, cuerpo, logo, luz del cursor,
// aristas, luz y tapa.
// Encima del SVG van las líneas de energía hacia las tarjetas y las tarjetas.
export default function OpeningBox({ progress, layout, pointer }) {
  const { hero } = useT()
  const reduce = useReducedMotion()
  const charged = CHARGE_AT + CHARGE_DURATION
  const lidShade = useTransform(progress, [0.08, 0.25], [1, 0])
  const glow = useTransform(progress, [0.12, 0.45], [0, 1])
  // Luz que sigue al cursor sobre las caras: el lado más cercano al mouse se ilumina.
  const lightX = useTransform(pointer.x, [-1, 1], [30, 370])
  const lightY = useTransform(pointer.y, [-1, 1], [170, 320])

  return (
    <>
      <svg
        viewBox="0 0 400 360"
        className="absolute inset-x-0 bottom-0 w-full overflow-visible"
        role="img"
        aria-label={hero.boxLabel}
      >
        <BoxDefs />
        <defs>
          <clipPath id="faces">
            <path d={FACE_LEFT} />
            <path d={FACE_RIGHT} />
          </clipPath>
          <radialGradient id="cursorLight" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.38" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <BoxFloor glow={glow} />

        {/* Sombras en el suelo: se encogen un poco cuando la caja sube al flotar */}
        <g className="animate-float-shadow transform-fill origin-center motion-reduce:animate-none">
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

          {/* Reflejo del cursor sobre las caras */}
          <g clipPath="url(#faces)">
            <motion.ellipse cx={lightX} cy={lightY} rx="130" ry="100" fill="url(#cursorLight)" />
          </g>

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

          {/* Encendido: el contorno destella cuando llega el pulso de energía */}
          {!reduce && (
            <motion.path
              d={OUTLINE}
              fill="none"
              stroke="#9fb5ff"
              strokeWidth="4"
              strokeLinejoin="round"
              filter="url(#contactShadow)"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.9, delay: charged - 0.1, times: [0, 0.25, 1], ease: 'easeOut' }}
            />
          )}

          <BoxLight progress={progress} glow={glow} />
        </g>

        {/* La tapa va fuera del grupo que flota: al caer se queda quieta en el piso */}
        <BoxLid progress={progress} />
      </svg>

      <EnergyLinks progress={progress} layout={layout} />

      {pieces.map((piece, i) => (
        <ServicePiece
          key={i}
          index={i}
          piece={piece}
          label={hero.pieces[i]}
          hint={hero.pieceHints[i]}
          action={hero.pieceAction}
          progress={progress}
          layout={layout}
          pointer={pointer}
        />
      ))}
    </>
  )
}
