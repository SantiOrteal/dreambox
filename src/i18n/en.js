// English copy. Same structure as es.js: when you add a key there, add it here too.

const en = {
  lang: 'en',
  locale: 'en',
  ogLocale: 'en_US',
  paths: { home: '/en/', privacy: '/en/privacy' },

  meta: {
    title: 'IT Support & Web Development for Businesses | DreamBox Dev',
    description:
      'Software support, maintenance, web development and automation for small and mid-sized businesses. A team that keeps your tech running. Free assessment.',
    keywords:
      'IT support for businesses, software support, managed IT services, web development, online stores, AI automation, business email, IT consulting, Mexico',
    ogTitle: 'DreamBox Dev | Technology that works, with a team that answers',
    ogDescription: 'IT support, maintenance, web and automation for small businesses. Book a free assessment.',
    ogImageAlt: 'DreamBox Dev, IT support and technology solutions for businesses',
    privacyTitle: 'Privacy & Cookie Notice | DreamBox Dev',
    privacyDescription: 'What data DreamBox Dev collects, how it is used, which cookies the site uses and how to exercise your rights.',
    orgDescription: 'IT support, maintenance, web development and technology solutions for small and mid-sized businesses.',
    knowsAbout: ['Software support', 'Software maintenance', 'Web development', 'Automation', 'Business email and cloud', 'IT consulting'],
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
    { label: 'How we work', href: '#proceso' },
    { label: 'About', href: '#nosotros' },
    { label: 'FAQ', href: '#preguntas' },
  ],

  header: { mainNav: 'Main', mobileNav: 'Menu', openMenu: 'Open menu', closeMenu: 'Close menu' },

  hero: {
    eyebrow: 'IT support for growing businesses',
    title: 'Technology that works, with a team that answers.',
    subtitle: "We're your company's IT team: we fix, maintain and improve your technology.",
    secondary: 'See services',
    trustLabel: 'Our commitments',
    trust: ['Same-day response', 'Fixed monthly price', 'No long contracts'],
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
    subtitle: 'One team for day-to-day support, your website and your systems. No juggling five vendors.',
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
      body: 'We solve problems with your software, accounts and systems over WhatsApp, email or remote access. A real person who knows your business.',
      short: 'Support',
      points: ['Same-day remote help', 'Email, accounts and access', 'Help with your software and website'],
      icon: 'Headset',
    },
    {
      id: 'web',
      title: 'Websites & online stores',
      body: 'We build, migrate and maintain your website so it loads fast, shows up on Google and brings in clients.',
      short: 'Web',
      points: ['Looks great on mobile', 'Optimized for Google', 'Updates whenever you need them'],
      icon: 'Globe',
    },
    {
      id: 'mantenimiento',
      title: 'Monthly maintenance',
      body: 'Updates, backups and monitoring so your systems never fail at the worst possible time.',
      short: 'Maintenance',
      points: ['Verified backups', 'Security updates', 'A clear monthly report'],
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
      body: 'We set up business email, cloud storage, access controls and backups, securely.',
      short: 'Cloud',
      points: ['Email on your own domain', 'Shared, backed-up files', 'Secure access for your team'],
      icon: 'Cloud',
    },
    {
      id: 'sistemas',
      title: 'Custom software',
      body: "When off-the-shelf tools fall short, we build the one you need and keep maintaining it with you.",
      short: 'Custom',
      points: ['Inventory, orders and reports', 'Dashboards with your numbers', 'Support after launch'],
      icon: 'Boxes',
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
  },

  commitmentsSection: {
    title: 'What you can always expect from us.',
    chat: {
      question: "Hi, the sales team isn't getting any email.",
      answer: "We're already on it. We'll update you in a moment.",
      resolved: 'Fixed the same day',
    },
    plan: {
      title: 'Your monthly plan',
      rows: ['Support for your team', 'Maintenance', 'Backups'],
      footer: 'Same price every month',
    },
    owner: { name: 'Your account lead', status: 'Available now' },
    toggle: { annual: 'Annual contract', monthly: 'Month to month' },
  },

  commitments: [
    { id: 'respuesta', value: 'Same day', label: 'We answer your support requests during business hours.' },
    { id: 'precio', value: 'Fixed price', label: 'Clear monthly plans, no surprise charges.' },
    { id: 'contacto', value: 'One owner', label: 'One person who knows your business and your systems.' },
    { id: 'contrato', value: 'Month to month', label: 'No long contracts. You stay because it works.' },
  ],

  processSection: {
    title: 'From the first call to everything in order, in four steps.',
    subtitle: 'No endless contracts or jargon. At every stage you know what we are doing, what is left and what it costs.',
    tabsLabel: 'Steps',
    step: (n, total) => `Step ${n} of ${total}`,
    takeaway: 'You get:',
    ctaTitle: 'The first step is free.',
    ctaBody: 'Book your 30-minute assessment and walk away with a clear picture.',
    ctaButton: 'Book an assessment',
  },

  process: [
    {
      title: 'Assessment',
      body: 'A video call to get to know your business, the tools you use and what is slowing you down today. Free, no strings attached.',
      detail: 'Free · 30 minutes',
      items: ['We review your accounts, website and systems', 'We separate what is urgent from what can wait', 'We answer your questions, no jargon'],
      outcome: 'A clear picture of where you stand.',
      icon: 'MessagesSquare',
    },
    {
      title: 'Proposal',
      body: 'We send you a written plan: what we will do, in what order and how much it costs. You decide whether to move forward.',
      detail: 'In under 3 business days',
      items: ['Priorities ranked by impact', 'Fixed price, no surprise charges', 'Clear timelines for each stage'],
      outcome: 'A plan with a locked-in price.',
      icon: 'FileText',
    },
    {
      title: 'Rollout',
      body: 'We start with what is urgent: access, backups, email and website. Your team keeps working while we sort everything out behind the scenes.',
      detail: 'No downtime for your business',
      items: ['Access and passwords in order', 'Backups up and running', "Everything documented in your company's name"],
      outcome: 'Your technology organized and documented.',
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
    rollout: { title: 'Rollout', note: 'No downtime', tasks: ['Access', 'Backups', 'Email', 'Website'] },
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
    body: "We're a Mexico-based team of support specialists and developers working with small and mid-sized businesses. When you reach out, you hear from someone who already knows your systems, your accounts and your website.",
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
      q: 'How much does it cost to work with DreamBox?',
      a: 'It depends on how many people and systems we support. After the free assessment we send you a proposal with a fixed monthly price, or a fixed project price for one-off work like a website.',
    },
    {
      q: 'Do you work remotely or on-site?',
      a: "We work remotely: most issues are solved the same day through remote access, video calls, WhatsApp or email. We specialize in software, accounts and systems; we don't do hardware repair.",
    },
    {
      q: 'Do you work with companies outside Mexico?',
      a: "Yes. We're based in Mexico and work remotely, so we can support businesses wherever they are.",
    },
    {
      q: 'Do you work with small businesses?',
      a: "Yes. Most of our clients are small and growing businesses without their own IT department. We play that role for them.",
    },
    {
      q: 'Do you also build websites and software?',
      a: 'Yes. We design websites, online stores and custom software, and then stay on to maintain them so they keep running.',
    },
    {
      q: 'Do I have to sign a long contract?',
      a: "No. Plans are month to month. All access, accounts and files stay in your company's name, so you never depend on us to operate.",
    },
  ],

  contact: {
    eyebrow: 'Free 30-minute assessment',
    title: 'Tell us what you need.',
    body: "We'll review where your technology stands today and what to tackle first. No commitment.",
    serviceLegend: 'What can we help with?',
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
    tagline: 'IT support, web and technology for businesses. Based in Mexico.',
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
