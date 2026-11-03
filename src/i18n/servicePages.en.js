// Service pages (SEO). Same structure and ids as servicePages.es.js.
// Content rules: "over 10 years" (never 15), no client names, no hardware repair, no invented figures.

const en = {
  ui: {
    breadcrumbHome: 'Home',
    primary: 'Book your free assessment',
    secondary: 'Message us on WhatsApp',
    faqTitle: 'Frequently asked questions',
    relatedTitle: 'Other services',
    more: 'More about this service',
    takeawayPrice: 'The 30-minute assessment is free, with no commitment.',
  },

  pages: [
    {
      id: 'soporte',
      icon: 'Headset',
      path: '/en/it-support',
      name: 'IT support for businesses',
      title: 'IT Support for Small Businesses | DreamBox Dev',
      description:
        'Tech support, help desk and systems maintenance for businesses without an IT department. Remote help over WhatsApp or email. Free assessment.',
      eyebrow: 'Tech support & help desk',
      h1: 'IT support for businesses without an IT department',
      intro:
        "When email stops working, a system freezes or nobody knows who has the passwords, your team stops working. We become your IT department: message us on WhatsApp or email and we fix it, almost always through remote access.",
      problemsTitle: 'Does any of this sound familiar?',
      problems: [
        'Every time something breaks, nobody knows who to call.',
        'You rely on a technician who takes days to reply.',
        "Company passwords and accounts are in the name of someone who no longer works there.",
        "You're not sure your backups actually work.",
        "Hiring a full-time IT person doesn't make sense yet.",
      ],
      includesTitle: 'What our IT support includes',
      includes: [
        { title: 'Help desk', body: 'Your team reaches us on WhatsApp or email. We follow each request until it is resolved.' },
        { title: 'Email, accounts and access', body: "Email on your domain, user accounts, passwords and permissions, organized and in your company's name." },
        { title: 'Monthly maintenance', body: 'Updates, monitoring and verified backups, to prevent failures instead of rushing to fix them.' },
        { title: 'Everyday software and systems', body: 'Help with the software your company uses, your website and your cloud tools.' },
        { title: 'Cloud and security', body: 'Shared, backed-up files, two-step verification and secure access to work from anywhere.' },
        { title: 'Monthly report', body: 'Every month we tell you what we resolved, how your backups look and what is worth improving.' },
      ],
      howTitle: 'How we get started',
      how: [
        { title: 'Free assessment', body: 'A 30-minute video call to understand your business and what is slowing you down.' },
        { title: 'Written proposal', body: 'What we will do, in what order and how much it costs, as a fixed monthly fee.' },
        { title: 'We sort out what is urgent', body: 'Access, backups, email and website, while your team keeps working.' },
        { title: 'We stay with you', body: 'One person who knows your business handles the day to day. Plans are month to month.' },
      ],
      faqs: [
        { q: 'What is an IT support service for businesses?', a: 'It means having an outside team take care of your company\'s technology: they solve your users\' problems, maintain your systems and prevent failures. It works like an IT department you do not have to hire.' },
        { q: 'Where do you work?', a: "We're based in Mexico and work remotely through remote access, video calls, WhatsApp and email." },
        { q: 'How quickly do you respond?', a: 'We respond to support requests the same day during business hours: Monday to Friday, 9:00 a.m. to 6:00 p.m. (Mexico City time).' },
        { q: 'Do you repair computers or printers?', a: "No. We specialize in software, accounts and systems. We don't do hardware repair." },
        { q: 'How much does IT support cost?', a: 'A fixed monthly fee that depends on how many people and systems we support. You get it in writing after the free assessment, with no surprise charges.' },
        { q: 'Do I have to sign a long contract?', a: "No. Support is month to month, and your access, accounts and files are in your company's name from day one." },
      ],
      related: ['sistemas', 'web', 'automatizacion'],
    },

    {
      id: 'sistemas',
      icon: 'Boxes',
      path: '/en/custom-software',
      name: 'Custom software development',
      title: 'Custom Software Development | DreamBox Dev',
      description:
        'Custom systems for your business: API integrations, ERP reporting and inventory. Over 10 years building and maintaining software. Free assessment.',
      eyebrow: 'Custom software',
      h1: 'Custom software development for your business',
      intro:
        'When an off-the-shelf tool falls short, you end up with spreadsheets, double data entry and processes that depend on one person. We build the system your operation needs and stay on to maintain it with you.',
      problemsTitle: 'When custom software makes sense',
      problems: [
        'You enter the same information into two or more systems.',
        'Your operation depends on Excel files only one person understands.',
        'Every new report costs your company money or days of work.',
        "The software you bought doesn't fit the way you work.",
        "Your systems don't talk to each other.",
      ],
      includesTitle: 'What we can build',
      includes: [
        { title: 'Internal systems', body: 'Inventory, orders, operations and dashboards with the numbers your business needs to see.' },
        { title: 'API integrations', body: 'We connect your systems with each other and with outside services like Mercado Libre and eBay, so nothing gets entered twice.' },
        { title: 'Reports on top of your ERP', body: 'We connect to your ERP database and build the reports and charts you need, without changing vendors.' },
        { title: 'Manufacturing software', body: 'Shop-floor platforms, backed by over 10 years of experience in auto parts plants.' },
        { title: 'Support after launch', body: 'We do not disappear when we finish: we stay in charge with optional monthly maintenance.' },
        { title: 'Your code and your data', body: "Everything is documented and in your company's name, so you never depend on us to operate." },
      ],
      howTitle: 'How we run a project',
      how: [
        { title: 'We learn your process', body: 'We talk to the people who live it every day before writing any code.' },
        { title: 'Scope, price and date', body: 'A written proposal, per project or per module, with no surprise charges.' },
        { title: 'We build in stages', body: 'You see real progress and validate each part before moving on.' },
        { title: 'We maintain it with you', body: 'The person who answers is the person who built your system.' },
      ],
      proof: {
        title: 'A real example',
        body: 'For a company that buys and resells on marketplaces, we built a central inventory connected to the Mercado Libre and eBay APIs: from one system they publish, edit and remove their listings. For another, we built reports and charts directly on their ERP, so they no longer pay their vendor for every report.',
      },
      faqs: [
        { q: 'How much does custom software cost?', a: 'It depends on the scope. After the free assessment we give you scope, price and date in writing. Depending on the project, it can be a project fee, an initial investment plus monthly payments, or monthly payments only.' },
        { q: 'Can you connect to my ERP or existing systems?', a: 'Yes. We connect to the database or APIs of your systems to build reports, dashboards or integrations, without you having to change vendors.' },
        { q: 'Who owns the system when the project ends?', a: "Access, accounts, files and documentation are in your company's name from day one." },
        { q: 'Do you offer support after delivery?', a: 'Yes. You can add monthly maintenance for updates, improvements and support. It is optional, with no long contract.' },
      ],
      related: ['modernizacion', 'manufactura', 'automatizacion'],
    },

    {
      id: 'manufactura',
      icon: 'Factory',
      path: '/en/manufacturing-software',
      name: 'Manufacturing software',
      title: 'Manufacturing Software for Auto Suppliers | DreamBox Dev',
      description:
        'A platform for plants and automotive suppliers: PPAP, tooling, Andon, scrap and traceability. Installed in your plant, by module. Book a demo.',
      eyebrow: 'Dreambox Manufacturing',
      h1: 'Manufacturing software built from the shop floor up',
      intro:
        'Dreambox Manufacturing grew out of the system we have built and maintained for over 10 years for an auto parts plant. It brings PPAP, tooling, Andon, scrap and more into one modern platform installed in your plant.',
      problemsTitle: 'For plants dealing with this today',
      problems: [
        'PPAP files live in folders and emails, and putting them together for the customer takes days.',
        'What happens to molds and tools gets recorded on paper, if at all.',
        'When a claim comes in, finding which lot went into each run takes too long.',
        "Quality and production data sit in systems that don't talk to each other.",
        "Big solutions cost too much or don't fit how your plant works.",
      ],
      includesTitle: 'Platform modules',
      includes: [
        { title: 'PPAP', body: 'Files by part number, the status of each element and documents ready for the customer.' },
        { title: 'Tooling', body: 'Actions on molds and tools captured right on the floor from a kiosk, with history per tool.' },
        { title: 'Component traceability (coming soon)', body: 'Which lot of each BOM component went into each run, by shift and operator, to answer a claim in minutes.' },
        { title: 'Andon system', body: 'Visibility into what is happening on the line, so you can react in time.' },
        { title: 'Scrap, material receiving and audit', body: 'Scrap records, material receiving and audits in one place, with dashboards and alerts.' },
        { title: 'Custom modules', body: 'If your process needs it, we build it. Each module is documented and approved with the plant before development.' },
      ],
      howTitle: 'Why it is different',
      how: [
        { title: 'Made for Tier 1 and Tier 2', body: 'Designed around the quality requirements of automotive suppliers.' },
        { title: 'On-premise', body: 'One installation per site. Your data stays on your server and operations do not depend on the internet.' },
        { title: 'By module', body: 'Adopt only what you need: each module works on its own.' },
        { title: 'A team that knows the plant', body: 'Over a decade running every day on the production floor.' },
      ],
      proof: {
        title: 'Real case: automotive supplier',
        body: 'The plant depended on two legacy systems that grew separately for years. Today it runs on one modern platform installed on site: PPAP, Tooling and catalogs already migrated, with Traceability on the way. All without stopping operations.',
      },
      faqs: [
        { q: 'What is PPAP and how does the system handle it?', a: 'PPAP (Production Part Approval Process) is how a supplier shows a customer it can produce a part that meets requirements. The platform organizes files by part number, shows the status of each element and generates documents ready for the customer.' },
        { q: 'Is it cloud-based or installed in my plant?', a: 'It is installed in your plant (on-premise), with one installation per site. Your data stays on your server and operations do not depend on the internet.' },
        { q: 'Do I have to buy every module?', a: 'No. You adopt only what you need, and each module works on its own.' },
        { q: 'We already have a system. Do we have to shut it down?', a: 'No. We migrate by module and the old system keeps running while you validate the new one. You switch when you are sure.' },
      ],
      related: ['modernizacion', 'sistemas', 'soporte'],
    },

    {
      id: 'modernizacion',
      icon: 'RefreshCw',
      path: '/en/legacy-modernization',
      name: 'Legacy system modernization',
      title: 'Legacy System Modernization | DreamBox Dev',
      description:
        'Running on an old system? We migrate it to current technology module by module, without stopping operations. Free assessment.',
      eyebrow: 'System modernization',
      h1: 'Legacy system modernization without stopping your operation',
      intro:
        "Your business depends on an old system nobody wants to touch. It works, but every change is a risk. You don't have to throw it away and start over: we migrate it to current technology, one module at a time, while you keep operating.",
      problemsTitle: 'Signs your system is holding you back',
      problems: [
        'Every improvement means touching fragile code and crossing your fingers.',
        'The one person who understood it is gone, or about to leave.',
        'Your information is spread across systems that grew separately.',
        'Key processes are tangled up in modules nobody uses anymore.',
        'You worry about what would happen if it stopped working one day.',
      ],
      includesTitle: 'What modernization includes',
      includes: [
        { title: 'Documenting the current system', body: 'We review it with the people who use it every day, so nothing that works today gets lost.' },
        { title: 'Migration by module', body: 'We start with the one that hurts most. Each module has its scope, price and date in writing.' },
        { title: 'Side by side during the switch', body: 'The old system keeps running while you validate the new one.' },
        { title: 'Data migration', body: 'We move your information to the new platform and validate it with you.' },
        { title: 'Current technology', body: '.NET 8, React and SQL Server, on-premise or in the cloud, with automated tests.' },
        { title: 'Ongoing maintenance', body: 'We stay in charge if you need us, so the system does not fall behind again.' },
      ],
      howTitle: 'Our method, in three steps',
      how: [
        { title: 'We learn what already works', body: 'With the people who use the system every day.' },
        { title: 'We migrate one module at a time', body: 'Starting with the one that hurts most, with no risky all-at-once switch.' },
        { title: 'They run side by side', body: 'You switch when you are sure, not before.' },
      ],
      proof: {
        title: 'Real case: a system over 10 years old',
        body: 'An automotive supplier depended on two legacy systems. Today it runs on one modern platform, and the plant never stopped. Each module is documented and approved with the plant before it is built.',
      },
      faqs: [
        { q: 'What is a legacy system?', a: 'It is an old system your business still depends on. It usually works, but it is hard to change, runs on technology with little support left and is often understood by very few people.' },
        { q: 'Do we have to stop operating to migrate?', a: 'No. We migrate in parts, and your current system keeps running while you validate the new one.' },
        { q: 'Do we have to rewrite everything from scratch?', a: 'Not all at once. We start with the module that hurts most and move one at a time, with scope, price and date in writing for each.' },
        { q: 'How much does it cost to modernize a system?', a: 'It depends on the size and state of the system. Because it is modular, you can move in stages. We tell you in writing after the free assessment.' },
      ],
      related: ['sistemas', 'manufactura', 'soporte'],
    },

    {
      id: 'web',
      icon: 'Globe',
      path: '/en/web-development',
      name: 'Websites and online stores',
      title: 'Websites & Online Stores for Businesses | DreamBox Dev',
      description:
        'Design, migration and maintenance of business websites and online stores. Fast, built for mobile and optimized for Google. Free assessment.',
      eyebrow: 'Websites & online stores',
      h1: 'Business websites that bring in clients, not just visits',
      intro:
        'Your website should be your best salesperson. We build, migrate and maintain fast websites and online stores, designed for mobile and optimized for Google, and we stay on to keep them running.',
      problemsTitle: 'Does your website have any of these problems?',
      problems: [
        'It loads slowly or looks bad on mobile.',
        "It doesn't show up on Google when people search for what you sell.",
        'Making a small change is slow or expensive.',
        'Nobody knows who has access to the domain or hosting.',
        'It gets visits, but almost no one contacts you.',
      ],
      includesTitle: 'What is included',
      includes: [
        { title: 'Designed for mobile', body: 'Clear and easy to use on any screen, with calls to action that turn visits into contacts.' },
        { title: 'Speed and SEO', body: 'Fast sites, with the structure and content Google needs to understand what you sell.' },
        { title: 'Online stores', body: 'Catalog and payments on platforms like Shopify or WooCommerce, depending on what your business needs.' },
        { title: 'Migration', body: 'We move your current site to a new platform while taking care of your content.' },
        { title: 'Domain and email', body: "Domain, DNS and branded email, all in your company's name." },
        { title: 'Changes and maintenance', body: 'Updates, backups and the changes you need, without depending on third parties.' },
      ],
      howTitle: 'How we do it',
      how: [
        { title: 'Assessment', body: 'We review your current site, your business and who you want to sell to.' },
        { title: 'Proposal', body: 'Scope, price and date in writing.' },
        { title: 'Design and development', body: 'You see progress and give feedback before anything goes live.' },
        { title: 'Launch and care', body: 'We publish it, register it with Google and maintain it.' },
      ],
      faqs: [
        { q: 'How much does a business website cost?', a: 'It depends on what you need: an informational site does not cost the same as an online store. We give you a fixed price in writing after the free assessment.' },
        { q: 'Will my site show up on Google?', a: 'We build it with everything Google needs and register it with its tools. Nobody serious can guarantee first place: ranking also depends on content, competition and time.' },
        { q: 'Can you fix or migrate my current site?', a: 'Yes. We can improve it or migrate it to a new platform, whichever makes more sense after reviewing it.' },
        { q: 'Who owns the domain and the website?', a: "Your company. Domain, access and files are in your name from day one." },
      ],
      related: ['soporte', 'automatizacion', 'sistemas'],
    },

    {
      id: 'automatizacion',
      icon: 'Sparkles',
      path: '/en/ai-automation',
      name: 'Automation and AI for businesses',
      title: 'AI & Workflow Automation for Businesses | DreamBox Dev',
      description:
        'Automate repetitive work in your business: quotes, reports, replies and reminders. We connect your tools and build AI assistants. Free assessment.',
      eyebrow: 'Automation & AI',
      h1: 'Automation and artificial intelligence for businesses',
      intro:
        'Your team loses hours copying data from one place to another, building reports and answering the same questions. We connect your tools and automate those tasks, so your people can focus on what actually needs a person.',
      problemsTitle: 'Tasks that are usually worth automating',
      problems: [
        'Quotes put together by hand, one by one.',
        'Reports someone prepares every week by copying and pasting.',
        'Customer questions that always get the same answer.',
        'Reminders and follow-ups that get forgotten.',
        'Data entered twice in different systems.',
      ],
      includesTitle: 'What we can automate',
      includes: [
        { title: 'Workflows between your tools', body: 'We connect email, spreadsheets, CRM and your systems so information flows on its own.' },
        { title: 'AI assistants', body: 'Assistants that help answer, sort requests or find business information, with your team supervising.' },
        { title: 'Quotes and documents', body: 'Quotes and documents generated from the data you already have.' },
        { title: 'Automatic reports', body: 'Your numbers ready and up to date, without building them by hand every week.' },
        { title: 'Reminders and follow-up', body: 'Notices to customers and your team at the right moment.' },
        { title: 'Less manual entry', body: 'Fewer errors and less time lost on repetitive tasks.' },
      ],
      howTitle: 'How we get started',
      how: [
        { title: 'We find the task that takes the most time', body: 'In the free assessment we review how your team works today.' },
        { title: 'We start small', body: 'We automate one concrete task, so you see the result before investing more.' },
        { title: 'We measure and continue', body: 'What works expands to other areas, and we keep it running with you.' },
      ],
      faqs: [
        { q: 'What can a small business automate?', a: 'Almost any repetitive task with clear rules: quotes, reports, frequent answers, reminders and data entry between systems.' },
        { q: 'Will AI replace my team?', a: 'The goal is to take repetitive tasks off their plate so they can focus on work that needs judgment. What matters still goes through a person.' },
        { q: 'Do I have to change the tools I already use?', a: 'Usually not. We first try to connect what you already have.' },
        { q: 'Is my information safe?', a: "We review with you which data is involved and which tools are appropriate before automating, and access stays in your company's name." },
      ],
      related: ['sistemas', 'soporte', 'web'],
    },
  ],
}

export default en
