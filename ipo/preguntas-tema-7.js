/* Tema VII, IPO2627.pdf, páginas 350–406 (Estilos y paradigmas). Cada opción incluye su justificación.
   La primera opción de cada pregunta es la correcta; test.js baraja las cuatro opciones.
   Las cinco primeras preguntas proceden de preguntas-temas-5-10.js y conservan su enunciado para mantener el progreso. */
const BLOQUES = ['Interacción y línea de órdenes', 'Menús y voz', 'Manipulación directa', 'Interacción asistida', 'Paradigmas de interacción'];
const BANCO = [
  [2,370,'Un cajero ofrece elegir una operación de una lista y solicita los datos en campos. Otro sistema permite arrastrar directamente un archivo a una papelera visible. ¿Qué comparación es correcta?',[
    ['Lista y campos son estilos de interacción; arrastrar a una papelera es manipulación directa.','Los estilos describen el diálogo; el segundo caso actúa directamente sobre objetos representados.'],
    ['Los tres son paradigmas porque describen dispositivos físicos.','Menús y formularios son estilos; no son paradigmas por sí solos.'],
    ['Arrastrar es un paradigma móvil y los campos, ubicuos.','No se describe el modelo de interacción o contexto que definen esos paradigmas.'],
    ['El menú es manipulación directa porque permite elegir una opción.','Elegir una orden en un menú no manipula directamente el objeto del dominio.']]],
  [0,358,'Una persona experta memoriza una orden de texto; una principiante prefiere escoger la misma acción en un menú. ¿Qué conclusión de diseño es más equilibrada?',[
    ['Los estilos pueden favorecer perfiles distintos; conviene valorar el contexto y la experiencia.','Comandos pueden ser eficientes para expertos; los menús facilitan reconocer opciones.'],
    ['Los comandos son siempre mejores porque requieren menos espacio.','La eficiencia depende del aprendizaje, la frecuencia y el contexto.'],
    ['Los menús son siempre mejores porque no requieren aprender nada.','También exigen reconocer y recorrer opciones.'],
    ['La interfaz debería ocultar uno de los estilos sin evaluar a sus usuarios.','La elección necesita atender a las necesidades observadas.']]],
  [4,382,'Una app usa formularios tanto en móvil como en escritorio. ¿Qué dato permitiría clasificarla como paradigma móvil?',[
    ['El modelo conceptual de interacción y uso en movilidad, no la presencia aislada de un formulario.','Estilo y paradigma responden a niveles diferentes; el formulario no determina el paradigma.'],
    ['Que cada formulario tenga un botón azul.','El color es una decisión visual, no un paradigma.'],
    ['Que la app esté escrita con un lenguaje específico.','La tecnología interna no define el modelo conceptual de interacción.'],
    ['Que los campos tengan etiquetas.','Las etiquetas son una decisión del estilo formulario.']]],
  [2,370,'Una acción destructiva se ejecuta al instante al tocar un objeto y no se muestra resultado ni opción para deshacer. ¿Qué propiedad asociada a manipulación directa está peor resuelta?',[
    ['La visibilidad del estado y la posibilidad de revertir acciones.','La manipulación directa suele mostrar objetos y resultados inmediatos, con acciones reversibles cuando es posible.'],
    ['La cantidad de comandos que la persona debe memorizar.','No se describen órdenes ocultas o vocabulario de comandos.'],
    ['La consistencia del estándar de plataforma exclusivamente.','El problema inmediato es falta de feedback y control.'],
    ['La personalización del idioma.','El caso no describe idioma ni convenciones locales.']]],
  [4,382,'Un diseñador dice «menú» y «paradigma ubicuo» como si fueran categorías del mismo nivel. ¿Qué corrección ayuda a analizarlos?',[
    ['El menú es un estilo de diálogo; ubicuo es un paradigma sobre interacción integrada en distintos contextos.','Un nivel describe cómo se dan órdenes; el otro, un modelo conceptual más amplio.'],
    ['Ambos son estilos porque aparecen en la interfaz.','Ubicuo describe un paradigma, no un control visual.'],
    ['Ambos son paradigmas porque organizan información.','Un menú es una forma concreta de interacción.'],
    ['Menú es un paradigma y ubicuo un dispositivo.','Se confunden la técnica de diálogo y el modelo de uso.']]],

  [0,354,'¿Qué es un estilo de interacción según el tema?',[
    ['El término genérico que agrupa las diferentes maneras en que los usuarios se comunican o interaccionan con el ordenador (Preece, 1994).','Es la definición de la página 354.'],
    ['Todos los intercambios entre la persona y el ordenador.','Esa es la definición de interacción (Baecker y Buxton, 1987).'],
    ['El uso simultáneo de varios canales de comunicación.','Esa es la interacción multimodal.'],
    ['El modelo del que se derivan todos los sistemas de interacción.','Esa es la definición de paradigma (p. 382).']]],
  [0,354,'Un sistema del coche permite dar una orden por voz mientras se señala un punto en la pantalla táctil. ¿Cómo se denomina esta interacción?',[
    ['Interacción multimodal: usa múltiples canales de comunicación simultáneamente.','La página 354 la define así.'],
    ['Interfaz por línea de órdenes.','No se escriben órdenes de texto.'],
    ['Realidad virtual.','No hay un entorno 3D con sensación de presencia.'],
    ['Interacción asistida.','No interviene un agente que colabore con el usuario.']]],
  [0,353,'¿Qué secuencia refleja la evolución de la interacción que presenta el tema?',[
    ['Texto con teclado y pantalla, menús y navegación, manipulación directa y nuevos paradigmas (RV, computación ubicua, RA).','Es la evolución de la página 353.'],
    ['Realidad aumentada, menús, línea de órdenes y manipulación directa.','El orden no se corresponde con la evolución.'],
    ['Manipulación directa, texto y realidad virtual.','El texto fue el primer estilo de uso generalizado.'],
    ['Computación ubicua, menús y línea de órdenes.','La computación ubicua es un paradigma reciente.']]],
  [0,357,'¿Qué caracteriza a la interfaz por línea de órdenes?',[
    ['Fue el primer estilo de uso generalizado y consiste en dar instrucciones mediante palabras, abreviaturas, caracteres o teclas de función.','Es la descripción de la página 357.'],
    ['Se basa en arrastrar objetos visibles con un dispositivo apuntador.','Eso es manipulación directa.'],
    ['Ya no se usa en ningún sistema actual.','El tema dice que todavía hoy está en uso.'],
    ['Requiere que un agente interprete las intenciones del usuario.','Las órdenes se dan directamente.']]],
  [0,357,'Comparando «copy», «cp» y «Ctrl+Z», ¿qué compromiso señala el tema?',[
    ['Las palabras enteras son más fáciles de recordar y las abreviaturas o teclas, más rápidas de ejecutar.','La página 357 lo muestra con esos ejemplos.'],
    ['Las abreviaturas son más fáciles de recordar y más lentas.','La relación está invertida.'],
    ['Todas las formas son igual de rápidas y fáciles de recordar.','El tema distingue entre recordar y ejecutar.'],
    ['Las teclas de función no se usan en la línea de órdenes.','Son una de las formas citadas.']]],
  [0,358,'Un administrador aplica una orden con opciones a cientos de archivos a la vez y la guarda como macro. ¿Qué ventajas de la línea de órdenes aprovecha?',[
    ['Flexibilidad, aplicación a muchos objetos a la vez y capacidad para hacer macros.','Son ventajas de la página 358.'],
    ['Indicación visual de la orden necesaria.','El tema cita su ausencia como desventaja.'],
    ['Buena gestión de errores.','La gestión de errores es pobre.'],
    ['Que no requiere memorización.','Requiere gran memorización y entrenamiento.']]],
  [0,358,'Un usuario novel no sabe qué escribir en una terminal y recibe un error poco claro. ¿Qué desventajas del estilo ilustra?',[
    ['No hay indicación visual de la orden necesaria y la gestión de errores es pobre.','Son desventajas de la página 358.'],
    ['Que ocupa demasiado espacio en la interfaz.','Esa desventaja corresponde a los menús.'],
    ['Que se necesitan muchos recursos gráficos.','Es un problema de la manipulación directa.'],
    ['Que produce cansancio por el casco.','Es un problema de la realidad virtual.']]],

  [1,359,'¿Cuántas opciones considera ideales el tema para un menú?',[
    ['Entre 3 y 8.','Es el número ideal de la página 359.'],
    ['Entre 10 y 20.','Superaría el rango recomendado.'],
    ['Una sola opción.','Un menú es un conjunto de opciones.'],
    ['Tantas como funciones tenga la aplicación.','El tema propone estructurarlos jerárquicamente con pocas opciones.']]],
  [1,360,'Usuarios expertos se quejan de que recorrer los menús es lento. ¿Qué solución da el tema?',[
    ['Ofrecer atajos de teclado.','La página 360 propone esa solución.'],
    ['Eliminar los menús desplegables.','Los desplegables solucionan el problema del espacio.'],
    ['Pasar toda la interfaz a realidad virtual.','No es la solución propuesta.'],
    ['Aumentar el número de opciones por menú.','No resuelve la lentitud.']]],
  [1,360,'¿Qué ventajas de los menús recoge el tema?',[
    ['Entrenamiento reducido, menos tecleo, uso de herramientas de gestión de diálogos y toma de decisión estructurada.','Son las ventajas de la página 360.'],
    ['Acceso directo a la funcionalidad y capacidad de macros.','Son ventajas de la línea de órdenes.'],
    ['Simulaciones imposibles en otro estilo.','Es el beneficio de la realidad virtual.'],
    ['Ocupan poco espacio en la interfaz.','El tema dice que ocupan mucho.']]],
  [1,361,'Un sistema de dictado necesita entrenarse con la voz de cada usuario y no exige pausas entre palabras. ¿Cómo se clasifica?',[
    ['Reconocimiento de voz continua dependiente del que habla.','La página 361 define ambas categorías.'],
    ['Reconocimiento de palabras aisladas independiente del que habla.','Exigiría pausas y no necesitaría entrenamiento.'],
    ['Síntesis por reglas.','La síntesis genera voz, no la reconoce.'],
    ['Verificación de la persona que habla.','Su objetivo es comprobar la identidad, no transcribir.']]],
  [1,362,'Un sistema de megafonía une palabras grabadas para formar avisos y suena con una entonación poco natural. ¿Qué técnica usa y qué problema presenta?',[
    ['Síntesis por concatenación; su problema es la entonación.','La página 362 lo señala.'],
    ['Síntesis por reglas; su problema es el vocabulario limitado.','La síntesis por reglas permite un vocabulario indefinido.'],
    ['Reconocimiento continuo; su problema son las pausas.','No reconoce voz, la genera.'],
    ['Identificación por voz; su problema es la privacidad.','No identifica a ninguna persona.']]],
  [1,362,'¿Por qué la síntesis por reglas puede articular un vocabulario indefinido?',[
    ['Porque utiliza fonemas, el bloque básico de una palabra, controlados por reglas.','La página 362 lo explica.'],
    ['Porque graba todas las palabras posibles.','Esa es la concatenación, y no permite un vocabulario indefinido.'],
    ['Porque usa directamente voz humana.','No utiliza voz humana directamente.'],
    ['Porque se entrena con la voz de cada usuario.','El entrenamiento corresponde al reconocimiento dependiente del hablante.']]],
  [1,363,'¿En qué situación es especialmente útil la síntesis de voz?',[
    ['Con los ojos libres o cuando la visualización no es práctica, como oír el correo electrónico por teléfono.','Son aplicaciones de la página 363.'],
    ['Para dibujar diagramas de precisión.','No es una aplicación citada.'],
    ['Para editar una hoja de cálculo extensa con el ratón.','No requiere síntesis de voz.'],
    ['Para sustituir siempre a la pantalla.','Se usa en situaciones concretas.']]],
  [1,364,'Un banco permite acceder a la cuenta diciendo «mi voz es mi contraseña». ¿Qué uso de la voz es?',[
    ['Verificación de la persona que habla.','La página 364 usa ese ejemplo.'],
    ['Síntesis de voz por concatenación.','No genera voz.'],
    ['Dictado de informes.','No transcribe texto.'],
    ['Sonido musical.','No usa la música como elemento de interacción.']]],
  [1,365,'¿Qué cambio señala el tema en la comprensión del lenguaje natural entre sistemas antiguos y actuales?',[
    ['De vocabulario limitado y dominio restringido a vocabulario extenso y modelos de propósito general (LLM, IA generativa).','Es la comparación de la página 365.'],
    ['De vocabulario extenso a vocabulario limitado.','La evolución es la contraria.'],
    ['De modelos generales a dominios restringidos.','También está invertido.'],
    ['Ninguno: los sistemas actuales son iguales a los antiguos.','El tema destaca la evolución.']]],
  [1,367,'Una alarma de fábrica debe avisar a operarios con la vista ocupada. ¿Qué indica el tema sobre el uso del sonido?',[
    ['Es importante cuando los ojos están ocupados y debe guardar relación con lo que representa.','La página 367 lo indica.'],
    ['El sonido debe ser aleatorio para llamar la atención.','Debe guardar relación con lo que representa.'],
    ['El sonido nunca debe usarse en interfaces.','El tema lo considera útil.'],
    ['Solo puede usarse música, nunca sonidos naturales.','El tema cita sonidos naturales y musicales.']]],
  [1,369,'¿Qué problemas presenta el lenguaje natural según el tema?',[
    ['Diferencias de lenguaje, argot y voces, posibles diálogos de aclaración e interfaces todavía no inteligentes.','Son los problemas de la página 369.'],
    ['Exige memorizar órdenes y sintaxis.','Uno de sus beneficios es el conocimiento del propio lenguaje.'],
    ['Obliga a usar las manos.','Permite manos libres.'],
    ['Necesita pantallas de alta resolución.','Es un requisito de la manipulación directa.']]],

  [2,370,'¿Qué características de la manipulación directa recoge el tema (Shneiderman)?',[
    ['Representación continua de los objetos, manipulación en lugar de sintaxis compleja y acciones rápidas, incrementales y reversibles con efecto visible inmediato.','Son las características de la página 370.'],
    ['Órdenes escritas con abreviaturas y teclas de función.','Corresponde a la línea de órdenes.'],
    ['Un agente que actúa por propia iniciativa.','Corresponde a la interacción asistida.'],
    ['Información superpuesta al mundo real.','Corresponde a la realidad aumentada.']]],
  [2,370,'¿Qué significan las siglas WIMP, el entorno más común de manipulación directa?',[
    ['Windows, Icons, Menus, Pointers.','La página 370 las desarrolla así.'],
    ['Wireless, Internet, Mobile, Phone.','No es el significado del tema.'],
    ['Words, Instructions, Macros, Programs.','Se parece más a la línea de órdenes.'],
    ['Wearables, IoT, Mobile, Personal.','Son términos de la computación ubicua.']]],
  [2,370,'¿Qué hizo posible la manipulación directa y en qué sistemas tiene su origen?',[
    ['Las pantallas gráficas de alta resolución y los dispositivos apuntadores; Xerox Star y Apple Macintosh.','La página 370 lo indica.'],
    ['Los LLM y la IA generativa; Knowledge Navigator.','Se asocian al lenguaje natural.'],
    ['Las redes 5G; Xerox PARC en 1991.','Se asocian a la computación ubicua.'],
    ['Los cascos de visualización; la Cueva.','Corresponden a la realidad virtual.']]],
  [2,371,'¿Qué beneficios atribuye el tema a la manipulación directa?',[
    ['Los nuevos usuarios aprenden rápido, los expertos trabajan rápido, se ve enseguida el resultado y las acciones son reversibles.','Son los beneficios de la página 371.'],
    ['Requiere menos recursos que cualquier otro estilo.','El tema dice que necesita más recursos.'],
    ['Permite describir cualquier tarea mediante objetos concretos.','No todas las tareas pueden describirse así.'],
    ['El usuario delega las tareas en un agente.','Eso es interacción asistida.']]],
  [2,371,'Un programa quiere representar «aplicar un filtro a todos los registros de 2019 con importe superior a 500 €» solo arrastrando objetos. ¿Qué problema de la manipulación directa aparece?',[
    ['No todas las tareas pueden describirse con objetos concretos ni todas las acciones se pueden hacer directamente.','Son problemas de la página 371.'],
    ['Que las acciones no son reversibles.','La reversibilidad es un beneficio.'],
    ['Que el usuario no ve el resultado.','El resultado es visible de inmediato.'],
    ['Que necesita una red 5G.','No guarda relación con la manipulación directa.']]],

  [3,373,'¿Qué motiva la aparición de la interacción asistida según el tema?',[
    ['La manipulación directa exige explicitar todas las tareas y controlar todos los eventos, y el número creciente de nuevos usuarios pide otra forma de interactuar.','Es el razonamiento de la página 373.'],
    ['Que la línea de órdenes ya no se usa.','No es la motivación citada.'],
    ['Que las pantallas gráficas son demasiado caras.','No es la motivación citada.'],
    ['Que el usuario quiere controlar todos los eventos.','Precisamente se busca reducir ese esfuerzo.']]],
  [3,373,'En la interacción asistida, ¿qué papel tiene el usuario?',[
    ['No dirige la interacción: coopera con uno o varios agentes, lo que reduce su esfuerzo.','La página 373 lo describe así.'],
    ['Dirige cada evento como en la manipulación directa.','Ese es el rasgo que la interacción asistida cambia.'],
    ['Escribe todas las órdenes con la sintaxis exacta.','Eso es la línea de órdenes.'],
    ['No participa en absoluto.','Trabaja de forma cooperativa con el agente.']]],
  [3,374,'Un programa revisa en segundo plano el correo y, sin que se lo pidan, avisa de una reunión que choca con otra. ¿Qué es según el tema?',[
    ['Un agente: discreto, trabaja en segundo plano y actúa por propia iniciativa cuando encuentra información relevante.','La página 374 define así al agente.'],
    ['Un asistente, porque lo activa el usuario.','Aquí no lo ha activado el usuario.'],
    ['Una interfaz por línea de órdenes.','No se escribe ninguna orden.'],
    ['Un paradigma de realidad aumentada.','No superpone información al mundo real.']]],
  [3,374,'Según Maes (1994), ¿qué relación tiene el usuario con un agente?',[
    ['El usuario no ordena, delega tareas en el agente.','Es la idea citada en la página 374.'],
    ['El usuario programa cada paso del agente.','El agente actúa con autonomía.'],
    ['El agente solo ejecuta órdenes explícitas.','Puede actuar sin instrucciones explícitas.'],
    ['El usuario ve al agente como una herramienta.','Lo ve como un asistente que le ayuda.']]],
  [3,375,'Un agente propone una carpeta para un correo; el usuario elige otra y el agente no vuelve a insistir y aprende de ello. ¿Qué característica muestra?',[
    ['Uso personal: se adapta y aprende del usuario y no insiste si este decide otra solución.','La página 375 la describe así.'],
    ['Autonomía, porque trabaja con la pantalla apagada.','La autonomía es trabajar en segundo plano observando.'],
    ['Programabilidad de la aplicación.','Es una propiedad de la aplicación, no del agente.'],
    ['Manipulación directa.','No se manipula ningún objeto.']]],
  [3,377,'Una aplicación ofrece una API para que un agente externo pueda llamar a sus órdenes. ¿Qué propiedad cumple?',[
    ['Es programable.','La página 377 define así la aplicación programable.'],
    ['Es controlable.','Controlable significa informar al agente de qué función pide el usuario.'],
    ['Es examinable.','Examinable significa que se pueden revisar sus estructuras de datos.'],
    ['Es ubicua.','La ubicuidad es un paradigma, no una propiedad de integración.']]],
  [3,377,'Una aplicación avisa a un agente externo cada vez que el usuario usa una función por menú, icono o teclado. ¿Qué propiedad cumple?',[
    ['Es controlable.','La página 377 define así la aplicación controlable.'],
    ['Es programable.','Programable significa que el agente puede llamar a las órdenes.'],
    ['Es examinable.','Examinable implica revisar sus estructuras de datos.'],
    ['Es multimodal.','No describe varios canales de comunicación.']]],
  [3,379,'¿Qué diferencia principal hay entre un asistente y un agente según el tema?',[
    ['El asistente lo activa el usuario; el agente es más discreto y actúa por propia iniciativa.','Las páginas 374 y 379 lo distinguen así.'],
    ['El agente lo activa el usuario; el asistente actúa solo.','La relación está invertida.'],
    ['Ninguno de los dos puede aprender del usuario.','Ambos pueden aprender.'],
    ['El asistente solo entiende órdenes escritas con sintaxis exacta.','Entiende palabras escritas o habladas y acciones gráficas.']]],

  [4,382,'¿Qué son los paradigmas de interacción y cuáles son los actuales según el tema?',[
    ['Los modelos de los que se derivan todos los sistemas de interacción: sobremesa, realidad virtual, computación ubicua y realidad aumentada.','Es la definición de la página 382.'],
    ['Las formas de dar órdenes: menús, voz y línea de órdenes.','Son estilos de interacción.'],
    ['Los dispositivos de entrada: ratón, teclado y micrófono.','No son paradigmas.'],
    ['Las propiedades programable, controlable y examinable.','Son propiedades para integrar agentes.']]],
  [4,384,'¿Qué condiciones deben darse para hablar de realidad virtual?',[
    ['Sensación de presencia física mediante indicaciones sensoriales, que estas sean en tres dimensiones e interacción natural con los objetos virtuales.','Son las condiciones de la página 384.'],
    ['Superponer información digital sobre el mundo real.','Eso es realidad aumentada.'],
    ['Integrar pequeños dispositivos en objetos cotidianos.','Eso es computación ubicua.'],
    ['Usar solo teclado y pantalla.','No cumple las condiciones de presencia e interacción natural.']]],
  [4,386,'Un simulador de vuelo en realidad virtual entrena situaciones de emergencia. ¿Qué beneficio y qué problemas señala el tema?',[
    ['Permite simulaciones imposibles en otro estilo, pero tiene alto coste y cansa al usuario.','La página 386 lo indica.'],
    ['Es barato y no produce cansancio.','El tema señala lo contrario.'],
    ['Reduce la privacidad y oculta la información.','Son desventajas de la computación ubicua.'],
    ['Exige memorizar órdenes.','Es una desventaja de la línea de órdenes.']]],
  [4,388,'¿Qué busca la computación ubicua según el tema?',[
    ['Extender la capacidad computacional al entorno, integrándola en objetos cotidianos y relegando el ordenador a un segundo plano (ordenador invisible).','La página 388 la define así.'],
    ['Trasladar al usuario a un mundo 3D generado por ordenador.','Eso es realidad virtual.'],
    ['Concentrar todo el procesamiento en el ordenador de sobremesa.','Es lo contrario.'],
    ['Sustituir los menús por órdenes de texto.','No es un paradigma de ese tipo.']]],
  [4,389,'¿Quién y cuándo originó la computación ubicua, y qué rasgos la caracterizan?',[
    ['Mark Weiser, Xerox PARC, 1991; tamaño reducido, precio reducido y movilidad de quienes interactúan en la red.','La página 389 lo recoge.'],
    ['Shneiderman, 1991; representación continua de objetos.','Corresponde a la manipulación directa.'],
    ['Maes, 1994; delegación de tareas.','Corresponde a los agentes.'],
    ['Rekimoto, 1995; superposición de información.','Rekimoto compara paradigmas (p. 405).']]],
  [4,393,'Una ciudad llena de sensores adapta los servicios a la ubicación de cada persona. ¿Qué desventajas de la computación ubicua advierte el tema?',[
    ['Pérdida de privacidad y del entorno real, información escondida y dispositivos que se fusionan con la realidad.','Son las desventajas de la página 393.'],
    ['Alto coste inicial y cansancio por el casco.','Son problemas de la realidad virtual.'],
    ['Que no se adapta al usuario.','Una ventaja es que se adapta a cada usuario y tarea.'],
    ['Que exige memorizar órdenes.','Es propio de la línea de órdenes.']]],
  [4,395,'¿En qué se diferencia la realidad aumentada de la realidad virtual según el tema?',[
    ['La RA traslada la información al mundo real; la RV introduce el mundo real en el ordenador.','La página 395 los contrapone así.'],
    ['La RA aísla al usuario del mundo real.','Lo hace, en todo caso, la RV.'],
    ['La RV usa el mundo como interfaz.','Esa idea pertenece a la RA (p. 394).'],
    ['Ambas son idénticas.','El tema las presenta como paradigmas distintos.']]],
  [4,394,'Un técnico apunta la tablet a una máquina y ve sobre ella las instrucciones de reparación. ¿Qué paradigma es y qué consigue?',[
    ['Realidad aumentada: aumenta el mundo real con información sintética y reduce el coste interactivo.','Las páginas 394 y 400 lo describen.'],
    ['Realidad virtual: sustituye la máquina por un modelo 3D.','La máquina real sigue presente.'],
    ['Línea de órdenes: escribe la avería.','No se escribe ninguna orden.'],
    ['Ordenador de sobremesa: consulta un manual.','La información se integra en el mundo real.']]],
  [4,402,'Una mesa reconoce las tarjetas que se colocan encima y muestra su información digital. ¿Qué línea de trabajo de la realidad aumentada ilustra?',[
    ['Acoplamiento de bits y átomos: unir objetos cotidianos que se pueden coger con la información digital relacionada.','La página 402 la define así.'],
    ['Medio ambiente: usar luz y sonido como interfaces de fondo.','No se usa el ambiente como interfaz.'],
    ['Ordenadores corporales.','No se lleva el ordenador encima.'],
    ['Síntesis de voz por reglas.','No es una línea de la RA.']]],
  [4,406,'¿Qué concluye el tema sobre la elección del estilo de interacción?',[
    ['El problema a resolver y los conocimientos del usuario deciden el estilo más idóneo, y en el futuro coexistirán casi todos los estilos.','Son las conclusiones de la página 406.'],
    ['La manipulación directa es siempre la mejor opción.','El tema no fija un estilo universal.'],
    ['La línea de órdenes desaparecerá por completo.','El tema prevé que coexistirán.'],
    ['El estilo depende solo del hardware disponible.','Depende del problema y del usuario.']]]
].map((q,i)=>({id:i+1,bloque:q[0],pagina:q[1],enunciado:q[2],opciones:q[3].map((o,j)=>({texto:o[0],explicacion:o[1],correcta:j===0}))}));
