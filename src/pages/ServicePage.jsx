import { MotionConfig } from 'motion/react'
import { ArrowRight, Boxes, Check, ChevronRight, Factory, Globe, Headset, RefreshCw, Sparkles } from 'lucide-react'
import { site } from '../content/site'
import { useT } from '../i18n'
import Backdrop from '../components/Backdrop'
import CookieBanner from '../components/CookieBanner'
import LangSwitch from '../components/LangSwitch'
import Logo from '../components/Logo'
import Reveal from '../components/Reveal'
import WhatsAppButton from '../components/WhatsAppButton'
import Contact from '../components/sections/Contact'
import Footer from '../components/sections/Footer'

const icons = { Boxes, Factory, Globe, Headset, RefreshCw, Sparkles }

// Página de un servicio (SEO): responde una búsqueda concreta y termina en el formulario de contacto.
// Los textos están en src/i18n/servicePages.es.js y servicePages.en.js.
export default function ServicePage({ id }) {
  const t = useT()
  const { ui, pages } = t.servicePages
  const page = pages.find((p) => p.id === id)
  const Icon = icons[page.icon]
  const whatsapp = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(t.common.whatsappMessage)}`

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

        <header className="material sticky top-0 z-50 border-b border-black/8">
          <div className="wrap flex h-12 items-center justify-between">
            <Logo href={t.paths.home} />
            <div className="flex items-center gap-1">
              <LangSwitch page={id} className="mr-1" />
              <a href="#contacto" className="btn-primary hit hidden px-3.5 py-1.5 text-[13px] sm:inline-flex">
                {t.common.cta}
              </a>
            </div>
          </div>
        </header>

        <main id="contenido">
          <section className="wrap pb-16 pt-8 md:pb-24 md:pt-10">
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1 text-[14px] text-ink-muted">
                <li>
                  <a href={t.paths.home} className="hover:text-ink hover:underline">
                    {ui.breadcrumbHome}
                  </a>
                </li>
                <li aria-hidden="true">
                  <ChevronRight className="h-3.5 w-3.5" />
                </li>
                <li aria-current="page" className="text-ink">
                  {page.name}
                </li>
              </ol>
            </nav>

            <div className="mt-10 max-w-3xl md:mt-16">
              <p className="flex items-center gap-2.5 text-[16px] font-semibold text-brand sm:text-[17px]">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-white" aria-hidden="true">
                  <Icon className="h-5 w-5" />
                </span>
                {page.eyebrow}
              </p>
              <h1 className="display mt-5">{page.h1}</h1>
              <p className="mt-6 text-[19px] leading-[1.5] text-ink-muted sm:text-[21px]">{page.intro}</p>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href="#contacto" className="btn-primary px-6 py-3 text-[17px]">
                  {ui.primary}
                </a>
                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="link text-[17px]">
                  {ui.secondary} <ChevronRight className="h-4 w-4" />
                </a>
              </div>
              <p className="mt-4 text-[14px] text-ink-muted">{ui.takeawayPrice}</p>
            </div>
          </section>

          <section className="bg-paper/60 py-16 md:py-24">
            <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
              <Reveal as="h2" className="headline">
                {page.problemsTitle}
              </Reveal>
              <Reveal as="ul" delay={0.06} className="space-y-4">
                {page.problems.map((problem) => (
                  <li key={problem} className="flex items-start gap-3 text-[18px] leading-[1.45] text-ink">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {problem}
                  </li>
                ))}
              </Reveal>
            </div>
          </section>

          <section className="wrap py-16 md:py-24">
            <Reveal as="h2" className="headline max-w-[20ch]">
              {page.includesTitle}
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {page.includes.map((item) => (
                <Reveal key={item.title} className="rounded-[28px] bg-white/75 p-7 ring-1 ring-black/4">
                  <h3 className="flex items-start gap-2.5 text-[19px] font-semibold leading-snug tracking-[-0.01em] text-ink">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-brand" strokeWidth={3} aria-hidden="true" />
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-[16px] leading-normal text-ink-muted">{item.body}</p>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="bg-navy-deep py-16 text-white md:py-24">
            <div className="wrap">
              <Reveal as="h2" className="headline max-w-[20ch]">
                {page.howTitle}
              </Reveal>
              <ol className={`mt-10 grid gap-8 sm:grid-cols-2 ${page.how.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
                {page.how.map((step, i) => (
                  <Reveal as="li" key={step.title} delay={i * 0.05}>
                    <span className="text-[15px] font-semibold tabular-nums text-brand-light">0{i + 1}</span>
                    <h3 className="mt-2 text-[21px] font-semibold leading-snug tracking-[-0.01em]">{step.title}</h3>
                    <p className="mt-2 text-[16px] leading-normal text-white/70">{step.body}</p>
                  </Reveal>
                ))}
              </ol>
            </div>
          </section>

          {page.proof && (
            <section className="wrap pt-16 md:pt-24">
              <Reveal className="rounded-[28px] bg-brand-soft p-8 md:p-12">
                <h2 className="text-[26px] font-semibold leading-tight tracking-[-0.02em] text-navy md:text-[32px]">{page.proof.title}</h2>
                <p className="mt-4 max-w-[65ch] text-[18px] leading-normal text-navy/80">{page.proof.body}</p>
              </Reveal>
            </section>
          )}

          <section className="wrap max-w-[820px] py-16 md:py-24">
            <Reveal as="h2" className="headline">
              {ui.faqTitle}
            </Reveal>
            <div className="mt-8 divide-y divide-line border-y border-line">
              {page.faqs.map((faq) => (
                <details key={faq.q} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[18px] font-semibold tracking-[-0.01em] text-ink [&::-webkit-details-marker]:hidden">
                    <h3>{faq.q}</h3>
                    <ChevronRight className="h-5 w-5 shrink-0 text-ink-muted transition-transform duration-200 ease-out group-open:rotate-90" aria-hidden="true" />
                  </summary>
                  <p className="max-w-[65ch] pb-6 text-[17px] leading-[1.55] text-ink-muted">{faq.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="wrap pb-8">
            <h2 className="text-[15px] font-semibold text-ink-muted">{ui.relatedTitle}</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {page.related.map((relatedId) => {
                const related = pages.find((p) => p.id === relatedId)
                return (
                  <li key={relatedId}>
                    <a
                      href={related.path}
                      className="flex h-full items-center justify-between gap-3 rounded-2xl bg-white/75 px-5 py-4 text-[16px] font-medium text-ink ring-1 ring-black/4 transition-colors hover:text-brand"
                    >
                      {related.name}
                      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </a>
                  </li>
                )
              })}
            </ul>
          </section>

          <Contact defaultService={id} />
        </main>

        <Footer page={id} />
        <WhatsAppButton />
        <CookieBanner />
      </div>
    </MotionConfig>
  )
}
