// English copy. Same structure as es.js: when you add a key there, add it here too.

const en = {
  lang: 'en',
  locale: 'en',
  ogLocale: 'en_US',
  paths: { home: '/en/', privacy: '/en/privacy' },

  meta: {
    title: 'IT Support, Custom Software & Manufacturing | DreamBox Dev',
    description:
      'IT support, custom software and manufacturing platforms. Over 10 years building and maintaining the systems businesses in Mexico rely on. Free assessment.',
    keywords:
      'IT support for businesses, software support, software maintenance, custom software, manufacturing software, PPAP, traceability, Andon system, legacy system modernization, .NET development, SQL Server, Mercado Libre integration, ERP reporting, web development, AI automation, Mexico',
    ogTitle: 'DreamBox Dev | Technology that works, with a team that answers',
    ogDescription: 'IT support, custom software and manufacturing platforms. Over 10 years building systems. Book a free assessment.',
    ogImageAlt: 'DreamBox Dev, IT support and technology solutions for businesses',
    privacyTitle: 'Privacy & Cookie Notice | DreamBox Dev',
    privacyDescription: 'What data DreamBox Dev collects, how it is used, which cookies the site uses and how to exercise your rights.',
    orgDescription: 'IT support, custom software and manufacturing platforms for businesses in Mexico.',
    knowsAbout: [
      'Software support',
      'Software maintenance',
      'Custom software',
      'Manufacturing software',
      'Legacy system modernization',
      'Web development',
      'Automation',
      'Business email and cloud',
    ],
    catalogName: 'IT support and technology services',
    country: 'Mexico',
  },

  common: {
    cta: 'Talk to us',
    skipToContent: 'Skip to content',
    logoLabel: 'DreamBox Dev, go to home',
    hours: 'Monday to Friday, 9:00 a.m. to 6:00 p.m. (Mexico City time)',
    whatsappMessage: "Hi DreamBox, I'd like to talk about my business.",
    language: { label: 'Language', switchTo: 'Español', short: 'ES', current: 'EN' },
  },

  nav: [
    { label: 'Services', href: '#servicios' },
    { label: 'Projects', href: '#construido' },
    { label: 'How we work', href: '#proceso' },
    { label: 'About', href: '#nosotros' },
    { label: 'FAQ', href: '#preguntas' },
  ],

  header: { mainNav: 'Main', mobileNav: 'Menu', openMenu: 'Open menu', closeMenu: 'Close menu' },

  hero: {
    eyebrow: 'Support and software for businesses in Mexico',
    title: 'Technology that works, with a team that answers.',
    subtitle:
      'For over 10 years we have built and maintained the systems businesses rely on: day-to-day support, custom software and manufacturing platforms.',
    secondary: 'See services',
    trustLabel: 'Our commitments',
    trust: ['Free assessment', 'Remote support, wherever you are'],
    cue: "See what's inside",
    cueLabel: 'Scroll to discover our services',
    boxLabel: 'The DreamBox box opens and releases support, web, artificial intelligence and cloud',
    pieces: ['Support', 'Web', 'AI', 'Cloud'],
  },

  story: {
    label: 'The problem we solve',
    lines: ['System down again?', 'Website not bringing in clients?', 'No one answers when things break?', "We've got it covered."],
    tagline: 'Support, maintenance and ongoing improvements. One team for all your technology.',
  },

  servicesSection: {
    title: 'Everything your business needs in technology.',
    subtitle: 'From day-to-day support to custom software, without juggling five vendors.',
    tabsLabel: 'Services',
    pause: 'Pause autoplay',
    play: 'Resume autoplay',
    prev: 'Previous service',
    next: 'Next service',
  },

  services: [
    {
      id: 'soporte',
      title: 'Tech support & help desk',
      body: 'When something breaks, you message us on WhatsApp or email and we fix it, usually through remote access.',
      short: 'Support',
      points: ['Email, accounts and access', 'Everyday software and systems', 'Follow-up until it is solved'],
      icon: 'Headset',
    },
    {
      id: 'web',
      title: 'Websites & online stores',
      body: 'We build, migrate and maintain your website so it brings in clients, not just visits.',
      short: 'Web',
      points: ['Designed for mobile', 'Fast and optimized for Google', 'Updates whenever you need them'],
      icon: 'Globe',
    },
    {
      id: 'mantenimiento',
      title: 'Monthly maintenance',
      body: 'We look after your systems before they fail, not after.',
      short: 'Maintenance',
      points: ['Verified backups', 'Updates and monitoring', 'A clear monthly report'],
      icon: 'ShieldCheck',
    },
    {
      id: 'automatizacion',
      title: 'Automation & AI',
      body: 'We connect your tools and automate repetitive work: quotes, reports, replies and reminders.',
      short: 'Automation',
      points: ['Workflows between your tools', 'AI assistants', 'Less manual data entry'],
      icon: 'Sparkles',
    },
    {
      id: 'cloud',
      title: 'Cloud, email & security',
      body: 'Your team works from anywhere, with your information protected.',
      short: 'Cloud',
      points: ['Email on your own domain', 'Shared, backed-up files', 'Secure access for your team'],
      icon: 'Cloud',
    },
    {
      id: 'sistemas',
      title: 'Custom software',
      body: 'When off-the-shelf tools fall short, we build the one you need and keep maintaining it with you.',
      short: 'Custom',
      points: [
        'Manufacturing software',
        'API integrations (Mercado Libre, eBay and more)',
        'Reports and dashboards on your data',
        'Support after launch',
      ],
      link: { label: 'See projects', href: '#proyectos' },
      icon: 'Boxes',
    },
    {
      id: 'modernizacion',
      title: 'System modernization',
      body: 'Does your business run on an old system nobody wants to touch anymore? We move it to modern technology without stopping your operation.',
      short: 'Modernization',
      points: ['Module-by-module migration', 'Your current system keeps running during the change'],
      link: { label: 'See the case study', href: '#caso' },
      icon: 'RefreshCw',
    },
  ],

  serviceScenes: {
    support: {
      ticket: 'Request #1042',
      issue: "Sales can't log in to the billing system",
      steps: ['We got your message', 'Checked via remote access', 'Fixed and confirmed'],
      chip: 'A technician is on it',
    },
    web: {
      url: 'yourcompany.com',
      button: 'Get a quote',
      google: 'Found on Google',
      mobile: 'Mobile ready',
    },
    maintenance: {
      title: 'Monthly check-up',
      live: 'Monitoring on',
      checks: ['Backups', 'Updates', 'SSL certificate valid'],
      backups: 'Verified backups',
      backupsValue: '30 of 30',
    },
    automation: {
      nodes: ['A request comes in', 'AI sorts it and prices it', 'Quote sent to the client'],
      note: 'No one has to type it by hand',
    },
    cloud: {
      email: 'hello@yourcompany.com',
      backup: 'Daily backup',
      twoFactor: 'Two-step verification',
      files: 'Team files',
    },
    systems: {
      orders: "Today's orders",
      trend: '+12% this week',
      rows: [
        ['Low stock', '3 products'],
        ['To deliver', '11 orders'],
      ],
      chip: 'Built around how you work',
    },
    modernization: {
      before: 'Old system',
      after: 'New platform',
      modules: ['Inventory', 'Billing', 'Reports', 'Users'],
      next: 'Coming up',
      chip: 'Nothing gets switched off',
    },
  },

  commitmentsSection: {
    title: 'What you can always expect from us.',
    chat: {
      question: "Hi, the sales team isn't getting any email.",
      answer: "We're already on it. We'll update you in a moment.",
      resolved: 'Fixed the same day',
    },
    plan: {
      title: 'Your proposal',
      rows: ['Development · per project', 'Maintenance · monthly', 'Support for your team'],
      footer: 'Everything in writing before we start',
    },
    owner: { name: 'Your account lead', status: 'Available now' },
    toggle: { annual: 'Annual contract', monthly: 'Month to month' },
  },

  commitments: [
    { id: 'respuesta', value: 'Same day', label: 'We answer your support requests during business hours.' },
    { id: 'precio', value: 'Clear pricing', label: 'Per project, monthly or both. Always in writing, no surprise charges.' },
    { id: 'contacto', value: 'One owner', label: 'One person who knows your business and your systems.' },
    { id: 'contrato', value: 'Month to month', label: 'No long contracts. You stay because it works.' },
  ],

  builtSection: {
    title: "What we've built.",
    subtitle: 'The best proof of how we work is the systems already running.',
    tabsLabel: 'Projects',
    tabs: [
      { id: 'manufactura', label: 'Manufacturing', hint: 'Dreambox Manufacturing' },
      { id: 'caso', label: 'Case study', hint: 'Before and now' },
      { id: 'proyectos', label: 'Projects', hint: 'Marketplaces & ERP' },
    ],
    carousel: { prev: 'Previous', next: 'Next' },
    deck: { label: 'Featured modules', prev: 'Previous module', next: 'Next module' },
    compare: 'Compare before and now',
  },

  // Manufacturing software (#manufactura). **text** renders in bold.
  // The system is 12 years old: always say "over 10 years" / "10+ years" / "over a decade", never "15 years".
  manufacturing: {
    eyebrow: 'Manufacturing software',
    title: 'Over 10 years on the shop floor. Now on a modern platform.',
    body: 'It grew out of the system we built and maintain for an auto parts plant. Today that experience lives in **Dreambox Manufacturing**, a new platform installed in your plant.',
    cta: 'Book a demo',
    secondary: 'See the case study',
    facts: [
      { value: 'Tier 1 & 2', label: 'Built for the quality requirements of automotive suppliers.' },
      { value: 'On-premise', label: "One installation per site. Your data stays on your server and operations don't depend on the internet." },
      { value: 'By module', label: 'Adopt only the ones you need: each comes from a real plant process and works on its own.' },
    ],
    soon: 'Coming soon',
    modules: [
      {
        id: 'ppap',
        title: 'PPAP',
        body: 'Files by part number, the status of every element and customer-ready documents generated for you.',
      },
      {
        id: 'herramental',
        title: 'Tooling',
        body: 'Actions on molds and tools logged right on the floor from a kiosk, with a full history per tool.',
      },
      {
        id: 'trazabilidad',
        title: 'Component traceability',
        body: 'Which lot of each BOM component went into every run, by shift and operator. Answer a customer complaint in minutes.',
        soon: true,
      },
    ],
    alsoTitle: 'Also includes',
    also: [
      'Andon system',
      'Material receiving',
      'Scrap management',
      'Audits',
      'Dashboards',
      'Plant catalogs',
      'Role-based users and permissions',
      'Alerts',
      'Multiple plants per site',
      'Custom modules',
      '…and more',
    ],
  },

  manufacturingScenes: {
    ppap: {
      title: 'PPAP · Level 3',
      part: 'Part no. 4471-B',
      items: [
        { label: 'Drawings & specifications', status: 'Approved', done: true },
        { label: 'Dimensional results', status: 'Approved', done: true },
        { label: 'PSW', status: 'In review', done: false },
      ],
    },
    tooling: {
      header: 'Line 2 · Shift 1',
      tool: 'Mold M-218',
      actions: ['Adjustment', 'Cleaning', 'Repair'],
      saved: 'Cleaning logged',
    },
    trace: {
      title: 'Run · Folio 000812 · Shift 2',
      product: 'Finished good',
      productValue: 'Bracket 7720',
      components: [
        { name: 'PP resin', lot: 'Lot R-2291' },
        { name: 'Metal insert', lot: 'Lot M-0457' },
      ],
    },
  },

  caseStudy: {
    eyebrow: 'Case study · Automotive supplier in Saltillo',
    title: 'Modernizing a 10+ year-old system without stopping the plant.',
    body: 'The plant depended on two systems that had grown apart for years. They worked, but they had become a bottleneck.',
    beforeTitle: 'Before',
    before: [
      'Information split across two legacy systems.',
      'Key processes, like scrap and traceability, buried in modules no one used anymore.',
      'Every improvement meant touching fragile code.',
    ],
    afterTitle: 'Now',
    after: [
      'One modern platform, installed at the plant.',
      'PPAP, Tooling and catalogs already migrated; Traceability on the way.',
      'Every module is documented and approved with the plant before it gets built.',
    ],
    testimonial: null,
  },

  modernize: {
    title: 'Does your business also run on an old system?',
    body: "There's no need to throw it out and start over.",
    steps: [
      {
        title: 'We learn what already works',
        body: 'We review your system with the people who use it every day, so nothing that works today gets lost.',
      },
      {
        title: 'We migrate one module at a time',
        body: 'We start with the one that hurts most. Every module has its scope, price and date in writing.',
      },
      {
        title: 'Both run side by side',
        body: 'The old system keeps running while you validate the new one. You switch when you are sure.',
      },
    ],
    stack: ['.NET 8', 'React', 'SQL Server', 'On-premise or cloud', 'Automated testing'],
  },

  projectsSection: {
    title: 'Beyond the plant.',
    body: 'We also build custom software for other industries. Two examples:',
  },

  projects: [
    {
      id: 'marketplaces',
      label: 'E-commerce',
      title: 'Inventory connected to Mercado Libre and eBay',
      body: 'For a company that buys and resells on marketplaces. From a single system they manage their inventory and publish, update or remove their listings on Mercado Libre and eBay, connected straight to their APIs. No more entering things twice.',
      points: [
        'Central inventory as the single source of truth',
        'Publish, edit and remove Mercado Libre and eBay listings from the system',
        "Direct integration with each marketplace's API",
      ],
    },
    {
      id: 'erp',
      label: 'Reporting & analytics',
      title: 'Custom reports on top of your ERP',
      body: 'Asking their ERP vendor for new reports was getting very expensive. We connected to their database, transformed the data and delivered the reports and charts exactly as they needed them, without switching ERPs.',
      points: [
        "Direct connection to the ERP's database",
        'Data transformed into the format the business needs',
        'Custom reports and charts',
        'No paying the ERP vendor for every new report',
      ],
    },
  ],

  projectScenes: {
    marketplaces: {
      sku: 'SKU 10482',
      stock: 'Stock',
      channels: ['Mercado Libre', 'eBay'],
      published: 'Listed',
      sale: '1 sold on eBay → stock updated on both channels',
    },
    erp: {
      title: 'Sales by branch · This month',
      branches: ['Downtown', 'North', 'South', 'East'],
      source: 'Data from your ERP',
    },
  },

  processSection: {
    title: 'From the first call to everything in order, in four steps.',
    subtitle: 'At every stage you know what we are doing, what is left and what it costs.',
    tabsLabel: 'Steps',
    pause: 'Pause autoplay',
    play: 'Resume autoplay',
    prev: 'Previous step',
    next: 'Next step',
    takeaway: 'You get:',
    ctaTitle: 'The first step is free.',
    ctaBody: 'Book your assessment and walk away knowing where to start.',
    ctaButton: 'Book an assessment',
  },

  process: [
    {
      title: 'Assessment',
      body: 'A video call to get to know your business, the tools you use and what is slowing you down today.',
      detail: 'Free · 30 minutes',
      items: ['We review your accounts, website and systems', 'We separate what is urgent from what can wait', 'We answer your questions, no jargon'],
      outcome: 'A clear picture of where you stand.',
      icon: 'MessagesSquare',
    },
    {
      title: 'Proposal',
      body: 'We send you a written plan: what we will do, in what order and how much it costs. You decide whether to move forward.',
      detail: 'In under 3 business days',
      items: ['Priorities ranked by impact', 'Price and payment terms in writing', 'Clear timelines for each stage'],
      outcome: 'A plan with a locked-in price.',
      icon: 'FileText',
    },
    {
      title: 'Rollout',
      body: 'We start with what is urgent: access, backups, email and website. Your team keeps working in the meantime.',
      detail: 'No downtime for your business',
      items: ['Access and passwords in order', 'Backups up and running', "Everything documented in your company's name"],
      outcome: 'Your technology in order, without depending on anyone.',
      icon: 'Rocket',
    },
    {
      title: 'Ongoing support',
      body: 'We take care of the day to day: we handle requests, prevent issues and suggest improvements every month.',
      detail: 'Monthly plan',
      items: ['A direct line to your support team', 'Preventive maintenance', 'A monthly report of what we did'],
      outcome: 'An IT department, without having to hire one.',
      icon: 'HeartHandshake',
    },
  ],

  stepScenes: {
    call: { title: 'Assessment', live: 'On call', you: 'You' },
    proposal: {
      title: 'Proposal for your business',
      rows: ['Sort out access and backups', 'Email on your domain', 'Refresh the website'],
      price: 'Price',
      priceValue: 'Fixed monthly',
      approved: 'Approved',
    },
    rollout: { title: 'Rollout', note: 'Plan progress', tasks: ['Access', 'Backups', 'Email', 'Website'] },
    report: {
      title: 'Monthly report',
      example: 'Example',
      stats: [
        { value: '14', label: 'Requests resolved' },
        { value: '30/30', label: 'Successful backups' },
        { value: '2', label: 'Improvements suggested' },
      ],
      tip: 'Suggestion: automate sending quotes.',
    },
  },

  about: {
    title: 'A technology partner. Not just another vendor.',
    body: [
      "We're a small team, on purpose: the person who answers you is the person who built your system. No middlemen, no account managers, no explaining everything from scratch every time.",
      "And what we build, we look after. The system we developed for an automotive plant has been running every day for over a decade, and we're still the ones taking care of it.",
    ],
    claim: "We don't sell you technology. We make sure it works.",
    toolsTitle: 'Tools we work with every day',
  },

  testimonialsSection: { title: 'What our clients say.' },

  testimonials: [],

  faqSection: { title: 'Frequently asked questions.' },

  faqs: [
    {
      q: 'What does the monthly support plan include?',
      a: 'Help for your team over WhatsApp, email and remote access, upkeep of your accounts, software and website, backups, updates and a monthly report. We tailor the plan to the size of your business.',
    },
    {
      q: 'How much does it cost, and how do you charge?',
      a: "It depends on what you need, and we put it in writing after the assessment, which is free. Support and maintenance are a fixed monthly fee. Projects, like a system built from scratch or a legacy migration, are priced per project, optionally followed by monthly maintenance. Depending on the project, it can also be an upfront investment plus monthly payments, or monthly payments only: we'll tell you which option applies.",
    },
    {
      q: 'Do you work remotely? Where are you based?',
      a: "We're based in Mexico and work remotely, through remote access, video calls, WhatsApp or email, so we can support businesses wherever they are. We specialize in software, accounts and systems; we don't do hardware repair.",
    },
    {
      q: 'Do you work with small businesses?',
      a: 'Yes. Most of our clients are small and growing businesses without their own IT department.',
    },
    {
      q: 'Do you work with manufacturing plants?',
      a: "Yes. Dreambox Manufacturing includes modules like PPAP, tooling, traceability, Andon and scrap. It's installed in your plant and you can adopt only the ones you need.",
    },
    {
      q: 'Can you modernize a system we already have?',
      a: 'Yes. First we document it with the people who use it, then we migrate it piece by piece, without switching off the one you use today.',
    },
    {
      q: 'Can you connect to my ERP or other systems I already have?',
      a: "Yes. We connect to your systems' database or APIs to build reports, dashboards or integrations, without you having to switch vendors.",
    },
    {
      q: 'Do I have to sign a long contract?',
      a: 'No. Support and maintenance are month to month, and maintenance after a project is optional.',
    },
    {
      q: 'What happens if we stop working together someday?',
      a: "Nothing stays with us: access, accounts, files and documentation are in your company's name from day one.",
    },
  ],

  contact: {
    eyebrow: 'Free 30-minute assessment',
    title: 'Tell us what you need.',
    body: "We'll go over it together on a video call and tell you what to tackle first. No commitment.",
    serviceLegend: 'What can we help with?',
    extraOptions: [{ id: 'manufactura', title: 'Manufacturing software' }],
    optional: '(optional)',
    name: 'Name',
    email: 'Email',
    phone: 'Phone or WhatsApp',
    company: 'Company',
    message: "What's going on?",
    messagePlaceholder: 'For example: we want to sort out our company email and refresh our website.',
    errors: {
      name: 'Please enter your name.',
      email: 'Please enter a valid email, for example name@company.com.',
      message: 'Tell us a bit more so we can help.',
      send: (email) => `We couldn't send your message. Please try again or email us at ${email}.`,
    },
    privacyNote: 'Your details are only used to reply to you.',
    privacyLink: 'Privacy notice',
    submit: 'Send message',
    sending: 'Sending',
    sentTitle: 'Thanks. We got your message.',
    sentBody: "We'll reach out within 24 business hours to schedule your assessment.",
    sendAnother: 'Send another message',
    // The email reaches the team in Spanish; the subject flags that it came from the English site.
    mail: {
      subject: (name) => `Nueva solicitud desde la web (inglés): ${name}`,
      fromName: 'DreamBox website',
      fields: { name: 'Nombre', email: 'Correo', phone: 'Teléfono', company: 'Empresa', service: 'Servicio', message: 'Mensaje', language: 'Idioma' },
      notGiven: 'No indicado',
      noService: 'Sin especificar',
    },
  },

  footer: {
    tagline: 'IT support, custom software and manufacturing software for businesses. Based in Mexico.',
    company: 'Company',
    services: 'Services',
    contact: 'Contact',
    contactLink: 'Contact',
    rights: 'All rights reserved.',
    privacy: 'Privacy notice',
    cookies: 'Cookie preferences',
  },

  cookies: {
    title: 'We use cookies',
    body: 'With your permission, we use analytics cookies to understand how the site is used and improve it. We never use them for advertising. You can change your choice at any time.',
    more: 'Learn more',
    reject: 'Reject',
    accept: 'Accept',
  },

  privacy: {
    back: 'Back to home',
    eyebrow: 'Legal',
    title: 'Privacy & cookie notice',
    updated: 'Last updated: October 3, 2026',
    intro:
      "At DreamBox Dev we take care of the information you share with us. Here's a plain-language explanation of what data we collect, what we use it for and how you can control it, in accordance with Mexico's Federal Law on the Protection of Personal Data Held by Private Parties.",
    ownerTitle: 'Who is responsible for your data',
    ownerIntro: 'The data controller is',
    ownerContact: 'You can write to us about any privacy matter at',
    sections: [
      {
        id: 'datos',
        title: 'What data we collect',
        paragraphs: [
          '**When you contact us** through the form, email or WhatsApp: your name, email, company, phone number if you share it, and the message you send.',
          '**When you visit the site** and accept analytics cookies: anonymous, aggregated usage data such as pages viewed, device type and approximate country.',
          'We do not ask for sensitive data or payment details on this site.',
        ],
      },
      {
        id: 'uso',
        title: 'What we use it for',
        list: [
          'To reply to your message and prepare the assessment or proposal you ask for.',
          'To follow up on any services you hire us for.',
          'To understand how the site is used and improve it, only if you accept analytics cookies.',
        ],
        paragraphs: ['We do not sell your data or use it for third-party advertising.'],
      },
      {
        id: 'base',
        title: 'Why we can use it',
        paragraphs: [
          'We use your data because you give it to us so we can contact you (your consent) and, if you hire a service, because we need it to provide that service. You can withdraw your consent at any time.',
        ],
      },
      {
        id: 'terceros',
        title: 'Who we share it with',
        paragraphs: [
          'Only with providers that help us run the site and communicate with you: the form delivery service, our email provider, WhatsApp if you message us there, and Google Analytics if you accept analytics cookies. Each one handles data under its own policies.',
        ],
      },
      {
        id: 'conservacion',
        title: 'How long we keep it',
        paragraphs: [
          'We keep messages for as long as the conversation lasts and, if you become a client, for the duration of the relationship and as required by law. If we do not end up working together, you can ask us to delete them.',
        ],
      },
      {
        id: 'derechos',
        title: 'Your rights (ARCO)',
        paragraphs: [
          'You have the right to **Access** your data, **Rectify** it, **Cancel** it or **Object** to its use, and to withdraw your consent. To exercise these rights, email us at {email} with your name, the right you want to exercise and how we can reply. We will respond within 20 business days at most.',
        ],
      },
    ],
    cookiesTitle: 'Cookies',
    cookiesIntro:
      'Cookies are small files the site stores in your browser. We only use the ones needed to remember your choices and, if you accept them, analytics cookies.',
    table: { name: 'Name', type: 'Type', purpose: 'Purpose', duration: 'Duration' },
    cookieRows: [
      {
        name: 'dreambox-consent, dreambox-lang',
        type: 'Necessary',
        purpose: 'Remember your cookie and language choices. Stored in your browser.',
        duration: 'Until you delete them',
      },
      {
        name: '_ga, _ga_*',
        type: 'Analytics (Google Analytics)',
        purpose: 'Count visits and measure how the site is used, in aggregate. Only enabled if you accept.',
        duration: 'Up to 2 years',
      },
    ],
    changeCookies: 'Change my cookie preferences',
    changesTitle: 'Changes to this notice',
    changesBody:
      'If we change this notice, we will update the date above. If the change is significant, we will let you know on the site.',
  },
}

export default en
