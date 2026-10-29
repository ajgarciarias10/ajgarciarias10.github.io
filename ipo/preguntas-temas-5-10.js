/* Preguntas de aplicación para temas 8–10 (los temas 5, 6 y 7 tienen banco propio en
   preguntas-tema-5.js, preguntas-tema-6.js y preguntas-tema-7.js, copiados en preguntas-globales.js). Se habilitan en Practicar cuando
   comienza la primera clase de cada tema, según curso.js. */
'use strict';
const TITULOS = {5:'Internacionalización y localización',6:'Diseño gráfico',7:'Estilos y paradigmas',8:'Accesibilidad',9:'Evaluación',10:'Estándares y guías de estilo'};
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
