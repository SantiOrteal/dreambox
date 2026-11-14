import { useRef } from 'react'
import { Check, Globe, HardDrive, Loader2, Mail, Server, TriangleAlert } from 'lucide-react'
import { gsap, useGSAP } from '../../lib/gsap'
import { useT } from '../../i18n'

const ICONS = [Mail, Server, Globe, HardDrive]
// Fila que falla en la escena: "Sistema interno".
const INCIDENT = 1

// Lenguaje de movimiento: directo y sin rebote, como la marca. Siempre las mismas tres duraciones.
const QUICK = 0.2
const STANDARD = 0.3
const SLOW = 0.45
const EASE = 'power3.out'

// Estados encimados en la misma celda: la animación cambia cuál se ve. El HTML ya trae el estado final
// (todo resuelto), que es lo que ve quien pide menos movimiento o quien no alcanza a cargar el JavaScript.
function Stack({ children, className = '' }) {
  return <span className={`grid justify-items-end *:[grid-area:1/1] ${className}`}>{children}</span>
}

function Status({ state, className, children }) {
  return (
    <span data-state={state} className={`inline-flex items-center gap-1.5 whitespace-nowrap text-[13px] font-medium sm:text-[14px] ${className}`}>
      {children}
    </span>
  )
}

// Respuesta a "Nosotros nos encargamos": en lugar de decirlo, se ve. Un sistema falla, se atiende y queda
// resuelto en unos 2 segundos. Corre una sola vez al entrar en pantalla y nunca detiene el scroll.
export default function Handled() {
  const { handled: copy } = useT()
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('[data-text]', {
          y: 16,
          autoAlpha: 0,
          duration: SLOW,
          stagger: 0.08,
          ease: EASE,
          scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
        })

        // Puesta en escena: la falla ya está visible cuando aparece el panel.
        gsap.set('[data-state="alert"], [data-summary="incident"]', { autoAlpha: 1 })
        gsap.set('[data-state="resolved"], [data-summary="ok"]', { autoAlpha: 0 })
        gsap.set('[data-row-tint]', { autoAlpha: 1 })
        gsap.set('[data-check]', { strokeDashoffset: 1 })

        const swap = (from, to, at) =>
          tl
            .to(from, { autoAlpha: 0, y: -6, duration: QUICK, ease: 'power2.in' }, at)
            .fromTo(to, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: QUICK, ease: EASE }, at + QUICK * 0.75)

        const tl = gsap.timeline({ scrollTrigger: { trigger: '[data-panel]', start: 'top 75%', once: true } })

        tl.from('[data-panel]', { y: 24, autoAlpha: 0, duration: SLOW, ease: EASE })
          .from('[data-row]', { y: 10, autoAlpha: 0, duration: STANDARD, stagger: 0.05, ease: EASE }, 0.1)

        // La persona alcanza a leer la falla (hasta ~1 s) y enseguida alguien la atiende.
        swap('[data-state="alert"]', '[data-state="working"]', 1)
        // Resuelto: el momento principal, con el fondo rojo apagándose y la palomita dibujándose.
        swap('[data-state="working"]', '[data-state="resolved"]', 1.7)
        tl.to('[data-row-tint]', { autoAlpha: 0, duration: STANDARD, ease: 'power2.out' }, 1.7)
          .to('[data-check]', { strokeDashoffset: 0, duration: STANDARD, ease: 'power2.out' }, 1.85)
        // Y hasta entonces cambia el resumen general: la consecuencia llega después de la causa.
        swap('[data-summary="incident"]', '[data-summary="ok"]', 1.95)
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} aria-label={copy.label} className="py-20 md:py-28">
      <div className="wrap">
        <div className="relative isolate overflow-hidden rounded-[32px] bg-navy-deep px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14 lg:py-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-32 -top-40 h-[480px] w-[480px] rounded-full bg-brand/40 blur-[110px]" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-size-[22px_22px] mask-[linear-gradient(to_bottom,black,transparent_70%)]" />
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14">
            <div>
              <h2 className="text-[2.25rem] font-semibold leading-[1.06] tracking-[-0.03em] sm:text-5xl lg:text-[3.25rem]">
                {copy.lines.map((line, i) => (
                  <span key={line} data-text className={`block ${i === copy.lines.length - 1 ? 'text-brand-light' : ''}`}>
                    {line}
                  </span>
                ))}
              </h2>
              <p data-text className="mt-5 max-w-[42ch] text-[18px] leading-normal text-white/70 sm:text-[19px]">
                {copy.body}
              </p>
            </div>

            {/* Ilustración de la idea, no datos reales: se oculta a lectores de pantalla porque el título ya lo dice. */}
            <div data-panel aria-hidden="true" className="rounded-2xl bg-white/6 p-2 ring-1 ring-white/10">
              <div className="flex items-center justify-between gap-3 px-3 py-3">
                <span className="text-[13px] text-white/60 sm:text-[14px]">{copy.panelTitle}</span>
                <Stack>
                  <span data-summary="incident" className="invisible inline-flex items-center gap-2 whitespace-nowrap text-[13px] font-semibold text-rose-300 sm:text-[14px]">
                    <span className="h-2 w-2 rounded-full bg-rose-400" />
                    {copy.summary.incident}
                  </span>
                  <span data-summary="ok" className="inline-flex items-center gap-2 whitespace-nowrap text-[13px] font-semibold text-emerald-300 sm:text-[14px]">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
                      <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
                    </span>
                    {copy.summary.ok}
                  </span>
                </Stack>
              </div>

              <ul className="space-y-1">
                {copy.systems.map((name, i) => {
                  const Icon = ICONS[i]
                  return (
                    <li key={name} data-row className="relative flex items-center gap-3 overflow-hidden rounded-xl bg-white/4 px-3 py-3.5">
                      {i === INCIDENT && <span data-row-tint className="invisible absolute inset-0 bg-rose-500/15 ring-1 ring-inset ring-rose-400/30 rounded-xl" />}
                      <Icon className="relative h-[18px] w-[18px] shrink-0 text-white/60" strokeWidth={1.75} />
                      <span className="relative min-w-0 flex-1 truncate text-[15px] font-medium sm:text-[16px]">{name}</span>
                      {i === INCIDENT ? (
                        <Stack className="relative">
                          <Status state="alert" className="invisible text-rose-300">
                            <TriangleAlert className="h-3.5 w-3.5" strokeWidth={2.25} />
                            {copy.status.alert}
                          </Status>
                          <Status state="working" className="invisible text-amber-200">
                            <Loader2 className="h-3.5 w-3.5 animate-spin motion-reduce:animate-none" strokeWidth={2.25} />
                            {copy.status.working}
                          </Status>
                          <Status state="resolved" className="text-emerald-300">
                            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                              <path data-check d="M5 13l4 4L19 7" pathLength="1" strokeDasharray="1" />
                            </svg>
                            {copy.status.resolved}
                          </Status>
                        </Stack>
                      ) : (
                        <Status state="ok" className="relative text-white/55">
                          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                          {copy.status.ok}
                        </Status>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
