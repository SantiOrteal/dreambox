import { Check } from 'lucide-react'
import { useT } from '../../i18n'
import SnapCarousel from '../SnapCarousel'
import { projectScenes } from '../projects/ProjectScenes'

function ProjectCard({ project: p, active }) {
  const { Scene, bg } = projectScenes[p.id]
  return (
    <article
      className={`grid h-full overflow-hidden rounded-[28px] bg-white ring-1 ring-black/5 transition-opacity duration-500 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] ${
        active ? 'opacity-100' : 'opacity-60'
      }`}
    >
      <div className={`relative grid min-h-[260px] place-items-center bg-linear-to-br/srgb px-6 py-8 ${bg}`}>
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
        <h4 className="mt-4 text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink md:text-[26px]">{p.title}</h4>
        <p className="mt-3 text-[16px] leading-normal text-ink-muted">{p.body}</p>
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
    </article>
  )
}

// Pestaña de proyectos: tira horizontal donde la siguiente tarjeta se asoma por la derecha.
export default function ProjectsPanel() {
  const { projects, projectsSection: copy, builtSection } = useT()
  return (
    <div>
      <h3 className="text-[30px] font-semibold leading-[1.08] tracking-[-0.025em] text-ink md:text-[40px]">{copy.title}</h3>
      <p className="mt-3 max-w-160 text-[18px] leading-[1.45] text-ink-muted">{copy.body}</p>
      <SnapCarousel
        className="mt-10"
        items={projects}
        getKey={(p) => p.id}
        itemClassName="w-[88%] md:w-[84%]"
        labels={builtSection.carousel}
        renderItem={(p, i, active) => <ProjectCard project={p} active={active} />}
      />
    </div>
  )
}
