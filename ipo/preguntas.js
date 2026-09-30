/* Tema I, IPO2627.pdf, páginas 16–48. Cada opción incluye su justificación.
   La primera opción del banco es la correcta; la interfaz baraja las opciones. */
const BLOQUES = ['Fundamentos de IPO', 'Interfaces de usuario', 'Disciplinas relacionadas', 'Usabilidad y principios', 'Casos integradores'];
const BANCO = [
  [0,19,'Un equipo diseña y programa un sistema interactivo, pero considera que estudiar los fenómenos asociados a su uso pertenece a otra disciplina. ¿Qué valoración es más precisa?',[
    ['Su trabajo cubre parte de la IPO, pero su delimitación de la disciplina es incompleta.','La definición incluye diseño, implementación, evaluación y estudio de los fenómenos relacionados.'],
    ['Su delimitación es correcta si añade una evaluación técnica al terminar.','Añadir evaluación no justifica excluir el estudio de los fenómenos relacionados.'],
    ['Su trabajo no pertenece a la IPO hasta que empieza a evaluar con usuarios.','Diseño e implementación también forman parte de su alcance.'],
    ['Su delimitación es correcta siempre que el sistema tenga una interfaz gráfica.','La definición no exige una interfaz gráfica ni se limita a ella.']]],
  [0,19,'Un sistema muestra una alarma al operador, que todavía no pulsa ni dice nada. Según la definición de interacción del tema, ¿qué se puede afirmar?',[
    ['La presentación de información al operador puede constituir interacción, aunque aún no responda.','Se define como cualquier intercambio de información entre persona y ordenador; no se exige una orden previa ni una respuesta inmediata.'],
    ['Solo habrá interacción cuando el operador actúe sobre un dispositivo de entrada.','Reduce indebidamente la interacción a la entrada de información.'],
    ['Hay interfaz, pero no puede haber interacción mientras el flujo sea solo de salida.','La salida de información al usuario también pertenece a la interacción.'],
    ['Solo habrá interacción si la alarma modifica el estado interno del sistema.','La definición se refiere al intercambio de información, no a exigir una modificación interna.']]],
  [0,20,'Se propone que todos los empleados cambien radicalmente su manera de trabajar para acomodarse a una arquitectura ya decidida. ¿Qué objeción se ajusta mejor a los objetivos de la IPO?',[
    ['Se ha invertido la orientación: el sistema debe diseñarse para satisfacer los requisitos del usuario.','El tema rechaza que los usuarios tengan que cambiar radicalmente su manera de ser para adaptarse al sistema.'],
    ['La IPO impide que los usuarios aprendan procedimientos que antes desconocían.','El tema contempla aprendizaje; no prohíbe cualquier cambio ni toda formación.'],
    ['La arquitectura debería decidirse exclusivamente a partir de preferencias individuales.','Centrarse en requisitos no equivale a ignorar todos los demás factores.'],
    ['El problema solo sería relevante si disminuyera la velocidad de ejecución.','Los objetivos incluyen seguridad, utilidad, efectividad, eficiencia y usabilidad.']]],
  [0,20,'¿Qué conjunto reproduce los objetivos de mejora de la IPO sin sustituir ninguno por una condición o un medio?',[
    ['Seguridad, utilidad, efectividad, eficiencia y usabilidad.','Es la enumeración de objetivos del tema.'],
    ['Seguridad, accesibilidad, efectividad, eficiencia y usabilidad.','La accesibilidad aparece en el tema, pero aquí sustituye a la utilidad.'],
    ['Seguridad, utilidad, familiaridad, eficiencia y usabilidad.','La familiaridad es una condición de facilidad de aprendizaje, no reemplaza a la efectividad.'],
    ['Seguridad, utilidad, efectividad, satisfacción y usabilidad.','La satisfacción figura en la definición de usabilidad, pero aquí falta eficiencia.']]],
  [0,20,'Un proyecto estudia capacidades psicológicas y postura física, pero descarta organización del trabajo y relaciones sociales. ¿Qué conclusión está mejor fundamentada?',[
    ['El estudio es parcial: el tema incluye factores psicológicos, ergonómicos, organizativos y sociales.','No basta con estudiar al individuo aislado de su organización y contexto social.'],
    ['El estudio es suficiente porque la IPO solo analiza la relación individual con el ordenador.','La IPO contempla explícitamente factores organizativos y sociales.'],
    ['El estudio es suficiente si las pruebas usan una muestra numerosa.','Una muestra grande no compensa excluir familias enteras de factores.'],
    ['El estudio solo sería parcial si el sistema permitiera comunicación entre usuarios.','El tema no condiciona esos factores a que exista mensajería o interacción multiusuario.']]],
  [0,21,'La diapositiva cita que más del 70 % del esfuerzo de desarrollo de aplicaciones interactivas se dedica a la interfaz. ¿Qué lectura respeta el alcance de esa afirmación?',[
    ['Se usa para justificar la importancia de estudiar la interfaz en aplicaciones interactivas.','Es un argumento de importancia atribuido a Gartner Group, referido al esfuerzo de desarrollo.'],
    ['Establece que cada aplicación debe reservar exactamente un 70 % del presupuesto al diseño visual.','Cambia “más del”, esfuerzo e interfaz por un porcentaje exacto, presupuesto y diseño visual.'],
    ['Demuestra que mejorar la interfaz reduce en más de un 70 % el tiempo de uso.','El dato no mide el tiempo de uso ni demuestra esa reducción.'],
    ['Permite concluir que la implementación ajena a la interfaz carece de importancia.','Una proporción de esfuerzo no hace irrelevante el resto del sistema.']]],
  [0,19,'¿Qué caso queda más directamente dentro del ámbito definido para la IPO?',[
    ['Diseñar cómo una persona supervisa un sistema y evaluar si comprende sus avisos.','Hay un sistema informático interactivo para uso humano y evaluación de esa interacción.'],
    ['Optimizar exclusivamente un protocolo entre dos servidores sin estudiar su relación con personas.','La comunicación solo entre máquinas no constituye por sí sola interacción persona-ordenador.'],
    ['Estudiar una conversación entre personas sin ningún sistema informático implicado.','Puede aportar conocimientos desde otras disciplinas, pero falta la relación con el sistema informático.'],
    ['Medir exclusivamente el calor de un procesador sin relación con el uso humano.','Sin vinculación con la interacción humana no es el caso más directo de la definición.']]],
  [0,20,'Se han creado herramientas para que los diseñadores produzcan pantallas rápidamente. ¿Qué conclusión NO está justificada solo por ese hecho?',[
    ['Ya se ha conseguido una interacción eficiente, efectiva y segura.','Disponer de herramientas es una línea de trabajo; no demuestra por sí sola la calidad de la interacción resultante.'],
    ['Se ha trabajado en uno de los medios que el tema considera necesarios para sistemas usables.','El desarrollo de herramientas y técnicas figura expresamente.'],
    ['La aportación puede ayudar a quienes diseñan sistemas interactivos.','Ese es precisamente el propósito de las herramientas descritas.'],
    ['Todavía tiene sentido comprender cómo trabajan las personas que usarán el sistema.','Comprender los factores del uso sigue siendo necesario.']]],
  [1,26,'Un teclado funciona perfectamente, pero la pantalla muestra mensajes que el usuario no comprende. ¿Cuál es el diagnóstico más preciso?',[
    ['La interfaz presenta un problema de contacto cognitivo aunque el componente físico funcione.','La interfaz comprende el contacto físico y cognitivo; la comprensibilidad es parte de ella.'],
    ['No es un problema de interfaz porque todos los dispositivos responden.','Confunde interfaz con funcionamiento del hardware.'],
    ['Es exclusivamente un problema físico porque el mensaje aparece en una pantalla.','Que se presente físicamente no convierte su incomprensibilidad en un problema exclusivamente físico.'],
    ['La interfaz solo podrá evaluarse cuando falle también el dispositivo de entrada.','No hace falta un fallo físico para identificar un problema cognitivo.']]],
  [1,23,'¿Qué relación entre “interfaz” en general e “interfaz” en IPO es correcta?',[
    ['En general es una superficie de contacto entre entidades; en IPO estas son la persona y el ordenador.','La definición general se concreta identificando las dos entidades.'],
    ['En general es cualquier intercambio de información; en IPO es la pantalla que lo muestra.','Confunde interfaz con interacción y después la reduce a la pantalla.'],
    ['En general es el dispositivo de entrada; en IPO incluye además los programas instalados.','La definición general no se limita a dispositivos de entrada.'],
    ['En general exige dos máquinas; en IPO una de ellas se sustituye por una persona.','Las entidades de la definición general no tienen que ser máquinas.']]],
  [1,26,'Una aplicación sustituye el ratón por órdenes de voz y respuestas sonoras. ¿Qué afirmación está mejor respaldada por la definición amplia de interfaz?',[
    ['Sigue habiendo interfaz: hay partes del sistema con las que el usuario entra en contacto físico y cognitivo.','Teclado, ratón y pantalla son ejemplos, no requisitos que excluyan otras modalidades.'],
    ['Ya no hay interfaz de usuario, aunque sí exista interacción.','No tener pantalla o ratón no elimina la superficie de contacto.'],
    ['Solo hay interfaz cognitiva: el sonido no es una forma física de contacto con el sistema.','La presentación sonora tiene una dimensión física, además de su interpretación.'],
    ['La interfaz pasa a ser únicamente el algoritmo de reconocimiento de voz.','La interfaz no se identifica solo con un algoritmo interno.']]],
  [1,25,'Un botón es grande y se ve inmediatamente, pero su etiqueta admite dos interpretaciones incompatibles. ¿Qué conclusión evita confundir visibilidad y comprensión?',[
    ['La visibilidad del control no garantiza que el usuario comprenda intuitivamente su función.','El tema destaca visibilidad y comprensión intuitiva; resolver una no demuestra la otra.'],
    ['Al ser visible, ya satisface necesariamente la dimensión cognitiva de la interfaz.','Ver un control no equivale a comprenderlo.'],
    ['La ambigüedad demuestra que el botón no es físicamente visible.','Ambigüedad semántica e invisibilidad son problemas diferentes.'],
    ['La única solución compatible con la IPO es añadir más controles.','La definición no impone esa solución; podría bastar una etiqueta comprensible.']]],
  [1,35,'Una etiqueta no interactiva tiene el mismo aspecto que los botones y los usuarios intentan pulsarla. ¿Cuál es la interpretación más ajustada?',[
    ['La presentación induce a atribuirle una acción que no tiene: es un problema de interfaz.','Las etiquetas que parecen botones figuran como ejemplo de problemas.'],
    ['No existe problema de interfaz, porque la etiqueta cumple su función de mostrar texto.','La función técnica no elimina la expectativa errónea provocada al usuario.'],
    ['El único defecto demostrado es un tiempo de respuesta excesivo.','No hay una operación lenta: el elemento no es un botón.'],
    ['La confusión demuestra necesariamente un fallo del dispositivo de entrada.','El caso se explica por la presentación sin suponer avería alguna.']]],
  [1,26,'Se revisan tamaños de teclas, posición de la pantalla y funcionamiento del ratón. El informe concluye que se ha revisado toda la interfaz. ¿Qué falta para sostener esa conclusión?',[
    ['Examinar también cómo comprende el usuario lo que el sistema le presenta.','El contacto cognitivo es parte explícita de la interfaz.'],
    ['Medir únicamente la frecuencia de reloj del procesador.','No cubre la comprensibilidad que falta en la revisión.'],
    ['Comprobar que todos los programas comparten el mismo lenguaje de implementación.','El lenguaje de implementación no equivale a contacto cognitivo.'],
    ['Añadir más dispositivos de entrada para que la muestra física sea completa.','Más dispositivos no corrigen la omisión de la dimensión cognitiva.']]],
  [1,19,'¿Qué enunciado distingue mejor interfaz e interacción?',[
    ['La interfaz es el contacto con el sistema; la interacción es el intercambio de información entre persona y ordenador.','Combina las definiciones de las páginas 19, 23 y 26.'],
    ['La interfaz es la entrada de información; la interacción, exclusivamente la salida.','Ninguna de las definiciones establece esa división.'],
    ['La interfaz es lo físico; la interacción es lo cognitivo.','La propia interfaz incluye contacto físico y cognitivo.'],
    ['La interfaz existe solo mientras el usuario está introduciendo una orden.','El concepto no se limita al instante de entrada de una orden.']]],
  [1,48,'Un diseñador identifica la interfaz con “los píxeles de las ventanas” y omite el entorno de uso. ¿Qué conclusión del tema cuestiona mejor su postura?',[
    ['La interfaz es un concepto amplio en el que hay que tener en cuenta todo el entorno.','La conclusión del tema insiste expresamente en esa amplitud.'],
    ['El entorno solo se considera después de asegurar una estética uniforme.','El tema no establece esa subordinación.'],
    ['Una interfaz deja de ser informática si se estudian factores externos a la pantalla.','Los factores del entorno forman parte del enfoque de IPO.'],
    ['La interfaz debe estudiarse únicamente desde la programación.','También contradice la interdisciplinariedad del tema.']]],
  [2,29,'Se estudia cómo unas señales visuales dirigen la atención y cómo procesan esa información los usuarios. ¿Qué aportación se está examinando más directamente?',[
    ['Psicología.','El tema la vincula con comportamiento, procesos mentales y procesamiento de información, y usa ese ejemplo.'],
    ['Ergonomía, exclusivamente porque aparecen colores.','El color también interviene en psicología; lo decisivo aquí es la atención y el procesamiento.'],
    ['Sociología, porque participan varias personas.','Que haya varias personas no convierte el objeto del estudio en costumbres o tendencias culturales.'],
    ['Programación, porque las señales se muestran en un programa.','El soporte informático no define por sí solo la aportación disciplinar analizada.']]],
  [2,30,'Se aumenta la letra y se ajusta el contraste con el objetivo explícito de reducir la fatiga visual. ¿Cuál es la correspondencia más directa con el tema?',[
    ['Ergonomía: bienestar y condiciones físicas de interacción.','Es el ejemplo de ergonomía de la diapositiva 30.'],
    ['Sociología: adaptación a tendencias culturales.','No se ha descrito una diferencia cultural, sino fatiga visual.'],
    ['Psicología: evaluación exclusiva de satisfacción mediante teorías mentales.','Puede haber relaciones, pero el objetivo y ejemplo corresponden directamente a ergonomía.'],
    ['Inteligencia artificial: adecuación automática de la interfaz.','No se menciona automatización ni adaptación inteligente.']]],
  [2,31,'Un equipo compara cómo jóvenes, mayores y profesionales usan redes sociales para adaptar la interfaz a sus necesidades. ¿Qué disciplina ilustra ese caso en el PDF?',[
    ['Sociología.','El tema emplea este ejemplo al hablar de grupos, costumbres y tendencias culturales.'],
    ['Ergonomía, porque toda diferencia de edad es necesariamente postural.','La edad no convierte cualquier análisis en un estudio de postura.'],
    ['Diseño, porque estudiar grupos equivale a producir objetos en serie.','La producción de objetos útiles y agradables es otra aportación.'],
    ['Ingeniería del software, porque el caso implica requisitos.','Puede colaborar, pero no es la atribución específica del ejemplo.']]],
  [2,32,'Se diseñan iconos consistentes para que las funciones sean fácilmente identificables. Según el ejemplo del tema, ¿qué disciplina se está ilustrando?',[
    ['Diseño.','El ejemplo acompaña a la producción de objetos útiles y visualmente agradables y su importancia para la usabilidad.'],
    ['Sociología, porque toda convención visual procede de una costumbre estudiada.','El ejemplo está adscrito a diseño; el enunciado no describe un análisis cultural.'],
    ['Ergonomía, porque consistencia significa reducir reflejos físicos.','Consistencia no significa prevención de reflejos.'],
    ['Programación, porque los iconos solo se definen mediante código.','La identificación visual no se reduce al código que la materializa.']]],
  [2,30,'¿Qué conjunto corresponde más directamente a la aportación de la ergonomía descrita en el tema?',[
    ['Organización de controles, prevención de reflejos, postura y distinción de colores.','Todos aparecen entre los aspectos ergonómicos de la interacción.'],
    ['Tradiciones, tendencias culturales, costumbres y grupos sociales.','Corresponde más directamente a sociología.'],
    ['Procesos mentales, teorías de información humana y metodologías de satisfacción.','Corresponde a la aportación de psicología.'],
    ['Producción en serie, utilidad de objetos e identificación mediante iconos consistentes.','Corresponde a la descripción y ejemplo de diseño.']]],
  [2,28,'¿Qué lista contiene únicamente disciplinas que aparecen en el esquema de relaciones con la IPO?',[
    ['Psicología, programación, ingeniería del software, inteligencia artificial, ergonomía, sociología y diseño.','Son las siete disciplinas representadas en el esquema.'],
    ['Psicología, programación, ingeniería del software, inteligencia artificial, ergonomía, sociología y recuperabilidad.','Recuperabilidad es un principio de usabilidad, no una disciplina del esquema.'],
    ['Psicología, programación, ingeniería del software, adaptabilidad, ergonomía, sociología y diseño.','Adaptabilidad es un parámetro de flexibilidad; falta inteligencia artificial.'],
    ['Psicología, programación, consistencia, inteligencia artificial, ergonomía, sociología y diseño.','Consistencia es un principio; falta ingeniería del software.']]],
  [2,29,'Dos estudios usan colores. El primero analiza atención; el segundo, distinción entre colores y fatiga visual. ¿Qué asignación sigue mejor los ejemplos del tema?',[
    ['Primero psicología; segundo ergonomía, sin suponer que las aportaciones sean excluyentes.','La finalidad del estudio permite distinguir las aportaciones; usar color no las convierte en la misma.'],
    ['Ambos exclusivamente diseño, ya que cualquier uso del color es estético.','El tema relaciona el color también con atención y salud.'],
    ['Primero ergonomía; segundo sociología, porque la fatiga depende de grupos.','No corresponde a los objetivos descritos en los casos.'],
    ['Ambos exclusivamente psicología, porque el color se percibe.','Ignora los aspectos ergonómicos explícitos del tema.']]],
  [2,32,'¿Qué objeción es más precisa a la afirmación “el diseño aporta belleza, pero no utilidad ni usabilidad”?',[
    ['El tema lo vincula a objetos útiles y visualmente agradables y lo considera importante para programas usables.','Su aportación no es exclusivamente decorativa.'],
    ['El diseño sustituye a las demás disciplinas cuando la interfaz tiene iconos.','La interdisciplinariedad no desaparece por incorporar iconos.'],
    ['El diseño únicamente aporta utilidad; el aspecto visual pertenece solo a ergonomía.','El tema menciona expresamente lo visualmente agradable dentro del diseño.'],
    ['La utilidad solo puede valorarse por el lenguaje de programación elegido.','Esa equivalencia no figura en el tema.']]],
  [3,34,'Un producto funciona bien con expertos en una oficina. Se concluye que es usable para cualquier usuario y entorno. ¿Qué error de razonamiento aparece?',[
    ['Se generaliza una medida ligada a determinados usuarios, objetivos específicos y contexto de uso.','La definición de usabilidad incluye esas tres condiciones y efectividad, eficiencia y satisfacción.'],
    ['Se ha evaluado a personas en lugar de evaluar exclusivamente características internas del producto.','La definición está precisamente vinculada al uso por personas.'],
    ['Se ha usado un entorno real cuando la definición exige un laboratorio.','La definición no exige laboratorio.'],
    ['Se ha estudiado eficiencia, que no forma parte de la usabilidad.','La eficiencia aparece expresamente.']]],
  [3,39,'Tras una operación, el sistema cambia internamente pero el usuario no puede captar el cambio. Además, los conceptos usados se corresponden con los que ya conoce. ¿Qué diagnóstico distingue ambos hechos?',[
    ['Falla la sintetizabilidad, aunque se aporta familiaridad.','Sintetizable: poder captar los cambios producidos por operaciones. Familiar: correlación con conocimientos previos.'],
    ['Falla la familiaridad, aunque se aporta sintetizabilidad.','Invierte ambas definiciones.'],
    ['Falla necesariamente la recuperabilidad, aunque se aporta sustitución.','No se describe corrección de errores ni equivalencia de valores.'],
    ['Solo falla la adecuación de tareas: percibir cambios no se relaciona con aprender.','La percepción de cambios figura como condición de facilidad de aprendizaje.']]],
  [3,40,'Un corrector permite alternar entre corrección manual y automática; además admite un margen como “2 cm” o su valor equivalente en milímetros. ¿Qué pareja identifica esas propiedades en ese orden?',[
    ['Migración de tareas y capacidad de sustitución.','La primera transfiere control de tareas; la segunda admite valores equivalentes.'],
    ['Adaptabilidad y familiaridad.','No se describe adecuación automática al usuario ni relación con conocimientos previos.'],
    ['Capacidad de sustitución y migración de tareas.','Invierte la transferencia de control y la equivalencia de valores.'],
    ['Recuperabilidad y consistencia.','No son los parámetros específicos que ilustran los dos hechos.']]],
  [3,40,'La interfaz detecta secuencias repetidas y se adecua automáticamente al usuario. ¿Qué parámetro de flexibilidad describe el tema?',[
    ['Adaptabilidad.','El tema usa ese nombre para la adecuación automática, con el ejemplo de secuencias repetidas.'],
    ['Capacidad de sustitución.','Se refiere a sustituir valores equivalentes, no a adecuar automáticamente la interfaz.'],
    ['Migración de tareas, porque cualquier automatización es una transferencia de control de tarea.','La característica específica del caso es adecuar la interfaz; no se describe quién ejecuta una tarea transferida.'],
    ['Familiaridad, porque toda repetición relaciona necesariamente dos sistemas.','Familiaridad es correlación con conocimientos previos; no es el nombre de este parámetro.']]],
  [3,41,'Una operación no puede interrumpirse. ¿Qué respuesta de diseño se ajusta a la recomendación específica del tema?',[
    ['Advertirlo al usuario y mostrar mensajes apropiados durante el proceso.','El control para iniciar y terminar se recomienda siempre que sea posible; se contempla expresamente esta excepción.'],
    ['Mostrar siempre un botón Cancelar, aunque no pueda detener nada.','Un control inoperante no proporciona el control prometido.'],
    ['Ocultar toda información hasta terminar para evitar que el usuario intente intervenir.','Contradice la recomendación de mensajes durante el proceso.'],
    ['Afirmar que la operación viola necesariamente la IPO y eliminarla del sistema.','El tema contempla operaciones no interrumpibles; no impone eliminarlas.']]],
  [3,42,'Una nueva versión añade funciones pero cambia sin necesidad el significado de los controles conocidos. ¿Qué recomendación se ha incumplido más directamente?',[
    ['Añadir nuevas funcionalidades al conjunto preexistente en vez de cambiar las ya conocidas.','Es una recomendación de consistencia; también se aconseja evitar modificaciones innecesarias.'],
    ['Evitar añadir funcionalidades nuevas a un sistema existente.','El tema permite añadirlas; recomienda conservar lo conocido.'],
    ['Garantizar que cada mecanismo cambie de uso según el momento.','Eso contradice la definición de consistencia.'],
    ['Permitir exclusivamente una manera de intercambiar información.','Eso restringe la flexibilidad y no es la recomendación relevante.']]],
  [3,43,'El usuario puede terminar su trabajo sin ratón y con poca batería, pero no puede corregir una acción que reconoce como errónea. ¿Qué evaluación distingue mejor las evidencias?',[
    ['Hay evidencia favorable de robustez y desfavorable de recuperabilidad.','Robustez contempla condiciones adversas; recuperabilidad permite corregir acciones reconocidas como erróneas (p. 44).'],
    ['Hay evidencia favorable de recuperabilidad y desfavorable de robustez.','Invierte los principios.'],
    ['La robustez demostrada implica necesariamente recuperabilidad.','Soportar ciertas condiciones no demuestra que se puedan corregir errores.'],
    ['Ambos hechos solo permiten evaluar familiaridad.','No se habla de conocimientos previos.']]],
  [3,45,'Una operación termina internamente en 0,1 s, pero el usuario recibe la indicación del nuevo estado 8 s después de iniciarla. ¿Qué intervalo interesa según la definición de tiempo de respuesta del tema?',[
    ['El que necesita el sistema para expresar el cambio de estado al usuario: en el caso, 8 s.','La definición se centra en expresar los cambios al usuario, no solo en el cálculo interno.'],
    ['Solo los 0,1 s de ejecución interna.','Ignora el retraso de la expresión del estado al usuario.'],
    ['El tiempo que tarda el usuario en aprender qué significa el mensaje.','Eso es aprendizaje o comprensión, no el intervalo definido.'],
    ['Únicamente el tiempo empleado por el usuario en corregir un error posterior.','Eso no es el tiempo de respuesta del sistema.']]],
  [4,46,'Un sistema permite obtener todos los resultados requeridos, pero obliga a realizar las tareas de una forma incompatible con la que necesita el usuario. ¿Qué juicio se ajusta al principio de adecuación de las tareas?',[
    ['No basta con permitir el resultado: debe permitir las tareas y la forma en que el usuario quiere hacerlas.','La formulación del principio incorpora ambos requisitos.'],
    ['La adecuación está plenamente satisfecha porque solo exige llegar al resultado.','Omite la forma de realizar las tareas.'],
    ['Solo hay un problema de familiaridad; la adecuación no se refiere a la forma de trabajo.','La forma de trabajo figura expresamente en adecuación.'],
    ['Si el sistema es rápido, queda demostrada la adecuación.','Rapidez y adecuación de las tareas no son equivalentes.']]],
  [4,47,'Para ejecutar una función poco frecuente hay que memorizar un código arbitrario y una abreviatura complicada. ¿Qué rediseño responde más directamente a la recomendación inequívoca de la diapositiva 47?',[
    ['Permitir identificar la función mediante opciones comprensibles, sin exigir recordar esos códigos.','La diapositiva indica que no se deben tener que recordar abreviaturas y códigos complicados. Su frase sobre reconocimiento y recuerdo es poco clara; aquí se usa la recomendación explícita.'],
    ['Acortar el código, pero mantener una abreviatura complicada que debe memorizarse.','Puede aliviar algo, pero mantiene la exigencia que el tema desaconseja.'],
    ['Ejecutar el código más rápido sin modificar cómo se selecciona la función.','Mejora potencialmente respuesta, pero no elimina la carga de recordar el código.'],
    ['Cambiar el código en cada sesión para que el usuario no dependa de hábitos.','Aumenta la dificultad de recuerdo y perjudica la consistencia.']]],
  [4,37,'Una aplicación tiene muchas funciones y una apariencia atractiva, pero obliga a dedicar más atención a manejarla que a resolver la tarea. ¿Qué criterio del tema pone en duda su usabilidad?',[
    ['Una aplicación usable permite centrarse en la tarea, no en la aplicación.','La riqueza funcional o estética no sustituye ese criterio.'],
    ['Una aplicación usable debe carecer de funciones avanzadas.','El tema no exige renunciar a ellas.'],
    ['Una aplicación usable solo necesita resultar agradable a primera vista.','También debe ser fácil de aprender y utilizar.'],
    ['Una aplicación usable obliga a dominar toda la herramienta antes de realizar tareas.','Se busca un tiempo mínimo hasta el uso productivo.']]],
  [4,39,'Los principiantes llegan pronto a un uso productivo, pero los usuarios intermedios no reciben ayuda para avanzar. ¿Cuál es la valoración más precisa de la facilidad de aprendizaje descrita en el tema?',[
    ['Se atiende el inicio, pero queda desatendida la ayuda a usuarios intermedios para alcanzar un uso máximo.','La facilidad de aprendizaje no se agota en el primer contacto.'],
    ['Está completamente atendida: el tema solo menciona usuarios sin experiencia.','También menciona explícitamente a los intermedios.'],
    ['Está ausente por completo: el éxito inicial no constituye ninguna evidencia.','El tiempo hasta el uso productivo sí es parte del principio.'],
    ['El único principio implicado es capacidad de sustitución.','No hay valores equivalentes en el caso.']]],
  [4,41,'Un botón Deshacer devuelve el estado anterior tras una equivocación. Un alumno dice “es control del usuario”; otro dice “es recuperabilidad”. ¿Qué respuesta respeta mejor el tema?',[
    ['Ambas lecturas son compatibles: Deshacer se recomienda para el control y permite corregir la acción errónea.','Control del usuario incluye deshacer (p. 41); recuperabilidad permite corregir errores reconocidos (p. 44). Los principios pueden solaparse.'],
    ['Solo control: recuperabilidad exige que el sistema corrija sin intervención humana.','La definición de recuperabilidad no exige automatismo.'],
    ['Solo recuperabilidad: el tema excluye Deshacer de las formas de dar control.','Deshacer aparece expresamente en las recomendaciones de control.'],
    ['Ninguna: restablecer un estado es siempre capacidad de sustitución.','Sustitución se refiere a valores equivalentes, no a deshacer operaciones.']]],
  [4,34,'En un contexto concreto, los usuarios completan los objetivos con eficiencia, pero declaran una satisfacción muy baja. ¿Qué conclusión está justificada?',[
    ['Hay evidencias favorables en algunos componentes, pero no puede darse por plenamente satisfecha la definición de usabilidad.','La satisfacción también forma parte de la definición, junto con efectividad y eficiencia.'],
    ['La satisfacción es irrelevante siempre que se completen las tareas.','Elimina uno de los componentes explícitos.'],
    ['La insatisfacción demuestra que no se ha completado ningún objetivo.','Contradice el caso y confunde satisfacción con logro.'],
    ['El resultado permite concluir lo mismo para cualquier otro contexto.','La definición está ligada a usuarios, objetivos y contexto determinados.']]],
  [4,36,'Un dispositivo exige aprender la lógica de su tecnología interna antes de realizar una tarea cotidiana. El equipo propone acelerar el procesador sin revisar ese requisito. ¿Qué análisis se ajusta mejor al argumento de Norman recogido en el tema?',[
    ['La mejora técnica no corrige por sí sola la orientación del desarrollo hacia la tecnología en lugar del usuario.','El problema señalado es la orientación del producto; velocidad técnica y orientación al usuario son cuestiones distintas.'],
    ['Cualquier mejora técnica garantiza que el desarrollo ya está centrado en el usuario.','La mejora puede mantener exactamente la misma exigencia problemática.'],
    ['La IPO exige ocultar todas las funciones avanzadas, cualquiera que sea la tarea.','No se establece esa prohibición general.'],
    ['Si el dispositivo funciona correctamente, el argumento de Norman deja de ser aplicable.','Puede funcionar técnicamente y seguir siendo difícil de usar.']]],
  [4,38,'Considera: I) la familiaridad relaciona conocimientos previos y requeridos; II) la adaptabilidad del tema es una adecuación automática; III) la consistencia prohíbe añadir funciones. ¿Qué combinación es correcta?',[
    ['I y II son verdaderas; III es falsa.','I: p. 39. II: p. 40. III contradice p. 42, que recomienda añadir funciones al conjunto preexistente.'],
    ['I y III son verdaderas; II es falsa.','La adecuación automática sí es la definición empleada; añadir funciones no está prohibido.'],
    ['II y III son verdaderas; I es falsa.','I coincide con familiaridad y III contradice la recomendación de consistencia.'],
    ['Las tres son verdaderas.','La trampa está en convertir conservar lo conocido en prohibir toda ampliación.']]]
].map((q,i)=>({id:i+1,bloque:q[0],pagina:q[1],enunciado:q[2],opciones:q[3].map((o,j)=>({texto:o[0],explicacion:o[1],correcta:j===0}))}));
