// Permite que otra parte de la página (por ejemplo, las tarjetas del hero) abra un servicio en la sección Servicios.
const EVENT = 'dreambox:open-service'

export function openService(id) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: id }))
}

export function onOpenService(fn) {
  const handler = (e) => fn(e.detail)
  window.addEventListener(EVENT, handler)
  return () => window.removeEventListener(EVENT, handler)
}
