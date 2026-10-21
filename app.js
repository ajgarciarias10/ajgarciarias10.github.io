/**
 * ajgarciarias.dev — Interactive Core Application
 * Terminal Assistant, i18n, Torchlight, Filter, Lightbox & Blog Reader
 */

(function () {
  'use strict';

  // ==========================================================================
  // Internationalization (i18n) Data
  // ==========================================================================
  const I18N = {
    en: {
      nav: {
        home: 'home',
        projects: 'projects',
        blog: 'blog',
        about: 'about',
        study: 'study IPO',
        contact: 'contact'
      },
      hero: {
        status: 'AVAILABLE · open to roles & engineering challenges',
        greeting: "hi, I'm",
        role: 'AI Engineer · Full-Stack Developer · Computer Engineering | Spain ↔ Remote',
        bio: 'I build and ship <em>production software end-to-end</em> — LLM-powered applications, distributed systems, and real-time platforms. Transitioning from Data Engineering into AI Engineering with a focus on local-first architectures, proprietary models, and human-centric AI.',
        getInTouch: 'get in touch',
        viewProjects: 'ls projects/',
        downloadCv: 'Curriculum Vitae'
      },
      terminal: {
        title: '~/ask-me.sh',
        status: 'ready',
        welcome: 'connected to ajgarciarias.dev — ask anything about Toni, projects, or stack.',
        placeholder: 'ask anything about Toni…',
        send: 'send ↵',
        chips: [
          'what is your stack?',
          'tell me about F1-BUGAMBRA',
          'what is CleverTracker?',
          'how does GmailKeep work?',
          'tell me about SmartFruitClassifier',
          'tell me about DIVINANDO',
          'are you available for hire?'
        ]
      },
      projects: {
        eyebrow: 'FEATURED WORK',
        title: 'Selected projects',
        path: '~/projects/all',
        count: '6 projects configured',
        filterAll: 'All',
        filterDone: 'Production [Done]',
        filterProgress: 'In Progress',
        viewLive: '↗ Live Demo',
        viewSource: '↗ Source Code',
        viewLab: '↗ Enter Study Lab',
        viewGenerator: '🎲 Question Generator',
        viewUsability: '↗ Usability Study',
        viewRepo: '↗ Repository',
        watchAuction: '▶ Live Auction Video',
        watchVideo: '▶ Watch Video',
        previewGallery: '🖼️ Screenshots',
        f1: {
          tag: 'Formula 1 & Real-time Platform',
          title: 'F1-BUGAMBRA',
          meta: '2025 · Full-Stack & AI',
          desc: 'Formula 1 championship management platform with live telemetry, TV streaming page, season driver archives, and an end-to-end virtual economy system featuring a real-time multiplayer driver auction powered by Firestore and Google Gemini AI.',
          f1: 'Real-time live auction room with sub-second WebSocket/Firestore sync and budget constraints.',
          f2: 'Audit-first design: race results stored as immutable revisions to recompute season standings.',
          f3: 'Installable PWA with offline fallback and Gemini AI race summaries.'
        },
        gmail: {
          tag: 'Local-First · Inbox Automation',
          title: 'GmailKeep Personal',
          meta: '2026 · Python & Google Cloud',
          desc: 'Automated inbox organisation and brand-based archiving daemon. Categorises incoming mail by merchant and brand, assigns hierarchical sub-labels, and archives messages automatically without third-party servers, AI subscriptions, or data leaks.',
          f1: 'Direct Google OAuth 2.0 desktop authentication with zero intermediary servers.',
          f2: 'Client-side daemon running via Linux systemd timers, macOS launchd, or Windows Task Scheduler.',
          f3: 'Structured label taxonomy: Archivo/Promociones/[Brand] keeping primary inbox at zero.'
        },
        smartfruit: {
          tag: 'Computer Vision · Transfer Learning',
          title: 'SmartFruitClassifier',
          meta: '2025 · EfficientNet-B0 & Hugging Face',
          desc: 'Interactive fruit variety classification system built with Transfer Learning (EfficientNet-B0) and bio-inspired hyperparameter optimization (ABC & PSO), achieving >95% accuracy. Deployed as a live cloud application on Hugging Face Spaces.',
          f1: 'Metaheuristic hyperparameter optimization (Artificial Bee Colony & PSO) outperforming CNNs with 87% fewer parameters.',
          f2: 'Optimized EfficientNet-B0 architecture with custom regularization and real-time preprocessing.',
          f3: 'Live interactive web application deployed on Hugging Face Spaces with instant image inference.'
        },
        clever: {
          tag: 'Final Degree Project (TFG) · Cross-Platform',
          title: 'CleverTracker',
          meta: '2026 · Flutter & PostgreSQL',
          desc: 'High-performance multiplatform nutrition, training, body composition and fasting analytics suite. Powered by an internal database of 681,000+ foods and custom-trained computer vision models for food plate recognition and nutrition label OCR.',
          f1: 'Proprietary food database with sub-50ms fuzzy text search.',
          f2: 'Custom-trained CV & OCR models avoiding recurring third-party API dependencies.',
          f3: 'Flutter client (Riverpod/Hive) backed by PostgREST & PostgreSQL on Oracle Cloud with Row-Level Security.',
          viewAudit: '↗ Usability Audit',
          viewTest: '🎲 Question Generator'
        },
        ipo: {
          tag: 'HCI / IPO · Active Recall',
          title: 'IPO Study Lab',
          meta: '2026–27 · Educational Platform',
          desc: 'Interactive active-recall laboratory for Human-Computer Interaction (Interacción Persona-Ordenador). Features tiered practice tests, reasoned error feedback, metacognitive certainty ratings, and a real-world usability teardown of F1-BUGAMBRA.',
          f1: 'Multi-chapter question banks (Topics 1, 2, 3) with conceptual contrast and cognitive error analysis.',
          f2: 'Usability audits and interactive tests for production applications (F1-BUGAMBRA & CleverTracker).',
          f3: 'Local score tracking and spaced repetition review.'
        },
        divinando: {
          tag: 'FP Final Degree Project · Core Engineering',
          badge: 'FP Final Project · Done',
          title: 'DIVINANDO',
          meta: '2022 · Java, C++ & Relational Databases',
          desc: 'Coded entirely from scratch as a vocational capstone project (FP Final Degree Project in DAM), demonstrating strong core logic, relational database design, and algorithmic problem-solving.',
          f1: 'Coded entirely from scratch without AI-generation shortcuts, establishing solid software engineering foundations.',
          f2: 'Core backend services, native modules, and data persistence built with Java, C++, and Relational Databases.',
          f3: 'Multiplatform capstone architecture featuring user authentication, competitive rankings, and word-guessing mechanics.'
        }
      },
      blog: {
        eyebrow: 'FIELD NOTES',
        title: 'cat ~/notes',
        path: '~/notes · 5 case studies',
        subpath: 'Engineering teardowns',
        entriesCount: '5 case studies',
        pageSubtitle: 'Technical case studies and architecture notes across my projects — real-time concurrency, local-first daemons, custom computer vision models, bio-inspired AI optimization, and core engineering foundations.',
        searchPlaceholder: 'grep notes…',
        filterAll: 'all 5',
        filterRealtime: 'Realtime',
        filterVision: 'Computer Vision',
        filterCore: 'Core & AI',
        readPost: 'read case study →',
        minRead: 'min read',
        featuredTag: '★ FEATURED · ENGINEERING DEEP DIVE',
        kickerLocal: '#LOCAL-FIRST · PRIVACY',
        kickerVision: '#COMPUTER-VISION · FLUTTER',
        kickerBio: '#TRANSFER-LEARNING · BIO-INSPIRED AI',
        kickerCore: '#CORE-ENGINEERING · AI ORCHESTRATION',
        archiveBtn: 'ls ~/notes/all →',
        backHome: '← /home'
      },
      about: {
        eyebrow: 'ABOUT ME',
        title: 'Engineering Philosophy',
        path: '~/about/background',
        p1: 'I am a Computer Engineering student moving decisively into AI engineering — building intelligent agents, LLM-powered systems, and production web applications. Previously working in Data Engineering, I bring strong foundations in database design, data pipelines, and system reliability to modern generative AI applications.',
        p2: 'My work is guided by three engineering principles:',
        pr1Title: 'Human First AI',
        pr1Desc: 'AI should empower and clarify human judgment, not replace it with an opaque black box. Algorithms must remain explainable and aligned with the user.',
        pr2Title: 'Local-First & Data Sovereignty',
        pr2Desc: 'Whenever viable, compute should happen close to the user without unnecessary cloud rents, recurring API fees, or privacy compromises.',
        pr3Title: 'Production Craftsmanship',
        pr3Desc: 'From database schemas and network concurrency down to typography and micro-interactions, software is incomplete until it is resilient, performant, and delightful to use.',
        toolboxTitle: 'Technical Toolbox'
      },
      contact: {
        eyebrow: 'GET IN TOUCH',
        title: "Let's build something.",
        path: '~/contact',
        replyTime: '● replies in < 24h',
        locationLabel: 'location',
        locationVal: 'Spain · CET (GMT+1)',
        statusLabel: 'status',
        statusVal: 'accepting opportunities · 2026',
        focusLabel: 'focus',
        focusVal: 'AI Engineering & Full-Stack Systems',
        githubLabel: 'github',
        linkedinLabel: 'linkedin',
        cvLabel: 'cv / resume',
        cvDownload: 'Curriculum.pdf (Download)',
        formName: 'NAME',
        formEmail: 'EMAIL',
        formMessage: 'MESSAGE',
        formPlaceholder: 'What are you building or looking for?',
        formSend: 'send message',
        formNote: 'protected · direct delivery to ajgarciarias@gmail.com'
      },
      footer: {
        copy: '© 2026 Antonio José García Arias',
        note: '· built with precision, Blue Cyan theme, deployed on GitHub Pages'
      }
    },

    es: {
      nav: {
        home: 'inicio',
        projects: 'proyectos',
        blog: 'blog',
        about: 'sobre mí',
        study: 'estudio IPO',
        contact: 'contacto'
      },
      hero: {
        status: 'DISPONIBLE · abierto a roles y desafíos técnicos',
        greeting: 'hola, soy',
        role: 'Ingeniero de IA · Desarrollador Full-Stack · Ingeniería Informática | España ↔ Remoto',
        bio: 'Construyo y despliego <em>software de producción de extremo a extremo</em>: aplicaciones con LLMs, sistemas distribuidos y plataformas en tiempo real. En transición desde la Ingeniería de Datos hacia la Ingeniería de IA, con foco en arquitecturas local-first, modelos propios e IA centrada en las personas.',
        getInTouch: 'contactar',
        viewProjects: 'ls proyectos/',
        downloadCv: 'Curriculum Vitae'
      },
      terminal: {
        title: '~/ask-me.sh',
        status: 'listo',
        welcome: 'conectado a ajgarciarias.dev — pregunta lo que quieras sobre Toni, proyectos o stack.',
        placeholder: 'pregunta lo que quieras sobre Toni…',
        send: 'enviar ↵',
        chips: [
          '¿cuál es tu stack?',
          'háblame de F1-BUGAMBRA',
          '¿qué es CleverTracker?',
          '¿cómo funciona GmailKeep?',
          'háblame de SmartFruitClassifier',
          'háblame de DIVINANDO',
          '¿estás disponible para trabajar?'
        ]
      },
      projects: {
        eyebrow: 'TRABAJO DESTACADO',
        title: 'Proyectos seleccionados',
        path: '~/proyectos/todos',
        count: '6 proyectos configurados',
        filterAll: 'Todos',
        filterDone: 'Producción [Terminados]',
        filterProgress: 'En Desarrollo',
        viewLive: '↗ Ver App',
        viewSource: '↗ Código Fuente',
        viewLab: '↗ Entrar al Laboratorio',
        viewGenerator: '🎲 Generador de Preguntas',
        viewUsability: '↗ Informe de Usabilidad',
        viewRepo: '↗ Repositorio',
        viewSpace: '🤗 Hugging Face Space',
        watchAuction: '▶ Vídeo de la Subasta',
        watchVideo: '▶ Ver Vídeo',
        previewGallery: '🖼️ Capturas',
        f1: {
          tag: 'Fórmula 1 y Plataforma en Tiempo Real',
          title: 'F1-BUGAMBRA',
          meta: '2025 · Full-Stack e IA',
          desc: 'Plataforma integral de liga de Fórmula 1 con telemetría en directo, canal Bugambra TV, archivo histórico de escuderías y economía virtual con sala de subastas de pilotos en tiempo real sincronizada mediante Firestore y Google Gemini API.',
          f1: 'Sala de subastas en vivo con sincronización sub-segundo, pujas simultáneas y control estricto de presupuestos.',
          f2: 'Diseño auditable: resultados de carreras almacenados como revisiones inmutables para recalcular clasificaciones.',
          f3: 'PWA instalable con funcionamiento offline y resúmenes de carreras asistidos por Gemini.'
        },
        gmail: {
          tag: 'Local-First · Automatización de Correo',
          title: 'GmailKeep Personal',
          meta: '2026 · Python y Google Cloud',
          desc: 'Demonio de organización y archivado automático de Gmail por marcas comerciales. Agrupa mensajes por remitente corporativo, crea subetiquetas jerárquicas y archiva sin recurrir a servidores de terceros, suscripciones de IA ni fugas de datos.',
          f1: 'Autenticación directa de escritorio mediante OAuth 2.0 de Google sin intermediarios.',
          f2: 'Ejecución como demonio local con timers de systemd (Linux), launchd (macOS) o Programador de tareas (Windows).',
          f3: 'Estructura taxonómica limpia: Archivo/Promociones/[Marca], logrando mantener la bandeja de entrada en cero.'
        },
        smartfruit: {
          tag: 'Visión Computacional · Transfer Learning',
          title: 'SmartFruitClassifier',
          meta: '2025 · EfficientNet-B0 y Hugging Face',
          desc: 'Sistema interactivo de clasificación de variedades de fruta basado en Transfer Learning (EfficientNet-B0) y optimización bioinspirada de hiperparámetros (ABC y PSO), alcanzando >95% de precisión. Desplegado en la nube en Hugging Face Spaces.',
          f1: 'Optimización metaheurística de hiperparámetros (Colonia Artificial de Abejas y Enjambre de Partículas) superando a CNNs convencionales con un 87% menos de parámetros.',
          f2: 'Arquitectura EfficientNet-B0 ajustada con regularización y preprocesamiento en tiempo real.',
          f3: 'Aplicación web interactiva en vivo desplegada en Hugging Face Spaces con inferencia visual inmediata.'
        },
        clever: {
          tag: 'Trabajo Fin de Grado (TFG) · Multiplataforma',
          title: 'CleverTracker',
          meta: '2026 · Flutter y PostgreSQL',
          desc: 'Suite multiplataforma de registro y analítica nutricional, entrenamiento, medidas corporales y ayuno. Respaldada por un catálogo propio de más de 681.000 productos y modelos de visión computacional entrenados localmente para reconocimiento de platos y OCR de tablas nutricionales.',
          f1: 'Base de datos propia de alimentos con búsqueda de texto difusa en menos de 50 ms.',
          f2: 'Modelos propios de visión por computador y OCR evitando llamadas recurrentes a APIs externas.',
          f3: 'Cliente Flutter (Riverpod/Hive) con backend PostgREST y PostgreSQL en Oracle Cloud con Row-Level Security.',
          viewAudit: '↗ Auditoría de Usabilidad',
          viewTest: '🎲 Generador Aleatorio'
        },
        ipo: {
          tag: 'IPO / HCI · Recuperación Activa',
          title: 'IPO Study Lab',
          meta: '2026–27 · Plataforma Educativa',
          desc: 'Laboratorio de estudio interactivo para Interacción Persona-Ordenador basado en recuperación activa. Incluye bancos de test por temas con corrección razonada, niveles de certeza metacognitiva y una auditoría completa de usabilidad aplicada sobre F1-BUGAMBRA.',
          f1: 'Bancos de preguntas (Temas 1, 2 y 3) centrados en contraste conceptual y análisis de errores seguros.',
          f2: 'Auditorías de usabilidad y tests interactivos sobre aplicaciones reales (F1-BUGAMBRA y CleverTracker).',
          f3: 'Registro local de progreso y refuerzo de conceptos dudosos.'
        },
        divinando: {
          tag: 'Proyecto Fin de Ciclo (FP) · Ingeniería Base',
          badge: 'Proyecto Final FP · Terminado',
          title: 'DIVINANDO',
          meta: '2022 · Java, C++ y Bases de Datos Relacionales',
          desc: 'Programado íntegramente desde cero como proyecto final de ciclo formativo (DAM), demostrando una sólida base de lógica de programación, diseño de bases de datos relacionales y resolución de problemas.',
          f1: 'Desarrollado íntegramente desde cero sin atajos de generación por IA, consolidando fundamentos de ingeniería del software.',
          f2: 'Lógica central de backend, módulos nativos y persistencia construidos con Java, C++ y Bases de Datos Relacionales.',
          f3: 'Arquitectura multiplataforma con autenticación de usuarios, clasificaciones competitivas y mecánicas de adivinanza de palabras.'
        }
      },
      blog: {
        eyebrow: 'NOTAS DE CAMPO',
        title: 'cat ~/notas',
        path: '~/notas · 5 casos de estudio',
        subpath: 'Análisis de ingeniería',
        entriesCount: '5 casos de estudio',
        pageSubtitle: 'Casos de estudio técnicos y arquitectura de mis proyectos: concurrencia en tiempo real, demonios local-first, modelos propios de visión computacional, optimización bioinspirada y fundamentos de ingeniería.',
        searchPlaceholder: 'buscar notas…',
        filterAll: 'todos (5)',
        filterRealtime: 'Tiempo Real',
        filterVision: 'Visión Computacional',
        filterCore: 'Ingeniería Base e IA',
        readPost: 'leer análisis →',
        minRead: 'min de lectura',
        featuredTag: '★ DESTACADO · ANÁLISIS TÉCNICO',
        kickerLocal: '#LOCAL-FIRST · PRIVACIDAD',
        kickerVision: '#VISIÓN-COMPUTACIONAL · FLUTTER',
        kickerBio: '#TRANSFER-LEARNING · IA BIOINSPIRADA',
        kickerCore: '#INGENIERÍA-BASE · ORQUESTACIÓN IA',
        archiveBtn: 'ls ~/notas/todas →',
        backHome: '← /inicio'
      },
      about: {
        eyebrow: 'SOBRE MÍ',
        title: 'Filosofía de Ingeniería',
        path: '~/sobre-mi/trayectoria',
        p1: 'Soy estudiante de Ingeniería Informática enfocado en la Ingeniería de IA: diseño de agentes autónomos, sistemas potenciados por LLMs y aplicaciones web completas para producción. Con experiencia previa en Ingeniería de Datos, aplico bases sólidas de modelado de datos, tuberías eficientes y fiabilidad de sistemas al desarrollo de soluciones modernas de IA generativa.',
        p2: 'Mi trabajo se fundamenta en tres principios:',
        pr1Title: 'Human First AI',
        pr1Desc: 'La IA debe amplificar la capacidad de decisión de las personas, no suplantarla mediante cajas negras. Los sistemas deben ser explicables, transparentes y orientados al usuario.',
        pr2Title: 'Local-First y Soberanía de Datos',
        pr2Desc: 'Siempre que sea técnicamente viable, el procesamiento debe residir en el hardware del usuario, sin costes recurrentes por API ni compromisos de privacidad.',
        pr3Title: 'Artesanía en Producción',
        pr3Desc: 'Desde el diseño del esquema de base de datos y la concurrencia en red hasta la tipografía y las microinteracciones, una solución no está terminada hasta que resulta rápida, robusta y agradable.',
        toolboxTitle: 'Herramientas y Tecnologías'
      },
      contact: {
        eyebrow: 'CONTACTO',
        title: 'Construyamos algo.',
        path: '~/contacto',
        replyTime: '● responde en < 24h',
        locationLabel: 'ubicación',
        locationVal: 'España · CET (GMT+1)',
        statusLabel: 'estado',
        statusVal: 'abierto a proyectos · 2026',
        focusLabel: 'especialidad',
        focusVal: 'Ingeniería de IA y Sistemas Full-Stack',
        githubLabel: 'github',
        linkedinLabel: 'linkedin',
        cvLabel: 'cv / curriculum',
        cvDownload: 'Curriculum.pdf (Descargar)',
        formName: 'NOMBRE',
        formEmail: 'CORREO ELECTRÓNICO',
        formMessage: 'MENSAJE',
        formPlaceholder: '¿Qué proyecto estás construyendo?',
        formSend: 'enviar mensaje',
        formNote: 'protegido · entrega directa a ajgarciarias@gmail.com'
      },
      footer: {
        copy: '© 2026 Antonio José García Arias',
        note: '· desarrollado con esmero, estética Blue Cyan, servido en GitHub Pages'
      }
    }
  };

  // ==========================================================================
  // Blog Articles Full Data
  // ==========================================================================
  const ARTICLES = [
    {
      id: 'f1-bugambra-realtime-auction',
      title: 'From WhatsApp Chaos to Real-time Auctions: Engineering the F1-BUGAMBRA Live Bidding Engine',
      titleEs: 'Del caos de WhatsApp a subastas en tiempo real: La ingeniería de F1-BUGAMBRA',
      date: 'SEP 20, 2026',
      dateEs: '20 SEP 2026',
      readTime: '6 min read',
      readTimeEs: '6 min de lectura',
      tags: ['Realtime', 'WebSockets', 'Firestore', 'F1-BUGAMBRA', 'Concurrency'],
      excerpt: 'How we codified an unruly championship spreadsheet and chaotic WhatsApp group bids into an authoritative real-time platform with anti-sniping and concurrency locks.',
      excerptEs: 'Cómo convertimos una hoja de Excel rebelde y ofertas caóticas de WhatsApp en una plataforma en tiempo real con protección anti-francotirador y control de concurrencia.',
      content: `
        <h3>1. The Origin: A Spreadsheet on the Verge of Collapse</h3>
        <p>At the start of the championship, the regulations of our Formula 1 league lived in an Excel spreadsheet we maintained together: driver standings, constructor budgets, penalties, contract durations, and buyout clauses. It functioned smoothly until multiple team managers attempted to edit it at the same moment after a Sunday Grand Prix, corrupting standings and breaking cell formulas.</p>
        <p>The breaking point was driver transfer windows. In a WhatsApp group, team principals shouted bids for free-agent drivers at 23:59:59. Disputes erupted over who posted first, whose message had a timestamp delay, and whether a team even had the bank balance to honor the clause.</p>

        <div class="reader-callout">
          <strong>The Engineering Mandate:</strong> Move every single column from the spreadsheet into code. Create one single source of truth, validate budget constraints automatically, and build a synchronized live auction room that runs itself.
        </div>

        <h3>2. Solving Concurrency in the Live Auction Room</h3>
        <p>The auction module needed to support simultaneous bidding across multiple phones with zero latency surprises. If Team Ferrari and Team Mercedes bid on a driver at the same millisecond, two things must be guaranteed:</p>
        <ul>
          <li><strong>Serializability:</strong> Only one bid can hold the current highest price; the other must immediately fail or increment.</li>
          <li><strong>Solvency Check:</strong> A team's remaining budget must be verified before writing the transaction, taking into account driver salaries and team operations.</li>
        </ul>

        <pre><code>// Atomic bid transaction logic
await runTransaction(db, async (transaction) => {
  const auctionRef = doc(db, 'auctions', driverId);
  const auctionDoc = await transaction.get(auctionRef);
  const teamRef = doc(db, 'teams', bidderTeamId);
  const teamDoc = await transaction.get(teamRef);

  const currentBid = auctionDoc.data().currentBid;
  const teamBudget = teamDoc.data().availableBudget;

  if (proposedBid <= currentBid) {
    throw new Error('Bid must be strictly higher than current amount');
  }
  if (teamBudget < proposedBid) {
    throw new Error('Insufficient funds in team balance');
  }

  // Extend countdown if bid placed in final 15 seconds ("Anti-Snipe")
  const timeLeft = auctionDoc.data().deadline.toMillis() - Date.now();
  let newDeadline = auctionDoc.data().deadline;
  if (timeLeft < 15000) {
    newDeadline = Timestamp.fromMillis(Date.now() + 15000);
  }

  transaction.update(auctionRef, {
    currentBid: proposedBid,
    highestBidder: bidderTeamId,
    deadline: newDeadline,
    bidHistory: arrayUnion({ team: bidderTeamId, amount: proposedBid, time: Timestamp.now() })
  });
});</code></pre>

        <h3>3. The Anti-Snipe Countdown Mechanism</h3>
        <p>In online auctions, sniping (bidding at the last fraction of a second so competitors cannot react) ruins the competitive spirit. We implemented an automatic countdown extender: whenever any valid bid lands with less than 15 seconds remaining on the clock, the countdown resets to 15 seconds. This simple rule turned heated WhatsApp arguments into an exciting live event where teams watch the screen and decide their strategic limit in real time.</p>

        <h3>4. Transitioning to an Authoritative Backend</h3>
        <p>While the initial implementation leveraged Firebase Firestore client-side security rules, we are completing a migration to a Node.js + PostgreSQL backend with transactional integrity and audit tables. Every change of a point or a euro is an immutable ledger entry, ensuring that a championship is never patched by hand, but recomputed deterministically.</p>
      `,
      contentEs: `
        <h3>1. El origen: Una hoja de cálculo al borde del colapso</h3>
        <p>Al comienzo del campeonato, el reglamento de nuestra liga de Fórmula 1 residía en una hoja de Excel compartida: clasificaciones de pilotos, presupuestos de constructores, penalizaciones, duraciones de contratos y cláusulas de rescisión. Funcionaba bien hasta que varios directores de equipo intentaron editarla a la vez tras un Gran Premio de domingo, corrompiendo fórmulas y desincronizando tablas.</p>
        <p>El punto de quiebre fue el mercado de fichajes. En un grupo de WhatsApp, los jefes de equipo lanzaban pujas por pilotos libres a las 23:59:59. Surgían disputas sobre quién envió primero, qué mensaje llegó con retraso de red y si un equipo disponía realmente del saldo bancario para afrontar la cláusula.</p>

        <div class="reader-callout">
          <strong>El mandato técnico:</strong> Trasladar cada columna del Excel a reglas de código verificadas. Crear una única fuente de verdad, validar los presupuestos de manera automática y construir una sala de subastas sincronizada en tiempo real.
        </div>

        <h3>2. Control de concurrencia en la sala de subastas</h3>
        <p>El módulo de subastas requería operar de manera sincronizada en múltiples teléfonos móviles sin sorpresas de latencia. Si dos equipos pujan por un piloto en el mismo milisegundo, deben cumplirse dos garantías:</p>
        <ul>
          <li><strong>Serializabilidad:</strong> Solo una puja puede liderar el precio actual; la otra debe rebotar o incrementarse de inmediato.</li>
          <li><strong>Comprobación de solvencia:</strong> El presupuesto restante del equipo debe verificarse atómicamente antes de registrar la puja.</li>
        </ul>

        <pre><code>// Transacción atómica de puja en tiempo real
await runTransaction(db, async (transaction) => {
  const auctionRef = doc(db, 'auctions', driverId);
  const auctionDoc = await transaction.get(auctionRef);
  const teamRef = doc(db, 'teams', bidderTeamId);
  const teamDoc = await transaction.get(teamRef);

  const currentBid = auctionDoc.data().currentBid;
  const teamBudget = teamDoc.data().availableBudget;

  if (proposedBid <= currentBid) {
    throw new Error('La puja debe superar la oferta actual');
  }
  if (teamBudget < proposedBid) {
    throw new Error('Presupuesto insuficiente en la cuenta del equipo');
  }

  // Regla anti-francotirador: ampliar 15 segundos si puja al final
  const timeLeft = auctionDoc.data().deadline.toMillis() - Date.now();
  let newDeadline = auctionDoc.data().deadline;
  if (timeLeft < 15000) {
    newDeadline = Timestamp.fromMillis(Date.now() + 15000);
  }

  transaction.update(auctionRef, {
    currentBid: proposedBid,
    highestBidder: bidderTeamId,
    deadline: newDeadline,
    bidHistory: arrayUnion({ team: bidderTeamId, amount: proposedBid, time: Timestamp.now() })
  });
});</code></pre>

        <h3>3. El mecanismo de cuenta atrás anti-francotirador</h3>
        <p>En subastas digitales, pujar en la última décima de segundo sin dar margen de réplica arruina la competición. Implementamos una extensión dinámica: cuando entra una puja válida a menos de 15 segundos del final, el reloj se extiende a 15 segundos. Esto convirtió las discusiones caóticas de chat en un evento emocionante donde cada escudería decide su límite financiero en directo.</p>
      `
    },
    {
      id: 'local-first-gmailkeeper',
      title: 'Local-First Privacy: Building GmailKeep Personal Without Cloud Middlemen or AI Costs',
      titleEs: 'Privacidad Local-First: Construyendo GmailKeep Personal sin servidores intermediarios ni costes de IA',
      date: 'AUG 14, 2026',
      dateEs: '14 AGO 2026',
      readTime: '5 min read',
      readTimeEs: '5 min de lectura',
      tags: ['Local-First', 'Python', 'GmailAPI', 'OAuth2', 'Systemd'],
      excerpt: 'Why users do not need another $15/month SaaS reading their personal emails. Architecture of a zero-cost local systemd daemon with hierarchical label dispatch.',
      excerptEs: 'Por qué no necesitas otro servicio SaaS de 15€/mes leyendo tus correos personales. Arquitectura de un demonio local sin costes con etiquetas jerárquicas.',
      content: `
        <h3>1. The Problem with Commercial Inbox Tools</h3>
        <p>Over the last decade, dozens of startups have promised "Inbox Zero". Almost all of them operate on the same questionable pattern: you grant their remote servers full read-and-write permissions to your entire email history, they ingest your messages to run LLM classifiers, and they charge $10 to $20 every single month for basic rule processing.</p>
        <p>Email is the digital backbone of personal identity. Passwords resets, bank statements, personal contracts, and family updates all route through your inbox. Handing unrestricted server-side OAuth access to a third party creates an unnecessary attack surface and privacy hazard.</p>

        <div class="reader-callout">
          <strong>The Solution:</strong> GmailKeeper Personal runs exclusively on your own machine. Your Python script communicates directly with Google's Gmail API via a local desktop OAuth 2.0 client. No middleman server exists.
        </div>

        <h3>2. Hierarchical Label Architecture</h3>
        <p>Instead of relying on fragile flat tags, GmailKeeper builds a clean taxonomy:</p>
        <pre><code>Archivo/
├── Promociones/
│   ├── Amazon
│   ├── Steam
│   └── IKEA
├── Actualizaciones/
│   ├── GitHub
│   ├── Stripe
│   └── Banco Santander
└── Social/
    └── LinkedIn</code></pre>

        <p>When an email from a recognized brand arrives, GmailKeeper performs three discrete actions:</p>
        <ul>
          <li><strong>Identify:</strong> Matches the authenticated sender domain against a local brand dictionary.</li>
          <li><strong>Tag:</strong> Automatically provisions the nested sub-label in Gmail if it does not yet exist.</li>
          <li><strong>Archive:</strong> Removes the message from the primary Inbox view without marking it as read or deleting it.</li>
        </ul>

        <h3>3. Running Silently in the Background</h3>
        <p>To make it a true set-and-forget tool, GmailKeeper ships with native service descriptors for <code>systemd</code> on Linux, <code>launchd</code> on macOS, and Scheduled Tasks on Windows. It executes every 15 minutes, synchronizes labels in seconds, and exits cleanly with zero idle memory consumption.</p>
      `,
      contentEs: `
        <h3>1. El problema de los organizadores comerciales de correo</h3>
        <p>En la última década, decenas de aplicaciones han prometido alcanzar el "Inbox Zero". Casi todas siguen el mismo patrón: otorgas a sus servidores remotos acceso total de lectura y escritura a tu historial de correos, procesan tus mensajes con LLMs y te cobran entre 10€ y 20€ al mes por tareas que un ordenador personal puede hacer gratis.</p>
        <p>El correo electrónico es la columna vertebral de nuestra identidad digital. Facturas bancarias, restablecimiento de contraseñas y mensajes privados circulan por ahí. Entregar permisos OAuth sin restricciones a una empresa externa genera un riesgo innecesario de privacidad.</p>

        <div class="reader-callout">
          <strong>La solución:</strong> GmailKeeper Personal corre exclusivamente en tu propio equipo. El script en Python se comunica directamente con la API de Gmail mediante credenciales OAuth de escritorio. No existe ningún servidor intermedio.
        </div>

        <h3>2. Arquitectura de etiquetas jerárquicas</h3>
        <p>En lugar de etiquetas planas desordenadas, GmailKeeper construye una jerarquía estructurada:</p>
        <pre><code>Archivo/
├── Promociones/
│   ├── Amazon
│   ├── Steam
│   └── IKEA
├── Actualizaciones/
│   ├── GitHub
│   ├── Stripe
│   └── Banco Santander
└── Social/
    └── LinkedIn</code></pre>

        <h3>3. Ejecución silenciosa y sin consumo pasivo</h3>
        <p>Mediante temporizadores nativos de <code>systemd</code> en Linux, <code>launchd</code> en macOS o el Programador de tareas de Windows, el script despierta cada 15 minutos, procesa la cola en segundos y se apaga de inmediato sin consumir memoria en segundo plano.</p>
      `
    },
    {
      id: 'clevertracker-custom-vision-models',
      title: 'Custom Models vs. Third-Party APIs: Why CleverTracker Trains Its Own Vision Models',
      titleEs: 'Modelos Propios vs APIs de Terceros: Por qué CleverTracker entrena su propia visión',
      date: 'JUL 02, 2026',
      dateEs: '02 JUL 2026',
      readTime: '7 min read',
      readTimeEs: '7 min de lectura',
      tags: ['ComputerVision', 'Flutter', 'PostgREST', 'MachineLearning', 'OfflineFirst'],
      excerpt: 'The architectural tradeoffs between calling external LLM vision endpoints and training custom lightweight models for a 681,000 product food catalog.',
      excerptEs: 'Las ventajas arquitectónicas entre depender de APIs externas de visión o entrenar modelos ligeros propios para un catálogo de 681.000 alimentos.',
      content: `
        <h3>1. The API Dependency Trap in Health & Nutrition Apps</h3>
        <p>The standard playbook for modern apps is tempting: snap a photo of a meal, send it as base64 to Claude or GPT-4o, and parse the JSON response. In prototyping, it looks like magic. In production, it quickly falls apart:</p>
        <ul>
          <li><strong>Prohibitive Latency:</strong> Cloud vision endpoints frequently take 3 to 7 seconds to roundtrip a single food image.</li>
          <li><strong>Unsustainable Unit Economics:</strong> At 5 meal snaps a day per user, external API bills quickly surpass user subscription revenue.</li>
          <li><strong>Hallucinations & Inconsistent Macros:</strong> A general LLM will guess wildly different calorie numbers for the same slice of sourdough bread on consecutive days.</li>
        </ul>

        <h3>2. Our Strategy: Proprietary Catalog + On-Device Vision</h3>
        <p>In CleverTracker, we established an uncompromising technical rule from day one: <em>We do not outsource core nutritional intelligence to third-party APIs.</em></p>
        <p>Instead, the platform rests on two foundational pillars:</p>
        <ul>
          <li><strong>A Curated 681,000 Food Database:</strong> Indexed in PostgreSQL with trigram and full-text indexes, exposed via PostgREST for sub-50ms searches.</li>
          <li><strong>Custom-Trained OCR & Food Recognition:</strong> Tailored computer vision models designed specifically to detect food geometries and extract structured nutrition tables from packaging.</li>
        </ul>

        <h3>3. The Flutter Multiplatform Architecture</h3>
        <p>The client is written in Flutter with <code>flutter_riverpod</code> for reactive state management, <code>Hive</code> for high-performance offline local key-value storage, and <code>Dio</code> for authenticated HTTP calls against PostgREST. If the user is at the gym without cellular data, food logging and workout tracking remain instantly responsive.</p>
      `,
      contentEs: `
        <h3>1. La trampa de las APIs de terceros en salud y nutrición</h3>
        <p>El camino fácil hoy en día es hacer una foto a un plato, mandarla como base64 a una API de OpenAI o Anthropic y esperar un JSON. En una demo parece magia; en un producto real presenta graves problemas:</p>
        <ul>
          <li><strong>Latencia inaceptable:</strong> Entre 3 y 7 segundos por foto frustran al usuario en el día a día.</li>
          <li><strong>Costes insostenibles:</strong> Registrar 5 comidas al día por usuario pulveriza el margen económico.</li>
          <li><strong>Alucinaciones e inconsistencia:</strong> Un LLM generalista asigna valores nutricionales contradictorios al mismo alimento en días consecutivos.</li>
        </ul>

        <h3>2. Nuestra estrategia: Catálogo propio de 681.000 productos y visión dedicada</h3>
        <p>En CleverTracker fijamos una regla innegociable: la inteligencia central nutricional no se delega en APIs de terceros. Disponemos de una base de datos propia indexada en PostgreSQL con búsqueda difusa en menos de 50 ms y modelos optimizados para leer tablas de información nutricional mediante la cámara.</p>

        <h3>3. Arquitectura Flutter con soporte Offline-First</h3>
        <p>Construido con Flutter, Riverpod y Hive, el usuario puede registrar comidas, entrenamientos y medidas corporales en el gimnasio o en el supermercado sin depender de cobertura móvil. Los datos se sincronizan con Oracle Cloud de manera transparente en cuanto hay conexión.</p>
      `
    },
    {
      id: 'smartfruit-bio-inspired-ai',
      title: 'Bio-Inspired Optimization: Outperforming Heavy CNNs with EfficientNet-B0 in SmartFruitClassifier',
      titleEs: 'Optimización Bioinspirada: Superando a CNNs pesadas con EfficientNet-B0 en SmartFruitClassifier',
      date: 'JAN 18, 2026',
      dateEs: '18 ENE 2026',
      readTime: '5 min read',
      readTimeEs: '5 min de lectura',
      tags: ['EfficientNet-B0', 'TransferLearning', 'BioInspired', 'HuggingFace', 'ComputerVision'],
      excerpt: 'How Artificial Bee Colony (ABC) and Particle Swarm Optimization (PSO) tuned EfficientNet-B0 to surpass >95% accuracy while cutting parameter count by 87%.',
      excerptEs: 'Cómo la Colonia Artificial de Abejas (ABC) y la Optimización por Enjambre de Partículas (PSO) ajustaron EfficientNet-B0 para superar el 95% de precisión reduciendo los parámetros un 87%.',
      content: `
        <h3>1. Beyond Grid Search in Transfer Learning</h3>
        <p>When fine-tuning deep convolutional networks for fine-grained fruit variety classification, manual hyperparameter tuning or exhaustive grid search quickly hits a wall: learning rates, dropout ratios, unfreezing depth, and L2 regularization interact non-linearly.</p>
        <p>In <strong>SmartFruitClassifier</strong> (developed during my mobility program at ISEC Coimbra), we paired a compact <code>EfficientNet-B0</code> backbone with bio-inspired metaheuristic algorithms—specifically <strong>Artificial Bee Colony (ABC)</strong> and <strong>Particle Swarm Optimization (PSO)</strong>—to navigate the hyperparameter space automatically.</p>

        <div class="reader-callout">
          <strong>Key Result:</strong> Over 95% test accuracy across fine-grained fruit varieties while using 87% fewer parameters than traditional heavy CNN architectures, deployed live on Hugging Face Spaces.
        </div>

        <h3>2. How ABC &amp; PSO Guided the Architecture</h3>
        <ul>
          <li><strong>Exploration vs. Exploitation:</strong> PSO particles explored continuous learning-rate and dropout schedules, while ABC scout bees escaped local minima in regularization strength.</li>
          <li><strong>Compound Scaling Efficiency:</strong> By leveraging EfficientNet-B0's balanced depth, width, and resolution scaling, inference remains lightweight enough for real-time CPU execution on cloud spaces.</li>
        </ul>

        <h3>3. From Research Notebook to Live Cloud Deployment</h3>
        <p>A model that lives only in a Jupyter notebook delivers zero practical value. We packaged the preprocessing pipeline and trained weights into an interactive web interface hosted on <strong>Hugging Face Spaces</strong>, allowing anyone to upload an image and inspect top-k confidence scores in real time.</p>
      `,
      contentEs: `
        <h3>1. Más allá de Grid Search en Transfer Learning</h3>
        <p>Al ajustar redes convolucionales profundas para clasificar variedades específicas de fruta, la búsqueda manual o mediante rejilla exhaustiva (Grid Search) resulta ineficiente: la tasa de aprendizaje, el porcentaje de dropout, las capas descongeladas y la regularización L2 interactúan de forma no lineal.</p>
        <p>En <strong>SmartFruitClassifier</strong> (desarrollado durante mi estancia en ISEC Coímbra), combinamos un backbone compacto <code>EfficientNet-B0</code> con algoritmos metaheurísticos bioinspirados —<strong>Colonia Artificial de Abejas (ABC)</strong> y <strong>Enjambre de Partículas (PSO)</strong>— para explorar automáticamente el espacio de hiperparámetros.</p>

        <div class="reader-callout">
          <strong>Resultado clave:</strong> Más del 95% de precisión en clasificación con un 87% menos de parámetros que arquitecturas CNN pesadas tradicionales, desplegado en vivo en Hugging Face Spaces.
        </div>

        <h3>2. Cómo ABC y PSO guiaron el ajuste del modelo</h3>
        <ul>
          <li><strong>Exploración vs. Explotación:</strong> Las partículas de PSO exploraron combinaciones continuas de tasa de aprendizaje y dropout, mientras que las abejas exploradoras de ABC evitaron óptimos locales en la regularización.</li>
          <li><strong>Eficiencia en Inferencia:</strong> Gracias al escalado compuesto de EfficientNet-B0, el modelo ofrece predicciones instantáneas en tiempo real sin requerir GPUs dedicadas en producción.</li>
        </ul>

        <h3>3. Del cuaderno de investigación al despliegue en la nube</h3>
        <p>Un modelo que se queda en un notebook no aporta valor real. Empaquetamos el preprocesamiento y los pesos optimizados en una aplicación interactiva en <strong>Hugging Face Spaces</strong> con inferencia visual inmediata.</p>
      `
    },
    {
      id: 'divinando-core-foundations-to-ai',
      title: 'From Scratch Core Logic in DIVINANDO to AI Orchestration: Why Foundations Matter',
      titleEs: 'De programar DIVINANDO desde cero a la Orquestación con IA: Por qué importan los fundamentos',
      date: 'MAY 10, 2026',
      dateEs: '10 MAY 2026',
      readTime: '5 min read',
      readTimeEs: '5 min de lectura',
      tags: ['Java', 'C++', 'SQL', 'DIVINANDO', 'AIOrchestration'],
      excerpt: 'Why coding DIVINANDO from scratch in Java, C++, and SQL shaped how I orchestrate AI-assisted workflows today to ship production software faster without losing control of the underlying architecture.',
      excerptEs: 'Por qué programar DIVINANDO íntegramente desde cero en Java, C++ y SQL definió mi forma actual de orquestar flujos asistidos por IA para entregar herramientas reales más rápido sin perder el control arquitectónico.',
      content: `
        <h3>1. Building DIVINANDO Without Shortcuts</h3>
        <p>When we built <strong>DIVINANDO</strong> as our vocational capstone project (DAM Final Degree Project), every single line of code—from the game state machine and native logic in <code>Java</code> and <code>C++</code> to the relational database schemas and authentication flows—was written by hand from scratch.</p>
        <p>Debugging memory boundaries, designing normalized SQL tables, and coordinating multiplatform client-server state taught me how software actually works underneath the abstractions.</p>

        <div class="reader-callout">
          <strong>Engineering Principle:</strong> Writing every single line of code from scratch isn't always the smartest path when delivery time, efficiency, and costs matter—but you can only orchestrate AI effectively if you deeply understand the underlying engineering.
        </div>

        <h3>2. Combining Solid Foundations with AI-Assisted Workflows</h3>
        <p>Today's software landscape has shifted. By combining those core foundations (Java, C++, SQL, and data pipelines at Civica and T-Systems) with <strong>advanced prompt engineering, guardrails, and AI orchestration</strong>, I can deliver complete production suites—like <em>F1-BUGAMBRA</em>, <em>GmailKeep Personal</em>, <em>CleverTracker</em>, and <em>IPO Study Lab</em>—in a fraction of the traditional time.</p>
        <ul>
          <li><strong>Architecture First:</strong> I design the data model, concurrency locks, and security boundaries before generating or writing implementation code.</li>
          <li><strong>Verification &amp; Guardrails:</strong> Every AI-assisted module is audited for edge cases, transactional integrity, and runtime performance.</li>
        </ul>
      `,
      contentEs: `
        <h3>1. Construyendo DIVINANDO sin atajos</h3>
        <p>Cuando desarrollamos <strong>DIVINANDO</strong> como Proyecto Final de Ciclo Formativo (DAM), cada línea de código —desde la máquina de estados del juego y la lógica en <code>Java</code> y <code>C++</code> hasta el diseño de bases de datos relacionales y la autenticación— se programó íntegramente desde cero.</p>
        <p>Depurar errores a bajo nivel, normalizar tablas SQL y sincronizar cliente y servidor me dio una base sólida para comprender cómo funciona realmente el software por debajo de las abstracciones.</p>

        <div class="reader-callout">
          <strong>Principio de ingeniería:</strong> Escribir cada línea de código desde cero no siempre es el camino más inteligente cuando importan los tiempos de entrega, la eficiencia y los costes; pero solo puedes orquestar IA con criterio si dominas los fundamentos técnicos.
        </div>

        <h3>2. Uniendo fundamentos sólidos con flujos asistidos por IA</h3>
        <p>Combinando esa base técnica (Java, C++, SQL y tuberías de datos corporativas en Civica y T-Systems) con <strong>prompt engineering avanzado, guardrails y orquestación de IA</strong>, hoy construyo y despliego herramientas reales completas —como <em>F1-BUGAMBRA</em>, <em>GmailKeep Personal</em>, <em>CleverTracker</em> e <em>IPO Study Lab</em>— mucho más rápido sin perder el control sobre la arquitectura.</p>
        <ul>
          <li><strong>Arquitectura primero:</strong> Diseño el modelo de datos, el control de concurrencia y las reglas de seguridad antes de implementar.</li>
          <li><strong>Verificación rigurosa:</strong> Cada componente se audita para garantizar integridad transaccional, privacidad y rendimiento en producción.</li>
        </ul>
      `
    }
  ];

  // ==========================================================================
  // Terminal Engine (Natural Knowledge Base)
  // ==========================================================================
  const TERMINAL_KNOWLEDGE = {
    stack: {
      en: "Toni's primary engineering stack includes:\n• Languages: Python, TypeScript, Dart, Java, SQL, Kotlin, C++\n• Frontend: React 19, Tailwind CSS, Vite, Flutter (Riverpod, Hive)\n• Backend: Node.js, PostgREST, PostgreSQL, Firebase (Firestore, Auth, Storage)\n• Cloud & Infra: Oracle Cloud (OCI), Linux/systemd, Docker, Git\n• AI & Agents: Local LLM inference, Gemini API, Computer Vision, Prompt Engineering, MCP",
      es: "El stack técnico principal de Toni comprende:\n• Lenguajes: Python, TypeScript, Dart, Java, SQL, Kotlin, C++\n• Frontend: React 19, Tailwind CSS, Vite, Flutter (Riverpod, Hive)\n• Backend: Node.js, PostgREST, PostgreSQL, Firebase (Firestore, Auth, Storage)\n• Cloud e Infra: Oracle Cloud (OCI), Linux/systemd, Docker, Git\n• IA y Agentes: Inferencia local de LLMs, Gemini API, Visión Computacional, Prompt Engineering, MCP"
    },
    f1: {
      en: "F1-BUGAMBRA is a complete Formula 1 league platform featuring:\n• Live telemetry and results dashboard built in React 19 + TypeScript + Tailwind.\n• Real-time multiplayer driver auction engine with sub-second sync and budget locks.\n• Installable PWA with offline caching and Google Gemini API race recaps.\n• Deployed live at: https://f1-bugambra.vercel.app\n• YouTube auction demo: https://youtu.be/vmT-NIviEfI",
      es: "F1-BUGAMBRA es una plataforma integral de liga de F1 que incluye:\n• Panel de clasificaciones y telemetría en tiempo real en React 19 + TypeScript + Tailwind.\n• Sala de subastas de pilotos multijugador con sincronización sub-segundo y control presupuestario.\n• PWA instalable con soporte offline y resúmenes con Google Gemini API.\n• Enlace a la app: https://f1-bugambra.vercel.app\n• Demostración en vídeo: https://youtu.be/vmT-NIviEfI"
    },
    clevertracker: {
      en: "CleverTracker is Toni's Final Degree Project (TFG):\n• High-performance multiplatform nutrition, workout, and fasting suite in Flutter.\n• Backed by an internal database of 681,000+ foods with <50ms fuzzy search.\n• Custom-trained Computer Vision models for plate recognition and nutrition label OCR (no third-party API dependencies).\n• Architecture: Flutter + Riverpod + Hive client, PostgREST + PostgreSQL on Oracle Cloud with Row-Level Security.",
      es: "CleverTracker es el Trabajo Fin de Grado (TFG) de Toni:\n• Suite de nutrición, entrenamiento y ayuno multiplataforma desarrollada en Flutter.\n• Base de datos propia de 681.000+ alimentos con búsqueda difusa en menos de 50 ms.\n• Modelos propios de Visión Computacional y OCR para tablas nutricionales (sin coste de APIs de terceros).\n• Arquitectura: Flutter + Riverpod + Hive, PostgREST + PostgreSQL en Oracle Cloud con RLS."
    },
    gmailkeeper: {
      en: "GmailKeepr Personal is a local-first email organization daemon:\n• Automatically sorts emails by brand/merchant into structured sub-labels (e.g. Archivo/Promociones/[Brand]).\n• Runs entirely on personal hardware using native desktop OAuth 2.0 (zero intermediary servers).\n• Scheduled via Linux systemd timers, macOS launchd, or Windows Task Scheduler.\n• Interactive demo: https://ajgarciarias10.github.io/gmailkeeper-personal/\n• GitHub repo: https://github.com/ajgarciarias10/gmailkeeper-personal",
      es: "GmailKeepr Personal es un demonio local-first para organizar el correo:\n• Agrupa correos por marca comercial en subetiquetas jerárquicas (ej. Archivo/Promociones/[Marca]).\n• Funciona íntegramente en tu equipo con OAuth 2.0 de escritorio (sin servidores intermediarios ni coste).\n• Se ejecuta con temporizadores de systemd (Linux), launchd (macOS) o Tareas de Windows.\n• Demo interactiva: https://ajgarciarias10.github.io/gmailkeeper-personal/\n• Repositorio: https://github.com/ajgarciarias10/gmailkeeper-personal"
    },
    smartfruit: {
      en: "SmartFruitClassifier is Toni's Computer Vision & Transfer Learning project:\n• Classifies fruit varieties with >95% accuracy using EfficientNet-B0.\n• Optimized via bio-inspired metaheuristics (Artificial Bee Colony & PSO).\n• Live Hugging Face Space: https://huggingface.co/spaces/toniariasss/SmartFruitClassiffier\n• GitHub: https://github.com/ajgarciarias10/SmartFruitClassifier",
      es: "SmartFruitClassifier es el proyecto de Visión Computacional y Transfer Learning de Toni:\n• Clasifica variedades de fruta con más del 95% de precisión usando EfficientNet-B0.\n• Optimizado mediante metaheurísticas bioinspiradas (Colonia Artificial de Abejas y Enjambre de Partículas).\n• Demo en vivo en Hugging Face: https://huggingface.co/spaces/toniariasss/SmartFruitClassiffier\n• GitHub: https://github.com/ajgarciarias10/SmartFruitClassifier"
    },
    ipo: {
      en: "IPO Study Lab is an active-recall testing lab for Human-Computer Interaction:\n• Interactive question banks covering Topics 1, 2, and 3 with reasoned explanations.\n• Includes an in-depth real-world Usability Audit report analyzing F1-BUGAMBRA with before/after screenshots.\n• Live right now at: /ipo/ (click Study IPO in the top bar!)",
      es: "IPO Study Lab es un laboratorio de recuperación activa para Interacción Persona-Ordenador:\n• Tests interactivos de los Temas 1, 2 y 3 con corrección razonada y niveles de certeza.\n• Incluye un informe completo de usabilidad evaluando F1-BUGAMBRA con capturas antes/después.\n• Disponible ahora mismo en: /ipo/ (¡accede desde el menú superior!)"
    },
    divinando: {
      en: "DIVINANDO is Toni's FP Final Degree Project (DAM):\n• Coded entirely from scratch as a vocational capstone project, demonstrating strong core logic and problem-solving.\n• Built with Java, C++, and Relational Databases.\n• Video demo: https://www.youtube.com/watch?v=gyAzFh-lDJg\n• GitHub repository: https://github.com/ajgarciarias10/DIVINANDO",
      es: "DIVINANDO es el Proyecto Final de Ciclo Formativo (DAM) de Toni:\n• Programado íntegramente desde cero como proyecto final, demostrando sólida lógica de programación y resolución de problemas.\n• Construido con Java, C++ y Bases de Datos Relacionales.\n• Vídeo demostrativo: https://www.youtube.com/watch?v=gyAzFh-lDJg\n• Repositorio en GitHub: https://github.com/ajgarciarias10/DIVINANDO"
    },
    hire: {
      en: "Yes! Toni is based in Spain (CET / GMT+1) and is actively open to AI Engineering, Full-Stack, and Software Engineering opportunities (Remote / Hybrid / On-site).\n• Email: ajgarciarias@gmail.com\n• GitHub: https://github.com/ajgarciarias10\n• Hugging Face: https://huggingface.co/toniariasss\n• CV available for direct download in the header and contact section!",
      es: "¡Sí! Toni reside en España (CET / GMT+1) y está abierto activamente a oportunidades en Ingeniería de IA, Full-Stack y Desarrollo de Software (Remoto / Híbrido / Presencial).\n• Correo: ajgarciarias@gmail.com\n• GitHub: https://github.com/ajgarciarias10\n• Hugging Face: https://huggingface.co/toniariasss\n• ¡CV disponible para descarga directa en la cabecera y en la sección de contacto!"
    },
    default: {
      en: "I am Toni's terminal companion. You can ask me about his production projects (F1-BUGAMBRA, GmailKeep Personal, SmartFruitClassifier, DIVINANDO), in-progress work (CleverTracker, IPO Study Lab), his engineering stack, or how to contact him.",
      es: "Soy el asistente de terminal de Toni. Puedes preguntarme sobre sus proyectos en producción (F1-BUGAMBRA, GmailKeep Personal, SmartFruitClassifier, DIVINANDO), desarrollos en curso (CleverTracker, IPO Study Lab), su stack tecnológico o cómo contactar con él."
    }
  };

  // ==========================================================================
  // App State
  // ==========================================================================
  let currentLang = localStorage.getItem('site_lang') || 'en';
  let currentTheme = localStorage.getItem('site_theme') || 'dark';

  // ==========================================================================
  // DOM Elements
  // ==========================================================================
  const elHtml = document.documentElement;
  const elThemeBtn = document.getElementById('theme-toggle');
  const elLangBtns = document.querySelectorAll('.lang-btn');
  const elMobileBtn = document.getElementById('mobile-menu-btn');
  const elMobileDrawer = document.getElementById('mobile-drawer');
  const elMobileBackdrop = document.getElementById('mobile-drawer-backdrop');
  const elMobileClose = document.getElementById('mobile-drawer-close');
  const elNavLinks = document.querySelectorAll('.nav-link');

  // Terminal elements
  const elTerminalBody = document.getElementById('terminal-messages');
  const elTerminalForm = document.getElementById('terminal-form');
  const elTerminalInput = document.getElementById('terminal-input');
  const elTerminalChips = document.getElementById('terminal-chips');

  // Project filter elements
  const elFilterBtns = document.querySelectorAll('.filter-btn');
  const elProjectCards = document.querySelectorAll('.project-card');

  // Modal elements
  const elLightbox = document.getElementById('lightbox-modal');
  const elLightboxImg = document.getElementById('lightbox-img');
  const elLightboxCaption = document.getElementById('lightbox-caption');
  const elArticleModal = document.getElementById('article-modal');
  const elArticleTitle = document.getElementById('article-title');
  const elArticleMeta = document.getElementById('article-meta');
  const elArticleTags = document.getElementById('article-tags');
  const elArticleContent = document.getElementById('article-content');

  // ==========================================================================
  // Initialization
  // ==========================================================================
  function init() {
    setupTorchlight();
    setupTheme();
    setupI18n();
    setupTerminal();
    setupFilters();
    setupModals();
    setupContactForm();
    setupMobileDrawer();
    setupBlogSearch();
  }

  // ==========================================================================
  // Blog Search & Tag Filters
  // ==========================================================================
  function setupBlogSearch() {
    const searchInput = document.getElementById('blog-search-input');
    const tagBtns = document.querySelectorAll('.blog-tag-btn');
    let activeTag = 'all';

    function filterBlogCards() {
      const q = searchInput ? searchInput.value.toLowerCase().trim() : '';
      document.querySelectorAll('.blog-featured-card, .blog-mini-card').forEach(card => {
        const text = card.textContent.toLowerCase();
        const tagsAttr = (card.getAttribute('data-tags') || '').toLowerCase();
        const matchesQuery = !q || text.includes(q);
        const matchesTag = activeTag === 'all' || tagsAttr.includes(activeTag.toLowerCase()) || text.includes(activeTag.toLowerCase());
        card.style.display = (matchesQuery && matchesTag) ? '' : 'none';
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', filterBlogCards);
      searchInput.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
          this.value = '';
          filterBlogCards();
        }
      });
    }

    tagBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        tagBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        activeTag = this.getAttribute('data-blog-tag') || 'all';
        filterBlogCards();
      });
    });
  }

  // ==========================================================================
  // 1. Torchlight Spotlight (Following pointer)
  // ==========================================================================
  function setupTorchlight() {
    let ticking = false;
    window.addEventListener('pointermove', function (e) {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          elHtml.style.setProperty('--mx', e.clientX + 'px');
          elHtml.style.setProperty('--my', e.clientY + 'px');
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  // ==========================================================================
  // 2. Theme Toggle (Dark / Light)
  // ==========================================================================
  function setupTheme() {
    elHtml.setAttribute('data-theme', currentTheme);
    updateThemeIcon();

    if (elThemeBtn) {
      elThemeBtn.addEventListener('click', function () {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        elHtml.setAttribute('data-theme', currentTheme);
        localStorage.setItem('site_theme', currentTheme);
        updateThemeIcon();
      });
    }
  }

  function updateThemeIcon() {
    if (!elThemeBtn) return;
    if (currentTheme === 'dark') {
      elThemeBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <circle cx="12" cy="12" r="5"></circle>
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
        </svg>`;
      elThemeBtn.setAttribute('aria-label', 'Switch to light theme');
    } else {
      elThemeBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>`;
      elThemeBtn.setAttribute('aria-label', 'Switch to dark theme');
    }
  }

  // ==========================================================================
  // 3. Internationalization (i18n)
  // ==========================================================================
  function setupI18n() {
    elLangBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const lang = this.getAttribute('data-lang');
        if (lang && lang !== currentLang) {
          currentLang = lang;
          localStorage.setItem('site_lang', currentLang);
          applyTranslations();
          updateLangBtns();
          renderTerminalChips();
        }
      });
    });

    applyTranslations();
    updateLangBtns();
  }

  function updateLangBtns() {
    elLangBtns.forEach(btn => {
      const active = btn.getAttribute('data-lang') === currentLang;
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
  }

  function applyTranslations() {
    const dict = I18N[currentLang] || I18N.en;

    // Translate any element with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = getNestedValue(dict, key);
      if (val !== undefined) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          el.placeholder = val;
        } else {
          el.innerHTML = val;
        }
      }
    });

    // Translate placeholder attributes specifically
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const key = el.getAttribute('data-i18n-ph');
      const val = getNestedValue(dict, key);
      if (val !== undefined) el.placeholder = val;
    });

    // Translate blog article cards dynamically (both index.html and blog/index.html)
    const isEs = currentLang === 'es';
    document.querySelectorAll('[data-article-id]').forEach(card => {
      const id = card.getAttribute('data-article-id');
      const article = ARTICLES.find(a => a.id === id);
      if (!article) return;

      const titleEl = card.querySelector('[data-article-title]');
      const excerptEl = card.querySelector('[data-article-excerpt]');
      const dateEl = card.querySelector('[data-article-date]');
      const readTimeEl = card.querySelector('[data-article-readtime]');

      if (titleEl) titleEl.textContent = isEs ? (article.titleEs || article.title) : article.title;
      if (excerptEl) excerptEl.textContent = isEs ? (article.excerptEs || article.excerpt) : article.excerpt;
      if (dateEl) dateEl.textContent = isEs ? (article.dateEs || article.date) : article.date;
      if (readTimeEl) readTimeEl.textContent = isEs ? (article.readTimeEs || article.readTime) : article.readTime;
    });

    // Translate document title
    if (window.location.pathname.includes('/blog')) {
      document.title = isEs
        ? 'Blog · Notas de Campo — Antonio José García Arias'
        : 'Blog · Field Notes — Antonio José García Arias';
    } else {
      document.title = isEs
        ? 'Antonio José García Arias — Ingeniero de IA y Desarrollador Full-Stack'
        : 'Antonio José García Arias — AI Engineer & Full-Stack Developer';
    }
  }

  function getNestedValue(obj, path) {
    return path.split('.').reduce((prev, curr) => (prev && prev[curr] !== undefined) ? prev[curr] : undefined, obj);
  }

  // ==========================================================================
  // 4. Interactive Terminal Widget (`~/ask-me.sh`)
  // ==========================================================================
  function setupTerminal() {
    renderTerminalChips();

    if (elTerminalForm) {
      elTerminalForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const text = elTerminalInput.value.trim();
        if (!text) return;

        appendUserMessage(text);
        elTerminalInput.value = '';
        respondToQuery(text);
      });
    }
  }

  function renderTerminalChips() {
    if (!elTerminalChips) return;
    const dict = I18N[currentLang] || I18N.en;
    const chips = dict.terminal.chips || [];

    elTerminalChips.innerHTML = chips.map(chipText => `
      <button type="button" class="terminal-chip" data-chip="${chipText}">${chipText}</button>
    `).join('');

    elTerminalChips.querySelectorAll('.terminal-chip').forEach(btn => {
      btn.addEventListener('click', function () {
        const text = this.getAttribute('data-chip');
        appendUserMessage(text);
        respondToQuery(text);
      });
    });
  }

  function appendUserMessage(text) {
    if (!elTerminalBody) return;
    const msgEl = document.createElement('div');
    msgEl.className = 'terminal-msg user';
    msgEl.innerHTML = `
      <div class="terminal-msg-tag">// you</div>
      <div class="terminal-msg-text">${escapeHtml(text)}</div>
    `;
    elTerminalBody.appendChild(msgEl);
    elTerminalBody.scrollTop = elTerminalBody.scrollHeight;
  }

  function appendBotMessage(text) {
    if (!elTerminalBody) return;
    const msgEl = document.createElement('div');
    msgEl.className = 'terminal-msg bot';
    
    // Convert links to clickable html
    const formattedText = text.replace(
      /(https?:\/\/[^\s]+)/g,
      '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
    );

    msgEl.innerHTML = `
      <div class="terminal-msg-tag">// system</div>
      <div class="terminal-msg-text">${formattedText}</div>
    `;
    elTerminalBody.appendChild(msgEl);
    elTerminalBody.scrollTop = elTerminalBody.scrollHeight;
  }

  function respondToQuery(query) {
    const q = query.toLowerCase();
    let key = 'default';

    if (q.includes('stack') || q.includes('technolog') || q.includes('tool') || q.includes('lenguaj') || q.includes('herramienta')) {
      key = 'stack';
    } else if (q.includes('f1') || q.includes('bugambra') || q.includes('auction') || q.includes('subasta') || q.includes('formula')) {
      key = 'f1';
    } else if (q.includes('clevertracker') || q.includes('tracker') || q.includes('tfg') || q.includes('nutrition') || q.includes('nutric') || q.includes('calor')) {
      key = 'clevertracker';
    } else if (q.includes('gmail') || q.includes('keepr') || q.includes('keeper') || q.includes('inbox') || q.includes('correo')) {
      key = 'gmailkeeper';
    } else if (q.includes('fruit') || q.includes('fruta') || q.includes('smartfruit') || q.includes('huggingface') || q.includes('efficientnet')) {
      key = 'smartfruit';
    } else if (q.includes('ipo') || q.includes('hci') || q.includes('study') || q.includes('lab') || q.includes('usab') || q.includes('test')) {
      key = 'ipo';
    } else if (q.includes('divinando') || q.includes('dam') || q.includes('fp') || q.includes('capstone') || q.includes('wordle')) {
      key = 'divinando';
    } else if (q.includes('hire') || q.includes('trabaj') || q.includes('contrat') || q.includes('contact') || q.includes('disponib') || q.includes('available')) {
      key = 'hire';
    }

    const response = (TERMINAL_KNOWLEDGE[key] && TERMINAL_KNOWLEDGE[key][currentLang]) 
      || TERMINAL_KNOWLEDGE[key].en;

    // Simulate typing delay
    setTimeout(() => {
      appendBotMessage(response);
    }, 280);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // ==========================================================================
  // 5. Project Filter Tabs
  // ==========================================================================
  function setupFilters() {
    elFilterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        elFilterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        elProjectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ==========================================================================
  // 6. Modals (Lightbox & Blog Reader)
  // ==========================================================================
  function setupModals() {
    // Lightbox triggers
    document.querySelectorAll('[data-lightbox-src]').forEach(trigger => {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        const src = this.getAttribute('data-lightbox-src');
        const caption = this.getAttribute('data-lightbox-caption') || '';
        openLightbox(src, caption);
      });
    });

    // Blog article reader triggers
    document.querySelectorAll('[data-article-id]').forEach(trigger => {
      trigger.addEventListener('click', function (e) {
        e.preventDefault();
        const id = this.getAttribute('data-article-id');
        openArticle(id);
      });
    });

    // Close buttons
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        closeModals();
      });
    });

    // Click outside dialog to close
    [elLightbox, elArticleModal].forEach(modal => {
      if (modal) {
        modal.addEventListener('click', function (e) {
          if (e.target === this) {
            closeModals();
          }
        });
      }
    });

    // Keyboard ESC to close
    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeModals();
      }
    });
  }

  function openLightbox(src, caption) {
    if (!elLightbox || !elLightboxImg) return;
    elLightboxImg.src = src;
    elLightboxCaption.textContent = caption;
    elLightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function openArticle(articleId) {
    const article = ARTICLES.find(a => a.id === articleId);
    if (!article || !elArticleModal) return;

    const isEs = currentLang === 'es';
    elArticleTitle.textContent = isEs ? (article.titleEs || article.title) : article.title;
    elArticleMeta.innerHTML = `
      <span>${article.date}</span>
      <span>·</span>
      <span>${isEs ? (article.readTimeEs || article.readTime) : article.readTime}</span>
    `;

    elArticleTags.innerHTML = article.tags.map(t => `<span class="project-chip">#${t}</span>`).join('');
    elArticleContent.innerHTML = isEs ? (article.contentEs || article.content) : article.content;

    elArticleModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModals() {
    if (elLightbox) elLightbox.classList.remove('open');
    if (elArticleModal) elArticleModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ==========================================================================
  // 7. Mobile Drawer Navigation
  // ==========================================================================
  function setupMobileDrawer() {
    if (elMobileBtn) {
      elMobileBtn.addEventListener('click', function () {
        elMobileDrawer.classList.add('open');
        elMobileBackdrop.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    }

    function closeDrawer() {
      if (elMobileDrawer) elMobileDrawer.classList.remove('open');
      if (elMobileBackdrop) elMobileBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }

    if (elMobileClose) elMobileClose.addEventListener('click', closeDrawer);
    if (elMobileBackdrop) elMobileBackdrop.addEventListener('click', closeDrawer);

    elNavLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // ==========================================================================
  // 8. Contact Form Mailto Handler
  // ==========================================================================
  function setupContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const message = document.getElementById('form-message').value.trim();

      const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

      window.location.href = `mailto:ajgarciarias@gmail.com?subject=${subject}&body=${body}`;
    });
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for testing
  window.PortfolioApp = {
    openLightbox,
    openArticle,
    setLanguage: function (lang) {
      currentLang = lang;
      applyTranslations();
      updateLangBtns();
      renderTerminalChips();
    }
  };

})();
