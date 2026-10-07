// Textos en español. en.js tiene exactamente la misma estructura: si agregas una clave aquí, agrégala allá.
// Los datos que no dependen del idioma (teléfono, correo, URL) están en src/content/site.js.

const es = {
  lang: 'es',
  locale: 'es',
  ogLocale: 'es_MX',
  paths: { home: '/', privacy: '/privacidad' },

  meta: {
    title: 'Soporte IT, software a la medida y manufactura | DreamBox Dev',
    description:
      'Soporte IT, software a la medida y plataformas para manufactura. Más de 10 años construyendo y manteniendo sistemas para empresas en México. Diagnóstico gratuito.',
    keywords:
      'soporte IT para empresas, soporte de software, mantenimiento de software, software a la medida, software para manufactura, PPAP, trazabilidad, sistema Andon, modernización de sistemas legacy, desarrollo .NET, SQL Server, integración Mercado Libre, reportes ERP, desarrollo web, automatización con IA, México',
    ogTitle: 'DreamBox Dev | Tecnología que funciona, con un equipo que responde',
    ogDescription: 'Soporte IT, software a la medida y plataformas para manufactura. Más de 10 años construyendo sistemas. Agenda un diagnóstico gratuito.',
    ogImageAlt: 'DreamBox Dev, soporte IT y soluciones tecnológicas para empresas',
    privacyTitle: 'Aviso de privacidad y cookies | DreamBox Dev',
    privacyDescription:
      'Qué datos recopila DreamBox Dev, para qué los usa, qué cookies usa el sitio y cómo ejercer tus derechos ARCO.',
    orgDescription: 'Soporte IT, software a la medida y plataformas para manufactura para empresas en México.',
    knowsAbout: [
      'Soporte técnico de software',
      'Mantenimiento de software',
      'Software a la medida',
      'Software para manufactura',
      'Modernización de sistemas',
      'Desarrollo web',
      'Automatización',
      'Correo corporativo y nube',
    ],
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
    { label: 'Manufactura', href: '#manufactura' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Cómo trabajamos', href: '#proceso' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Preguntas', href: '#preguntas' },
  ],

  header: { mainNav: 'Principal', mobileNav: 'Menú', openMenu: 'Abrir menú', closeMenu: 'Cerrar menú' },

  hero: {
    eyebrow: 'Soporte y software para empresas en México',
    title: 'Tecnología que funciona, con un equipo que responde.',
    subtitle:
      'Desde hace más de 10 años construimos y mantenemos los sistemas de los que dependen las empresas: soporte diario, software a la medida y plataformas para manufactura.',
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
      body: 'Cuando una herramienta estándar no alcanza, desarrollamos la que necesitas y la mantenemos contigo. Ya lo hicimos para plantas de manufactura, vendedores en marketplaces y empresas que necesitaban sacarle reportes a su ERP.',
      short: 'A la medida',
      points: [
        'Software para manufactura',
        'Integraciones con APIs (Mercado Libre, eBay y otras)',
        'Reportes y dashboards sobre tus datos',
        'Soporte después de entregar',
      ],
      link: { label: 'Ver proyectos', href: '#proyectos' },
      icon: 'Boxes',
    },
    {
      id: 'modernizacion',
      title: 'Modernización de sistemas',
      body: '¿Tu empresa depende de un sistema viejo que ya nadie quiere tocar? Lo llevamos a tecnología actual por partes, sin detener tu operación.',
      short: 'Modernización',
      points: ['Migración por módulos', 'El sistema actual sigue funcionando durante el cambio', 'Todo documentado y a nombre de tu empresa'],
      icon: 'RefreshCw',
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
    modernization: {
      before: 'Sistema anterior',
      after: 'Plataforma nueva',
      modules: ['Inventario', 'Facturación', 'Reportes', 'Usuarios'],
      next: 'En camino',
      chip: 'Sin apagar nada',
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

  // Software para manufactura (#manufactura). **texto** se muestra en negritas.
  // El sistema tiene 12 años: usar siempre "más de 10 años" / "10+ años" / "más de una década", nunca "15 años".
  manufacturing: {
    eyebrow: 'Software para manufactura',
    title: 'Más de 10 años en el piso de producción. Ahora en una plataforma moderna.',
    body: 'Desarrollamos y mantenemos el sistema que opera una planta de autopartes desde hace más de una década. Hoy lo estamos llevando, módulo por módulo, a **Dreambox Manufacturing**: una plataforma hecha para proveedores automotrices Tier 1 y Tier 2.',
    cta: 'Agenda una demo',
    secondary: 'Ver el caso de estudio',
    facts: [
      { value: '10+ años', label: 'Con un sistema propio operando todos los días en una planta automotriz.' },
      { value: 'En tu planta', label: 'Instalación on-premise por sucursal. Tus datos se quedan en tu servidor y la operación no depende de internet.' },
      { value: 'Por módulos', label: 'Migramos un módulo a la vez. El sistema anterior sigue funcionando hasta que el nuevo está listo.' },
    ],
    modulesTitle: 'Módulos pensados para la calidad automotriz.',
    modulesBody: 'Cada módulo nace de un proceso real de planta y se puede adoptar por separado.',
    soon: 'Próximamente',
    modules: [
      {
        id: 'ppap',
        title: 'PPAP',
        body: 'Expedientes por número de parte, estatus de cada elemento y generación de documentos listos para el cliente.',
      },
      {
        id: 'herramental',
        title: 'Herramental',
        body: 'Acciones sobre moldes y herramientas capturadas directo en piso desde un kiosco, con historial por herramental.',
      },
      {
        id: 'trazabilidad',
        title: 'Trazabilidad de componentes',
        body: 'Qué lote de cada componente del BOM entró en cada corrida, por turno y operador. Responde un reclamo del cliente en minutos.',
        soon: true,
      },
    ],
    alsoTitle: 'También incluye',
    // Confirmado: todos ya están en la plataforma nueva. Si alguno vuelve a estar en migración, márcalo con { label, soon: true }.
    also: [
      'Sistema Andon',
      'Recibo de material',
      'Manejo de scrap',
      'Auditoría',
      'Dashboards',
      'Catálogos de planta',
      'Usuarios y permisos por rol',
      'Alertas',
      'Varias plantas por sucursal',
      'Módulos a la medida',
      '…y más',
    ],
  },

  // Ejemplos ilustrativos de los módulos (números de parte, folios y moldes inventados).
  manufacturingScenes: {
    ppap: {
      title: 'PPAP · Nivel 3',
      part: 'No. de parte 4471-B',
      items: [
        { label: 'Dibujo y especificaciones', status: 'Aprobado', done: true },
        { label: 'Estudio dimensional', status: 'Aprobado', done: true },
        { label: 'PSW', status: 'En revisión', done: false },
      ],
    },
    tooling: {
      header: 'Línea 2 · Turno 1',
      tool: 'Molde M-218',
      actions: ['Ajuste', 'Limpieza', 'Reparación'],
      saved: 'Limpieza registrada',
    },
    trace: {
      title: 'Corrida · Folio 000812 · Turno 2',
      product: 'Producto terminado',
      productValue: 'Soporte 7720',
      components: [
        { name: 'Resina PP', lot: 'Lote R-2291' },
        { name: 'Inserto metálico', lot: 'Lote M-0457' },
      ],
    },
  },

  // Caso de estudio (#caso) y cómo modernizamos un sistema existente, en un solo bloque.
  // No mencionar el nombre del cliente hasta tener su autorización.
  caseStudy: {
    eyebrow: 'Caso de estudio · Proveedor automotriz en Saltillo',
    title: 'Modernizar un sistema de más de 10 años sin detener la planta.',
    body: 'La planta operaba con dos sistemas que crecieron por separado durante más de una década. Funcionaban, pero cada cambio era más lento y más riesgoso.',
    beforeTitle: 'Antes',
    before: [
      'Dos sistemas legacy separados, con tecnología de hace más de diez años.',
      'Procesos clave, como scrap y trazabilidad, mezclados en módulos que ya no se usaban.',
      'Cada mejora implicaba tocar código frágil.',
    ],
    afterTitle: 'Ahora',
    after: [
      'Una sola plataforma moderna, instalada en la planta.',
      'PPAP, Herramental y catálogos ya migrados; Trazabilidad en camino.',
      'Cada módulo se documenta y aprueba con la planta antes de construirse.',
    ],
    // TODO: cita real del cliente, con su permiso. Mientras sea null, el bloque no se muestra.
    // Formato: { quote: 'Una o dos frases sobre el resultado.', name: 'Nombre', role: 'Puesto', company: 'Empresa (solo si autoriza)' }
    testimonial: null,
  },

  modernize: {
    title: '¿Tu empresa también corre sobre un sistema viejo?',
    body: 'No hace falta tirarlo y empezar de cero. Lo modernizamos por partes, sin apagar nada.',
    steps: [
      {
        title: 'Entendemos lo que ya funciona',
        body: 'Revisamos tu sistema actual con la gente que lo usa y documentamos cada proceso antes de tocar código.',
      },
      {
        title: 'Migramos un módulo a la vez',
        body: 'Empezamos por el que más duele. Cada módulo tiene alcance, precio y fecha por escrito.',
      },
      {
        title: 'Conviven hasta el cambio',
        body: 'El sistema anterior sigue operando mientras validas el nuevo. Cambias cuando estás seguro.',
      },
    ],
    stack: ['.NET 8', 'React', 'SQL Server', 'On-premise o en la nube', 'Pruebas automatizadas'],
  },

  // Proyectos a la medida (#proyectos). No usar logos de Mercado Libre ni eBay, solo el nombre.
  // TODO: confirmar si los clientes permiten mencionar su giro o nombre.
  projectsSection: {
    title: 'Más allá de la planta.',
    body: 'También construimos sistemas a la medida para otros giros. Dos ejemplos:',
  },

  projects: [
    {
      id: 'marketplaces',
      label: 'Comercio en línea',
      title: 'Inventario conectado a Mercado Libre y eBay',
      body: 'Para una empresa que compra y revende en marketplaces. Desde un solo sistema manejan su inventario y publican, actualizan o dan de baja sus anuncios en Mercado Libre y eBay, conectados directo a sus APIs. Nada de capturar dos veces.',
      points: [
        'Inventario central como única fuente de verdad',
        'Publicar, editar y eliminar anuncios en Mercado Libre y eBay desde el sistema',
        'Integración directa con las APIs de cada marketplace',
      ],
    },
    {
      id: 'erp',
      label: 'Reportes y análisis',
      title: 'Reportes a la medida sobre tu ERP',
      body: 'Pedirle reportes nuevos al proveedor de su ERP les salía muy caro. Nos conectamos a su base de datos, transformamos la información y les entregamos sus reportes y gráficas tal como los necesitaban, sin cambiar de ERP.',
      points: [
        'Conexión directa a la base de datos del ERP',
        'Transformación de datos al formato que el negocio necesita',
        'Reportes personalizados y gráficas',
        'Sin depender ni pagarle al proveedor del ERP por cada reporte',
      ],
    },
  ],

  // Ejemplos ilustrativos de los proyectos.
  projectScenes: {
    marketplaces: {
      sku: 'SKU 10482',
      stock: 'Stock',
      channels: ['Mercado Libre', 'eBay'],
      published: 'Publicado',
      sale: 'Se vendió 1 en eBay → stock actualizado en ambos canales',
    },
    erp: {
      title: 'Ventas por sucursal · Este mes',
      branches: ['Centro', 'Norte', 'Sur', 'Oriente'],
      source: 'Datos de tu ERP',
    },
  },

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
    body: [
      'Somos un equipo pequeño y con experiencia. Desde hace más de 10 años desarrollamos y mantenemos sistemas que empresas usan todos los días: desde el software de una planta automotriz hasta inventarios conectados a marketplaces y reportes sobre ERPs.',
      'Aquí no hay intermediarios ni ejecutivos de cuenta. Cuando escribes, te responde la misma persona que construyó y conoce tu sistema.',
    ],
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
      // TODO (confirmar): si hacemos visitas a planta, agregar al final:
      // "Para proyectos de manufactura podemos hacer visitas a planta cuando el proyecto lo requiere."
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
      q: '¿Trabajan con plantas de manufactura?',
      a: 'Sí. Desde hace más de 10 años desarrollamos y mantenemos el sistema de una planta de autopartes, y hoy estamos construyendo Dreambox Manufacturing, una plataforma con módulos como PPAP, herramental, trazabilidad, Andon y scrap. Se instala en tu planta y puedes adoptar solo los módulos que necesites.',
    },
    {
      q: 'Tengo un sistema viejo que funciona, pero ya nadie lo quiere tocar. ¿Pueden ayudarme?',
      a: 'Sí, es justo lo que hacemos. Primero lo entendemos y documentamos; después lo migramos por partes a tecnología actual, sin apagar el sistema que hoy usas.',
    },
    {
      q: '¿Pueden conectarse a mi ERP o a otros sistemas que ya tengo?',
      a: 'Sí. Nos conectamos a la base de datos o a las APIs de tus sistemas para generar reportes, dashboards o integraciones, sin que tengas que cambiar de proveedor.',
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
    // Opciones extra además de los servicios (el id "manufactura" lo preselecciona "Agenda una demo").
    extraOptions: [{ id: 'manufactura', title: 'Software para manufactura' }],
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
    tagline: 'Soporte IT, software a la medida y software para manufactura, para empresas en México.',
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
