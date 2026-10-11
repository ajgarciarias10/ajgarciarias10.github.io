/* Preguntas de aplicación para temas 5–10. Se habilitan en Practicar cuando
   comienza la primera clase de cada tema, según curso.js. */
'use strict';
const TITULOS = {5:'Internacionalización y localización',6:'Diseño gráfico',7:'Estilos y paradigmas',8:'Accesibilidad',9:'Evaluación',10:'Estándares y guías de estilo'};
const NUEVAS = {
5:[
[0,'Internacionalización y localización','Una app separa los textos de la lógica, admite fechas y monedas configurables y reserva espacio para textos más largos. Luego se traduce al japonés y se adaptan sus convenciones. ¿Qué relación describe mejor el trabajo?',[
['La preparación del software es internacionalización; la adaptación al japonés es localización.','i18n permite adaptar sin reescribir la lógica; l10n adapta el producto a una cultura concreta.'],
['Ambas tareas son localización porque incluyen idioma.','Preparar la arquitectura para más de una cultura corresponde a internacionalización.'],
['Ambas tareas son internacionalización porque el producto se distribuye en varios países.','La adaptación final de idioma y convenciones es localización.'],
['La traducción es internacionalización y el espacio flexible es localización.','La relación está invertida: traducción es parte de l10n.']]],
[0,'Internacionalización y localización','Une cada decisión con su propósito: separar cadenas y evitar fechas fijas en código; cambiar el separador decimal al formato local. ¿Cuál es la correspondencia correcta?',[
['Preparar el software para varios entornos es i18n; adaptar el formato para un entorno es l10n.','La primera decisión prepara el sistema; la segunda aplica una convención local.'],
['Ambas son l10n porque afectan a lo que ve el usuario.','Evitar formatos fijos en código es una decisión de internacionalización.'],
['La primera es traducción; la segunda, accesibilidad.','Ninguna decisión se refiere necesariamente a traducir texto o a accesibilidad.'],
['La primera es l10n y la segunda i18n.','Se han intercambiado la preparación general y la adaptación concreta.']]],
[1,'Internacionalización y localización','Una interfaz en árabe traduce correctamente todos los textos, pero conserva la navegación izquierda-derecha y corta las etiquetas que ahora ocupan más espacio. ¿Qué conclusión está mejor fundada?',[
['La traducción no basta: la localización debe considerar dirección de lectura y expansión del texto.','Los formatos, la direccionalidad y el espacio también varían según el entorno.'],
['La internacionalización se completó porque el texto ya está traducido.','La traducción por sí sola no prepara ni adapta toda la interfaz.'],
['Solo hay que aumentar el tamaño de fuente; la dirección visual no cambia.','Para RTL debe adaptarse la dirección y disposición cuando el contenido lo requiera.'],
['Es un problema de contraste, no de localización.','El caso describe dirección y ajuste del contenido, no contraste.']]],
[1,'Internacionalización y localización','Un equipo reemplaza una imagen de una mano por otra porque el gesto tiene sentidos distintos en dos culturas. ¿En qué fase encaja mejor esa decisión?',[
['Localización: adapta un elemento cultural del producto a un público concreto.','Iconografía y convenciones culturales son parte de la adaptación local.'],
['Internacionalización: elimina toda imagen del sistema.','No es necesario eliminar imágenes; i18n prepara el producto para poder adaptarlas.'],
['Traducción literal: cambia el texto sin tocar la imagen.','La decisión trata de significado cultural de la iconografía.'],
['Accesibilidad: hace que el gesto se pueda usar con teclado.','El caso no describe un problema de operación o percepción accesible.']]],
[2,'Internacionalización y localización','Una fecha se guarda como un instante normalizado y se muestra según la región del usuario. ¿Qué ventaja de diseño expresa mejor?',[
['Separa la representación interna de la convención local de presentación.','Así se evitan supuestos de formato incrustados en la lógica.'],
['Obliga a guardar una fecha distinta para cada idioma.','Una misma fecha puede formatearse de varias maneras sin duplicar el dato.'],
['Convierte la localización en una traducción automática.','El formato de fecha es una convención local, no una traducción.'],
['Garantiza que todos los países usan el mismo orden de día y mes.','Precisamente se contemplan convenciones diferentes.']]]
],
6:[
[0,'Principios de Gestalt','En una pantalla hay cuatro avisos. Los usuarios agrupan los dos más cercanos aunque tengan colores distintos. ¿Qué principio explica mejor esa agrupación?',[
['Proximidad: la distancia reducida hace que los elementos se perciban como relacionados.','La cercanía espacial favorece la agrupación.'],
['Semejanza: elementos cercanos siempre comparten aspecto.','El enunciado indica que el color difiere; domina la proximidad.'],
['Cierre: el usuario completa una forma incompleta.','No hay una forma incompleta que completar.'],
['Continuidad: el ojo sigue una línea común.','No se describe una trayectoria alineada.']]],
[0,'Principios de Gestalt','Relaciona el efecto con el principio: agrupación por aspecto común; agrupación por cercanía. ¿Qué pareja es correcta?',[
['Aspecto común → semejanza; cercanía → proximidad.','Cada principio describe una señal distinta para percibir agrupaciones.'],
['Aspecto común → proximidad; cercanía → cierre.','Ambas asociaciones asignan un principio que no explica el efecto descrito.'],
['Aspecto común → continuidad; cercanía → semejanza.','Continuidad trata de seguir trayectorias; semejanza, de compartir rasgos.'],
['Aspecto común → cierre; cercanía → continuidad.','Cierre y continuidad no describen esos dos efectos.']]],
[1,'Principios de Gestalt','Un icono muestra solo varios segmentos del contorno de una taza, pero las personas perciben una taza completa. ¿Qué principio explica mejor esa percepción?',[
['Cierre: la percepción completa una forma con partes ausentes.','La mente organiza los segmentos y percibe el objeto como una figura completa.'],
['Continuidad: el ojo sigue una trayectoria a través del icono.','El caso trata de completar una forma, no de seguir una línea.'],
['Proximidad: los puntos cercanos forman un grupo.','El juicio trata de la trayectoria, no de agrupar puntos por distancia.'],
['Semejanza: dos líneas de color parecido se agrupan.','El caso no depende de compartir color o forma.']]],
[1,'Principios de Gestalt','Un estado se indica solo con rojo o verde. ¿Qué cambio mejora más la comunicación sin abandonar el color?',[
['Añadir texto o un icono distinguible para transmitir el mismo estado por otro canal.','El color nunca debería ser la única señal; redundar la información ayuda a más personas.'],
['Usar un rojo más saturado para que nadie lo confunda.','Sigue dependiendo exclusivamente del color.'],
['Añadir más tonos intermedios para representar más estados.','Aumenta la carga de distinguir colores y no resuelve la dependencia.'],
['Quitar toda etiqueta para que el usuario interprete el contexto.','Reduce la información explícita y mantiene la ambigüedad.']]],
[2,'Principios de Gestalt','Un icono y su etiqueta se colocan lejos de la acción que controlan; otro bloque agrupa opciones por color aunque su función no esté relacionada. ¿Qué revisión sigue mejor los principios de agrupación?',[
['Acercar cada etiqueta a su control y usar semejanza solo entre elementos que comparten función.','La proximidad y la semejanza deben apoyar relaciones reales.'],
['Aplicar el mismo color a todos los controles, aunque tengan funciones distintas.','La uniformidad puede crear agrupaciones engañosas.'],
['Separar todas las opciones a distancias iguales para evitar agrupaciones.','La distancia también comunica; eliminar la agrupación dificulta entender relaciones.'],
['Cambiar proximidad por animación en todos los controles.','La animación no responde al problema de relación espacial descrito.']]]
],
7:[
[0,'Estilos y paradigmas','Un cajero ofrece elegir una operación de una lista y solicita los datos en campos. Otro sistema permite arrastrar directamente un archivo a una papelera visible. ¿Qué comparación es correcta?',[
['Lista y campos son estilos de interacción; arrastrar a una papelera es manipulación directa.','Los estilos describen el diálogo; el segundo caso actúa directamente sobre objetos representados.'],
['Los tres son paradigmas porque describen dispositivos físicos.','Menús y formularios son estilos; no son paradigmas por sí solos.'],
['Arrastrar es un paradigma móvil y los campos, ubicuos.','No se describe el modelo de interacción o contexto que definen esos paradigmas.'],
['El menú es manipulación directa porque permite elegir una opción.','Elegir una orden en un menú no manipula directamente el objeto del dominio.']]],
[0,'Estilos y paradigmas','Una persona experta memoriza una orden de texto; una principiante prefiere escoger la misma acción en un menú. ¿Qué conclusión de diseño es más equilibrada?',[
['Los estilos pueden favorecer perfiles distintos; conviene valorar el contexto y la experiencia.','Comandos pueden ser eficientes para expertos; los menús facilitan reconocer opciones.'],
['Los comandos son siempre mejores porque requieren menos espacio.','La eficiencia depende del aprendizaje, la frecuencia y el contexto.'],
['Los menús son siempre mejores porque no requieren aprender nada.','También exigen reconocer y recorrer opciones.'],
['La interfaz debería ocultar uno de los estilos sin evaluar a sus usuarios.','La elección necesita atender a las necesidades observadas.']]],
[1,'Estilos y paradigmas','Una app usa formularios tanto en móvil como en escritorio. ¿Qué dato permitiría clasificarla como paradigma móvil?',[
['El modelo conceptual de interacción y uso en movilidad, no la presencia aislada de un formulario.','Estilo y paradigma responden a niveles diferentes; el formulario no determina el paradigma.'],
['Que cada formulario tenga un botón azul.','El color es una decisión visual, no un paradigma.'],
['Que la app esté escrita con un lenguaje específico.','La tecnología interna no define el modelo conceptual de interacción.'],
['Que los campos tengan etiquetas.','Las etiquetas son una decisión del estilo formulario.']]],
[1,'Estilos y paradigmas','Una acción destructiva se ejecuta al instante al tocar un objeto y no se muestra resultado ni opción para deshacer. ¿Qué propiedad asociada a manipulación directa está peor resuelta?',[
['La visibilidad del estado y la posibilidad de revertir acciones.','La manipulación directa suele mostrar objetos y resultados inmediatos, con acciones reversibles cuando es posible.'],
['La cantidad de comandos que la persona debe memorizar.','No se describen órdenes ocultas o vocabulario de comandos.'],
['La consistencia del estándar de plataforma exclusivamente.','El problema inmediato es falta de feedback y control.'],
['La personalización del idioma.','El caso no describe idioma ni convenciones locales.']]],
[2,'Estilos y paradigmas','Un diseñador dice «menú» y «paradigma ubicuo» como si fueran categorías del mismo nivel. ¿Qué corrección ayuda a analizarlos?',[
['El menú es un estilo de diálogo; ubicuo es un paradigma sobre interacción integrada en distintos contextos.','Un nivel describe cómo se dan órdenes; el otro, un modelo conceptual más amplio.'],
['Ambos son estilos porque aparecen en la interfaz.','Ubicuo describe un paradigma, no un control visual.'],
['Ambos son paradigmas porque organizan información.','Un menú es una forma concreta de interacción.'],
['Menú es un paradigma y ubicuo un dispositivo.','Se confunden la técnica de diálogo y el modelo de uso.']]]
],
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
['Evaluación heurística y recorrido cognitivo.','La primera inspecciona principios; el segundo analiza si una persona puede aprender pasos sin ayuda.'],
['Test de usabilidad y evaluación heurística.','El test requiere usuarios realizando tareas y observación de su uso.'],
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
let nextId = Math.max(0, ...BANCO_GLOBAL.map(q => q.globalId || 0)) + 1;
Object.entries(NUEVAS).forEach(([tema, preguntas]) => preguntas.forEach(([bloque,bloqueNombre,enunciado,opciones]) => {
  BANCO_GLOBAL.push({globalId:nextId++, tema:String(tema), temaTitulo:`Tema ${tema} · ${TITULOS[tema]}`, bloqueIndex:bloque, bloqueNombre, pagina:null, enunciado,
    opciones:opciones.map(([texto,explicacion],i)=>({texto,explicacion,correcta:i===0}))});
}));
