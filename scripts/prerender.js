// Pre-renderiza cada página en cada idioma a HTML estático después del build.
// Google y las redes sociales reciben el contenido completo sin ejecutar JavaScript.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { loadEnv } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const env = loadEnv('production', root, '')
// En Netlify, sin VITE_SITE_URL se usa su dirección principal (igual que en vite.config.js).
const siteUrl = (env.VITE_SITE_URL || process.env.URL || 'https://dreamboxdev.netlify.app').replace(/\/$/, '')
// Versión de prueba: pide a los buscadores no indexar (solo en dev).
const noindex = env.VITE_NOINDEX === 'true'

// En Cloudflare (producción) la dirección del dominio es obligatoria: sin ella, el canonical y el
// sitemap apuntarían a Netlify. Se define en el panel de Cloudflare como variable de build.
if ((process.env.WORKERS_CI || process.env.CF_PAGES) && !env.VITE_SITE_URL) {
  console.error('Falta VITE_SITE_URL en las variables de build de Cloudflare (ej. https://www.tudominio.com).')
  process.exit(1)
}

const { render, structuredData, dictionaries } = await import(
  pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href
)

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8')
const LANGS = Object.keys(dictionaries)

// Archivo de salida de cada ruta (Netlify sirve /privacidad desde privacidad.html y /en/ desde en/index.html).
const files = { '/': 'index.html', '/privacidad': 'privacidad.html', '/en/': 'en/index.html', '/en/privacy': 'en/privacy.html' }

// "<" escapado dentro del JSON-LD para que no pueda cerrar la etiqueta <script>.
const escapedLt = String.fromCharCode(92) + 'u003c'
const attr = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function headMeta(page, lang) {
  const t = dictionaries[lang]
  const m = t.meta
  const isHome = page === 'home'
  const url = siteUrl + t.paths[page]
  const title = isHome ? m.title : m.privacyTitle
  const description = isHome ? m.description : m.privacyDescription
  const alternates = LANGS.map(
    (l) => `<link rel="alternate" hreflang="${dictionaries[l].locale}" href="${siteUrl}${dictionaries[l].paths[page]}" />`,
  )
  alternates.push(`<link rel="alternate" hreflang="x-default" href="${siteUrl}${dictionaries.es.paths[page]}" />`)

  const tags = [
    `<meta name="description" content="${attr(description)}" />`,
    isHome ? `<meta name="keywords" content="${attr(m.keywords)}" />` : '',
    `<meta name="robots" content="${noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}" />`,
    `<link rel="canonical" href="${url}" />`,
    ...alternates,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="${t.ogLocale}" />`,
    ...LANGS.filter((l) => l !== lang).map((l) => `<meta property="og:locale:alternate" content="${dictionaries[l].ogLocale}" />`),
    `<meta property="og:site_name" content="DreamBox Dev" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${attr(isHome ? m.ogTitle : title)}" />`,
    `<meta property="og:description" content="${attr(isHome ? m.ogDescription : description)}" />`,
    `<meta property="og:image" content="${siteUrl}/og-image.png" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${attr(m.ogImageAlt)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${attr(isHome ? m.ogTitle : title)}" />`,
    `<meta name="twitter:description" content="${attr(isHome ? m.ogDescription : description)}" />`,
    `<meta name="twitter:image" content="${siteUrl}/og-image.png" />`,
  ]
  return { title, tags: tags.filter(Boolean).join('\n    ') }
}

for (const lang of LANGS) {
  for (const page of ['home', 'privacy']) {
    const t = dictionaries[lang]
    const { title, tags } = headMeta(page, lang)
    const jsonLd =
      page === 'home'
        ? structuredData(lang)
            .map((d) => `<script type="application/ld+json">${JSON.stringify(d).replaceAll('<', escapedLt)}</script>`)
            .join('\n    ')
        : ''
    const html = template
      .replace('<html lang="es">', `<html lang="${t.locale}">`)
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${attr(title)}</title>`)
      .replace('<!--head-meta-->', tags)
      .replace('<!--structured-data-->', jsonLd)
      .replace('<!--app-html-->', render(page, lang))
    const out = path.join(dist, files[t.paths[page]])
    fs.mkdirSync(path.dirname(out), { recursive: true })
    fs.writeFileSync(out, html)
  }
}

// Sitemap con las versiones de cada página enlazadas entre sí (hreflang).
const today = new Date().toISOString().slice(0, 10)
const urls = []
for (const page of ['home', 'privacy']) {
  for (const lang of LANGS) {
    const links = LANGS.map(
      (l) => `    <xhtml:link rel="alternate" hreflang="${dictionaries[l].locale}" href="${siteUrl}${dictionaries[l].paths[page]}" />`,
    ).join('\n')
    urls.push(`  <url>
    <loc>${siteUrl}${dictionaries[lang].paths[page]}</loc>
${links}
    <lastmod>${today}</lastmod>
    <changefreq>${page === 'home' ? 'monthly' : 'yearly'}</changefreq>
    <priority>${page === 'home' ? '1.0' : '0.3'}</priority>
  </url>`)
  }
}
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>
`,
)

// Con noindex se deja entrar a los buscadores para que lean la etiqueta "noindex" de cada página.
fs.writeFileSync(
  path.join(dist, 'robots.txt'),
  noindex
    ? `User-agent: *
Allow: /
`
    : `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`,
)
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true })

console.log(`Pre-render listo para ${siteUrl} (es y en)${noindex ? ' (sin indexar: versión de prueba)' : ''}`)
