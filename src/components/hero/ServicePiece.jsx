import { motion, useTransform } from 'motion/react'

// Tarjeta que sale de la caja: ícono y nombre juntos, el texto queda siempre sobre blanco.
// `layout` (ver pieceLayout.js) ajusta tamaño, separación y altura al espacio real de la pantalla.
export default function ServicePiece({ piece, label, progress, layout }) {
  const { Icon, x, y, r, from } = piece
  const { boost, spread, lift } = layout
  const range = [from, from + 0.3]
  const transform = useTransform(progress, range, [
    'translate(0px, 60px) rotate(0deg) scale(0.4)',
    `translate(${x * spread}px, ${y * lift}px) rotate(${r}deg) scale(${boost})`,
  ])
  const opacity = useTransform(progress, [from, from + 0.08], [0, 1])

  return (
    <motion.div
      style={{ transform, opacity }}
      className="absolute left-1/2 top-[42%] -ml-[54px] -mt-[46px] flex w-[108px] flex-col items-center gap-2 rounded-[22px] bg-white px-3 pb-3 pt-3.5 shadow-[0_20px_40px_-14px_rgba(30,58,138,0.45),0_2px_6px_rgba(15,23,42,0.06)] ring-1 ring-black/[0.05]"
    >
      <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-brand-soft">
        <Icon className="h-6 w-6 text-brand" strokeWidth={1.75} />
      </span>
      <span className="text-[16px] font-semibold leading-none tracking-[-0.01em] text-ink">{label}</span>
    </motion.div>
  )
}
