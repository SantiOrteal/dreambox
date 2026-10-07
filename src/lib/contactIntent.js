// Permite que un botón (por ejemplo "Agenda una demo") deje un servicio preseleccionado en el formulario de contacto.
const EVENT = 'dreambox:preselect-service'

export function preselectService(id) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: id }))
}

export function onPreselectService(fn) {
  const handler = (e) => fn(e.detail)
  window.addEventListener(EVENT, handler)
  return () => window.removeEventListener(EVENT, handler)
}
