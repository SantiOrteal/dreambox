import { Cloud, Code, Database } from 'lucide-react'
import { stack } from '../../content/site'
import Reveal from '../Reveal'
import { useT } from '../../i18n'

// Íconos genéricos para las marcas que Simple Icons no incluye.
const fallbackIcons = { Cloud, Code, Database }

function ToolIcon({ tool }) {
  if (tool.icon) {
    const Icon = fallbackIcons[tool.icon]
    return <Icon aria-hidden="true" className="h-[22px] w-[22px]" style={{ color: tool.color }} strokeWidth={2} />
  }
  return (
    <img
      src={`https://cdn.simpleicons.org/${tool.slug}`}
      alt=""
      width="22"
      height="22"
      loading="lazy"
      className="h-[22px] w-[22px]"
    />
  )
}

// Una fila de la marquesina: el contenido se duplica para que el bucle sea continuo.
function MarqueeRow({ items, reverse }) {
  const row = [...items, ...items]
  return (
    <div className="group flex overflow-hidden mask-[linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
      <ul
        className={`flex w-max shrink-0 gap-3 pr-3 group-hover:[animation-play-state:paused] motion-reduce:animate-none ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
      >
        {row.map((t, i) => (
          <li
            key={`${t.name}-${i}`}
            aria-hidden={i >= items.length}
            className="flex items-center gap-2.5 rounded-full bg-white py-2.5 shadow-[0_1px_3px_rgba(15,23,42,0.06)] ring-1 ring-black/4 pl-3 pr-5 text-[15px] font-medium text-ink"
          >
            <ToolIcon tool={t} />
            {t.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Quiénes somos: texto centrado y una marquesina de herramientas con las que trabajamos a diario.
export default function About() {
  const { about } = useT()
  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="overflow-hidden py-28 md:py-40">
      <div className="wrap text-center">
        <Reveal as="h2" id="nosotros-title" className="display mx-auto max-w-[14ch]">
          {about.title}
        </Reveal>
        <Reveal as="div" delay={0.08} className="mx-auto mt-8 max-w-160 space-y-5 text-[19px] leading-normal text-ink-muted sm:text-[21px]">
          {about.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <p className="font-semibold text-ink">{about.claim}</p>
        </Reveal>
      </div>

      <Reveal delay={0.12} className="mt-20">
        <h3 className="text-center text-[15px] text-ink-subtle">{about.toolsTitle}</h3>
        <div className="mt-8 space-y-3">
          <MarqueeRow items={stack[0]} />
          <MarqueeRow items={stack[1]} reverse />
        </div>
      </Reveal>
    </section>
  )
}
