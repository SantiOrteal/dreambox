import Logo from '../Logo'
import LangSwitch from '../LangSwitch'
import { site } from '../../content/site'
import { openCookieSettings } from '../../lib/consent'
import { useT } from '../../i18n'

const socialNames = { linkedin: 'LinkedIn', instagram: 'Instagram', facebook: 'Facebook', github: 'GitHub' }

// Footer al estilo Apple: tipografía pequeña, gris, columnas y una línea fina.
// page: página actual ("home" o "privacy"); fuera de la principal, los enlaces a secciones llevan a la página de inicio.
export default function Footer({ page = 'home' }) {
  const t = useT()
  const f = t.footer
  const base = page === 'home' ? '' : t.paths.home
  const social = Object.entries(site.social).filter(([, url]) => url)
  const cols = [
    { title: f.company, links: [...t.nav, { label: f.contactLink, href: '#contacto' }].map((l) => ({ ...l, href: base + l.href })) },
    { title: f.services, links: t.services.map((s) => ({ label: s.title, href: `${base}#servicios` })) },
    {
      title: f.contact,
      links: [
        { label: site.email, href: `mailto:${site.email}` },
        { label: site.phone, href: `tel:${site.phoneHref}` },
        ...social.map(([k, url]) => ({ label: socialNames[k], href: url, external: true })),
      ],
    },
  ]

  return (
    <footer className="bg-paper text-[12px] text-ink-muted">
      <div className="wrap py-12">
        <div className="grid gap-10 border-b border-line pb-10 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <Logo variant="original" height={34} href={page === 'home' ? '#inicio' : t.paths.home} />
            <p className="mt-4 max-w-[28ch] leading-normal">{f.tagline}</p>
          </div>
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h2 className="font-semibold text-ink">{c.title}</h2>
              <ul className="mt-3 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="wrap-break-word hover:text-ink hover:underline"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="flex flex-col gap-3 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright © {new Date().getFullYear()} {site.legalName}. {f.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href={t.paths.privacy} className="hover:text-ink hover:underline">
              {f.privacy}
            </a>
            <button type="button" onClick={openCookieSettings} className="hover:text-ink hover:underline">
              {f.cookies}
            </button>
            <LangSwitch page={page} variant="full" className="text-[12px]! font-normal! text-ink-muted! hover:text-ink!" />
          </div>
        </div>
      </div>
    </footer>
  )
}
