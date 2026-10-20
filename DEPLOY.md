# Despliegue (CI/CD con GitHub Actions y Cloudflare Workers)

```
rama de trabajo ──► PR a main
                     ├─ CI (lint-build): lint + build              ← obligatorio para hacer merge
                     └─ Deploy / Vista previa: URL pr-N-…workers.dev ← se comenta en el PR
                    merge (PR obligatorio, CI en verde)
main ─────────────► Deploy / Producción ──► https://dreamboxdev.mx
```

| Archivo | Qué hace |
|---|---|
| `.github/workflows/ci.yml` | En cada PR y push a `main`: `npm ci`, `npm run lint`, `npm run build`. |
| `.github/workflows/deploy.yml` | PR a `main` → versión de vista previa. Merge a `main` → producción. |
| `wrangler.jsonc` | Worker `dreambox` con archivos estáticos (`dist`) y el dominio `dreamboxdev.mx`. |
| `public/_headers` | Caché de `/assets/*` y cabeceras de seguridad. |

---

## Configuración inicial (una sola vez)

### 1. Cloudflare

1. **Liberar el dominio para el Worker.** En *dreamboxdev.mx → DNS → Records*, borra los registros que dejó GoDaddy
   para su página de estacionamiento: los dos `A` de `dreamboxdev.mx` (15.197.148.33 y 3.33.130.190) y el
   `CNAME www`. El primer despliegue crea los nuevos. **No toques** los de correo (`MX`, `TXT`).
2. **Crear el token.** *My Profile → API Tokens → Create Token →* plantilla **Edit Cloudflare Workers**.
   - *Account Resources:* tu cuenta. *Zone Resources:* `dreamboxdev.mx`.
   - Copia el token (solo se muestra una vez).
3. **Account ID.** Está en *Workers & Pages* (columna derecha) o en la página de inicio del dominio.
4. **Redirigir www a la dirección sin www.** *dreamboxdev.mx → Rules → Redirect Rules → Create rule →* plantilla
   **Redirect from WWW to root** (o a mano: *Hostname* igual a `www.dreamboxdev.mx`, redirección dinámica 301 a
   `concat("https://dreamboxdev.mx", http.request.uri.path)` conservando la query string). Así Google ve un solo
   sitio: `https://dreamboxdev.mx`.

### 2. GitHub (*Settings → Secrets and variables → Actions*)

| Tipo | Nombre | Valor |
|---|---|---|
| Secret | `CLOUDFLARE_API_TOKEN` | El token del paso anterior |
| Secret | `CLOUDFLARE_ACCOUNT_ID` | El Account ID |
| Variable | `VITE_SITE_URL` | `https://dreamboxdev.mx` |
| Variable | `VITE_NOINDEX` | `true` mientras no quieran aparecer en Google; `false` para lanzar |
| Variable | `VITE_WEB3FORMS_KEY` | Access key de Web3Forms (pedida con `info@dreamboxdev.mx`) |
| Variable | `VITE_GA_ID` | Opcional: ID de Google Analytics 4 (`G-…`) |

La clave de Web3Forms y el ID de Analytics terminan dentro de la página (son públicos por diseño), por eso van como
*Variables* y no como *Secrets*. Los entornos `preview` y `production` se crean solos en el primer despliegue.

### 3. El primer despliegue

El Worker se crea con el **primer despliegue a producción**. Por eso, en el primer PR la *Vista previa* puede fallar
("Worker not found"): no es un check obligatorio, así que se puede hacer merge igual. Después del merge, revisa
*Actions → Deploy → Producción* y abre https://dreamboxdev.mx. Desde ahí, las vistas previas funcionan en cada PR.

---

## Día a día

1. Crea una rama, haz tus cambios y abre un PR a `main`.
2. Espera los dos checks: **CI / lint-build** (obligatorio) y **Deploy / Vista previa**, que comenta la URL en el PR.
3. Revisa la vista previa. Si todo está bien, **Merge pull request**.
4. *Deploy / Producción* publica en dreamboxdev.mx en un par de minutos.

**Lanzar en Google:** cambia la variable `VITE_NOINDEX` a `false` y vuelve a ejecutar *Actions → Deploy →
Run workflow* (en `main`). Las vistas previas siempre quedan sin indexar.

**Volver a una versión anterior:** en Cloudflare, *Workers & Pages → dreambox → Deployments*, elige una versión
anterior y **Rollback**. Es instantáneo y no requiere un nuevo build.

---

## Reglas de `main` (ruleset "Proteger main")

*Settings → Rules → Rulesets*. Hoy está configurado para una sola persona:

- Todo cambio entra por **PR** (no se puede hacer push directo a `main`).
- El check **lint-build** debe pasar y la rama debe estar al día con `main`.
- Los comentarios de la revisión deben quedar **resueltos** antes del merge.
- No se permite force push ni borrar `main`.
- **Aprobaciones requeridas: 0**, porque GitHub no deja aprobar tu propio PR. Tú revisas la vista previa y haces merge.

**Cuando se sume alguien más:** invítalo como colaborador y en el ruleset sube *Required approvals* a **1** (y activa
*Dismiss stale pull request approvals when new commits are pushed*). Desde ahí cada PR necesita la aprobación de la
otra persona.
