import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import '@fontsource-variable/geist'
import './index.css'
import App from './App.jsx'
import Privacy from './pages/Privacy.jsx'
import Manufacturing from './pages/Manufacturing.jsx'
import { LangProvider, routeFromPath } from './i18n'

// La elección automática de idioma (y su redirección) ocurre antes, en un script dentro de index.html.
const { lang, page } = routeFromPath(location.pathname)

// Un enlace desde otra página del sitio (por ejemplo /#servicios desde /manufactura) sí lleva a su sección.
const sectionFromSite =
  page === 'home' &&
  location.hash &&
  document.referrer.startsWith(location.origin) &&
  performance.getEntriesByType('navigation')[0]?.type === 'navigate'

// Fuera de ese caso, la página principal siempre empieza arriba, con la caja cerrada: el navegador no
// restaura la posición anterior al recargar ni salta a un #ancla de la URL.
if (page === 'home') {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  if (location.hash && !sectionFromSite) history.replaceState(null, '', location.pathname + location.search)
  if (!sectionFromSite) window.scrollTo(0, 0)
  // Al volver con "atrás" desde otra página (caché del navegador) también se reinicia.
  window.addEventListener('pageshow', (e) => e.persisted && window.scrollTo(0, 0))
}

const root = document.getElementById('root')
const Page = { home: App, privacy: Privacy, manufacturing: Manufacturing }[page]
const app = (
  <StrictMode>
    <LangProvider lang={lang}>
      <Page />
    </LangProvider>
  </StrictMode>
)

// En producción el HTML viene pre-renderizado (SEO); en desarrollo se monta desde cero.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)
