import { createContext, useContext } from 'react'
import es from './es'
import en from './en'

// Idiomas del sitio. Español en "/" y "/privacidad"; inglés en "/en/" y "/en/privacy".
export const dictionaries = { es, en }
export const LANGS = ['es', 'en']

// Clave en el navegador con el idioma que el visitante eligió a mano (se respeta por encima de la detección).
export const LANG_KEY = 'dreambox-lang'

const LangContext = createContext(es)

export function LangProvider({ lang, children }) {
  return <LangContext.Provider value={dictionaries[lang] || es}>{children}</LangContext.Provider>
}

// Textos del idioma activo.
export function useT() {
  return useContext(LangContext)
}

// Qué página e idioma corresponden a una ruta.
export function routeFromPath(pathname) {
  const lang = /^\/en(\/|$)/.test(pathname) ? 'en' : 'es'
  const page = /\/(privacidad|privacy)(\.html|\/)?$/.test(pathname) ? 'privacy' : 'home'
  return { lang, page }
}

// Guarda la elección manual de idioma (se llama desde el selector).
export function rememberLang(lang) {
  try {
    localStorage.setItem(LANG_KEY, lang)
  } catch {
    // Almacenamiento bloqueado: el cambio vale solo para esta visita.
  }
}
