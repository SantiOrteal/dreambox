import { backOut, motion, useTransform } from 'motion/react'
import { openService } from '../../lib/serviceIntent'

// Tarjeta que sale de la caja: ícono y nombre juntos, el texto queda siempre sobre blanco.
// `layout` (ver pieceLayout.js) ajusta tamaño, separación y altura al espacio real de la pantalla.
// Capas: parallax con el cursor → salida de la caja (con rebote) → flotado continuo.
// Es un enlace: al pasar el mouse se eleva, brilla y muestra qué incluye; al hacer clic abre su servicio.
export default function ServicePiece({ piece, index, label, hint, action, progress, layout, pointer }) {
  const { Icon, service, x, y, r, from, depth } = piece
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
        <motion.a
          href="#servicios"
          onClick={() => openService(service)}
          aria-label={`${label}. ${hint}. ${action}`}
          whileHover={{ y: -8, scale: 1.06 }}
          whileFocus={{ y: -8, scale: 1.06 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', duration: 0.4, bounce: 0.25 }}
          className="group relative block rounded-[22px] outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          <div
            className="flex animate-float flex-col items-center gap-2 rounded-[22px] bg-white/95 px-3 pb-3 pt-3.5 shadow-[0_20px_40px_-14px_rgba(30,58,138,0.45),0_2px_6px_rgba(15,23,42,0.06)] ring-1 ring-black/5 transition-[box-shadow] duration-300 group-hover:shadow-[0_26px_50px_-14px_rgba(47,91,234,0.55),0_0_0_1.5px_rgba(79,124,255,0.55)] group-focus-visible:shadow-[0_26px_50px_-14px_rgba(47,91,234,0.55),0_0_0_1.5px_rgba(79,124,255,0.55)] motion-reduce:animate-none"
            style={{ animationDelay: `${-index * 1.4}s`, animationDuration: `${5 + index * 0.6}s` }}
          >
            <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-linear-to-br from-brand-soft to-[#e3e9ff] transition-colors duration-300 group-hover:from-brand group-hover:to-[#6d5cff] group-focus-visible:from-brand group-focus-visible:to-[#6d5cff]">
              <Icon className="h-6 w-6 text-brand transition-colors duration-300 group-hover:text-white group-focus-visible:text-white" strokeWidth={1.75} />
            </span>
            <span className="text-[16px] font-semibold leading-none tracking-[-0.01em] text-ink">{label}</span>
          </div>

          {/* Qué incluye: aparece bajo la tarjeta al pasar el mouse o al enfocarla */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-full bg-navy-deep px-3.5 py-1.5 text-[13px] font-medium text-white opacity-0 shadow-lg transition-[opacity,translate] duration-200 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
          >
            {hint}
          </span>
        </motion.a>
      </motion.div>
    </motion.div>
  )
}
