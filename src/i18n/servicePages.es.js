// Páginas por servicio (SEO): cada una responde a una búsqueda concreta en Google.
// servicePages.en.js tiene la misma estructura y los mismos id.
// Reglas de contenido: "más de 10 años" (nunca 15), sin nombres de clientes, sin reparación de equipos y sin cifras inventadas.

const es = {
  ui: {
    breadcrumbHome: 'Inicio',
    primary: 'Agenda tu diagnóstico gratis',
    secondary: 'Escríbenos por WhatsApp',
    faqTitle: 'Preguntas frecuentes',
    relatedTitle: 'Otros servicios',
    more: 'Ver más sobre este servicio',
    takeawayPrice: 'El diagnóstico de 30 minutos no tiene costo ni compromiso.',
  },

  pages: [
    {
      id: 'soporte',
      icon: 'Headset',
      path: '/soporte-it-para-empresas',
      name: 'Soporte IT para empresas',
      title: 'Soporte IT para empresas en México | DreamBox Dev',
      description:
        'Soporte técnico, mesa de ayuda y mantenimiento para empresas sin área de TI. Atención remota en todo México por WhatsApp o correo. Diagnóstico gratis.',
      eyebrow: 'Soporte técnico y mesa de ayuda',
      h1: 'Soporte IT para empresas que no tienen área de sistemas',
      intro:
        'Cuando el correo no llega, un sistema se traba o nadie sabe quién tiene las contraseñas, tu equipo deja de trabajar. Nos convertimos en tu área de TI: nos escribes por WhatsApp o correo y lo resolvemos, casi siempre por acceso remoto.',
      problemsTitle: '¿Te suena alguna de estas situaciones?',
      problems: [
        'Cada vez que algo falla, nadie sabe a quién llamar.',
        'Dependes de un técnico que tarda días en contestar.',
        'Las contraseñas y cuentas de la empresa están a nombre de alguien que ya no trabaja ahí.',
        'No estás seguro de si tus respaldos funcionan.',
        'Contratar a una persona de sistemas de tiempo completo no se justifica todavía.',
      ],
      includesTitle: 'Qué incluye nuestro soporte IT',
      includes: [
        {
          title: 'Mesa de ayuda',
          body: 'Tu equipo nos escribe por WhatsApp o correo. Damos seguimiento a cada solicitud hasta que queda resuelta.',
        },
        {
          title: 'Correo, cuentas y accesos',
          body: 'Correo con tu dominio, cuentas de usuario, contraseñas y permisos en orden y a nombre de tu empresa.',
        },
        {
          title: 'Mantenimiento mensual',
          body: 'Actualizaciones, monitoreo y copias de seguridad verificadas, para prevenir la falla en lugar de correr a repararla.',
        },
        {
          title: 'Programas y sistemas del día a día',
          body: 'Ayuda con el software que usa tu empresa, tu sitio web y las herramientas en la nube.',
        },
        {
          title: 'Nube y seguridad',
          body: 'Archivos compartidos y respaldados, verificación en dos pasos y accesos seguros para trabajar desde cualquier lugar.',
        },
        {
          title: 'Reporte mensual',
          body: 'Cada mes te decimos qué resolvimos, cómo están tus respaldos y qué conviene mejorar.',
        },
      ],
      howTitle: 'Cómo empezamos',
      how: [
        { title: 'Diagnóstico gratuito', body: 'Una videollamada de 30 minutos para conocer tu empresa y lo que hoy te quita tiempo.' },
        { title: 'Propuesta por escrito', body: 'Qué haremos, en qué orden y cuánto cuesta, con una cuota fija mensual.' },
        { title: 'Ordenamos lo urgente', body: 'Accesos, respaldos, correo y web, sin que tu equipo deje de trabajar.' },
        { title: 'Nos quedamos contigo', body: 'Un responsable que conoce tu empresa atiende el día a día. El plan es mes a mes.' },
      ],
      faqs: [
        {
          q: '¿Qué es un servicio de soporte IT para empresas?',
          a: 'Es contar con un equipo externo que se hace cargo de la tecnología de tu empresa: resuelve problemas de tus usuarios, mantiene tus sistemas y evita fallas. Funciona como un área de sistemas sin tener que contratarla.',
        },
        {
          q: '¿Atienden en toda la República Mexicana?',
          a: 'Sí. Trabajamos de forma remota con empresas de cualquier parte de México, por acceso remoto, videollamada, WhatsApp o correo.',
        },
        {
          q: '¿Qué tan rápido responden?',
          a: 'Respondemos las solicitudes de soporte el mismo día, en horario laboral: de lunes a viernes, de 9:00 a 18:00 (hora del centro de México).',
        },
        {
          q: '¿Reparan computadoras o impresoras?',
          a: 'No. Nos especializamos en software, cuentas y sistemas. No hacemos reparación de equipos.',
        },
        {
          q: '¿Cuánto cuesta el soporte IT?',
          a: 'Es una cuota fija mensual que depende de cuántas personas y sistemas atendemos. Te la damos por escrito después del diagnóstico gratuito, sin cobros sorpresa.',
        },
        {
          q: '¿Tengo que firmar un contrato largo?',
          a: 'No. El soporte es mes a mes. Además, tus accesos, cuentas y archivos están a nombre de tu empresa desde el primer día.',
        },
      ],
      related: ['sistemas', 'web', 'automatizacion'],
    },

    {
      id: 'sistemas',
      icon: 'Boxes',
      path: '/software-a-la-medida',
      name: 'Desarrollo de software a la medida',
      title: 'Desarrollo de software a la medida en México | DreamBox Dev',
      description:
        'Sistemas a la medida: integraciones con APIs, reportes sobre tu ERP e inventarios. Más de 10 años desarrollando y manteniendo software. Diagnóstico gratis.',
      eyebrow: 'Sistemas a la medida',
      h1: 'Desarrollo de software a la medida para tu empresa',
      intro:
        'Cuando una herramienta estándar no alcanza, terminas con hojas de cálculo, doble captura y procesos que dependen de una sola persona. Desarrollamos el sistema que tu operación necesita y nos quedamos para mantenerlo contigo.',
      problemsTitle: 'Cuándo conviene un sistema a la medida',
      problems: [
        'Capturas la misma información en dos o más sistemas.',
        'Tu operación depende de archivos de Excel que solo una persona entiende.',
        'Cada reporte nuevo le cuesta a tu empresa dinero o días de trabajo.',
        'El software que compraste no se adapta a tu forma de trabajar.',
        'Tus sistemas no se hablan entre sí.',
      ],
      includesTitle: 'Qué podemos construir',
      includes: [
        {
          title: 'Sistemas internos',
          body: 'Inventarios, pedidos, operación y paneles con los números que tu negocio necesita ver.',
        },
        {
          title: 'Integraciones con APIs',
          body: 'Conectamos tus sistemas entre sí y con servicios externos como Mercado Libre y eBay, para no capturar dos veces.',
        },
        {
          title: 'Reportes sobre tu ERP',
          body: 'Nos conectamos a la base de datos de tu ERP y creamos los reportes y gráficas que necesitas, sin cambiar de proveedor.',
        },
        {
          title: 'Software para manufactura',
          body: 'Plataformas para el piso de producción, con más de 10 años de experiencia en plantas de autopartes.',
        },
        {
          title: 'Soporte después de entregar',
          body: 'No desaparecemos al terminar: seguimos a cargo del sistema con un mantenimiento mensual opcional.',
        },
        {
          title: 'Tu código y tus datos',
          body: 'Todo queda documentado y a nombre de tu empresa, para que nunca dependas de nosotros para operar.',
        },
      ],
      howTitle: 'Cómo trabajamos un proyecto',
      how: [
        { title: 'Entendemos tu proceso', body: 'Hablamos con quienes lo viven todos los días antes de escribir una línea de código.' },
        { title: 'Alcance, precio y fecha', body: 'Una propuesta por escrito, por proyecto o por módulos, sin cobros sorpresa.' },
        { title: 'Construimos por etapas', body: 'Ves avances reales y validas cada parte antes de pasar a la siguiente.' },
        { title: 'Lo mantenemos contigo', body: 'Quien te contesta es quien construyó tu sistema.' },
      ],
      proof: {
        title: 'Un ejemplo real',
        body: 'Para una empresa que compra y revende en marketplaces, construimos un inventario central conectado a las APIs de Mercado Libre y eBay: desde un solo sistema publican, editan y dan de baja sus anuncios. Para otra, creamos reportes y gráficas directamente sobre su ERP, sin depender de pagarle a su proveedor por cada reporte.',
      },
      faqs: [
        {
          q: '¿Cuánto cuesta desarrollar un sistema a la medida?',
          a: 'Depende del alcance. Después del diagnóstico gratuito te damos alcance, precio y fecha por escrito. Según el proyecto, puede ser un pago por proyecto, una inversión inicial con pagos mensuales o solo pagos mensuales.',
        },
        {
          q: '¿Se pueden conectar a mi ERP o a los sistemas que ya tengo?',
          a: 'Sí. Nos conectamos a la base de datos o a las APIs de tus sistemas para generar reportes, dashboards o integraciones, sin que tengas que cambiar de proveedor.',
        },
        {
          q: '¿De quién es el sistema cuando termina el proyecto?',
          a: 'Accesos, cuentas, archivos y documentación están a nombre de tu empresa desde el primer día.',
        },
        {
          q: '¿Dan soporte después de entregar?',
          a: 'Sí. Puedes contratar un mantenimiento mensual para actualizaciones, mejoras y soporte. Es opcional y sin contrato largo.',
        },
      ],
      related: ['modernizacion', 'manufactura', 'automatizacion'],
    },

    {
      id: 'manufactura',
      icon: 'Factory',
      path: '/software-para-manufactura',
      name: 'Software para manufactura',
      title: 'Software para manufactura en México | DreamBox Dev',
      description:
        'Plataforma para plantas y proveedores automotrices: PPAP, herramental, Andon, scrap y trazabilidad. Instalada en tu planta, por módulos. Agenda una demo.',
      eyebrow: 'Dreambox Manufacturing',
      h1: 'Software para manufactura hecho desde el piso de producción',
      intro:
        'Dreambox Manufacturing nació del sistema que desarrollamos y mantenemos desde hace más de 10 años para una planta de autopartes. Reúne PPAP, herramental, Andon, scrap y más en una plataforma moderna que se instala en tu planta.',
      problemsTitle: 'Para plantas que hoy lidian con esto',
      problems: [
        'Los expedientes PPAP viven en carpetas y correos, y armarlos para el cliente toma días.',
        'Lo que pasa con moldes y herramientas se registra en papel, si es que se registra.',
        'Ante un reclamo, encontrar qué lote se usó en cada corrida lleva demasiado tiempo.',
        'La información de calidad y producción está repartida en sistemas que no se hablan.',
        'Las soluciones grandes son demasiado costosas o no se adaptan a cómo trabaja tu planta.',
      ],
      includesTitle: 'Módulos de la plataforma',
      includes: [
        {
          title: 'PPAP',
          body: 'Expedientes por número de parte, estatus de cada elemento y documentos listos para el cliente.',
        },
        {
          title: 'Herramental',
          body: 'Acciones sobre moldes y herramientas capturadas directo en piso desde un kiosco, con historial por herramental.',
        },
        {
          title: 'Trazabilidad de componentes (próximamente)',
          body: 'Qué lote de cada componente del BOM entró en cada corrida, por turno y operador, para responder un reclamo en minutos.',
        },
        {
          title: 'Sistema Andon',
          body: 'Visibilidad de lo que ocurre en la línea, para reaccionar a tiempo.',
        },
        {
          title: 'Scrap, recibo de material y auditoría',
          body: 'Registro de scrap, recepción de material y auditorías en un solo lugar, con dashboards y alertas.',
        },
        {
          title: 'Módulos a la medida',
          body: 'Si tu proceso lo necesita, lo construimos. Cada módulo se documenta y se aprueba con la planta antes de desarrollarse.',
        },
      ],
      howTitle: 'Por qué es diferente',
      how: [
        { title: 'Hecha para Tier 1 y Tier 2', body: 'Pensada para los requisitos de calidad de los proveedores automotrices.' },
        { title: 'On-premise', body: 'Una instalación por sucursal. Tus datos se quedan en tu servidor y la operación no depende de internet.' },
        { title: 'Por módulos', body: 'Adopta solo los que necesitas: cada uno funciona por separado.' },
        { title: 'Un equipo que conoce la planta', body: 'Más de una década operando todos los días en piso de producción.' },
      ],
      proof: {
        title: 'Caso real: proveedor automotriz',
        body: 'La planta dependía de dos sistemas legacy que crecieron por separado durante años. Hoy opera con una sola plataforma moderna instalada en sitio: PPAP, Herramental y catálogos ya migrados, y Trazabilidad en camino. Todo sin detener la operación.',
      },
      faqs: [
        {
          q: '¿Qué es PPAP y cómo lo maneja el sistema?',
          a: 'PPAP (Production Part Approval Process) es el proceso con el que un proveedor demuestra a su cliente que puede producir una parte cumpliendo los requisitos. La plataforma organiza los expedientes por número de parte, muestra el estatus de cada elemento y genera documentos listos para el cliente.',
        },
        {
          q: '¿Se instala en la nube o en mi planta?',
          a: 'Se instala en tu planta (on-premise), con una instalación por sucursal. Tus datos se quedan en tu servidor y la operación no depende de internet.',
        },
        {
          q: '¿Tengo que comprar todos los módulos?',
          a: 'No. Adoptas solo los que necesitas, y cada uno funciona por separado.',
        },
        {
          q: '¿Ya tenemos un sistema, hay que apagarlo?',
          a: 'No. Migramos por módulos y el sistema anterior sigue operando mientras validas el nuevo. Cambias cuando estás seguro.',
        },
      ],
      related: ['modernizacion', 'sistemas', 'soporte'],
    },

    {
      id: 'modernizacion',
      icon: 'RefreshCw',
      path: '/modernizacion-de-sistemas',
      name: 'Modernización de sistemas legacy',
      title: 'Modernización de sistemas legacy | DreamBox Dev',
      description:
        '¿Tu empresa depende de un sistema viejo? Lo migramos a tecnología actual por módulos, sin detener tu operación. Diagnóstico gratuito.',
      eyebrow: 'Modernización de sistemas',
      h1: 'Modernización de sistemas legacy sin detener tu operación',
      intro:
        'Tu empresa depende de un sistema viejo que ya nadie quiere tocar. Funciona, pero cada cambio es un riesgo. No hace falta tirarlo y empezar de cero: lo migramos a tecnología actual, un módulo a la vez, mientras sigues operando.',
      problemsTitle: 'Señales de que tu sistema ya es un freno',
      problems: [
        'Cada mejora implica tocar código frágil y cruzar los dedos.',
        'La única persona que lo entendía ya no está, o está por irse.',
        'La información está repartida entre varios sistemas que crecieron por separado.',
        'Los procesos clave están mezclados en módulos que ya nadie usa.',
        'Te da miedo qué pasaría si un día deja de funcionar.',
      ],
      includesTitle: 'Qué incluye la modernización',
      includes: [
        {
          title: 'Documentación del sistema actual',
          body: 'Lo revisamos con quienes lo usan a diario, para no perder nada de lo que hoy sí funciona.',
        },
        {
          title: 'Migración por módulos',
          body: 'Empezamos por el que más duele. Cada módulo tiene alcance, precio y fecha por escrito.',
        },
        {
          title: 'Convivencia durante el cambio',
          body: 'El sistema anterior sigue operando mientras validas el nuevo.',
        },
        {
          title: 'Migración de datos',
          body: 'Llevamos tu información a la plataforma nueva, validándola contigo.',
        },
        {
          title: 'Tecnología actual',
          body: '.NET 8, React y SQL Server, on-premise o en la nube, con pruebas automatizadas.',
        },
        {
          title: 'Mantenimiento posterior',
          body: 'Seguimos a cargo si lo necesitas, para que el sistema no vuelva a quedarse atrás.',
        },
      ],
      howTitle: 'Nuestro método, en tres pasos',
      how: [
        { title: 'Entendemos lo que ya funciona', body: 'Con la gente que usa el sistema todos los días.' },
        { title: 'Migramos un módulo a la vez', body: 'Empezando por el que más duele, sin un cambio total y riesgoso.' },
        { title: 'Conviven hasta el cambio', body: 'Cambias cuando estás seguro, no antes.' },
      ],
      proof: {
        title: 'Caso real: un sistema de más de 10 años',
        body: 'Un proveedor automotriz dependía de dos sistemas legacy. Hoy opera con una sola plataforma moderna, sin haber detenido la planta. Cada módulo se documenta y se aprueba con la planta antes de construirse.',
      },
      faqs: [
        {
          q: '¿Qué es un sistema legacy?',
          a: 'Es un sistema antiguo del que tu empresa sigue dependiendo. Suele funcionar, pero es difícil de cambiar, usa tecnología que ya casi no tiene soporte y muchas veces lo entienden muy pocas personas.',
        },
        {
          q: '¿Tenemos que detener la operación para migrar?',
          a: 'No. Migramos por partes y el sistema actual sigue operando mientras validas el nuevo.',
        },
        {
          q: '¿Hay que reescribir todo desde cero?',
          a: 'No de golpe. Empezamos por el módulo que más duele y avanzamos uno a la vez, con alcance, precio y fecha por escrito para cada uno.',
        },
        {
          q: '¿Cuánto cuesta modernizar un sistema?',
          a: 'Depende del tamaño y el estado del sistema. Como es por módulos, puedes avanzar por etapas. Te lo decimos por escrito después del diagnóstico gratuito.',
        },
      ],
      related: ['sistemas', 'manufactura', 'soporte'],
    },

    {
      id: 'web',
      icon: 'Globe',
      path: '/paginas-web-para-empresas',
      name: 'Páginas web y tiendas en línea',
      title: 'Páginas web y tiendas en línea para empresas | DreamBox Dev',
      description:
        'Diseño, migración y mantenimiento de páginas web y tiendas en línea para empresas en México. Rápidas, pensadas para celular y optimizadas para Google.',
      eyebrow: 'Sitios web y tiendas en línea',
      h1: 'Páginas web para empresas que traen clientes, no solo visitas',
      intro:
        'Tu página web debería ser tu mejor vendedor. Creamos, migramos y mantenemos sitios y tiendas en línea rápidos, pensados para celular y optimizados para Google, y nos quedamos a cargo para que sigan funcionando.',
      problemsTitle: '¿Tu sitio web tiene alguno de estos problemas?',
      problems: [
        'Tarda en cargar o se ve mal en el celular.',
        'No aparece en Google cuando buscan lo que vendes.',
        'Hacer un cambio pequeño es lento o costoso.',
        'Nadie sabe quién tiene los accesos al dominio o al hosting.',
        'Recibe visitas, pero casi nadie te contacta.',
      ],
      includesTitle: 'Qué incluye',
      includes: [
        { title: 'Diseño pensado para celular', body: 'Claro y fácil de usar en cualquier pantalla, con llamados a la acción que convierten visitas en contactos.' },
        { title: 'Velocidad y SEO', body: 'Sitios rápidos, con la estructura y el contenido que Google necesita para entender lo que vendes.' },
        { title: 'Tiendas en línea', body: 'Catálogo y pagos con plataformas como Shopify o WooCommerce, según lo que tu negocio necesite.' },
        { title: 'Migración', body: 'Pasamos tu sitio actual a una plataforma nueva cuidando tus contenidos.' },
        { title: 'Dominio y correo', body: 'Dominio, DNS y correo con tu marca, todo a nombre de tu empresa.' },
        { title: 'Cambios y mantenimiento', body: 'Actualizaciones, respaldos y los cambios que necesites, sin depender de terceros.' },
      ],
      howTitle: 'Cómo lo hacemos',
      how: [
        { title: 'Diagnóstico', body: 'Revisamos tu sitio actual, tu negocio y a quién le quieres vender.' },
        { title: 'Propuesta', body: 'Alcance, precio y fecha por escrito.' },
        { title: 'Diseño y desarrollo', body: 'Ves avances y das tu opinión antes de publicar.' },
        { title: 'Publicación y cuidado', body: 'Lo publicamos, lo damos de alta en Google y lo mantenemos.' },
      ],
      faqs: [
        {
          q: '¿Cuánto cuesta una página web para una empresa?',
          a: 'Depende de lo que necesites: no cuesta lo mismo un sitio informativo que una tienda en línea. Te damos un precio cerrado por escrito después del diagnóstico gratuito.',
        },
        {
          q: '¿Mi página va a salir en Google?',
          a: 'La construimos con todo lo que Google necesita y la damos de alta en sus herramientas. Nadie serio puede garantizar el primer lugar: el posicionamiento también depende del contenido, la competencia y el tiempo.',
        },
        {
          q: '¿Pueden arreglar o migrar mi sitio actual?',
          a: 'Sí. Podemos mejorarlo o migrarlo a una plataforma nueva, según lo que convenga después de revisarlo.',
        },
        {
          q: '¿De quién es el dominio y la página?',
          a: 'De tu empresa. Dominio, accesos y archivos quedan a tu nombre desde el primer día.',
        },
      ],
      related: ['soporte', 'automatizacion', 'sistemas'],
    },

    {
      id: 'automatizacion',
      icon: 'Sparkles',
      path: '/automatizacion-con-ia',
      name: 'Automatización e IA para empresas',
      title: 'Automatización e IA para empresas en México | DreamBox Dev',
      description:
        'Automatiza cotizaciones, reportes, respuestas y recordatorios. Conectamos tus herramientas y creamos asistentes con IA para tu empresa. Diagnóstico gratis.',
      eyebrow: 'Automatización e IA',
      h1: 'Automatización e inteligencia artificial para empresas',
      intro:
        'Tu equipo pierde horas copiando datos de un lado a otro, armando reportes y respondiendo lo mismo. Conectamos tus herramientas y automatizamos esas tareas, para que tu gente se dedique a lo que sí requiere a una persona.',
      problemsTitle: 'Tareas que suelen valer la pena automatizar',
      problems: [
        'Cotizaciones que se arman a mano, una por una.',
        'Reportes que alguien prepara cada semana copiando y pegando.',
        'Preguntas de clientes que se responden siempre igual.',
        'Recordatorios y seguimientos que se olvidan.',
        'Datos que se capturan dos veces en sistemas distintos.',
      ],
      includesTitle: 'Qué podemos automatizar',
      includes: [
        { title: 'Flujos entre tus herramientas', body: 'Conectamos correo, hojas de cálculo, CRM y tus sistemas para que la información fluya sola.' },
        { title: 'Asistentes con IA', body: 'Asistentes que ayudan a responder, clasificar solicitudes o buscar información de tu negocio, con supervisión de tu equipo.' },
        { title: 'Cotizaciones y documentos', body: 'Generación de cotizaciones y documentos a partir de los datos que ya tienes.' },
        { title: 'Reportes automáticos', body: 'Tus números listos y actualizados, sin armarlos a mano cada semana.' },
        { title: 'Recordatorios y seguimiento', body: 'Avisos a clientes y a tu equipo en el momento correcto.' },
        { title: 'Menos captura manual', body: 'Menos errores y menos tiempo perdido en tareas repetitivas.' },
      ],
      howTitle: 'Cómo empezamos',
      how: [
        { title: 'Encontramos la tarea que más tiempo quita', body: 'En el diagnóstico gratuito revisamos cómo trabaja hoy tu equipo.' },
        { title: 'Empezamos en pequeño', body: 'Automatizamos una tarea concreta, para que veas el resultado antes de invertir más.' },
        { title: 'Medimos y seguimos', body: 'Lo que funciona se amplía a otras áreas. Lo mantenemos funcionando contigo.' },
      ],
      faqs: [
        {
          q: '¿Qué se puede automatizar en una empresa pequeña?',
          a: 'Casi cualquier tarea repetitiva con reglas claras: cotizaciones, reportes, respuestas frecuentes, recordatorios y captura de datos entre sistemas.',
        },
        {
          q: '¿La IA va a reemplazar a mi equipo?',
          a: 'La idea es quitarle tareas repetitivas para que se dedique a lo que requiere criterio. Lo importante sigue pasando por una persona.',
        },
        {
          q: '¿Tengo que cambiar las herramientas que ya uso?',
          a: 'Normalmente no. Primero intentamos conectar lo que ya tienes.',
        },
        {
          q: '¿Mi información está segura?',
          a: 'Revisamos contigo qué datos intervienen y qué herramientas son adecuadas antes de automatizar, y los accesos quedan a nombre de tu empresa.',
        },
      ],
      related: ['sistemas', 'soporte', 'web'],
    },
  ],
}

export default es
