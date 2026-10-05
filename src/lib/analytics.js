// Google Analytics 4. Solo se carga si hay un ID configurado (VITE_GA_ID) y el visitante aceptó
// las cookies de análisis. Sin consentimiento no se descarga nada ni se crea ninguna cookie.

const GA_ID = import.meta.env.VITE_GA_ID || ''

export const analyticsEnabled = Boolean(GA_ID)

let loaded = false

export function startAnalytics() {
  if (!GA_ID || loaded) return
  loaded = true
  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', GA_ID)

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)
}

// Si el visitante retira el permiso: se borran las cookies de Analytics y se recarga sin ellas.
export function stopAnalytics() {
  const domain = location.hostname.replace(/^www\./, '')
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim()
    if (name.startsWith('_ga')) {
      for (const d of ['', `; domain=.${domain}`, `; domain=${location.hostname}`]) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${d}`
      }
    }
  })
  if (loaded) location.reload()
}
