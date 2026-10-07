import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { CircleCheck, Database, RefreshCw } from 'lucide-react'
import { useT } from '../../i18n'
import { seen } from '../Reveal'
import { useEnter } from '../manufacturing/ModuleScenes'

// Mini escenas de los proyectos a la medida (ejemplos ilustrativos).

const card = 'rounded-2xl bg-white shadow-[0_1px_2px_rgba(11,26,63,0.06),0_12px_32px_-12px_rgba(11,26,63,0.18)]'
const EASE = [0.23, 1, 0.32, 1]

// Un SKU publicado en dos marketplaces: se vende 1 en eBay y el stock baja en ambos canales.
function MarketplaceScene() {
  const enter = useEnter()
  const reduce = useReducedMotion()
  const t = useT().projectScenes.marketplaces
  const ref = useRef(null)
  // La venta espera a que la tarjeta se vea completa; si nunca se ve, el ejemplo se queda en 7 (igual es válido).
  const inView = useInView(ref, { once: true, amount: 0.9 })
  const [sold, setSold] = useState(false)

  useEffect(() => {
    if (!inView) return
    const id = setTimeout(() => setSold(true), reduce ? 0 : 1600)
    return () => clearTimeout(id)
  }, [inView, reduce])

  const stock = sold ? 6 : 7
  const value = (
    <motion.span key={stock} initial={reduce ? false : { opacity: 0, transform: 'translateY(-6px)' }} animate={{ opacity: 1, transform: 'translateY(0px)' }} className="inline-block tabular-nums">
      {stock}
    </motion.span>
  )

  return (
    <div ref={ref} className="relative w-full max-w-[320px]">
      <motion.div {...enter(0.05)} className={`${card} p-4`}>
        <div className="flex items-center justify-between">
          <p className="text-[15px] font-semibold text-ink">{t.sku}</p>
          <p className="text-[13px] text-ink-muted">
            {t.stock}: <span className="font-semibold text-ink">{value}</span>
          </p>
        </div>
        <ul className="mt-3 space-y-2">
          {t.channels.map((ch, i) => (
            <motion.li key={ch} {...enter(0.3 + i * 0.15)} className="flex items-center justify-between rounded-xl bg-paper px-3 py-2.5 text-[13px]">
              <span className="font-medium text-ink">{ch}</span>
              <span className="flex items-center gap-1.5 text-[#1f7a45]">
                <CircleCheck className="h-3.5 w-3.5" strokeWidth={2.5} /> {t.published} · {value}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
      <motion.p
        initial={{ opacity: 0, transform: 'translateY(8px)' }}
        animate={sold ? { opacity: 1, transform: 'translateY(0px)' } : undefined}
        transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
        className="mt-3 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[12px] font-medium text-ink shadow-[0_8px_24px_-8px_rgba(11,26,63,0.25)]"
      >
        <RefreshCw className="h-3.5 w-3.5 shrink-0 text-brand" /> {t.sale}
      </motion.p>
    </div>
  )
}

// Gráfica de barras con datos sacados del ERP.
function ErpScene() {
  const enter = useEnter()
  const reduce = useReducedMotion()
  const t = useT().projectScenes.erp
  const values = [0.92, 0.68, 0.8, 0.54]
  return (
    <motion.div {...enter(0.05)} className={`${card} w-full max-w-[320px] p-4`}>
      <p className="text-[14px] font-semibold text-ink">{t.title}</p>
      <ul className="mt-4 space-y-2.5">
        {t.branches.map((b, i) => (
          <li key={b} className="grid grid-cols-[64px_1fr] items-center gap-3 text-[12px] text-ink-muted">
            {b}
            <span className="h-3 overflow-hidden rounded-full bg-black/5">
              <motion.span
                initial={{ transform: reduce ? 'scaleX(1)' : 'scaleX(0)' }}
                whileInView={{ transform: 'scaleX(1)' }}
                viewport={seen}
                transition={{ duration: 0.9, delay: 0.3 + i * 0.1, ease: EASE }}
                style={{ width: `${values[i] * 100}%` }}
                className={`block h-full origin-left rounded-full ${i === 0 ? 'bg-brand' : 'bg-brand/30'}`}
              />
            </span>
          </li>
        ))}
      </ul>
      <motion.p {...enter(0.9)} className="mt-4 flex items-center gap-1.5 border-t border-black/6 pt-3 text-[12px] font-medium text-ink-muted">
        <Database className="h-3.5 w-3.5 text-brand" /> {t.source}
      </motion.p>
    </motion.div>
  )
}

export const projectScenes = {
  marketplaces: { Scene: MarketplaceScene, bg: 'from-[#e6f1ff] to-[#f3f8ff]' },
  erp: { Scene: ErpScene, bg: 'from-[#ece8ff] to-[#f6f4ff]' },
}
