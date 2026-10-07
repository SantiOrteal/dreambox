import { Check } from 'lucide-react'
import { useT } from '../../i18n'
import Reveal from '../Reveal'
import { projectScenes } from '../projects/ProjectScenes'

// Proyectos a la medida fuera de manufactura: prueba real de que construimos sistemas.
export default function Projects() {
  const { projects, projectsSection: copy } = useT()
  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="py-24 md:py-32">
      <div className="wrap">
        <Reveal as="h2" id="proyectos-title" className="headline max-w-[18ch]">
          {copy.title}
        </Reveal>
        <Reveal as="p" delay={0.06} className="mt-4 max-w-160 text-[19px] leading-[1.45] text-ink-muted">
          {copy.body}
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {projects.map((p, i) => {
            const { Scene, bg } = projectScenes[p.id]
            return (
              <Reveal as="article" key={p.id} delay={i * 0.08} className="flex flex-col overflow-hidden rounded-[28px] bg-paper">
                <div className={`relative grid h-[280px] place-items-center bg-linear-to-br/srgb px-6 ${bg}`}>
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(11,26,63,0.08)_1px,transparent_1px)] bg-size-[22px_22px] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)]"
                  />
                  <div aria-hidden="true" className="relative flex w-full justify-center">
                    <Scene />
                  </div>
                </div>
                <div className="p-7 sm:p-9">
                  <p className="inline-flex rounded-full bg-brand-soft px-3 py-1 text-[13px] font-medium text-brand">{p.label}</p>
                  <h3 className="mt-4 text-[26px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink">{p.title}</h3>
                  <p className="mt-3 text-[17px] leading-normal text-ink-muted">{p.body}</p>
                  <ul className="mt-5 space-y-2 text-[15px] text-ink">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5">
                        <span className="mt-[2px] grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-brand-soft text-brand">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
