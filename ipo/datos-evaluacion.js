'use strict';

// ============================================================================
// BANCO DOCENTE DE EVALUACIÓN MULTIMODAL Y ESQUEMAS CONCEPTUALES (IPO2627.pdf)
// Universidad de Jaén · Grado en Ingeniería Informática
// Profesores: Drª. Salud Mª Jiménez Zafra y Dr. Manuel García Vega
// AVISO: Uso estrictamente académico y de estudio personal. Prohibido uso comercial.
// ============================================================================

// ----------------------------------------------------------------------------
// 1. BASE DE CONOCIMIENTO DE TEMAS PARA EVALUADOR NOTEBOOKLM
// ----------------------------------------------------------------------------
const ESQUEMAS_TEMARIO = {
  1: {
    titulo: 'Tema 1 · Introducción a la Interacción Persona-Ordenador',
    lecciones: [1],
    paginas: '16–48',
    conceptosClave: [
      'Definición de IPO (diseño, implementación, evaluación y fenómenos)',
      'Objetivos: Usabilidad, Accesibilidad y Experiencia de Usuario',
      'Factores de usabilidad ISO 9241-11 (Eficacia, Eficiencia, Satisfacción)',
      'Disciplinas convergentes (Psicología, Ergonomía, IA, Sociología, Diseño)',
      'Evolución histórica y paradigmas de interacción'
    ],
    trampasFrecuentes: [
      'Confundir Usabilidad con Accesibilidad (la accesibilidad busca acceso universal independientemente de capacidades técnicas o físicas; la usabilidad mide grado de eficacia, eficiencia y satisfacción en un contexto específico).',
      'Creer que la IPO solo se ocupa de interfaces gráficas (GUI) olvidando interfaces de voz, gestuales, tangibles y el estudio de fenómenos humanos.',
      'Reducir la IPO a la programación o estética visual, ignorando la evaluación empírica con usuarios.'
    ],
    esquemaEjemploBueno: `# TEMA 1: INTRODUCCIÓN A LA IPO
1. ¿QUÉ ES LA IPO?
   - Disciplina dedicada al diseño, implementación y evaluación de sistemas interactivos para uso humano.
   - Estudio de los fenómenos que los rodean (impacto social, cognitivo y laboral).
2. PILARES FUNDAMENTALES:
   - Usabilidad (ISO 9241-11): Eficacia (alcanzar metas), Eficiencia (recursos empleados) y Satisfacción (confort del usuario).
   - Accesibilidad: Diseño para todos (Web Accessibility Initiative), garantizando acceso a personas con discapacidades sensoriales, motoras o cognitivas.
   - Experiencia de Usuario (UX): Percepción global, emociones y valor percibido.
3. DISCIPLINAS CONVERGENTES:
   - Psicología cognitiva (modelos mentales y límites perceptivos).
   - Ergonomía (antropometría física y confort).
   - Informática / Ingeniería del software (arquitectura y desarrollo).
   - Diseño gráfico y sociología.
4. IMPORTANCIA EN INGENIERÍA:
   - Reducción del coste de soporte, minimización de errores del usuario y aumento de productividad.`,
    esquemaEjemploIncompleto: `# TEMA 1 IPO (Borrador rápido)
- La IPO es hacer que los programas sean bonitos y fáciles de usar.
- Si una interfaz tiene botones grandes y colores modernos, ya es accesible y usable.
- Lo importante es programarla bien en React o Flutter para que no tenga bugs.
- Los tests con usuarios se hacen al final si sobra tiempo en el proyecto.`
  },

  2: {
    titulo: 'Tema 2 · El factor humano en la interacción',
    lecciones: [2, 3, 4],
    paginas: '49–115',
    conceptosClave: [
      'Modelo del Procesador Humano (MHP de Card, Moran y Newell: perceptivo, cognitivo, motor)',
      'Canales sensoriales: Visión (conos, bastones, agudeza visual), Oído, Tacto',
      'Memoria sensorial (icónica ~0.5s, ecoica ~2s)',
      'Memoria de Trabajo / MCP (límite de Miller 7±2 chunks, bucle fonológico, agenda visoespacial)',
      'Memoria a Largo Plazo (declarativa: episódica y semántica; procedimental)',
      'Curva del olvido de Ebbinghaus y repaso espaciado',
      'Ley de Fitts (MT = a + b * log2(2D/W)) y bordes infinitos',
      'Ley de Hick-Hyman (T = b * log2(n+1)) y menús jerárquicos',
      'Modelos mentales de Norman (diseñador, imagen del sistema, usuario)'
    ],
    trampasFrecuentes: [
      'Confundir memoria de trabajo (MCP) con memoria a largo plazo (la MCP satura con 4-7 chunks y retiene ~20 segundos sin ensayo activo).',
      'Olvidar que en la Ley de Fitts los bordes y esquinas de pantalla tienen anchura virtual infinita (W = ∞), lo que reduce el tiempo de apuntamiento a casi cero.',
      'Creer que el modelo mental del usuario es idéntico al modelo del diseñador (el usuario solo conoce el sistema a través de la "imagen del sistema").',
      'Confundir la Ley de Hick (tiempo de decisión ante n opciones) con la Ley de Fitts (tiempo de movimiento motor hacia un blanco).'
    ],
    esquemaEjemploBueno: `# TEMA 2: EL FACTOR HUMANO EN IPO
1. MODELO DEL PROCESADOR HUMANO (MHP - Card, Moran, Newell):
   - Subsistema Perceptivo (ojos/oídos -> memoria sensorial: icónica 200ms, ecoica 2-3s).
   - Subsistema Cognitivo (procesador cognitivo tau_c ~ 70ms, MCP).
   - Subsistema Motor (tiempo de ciclo tau_m ~ 70ms, ejecución física).
2. SISTEMA DE MEMORIA HUMANA:
   - Memoria Sensorial: Alta capacidad, decaimiento ultrarrápido (< 1s).
   - Memoria a Corto Plazo / Trabajo: Capacidad limitada (7 +- 2 chunks según Miller, o 4 chunks complejos). Retención sin repaso ~18-30s.
   - Memoria a Largo Plazo (MLP): Capacidad ilimitada. Tipos: Declarativa (Semántica y Episódica) y Procedimental (habilidades motoras).
   - Curva del olvido (Ebbinghaus): Decaimiento exponencial; se frena con repetición espaciada y recuperación activa.
3. LEYES PSICOMOTRICES Y COGNITIVAS:
   - Ley de Fitts: MT = a + b * log2(2D/W). El tiempo depende de distancia (D) y anchura del objetivo (W). Consecuencia: esquinas y bordes tienen anchura infinita (W=infinito), siendo zonas de acceso óptimo.
   - Ley de Hick-Hyman: T = b * log2(n + 1). Tiempo de decisión logarítmico ante 'n' alternativas equiprobables. Consecuencia: menús jerárquicos o categorizados aceleran la decisión.
4. MODELOS MENTALES (Donald Norman):
   - Modelo del Diseñador: Cómo funciona internamente el sistema.
   - Imagen del Sistema: Lo que la interfaz exterioriza (botones, mensajes, documentación).
   - Modelo del Usuario: Lo que el usuario cree que hace el sistema. Si la imagen del sistema no transmite bien el modelo, se producen errores y frustración.`,
    esquemaEjemploIncompleto: `# TEMA 2 - FACTOR HUMANO
- Las personas tienen cinco sentidos y el más importante es la vista.
- La memoria humana es como un disco duro con memoria RAM.
- La ley de Fitts dice que si el botón es bonito, el usuario hace click más rápido.
- Cuando hay muchos menús, el usuario tarda más tiempo porque se cansa.`
  },

  3: {
    titulo: 'Tema 3 · Metáforas de interacción',
    lecciones: [5],
    paginas: '116–166',
    conceptosClave: [
      'Concepto de metáfora en IPO: transferir conocimiento previo del mundo real al entorno digital',
      'Tipos de metáforas: Verbales, Visuales (iconos), Globales / De Alto Nivel',
      'La metáfora del escritorio (Desktop Metaphor: Xerox Star, Apple Lisa, Macintosh)',
      'Metodología de diseño de metáforas en 4 etapas (Propósito, Candidatas, Evaluación, Mapeo)',
      'Riesgos y limitaciones de las metáforas: analogías forzadas, falsas expectativas, restricciones innecesarias'
    ],
    trampasFrecuentes: [
      'Creer que una metáfora debe replicar el objeto real al 100% (el software tiene propiedades "mágicas" como deshacer, duplicar o buscar que el mundo físico no posee).',
      'Confundir una metáfora visual aislada (un icono de impresora) con una metáfora global (el escritorio de trabajo con ventanas, archivos y papelera).'
    ],
    esquemaEjemploBueno: `# TEMA 3: METÁFORAS DE INTERACCIÓN
1. DEFINICIÓN:
   - Puente cognitivo que mapea conceptos familiares del mundo real en el dominio virtual del software para reducir la carga de aprendizaje.
2. TIPOS DE METÁFORAS:
   - Verbales: Comandos lingüísticos basados en acciones reales (ej. "cortar", "pegar", "navegar").
   - Visuales: Representaciones gráficas directas (iconos de disquete para guardar, lupa para buscar).
   - Globales / Compuestas: Entornos integrados completos (ej. Metáfora del Escritorio de Xerox Star con carpetas, papelera y documentos).
3. PROCESO DE DISEÑO METAFÓRICO:
   - Paso 1: Identificar el propósito del sistema y necesidades del usuario.
   - Paso 2: Generar metáforas candidatas del dominio real.
   - Paso 3: Evaluar ventajas, limitaciones y coherencia cultural.
   - Paso 4: Mapear representaciones digitales detalladas.
4. PELIGROS Y DESVENTAJAS:
   - Restricciones artificiales (p.ej. obligar a hojear un libro digital como si fuera papel en vez de buscar).
   - Incompatibilidad cultural (un buzón postal de EEUU no se reconoce en otros países).
   - Falacia de la analogía: asumir que el software fallará o se desgastará como el objeto físico.`,
    esquemaEjemploIncompleto: `# TEMA 3 METÁFORAS
- Las metáforas son dibujitos como el carrito de compra en Amazon.
- Siempre hay que copiar la vida real exactamente para que nadie se pierda.
- El escritorio de Windows es la única metáfora que existe.`
  },

  4: {
    titulo: 'Tema 4 · Ingeniería de la interfaz y diseño centrado en el usuario',
    lecciones: [6, 7],
    paginas: '167–222',
    conceptosClave: [
      'Ciclo de vida de la interfaz (Hartson y Hix en estrella, modelo en espiral)',
      'Diseño Centrado en el Usuario (DCU / ISO 9241-210): Contexto, Requisitos, Diseño, Evaluación',
      'Análisis de Tareas: Análisis Jerárquico de Tareas (HTA)',
      'Elementos de HTA: Objetivos, Subtareas y Planes (Secuencia, Selección, Iteración)',
      'Técnicas de elicitación: Observación, Entrevistas, Cuestionarios, Incidentes críticos'
    ],
    trampasFrecuentes: [
      'En HTA, olvidar redactar el Plan 0 (el plan indica el orden y condiciones en que se ejecutan las subtareas: p. ej. 1 - 2 - si falla 3). Sin plan, el árbol HTA está incompleto para examen.',
      'Confundir un objetivo (lo que el usuario quiere lograr, ej. "obtener dinero") con una acción o tarea concreta (ej. "pulsar botón 20€").'
    ],
    esquemaEjemploBueno: `# TEMA 4: INGENIERÍA DE LA INTERFAZ Y DCU
1. DISEÑO CENTRADO EN EL USUARIO (ISO 9241-210):
   - Proceso iterativo en 4 fases:
     a) Entender y especificar el contexto de uso (perfiles de usuarios, tareas, entornos).
     b) Especificar requisitos de usuario y del sistema.
     c) Producir soluciones de diseño (prototipado de baja y alta fidelidad).
     d) Evaluar el diseño frente a los requisitos con usuarios reales.
2. MODELOS DE CICLO DE VIDA:
   - Modelo en Estrella (Hartson y Hix): Evaluación continua en el centro conectada a cada fase.
3. ANÁLISIS JERÁRQUICO DE TAREAS (HTA):
   - Descomposición funcional:
     * Objetivo 0 (nivel superior).
     * Subobjetivos y operaciones básicas (acciones físicas y cognitivas).
   - Planes: Reglas lógicas que gobiernan la ejecución de las subtareas:
     * Secuencia fija (1 -> 2 -> 3).
     * Selección o condición (si X entonces 1 sino 2).
     * Iteración o bucle (repetir 1 hasta condición de parada).`,
    esquemaEjemploIncompleto: `# TEMA 4: DCU
- Se programa la interfaz y luego se le enseña a un usuario para ver si le gusta.
- Las tareas son los botones que el programador pone en la pantalla.`
  },

  5: {
    titulo: 'Tema 5 · Internacionalización y localización',
    lecciones: [8, 9],
    paginas: '223–284',
    conceptosClave: [
      'Diferencia entre Internacionalización (i18n) y Localización (l10n)',
      'Catálogos de recursos externos (Gettext, .po / .mo, JSON de internacionalización)',
      'Manejo de codificación de caracteres: Unicode, UTF-8, compatibilidad multiidioma',
      'Formatos culturales: Fechas (DD/MM/AAAA vs MM/DD/YYYY), horas (12h vs 24h), separador de miles y decimales, monedas',
      'Direccionalidad del texto: LTR (Left-to-Right) vs RTL (Right-to-Left: árabe, hebreo)',
      'Práctica 4 de laboratorio UJA (Obligatoria para superar la asignatura)'
    ],
    trampasFrecuentes: [
      'Confundir i18n con l10n: la internacionalización es el diseño arquitectónico del software para permitir adaptación sin recompilar código; la localización es la adaptación concreta a un mercado/idioma (traducción, normas legales, imágenes culturales).',
      'Hardcodear cadenas de texto en el código fuente en lugar de usar identificadores de recursos o claves de internacionalización.',
      'Olvidar la expansión de texto: el alemán o francés suelen requerir hasta un 30-40% más de espacio visual que el inglés para la misma frase.'
    ],
    esquemaEjemploBueno: `# TEMA 5: INTERNACIONALIZACIÓN (i18n) Y LOCALIZACIÓN (l10n)
1. CONCEPTOS BASE:
   - Internacionalización (i18n): Proceso de diseño y desarrollo del software para que soporte múltiples idiomas y culturas SIN MODIFICAR EL CÓDIGO FUENTE.
   - Localización (l10n): Adaptación de un producto internacionalizado a un mercado, región o cultura específica (traducciones, divisas, normativa).
2. ELEMENTOS TÉCNICOS A INTERNACIONALIZAR:
   - Externalización de cadenas: Catálogos de mensajes (Gettext, .po/.mo, bundle properties).
   - Codificación universal: UTF-8 / Unicode en base de datos, backend y cabeceras HTTP.
   - Formatos regionales (Locale):
     * Fechas y horas (ISO 8601 YYYY-MM-DD vs local).
     * Números (separadores de decimales coma vs punto).
     * Monedas (símbolo a la izquierda o derecha, conversión contable).
   - Interfaces bidireccionales (BiDi): Soporte para idiomas RTL (árabe, hebreo), invirtiendo espejadamente el flujo de navegación.
   - Expansión de texto y maquetación flexible (flexbox/grid dinámico).
3. HITO DOCENTE UJA:
   - La Práctica 4 de IPO aborda la internacionalización y es DEFENSA OBLIGATORIA para aprobar la asignatura.`,
    esquemaEjemploIncompleto: `# TEMA 5
- i18n es traducir con Google Translate la página web al inglés.
- Si cambias los textos ya está localizada la web.`
  },

  6: {
    titulo: 'Tema 6 · El diseño gráfico en interfaces',
    lecciones: [10, 11, 12],
    paginas: '285–349',
    conceptosClave: [
      'Leyes de la percepción visual de la Gestalt (Proximidad, Semejanza, Continuidad, Cierre, Región Común, Conectividad)',
      'Teoría del color: Rueda de color, contraste cromático, luminosidad, connotaciones culturales',
      'Accesibilidad del color: Daltonismo (Protanopía, Deuteranopía, Tritanopía). No transmitir información únicamente mediante el color',
      'Tipografía: Familias (Serif vs Sans-Serif), jerarquía visual, espaciado e interlineado legibles',
      'Composición y layout: Retículas (grid system), alineación, espacios en blanco (white space)'
    ],
    trampasFrecuentes: [
      'Violar la Ley de Proximidad de la Gestalt (colocar la etiqueta más cerca del campo superior que del campo al que pertenece).',
      'Usar rojo/verde como único discriminador de estado (los usuarios con deuteranopía o protanopía no distinguirán error de éxito).',
      'Usar tipografías decorativas o longitud de línea excesiva (> 80 caracteres) que aumentan la fatiga visual.'
    ],
    esquemaEjemploBueno: `# TEMA 6: DISEÑO GRÁFICO EN INTERFACES
1. LEYES DE LA GESTALT (PERCEPCIÓN VISUAL):
   - Proximidad: Objetos cercanos en el espacio se perciben como un grupo unitario.
   - Semejanza: Elementos con igual forma, color o tamaño se perciben con función idéntica.
   - Cierre: El cerebro completa formas incompletas para cerrar contornos.
   - Continuidad: El ojo sigue líneas o patrones continuos.
   - Región Común: Elementos encerrados en un mismo marco o tarjeta se consideran un conjunto.
2. TEORÍA DEL COLOR EN UI:
   - Atributos: Tono (Hue), Saturación (Saturation), Brillo/Valor (Brightness/Value).
   - Regla 60-30-10 para paleta equilibrada (base, soporte, acento).
   - Inclusión para daltonismo: Siempre acompañar el color con texto o iconos.
3. TIPOGRAFÍA Y JERARQUÍA:
   - Sans-serif (Roboto, Inter, Arial) preferible en pantalla por nitidez de renderizado de píxeles.
   - Jerarquía clara (H1 > H2 > H3 > Body).
   - Longitud de línea ideal: 50 a 75 caracteres por renglón con interlineado 1.4 a 1.6.`,
    esquemaEjemploIncompleto: `# TEMA 6
- El diseño gráfico consiste en poner imágenes llamativas y colores bonitos.
- Las fuentes mientras sean modernas valen todas.`
  },

  7: {
    titulo: 'Tema 7 · Estilos y paradigmas de interacción',
    lecciones: [13, 14],
    paginas: '350–406',
    conceptosClave: [
      'Estilos de interacción clásicos: CLI (línea de comandos), Menús desplegables, Formularios, Lenguaje natural',
      'Manipulación Directa (Ben Shneiderman): Representación continua de objetos de interés, acciones rápidas reversibles e incrementales con impacto inmediato visible',
      'Interfaces móviles y gestuales: Toques, pellizcos, acelerómetros, microinteracciones',
      'Interfaces de voz (VUI) y conversacionales (chatbots, LLMs)',
      'Paradigmas emergentes: Computación ubicua (Mark Weiser), Realidad Virtual (RV), Realidad Aumentada (RA)'
    ],
    trampasFrecuentes: [
      'Olvidar los 3 principios de la Manipulación Directa de Shneiderman para examen (Representación continua de objetos, acciones físicas en vez de sintaxis compleja, y operaciones reversibles con impacto visual instantáneo).',
      'Creer que la CLI es un estilo obsoleto sin utilidad (la CLI tiene máxima densidad informativa, automatización mediante scripts y alta eficiencia para usuarios expertos).'
    ],
    esquemaEjemploBueno: `# TEMA 7: ESTILOS Y PARADIGMAS DE INTERACCIÓN
1. ESTILOS DE INTERACCIÓN:
   - Línea de órdenes (CLI): Alta potencia, baja demanda de recursos, pero alta curva de aprendizaje (memoria de recuerdo vs reconocimiento).
   - Menús y Formularios: Reducen carga cognitiva, interacción guiada estructurada.
   - Manipulación Directa (Shneiderman):
     * Representación visual continua de objetos y acciones.
     * Sustitución de comandos complejos por acciones físicas (arrastrar, pulsar).
     * Acciones reversibles, incrementales e impacto visible instantáneo.
   - Interfaz de Voz (VUI) y Lenguaje Natural: Manos libres, pero sufre de baja visibilidad de opciones del sistema.
2. PARADIGMAS HISTÓRICOS Y ACTUALES:
   - Mainframe / Terminal -> Ordenador personal WIMP -> Web -> Móvil / Táctil -> Computación Ubicua (Weiser: tecnología invisible integrada en el entorno) -> RA/RV.`
  },

  8: {
    titulo: 'Tema 8 · Accesibilidad web y diseño para todos',
    lecciones: [15, 16],
    paginas: '407–456',
    conceptosClave: [
      'Iniciativa W3C / WAI (Web Accessibility Initiative)',
      'Pautas WCAG (Web Content Accessibility Guidelines) versiones 2.1 / 2.2',
      'Los 4 Principios Fundamentales (POUR): Perceptible, Operable, Comprensible (Understandable), Robusto',
      'Niveles de conformidad: Nivel A (básico), Nivel AA (estándar legal europeo y español EN 301 549), Nivel AAA (máxima exigencia)',
      'Ratios de contraste cromático: 4.5:1 para texto normal y 3:1 para texto grande en AA; 7:1 y 4.5:1 en AAA',
      'Tecnologías de asistencia (lectores de pantalla NVDA/JAWS, navegación por teclado, pulsadores)'
    ],
    trampasFrecuentes: [
      'Confundir los requisitos de contraste AA y AAA en el examen: En AA el texto normal (<18pt o <14pt negrita) exige ratio mínimo de 4.5:1, NO 3:1.',
      'Asumir que la accesibilidad solo afecta a personas con ceguera total (afecta a discapacidades motrices, auditivas, cognitivas, edad avanzada y discapacidades situacionales/temporales).',
      'Olvidar el atributo `alt` en imágenes informativas o no usar etiquetas semánticas (`<main>`, `<nav>`, `<button>`).'
    ],
    esquemaEjemploBueno: `# TEMA 8: ACCESIBILIDAD WEB (W3C / WCAG)
1. PRINCIPIOS WCAG (REGLA MNEMOTÉCNICA "POUR"):
   - Perceptible: La información no puede ser invisible a todos los sentidos del usuario (alternativas textuales para imágenes, subtítulos para audio, contraste adecuado).
   - Operable: Toda la interfaz debe poder operarse con distintos dispositivos (navegación completa por teclado sin trampas de foco, tiempo suficiente).
   - Comprensible: Textos legibles, navegación predecible, asistencia y prevención de errores.
   - Robusto: Compatibilidad garantizada con tecnologías de asistencia actuales y futuras (HTML semántico estricto).
2. NIVELES DE CONFORMIDAD:
   - Nivel A: Requisitos mínimos imprescindibles.
   - Nivel AA: Nivel de exigencia legal en administraciones públicas (España RD 1112/2018 y norma europea EN 301 549).
   - Nivel AAA: Criterios avanzados especializados.
3. FÓRMULA Y RATIOS DE CONTRASTE:
   - Nivel AA: Mínimo 4.5:1 para texto normal; 3.0:1 para texto grande (>= 18pt o >= 14pt negrita) y componentes de interfaz.
   - Nivel AAA: Mínimo 7.0:1 para texto normal; 4.5:1 para texto grande.`,
    esquemaEjemploIncompleto: `# TEMA 8: ACCESIBILIDAD
- La accesibilidad es poner subtítulos en los vídeos y que la letra sea grande.
- Se aprueba si tiene nivel A.`
  },

  9: {
    titulo: 'Tema 9 · Evaluación de la usabilidad',
    lecciones: [17, 18, 19],
    paginas: '457–515',
    conceptosClave: [
      'Taxonomía de métodos: Sin usuarios (Inspección / Analíticos) vs Con usuarios (Empíricos)',
      'Evaluación Heurística de Nielsen (10 principios heurísticos, 3 a 5 evaluadores expertos)',
      'Escala de severidad de problemas de Nielsen (0: No es problema, 1: Cosmético, 2: Menor, 3: Mayor, 4: Catástrofe de usabilidad)',
      'Recorrido Cognitivo (Cognitive Walkthrough): Enfocado en facilidad de aprendizaje y pasos del usuario novel',
      'Test de usabilidad en laboratorio con usuarios: Protocolo de Pensamiento en Voz Alta (Think-Aloud)',
      'Métricas objetivas (Tasa de éxito, tiempo por tarea, errores) y subjetivas (Cuestionario SUS - System Usability Scale, NASA-TLX)'
    ],
    trampasFrecuentes: [
      'Creer que con un solo evaluador basta para una evaluación heurística (Nielsen demostró que 1 evaluador detecta apenas el 35% de problemas; con 3-5 evaluadores se detecta ~75-80%).',
      'Confundir Evaluación Heurística (método de inspección por expertos sin usuarios) con Test de Usuarios en Laboratorio (método empírico con usuarios finales observados).',
      'Calificar el SUS como porcentaje simple directo (el cuestionario SUS consta de 10 ítems con escala Likert y cálculo específico que da una puntuación de 0 a 100 donde 68 es la media estándar).'
    ],
    esquemaEjemploBueno: `# TEMA 9: EVALUACIÓN DE LA USABILIDAD
1. MÉTODOS DE EVALUACIÓN:
   - Métodos de Inspección (Sin usuarios, evaluadores expertos):
     * Evaluación Heurística (Nielsen): Comprobación de las 10 heurísticas con 3 a 5 evaluadores independientes.
     * Recorrido Cognitivo (Cognitive Walkthrough): 4 preguntas clave sobre el éxito en cada paso de la tarea.
   - Métodos Empíricos (Con usuarios):
     * Test de usabilidad formal en laboratorio.
     * Pensamiento en voz alta (Think Aloud): Expresar verbalmente dudas y razonamientos durante la tarea.
2. 10 HEURÍSTICAS DE JAKOB NIELSEN:
   1. Visibilidad del estado del sistema.
   2. Correspondencia entre el sistema y el mundo real.
   3. Control y libertad del usuario (deshacer/rehacer).
   4. Consistencia y estándares.
   5. Prevención de errores.
   6. Reconocimiento antes que recuerdo.
   7. Flexibilidad y eficiencia de uso (atajos).
   8. Diseño estético y minimalista.
   9. Ayuda a los usuarios a reconocer, diagnosticar y recuperarse de errores.
   10. Ayuda y documentación.
3. SEVERIDAD DE ERRORES (0 a 4):
   - 0: Sin problema | 1: Cosmético | 2: Menor | 3: Mayor | 4: Catástrofe de usabilidad.`,
    esquemaEjemploIncompleto: `# TEMA 9
- Evaluar es preguntarle al usuario si le ha gustado la web.
- Si no se queja es que es usable.`
  },

  10: {
    titulo: 'Tema 10 · Estándares y guías de estilo',
    lecciones: [20, 21],
    paginas: '516–602',
    conceptosClave: [
      'Diferencia entre Estándar (norma formal vinculante internacional), Guía de estilo (documento de diseño corporativo) y Pauta (recomendación)',
      'Familia de normas ISO 9241 (Ergonomía de la interacción persona-sistema): Parte 11 (Usabilidad), Parte 210 (Diseño Centrado en el Usuario)',
      'Norma ISO/IEC 25010 (Modelo de calidad de software y calidad en uso)',
      'Guías de estilo comerciales: Material Design de Google, Human Interface Guidelines (HIG) de Apple',
      'Design Systems modernos (tokens de diseño, componentes reutilizables, coherencia multiplataforma)'
    ],
    trampasFrecuentes: [
      'Confundir ISO 9241-11 (define usabilidad: eficacia, eficiencia y satisfacción) con ISO 9241-210 (define el proceso de diseño centrado en el usuario y sus 4 fases).',
      'Creer que las guías de estilo son normas legales obligatorias (son directrices de buenas prácticas internas o comerciales para garantizar consistencia).'
    ],
    esquemaEjemploBueno: `# TEMA 10: ESTÁNDARES Y GUÍAS DE ESTILO
1. NIVELES NORMATIVOS:
   - Estándar / Norma Internacional: Documento aprobado por organismo oficial (ISO, IEC, AENOR) con requisitos rigurosos verificables.
   - Guía de estilo: Conjunto de directrices y especificaciones visuales/interactivas para mantener coherencia dentro de una plataforma o empresa.
2. NORMAS CLAVE EN IPO:
   - ISO 9241-11: Define usabilidad en función del contexto, eficacia, eficiencia y satisfacción.
   - ISO 9241-210: Proceso de Diseño Centrado en el Usuario (ciclo iterativo de 4 actividades).
   - ISO/IEC 25010: Calidad en uso (eficacia, eficiencia, satisfacción, ausencia de riesgo, cobertura de contexto).
3. GUÍAS DE ESTILO Y SISTEMAS DE DISEÑO:
   - Material Design (Google): Principios táctiles, metáfora de papel y tinta, animación con física real.
   - Apple HIG: Claridad, deferencia hacia el contenido, profundidad.
   - Beneficios: Consistencia inter-aplicación, reutilización de código y ahorro en mantenimiento.`,
    esquemaEjemploIncompleto: `# TEMA 10
- Los estándares son cosas que inventan las empresas para que todo se vea igual.
- Apple y Google mandan en los estándares.`
  }
};

// ----------------------------------------------------------------------------
// 2. BANCO DE PREGUNTAS CORTAS DE EXAMEN (Desarrollo Conceptual Oficial UJA)
// ----------------------------------------------------------------------------
const PREGUNTAS_CORTAS = [
  {
    id: 'pc-1',
    temaId: 1,
    leccion: 'L1',
    enunciado: 'Define el concepto de «Usabilidad» según la norma ISO 9241-11 citando y explicando brevemente sus tres factores componentes.',
    rubrica: [
      'Mencionar explícitamente eficacia, eficiencia y satisfacción.',
      'Definir eficacia como grado de exactitud e integridad con el que los usuarios alcanzan sus metas.',
      'Definir eficiencia como la relación entre los resultados alcanzados y los recursos empleados (tiempo, esfuerzo mental).',
      'Definir satisfacción como el confort y la actitud positiva hacia el uso del sistema en un contexto determinado.'
    ],
    palabrasClave: ['eficacia', 'eficiencia', 'satisfaccion', 'metas', 'recursos', 'contexto'],
    respuestaModelo: 'Según la norma ISO 9241-11, la usabilidad es la medida en que un sistema puede ser utilizado por usuarios específicos para lograr objetivos determinados con: 1) Eficacia: precisión y plenitud con la que los usuarios alcanzan las metas; 2) Eficiencia: recursos gastados (tiempo, pulsaciones, esfuerzo cognitivo) en relación con la precisión e integridad logradas; y 3) Satisfacción: conformidad y actitud positiva o confort del usuario al interactuar con el producto en su contexto de uso.'
  },
  {
    id: 'pc-2',
    temaId: 2,
    leccion: 'L2',
    enunciado: 'Explica los tres modelos que intervienen en la conceptualización de Donald Norman: Modelo del Diseñador, Imagen del Sistema y Modelo del Usuario. ¿Qué ocurre si la Imagen del Sistema es deficiente?',
    rubrica: [
      'Explicar el Modelo del Diseñador (concepción técnica del creador).',
      'Explicar la Imagen del Sistema (la interfaz, mensajes, comportamiento perceptible).',
      'Explicar el Modelo del Usuario (el modelo mental que el usuario se forja al interactuar).',
      'Indicar que el diseñador no habla directamente con el usuario, sino solo a través de la imagen del sistema; si es deficiente, el usuario genera un modelo mental erróneo que provoca fallos.'
    ],
    palabrasClave: ['diseñador', 'imagen del sistema', 'usuario', 'modelo mental', 'interfaz', 'error'],
    respuestaModelo: 'Donald Norman distingue: 1) Modelo del Diseñador: la visión conceptual y técnica de cómo opera el sistema; 2) Imagen del Sistema: la materialización física y visual del software (interfaz, documentación, retroalimentación); y 3) Modelo del Usuario: el modelo mental que el usuario construye sobre cómo cree que funciona el sistema. Como el diseñador no puede comunicarse directamente con el usuario, toda la transferencia se realiza a través de la Imagen del Sistema. Si esta es ambigua, incompleta o engañosa, el usuario construirá un modelo mental incorrecto, cometiendo errores sistemáticos y sintiendo frustración.'
  },
  {
    id: 'pc-3',
    temaId: 2,
    leccion: 'L4',
    enunciado: 'Enuncia la Ley de Fitts, indicando su fórmula matemática, el significado de cada una de sus variables y su implicación de diseño respecto a los bordes y esquinas de una pantalla.',
    rubrica: [
      'Fórmula: MT = a + b * log2(2D / W) o variante semejante con log2(D/W + 1).',
      'Definir MT (tiempo de movimiento), D (distancia al objetivo), W (anchura o tolerancia del objetivo), a y b (constantes empíricas).',
      'Índice de dificultad: ID = log2(2D/W).',
      'Explicar que los bordes y esquinas tienen anchura infinita (W = ∞) porque el cursor del ratón no puede rebasarlos, haciendo que el tiempo de apuntamiento sea mínimo y convirtiéndolos en ubicaciones óptimas para controles críticos.'
    ],
    palabrasClave: ['fitts', 'mt', 'distancia', 'anchura', 'w', 'd', 'log2', 'esquinas', 'bordes', 'infinito'],
    respuestaModelo: 'La Ley de Fitts modela el tiempo requerido para apuntar rápidamente a un blanco: MT = a + b * log2(2D / W), donde MT es el tiempo de movimiento, D es la distancia al centro del objetivo, W es la anchura del objetivo a lo largo del eje de movimiento, y a y b son constantes determinadas empíricamente. El término log2(2D/W) es el Índice de Dificultad (ID). Su principal implicación en interfaces gráficas de ordenador es que los bordes y las cuatro esquinas de la pantalla tienen una anchura virtual infinita (W = ∞), ya que el cursor se detiene físicamente en el límite de la pantalla. Por tanto, apuntar a una esquina requiere un tiempo de desaceleración casi nulo, siendo las zonas más accesibles del interfaz.'
  },
  {
    id: 'pc-4',
    temaId: 3,
    leccion: 'L5',
    enunciado: '¿Qué es una metáfora de interacción en IPO? Cita dos ventajas de su uso y dos riesgos o inconvenientes si se diseñan de manera inadecuada.',
    rubrica: [
      'Definición de metáfora (traslación de conocimientos de un dominio fuente conocido al dominio destino del software).',
      'Dos ventajas: reducción del tiempo de aprendizaje / familiaridad intuitiva, facilita la retención mental.',
      'Dos riesgos: analogías forzadas o restricciones artificiales del mundo físico que limitan el software, incompatibilidad cultural o expectativas engañosas.'
    ],
    palabrasClave: ['metafora', 'dominio', 'aprendizaje', 'familiaridad', 'analogia', 'restricciones', 'cultural'],
    respuestaModelo: 'Una metáfora de interacción es un recurso cognitivo que traslada conceptos, estructuras o comportamientos familiares de un dominio conocido (mundo real) al dominio del sistema informático para que el usuario aproveche su conocimiento previo. Ventajas: 1) Reduce drásticamente la curva de aprendizaje inicial al ofrecer familiaridad; 2) Facilita la creación de un modelo mental consistente. Inconvenientes/Riesgos: 1) Puede imponer restricciones físicas innecesarias que limiten las capacidades digitales (ej. no permitir buscar texto en un libro digital porque en papel no se puede); 2) Puede generar falsas expectativas si el comportamiento no es 100% fiel o provocar choques culturales con usuarios de distintas regiones.'
  },
  {
    id: 'pc-5',
    temaId: 5,
    leccion: 'L8',
    enunciado: 'Distingue con precisión entre Internacionalización (i18n) y Localización (l10n). En la asignatura de IPO de la UJA, ¿qué relevancia tiene este tema en la evaluación práctica?',
    rubrica: [
      'Definir Internacionalización (i18n): preparación del código fuente y arquitectura para admitir idiomas y formatos sin alterar código.',
      'Definir Localización (l10n): traducción y adaptación cultural concreta a un país/región específico.',
      'Mencionar explícitamente que la Práctica 4 de laboratorio trata sobre Internacionalización y es OBLIGATORIA para aprobar la asignatura.'
    ],
    palabrasClave: ['i18n', 'l10n', 'internacionalizacion', 'localizacion', 'cultura', 'traduccion', 'practica 4', 'obligatoria'],
    respuestaModelo: 'La Internacionalización (i18n) es el proceso arquitectónico de diseñar y escribir una aplicación de modo que pueda adaptarse a diferentes idiomas, sistemas de escritura y convenciones culturales sin necesidad de recompilar o modificar el código fuente (extrayendo cadenas a catálogos de recursos, usando UTF-8, etc.). Por su parte, la Localización (l10n) es la adaptación real de ese producto internacionalizado a un mercado específico (traduciendo los textos, adaptando monedas, festivos y aspectos legales). En la asignatura de IPO de la Universidad de Jaén, este tema es de máxima importancia porque la Práctica 4 de laboratorio trata precisamente de Internacionalización y es de entrega y defensa obligatoria: si un alumno no la supera, la asignatura se considera no cursada.'
  },
  {
    id: 'pc-6',
    temaId: 8,
    leccion: 'L15',
    enunciado: 'Explica los cuatro principios fundamentales de la accesibilidad web según las pautas WCAG de la W3C (regla mnemotécnica POUR) y qué ratio de contraste de color exige el nivel AA para texto de cuerpo estándar.',
    rubrica: [
      'P: Perceptible (la información e interfaz deben presentarse a los sentidos del usuario).',
      'O: Operable (los componentes de navegación e interfaz deben poder manejarse sin barreras, p. ej. por teclado).',
      'U: Comprensible / Understandable (la información y operaciones deben ser claras y predecibles).',
      'R: Robusto (el contenido debe poder interpretarse de forma fiable por tecnologías asistivas).',
      'Indicar el ratio de contraste exigido por WCAG Nivel AA para texto estándar: 4.5:1.'
    ],
    palabrasClave: ['perceptible', 'operable', 'comprensible', 'robusto', 'pour', '4.5:1', 'contraste', 'aa'],
    respuestaModelo: 'Los 4 principios WCAG se resumen con el acrónimo POUR: 1) Perceptible: la información y elementos de la interfaz deben presentarse de manera que los usuarios puedan percibirlos con sus sentidos (alternativas textuales, contraste); 2) Operable: los componentes interactivos deben poder utilizarse mediante múltiples medios (navegación por teclado, tiempo suficiente); 3) Comprensible: la información y el funcionamiento deben ser claros, predecibles y ayudar a evitar errores; 4) Robusto: el contenido debe ser lo bastante robusto para ser interpretado con garantías por diversos agentes de usuario y tecnologías de apoyo (HTML semántico). Para texto de cuerpo estándar (menor de 18pt o 14pt negrita), el nivel de conformidad AA exige un ratio de contraste mínimo de 4.5:1 entre el texto y el fondo.'
  },
  {
    id: 'pc-7',
    temaId: 9,
    leccion: 'L17',
    enunciado: 'Describe el método de Evaluación Heurística propuesto por Jakob Nielsen: ¿quién lo lleva a cabo, cuántos evaluadores recomienda la literatura empírica y por qué, y en qué consiste la escala de severidad de 0 a 4?',
    rubrica: [
      'Quién: Evaluadores expertos en usabilidad (método de inspección sin usuarios finales).',
      'Cuántos: Se recomiendan entre 3 y 5 evaluadores; 1 solo evaluador solo detecta ~35% de problemas, mientras que 3-5 detectan el 75-80% con coste óptimo.',
      'Escala de severidad (0: No se considera problema; 1: Problema cosmético; 2: Problema menor de usabilidad; 3: Problema mayor; 4: Catástrofe de usabilidad que bloquea al usuario).'
    ],
    palabrasClave: ['heuristica', 'nielsen', 'expertos', 'inspeccion', '3', '5', 'evaluadores', 'severidad', '0', '1', '2', '3', '4', 'catastrofe'],
    respuestaModelo: 'La Evaluación Heurística es un método de inspección analítico donde expertos en usabilidad examinan la interfaz verificando si cumple una serie de principios de diseño consensuados (las 10 heurísticas de Nielsen). Nielsen recomienda emplear entre 3 y 5 evaluadores independientes, ya que un solo evaluador pasa por alto muchos fallos (detecta solo ~35%), mientras que agregando las observaciones de 3 a 5 evaluadores se descubre entre el 75% y el 80% de los problemas con una excelente relación coste/beneficio. La severidad se clasifica de 0 a 4: 0 = No es problema de usabilidad; 1 = Problema cosmético (reparar si sobra tiempo); 2 = Problema menor (baja prioridad); 3 = Problema mayor (alta prioridad de corrección); y 4 = Catástrofe de usabilidad (impide la tarea, debe resolverse obligatoriamente antes de lanzar).'
  }
];

// ----------------------------------------------------------------------------
// 3. BANCO DE EJERCICIOS PRÁCTICOS DE EXAMEN (Cálculos y Casos Reales)
// ----------------------------------------------------------------------------
const EJERCICIOS_EXAMEN = [
  {
    id: 'ej-fitts',
    temaId: 2,
    titulo: 'Ejercicio 1: Modelado motor con la Ley de Fitts (Cálculo de ID y MT)',
    contexto: 'Un equipo de desarrollo de la UJA está rediseñando la interfaz del portal de notas de PLATEA y duda entre dos ubicaciones para el botón principal de «Confirmar Matrícula»:',
    enunciado: 'En la opción A, el botón está situado a una distancia D = 400 mm del puntero de inicio y tiene una anchura W = 25 mm. En la opción B, se ubica a una distancia D = 180 mm y tiene una anchura W = 45 mm. Sabiendo que los parámetros empíricos del dispositivo son a = 100 ms y b = 150 ms/bit, calcula:\n\n1) El Índice de Dificultad (ID) para ambas opciones usando la formulación de Shannon: ID = log2((2 * D) / W).\n2) El Tiempo de Movimiento (MT = a + b * ID) previsto para cada opción.\n3) ¿Qué opción es superior ergonómicamente y qué porcentaje de tiempo ahorra al usuario?',
    pasosResolucion: [
      {
        paso: '1. Cálculo del ID (Opción A)',
        formula: 'ID_A = log2((2 * 400) / 25) = log2(800 / 25) = log2(32)',
        calculo: '2^5 = 32 -> ID_A = 5.00 bits'
      },
      {
        paso: '2. Cálculo del MT (Opción A)',
        formula: 'MT_A = 100 + 150 * 5.00',
        calculo: 'MT_A = 100 + 750 = 850 ms (0.85 segundos)'
      },
      {
        paso: '3. Cálculo del ID (Opción B)',
        formula: 'ID_B = log2((2 * 180) / 45) = log2(360 / 45) = log2(8)',
        calculo: '2^3 = 8 -> ID_B = 3.00 bits'
      },
      {
        paso: '4. Cálculo del MT (Opción B)',
        formula: 'MT_B = 100 + 150 * 3.00',
        calculo: 'MT_B = 100 + 450 = 550 ms (0.55 segundos)'
      },
      {
        paso: '5. Conclusión y ahorro porcentual',
        formula: 'Ahorro = ((850 - 550) / 850) * 100 = (300 / 850) * 100',
        calculo: 'Ahorro = 35.29%. La Opción B es muy superior ergonómicamente porque reduce tanto la distancia a recorrer como el factor de desaceleración al ser un blanco más ancho.'
      }
    ],
    inputsInteractivas: [
      { id: 'in_id_a', label: 'ID Opción A (en bits):', respuestaCorrecta: 5.0, tolerancia: 0.1, unidad: 'bits' },
      { id: 'in_mt_a', label: 'MT Opción A (en ms):', respuestaCorrecta: 850, tolerancia: 5, unidad: 'ms' },
      { id: 'in_id_b', label: 'ID Opción B (en bits):', respuestaCorrecta: 3.0, tolerancia: 0.1, unidad: 'bits' },
      { id: 'in_mt_b', label: 'MT Opción B (en ms):', respuestaCorrecta: 550, tolerancia: 5, unidad: 'ms' }
    ]
  },

  {
    id: 'ej-wcag',
    temaId: 8,
    titulo: 'Ejercicio 2: Verificación de Contraste WCAG 2.1 y Accesibilidad Visual',
    contexto: 'Una consultora audita el nuevo campus virtual institucional. Han elegido un color de texto gris azulado (#556677) sobre un fondo gris muy claro (#F0F4F8). El texto se renderiza a un tamaño estándar de 15px con peso normal (400).',
    enunciado: 'Las luminancias relativas calculadas según el estándar de la W3C son:\n- Luminancia del texto (L1): 0.125\n- Luminancia del fondo (L2): 0.852\n\n1) Calcula el ratio de contraste formal aplicando la fórmula WCAG: CR = (L2 + 0.05) / (L1 + 0.05).\n2) Indica si cumple el Nivel de Conformidad AA de las WCAG 2.1 para texto normal de cuerpo.\n3) ¿Qué ratio mínimo se exigiría si la web perteneciera a una administración pública sujeta a la norma EN 301 549?',
    pasosResolucion: [
      {
        paso: '1. Cálculo del Ratio de Contraste (CR)',
        formula: 'CR = (0.852 + 0.05) / (0.125 + 0.05) = 0.902 / 0.175',
        calculo: 'CR = 5.15 : 1'
      },
      {
        paso: '2. Evaluación del cumplimiento Nivel AA',
        formula: 'Umbral AA para texto estándar (< 18pt o < 14pt negrita) = 4.5:1',
        calculo: 'Como 5.15 >= 4.5, CUMPLE el Nivel AA de WCAG 2.1.'
      },
      {
        paso: '3. Evaluación de Nivel AAA y Normativa EN 301 549',
        formula: 'La norma EN 301 549 (transposición del RD 1112/2018) exige nivel AA (mínimo 4.5:1). Sin embargo, NO cumple el nivel AAA que requiere al menos 7.0:1.',
        calculo: 'Aprobado para nivel legal obligatorio (AA).'
      }
    ],
    inputsInteractivas: [
      { id: 'in_cr_val', label: 'Ratio de Contraste calculado (X.XX):', respuestaCorrecta: 5.15, tolerancia: 0.15, unidad: ':1' },
      { id: 'in_cumple_aa', label: '¿Cumple Nivel AA? (1 para SÍ, 0 para NO):', respuestaCorrecta: 1, tolerancia: 0, unidad: '' }
    ]
  },

  {
    id: 'ej-gestalt',
    temaId: 6,
    titulo: 'Ejercicio 3: Detección y Corrección de Violaciones de la Gestalt en UI',
    contexto: 'En una pantalla de configuración de usuario, el botón de «Eliminar mi cuenta para siempre» (color rojo) está colocado a 6 píxeles del campo «Código Postal», mientras que el botón «Guardar cambios de dirección» está situado a 48 píxeles de distancia.',
    enunciado: '1) ¿Qué ley fundamental de la Gestalt se está violando flagrantemente en este formulario?\n2) Explica qué modelo mental erróneo inducirá en el usuario esta disposición espacial.\n3) ¿Cómo corregirías la distribución aplicando las leyes de Proximidad y Región Común?',
    pasosResolucion: [
      {
        paso: '1. Principio Gestáltico Vulnerado',
        formula: 'Ley de Proximidad de la Gestalt',
        calculo: 'La ley de proximidad postula que los elementos espaciados más cerca entre sí se perciben involuntariamente como miembros del mismo grupo funcional o semántico.'
      },
      {
        paso: '2. Inducción de error crítico',
        formula: 'Falso agrupamiento y catástrofe de usabilidad',
        calculo: 'El usuario asociará el botón rojo de eliminar cuenta con la acción de validar el código postal por pura cercanía geométrica, aumentando el riesgo de pulsar accidentalmente la acción destructiva más grave de la cuenta.'
      },
      {
        paso: '3. Solución ergonómica correcta',
        formula: 'Separación modular y Región Común',
        calculo: '1) Agrupar los datos postales en una tarjeta con fondo claro (Región Común) junto con su botón de guardar a 12px; 2) Aislar la acción destructiva en una "Zona de Peligro" al pie de página, enmarcada con borde rojo suave, con un margen de separación de al menos 40px y modal de confirmación explícita.'
      }
    ],
    inputsInteractivas: [
      { id: 'in_gestalt_ley', label: 'Principio principal violado (Escribe: Proximidad):', respuestaCorrecta: 'proximidad', esTexto: true }
    ]
  },

  {
    id: 'ej-nielsen',
    temaId: 9,
    titulo: 'Ejercicio 4: Evaluación Heurística de Nielsen (Diagnóstico de Severidad)',
    contexto: 'Un alumno de la UJA realiza una compra de billetes de autobús en una aplicación web. Tras introducir la tarjeta bancaria y pulsar «Pagar 18,50 €», la pantalla se congela durante 14 segundos en blanco sin ningún indicador de carga, rueda de progreso ni mensaje de confirmación. El alumno pulsa 3 veces más el botón temiendo que no haya funcionado, cobrándole el billete 4 veces en el banco.',
    enunciado: '1) ¿Qué heurística de las 10 de Nielsen se ha violado en primer lugar de forma flagrante?\n2) ¿Qué segunda heurística de Nielsen habría evitado los cobros duplicados al pulsar reiteradamente?\n3) ¿Qué grado de severidad (0 a 4) corresponde a este fallo de usabilidad en un examen oficial?',
    pasosResolucion: [
      {
        paso: '1. Primera Heurística Violada',
        formula: 'Heurística 1: Visibilidad del estado del sistema',
        calculo: 'El sistema debe mantener siempre informados a los usuarios de lo que está ocurriendo, mediante una retroalimentación adecuada en un tiempo razonable (spinner, barra de progreso o mensaje "Procesando pago...").'
      },
      {
        paso: '2. Segunda Heurística Violada',
        formula: 'Heurística 5: Prevención de errores',
        calculo: 'El botón de pago debería deshabilitarse inmediatamente tras el primer click y el backend implementar claves de idempotencia para evitar cobros repetidos por pulsaciones múltiples.'
      },
      {
        paso: '3. Asignación de Severidad de Nielsen',
        formula: 'Severidad 4 (Catástrofe de usabilidad)',
        calculo: 'Impide al usuario culminar su tarea de forma segura, genera una pérdida económica directa injustificada y genera una pérdida total de confianza en la plataforma. Es de subsanación obligatoria e inmediata.'
      }
    ],
    inputsInteractivas: [
      { id: 'in_heuristica_1', label: 'Número de la 1ª Heurística violada (1 al 10):', respuestaCorrecta: 1, tolerancia: 0, unidad: '' },
      { id: 'in_severidad', label: 'Grado de Severidad (0 a 4):', respuestaCorrecta: 4, tolerancia: 0, unidad: '' }
    ]
  }
];
