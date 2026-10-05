// Preferencia de cookies del visitante. Se guarda en este navegador (no es una cookie)
// y se puede cambiar en cualquier momento desde el pie de página.

const KEY = 'dreambox-consent'
// Sube la versión si cambian las cookies que usa el sitio: el banner volverá a preguntar.
const VERSION = 1
const OPEN_EVENT = 'dreambox:cookie-settings'

export function readConsent() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    return saved && saved.version === VERSION ? saved : null
  } catch {
    return null
  }
}

export function saveConsent(analytics) {
  const value = { version: VERSION, analytics, date: new Date().toISOString() }
  try {
    localStorage.setItem(KEY, JSON.stringify(value))
  } catch {
    // Navegación privada o almacenamiento bloqueado: la elección vale solo para esta visita.
  }
  return value
}

// Para el enlace "Preferencias de cookies": vuelve a mostrar el banner.
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT))
}

export function onOpenCookieSettings(handler) {
  window.addEventListener(OPEN_EVENT, handler)
  return () => window.removeEventListener(OPEN_EVENT, handler)
}
