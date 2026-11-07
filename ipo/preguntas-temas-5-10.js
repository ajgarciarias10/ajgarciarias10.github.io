/* Bancos de los temas 8–10. Las cinco preguntas iniciales conservan sus enunciados
   para mantener las identidades y el progreso ya guardado. */
'use strict';
const TITULOS = {8:'Accesibilidad',9:'Evaluación',10:'Estándares y guías de estilo'};
const BLOQUES_NUEVOS = {
  8:['Principios de accesibilidad','Visión y contenido perceptible','Audición y multimedia','Motricidad y comprensión','Conformidad y evaluación'],
  9:['Métodos de evaluación','Inspección experta','Pruebas con usuarios','Métricas y resultados','Proceso y comunicación'],
  10:['Normas y estándares','Guías de estilo','Consistencia y patrones','Diseño centrado en personas','Aplicación y mantenimiento']
};
const NUEVAS = {
8:[
[0,'Accesibilidad y WCAG','Un formulario puede percibirse visualmente, pero todo su flujo requiere ratón. ¿Qué dimensión POUR falla de forma más directa?',[
['Operable: las funciones deben poder manejarse con distintos mecanismos, incluido teclado.','Perceptible no garantiza que los controles se puedan operar.'],
['Perceptible: el usuario no puede detectar visualmente el formulario.','El enunciado afirma que sí lo percibe.'],
['Comprensible: las instrucciones necesariamente son ambiguas.','No se da información sobre comprensión.'],
['Robusto: el navegador no admite la página.','No se describe un problema de compatibilidad.']]],
[0,'Accesibilidad y WCAG','Relaciona cada barrera con POUR: un vídeo no tiene alternativa textual; una acción no se puede activar con teclado. ¿Qué correspondencia es correcta?',[
['Falta de alternativa → perceptible; acción inaccesible por teclado → operable.','La primera afecta a percibir el contenido; la segunda a manejarlo.'],
['Falta de alternativa → operable; teclado → comprensible.','Las categorías no corresponden a las barreras planteadas.'],
['Ambas son robustez porque dependen del navegador.','Los problemas ocurren aunque el navegador sea compatible.'],
['Ambas son comprensibilidad porque afectan a instrucciones.','No hay instrucciones ambiguas en el ejemplo.']]],
[1,'Accesibilidad y WCAG','Un texto normal tiene contraste 4:1 y un encabezado grande 3:1. ¿Qué evaluación aplica la referencia WCAG AA indicada en la guía?',[
['El texto normal queda por debajo de 4,5:1; el texto grande alcanza su mínimo de 3:1.','El umbral de AA indicado es 4,5:1 para texto normal y 3:1 para texto grande.'],
['Ambos cumplen porque el umbral general es 3:1.','El texto normal requiere 4,5:1.'],
['Solo el encabezado falla porque el tamaño aumenta el contraste exigido.','Para texto grande el umbral indicado es menor.'],
['No se puede evaluar contraste con una razón numérica.','La guía proporciona precisamente esas razones.']]],
[1,'Accesibilidad y WCAG','Una página tiene texto alternativo y buen contraste, pero el foco del teclado no se ve. ¿Qué inferencia evita dar por completa la accesibilidad?',[
['Hay mejoras perceptibles, pero falta comprobar operación y visibilidad del foco.','Una medida satisfecha no sustituye a los demás criterios.'],
['Cumple POUR completo porque dos criterios están atendidos.','POUR exige revisar también operabilidad, comprensión y robustez.'],
['Solo puede fallar robustez porque el foco lo dibuja el navegador.','La dificultad descrita es operar y localizar el foco.'],
['El texto alternativo hace innecesario probar el teclado.','Alternativas textuales y navegación de teclado responden a barreras distintas.']]],
[2,'Accesibilidad y WCAG','Un equipo busca nivel AAA en todas las páginas, pero aún hay controles sin nombre accesible. ¿Qué prioridad de evaluación es más útil?',[
['Resolver primero barreras básicas que impiden percibir u operar los controles; después ampliar el nivel de conformidad.','Un nivel alto no compensa una función central inaccesible.'],
['Declarar AAA porque es el nivel más ambicioso aunque haya controles sin nombre.','La conformidad debe basarse en criterios satisfechos.'],
['Posponer nombres accesibles hasta comprobar contraste.','Son criterios distintos y el control puede ser inusable ahora.'],
['Eliminar las etiquetas visibles para reducir duplicación.','Los nombres accesibles complementan, no sustituyen necesariamente, el texto visible.']]]
],
9:[
[0,'Métodos de evaluación','Expertos revisan una interfaz con una lista de principios; después, estudiantes intentan completar una tarea sin ayuda. ¿Qué métodos se combinan?',[
['Evaluación heurística y test de usabilidad.','La primera es inspección experta; en el segundo, personas realizan tareas observadas.'],
['Evaluación heurística y recorrido cognitivo.','El recorrido cognitivo lo realizan evaluadores; aquí participan estudiantes como usuarios.'],
['Dos tests de usabilidad, porque ambos revisan una interfaz.','La primera actividad descrita es inspección experta sin usuarios.'],
['Dos recorridos cognitivos, porque se aplican principios.','La lista de principios caracteriza la inspección heurística.']]],
[0,'Métodos de evaluación','Une pregunta y método: «¿Dónde se atascan usuarios reales?» y «¿Qué regla de diseño incumple esta pantalla según expertos?». ¿Qué pareja responde mejor?',[
['Observación de test de usabilidad; inspección heurística.','El primer objetivo requiere uso con personas; el segundo puede resolverse mediante expertos.'],
['Inspección heurística; test de usabilidad.','El orden está invertido respecto a la evidencia que se quiere recoger.'],
['Recorrido cognitivo; encuesta demográfica.','No se pregunta por aprendizaje paso a paso ni por características personales.'],
['Análisis de tareas; estándar de facto.','El primero modela trabajo y el segundo es una convención, no un método de evaluación.']]],
[1,'Métodos de evaluación','Un experto recorre el registro de una cuenta preguntándose en cada paso si alguien nuevo sabrá qué hacer y entenderá el resultado. ¿Qué método encaja mejor?',[
['Recorrido cognitivo, centrado en el aprendizaje paso a paso.','Examina si las acciones y sus resultados son comprensibles para quien aprende.'],
['Test de usabilidad, aunque no participe ningún usuario.','Un test de usabilidad recoge uso de personas participantes.'],
['Evaluación heurística sin objetivo de tarea.','El enunciado describe un recorrido con foco específico en aprender una tarea.'],
['Prueba de contraste cromático.','El foco no está en contraste visual.']]],
[1,'Métodos de evaluación','Una inspección experta encuentra una etiqueta confusa, pero no estima cuánto tarda la gente en completar la tarea. ¿Qué paso complementario aporta esa evidencia?',[
['Un test con usuarios realizando una tarea representativa, registrando errores y tiempos.','La observación directa aporta datos sobre desempeño real.'],
['Repetir la misma inspección con más páginas del manual.','Puede ampliar la inspección, pero no revela el rendimiento de usuarios.'],
['Cambiar la etiqueta sin comprobar el problema.','Es una intervención, no una evaluación de su efecto.'],
['Medir el tamaño del código fuente.','No estima dificultad o duración de la tarea.']]],
[2,'Métodos de evaluación','Una persona completa una tarea con éxito, pero tarda el doble y expresa frustración. ¿Qué informe evita reducir usabilidad a un único indicador?',[
['Registrar éxito, tiempo/esfuerzo y experiencia percibida, y explicar sus diferencias.','El resultado exitoso no demuestra eficiencia ni satisfacción.'],
['Declarar que la interfaz es usable porque la tarea se terminó.','Ignora esfuerzo y satisfacción.'],
['Contar solo los errores porque el tiempo no es relevante.','El tiempo y el esfuerzo aportan evidencia de eficiencia.'],
['Descartar la opinión y medir solo clics.','La experiencia también informa sobre satisfacción y problemas.']]]
],
10:[
[0,'Estándares y guías de estilo','Una organización adopta una recomendación publicada por ISO; otra convención se vuelve común porque muchas webs la usan. ¿Cómo se distinguen?',[
['La primera es un estándar formal o de iure; la segunda, una convención de facto.','Uno nace de un proceso formal; el otro, de una adopción extendida.'],
['Ambas son de iure porque aparecen por escrito.','Publicar una convención no equivale a aprobación formal.'],
['La primera es de facto y la segunda de iure por ser más usada.','Se intercambian formalidad y adopción práctica.'],
['Ambas son guías de plataforma porque afectan al diseño.','El ejemplo ISO es un estándar formal.']]],
[0,'Estándares y guías de estilo','Relaciona el recurso con su uso: una norma ISO y una guía de Apple para sus aplicaciones. ¿Qué clasificación es más precisa?',[
['Norma formal de iure; guía de estilo de plataforma.','La guía orienta convenciones de un ecosistema; la ISO tiene proceso de normalización formal.'],
['Estándar de facto; norma ISO.','La clasificación está invertida y no identifica la guía de plataforma.'],
['Dos estándares de facto porque son conocidas.','La norma ISO mantiene carácter formal aunque sea conocida.'],
['Dos leyes obligatorias por igual en cualquier producto.','Una guía de plataforma no tiene el mismo carácter que una norma legal.']]],
[1,'Estándares y guías de estilo','Una app copia un patrón de una guía de plataforma aunque contradiga las tareas principales de sus usuarios. ¿Qué criterio debe guiar la decisión?',[
['Usar la guía como referencia y contrastarla con tareas, usuarios y consistencia del producto.','Las guías informan decisiones, pero el ajuste al contexto de uso sigue siendo esencial.'],
['Seguir siempre cada patrón sin evaluar el contexto.','Una convención no garantiza que resuelva la tarea concreta.'],
['Ignorar todas las guías para que la interfaz sea original.','Las guías aportan consistencia y familiaridad cuando son pertinentes.'],
['Tratar la guía como ley internacional obligatoria.','Las guías de plataforma no son por sí mismas leyes universales.']]],
[1,'Estándares y guías de estilo','Dos productos presentan la misma acción con etiquetas distintas y en lugares opuestos. ¿Qué aporta una guía de estilo pertinente?',[
['Criterios compartidos que reducen diferencias innecesarias y ayudan a reconocer patrones.','La consistencia facilita aprendizaje y transferencia entre pantallas.'],
['Garantía de que toda tarea será efectiva sin evaluación.','La consistencia no sustituye a comprobar resultados.'],
['Obligación de que todas las aplicaciones tengan idéntica estructura.','La consistencia se aplica con criterio y dentro del contexto.'],
['Una forma de clasificar el producto como paradigma ubicuo.','Una guía regula convenciones, no define por sí sola el paradigma.']]],
[2,'Estándares y guías de estilo','Un equipo debe elegir entre un patrón familiar de la plataforma y una variación que hace más visible una acción crítica. ¿Qué enfoque es más defendible?',[
['Evaluar la tarea y el riesgo, mantener convenciones donde ayuden y justificar la excepción con pruebas.','Las guías son un punto de partida; seguridad, comprensión y evidencia pueden justificar ajustes.'],
['Copiar siempre el patrón aunque oculte la acción crítica.','La familiaridad no debe impedir que una tarea crítica sea comprensible.'],
['Ignorar la guía para que todos los controles sean diferentes.','La diferencia gratuita perjudica la consistencia y el aprendizaje.'],
['Elegir solo por preferencia visual del diseñador.','La decisión debe basarse en tareas y efectos para las personas.']]]
]};
/* Cada fila: apartado, página del PDF, caso, respuesta y tres alternativas, explicación. */
const EXTRAS_8 = [
 [0,410,'Una interfaz solo funciona para personas con visión y movilidad típicas. ¿Qué principio general incumple?','Acomodar diferencias individuales.','Optimizarla exclusivamente para el usuario medio.','Reducir la cantidad de funciones para todos.','Usar el mismo dispositivo de entrada siempre.','La accesibilidad parte de las diferencias humanas.'],
 [0,411,'¿Por qué el envejecimiento de la población aumenta el interés por la accesibilidad?','La relación entre edad y limitaciones funcionales.','La edad elimina la necesidad de interfaces digitales.','Todas las personas mayores tienen la misma discapacidad.','La edad vuelve innecesario el diseño universal.','El tema relaciona edad y limitaciones funcionales.'],
 [0,416,'En un grupo de treinta personas aparecen diferencias grandes de capacidad. ¿Qué decisión de diseño es más sólida?','Prever capacidades diversas desde el inicio.','Diseñar solo para el valor promedio del grupo.','Crear una interfaz distinta para cada persona.','Esperar a que aparezcan quejas para adaptarla.','Las diferencias individuales pueden ser muy amplias incluso en grupos pequeños.'],
 [0,418,'¿Qué define mejor el diseño universal?','Diseñar para el mayor rango de personas y situaciones.','Crear una única apariencia visual obligatoria para todos.','Diseñar solo para personas con discapacidad reconocida.','Sustituir todas las ayudas técnicas por una interfaz común.','El objetivo es ampliar el rango de personas y contextos de uso.'],
 [0,419,'Un servicio ofrece la misma tarea a personas con habilidades distintas sin segregarlas. ¿Qué principio aplica?','Uso equitativo.','Tolerancia al error.','Bajo esfuerzo físico.','Información perceptible.','Uso equitativo evita excluir o estigmatizar a un grupo.'],
 [0,419,'Una persona puede manejar un control con la mano derecha o izquierda. ¿Qué principio ilustra?','Flexibilidad en el uso.','Tamaño y espacio de acceso.','Uso equitativo exclusivamente.','Información perceptible exclusivamente.','La flexibilidad permite diferentes preferencias y capacidades.'],
 [0,419,'Un cajero explica cada paso con lenguaje simple y orden claro. ¿Qué principio del diseño universal destaca?','Uso simple e intuitivo.','Bajo esfuerzo físico.','Tolerancia al error.','Compatibilidad con Braille.','El funcionamiento debe ser fácil de comprender.'],
 [0,419,'Una alarma comunica su estado con texto y sonido. ¿Qué principio del diseño universal apoya?','Información perceptible.','Uso exclusivo de imágenes.','Un único modo de operación.','Sustitución de la confirmación de errores.','La información debe poder percibirse pese a condiciones sensoriales distintas.'],
 [0,420,'Un formulario permite deshacer una eliminación accidental. ¿Qué principio aplica?','Tolerancia al error.','Reducción del contraste.','Ocultación de acciones peligrosas.','Interacción exclusivamente por voz.','Minimiza consecuencias de acciones no deseadas.'],
 [0,420,'Un control exige mantener un botón pulsado durante varios minutos. ¿Qué principio se ve comprometido?','Bajo esfuerzo físico.','Uso equitativo por sí solo.','Información perceptible por sí sola.','Flexibilidad del vocabulario.','La interacción prolongada y forzada incrementa el esfuerzo físico.'],
 [0,420,'Una silla de ruedas no puede aproximarse a un terminal por falta de espacio. ¿Qué principio falla?','Espacio para acceder y usarlo.','Reconocimiento del color.','Simplicidad lingüística.','Tolerancia al error.','El entorno debe permitir alcance y aproximación.'],
 [1,422,'¿Qué conjunto de necesidades examina el tema además de las visuales?','Auditivas, motrices y cognitivas.','Solo auditivas y de color.','Solo memoria a largo plazo.','Solo adaptación de idioma.','El tema distingue esos grupos de discapacidades.'],
 [1,423,'Una señal se distingue solo entre rojo y verde. ¿Qué usuarios pueden perder información?','Protanopia o deuteranopia.','Solo personas con tritanopia.','Solo personas con ceguera total.','Ninguna si la pantalla es grande.','Protanopia y deuteranopia afectan a la percepción de rojo y verde.'],
 [1,426,'¿Cómo señalar un error sin depender únicamente del color?','Añadir texto o símbolos al color.','Cambiar rojo por verde sin añadir pistas.','Aumentar la saturación de todos los colores.','Ocultar el estado hasta enviar de nuevo.','No se debe codificar una conducta importante solo con colores.'],
 [1,432,'Una persona tiene visión reducida, pero puede leer al ampliar. ¿Qué ayuda conviene ofrecer?','Ampliación sin pérdida de contenido.','Sustituir todo texto por iconos pequeños.','Impedir el zoom para mantener el diseño.','Mostrar solo audio aunque pueda leer.','La ampliación y la legibilidad son ayudas directas para baja visión.'],
 [1,434,'La pantalla deja de ser utilizable para una persona ciega. ¿Qué cambio de canal contempla el tema?','Voz o tableta Braille.','Solo aumentar el brillo de la pantalla.','Usar exclusivamente colores saturados.','Reducir el tamaño de la tipografía.','La información visual debe transformarse a otros canales.'],
 [1,436,'Un lector de pantalla anuncia «imagen» sin explicar el botón gráfico. ¿Qué falta?','Una descripción textual de su función.','Una animación más rápida del botón.','Un color de fondo diferente.','Un segundo botón idéntico sin nombre.','La información gráfica funcional necesita equivalente textual.'],
 [1,437,'Una página permite hacer clic, pero no llegar a sus enlaces con Tab. ¿Qué barrera crea?','Bloquea la navegación por teclado.','Solo ralentiza a quien usa ratón.','Mejora la compatibilidad con lectores de pantalla.','Es irrelevante si los enlaces tienen color.','El teclado es fundamental para navegación sin visión.'],
 [2,438,'Una alerta crítica se comunica solo con un pitido. ¿Qué alternativa necesita?','Una alternativa visual o textual.','Un pitido más agudo únicamente.','Un volumen máximo obligatorio.','Eliminar la alerta para todos.','Las personas con dificultades auditivas no deben depender del sonido.'],
 [2,439,'Una persona usuaria de lengua de signos encuentra instrucciones con jerga compleja. ¿Qué revisión conviene?','Revisar el lenguaje y las alternativas.','Suponer que toda persona sorda domina la jerga escrita.','Eliminar instrucciones y dejar solo sonido.','Sustituir los textos por abreviaturas técnicas.','El tema advierte diferencias lingüísticas dentro de la discapacidad auditiva.'],
 [2,450,'Un vídeo docente contiene explicaciones habladas. ¿Qué recurso facilita acceso sin audición?','Subtítulos y alternativa textual.','Solo un control de volumen mayor.','Una imagen decorativa sin texto.','Reproducción automática más rápida.','WCAG contempla alternativas para contenido multimedia.'],
 [3,440,'Un gesto exige pulsar dos teclas simultáneamente y mantener una tercera. ¿A qué grupo afecta más directamente?','Personas con dificultades motrices.','Personas con protanopia únicamente.','Personas que usan subtítulos.','Personas con tritanopia únicamente.','La coordinación y el mantenimiento de teclas pueden ser barreras motrices.'],
 [3,441,'¿Qué alternativa destaca el tema para quien no puede manejar bien el puntero?','Una interfaz completa con teclado.','Un puntero todavía más pequeño.','Más gestos de arrastre obligatorios.','Ocultar el foco del teclado.','El teclado ofrece otra vía de interacción.'],
 [3,442,'Una tarea exige memorizar muchas instrucciones ambiguas. ¿Qué dimensión conviene revisar?','La accesibilidad cognitiva.','Solo la saturación de los colores.','Solo el tamaño de la pantalla.','Solo la frecuencia del procesador.','El diseño inclusivo también contempla dificultades cognoscitivas.'],
 [3,443,'Una aplicación usa términos cambiantes para la misma acción. ¿Qué mejora beneficia a usuarios con dificultades cognitivas?','Lenguaje claro y acciones consistentes.','Aumentar las metáforas sin explicación.','Usar más abreviaturas en cada pantalla.','Mover los controles en cada visita.','La claridad y la consistencia reducen carga de comprensión.'],
 [3,444,'¿Por qué una ayuda pensada para discapacidad puede beneficiar a otros usuarios?','Ayuda ante limitaciones situacionales.','Porque todas las personas tienen idénticas capacidades.','Porque elimina la necesidad de evaluar.','Porque sustituye cualquier otro diseño.','Las ayudas pueden ser útiles fuera del grupo para el que se idearon.'],
 [3,445,'Una persona conduce y no puede mirar la pantalla. ¿Qué ejemplo del tema se le aproxima?','La salida por voz.','La paleta optimizada para tritanopia.','El zoom de letra exclusivamente.','La navegación solo con ratón.','La falta situacional de visión puede aprovechar canales alternativos.'],
 [4,449,'¿Qué organismo alberga la Web Accessibility Initiative?','El W3C.','ISO exclusivamente.','Apple exclusivamente.','La OSF exclusivamente.','WAI es una iniciativa del W3C.'],
 [4,450,'¿Qué pauta orienta el contenido web accesible?','WCAG.','ATAG como única pauta de contenido.','CUA como norma de contraste.','ISO/IEC 9126 como sustituto de WCAG.','WCAG se refiere al contenido web.'],
 [4,450,'Un equipo construye un editor que genera páginas. ¿Qué pauta se centra en herramientas de autor?','ATAG.','WCAG como única pauta para el editor.','CUA.','OpenLook.','ATAG aborda las herramientas de creación de contenido.'],
 [4,451,'¿Qué versión de WCAG aparece expresamente en el temario?','WCAG 2.1.','Solo WCAG 1.0.','Solo WCAG 3.0.','Solo las reglas de CUA.','La página 451 cita WCAG 2.1.'],
 [4,453,'Una herramienta analiza páginas y entrega un informe de problemas. ¿Cómo se clasifica?','Herramienta evaluadora.','Lector de pantalla exclusivamente.','Guía comercial de ventanas.','Control de entrada alternativo.','Evalúa páginas o sitios y genera informes o clasificaciones.'],
 [4,455,'Un equipo pasa un validador automático y declara accesibilidad total. ¿Qué falta?','Añadir revisión manual con ayudas.','Suponer que el informe automático cubre toda barrera.','Evaluar solo el diseño gráfico.','Eliminar la revisión humana por completo.','La comprobación combina distintos recursos y criterios.'],
 [4,456,'¿Qué objetivo resume la conclusión del tema?','Acomodar diferencias individuales.','Elegir una interfaz única para el usuario promedio.','Limitar el acceso a personas expertas.','Confiar solo en ayudas técnicas externas.','La aspiración es ampliar el acceso del sistema interactivo.'],
 [4,451,'Una página tiene imágenes descritas pero no puede usarse con teclado. ¿Qué conclusión es válida?','Hay otra barrera de operación.','El texto alternativo garantiza toda la accesibilidad.','El teclado solo importa a desarrolladores.','La conformidad depende solo del contraste.','Las pautas cubren barreras diferentes y deben evaluarse en conjunto.']
];
NUEVAS[8].push(...EXTRAS_8.map(([bloque,pagina,enunciado,correcta,a,b,c,explicacion]) =>
  [bloque,BLOQUES_NUEVOS[8][bloque],enunciado,[[correcta,explicacion],[a,explicacion],[b,explicacion],[c,explicacion]],pagina]));
const EXTRAS_9 = [
 [0,460,'Un equipo decide funciones antes de preguntar a quienes usarán el producto. ¿Qué enfoque del tema debería aplicar?','Diseño centrado en usuarios.','Diseño centrado solo en la arquitectura técnica.','Diseño guiado por preferencias del programador.','Diseño cerrado antes de conocer las tareas.','El proceso debe recoger necesidades de las personas usuarias.'],
 [0,461,'¿Qué persigue el diseño centrado en el usuario durante el proceso?','Recoger necesidades y mejorar el uso.','Evitar toda revisión de prototipos.','Sustituir personas por métricas del servidor.','Elegir colores antes de identificar tareas.','Las necesidades y el uso guían el desarrollo.'],
 [0,465,'Dos usuarios logran la tarea, pero uno tarda mucho más y termina frustrado. ¿Qué dimensiones de usabilidad difieren?','Eficiencia y satisfacción.','Solo efectividad.','Solo compatibilidad técnica.','Solo funcionalidad de red.','ISO incluye efectividad, eficiencia y satisfacción en un contexto de uso.'],
 [0,465,'¿Por qué una medida de usabilidad debe indicar usuarios y contexto?','Porque depende de usuarios y objetivos.','Porque la usabilidad es idéntica en toda situación.','Porque basta con contar líneas de código.','Porque solo interesa el hardware.','La definición está vinculada a usuarios, objetivos y contexto.'],
 [0,467,'¿Cómo puede ahorrar costes trabajar la usabilidad pronto?','Detectando problemas antes del rediseño.','Eliminando toda evaluación con personas.','Posponiendo decisiones hasta publicar.','Garantizando que nunca habrá errores.','El tema relaciona usabilidad con ahorro de rediseño y mantenimiento.'],
 [0,469,'¿Cuándo debe considerarse la usabilidad?','Desde el comienzo del proyecto.','Solo después del lanzamiento.','Solo al escribir el manual.','Solo cuando haya quejas formales.','La evaluación temprana evita correcciones costosas.'],
 [0,471,'¿Qué es la evaluación de un sistema interactivo?','Analizar la usabilidad en distintas etapas.','Contar únicamente cuántas funciones incorpora.','Revisar solo que compile sin errores.','Elegir el diseño visual por votación.','La evaluación analiza la usabilidad a lo largo del ciclo de vida.'],
 [0,472,'Al elegir un método de evaluación, ¿qué factores pide considerar el tema?','Coste, personal y etapa del proyecto.','Solo el color de la interfaz.','Solo la cantidad de pantallas.','Solo el lenguaje de programación.','La elección depende de recursos y momento del proyecto.'],
 [1,474,'Un grupo de expertos examina la interfaz sin observar usuarios realizando tareas. ¿A qué familia pertenece?','Inspección.','Test de prestaciones.','Entrevista de campo.','Registro automático de uso.','En inspección los evaluadores revisan aspectos de la interfaz.'],
 [1,475,'Una experta compara pantallas con principios reconocidos de usabilidad. ¿Qué método usa?','Evaluación heurística.','Grupo de discusión.','Test retrospectivo.','Cuestionario post-tarea.','La evaluación heurística contrasta la interfaz con principios.'],
 [1,476,'Tras pulsar Guardar no aparece señal de progreso. ¿Qué heurística se incumple?','Visibilidad del estado.','Flexibilidad del color corporativo.','Compatibilidad con voz.','Tamaño de la muestra.','El sistema debe informar de lo que está ocurriendo.'],
 [1,476,'Un botón usa «commit» donde sus usuarios esperan «Guardar». ¿Qué heurística ayuda a corregirlo?','Correspondencia con el mundo real.','Incrementar la carga de memoria.','Ocultar el estado del sistema.','Forzar una sintaxis interna.','La interfaz debe hablar el lenguaje de sus usuarios.'],
 [1,477,'Un diálogo irreversible carece de Cancelar o Deshacer. ¿Qué heurística falla?','Control del usuario.','Recuento de clics.','Selección de muestras.','Coste del laboratorio.','Se necesita una salida clara ante acciones no deseadas.'],
 [1,477,'Una pantalla obliga a recordar un código visto tres pasos antes. ¿Qué heurística se ve afectada?','Reconocer en vez de recordar.','Visibilidad del rendimiento del servidor.','Compatibilidad con iconos de color.','Medición de prestaciones.','La información necesaria debería estar disponible al usarla.'],
 [1,479,'Un evaluador simula una tarea de una persona nueva paso a paso. ¿Qué técnica realiza?','Recorrido cognitivo.','Cuestionario postest.','Grabación de uso real.','Grupo de discusión dirigido.','El recorrido cognitivo examina facilidad de aprendizaje en tareas.'],
 [1,480,'¿Qué debe prepararse antes de un recorrido cognitivo?','Prototipo, escenario y tareas.','Solo la versión final publicada.','Solo estadísticas de tráfico.','Solo una lista de colores.','La técnica necesita un escenario y acciones concretas.'],
 [1,481,'En cada paso del recorrido, ¿qué pregunta es pertinente?','¿Sabrá actuar y reconocer el resultado?','¿Cuánto costó producir la pantalla?','¿Qué editor usó el programador?','¿Qué color prefiere el evaluador?','Se comprueba la comprensión de acciones y resultados.'],
 [1,482,'Una especialista comprueba si una interfaz cumple una norma formal. ¿Qué método aplica?','Inspección de estándares.','Pensar en voz alta.','Observación etnográfica.','Test de prestaciones.','El experto contrasta la interfaz con un estándar.'],
 [2,484,'El equipo necesita conocer preferencias y necesidades antes de diseñar. ¿Qué familia de métodos ayuda?','Indagación con personas usuarias.','Solo inspección del código.','Solo prueba de carga del servidor.','Solo revisión de iconos.','La indagación obtiene información directa del contexto y usuarios.'],
 [2,486,'Se observa a una enfermera usando el sistema durante su trabajo habitual. ¿Qué técnica es?','Observación de campo.','Recorrido cognitivo.','Inspección de estándares.','Test retrospectivo.','La observación se realiza en el lugar de trabajo real.'],
 [2,488,'En una observación, ¿qué es un artefacto?','Un objeto usado en el lugar.','Una opinión del moderador.','Un error de compilación.','Una norma ISO.','El tema llama artefactos a objetos físicos en uso.'],
 [2,488,'El tamaño de los cubículos condiciona cómo trabaja el equipo. ¿Cómo lo clasifica el tema?','Un rasgo físico del lugar.','Una medida subjetiva postest.','Una heurística de Nielsen.','Un estándar de interfaz.','Los afloramientos son rasgos físicos que caracterizan el sitio.'],
 [2,489,'Se reúnen ocho usuarios con moderador para debatir un producto. ¿Qué técnica es?','Grupo de discusión dirigido.','Medida de prestaciones individual.','Inspección heurística.','Registro automático de uso.','El tema describe grupos de seis a nueve usuarios moderados.'],
 [2,491,'¿Qué ventaja tiene una entrevista frente a un cuestionario fijo?','Permite adaptar y profundizar.','Siempre alcanza a más personas.','Elimina toda subjetividad.','Produce automáticamente tiempos de tarea.','La entrevista es más flexible y permite aclaraciones.'],
 [2,493,'Se desea llegar a muchas personas con preguntas comparables. ¿Qué instrumento conviene?','Cuestionario.','Recorrido cognitivo.','Inspección de estándares.','Test retrospectivo.','Es menos flexible, pero alcanza más participantes y se analiza con rigor.'],
 [2,493,'¿Cuándo se aplica un cuestionario postarea?','Después de cada tarea.','Antes de identificar al participante.','Solo después del lanzamiento comercial.','Antes de construir cualquier prototipo.','Postarea recoge opiniones sobre la tarea realizada.'],
 [2,494,'Una pregunta pide describir con palabras un problema inesperado. ¿Qué tipo es?','Abierta.','Escalar.','Ordenada.','Opción múltiple cerrada.','Las respuestas abiertas recogen información subjetiva no prevista.'],
 [2,495,'«Puntúa de 1 a 5 la claridad de los iconos». ¿Qué tipo de pregunta es?','Escalar.','Abierta.','Ordenada.','Observación de campo.','La escala numérica valora un aspecto concreto.'],
 [2,496,'Se pide ordenar tres formas de ejecutar una acción. ¿Qué tipo de pregunta es?','Ordenada.','General demográfica.','Abierta sin estructura.','Medida de rendimiento.','La persona ordena opciones por preferencia o utilidad.'],
 [2,499,'Una app registra frecuencia de errores y uso de ayuda en miles de sesiones. ¿Qué método aplica?','Registro automático del uso.','Entrevista individual.','Recorrido cognitivo.','Grupo de discusión.','El logging recoge estadísticas de uso detalladas.'],
 [3,501,'Personas representativas realizan tareas mientras observadores registran resultados. ¿A qué familia pertenece?','Test con usuarios.','Inspección sin usuarios.','Estándar de iure.','Guía comercial.','Los tests observan tareas realizadas por usuarios representativos.'],
 [3,502,'Para una prueba de prestaciones, ¿qué tareas conviene seleccionar?','Tareas reales o de alto riesgo.','Solo tareas inventadas que nadie realiza.','Solo la pantalla de bienvenida.','Tareas elegidas por su color.','Las tareas deben revelar problemas de uso reales.'],
 [3,504,'El tiempo para terminar una tarea, ¿qué clase de medida es?','Medida de rendimiento.','Preferencia subjetiva.','Principio de diseño universal.','Estándar de facto.','El tiempo es un comportamiento cuantificable.'],
 [3,505,'«Me resultó difícil aprender» es una medida de qué tipo?','Medida subjetiva.','Rendimiento cronometraje puro.','Inspección automática del código.','Norma de plataforma.','Las opiniones y juicios son medidas subjetivas.'],
 [3,508,'Se pide decir en voz alta lo que se piensa al usar la interfaz. ¿Qué método es?','Pensar en voz alta.','Inspección de estándares.','Cuestionario pretest.','Registro automático.','Ayuda a detectar razonamientos y problemas de terminología.'],
 [3,508,'Dos personas colaboran en la tarea y verbalizan sus decisiones. ¿Qué variante menciona el tema?','Interacción constructiva.','Test retrospectivo.','Inspección heurística.','Método del conductor.','La interacción constructiva implica a dos usuarios a la vez.'],
 [3,509,'Se revisa con la persona el vídeo de su sesión para obtener más comentarios. ¿Qué test es?','Test retrospectivo.','Grupo de discusión.','Observación de campo sin registro.','Inspección de estándares.','La revisión posterior de la grabación es retrospectiva.'],
 [3,509,'Un evaluador guía a una persona inexperta mientras prueba el sistema. ¿Qué método es?','Método del conductor.','Evaluación heurística.','Logging.','Cuestionario pretest.','El conductor ayuda y descubre necesidades de información.'],
 [4,507,'¿Qué debe incluir un informe útil de una prueba de prestaciones?','Problemas, tiempos y valoraciones.','Solo el número de asistentes.','Solo una captura de la portada.','Solo la opinión del desarrollador.','El tema enumera datos cuantitativos y cualitativos.'],
 [4,513,'¿Por qué el coste influye en la elección de métodos?','Porque cambian recursos y objetivos.','Porque los métodos con usuarios siempre cuestan cero.','Porque la inspección nunca requiere expertos.','Porque el coste sustituye a la calidad de la evidencia.','El coste es un criterio de selección entre métodos.'],
 [4,514,'¿Qué método clasifica el temario como relativamente barato?','Evaluación heurística.','Grupo de discusión dirigido.','Medida de prestaciones.','Pensar en voz alta.','La tabla de coste sitúa la heurística en el grupo bajo.'],
 [4,515,'¿Cuándo concluye el tema que debe evaluarse la interfaz?','Durante todo el ciclo de vida.','Únicamente al final, antes de publicar.','Solo cuando falle el servidor.','Solo después de recibir quejas.','La evaluación acompaña todo el desarrollo.']
];
NUEVAS[9].push(...EXTRAS_9.map(([bloque,pagina,enunciado,correcta,a,b,c,explicacion]) =>
  [bloque,BLOQUES_NUEVOS[9][bloque],enunciado,[[correcta,explicacion],[a,explicacion],[b,explicacion],[c,explicacion]],pagina]));
const EXTRAS_10 = [
 [0,519,'Un equipo quiere hacer más fácil el trabajo, pero desconoce cómo piensan sus usuarios. ¿Qué debe estudiar primero?','El modelo mental y las tareas del usuario.','Solo el rendimiento del procesador.','Solo la identidad gráfica de la empresa.','Solo el número de ventanas del producto.','El diseño debe partir del usuario y su modelo mental.'],
 [0,522,'«Asistir al usuario» es una idea amplia. ¿Cómo la clasifica el tema?','Principio de diseño.','Directriz concreta.','Estándar de facto.','Componente CUA.','Los principios son ideas de alto nivel y aplicación general.'],
 [0,542,'«Mostrar ayuda contextual en cada opción» concreta una idea general. ¿Qué es?','Una directriz de diseño.','Un paradigma de interacción.','Una discapacidad cognoscitiva.','Una norma internacional obligatoria.','Las directrices traducen principios en recomendaciones operativas.'],
 [0,523,'Según Simpson, ¿quién debe conservar el control de la interacción?','Las personas usuarias.','Siempre el sistema de forma automática.','Solo el administrador técnico.','El fabricante del hardware.','Entre los principios de Simpson está dejar el control a los usuarios.'],
 [0,524,'Un diseño reduce pasos y evita exigir datos que ya conoce. ¿Qué principio de Preece aplica?','Reducir la carga cognitiva.','Aumentar el recuerdo de códigos.','Sustituir la evaluación por estética.','Eliminar todas las pistas visuales.','Preece propone reducir la carga cognitiva.'],
 [0,525,'¿Qué tres grupos de principios destaca Mandel?','Control, memoria y consistencia.','Velocidad de red, color y precio.','Normas ISO, CUA y Java.','Realidad virtual, voz y menús.','El tema organiza así los principios de Mandel.'],
 [0,529,'¿Qué tríada resume los principios de Dix?','Aprendizaje, flexibilidad y robustez.','Contraste, tipografía y color.','Inspección, indagación y test.','A, AA y AAA.','Dix agrupa los principios en esas tres categorías.'],
 [0,530,'Una guía de IBM pide que la interfaz resulte familiar y muestre claramente sus acciones. ¿Qué relación tiene con el tema?','Principios de diseño de IBM.','Son métricas de rendimiento de un test.','Son tipos de cuestionario postarea.','Son modos de una caja de diálogo.','IBM enumera familiaridad y evidencia entre sus principios.'],
 [1,544,'Una regla técnica se adopta en un país y otra en varios países. ¿Cómo clasifica el tema los estándares?','Pueden ser locales, nacionales o internacionales.','Solo existen estándares internacionales.','Solo se aplican a interfaces de texto.','Se clasifican por tamaño de pantalla.','El alcance geográfico es una clasificación del estándar.'],
 [1,544,'¿Qué es un estándar según el tema?','Regla basada en práctica y consenso.','Una preferencia personal de un diseñador.','Una pantalla de ejemplo sin criterios.','Una lista de errores de usuarios.','Los estándares formalizan características y prácticas compartidas.'],
 [1,545,'¿Para qué sirven los estándares en objetos y sistemas cotidianos?','Para definir características comunes.','Para impedir la evolución de todo producto.','Para sustituir toda evaluación con usuarios.','Para imponer una única marca.','La normalización reduce diferencias innecesarias.'],
 [1,546,'¿Qué objetivo se atribuye a estándares de interfaz?','Software más fácil y seguro.','Interfaces visualmente idénticas sin excepción.','Excluir tareas nuevas no previstas.','Suprimir toda guía de estilo.','Los requisitos mínimos ayudan a evitar inconsistencias y riesgos.'],
 [1,547,'Dos equipos usan el mismo vocabulario de interfaz. ¿Qué beneficio del estándar aprovechan?','Terminología común.','Eliminación de todas las diferencias de usuario.','Automatización de toda la programación.','Sustitución de manuales por código.','Un lenguaje compartido facilita comunicación y mantenimiento.'],
 [1,549,'Un comité reconocido aprueba una norma con procedimiento formal. ¿De qué tipo es?','Estándar de iure.','Estándar de facto.','Guía corporativa informal.','Preferencia de plataforma.','Los estándares de iure proceden de organismos con estatus reconocido.'],
 [1,550,'¿Qué organismo cita el tema entre los de normalización formal?','ISO.','Una tienda de aplicaciones.','Una comunidad de usuarios sin comité.','Un grupo de discusión dirigido.','ISO se cita entre los comités de estándares de iure.'],
 [1,551,'Un producto popular hace que su comportamiento se imite sin norma formal. ¿Qué surge?','Estándar de facto.','Estándar de iure automáticamente.','Ley internacional.','Evaluación heurística.','La adopción por éxito de mercado puede crear un estándar de facto.'],
 [1,552,'¿Cómo clasifica el temario ISO 9241 en IPO?','Estándar formal de iure.','Guía corporativa privada.','Patrón surgido solo por mercado.','Técnica de interrogación.','Se presenta entre los estándares de iure.'],
 [2,555,'Una familia de aplicaciones usa distintas posiciones para Guardar. ¿Qué documento ayuda a mantener consistencia?','Una guía de estilo compartida.','Un cuestionario pretest.','Un registro de errores del servidor.','Una paleta aleatoria por pantalla.','La guía orienta decisiones repetidas entre productos y partes.'],
 [2,556,'¿Qué dos clases de guías de estilo distingue el tema?','Comerciales y corporativas.','Visuales y auditivas solamente.','De iure y de facto exclusivamente.','Pretest y postest.','El tema separa guías de fabricantes y de organizaciones.'],
 [2,557,'Una guía publicada por un fabricante para su plataforma, ¿qué clase es?','Guía comercial de facto.','Norma de iure por definición.','Cuestionario de satisfacción.','Prueba de prestaciones.','Las guías comerciales suelen surgir de fabricantes.'],
 [2,562,'CUA fue publicado por IBM y Microsoft. ¿Qué significa su sigla?','Common User Access.','Computer Universal Audit.','Common Usability Analysis.','Central User Architecture.','La página 562 desarrolla la sigla CUA.'],
 [2,567,'Un programa Java adopta aspecto distinto según la plataforma. ¿Qué mecanismo ejemplifica?','Look and Feel.','Inspección de estándares.','Evaluación heurística.','Grabación del uso.','Java permite diferentes apariencias para el mismo programa.'],
 [2,571,'¿Qué pretende mantener CUA entre aplicaciones?','Componentes consistentes.','Exactamente el mismo contenido de datos.','La misma marca comercial siempre.','Una única resolución de pantalla.','CUA define elementos comunes de la interfaz.'],
 [2,573,'Una aplicación toma decisiones sin que la persona entienda qué ocurre. ¿Qué principio CUA falla?','Control del diálogo.','El sistema debe ocultar la ayuda.','Toda ventana debe ser modal.','El ratón debe ser obligatorio.','CUA sitúa el control del diálogo en la persona.'],
 [2,574,'En un escritorio con varias ventanas, ¿cuál es la ventana activa?','La que recibe el foco.','Todas las ventanas visibles a la vez.','La de mayor tamaño siempre.','La primera que se abrió.','CUA distingue la ventana que tiene el foco de interacción.'],
 [2,578,'Una caja obliga a terminar o cancelar antes de volver al resto. ¿Qué tipo es?','Diálogo modal.','Diálogo no modal.','Caja de mensajes permanente.','Ventana de ayuda contextual.','Un diálogo modal bloquea las demás acciones hasta resolverse.'],
 [2,578,'Una caja permite seguir trabajando en otras ventanas mientras está abierta. ¿Qué tipo es?','Diálogo no modal.','Diálogo modal.','Menú en cascada.','Campo de texto.','El diálogo no modal no bloquea el resto de la aplicación.'],
 [2,579,'Un cuadro muestra un aviso sin pedir datos. ¿Qué componente CUA representa?','Caja de mensajes.','Caja de lista.','Control de desplazamiento.','Grupo de botones de radio.','La caja de mensajes se usa para mostrar avisos.'],
 [3,580,'¿Qué dos operaciones básicas distingue CUA en la interacción?','Seleccionar y actuar.','Crear una ventana y cerrar el sistema.','Leer un manual y escribir un informe.','Elegir un color y una tipografía.','CUA separa selección del objeto y ejecución de acciones.'],
 [3,583,'El foco del teclado cambia, pero nada lo indica. ¿Qué criterio CUA falta?','Indicación del foco.','Un menú en cascada adicional.','Una ventana modal obligatoria.','Un nuevo estándar de facto.','El foco debe señalar qué elemento recibe la interacción.'],
 [3,584,'Un botón peligroso se parece a uno secundario. ¿Qué recurso CUA puede mejorar su reconocimiento?','Énfasis visual pertinente.','Ocultar su etiqueta.','Cambiar su función al pasar el ratón.','Eliminar la confirmación.','El énfasis destaca elementos relevantes de interacción.'],
 [3,587,'Guardar funciona de forma distinta en cada pantalla. ¿Qué principio CUA se pierde?','Consistencia de acciones.','Flexibilidad de idioma.','Contraste del texto.','Registro automático de uso.','Las acciones comunes deben reforzar el modelo conceptual.'],
 [3,588,'Una sola elección entre varias opciones excluyentes, ¿qué control CUA es pertinente?','Botones de radio.','Casillas de verificación independientes.','Barra de progreso.','Caja de mensajes.','Los botones de radio representan alternativas excluyentes.'],
 [3,590,'Una operación tarda y su resultado no llega de inmediato. ¿Qué componente orienta al usuario?','Indicador de progreso.','Botón de radio.','Menú en cascada adicional.','Campo de texto vacío.','El indicador comunica el avance de la acción.'],
 [3,591,'¿Qué tecla de ayuda menciona CUA como acceso habitual?','F1.','Esc como única opción.','Ctrl+Z.','Mayús como única opción.','CUA menciona F1 y controles de ayuda.'],
 [4,592,'¿Por qué una guía de web no puede copiar sin más una guía de escritorio?','La Web tiene navegación propia.','Porque ninguna regla de diseño se comparte.','Porque todos los usuarios web usan ratón.','Porque la web no necesita consistencia.','El tema indica diferencias entre web e interfaces tradicionales.'],
 [4,594,'¿Qué iniciativa del W3C orienta la accesibilidad web?','WAI.','CUA.','CDE.','OpenLook.','WAI es la iniciativa de accesibilidad del W3C.'],
 [4,595,'¿Qué guía web del W3C estudia contenido accesible?','WCAG.','CUA.','Java Look and Feel.','ISO/IEC 9126 únicamente.','WCAG proporciona pautas para contenido web accesible.'],
 [4,597,'Una empresa quiere que todos sus productos compartan estilo. ¿Qué guía necesita?','Guía corporativa.','Cuestionario postest.','Solo guía comercial ajena.','Test retrospectivo.','Las guías corporativas unifican productos de una organización.'],
 [4,600,'¿Por qué aplicar una guía no basta para garantizar una interfaz usable?','Hay que evaluar tareas y usuarios.','Porque toda guía es incorrecta por definición.','Porque solo importan las preferencias del diseñador.','Porque la consistencia impide aprender.','El tema advierte que las guías son base, no garantía.'],
 [4,601,'¿Qué beneficio común tienen estándares y guías en la conclusión?','Facilitan aprender y reducen errores.','Eliminan la necesidad de diseño.','Prohíben toda evolución de la interfaz.','Imponen una única tecnología.','La consistencia ayuda a transferir conocimientos entre interfaces.']
];
NUEVAS[10].push(...EXTRAS_10.map(([bloque,pagina,enunciado,correcta,a,b,c,explicacion]) =>
  [bloque,BLOQUES_NUEVOS[10][bloque],enunciado,[[correcta,explicacion],[a,explicacion],[b,explicacion],[c,explicacion]],pagina]));
if (typeof BANCO_GLOBAL !== 'undefined') {
  let nextId = Math.max(0, ...BANCO_GLOBAL.map(q => q.globalId || 0)) + 1;
  Object.entries(NUEVAS).forEach(([tema, preguntas]) => preguntas.forEach(([bloque,,enunciado,opciones,pagina]) => {
    BANCO_GLOBAL.push({globalId:nextId++, tema:String(tema), temaTitulo:`Tema ${tema} · ${TITULOS[tema]}`,
      bloqueIndex:bloque, bloqueNombre:BLOQUES_NUEVOS[tema][bloque], pagina:pagina ?? null, enunciado,
      opciones:opciones.map(([texto,explicacion],i)=>({texto,explicacion,correcta:i===0}))});
  }));
}
