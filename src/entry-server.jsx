import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'
import Privacy from './pages/Privacy.jsx'
import ServicePage from './pages/ServicePage.jsx'
import { LangProvider, dictionaries } from './i18n'
import { site } from './content/site'

export { dictionaries }

export function render(page = 'home', lang = 'es') {
  return renderToString(
    <StrictMode>
      <LangProvider lang={lang}>
        {page === 'home' ? <App /> : page === 'privacy' ? <Privacy /> : <ServicePage id={page} />}
      </LangProvider>
    </StrictMode>,
  )
}

// Datos estructurados de una página de servicio: el servicio, la ruta de navegación y sus preguntas frecuentes.
export function serviceStructuredData(id, lang = 'es') {
  const t = dictionaries[lang]
  const page = t.servicePages.pages.find((p) => p.id === id)
  const url = `${site.url}${page.path}`
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: page.name,
      description: page.description,
      url,
      serviceType: page.name,
      provider: { '@id': `${site.url}/#organization`, '@type': 'ProfessionalService', name: site.legalName, url: `${site.url}${t.paths.home}` },
      areaServed: { '@type': 'Country', name: t.meta.country },
      inLanguage: t.locale,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: t.servicePages.ui.breadcrumbHome, item: `${site.url}${t.paths.home}` },
        { '@type': 'ListItem', position: 2, name: page.name, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      inLanguage: t.locale,
      mainEntity: page.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]
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
