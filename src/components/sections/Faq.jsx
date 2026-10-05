import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useT } from '../../i18n'
import Reveal from '../Reveal'

// Las respuestas siempre están en el HTML (útil para SEO); solo se anima su altura con grid-rows.
export default function Faq() {
  const { faqs, faqSection } = useT()
  const [open, setOpen] = useState(-1)

  return (
    <section id="preguntas" aria-labelledby="preguntas-title" className="bg-[#f5f5f7]/60 py-24 md:py-32">
      <div className="wrap max-w-[820px]">
        <Reveal as="h2" id="preguntas-title" className="headline text-center">
          {faqSection.title}
        </Reveal>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {faqs.map((item, i) => {
            const isOpen = open === i
            const id = `faq-${i}`
            return (
              <div key={item.q}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    aria-controls={id}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-[19px] font-semibold tracking-[-0.01em] text-ink sm:text-[21px]"
                  >
                    {item.q}
                    <Plus
                      className={`h-5 w-5 shrink-0 text-ink-muted transition-transform duration-300 ease-out ${isOpen ? 'rotate-45' : ''}`}
                      strokeWidth={1.5}
                    />
                  </button>
                </h3>
                <div
                  id={id}
                  role="region"
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-[65ch] pb-7 text-[17px] leading-[1.55] text-ink-muted">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
