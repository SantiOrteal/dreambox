import { Fragment } from 'react'
import { MotionConfig } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { site } from '../content/site'
import { openCookieSettings } from '../lib/consent'
import { useT } from '../i18n'
import Logo from '../components/Logo'
import LangSwitch from '../components/LangSwitch'
import Footer from '../components/sections/Footer'
import CookieBanner from '../components/CookieBanner'

// Aviso de privacidad y cookies (/privacidad y /en/privacy). Los textos están en src/i18n (clave "privacy").
// Texto general pensado para la ley mexicana: revísalo con tu asesor legal antes de publicar.

function Section({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line pt-10">
      <h2 className="text-[24px] font-semibold tracking-[-0.02em] text-ink">{title}</h2>
      <div className="mt-4 space-y-4 text-[17px] leading-[1.6] text-ink-muted [&_strong]:font-semibold [&_strong]:text-ink">
        {children}
      </div>
    </section>
  )
}

// Convierte **negritas** y {email} en elementos.
function Rich({ text }) {
  const email = (
    <a href={`mailto:${site.email}`} className="text-brand hover:underline">
      {site.email}
    </a>
  )
  return text.split(/(\*\*[^*]+\*\*|\{email\})/).map((part, i) => {
    if (part === '{email}') return <Fragment key={i}>{email}</Fragment>
    if (part.startsWith('**')) return <strong key={i}>{part.slice(2, -2)}</strong>
    return <Fragment key={i}>{part}</Fragment>
  })
}

export default function Privacy() {
  const t = useT()
  const p = t.privacy
  const owner = [site.legal.owner, site.legal.address, t.meta.country].filter(Boolean).join(', ')

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-dvh bg-canvas">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-70 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
        >
          {t.common.skipToContent}
        </a>
        <header className="material sticky top-0 z-50 border-b border-black/6">
          <div className="wrap flex h-14 items-center justify-between">
            <Logo href={t.paths.home} />
            <div className="flex items-center gap-2">
              <LangSwitch page="privacy" />
              <a href={t.paths.home} className="link text-[14px]">
                <ArrowLeft className="h-4 w-4" /> {p.back}
              </a>
            </div>
          </div>
        </header>

        <main id="contenido" className="wrap max-w-[760px] py-16 md:py-24">
          <p className="text-[15px] font-semibold text-brand">{p.eyebrow}</p>
          <h1 className="headline mt-2">{p.title}</h1>
          <p className="mt-4 text-[15px] text-ink-subtle">{p.updated}</p>
          <p className="mt-8 text-[19px] leading-[1.55] text-ink-muted">{p.intro}</p>

          <div className="mt-12 space-y-10">
            <Section id="responsable" title={p.ownerTitle}>
              <p>
                {p.ownerIntro} <strong>{owner}</strong>. {p.ownerContact}{' '}
                <a href={`mailto:${site.email}`} className="text-brand hover:underline">
                  {site.email}
                </a>
                .
              </p>
            </Section>

            {p.sections.map((s) => (
              <Section key={s.id} id={s.id} title={s.title}>
                {s.list && (
                  <ul className="list-disc space-y-2 pl-5">
                    {s.list.map((item) => (
                      <li key={item}>
                        <Rich text={item} />
                      </li>
                    ))}
                  </ul>
                )}
                {s.paragraphs?.map((text) => (
                  <p key={text}>
                    <Rich text={text} />
                  </p>
                ))}
              </Section>
            ))}

            <Section id="cookies" title={p.cookiesTitle}>
              <p>{p.cookiesIntro}</p>
              <div className="overflow-x-auto rounded-2xl ring-1 ring-line">
                <table className="w-full min-w-[520px] text-left text-[15px]">
                  <thead className="bg-paper text-ink">
                    <tr>
                      <th className="px-4 py-3 font-semibold">{p.table.name}</th>
                      <th className="px-4 py-3 font-semibold">{p.table.type}</th>
                      <th className="px-4 py-3 font-semibold">{p.table.purpose}</th>
                      <th className="px-4 py-3 font-semibold">{p.table.duration}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.cookieRows.map((c) => (
                      <tr key={c.name} className="border-t border-line align-top">
                        <td className="px-4 py-3 font-mono text-[13px] text-ink">{c.name}</td>
                        <td className="px-4 py-3">{c.type}</td>
                        <td className="px-4 py-3">{c.purpose}</td>
                        <td className="px-4 py-3">{c.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                <button type="button" onClick={openCookieSettings} className="font-medium text-brand hover:underline">
                  {p.changeCookies}
                </button>
              </p>
            </Section>

            <Section id="cambios" title={p.changesTitle}>
              <p>{p.changesBody}</p>
            </Section>
          </div>
        </main>

        <Footer page="privacy" />
        <CookieBanner />
      </div>
    </MotionConfig>
  )
}
