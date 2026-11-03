import { createContext, useContext } from 'react'
import es from './es'
import en from './en'
import esPages from './servicePages.es'
import enPages from './servicePages.en'

// Cada página de servicio aporta su ruta a paths, para que el selector de idioma y los enlaces la encuentren por id.
const withPages = (dict, servicePages) => ({
  ...dict,
  servicePages,
  paths: { ...dict.paths, ...Object.fromEntries(servicePages.pages.map((p) => [p.id, p.path])) },
})

// Idiomas del sitio. Español en "/", "/privacidad" y las páginas de servicio; inglés bajo "/en/".
export const dictionaries = { es: withPages(es, esPages), en: withPages(en, enPages) }
export const LANGS = ['es', 'en']

// Clave en el navegador con el idioma que el visitante eligió a mano (se respeta por encima de la detección).
export const LANG_KEY = 'dreambox-lang'

const LangContext = createContext(dictionaries.es)

export function LangProvider({ lang, children }) {
  return <LangContext.Provider value={dictionaries[lang] || dictionaries.es}>{children}</LangContext.Provider>
}

// Textos del idioma activo.
export function useT() {
  return useContext(LangContext)
}

// Qué página e idioma corresponden a una ruta.
export function routeFromPath(pathname) {
  const lang = /^\/en(\/|$)/.test(pathname) ? 'en' : 'es'
  const clean = pathname.replace(/(\.html|\/)$/, '')
  if (/\/(privacidad|privacy)$/.test(clean)) return { lang, page: 'privacy' }
  const service = dictionaries[lang].servicePages.pages.find((p) => p.path === clean)
  return { lang, page: service ? service.id : 'home' }
}

// Guarda la elección manual de idioma (se llama desde el selector).
export function rememberLang(lang) {
  try {
    localStorage.setItem(LANG_KEY, lang)
  } catch {
    // Almacenamiento bloqueado: el cambio vale solo para esta visita.
  }
}
