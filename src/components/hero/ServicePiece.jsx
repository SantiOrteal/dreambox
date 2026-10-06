import { backOut, motion, useTransform } from 'motion/react'

// Tarjeta que sale de la caja: ícono y nombre juntos, el texto queda siempre sobre blanco.
// `layout` (ver pieceLayout.js) ajusta tamaño, separación y altura al espacio real de la pantalla.
// Capas: parallax con el cursor → salida de la caja (con rebote) → flotado continuo.
export default function ServicePiece({ piece, index, label, progress, layout, pointer }) {
  const { Icon, x, y, r, from, depth } = piece
  const { boost, spread, lift } = layout
  const range = [from, from + 0.32]
  const transform = useTransform(
    progress,
    range,
    [
      'translate(0px, 60px) rotate(0deg) scale(0.3)',
      `translate(${x * spread}px, ${y * lift}px) rotate(${r}deg) scale(${boost})`,
    ],
    { ease: backOut },
  )
  const opacity = useTransform(progress, [from, from + 0.06], [0, 1])
  const px = useTransform(pointer.x, [-1, 1], [-depth, depth])
  const py = useTransform(pointer.y, [-1, 1], [-depth * 0.6, depth * 0.6])

  return (
    <motion.div style={{ x: px, y: py }} className="absolute left-1/2 top-[42%] ml-[-54px] mt-[-46px] w-[108px]">
      <motion.div style={{ transform, opacity }}>
        <div
          className="flex animate-float flex-col items-center gap-2 rounded-[22px] bg-white/90 px-3 pb-3 pt-3.5 shadow-[0_20px_40px_-14px_rgba(30,58,138,0.45),0_2px_6px_rgba(15,23,42,0.06)] ring-1 ring-black/5 backdrop-blur-md motion-reduce:animate-none"
          style={{ animationDelay: `${-index * 1.4}s`, animationDuration: `${5 + index * 0.6}s` }}
        >
          <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-linear-to-br from-brand-soft to-[#e3e9ff]">
            <Icon className="h-6 w-6 text-brand" strokeWidth={1.75} />
          </span>
          <span className="text-[16px] font-semibold leading-none tracking-[-0.01em] text-ink">{label}</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
