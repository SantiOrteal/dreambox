import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import Privacy from './pages/Privacy.jsx'
import { LangProvider, dictionaries } from './i18n'
import { site } from './content/site'

export { dictionaries }

const pages = { home: App, privacy: Privacy }

export function render(page = 'home', lang = 'es') {
  const Page = pages[page]
  return renderToString(
    <StrictMode>
      <LangProvider lang={lang}>
        <Page />
      </LangProvider>
    </StrictMode>,
  )
}

// Datos estructurados (schema.org) para que Google entienda la empresa, sus servicios y el FAQ, en cada idioma.
export function structuredData(lang = 'es') {
  const t = dictionaries[lang]
  const pageUrl = `${site.url}${t.paths.home}`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${site.url}/#organization`,
      name: site.name,
      legalName: site.legalName,
      url: pageUrl,
      logo: `${site.url}/brand/logo-square.png`,
      image: `${site.url}/og-image.png`,
      email: site.email,
      telephone: site.phoneHref,
      openingHours: 'Mo-Fr 09:00-18:00',
      // La dirección es para Google (perfil de empresa); no se muestra en los textos de la página.
      address: {
        '@type': 'PostalAddress',
        addressLocality: site.location.city,
        addressRegion: site.location.region,
        addressCountry: site.location.countryCode,
        ...(site.legal.address ? { streetAddress: site.legal.address } : {}),
      },
      areaServed: { '@type': 'Country', name: t.meta.country },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: site.email,
        telephone: site.phoneHref,
        availableLanguage: ['Spanish', 'English'],
      },
      description: t.meta.orgDescription,
      sameAs: Object.values(site.social).filter(Boolean),
      knowsAbout: t.meta.knowsAbout,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: t.meta.catalogName,
        itemListElement: [
          ...t.services.map((s) => ({ name: s.title, description: s.body })),
          { name: t.manufacturing.eyebrow, description: t.manufacturing.body.replaceAll('**', '') },
        ].map((service) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', ...service } })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${pageUrl}#website`,
      url: pageUrl,
      name: site.name,
      inLanguage: t.locale,
      publisher: { '@id': `${site.url}/#organization` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: t.locale,
      mainEntity: t.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]
}
