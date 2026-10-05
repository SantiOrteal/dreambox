# DreamBox · Sitio web

Landing de DreamBox (desarrollo de software y soluciones IT). React 18 + Vite + Tailwind 3 + Motion.

## Comandos

- `npm run dev`: servidor de desarrollo
- `npm run build`: build de producción + pre-render del HTML (SEO), `sitemap.xml` y `robots.txt` en `dist/`
- `npm run preview`: sirve `dist/` localmente

## Ambientes y ramas

| Ambiente | Rama | Dónde | Indexación |
|---|---|---|---|
| Dev (pruebas) | `dev` | Netlify: `https://dreamboxdev.netlify.app` | No (`noindex`) |
| Producción | `main` | Cloudflare, con el dominio (pendiente) | Sí |

Flujo: se trabaja en `dev` (cada push publica en Netlify) y se hace merge a `main` cuando está listo.
Mientras no haya dominio, `main` no se publica en ningún lado.

Las variables van en el panel de cada plataforma, nunca en el repo. Plantilla local: `.env.example` → `.env`.

### Dev en Netlify (activo)

1. Netlify → *Add new site → Import an existing project* → elegir el repo de GitHub.
2. *Site configuration → Build & deploy → Branches*: rama de producción **`dev`**; *Branch deploys*: **None**.
3. *Environment variables*: `VITE_WEB3FORMS_KEY` (y `VITE_GA_ID` si se usa).
   `netlify.toml` ya fija el build, Node 20 y `VITE_NOINDEX=true`; la URL del sitio la pone Netlify sola.

### Producción en Cloudflare (al comprar el dominio)

Configuración en `wrangler.jsonc` (Workers con archivos estáticos). Cabeceras HTTP en `public/_headers`, compartidas con Netlify.

1. Comprar el dominio en Cloudflare (queda en la misma cuenta).
2. *Workers & Pages → Create → Import a repository* → elegir el repo.
   - Rama de producción: **`main`**
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
3. *Settings → Build → Variables*: `VITE_SITE_URL=https://www.tudominio.com` (obligatoria, sin `/` final; el build falla si falta),
   `NODE_VERSION=20`, `VITE_WEB3FORMS_KEY` y `VITE_GA_ID` si se usa. **No** definir `VITE_NOINDEX`.
4. *Settings → Domains & Routes → Add custom domain*: `www.tudominio.com`, y redirigir el dominio sin `www` a `www`.
5. En Web3Forms, permitir el nuevo dominio si hay restricción de origen.
6. Registrar el sitio en Google Search Console y enviar `/sitemap.xml`.

## Pendientes de contenido

1. `src/content/site.js`: reemplaza todo lo marcado con `TODO` (correo, teléfono, WhatsApp, redes, compromisos).
2. Testimonios: agrégalos en `testimonials` (solo reales, con permiso). La sección aparece sola cuando hay datos.
3. Después de publicar en el dominio: crea o actualiza tu Perfil de Empresa en Google.

## Estructura

- `src/content/site.js`: todos los textos y datos editables
- `src/components/sections/`: una sección por archivo, en el orden de la historia de la página
- `src/entry-server.jsx` + `scripts/prerender.js`: pre-render y datos estructurados (schema.org)
