import { useT } from '../../i18n'
import Reveal from '../Reveal'

// Solo se muestra con testimonios reales cargados en src/i18n/es.js y en.js.
export default function Testimonials() {
  const { testimonials, testimonialsSection } = useT()
  if (!testimonials.length) return null

  return (
    <section id="clientes" aria-labelledby="clientes-title" className="bg-[#f5f5f7]/60 py-24 md:py-32">
      <div className="wrap">
        <Reveal as="h2" id="clientes-title" className="headline max-w-[18ch]">
          {testimonialsSection.title}
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <Reveal as="figure" key={t.name} delay={i * 0.06} className="tile flex flex-col justify-between bg-white p-8 sm:p-10">
              <blockquote className="text-[21px] font-medium leading-[1.4] tracking-[-0.01em] text-ink">“{t.quote}”</blockquote>
              <figcaption className="mt-8 text-[15px] text-ink-muted">
                <span className="font-semibold text-ink">{t.name}</span>
                <br />
                {t.role}, {t.company}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
