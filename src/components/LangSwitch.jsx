import { Globe } from 'lucide-react'
import { dictionaries, rememberLang, useT } from '../i18n'

// Enlace a la misma página en el otro idioma. Guarda la elección para que la detección automática la respete.
export default function LangSwitch({ page = 'home', variant = 'compact', className = '' }) {
  const t = useT()
  const other = t.lang === 'es' ? 'en' : 'es'
  const target = dictionaries[other]
  const { switchTo, short, label } = t.common.language

  return (
    <a
      href={target.paths[page]}
      hrefLang={target.locale}
      lang={target.locale}
      onClick={() => rememberLang(other)}
      aria-label={`${label}: ${switchTo}`}
      className={
        variant === 'compact'
          ? `hit inline-flex h-8 items-center gap-1 rounded-full px-2.5 text-[12px] font-semibold tracking-[0.04em] text-ink/70 transition-colors hover:bg-black/[0.05] hover:text-ink ${className}`
          : `inline-flex items-center gap-2 text-[17px] font-medium text-ink/80 transition-colors hover:text-ink ${className}`
      }
    >
      <Globe className={variant === 'compact' ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
      {variant === 'compact' ? short : switchTo}
    </a>
  )
}
