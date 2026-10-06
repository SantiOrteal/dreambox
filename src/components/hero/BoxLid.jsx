import { easeIn, easeInOut, easeOut, motion, useTransform } from 'motion/react'

// Tapa con alero (un poco más ancha que la caja) y grosor.
// Al abrir: un pequeño salto (la presión de lo que hay dentro), luego se desliza a la derecha, gira y se desvanece.
export default function BoxLid({ progress }) {
  const transform = useTransform(
    progress,
    [0, 0.08, 0.14, 0.5],
    [
      'translate(0px, 0px) rotate(0deg)',
      'translate(0px, -16px) rotate(-2deg)',
      'translate(6px, -10px) rotate(-1deg)',
      'translate(260px, -60px) rotate(20deg)',
    ],
    { ease: [easeOut, easeIn, easeInOut] },
  )
  const opacity = useTransform(progress, [0.34, 0.5], [1, 0])

  return (
    <motion.g style={{ transform, opacity, transformOrigin: '200px 130px', transformBox: 'view-box' }}>
      <ellipse cx="200" cy="150" rx="150" ry="70" fill="#0b1a3f" opacity="0.12" filter="url(#contactShadow)" />
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
