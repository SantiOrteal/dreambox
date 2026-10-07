// Datos del sitio que no dependen del idioma: contacto, URL, ubicación y configuración.
// Los textos (español e inglés) están en src/i18n/es.js y src/i18n/en.js.
// Todo lo marcado con TODO debe reemplazarse por información real antes de publicar.

export const site = {
  name: 'DreamBox',
  legalName: 'DreamBox Dev',
  // Dirección pública del sitio. Se define en .env (VITE_SITE_URL).
  url: import.meta.env.VITE_SITE_URL || 'https://dreamboxdev.netlify.app',
  // TODO (dominio): cambiar por el correo del dominio cuando exista.
  email: 'hola@dreamboxdev.com',
  phone: '+52 56 5923 9380',
  phoneHref: '+525659239380',
  whatsapp: '525659239380', // número en formato internacional, sin + ni espacios
  // Ubicación para los datos que lee Google (no se muestra en los textos de la página).
  location: {
    city: 'Saltillo',
    region: 'Coahuila',
    countryCode: 'MX',
  },
  // Formulario: con VITE_WEB3FORMS_KEY se envía por Web3Forms; si no, con VITE_FORM_ENDPOINT (Formspree u otro);
  // si ninguno existe, abre el correo del visitante con el mensaje listo.
  web3formsKey: import.meta.env.VITE_WEB3FORMS_KEY || '',
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || '',
  // TODO: domicilio para el aviso de privacidad (lo pide la ley mexicana de datos personales).
  legal: {
    owner: 'DreamBox Dev',
    address: '',
  },
  social: {
    // TODO: agrega las URLs reales; los vacíos no se muestran
    linkedin: '',
    instagram: '',
    facebook: '',
    github: '',
  },
}

// Dos filas de la marquesina de herramientas con las que trabajamos. El stack Microsoft va primero: es el principal.
// slug: ícono de cdn.simpleicons.org. icon: ícono genérico (lucide) para marcas que Simple Icons no tiene (C#, SQL Server, Azure).
export const stack = [
  [
    { name: '.NET', slug: 'dotnet' },
    { name: 'C#', icon: 'Code', color: '#68217a' },
    { name: 'SQL Server', icon: 'Database', color: '#cc2927' },
    { name: 'Azure', icon: 'Cloud', color: '#0078d4' },
    { name: 'React', slug: 'react' },
    { name: 'Node.js', slug: 'nodedotjs' },
    { name: 'Python', slug: 'python' },
    { name: 'Next.js', slug: 'nextdotjs' },
    { name: 'Tailwind CSS', slug: 'tailwindcss' },
    { name: 'Figma', slug: 'figma' },
  ],
  [
    { name: 'WordPress', slug: 'wordpress' },
    { name: 'Shopify', slug: 'shopify' },
    { name: 'WooCommerce', slug: 'woocommerce' },
    { name: 'Google Cloud', slug: 'googlecloud' },
    { name: 'Cloudflare', slug: 'cloudflare' },
    { name: 'Docker', slug: 'docker' },
    { name: 'Linux', slug: 'linux' },
    { name: 'MySQL', slug: 'mysql' },
    { name: 'PostgreSQL', slug: 'postgresql' },
    { name: 'Firebase', slug: 'firebase' },
    { name: 'WhatsApp', slug: 'whatsapp' },
    { name: 'Stripe', slug: 'stripe' },
  ],
]
