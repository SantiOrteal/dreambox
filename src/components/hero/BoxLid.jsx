import { easeIn, easeInOut, easeOut, motion, useTransform } from 'motion/react'

// Tapa con alero (un poco más ancha que la caja) y grosor.
// Al abrir: un pequeño salto (la presión de lo que hay dentro), sube y gira un poco, y cae a descansar
// en el piso, al frente y a la derecha de la caja. Se queda ahí: la escena cuenta que la caja se abrió.
// Va fuera del grupo que flota, así la tapa reposa en el suelo mientras la caja sigue flotando.
export default function BoxLid({ progress }) {
  const transform = useTransform(
    progress,
    [0, 0.08, 0.16, 0.3, 0.46],
    [
      'translate(0px, 0px) rotate(0deg) scale(1)',
      'translate(0px, -16px) rotate(-2deg) scale(1)',
      'translate(30px, -54px) rotate(6deg) scale(0.92)',
      'translate(134px, 140px) rotate(2deg) scale(0.56)',
      'translate(140px, 184px) rotate(0deg) scale(0.5)',
    ],
    { ease: [easeOut, easeOut, easeIn, easeInOut] },
  )
  // Sombra de contacto: se forma cuando la tapa toca el piso
  const landed = useTransform(progress, [0.3, 0.46], [0, 1])

  return (
    <motion.g style={{ transform, transformOrigin: '200px 130px', transformBox: 'view-box' }}>
      <ellipse cx="200" cy="150" rx="150" ry="70" fill="#0b1a3f" opacity="0.12" filter="url(#contactShadow)" />
      <motion.g style={{ opacity: landed }}>
        <path d="M200 52 384 150 200 256 16 150Z" fill="#0b1a3f" opacity="0.22" filter="url(#contactShadow)" />
      </motion.g>
      <path d="M30 128 200 224v20L30 148Z" fill="url(#lidSideL)" />
      <path d="M200 224 370 128v20L200 244Z" fill="url(#lidSideR)" />
      <path d="M200 32 370 128 200 224 30 128Z" fill="url(#lidTop)" />
      <path d="M200 32 370 128 200 224 30 128Z" fill="url(#lidShine)" />
      <path d="M30 128 200 32 370 128" fill="none" stroke="#ffffff" strokeOpacity="0.95" strokeWidth="1.3" />
      <path d="M30 128 200 224 370 128" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="1.2" />
      <path d="M200 224v20" stroke="#ffffff" strokeOpacity="0.7" strokeWidth="1.2" />
      <path d="M30 148 200 244 370 148" fill="none" stroke="#0b1a3f" strokeOpacity="0.25" />
    </motion.g>
  )
}
