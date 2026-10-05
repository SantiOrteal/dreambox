// Textos en español. en.js tiene exactamente la misma estructura: si agregas una clave aquí, agrégala allá.
// Los datos que no dependen del idioma (teléfono, correo, URL) están en src/content/site.js.

const es = {
  lang: 'es',
  locale: 'es',
  ogLocale: 'es_MX',
  paths: { home: '/', privacy: '/privacidad' },

  meta: {
    title: 'Soporte IT y desarrollo web en México | DreamBox Dev',
    description:
      'Soporte de software, mantenimiento, desarrollo web y automatización para pymes en todo México. Un equipo que resuelve tu tecnología. Diagnóstico gratuito.',
    keywords:
      'soporte IT para empresas, soporte de software, mantenimiento de software, empresa de desarrollo y soluciones IT, desarrollo web, tiendas en línea, automatización con IA, correo corporativo, consultoría IT, México',
    ogTitle: 'DreamBox Dev | Tecnología que funciona, con un equipo que responde',
    ogDescription: 'Soporte IT, mantenimiento, web y automatización para pymes en México. Agenda un diagnóstico gratuito.',
    ogImageAlt: 'DreamBox Dev, soporte IT y soluciones tecnológicas para empresas',
    privacyTitle: 'Aviso de privacidad y cookies | DreamBox Dev',
    privacyDescription:
      'Qué datos recopila DreamBox Dev, para qué los usa, qué cookies usa el sitio y cómo ejercer tus derechos ARCO.',
    orgDescription: 'Soporte IT, mantenimiento, desarrollo web y soluciones tecnológicas para pymes en México.',
    knowsAbout: ['Soporte técnico de software', 'Mantenimiento de software', 'Desarrollo web', 'Automatización', 'Correo corporativo y nube', 'Consultoría IT'],
    catalogName: 'Servicios de soporte IT y soluciones tecnológicas',
    country: 'México',
  },

  common: {
    cta: 'Habla con nosotros',
    skipToContent: 'Saltar al contenido',
    logoLabel: 'DreamBox Dev, ir al inicio',
    hours: 'Lunes a viernes, 9:00 a 18:00 (hora del centro de México)',
    whatsappMessage: 'Hola DreamBox, me gustaría hablar sobre mi empresa.',
    language: { label: 'Idioma', switchTo: 'English', short: 'EN', current: 'ES' },
  },

  nav: [
    { label: 'Servicios', href: '#servicios' },
    { label: 'Cómo trabajamos', href: '#proceso' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Preguntas', href: '#preguntas' },
  ],

  header: { mainNav: 'Principal', mobileNav: 'Menú', openMenu: 'Abrir menú', closeMenu: 'Cerrar menú' },

  hero: {
    eyebrow: 'Soporte IT para empresas en México',
    title: 'Tecnología que funciona, con un equipo que responde.',
    subtitle: 'Somos el equipo de sistemas de tu empresa: resolvemos, mantenemos y mejoramos tu tecnología.',
    secondary: 'Ver servicios',
    trustLabel: 'Nuestros compromisos',
    trust: ['Respuesta el mismo día', 'Precio fijo mensual', 'Sin contratos largos'],
    cue: 'Descubre qué hay dentro',
    cueLabel: 'Desliza para descubrir nuestros servicios',
    boxLabel: 'La caja de DreamBox se abre y libera soporte, web, inteligencia artificial y nube',
    pieces: ['Soporte', 'Web', 'IA', 'Nube'],
  },

  story: {
    label: 'El problema que resolvemos',
    lines: ['¿Se cayó el sistema otra vez?', '¿Tu web no trae clientes?', '¿Nadie responde cuando algo falla?', 'Nosotros nos encargamos.'],
    tagline: 'Soporte, mantenimiento y mejoras continuas. Un solo equipo para toda tu tecnología.',
  },

  servicesSection: {
    title: 'Todo lo que tu empresa necesita en tecnología.',
    subtitle: 'Un solo equipo para el soporte diario, tu web y tus sistemas. Sin coordinar a cinco proveedores.',
    tabsLabel: 'Servicios',
    pause: 'Pausar avance automático',
    play: 'Reanudar avance automático',
    prev: 'Servicio anterior',
    next: 'Servicio siguiente',
  },

  services: [
    {
      id: 'soporte',
      title: 'Soporte técnico y mesa de ayuda',
      body: 'Resolvemos los problemas con tus programas, cuentas y sistemas por WhatsApp, correo o acceso remoto. Una persona real que conoce tu empresa.',
      short: 'Soporte',
      points: ['Atención remota el mismo día', 'Correo, cuentas y accesos', 'Ayuda con tus programas y tu web'],
      icon: 'Headset',
    },
    {
      id: 'web',
      title: 'Sitios web y tiendas en línea',
      body: 'Creamos, migramos y mantenemos tu web para que cargue rápido, aparezca en Google y reciba clientes.',
      short: 'Web',
      points: ['Diseño que se ve bien en celular', 'Optimizada para Google', 'Cambios cuando los necesites'],
      icon: 'Globe',
    },
    {
      id: 'mantenimiento',
      title: 'Mantenimiento mensual',
      body: 'Actualizaciones, copias de seguridad y monitoreo para que tus sistemas no fallen en el peor momento.',
      short: 'Mantenimiento',
      points: ['Copias de seguridad verificadas', 'Actualizaciones de seguridad', 'Reporte mensual claro'],
      icon: 'ShieldCheck',
    },
    {
      id: 'automatizacion',
      title: 'Automatización e IA',
      body: 'Conectamos tus herramientas y automatizamos tareas repetitivas: cotizaciones, reportes, respuestas y recordatorios.',
      short: 'Automatización',
      points: ['Flujos entre tus herramientas', 'Asistentes con IA', 'Menos captura manual'],
      icon: 'Sparkles',
    },
    {
      id: 'cloud',
      title: 'Nube, correo y seguridad',
      body: 'Configuramos correo corporativo, almacenamiento en la nube, accesos y respaldos de forma segura.',
      short: 'Nube',
      points: ['Correo con tu dominio', 'Archivos compartidos y respaldados', 'Accesos seguros para tu equipo'],
      icon: 'Cloud',
    },
    {
      id: 'sistemas',
      title: 'Sistemas a la medida',
      body: 'Cuando una herramienta estándar no alcanza, desarrollamos la que necesitas y la mantenemos contigo.',
      short: 'A la medida',
      points: ['Inventarios, pedidos y reportes', 'Paneles con tus números', 'Soporte después de entregar'],
      icon: 'Boxes',
    },
  ],

  // Textos de las mini escenas de cada servicio (son ejemplos ilustrativos).
  serviceScenes: {
    support: {
      ticket: 'Solicitud #1042',
      issue: 'Ventas no puede entrar al sistema de facturación',
      steps: ['Recibimos tu mensaje', 'Revisión por acceso remoto', 'Resuelto y confirmado'],
      chip: 'Un técnico ya lo tiene',
    },
    web: {
      url: 'tuempresa.com',
      button: 'Pedir cotización',
      google: 'Te encuentran en Google',
      mobile: 'Lista para celular',
    },
    maintenance: {
      title: 'Revisión mensual',
      live: 'Monitoreo activo',
      checks: ['Copias de seguridad', 'Actualizaciones', 'Certificado SSL vigente'],
      backups: 'Copias verificadas',
      backupsValue: '30 de 30',
    },
    automation: {
      nodes: ['Llega una solicitud', 'La IA la ordena y calcula', 'Cotización enviada al cliente'],
      note: 'Sin que nadie lo capture a mano',
    },
    cloud: {
      email: 'hola@tuempresa.com',
      backup: 'Respaldo diario',
      twoFactor: 'Verificación en dos pasos',
      files: 'Archivos del equipo',
    },
    systems: {
      orders: 'Pedidos de hoy',
      trend: '+12% semana',
      rows: [
        ['Inventario bajo', '3 productos'],
        ['Por entregar', '11 pedidos'],
      ],
      chip: 'Hecho para tu forma de trabajar',
    },
  },

  commitmentsSection: {
    title: 'Lo que puedes esperar de nosotros. Siempre.',
    chat: {
      question: 'Hola, al equipo de ventas no le llega el correo.',
      answer: 'Ya lo estamos revisando. Te avisamos en un momento.',
      resolved: 'Resuelto el mismo día',
    },
    plan: {
      title: 'Tu plan mensual',
      rows: ['Soporte a tu equipo', 'Mantenimiento', 'Copias de seguridad'],
      footer: 'Mismo precio todos los meses',
    },
    owner: { name: 'Tu responsable', status: 'Disponible ahora' },
    toggle: { annual: 'Contrato anual', monthly: 'Mes a mes' },
  },

  // TODO: confirma que estos compromisos reflejan cómo opera tu empresa.
  commitments: [
    { id: 'respuesta', value: 'Mismo día', label: 'Respondemos tus solicitudes de soporte en horario laboral.' },
    { id: 'precio', value: 'Precio fijo', label: 'Planes mensuales claros, sin cobros sorpresa.' },
    { id: 'contacto', value: 'Un responsable', label: 'Una persona que conoce tu empresa y tus sistemas.' },
    { id: 'contrato', value: 'Mes a mes', label: 'Sin contratos largos. Te quedas porque funciona.' },
  ],

  processSection: {
    title: 'De la primera llamada a todo en orden, en cuatro pasos.',
    subtitle: 'Sin contratos eternos ni tecnicismos. En cada etapa sabes qué estamos haciendo, cuánto falta y cuánto cuesta.',
    tabsLabel: 'Pasos',
    step: (n, total) => `Paso ${n} de ${total}`,
    takeaway: 'Te llevas:',
    ctaTitle: 'El primer paso no cuesta nada.',
    ctaBody: 'Agenda tu diagnóstico de 30 minutos y sal con un panorama claro.',
    ctaButton: 'Agendar diagnóstico',
  },

  process: [
    {
      title: 'Diagnóstico',
      body: 'Una videollamada para conocer tu empresa, las herramientas que usan y lo que hoy les quita tiempo. Sin costo y sin compromiso.',
      detail: 'Gratis · 30 minutos',
      items: ['Revisamos tus cuentas, tu web y tus sistemas', 'Separamos lo urgente de lo que puede esperar', 'Resolvemos tus dudas sin tecnicismos'],
      outcome: 'Un panorama claro de dónde estás.',
      icon: 'MessagesSquare',
    },
    {
      title: 'Propuesta',
      body: 'Te enviamos un plan por escrito: qué haremos, en qué orden y cuánto cuesta. Tú decides si avanzamos.',
      detail: 'En menos de 3 días hábiles',
      items: ['Prioridades ordenadas por impacto', 'Precio fijo, sin cobros sorpresa', 'Tiempos claros para cada etapa'],
      outcome: 'Un plan con precio cerrado.',
      icon: 'FileText',
    },
    {
      title: 'Puesta en marcha',
      body: 'Empezamos por lo urgente: accesos, respaldos, correo y web. Tu equipo sigue trabajando mientras ordenamos todo por detrás.',
      detail: 'Sin detener tu operación',
      items: ['Accesos y contraseñas en orden', 'Copias de seguridad funcionando', 'Todo documentado a nombre de tu empresa'],
      outcome: 'Tu tecnología en orden y documentada.',
      icon: 'Rocket',
    },
    {
      title: 'Acompañamiento',
      body: 'Nos quedamos a cargo del día a día: resolvemos solicitudes, prevenimos fallas y cada mes te proponemos mejoras.',
      detail: 'Plan mensual',
      items: ['Un canal directo con tu equipo de soporte', 'Mantenimiento preventivo', 'Un reporte mensual con lo que hicimos'],
      outcome: 'Un área de sistemas, sin tener que contratarla.',
      icon: 'HeartHandshake',
    },
  ],

  // Textos de las escenas de cada paso (ejemplos ilustrativos).
  stepScenes: {
    call: { title: 'Diagnóstico', live: 'En llamada', you: 'Tú' },
    proposal: {
      title: 'Propuesta para tu empresa',
      rows: ['Ordenar accesos y respaldos', 'Correo con tu dominio', 'Renovar la web'],
      price: 'Precio',
      priceValue: 'Fijo mensual',
      approved: 'Aprobada',
    },
    rollout: { title: 'Puesta en marcha', note: 'Sin pausar tu operación', tasks: ['Accesos', 'Respaldos', 'Correo', 'Web'] },
    report: {
      title: 'Reporte del mes',
      example: 'Ejemplo',
      stats: [
        { value: '14', label: 'Solicitudes resueltas' },
        { value: '30/30', label: 'Respaldos correctos' },
        { value: '2', label: 'Mejoras propuestas' },
      ],
      tip: 'Sugerencia: automatizar el envío de cotizaciones.',
    },
  },

  about: {
    title: 'Un socio tecnológico. No un proveedor más.',
    body: 'Somos un equipo mexicano de especialistas en soporte y desarrolladores que atiende a pequeñas y medianas empresas en todo México. Cuando escribes, responde alguien que ya conoce tus sistemas, tus cuentas y tu web.',
    claim: 'No te vendemos tecnología. Nos hacemos cargo de que funcione.',
    toolsTitle: 'Herramientas con las que trabajamos a diario',
  },

  testimonialsSection: { title: 'Lo que dicen nuestros clientes.' },

  // TODO: agrega testimonios REALES de clientes (con su permiso). La sección solo se muestra si hay alguno.
  // Formato: { quote: 'Texto breve del cliente.', name: 'Nombre Apellido', role: 'Cargo', company: 'Empresa' }
  testimonials: [],

  faqSection: { title: 'Preguntas frecuentes.' },

  faqs: [
    {
      q: '¿Qué incluye el plan de soporte mensual?',
      a: 'Atención a tu equipo por WhatsApp, correo y acceso remoto, mantenimiento de tus cuentas, programas y sitio web, copias de seguridad, actualizaciones y un reporte mensual. Ajustamos el plan al tamaño de tu empresa.',
    },
    {
      q: '¿Cuánto cuesta trabajar con DreamBox?',
      a: 'Depende de cuántas personas y sistemas atendemos. Después del diagnóstico gratuito te enviamos una propuesta con precio fijo mensual, o un precio cerrado si es un proyecto puntual como una web.',
    },
    {
      q: '¿Atienden de forma remota o presencial?',
      a: 'Trabajamos de forma remota: la mayoría de los casos los resolvemos el mismo día por acceso remoto, videollamada, WhatsApp o correo. Nos especializamos en software, cuentas y sistemas; no hacemos reparación de equipos.',
    },
    {
      q: '¿Atienden en todo México?',
      a: 'Sí. Como trabajamos de forma remota, damos soporte a empresas en cualquier parte de México.',
    },
    {
      q: '¿Trabajan con empresas pequeñas?',
      a: 'Sí. La mayoría de nuestros clientes son pymes y negocios en crecimiento que no tienen un área de sistemas propia. Nosotros cumplimos ese rol.',
    },
    {
      q: '¿También hacen páginas web y sistemas?',
      a: 'Sí. Diseñamos sitios web, tiendas en línea y sistemas a la medida, y después nos quedamos a cargo de su mantenimiento para que sigan funcionando.',
    },
    {
      q: '¿Tengo que firmar un contrato largo?',
      a: 'No. Los planes son mes a mes. Todos los accesos, cuentas y archivos quedan a nombre de tu empresa, así que nunca dependes de nosotros para operar.',
    },
  ],

  contact: {
    eyebrow: 'Diagnóstico gratuito de 30 minutos',
    title: 'Cuéntanos qué necesitas.',
    body: 'Revisamos contigo cómo está hoy tu tecnología y qué conviene resolver primero. Sin compromiso.',
    serviceLegend: '¿En qué te ayudamos?',
    optional: '(opcional)',
    name: 'Nombre',
    email: 'Correo electrónico',
    phone: 'Teléfono o WhatsApp',
    company: 'Empresa',
    message: '¿Qué está pasando?',
    messagePlaceholder: 'Por ejemplo: queremos ordenar el correo de la empresa y renovar la web.',
    errors: {
      name: 'Escribe tu nombre.',
      email: 'Escribe un correo válido, por ejemplo nombre@empresa.com.',
      message: 'Cuéntanos un poco más para poder ayudarte.',
      send: (email) => `No pudimos enviar tu mensaje. Inténtalo de nuevo o escríbenos a ${email}.`,
    },
    privacyNote: 'Tus datos solo se usan para responderte.',
    privacyLink: 'Aviso de privacidad',
    submit: 'Enviar mensaje',
    sending: 'Enviando',
    sentTitle: 'Gracias. Recibimos tu mensaje.',
    sentBody: 'Te contactamos en menos de 24 horas hábiles para agendar tu diagnóstico.',
    sendAnother: 'Enviar otro mensaje',
    // Lo que llega por correo
    mail: {
      subject: (name) => `Nueva solicitud desde la web: ${name}`,
      fromName: 'Sitio web DreamBox',
      fields: { name: 'Nombre', email: 'Correo', phone: 'Teléfono', company: 'Empresa', service: 'Servicio', message: 'Mensaje', language: 'Idioma' },
      notGiven: 'No indicado',
      noService: 'Sin especificar',
    },
  },

  footer: {
    tagline: 'Soporte IT, web y tecnología para empresas en todo México.',
    company: 'Empresa',
    services: 'Servicios',
    contact: 'Contacto',
    contactLink: 'Contacto',
    rights: 'Todos los derechos reservados.',
    privacy: 'Aviso de privacidad',
    cookies: 'Preferencias de cookies',
  },

  cookies: {
    title: 'Usamos cookies',
    body: 'Con tu permiso usamos cookies de análisis para saber cómo se usa el sitio y mejorarlo. No las usamos para publicidad. Puedes cambiar tu elección cuando quieras.',
    more: 'Más información',
    reject: 'Rechazar',
    accept: 'Aceptar',
  },

  // Aviso de privacidad (/privacidad). **texto** se muestra en negritas. {email} se reemplaza por el correo.
  // Texto general pensado para la ley mexicana: revísalo con tu asesor legal antes de publicar.
  privacy: {
    back: 'Volver al inicio',
    eyebrow: 'Legal',
    title: 'Aviso de privacidad y cookies',
    updated: 'Última actualización: 3 de octubre de 2026',
    intro:
      'En DreamBox Dev cuidamos la información que nos compartes. Aquí te explicamos, sin letra pequeña, qué datos recopilamos, para qué los usamos y cómo puedes decidir sobre ellos, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares.',
    ownerTitle: 'Quién es responsable de tus datos',
    ownerIntro: 'El responsable es',
    ownerContact: 'Puedes escribirnos sobre cualquier tema de privacidad a',
    sections: [
      {
        id: 'datos',
        title: 'Qué datos recopilamos',
        paragraphs: [
          '**Cuando nos escribes** por el formulario, correo o WhatsApp: tu nombre, correo, empresa, teléfono si lo compartes y el mensaje que nos envías.',
          '**Cuando visitas el sitio** y aceptas las cookies de análisis: datos de uso anónimos y agregados, como páginas vistas, tipo de dispositivo y país aproximado.',
          'No pedimos datos sensibles ni datos de pago en este sitio.',
        ],
      },
      {
        id: 'uso',
        title: 'Para qué los usamos',
        list: [
          'Responder tu mensaje y preparar el diagnóstico o la propuesta que nos pidas.',
          'Dar seguimiento a los servicios que contrates con nosotros.',
          'Entender cómo se usa el sitio para mejorarlo, solo si aceptas las cookies de análisis.',
        ],
        paragraphs: ['No vendemos tus datos ni los usamos para publicidad de terceros.'],
      },
      {
        id: 'base',
        title: 'Por qué podemos usarlos',
        paragraphs: [
          'Usamos tus datos porque tú nos los das para que te contactemos (tu consentimiento) y, si contratas un servicio, porque son necesarios para prestarlo. Puedes retirar tu consentimiento en cualquier momento.',
        ],
      },
      {
        id: 'terceros',
        title: 'Con quién los compartimos',
        paragraphs: [
          'Solo con proveedores que nos ayudan a operar el sitio y a comunicarnos contigo: el servicio de envío del formulario, nuestro proveedor de correo, WhatsApp si nos escribes por ahí y Google Analytics si aceptas las cookies de análisis. Cada uno trata los datos según sus propias políticas.',
        ],
      },
      {
        id: 'conservacion',
        title: 'Cuánto tiempo los guardamos',
        paragraphs: [
          'Guardamos los mensajes mientras dure la conversación y, si te conviertes en cliente, mientras dure la relación y lo que exija la ley. Si no avanzamos juntos, puedes pedirnos que los borremos.',
        ],
      },
      {
        id: 'derechos',
        title: 'Tus derechos ARCO',
        paragraphs: [
          'Tienes derecho a **Acceder** a tus datos, **Rectificarlos**, **Cancelarlos** u **Oponerte** a que los usemos, y a revocar tu consentimiento. Para ejercerlos, escríbenos a {email} indicando tu nombre, el derecho que quieres ejercer y un medio para responderte. Te contestamos en un plazo máximo de 20 días hábiles.',
        ],
      },
    ],
    cookiesTitle: 'Cookies',
    cookiesIntro:
      'Las cookies son pequeños archivos que el sitio guarda en tu navegador. Solo usamos las necesarias para recordar tu elección y, si las aceptas, las de análisis.',
    table: { name: 'Nombre', type: 'Tipo', purpose: 'Para qué sirve', duration: 'Duración' },
    cookieRows: [
      {
        name: 'dreambox-consent, dreambox-lang',
        type: 'Necesaria',
        purpose: 'Recuerdan tu elección de cookies y de idioma. Se guardan en tu navegador.',
        duration: 'Hasta que las borres',
      },
      {
        name: '_ga, _ga_*',
        type: 'Análisis (Google Analytics)',
        purpose: 'Cuentan visitas y miden cómo se usa el sitio de forma agregada. Solo se activan si aceptas.',
        duration: 'Hasta 2 años',
      },
    ],
    changeCookies: 'Cambiar mis preferencias de cookies',
    changesTitle: 'Cambios a este aviso',
    changesBody:
      'Si cambiamos este aviso, actualizaremos la fecha de arriba. Si el cambio es importante, te lo avisaremos en el sitio.',
  },
}

export default es
