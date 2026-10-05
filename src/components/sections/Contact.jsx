import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { AlertCircle, ArrowRight, Check, CircleCheck, Loader2, Mail, MessageCircle, Phone } from 'lucide-react'
import { site } from '../../content/site'
import { useT } from '../../i18n'
import SplitText from '../SplitText'

const EASE = [0.23, 1, 0.32, 1]
const empty = { nombre: '', email: '', telefono: '', empresa: '', servicio: '', mensaje: '' }

function validate(v, msg) {
  const e = {}
  if (!v.nombre.trim()) e.nombre = msg.name
  if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = msg.email
  if (v.mensaje.trim().length < 10) e.mensaje = msg.message
  return e
}

function Field({ id, label, optional, error, children }) {
  const { contact } = useT()
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[15px] font-medium text-ink">
        {label} {optional && <span className="font-normal text-ink-subtle">{contact.optional}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="flex items-center gap-1.5 text-[14px] text-red-600">
          <AlertCircle className="h-4 w-4" /> {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const t = useT()
  const c = t.contact
  const { services } = t
  const reduce = useReducedMotion()
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }))
  }

  const aria = (k) => ({ 'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-error` : undefined })

  async function onSubmit(e) {
    e.preventDefault()
    const found = validate(values, c.errors)
    setErrors(found)
    if (Object.keys(found).length) return

    const servicio = services.find((s) => s.id === values.servicio)?.title || c.mail.noService

    // Campo trampa: las personas no lo ven; si viene marcado, es un bot y no se envía.
    if (e.currentTarget.elements.botcheck?.checked) return

    if (!site.web3formsKey && !site.formEndpoint) {
      const body = [
        `Nombre: ${values.nombre}`,
        `Empresa: ${values.empresa}`,
        `Teléfono: ${values.telefono}`,
        `Servicio: ${servicio}`,
        '',
        values.mensaje,
      ].join('\n')
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(c.mail.subject(values.nombre))}&body=${encodeURIComponent(body)}`
      setStatus('sent')
      return
    }

    // Web3Forms recibe campos con nombres legibles en el correo que llega.
    const request = site.web3formsKey
      ? {
          url: 'https://api.web3forms.com/submit',
          body: {
            access_key: site.web3formsKey,
            subject: c.mail.subject(values.nombre),
            from_name: c.mail.fromName,
            replyto: values.email,
            [c.mail.fields.name]: values.nombre,
            [c.mail.fields.email]: values.email,
            [c.mail.fields.phone]: values.telefono || c.mail.notGiven,
            [c.mail.fields.company]: values.empresa || c.mail.notGiven,
            [c.mail.fields.service]: servicio,
            [c.mail.fields.message]: values.mensaje,
            [c.mail.fields.language]: t.lang === 'en' ? 'Inglés' : 'Español',
          },
        }
      : { url: site.formEndpoint, body: { ...values, servicio } }

    setStatus('sending')
    try {
      const res = await fetch(request.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(request.body),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || data.success === false) throw new Error(data.message || String(res.status))
      setStatus('sent')
      setValues(empty)
    } catch {
      setStatus('error')
    }
  }

  const waText = encodeURIComponent(t.common.whatsappMessage)
  const channels = [
    { icon: MessageCircle, label: 'WhatsApp', href: `https://wa.me/${site.whatsapp}?text=${waText}`, accent: true },
    { icon: Mail, label: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: site.phone, href: `tel:${site.phoneHref}` },
  ]

  return (
    <section id="contacto" aria-labelledby="contacto-title" className="py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1240px] px-3 sm:px-6">
        <div className="relative isolate overflow-hidden rounded-[36px] bg-navy-deep px-5 py-16 text-white sm:px-10 md:rounded-[44px] md:py-24 lg:px-16">
          {/* Fondo: luces suaves que se desplazan lentamente (decorativo, se detiene con movimiento reducido) */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -left-32 -top-40 h-[520px] w-[520px] animate-drift rounded-full bg-brand/45 blur-[110px] motion-reduce:animate-none" />
            <div className="absolute -bottom-48 right-[-10%] h-[560px] w-[560px] animate-drift rounded-full bg-[#6d5cff]/35 blur-[120px] [animation-delay:-9s] motion-reduce:animate-none" />
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
          </div>

          <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-[17px] font-semibold text-brand-light"
              >
                {c.eyebrow}
              </motion.p>
              <SplitText
                id="contacto-title"
                text={c.title}
                className="mt-4 text-[2.75rem] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl"
              />
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-6 max-w-[30rem] text-[19px] leading-[1.5] text-white/70"
              >
                {c.body}
              </motion.p>

              <ul className="mt-10 flex flex-wrap gap-3">
                {channels.map(({ icon: Icon, label, href, accent }, i) => (
                  <motion.li
                    key={label}
                    initial={reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(12px)' }}
                    whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.07, ease: EASE }}
                  >
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[15px] transition-[background-color,transform] duration-150 ease-out active:scale-[0.97] ${
                        accent ? 'bg-[#25d366] font-medium text-[#05230f] hover:bg-[#2ee57a]' : 'bg-white/10 text-white hover:bg-white/15'
                      }`}
                    >
                      <Icon className="h-4 w-4" /> {label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <p className="mt-6 text-[14px] text-white/50">{t.common.hours}</p>
            </div>

            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(40px) scale(0.98)' }}
              whileInView={{ opacity: 1, transform: 'translateY(0px) scale(1)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1, delay: 0.15, ease: EASE }}
              className="rounded-[28px] bg-white p-6 text-ink shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] sm:p-8 lg:col-span-7"
            >
              <AnimatePresence mode="wait" initial={false}>
                {status === 'sent' ? (
                  <motion.div
                    key="ok"
                    initial={{ opacity: 0, transform: 'scale(0.97)' }}
                    animate={{ opacity: 1, transform: 'scale(1)' }}
                    exit={{ opacity: 0 }}
                    transition={{ type: 'spring', duration: 0.4, bounce: 0 }}
                    className="flex min-h-[460px] flex-col items-center justify-center text-center"
                    role="status"
                  >
                    <motion.span
                      initial={{ transform: 'scale(0.6)' }}
                      animate={{ transform: 'scale(1)' }}
                      transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
                    >
                      <CircleCheck className="h-14 w-14 text-brand" strokeWidth={1.25} />
                    </motion.span>
                    <h3 className="mt-5 text-[28px] font-semibold tracking-[-0.02em]">{c.sentTitle}</h3>
                    <p className="mt-3 max-w-sm text-[17px] text-ink-muted">
                      {c.sentBody}
                    </p>
                    <button type="button" onClick={() => setStatus('idle')} className="link mt-8">
                      {c.sendAnother}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={onSubmit}
                    noValidate
                    className="grid gap-5 sm:grid-cols-2"
                  >
                    <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                    <fieldset className="sm:col-span-2">
                      <legend className="text-[15px] font-medium text-ink">
                        {c.serviceLegend} <span className="font-normal text-ink-subtle">{c.optional}</span>
                      </legend>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {services.map((s) => {
                          const on = values.servicio === s.id
                          return (
                            <label
                              key={s.id}
                              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-[14px] ring-1 ring-inset transition-[background-color,color,box-shadow,transform] duration-150 ease-out active:scale-[0.97] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand ${
                                on ? 'bg-brand text-white ring-brand' : 'bg-white text-ink ring-line hover:ring-ink-subtle'
                              }`}
                            >
                              <input
                                type="radio"
                                name="servicio"
                                value={s.id}
                                checked={on}
                                onChange={set('servicio')}
                                onClick={() => on && setValues((v) => ({ ...v, servicio: '' }))}
                                className="sr-only"
                              />
                              {on && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
                              {s.title}
                            </label>
                          )
                        })}
                      </div>
                    </fieldset>

                    <Field id="nombre" label={c.name} error={errors.nombre}>
                      <input id="nombre" name="nombre" autoComplete="name" className="field" value={values.nombre} onChange={set('nombre')} {...aria('nombre')} />
                    </Field>
                    <Field id="email" label={c.email} error={errors.email}>
                      <input id="email" name="email" type="email" autoComplete="email" className="field" value={values.email} onChange={set('email')} {...aria('email')} />
                    </Field>
                    <Field id="telefono" label={c.phone} optional>
                      <input id="telefono" name="telefono" type="tel" autoComplete="tel" className="field" value={values.telefono} onChange={set('telefono')} />
                    </Field>
                    <Field id="empresa" label={c.company} optional>
                      <input id="empresa" name="empresa" autoComplete="organization" className="field" value={values.empresa} onChange={set('empresa')} />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field id="mensaje" label={c.message} error={errors.mensaje}>
                        <textarea
                          id="mensaje"
                          name="mensaje"
                          rows={4}
                          className="field resize-y"
                          placeholder={c.messagePlaceholder}
                          value={values.mensaje}
                          onChange={set('mensaje')}
                          {...aria('mensaje')}
                        />
                      </Field>
                    </div>

                    {status === 'error' && (
                      <p role="alert" className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-[15px] text-red-700 sm:col-span-2">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        {c.errors.send(site.email)}
                      </p>
                    )}

                    <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-[13px] text-ink-subtle">
                        {c.privacyNote}{' '}
                        <a href={t.paths.privacy} className="underline hover:text-ink">
                          {c.privacyLink}
                        </a>
                      </p>
                      <button type="submit" disabled={status === 'sending'} className="btn-primary group px-6 py-3 text-[17px] disabled:opacity-60">
                        {status === 'sending' ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" /> {c.sending}
                          </>
                        ) : (
                          <>
                            {c.submit}
                            <ArrowRight className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
