import { ArrowRight } from 'lucide-react'
import { useT } from '../../i18n'
import { preselectService } from '../../lib/contactIntent'
import Rich from '../manufacturing/Rich'
import ManufacturingVideo from './ManufacturingVideo'

// Pestaña de manufactura: presenta la plataforma con el video. El detalle está en su propia página (pages/Manufacturing.jsx).
export default function ManufacturingPanel() {
  const t = useT()
  const m = t.manufacturing
  return (
    <div>
      <div className="grid items-end gap-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-[17px] font-semibold text-brand">{m.eyebrow}</p>
          <h3 className="mt-3 text-[30px] font-semibold leading-[1.08] tracking-[-0.025em] text-ink md:text-[40px]">{m.title}</h3>
        </div>
        <div>
          <p className="text-[19px] leading-[1.45] text-ink-muted">
            <Rich text={m.body} />
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#contacto" onClick={() => preselectService('manufactura')} className="btn-primary gap-2 px-6 py-3 text-[17px]">
              {m.cta} <ArrowRight className="h-4 w-4" />
            </a>
            <a href={t.paths.manufacturing} className="btn-secondary px-6 py-3 text-[17px]">
              {m.more}
            </a>
          </div>
        </div>
      </div>

      <ManufacturingVideo className="mt-10 md:mt-12" />
    </div>
  )
}
