import { ArrowRight } from 'lucide-react'
import { useT } from '../../i18n'
import { preselectService } from '../../lib/contactIntent'
import ModuleDeck from './ModuleDeck'

// Convierte **negritas** en <strong>.
function rich(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') ? (
      <strong key={i} className="font-semibold text-ink">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    ),
  )
}

// Pestaña de manufactura: qué es Dreambox Manufacturing, tres datos clave, el mazo de módulos y el resto de módulos.
export default function ManufacturingPanel({ onCase }) {
  const { manufacturing: m } = useT()
  return (
    <div>
      <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16">
        <div>
          <p className="text-[17px] font-semibold text-brand">{m.eyebrow}</p>
          <h3 className="mt-3 text-[30px] font-semibold leading-[1.08] tracking-[-0.025em] text-ink md:text-[40px]">{m.title}</h3>
          <p className="mt-5 text-[19px] leading-[1.45] text-ink-muted">{rich(m.body)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#contacto" onClick={() => preselectService('manufactura')} className="btn-primary gap-2 px-6 py-3 text-[17px]">
              {m.cta} <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#caso" onClick={onCase} className="btn-secondary px-6 py-3 text-[17px]">
              {m.secondary}
            </a>
          </div>

          {/* Datos clave: filas en móvil y escritorio, franja de 3 en tablet. El primero resalta en azul marino */}
          <dl className="mt-12 grid overflow-hidden rounded-[24px] ring-1 ring-black/6 sm:grid-cols-3 lg:grid-cols-1">
            {m.facts.map((f, i) => (
              <div
                key={f.value}
                className={`flex items-center gap-4 px-5 py-4 sm:flex-col sm:items-start sm:gap-2 sm:p-6 lg:flex-row lg:items-center lg:gap-6 lg:px-7 lg:py-5 ${i === 0 ? 'bg-navy-deep text-white' : 'bg-white text-ink'} ${
                  i > 0 ? 'border-t border-black/6 sm:border-l sm:border-t-0 lg:border-l-0 lg:border-t' : ''
                }`}
              >
                <dt className="w-[104px] shrink-0 text-[21px] font-semibold leading-[1.05] tracking-[-0.03em] sm:w-auto sm:text-[26px] lg:w-[150px]">{f.value}</dt>
                <dd className={`text-[14px] leading-[1.4] sm:text-[15px] ${i === 0 ? 'text-white/65' : 'text-ink-muted'}`}>{f.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ModuleDeck />
      </div>

      {/* El resto de los módulos: en móvil, una sola fila que se desliza */}
      <div className="mt-14">
        <h4 className="text-[15px] font-semibold text-ink">{m.alsoTitle}</h4>
        <ul className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:px-0">
          {m.also.map((item) => {
            const label = typeof item === 'string' ? item : item.label
            return (
              <li key={label} className="flex shrink-0 items-center gap-2 rounded-full bg-white px-3.5 py-2 text-[14px] text-ink ring-1 ring-inset ring-black/6">
                {label}
                {item.soon && <span className="text-[12px] font-medium text-[#9a5b00]">· {m.soon}</span>}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
