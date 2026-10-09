import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { useT } from '../../i18n'
import Reveal from '../Reveal'
import ManufacturingPanel from '../built/ManufacturingPanel'
import CasePanel from '../built/CasePanel'
import ProjectsPanel from '../built/ProjectsPanel'

const EASE = [0.23, 1, 0.32, 1]
const panels = { manufactura: ManufacturingPanel, caso: CasePanel, proyectos: ProjectsPanel }
const ids = Object.keys(panels)

// Lo que hemos construido: manufactura, caso de estudio y proyectos en una sola sección con pestañas.
// Los tres paneles quedan en el HTML (SEO); solo se muestra el activo. Los enlaces a #manufactura, #caso
// y #proyectos (menú, servicios, botones) abren su pestaña y llevan a la sección.
export default function Built() {
  const { builtSection: copy } = useT()
  const reduce = useReducedMotion()
  const section = useRef(null)
  const tabRefs = useRef([])
  const [[active, dir], setState] = useState(['manufactura', 0])

  const open = (id) => setState(([cur]) => [id, ids.indexOf(id) >= ids.indexOf(cur) ? 1 : -1])

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1)
      if (ids.includes(id)) open(id)
    }
    fromHash()
    // Un clic en un enlace a la misma pestaña no cambia el hash, así que también se escuchan los clics.
    const onClick = (e) => {
      const id = e.target.closest?.('a[href^="#"]')?.getAttribute('href').slice(1)
      if (ids.includes(id)) open(id)
    }
    window.addEventListener('hashchange', fromHash)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('hashchange', fromHash)
      document.removeEventListener('click', onClick)
    }
  }, [])

  function onKeyDown(e, i) {
    const keys = { ArrowRight: 1, ArrowLeft: -1 }
    if (!(e.key in keys)) return
    e.preventDefault()
    const next = (i + keys[e.key] + ids.length) % ids.length
    open(ids[next])
    tabRefs.current[next]?.focus()
  }

  // Al cambiar de pestaña desde la barra fija, la sección vuelve a su inicio si ya se había bajado mucho.
  function pick(id) {
    open(id)
    const el = section.current
    if (el && el.getBoundingClientRect().top < -200) el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <section ref={section} id="construido" aria-labelledby="construido-title" className="relative bg-paper/60 py-24 md:py-32">
      {/* Anclas de cada pestaña: llevan al inicio de la sección */}
      {ids.map((id) => (
        <span key={id} id={id} aria-hidden="true" className="absolute top-0" />
      ))}

      <div className="wrap">
        <Reveal as="h2" id="construido-title" className="headline max-w-[18ch]">
          {copy.title}
        </Reveal>
        <Reveal as="p" delay={0.06} className="mt-4 max-w-160 text-[19px] leading-[1.45] text-ink-muted">
          {copy.subtitle}
        </Reveal>

        {/* Pestañas: en móvil se quedan fijas bajo el menú mientras recorres la sección */}
        <div className="sticky top-12 z-30 -mx-5 mt-10 px-5 py-3 sm:-mx-8 sm:px-8 md:static md:mx-0 md:mt-12 md:p-0">
          <div aria-hidden="true" className="material absolute inset-0 -z-10 border-b border-black/6 md:hidden" />
          <div role="tablist" aria-label={copy.tabsLabel} className="grid grid-cols-3 gap-1 rounded-full bg-black/5 p-1 md:max-w-[720px] md:rounded-[22px]">
            {copy.tabs.map((tab, i) => {
              const on = tab.id === active
              return (
                <button
                  key={tab.id}
                  ref={(el) => (tabRefs.current[i] = el)}
                  type="button"
                  role="tab"
                  id={`built-tab-${tab.id}`}
                  aria-selected={on}
                  aria-controls={`built-panel-${tab.id}`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => pick(tab.id)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={`relative rounded-full px-2 py-2.5 text-center transition-colors duration-200 md:rounded-[18px] md:px-5 md:py-3.5 md:text-left ${
                    on ? 'text-white' : 'text-ink-muted hover:text-ink'
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="built-tab"
                      transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
                      className="absolute inset-0 rounded-full bg-navy-deep shadow-[0_8px_20px_-8px_rgba(11,26,63,0.5)] md:rounded-[18px]"
                    />
                  )}
                  <span className="relative block text-[14px] font-semibold leading-tight sm:text-[15px] md:text-[17px]">{tab.label}</span>
                  <span className={`relative hidden text-[13px] md:block ${on ? 'text-white/60' : 'text-ink-subtle'}`}>{tab.hint}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-10 md:mt-14">
          {ids.map((id) => {
            const Panel = panels[id]
            const props = { id: `built-panel-${id}`, role: 'tabpanel', 'aria-labelledby': `built-tab-${id}` }
            // El panel activo entra desde el lado hacia el que avanzaste (en la carga inicial ya está visible);
            // los demás quedan ocultos en el HTML.
            return id === active ? (
              <motion.div
                key={`${id}-on`}
                {...props}
                initial={dir === 0 ? false : { opacity: 0, transform: `translateX(${reduce ? 0 : dir * 32}px)` }}
                animate={{ opacity: 1, transform: 'translateX(0px)' }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <Panel onCase={() => open('caso')} />
              </motion.div>
            ) : (
              <div key={`${id}-off`} {...props} hidden>
                <Panel onCase={() => open('caso')} />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
