import { useEffect } from 'react'
import { MotionConfig } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import { useT } from '../i18n'
import { preselectService } from '../lib/contactIntent'
import Backdrop from '../components/Backdrop'
import Reveal from '../components/Reveal'
import Rich from '../components/manufacturing/Rich'
import ManufacturingVideo from '../components/built/ManufacturingVideo'
import ModuleDeck from '../components/built/ModuleDeck'
import Header from '../components/sections/Header'
import Contact from '../components/sections/Contact'
import Footer from '../components/sections/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import CookieBanner from '../components/CookieBanner'

// Dreambox Manufacturing (/manufactura y /en/manufacturing): el video y la información completa.
// La pestaña de la página principal solo presenta la plataforma y enlaza aquí.
export default function Manufacturing() {
  const t = useT()
  const m = t.manufacturing

  // Quien llega aquí pregunta por manufactura: el formulario ya lo trae seleccionado.
  useEffect(() => preselectService('manufactura'), [])

  return (
    <MotionConfig reducedMotion="user">
      <Backdrop />
      <div className="relative min-h-dvh overflow-x-clip">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-70 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          {t.common.skipToContent}
        </a>
        <Header page="manufacturing" />
        <main id="contenido">
          <section className="pb-20 pt-24 md:pb-28 md:pt-28">
            <div className="wrap">
              {/* Texto y botones en dos columnas: así el video queda lo más arriba posible */}
              <div className="grid items-end gap-6 lg:grid-cols-2 lg:gap-16">
                <div>
                  <p className="text-[17px] font-semibold text-brand">{m.eyebrow}</p>
                  <h1 className="headline mt-3">{m.title}</h1>
                </div>
                <div>
                  <p className="text-[19px] leading-[1.45] text-ink-muted">
                    <Rich text={m.body} />
                  </p>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href="#contacto" className="btn-primary gap-2 px-6 py-3 text-[17px]">
                      {m.cta} <ArrowRight className="h-4 w-4" />
                    </a>
                    <a href={`${t.paths.home}#caso`} className="btn-secondary px-6 py-3 text-[17px]">
                      {m.secondary}
                    </a>
                  </div>
                </div>
              </div>
              <ManufacturingVideo className="mt-10 md:mt-12" />
            </div>
          </section>

          <section aria-labelledby="modulos-title" className="bg-paper/60 py-20 md:py-28">
            <div className="wrap">
              <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_440px] lg:gap-16">
                <div>
                  <Reveal as="h2" id="modulos-title" className="headline max-w-[18ch]">
                    {m.modulesTitle}
                  </Reveal>

                  {/* Datos clave: filas en móvil y escritorio, franja de 3 en tablet. El primero resalta en azul marino */}
                  <dl className="mt-10 grid overflow-hidden rounded-[24px] ring-1 ring-black/6 sm:grid-cols-3 lg:grid-cols-1">
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
                <h3 className="text-[15px] font-semibold text-ink">{m.alsoTitle}</h3>
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
          </section>

          <Contact />
        </main>
        <Footer page="manufacturing" />
        <WhatsAppButton />
        <CookieBanner />
      </div>
    </MotionConfig>
  )
}
