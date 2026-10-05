/* Tema IV, IPO2627.pdf, páginas 167–222 (Ingeniería de la interfaz). Cada opción incluye su justificación.
   La primera opción de cada pregunta es la correcta; test.js baraja las cuatro opciones. */
const BLOQUES = ['Ingeniería de la interfaz', 'Análisis de tareas', 'Análisis jerárquico y GOMS', 'Sketch y wireframe', 'Mockups y prototipos'];
const BANCO = [
  [0,170,'Un equipo defiende que su aplicación se valorará bien porque su arquitectura interna es impecable, aunque la interfaz se decidirá más adelante. ¿Qué objeción plantea el tema?',[
    ['Al usuario no le interesa la estructura interna, sino cómo usar la aplicación; la interfaz determina en gran medida su impresión.','La página 170 afirma ambas ideas: la interfaz condiciona la percepción del usuario y este se fija en cómo usarla.'],
    ['La arquitectura interna es lo que más valora el usuario, así que el planteamiento es correcto.','El tema dice justo lo contrario: el usuario no está interesado en la estructura interna.'],
    ['La interfaz solo importa en aplicaciones de entretenimiento, no en sistemas profesionales.','El tema no limita la importancia de la interfaz a un tipo de aplicación.'],
    ['La interfaz únicamente influye en la estética, no en la percepción que el usuario tiene de la aplicación.','La página 170 subraya que la interfaz determina en gran medida esa percepción.']]],
  [0,171,'Una aplicación ya tiene la especificación, el diseño y el código casi terminados, y ahora se quiere replantear por completo cómo interactúa el usuario. ¿Qué cabe esperar según el tema?',[
    ['Que sea muy difícil cambiar la interacción y la presentación, salvo pequeños detalles.','La página 171 advierte de que, en ese punto, solo suelen poder cambiarse detalles menores.'],
    ['Que el cambio sea sencillo porque la interfaz es una capa independiente del resto.','El tema explica que, hecha así, la interfaz queda muy ligada al diseño de datos y funciones.'],
    ['Que basta con cambiar los colores para adaptar la interacción a los usuarios.','Cambiar la apariencia no replantea la interacción, que es lo que resulta difícil de modificar.'],
    ['Que el replanteamiento sea innecesario, porque la interfaz se diseña siempre al final.','Precisamente el tema critica dejar el diseño de la interfaz para el final.']]],
  [0,171,'¿Qué consecuencia atribuye el tema a diseñar primero los datos y las funciones y la interfaz después?',[
    ['Interfaces muy dependientes del diseño de los datos y las funciones, sin tener en cuenta al usuario que las usará.','Es la consecuencia descrita en la página 171.'],
    ['Interfaces más consistentes con el modelo mental del usuario.','Al no considerar al usuario desde el principio, ocurre lo contrario.'],
    ['Interfaces más fáciles de traducir a otros idiomas.','El tema no relaciona este orden de trabajo con la internacionalización.'],
    ['Interfaces que se pueden cambiar por completo sin coste al final del desarrollo.','La página 171 dice que, al final, solo se pueden cambiar pequeños detalles.']]],
  [0,172,'¿Qué orden de trabajo propone el tema para desarrollar un sistema interactivo?',[
    ['Partir de una idea clara de la interfaz y de las interacciones, y después desarrollar las especificaciones funcionales que guíen el diseño.','Es la conclusión que extrae la página 172.'],
    ['Especificar, diseñar funciones y datos, programar y, al terminar, diseñar la interfaz.','La página 172 rechaza explícitamente este orden.'],
    ['Programar primero un prototipo funcional completo y decidir la interfaz según cómo haya quedado el código.','Subordina la interfaz al código, que es lo que el tema quiere evitar.'],
    ['Diseñar la interfaz y las funciones por separado, sin que una guíe a la otra.','El tema pide que la idea de la interfaz guíe las especificaciones funcionales.']]],
  [0,173,'Un jefe de proyecto pregunta si las técnicas de Ingeniería del Software sirven para sistemas interactivos. ¿Qué respuesta da el tema?',[
    ['Sí, pero modificando algunos aspectos de los métodos de diseño clásico para adaptarlos a estos sistemas.','La página 173 lo plantea así.'],
    ['No; los sistemas interactivos requieren abandonar por completo la Ingeniería del Software.','El tema no las descarta: las adapta.'],
    ['Sí, y deben aplicarse sin ningún cambio respecto al diseño clásico.','La página 173 indica que hay que modificar algunos aspectos.'],
    ['Solo en la fase de programación, nunca en el diseño.','El tema habla de adaptar los métodos de diseño.']]],
  [0,173,'¿Qué conjunto de aspectos añade el tema al desarrollo de sistemas interactivos frente al diseño clásico?',[
    ['Captura de requisitos de interacción, análisis de tareas, realización de prototipos y evaluación.','Son los cuatro aspectos que enumera la página 173.'],
    ['Optimización del compilador, normalización de la base de datos y despliegue.','Son tareas técnicas que no aparecen entre los aspectos de interacción.'],
    ['Elección del lenguaje de programación, licencias y presupuesto.','El tema no menciona estos aspectos en este punto.'],
    ['Únicamente la evaluación final con usuarios, una vez terminado el producto.','La evaluación es solo uno de los aspectos, y no se reduce al final.']]],
  [0,222,'Durante el diseño, un equipo enseña al usuario las pantallas terminadas solo para que dé su aprobación. ¿Qué conclusión del tema incumple?',[
    ['Que el usuario debe tomar parte en el diseño y no ser un mero espectador.','La página 222 lo recoge entre las conclusiones del tema.'],
    ['Que el usuario solo debe intervenir cuando el producto esté a la venta.','El tema pide justo lo contrario: que participe en el diseño.'],
    ['Que la evaluación del diseño no tiene importancia.','La página 222 dice que la evaluación del diseño tiene gran importancia.'],
    ['Que no existen metodologías ni notaciones para el diseño.','El tema afirma que existen y que deben utilizarse.']]],
  [0,187,'Ya están modeladas las tareas y toca implementarlas. ¿Cuál de estas listas recoge factores que el tema pide tener en cuenta?',[
    ['Tipos de interacción, principios y guías de estilo, gestión de entradas, diseño de la presentación y gestión de errores.','Son los factores que enumera la página 187.'],
    ['Solo la velocidad del procesador y el tamaño del ejecutable.','No forman parte de los factores de implementación de tareas del tema.'],
    ['Únicamente la paleta de colores y el logotipo.','Son aspectos visuales parciales; el tema incluye interacción, entradas y errores.'],
    ['El precio de venta y la campaña de marketing.','Son decisiones comerciales, ajenas a la implementación de las tareas.']]],

  [1,175,'Según el tema, ¿qué es una tarea?',[
    ['Una unidad significativa de trabajo en la actividad de una persona sobre una aplicación.','Es la definición de la página 175.'],
    ['Cualquier función interna del código, aunque el usuario no la perciba.','La tarea se define desde la actividad de la persona, no desde el código.'],
    ['Un botón concreto de la interfaz.','Un botón es un elemento de la interfaz, no una unidad de trabajo.'],
    ['Un error que comete el usuario al usar el sistema.','Los errores no definen el concepto de tarea.']]],
  [1,175,'¿Qué beneficios atribuye el tema al análisis de tareas?',[
    ['Un diseño consistente con el modelo conceptual del usuario, y facilitar el análisis y la evaluación de la usabilidad.','La página 175 menciona ambos, además de poder predecir el rendimiento e identificar problemas de uso.'],
    ['Eliminar la necesidad de evaluar la usabilidad.','Al contrario: el análisis facilita esa evaluación.'],
    ['Reducir el tamaño del código fuente.','El tema no menciona este beneficio.'],
    ['Garantizar que el sistema no tendrá nunca errores de programación.','El análisis de tareas trata del uso, no de la corrección del código.']]],
  [1,176,'Una analista solo recopila el vocabulario y los símbolos que usan los usuarios en su trabajo. ¿Qué le falta para completar el análisis de tareas descrito en el tema?',[
    ['Qué información necesita el usuario para hacer la tarea y cómo se realiza actualmente.','La página 176 incluye el qué, los elementos (terminología y símbolos) y el cómo.'],
    ['Nada: la terminología del dominio es todo lo que estudia el análisis de tareas.','La terminología es solo una de las tres partes.'],
    ['El presupuesto del proyecto y el lenguaje de programación.','No forman parte del análisis de tareas.'],
    ['Los colores corporativos de la empresa.','Es un aspecto visual, no un componente del análisis de tareas.']]],
  [1,181,'Un equipo quiere identificar qué conocimiento necesita el usuario para hacer una tarea y cómo tiene organizado ese conocimiento. ¿Qué método de análisis de tareas usa?',[
    ['Análisis basado en conocimiento.','La página 181 lo define exactamente así.'],
    ['Descomposición de tareas.','Esta estudia cómo dividir una tarea en otras más simples.'],
    ['Análisis de relaciones entre entidades.','Es la aproximación orientada a objetos: actores, objetos, relaciones y acciones.'],
    ['Creación de un mockup.','Es una técnica de representación visual, no un método de análisis de tareas.']]],
  [1,178,'En el ejemplo de la grabación telemática de televisión, ¿cómo se clasifica «grabar una película esta noche y no estoy en casa»?',[
    ['Como un objetivo del usuario.','La página 178 lo incluye entre los objetivos del usuario.'],
    ['Como información requerida.','La información requerida son datos como la lista de programas o el canal.'],
    ['Como una acción necesaria.','Las acciones son pasos como iniciar la grabación.'],
    ['Como un operador de GOMS.','Los operadores son acciones básicas, y este ejemplo no usa GOMS.']]],
  [1,179,'En el mismo ejemplo de grabación, ¿qué se clasifica como «información requerida»?',[
    ['El tiempo de inicio, la duración y el canal.','La página 179 lo incluye junto a la lista de programas y el día de la semana.'],
    ['Ver un programa concreto.','Es un objetivo del usuario.'],
    ['Iniciar el proceso de grabación.','Es una acción necesaria.'],
    ['Comprobar que no se ha llegado al límite de programas.','Es una acción necesaria.']]],
  [1,180,'En el ejemplo de grabación, «comprobar que no se ha llegado al límite de programas» es…',[
    ['Una acción necesaria para cumplir el objetivo.','La página 180 la recoge entre las acciones necesarias.'],
    ['Un objetivo del usuario.','El usuario no quiere comprobar límites: quiere grabar un programa.'],
    ['Información requerida.','Es algo que hay que hacer, no un dato que se necesita.'],
    ['Una regla de selección de GOMS.','El ejemplo no usa GOMS; es una acción del análisis.']]],
  [1,181,'Un análisis se centra en los actores y los objetos del dominio, las relaciones entre ellos y las acciones que pueden realizar. ¿Qué método es?',[
    ['Análisis de relaciones entre entidades.','La página 181 lo describe como una aproximación orientada a objetos.'],
    ['Análisis basado en conocimiento.','Este se centra en el conocimiento del usuario y su organización.'],
    ['Descomposición de tareas.','Esta divide tareas en otras más simples.'],
    ['Wireframing.','Es una técnica de diseño de pantallas, no un método de análisis de tareas.']]],

  [2,182,'En un diagrama de análisis jerárquico, una subtarea lleva un asterisco (*) en la esquina. ¿Qué indica?',[
    ['Iteración: la subtarea se repite.','La página 182 usa el asterisco para la iteración de tareas.'],
    ['Selección: se elige una entre varias alternativas.','La selección se marca con un pequeño círculo.'],
    ['Tarea unitaria que no se descompone más.','La tarea unitaria se marca con una doble línea inferior.'],
    ['Que la subtarea es opcional y puede eliminarse del diagrama.','Esa notación no aparece en el tema.']]],
  [2,182,'Dos subtareas del mismo nivel llevan un pequeño círculo en la esquina. ¿Cómo se interpreta?',[
    ['Como selección de tareas: se realiza una de las alternativas.','La página 182 asocia el círculo a la selección.'],
    ['Como secuencia: se hacen todas, de izquierda a derecha.','La secuencia se representa con cajas sin marca.'],
    ['Como iteración de ambas.','La iteración se marca con asterisco.'],
    ['Como tareas que el sistema hace sin intervención del usuario.','El tema no da ese significado al círculo.']]],
  [2,183,'En el ejemplo «Hacer té», varias cajas (por ejemplo, 1.1 «llenar el cazo») tienen una doble línea debajo. ¿Qué significa?',[
    ['Que son tareas unitarias, que no se descomponen más.','La página 182 define esa notación como tarea unitaria.'],
    ['Que deben repetirse hasta que hierva el agua.','La repetición se indicaría con un asterisco.'],
    ['Que son alternativas excluyentes.','Las alternativas se marcan con un círculo.'],
    ['Que son tareas que el usuario puede saltarse.','La doble línea no indica que la tarea sea opcional.']]],
  [2,183,'El plan 0 de «Hacer té» dice: «hacer 1; al mismo tiempo, si tetera llena, hacer 2; 3-4-5; después de 4-5 min, hacer 6». ¿Qué aporta este plan al árbol?',[
    ['El orden y las condiciones en que se ejecutan las subtareas del objetivo 0.','Sin el plan, el árbol solo enumera subtareas; el plan indica cuándo y en qué orden se hacen.'],
    ['La lista de materiales necesarios para hacer el té.','El plan no describe recursos, sino el orden de ejecución.'],
    ['Que todas las subtareas se hacen siempre en el orden 1-2-3-4-5-6, sin condiciones.','La tarea 2 depende de una condición (si la tetera está llena).'],
    ['La descomposición interna de la tarea 1 «calentar agua».','Esa la describe el plan 1, no el plan 0.']]],
  [2,183,'Según el plan 1 de «Hacer té», ¿cuándo se ejecuta la subtarea 1.5 «apagar fuego»?',[
    ['Cuando hierve el agua, después de 1.1-1.2-1.3-1.4.','El plan 1 dice «hacer 1.1-1.2-1.3-1.4; cuando hierva el agua, hacer 1.5».'],
    ['Antes de llenar el cazo.','Contradice la secuencia del plan 1.'],
    ['A la vez que se sirve el té (tarea 6).','La tarea 6 pertenece al plan 0 y ocurre después.'],
    ['Solo si la tetera estaba llena.','Esa condición afecta a la tarea 2 del plan 0, no a la 1.5.']]],
  [2,184,'¿Qué es GOMS, según el tema?',[
    ['Una familia de técnicas de Card, Moran y Newell (1983) para modelar las tareas desde el punto de vista humano: objetivos, operadores, métodos y reglas de selección.','La página 184 da esta definición y el significado del acrónimo.'],
    ['Un lenguaje de programación de interfaces gráficas.','GOMS es una técnica de modelado, no un lenguaje de programación.'],
    ['Una norma ISO de accesibilidad web.','El tema no lo presenta como norma de accesibilidad.'],
    ['Una herramienta para crear mockups de alta fidelidad.','Las herramientas de mockups son otras (Photoshop, Illustrator…).']]],
  [2,185,'Un usuario puede cerrar una ventana con Alt-F4 o con Archivo › Cerrar. En GOMS, ¿qué son estas dos formas?',[
    ['Métodos: alternativas distintas para conseguir el mismo objetivo.','La página 185 usa este mismo ejemplo para ilustrar los métodos.'],
    ['Objetivos: lo que el usuario pretende conseguir.','El objetivo es cerrar la ventana; estas son formas de lograrlo.'],
    ['Reglas de selección.','Las reglas deciden cuál de los métodos se usa.'],
    ['Tareas unitarias de un análisis jerárquico.','Es terminología de otra notación.']]],
  [2,186,'En el ejemplo GOMS, aparece «IF (USUARIO-EXPERTO) USAR-MÉTODO-TECLADO ELSE USAR-MÉTODO-RATÓN». ¿Qué elemento es?',[
    ['Una regla de selección: elige entre las alternativas para alcanzar el objetivo.','La página 186 la presenta como Rule 1.'],
    ['Un operador.','Los operadores son acciones básicas como pulsar teclas.'],
    ['Un objetivo.','El objetivo del ejemplo es CERRAR-VENTANA.'],
    ['Un plan de análisis jerárquico.','Es GOMS, no la notación de análisis jerárquico.']]],

  [3,191,'En el primer sketch de una app, el equipo dedica la mañana a elegir los colores hexadecimales exactos de cada botón. ¿Qué se desvía de lo que propone el tema?',[
    ['El sketch debe reflejar ideas generales con trazos rápidos, no detalles finales.','Las páginas 190–191 lo presentan como una idea inicial rápida, a modo de tormenta de ideas.'],
    ['Nada: el sketch es la fase donde se fija la paleta definitiva.','La paleta y los detalles visuales se definen en el mockup.'],
    ['El sketch debería hacerse directamente en código.','El tema lo describe con lápiz y papel.'],
    ['El sketch debe hacerse solo cuando el prototipo está terminado.','Es la primera fase, no la última.']]],
  [3,191,'¿Qué ideas debe recoger un sketch según el tema?',[
    ['Dónde irán los elementos característicos (como el logo), la navegación, la ayuda, los servicios de redes sociales y las áreas de contenido.','Es la lista de la página 191.'],
    ['El código CSS definitivo de cada componente.','Corresponde a fases mucho más avanzadas.'],
    ['Las pruebas de rendimiento del servidor.','No forma parte del boceto de la interfaz.'],
    ['Los textos legales definitivos de la aplicación.','El sketch trabaja ideas generales, no contenidos definitivos.']]],
  [3,193,'Mientras bocetan, una estudiante escribe notas al margen explicando por qué descartó cada idea. ¿Cómo lo valora el tema?',[
    ['Positivamente: documentar con anotaciones al margen es recomendable y puede servir para otras interfaces.','La página 193 lo recomienda expresamente.'],
    ['Negativamente: el sketch no debe llevar ninguna anotación.','El tema pide documentar lo hecho con anotaciones.'],
    ['Es irrelevante, porque los sketches se tiran al terminar.','El tema dice que las anotaciones pueden reutilizarse en otras interfaces.'],
    ['Solo es válido si las notas se pasan a un documento formal antes de seguir.','El tema no exige ese paso.']]],
  [3,194,'¿Qué frase resume mejor el enfoque de un wireframe?',[
    ['Se centra en «qué hace la pantalla, no cómo se ve».','Es la formulación literal de la página 194.'],
    ['Se centra en el aspecto visual final con colores y tipografías.','Eso corresponde al mockup; el wireframe carece de estilo.'],
    ['Es un programa navegable para hacer pruebas con usuarios.','Eso describe un prototipo.'],
    ['Es un análisis de las tareas que hace el usuario.','Es una fase de diseño de pantallas, no de análisis de tareas.']]],
  [3,197,'Un wireframe usa tres familias tipográficas, los colores corporativos y fotos reales. ¿Qué consejo del tema incumple?',[
    ['No usar colores (solo tonos de gris) ni imágenes, y usar un solo tipo de letra, aunque sea en varios tamaños.','Son los consejos de la página 197.'],
    ['Ninguno: un wireframe debe parecerse al máximo al producto final.','Ese es el papel del mockup de alta fidelidad.'],
    ['Que el wireframe debe ser siempre a color para distinguir zonas.','El tema pide tonos de gris.'],
    ['Que nunca debe incluir logo ni navegación.','El tema cita el logo y la navegación como elementos habituales.']]],
  [3,198,'¿Por qué el tema propone rejillas de 960 puntos para diseñar en monitor?',[
    ['Porque 960 es divisible entre 1, 2, 3, 4, 5, 6 y 12, y permite subdividir cómodamente en columnas.','Es la justificación de la página 198.'],
    ['Porque es la resolución exacta de todos los monitores.','El tema no lo justifica así.'],
    ['Porque obliga a usar exactamente 7 columnas.','960 no es divisible entre 7.'],
    ['Porque así se evita tener que diseñar para móvil.','El tema pide también wireframes para dispositivos pequeños.']]],
  [3,202,'Un equipo debe hacer wireframes de una web responsive. ¿Por dónde recomienda empezar el tema?',[
    ['Por los anchos estrechos: móvil, después tableta y después escritorio.','La página 202 recomienda empezar por el dispositivo más pequeño.'],
    ['Por el escritorio, y adaptarlo después reduciendo.','Es el orden contrario al recomendado.'],
    ['Solo por el escritorio: el resto lo ajustan los programadores.','El tema dice que no se debe dejar el diseño a los programadores.'],
    ['Por la tableta, porque es el tamaño intermedio.','El tema indica empezar por el más pequeño.']]],
  [3,200,'Con el armazón del wireframe ya hecho, ¿cómo se crea la jerarquía de la información?',[
    ['Con la tipografía: distintos tamaños de fuente, negritas y subrayados para diferenciar niveles.','Es lo que indica la página 200.'],
    ['Con colores distintos para cada nivel de información.','El wireframe no usa colores.'],
    ['Con fotografías que señalen lo más importante.','El wireframe evita las imágenes.'],
    ['Con animaciones que llamen la atención.','El tema no lo propone para un wireframe.']]],

  [4,190,'¿En qué se diferencia el prototipo de sketches, wireframes y mockups, según el tema?',[
    ['Los otros tres son más creativos y abstractos; el prototipo lleva las ideas a la vida y es necesario para las pruebas de usabilidad.','Es la comparación de la página 190.'],
    ['El prototipo es más abstracto que el sketch.','Es al revés: el prototipo es el más concreto.'],
    ['El prototipo no sirve para probar la experiencia de usuario.','El tema dice que es necesario precisamente para eso.'],
    ['El prototipo es siempre la primera fase del diseño.','Suele ser la última de las cuatro fases.']]],
  [4,205,'Un equipo prepara rápido una maqueta intermedia para discutir el estilo, sin buscar todavía el acabado final. ¿Qué tipo de mockup es?',[
    ['De media fidelidad: transitorio, sin perder demasiado tiempo.','La página 205 la distingue de la de alta fidelidad, que es casi el producto final.'],
    ['De alta fidelidad.','La alta fidelidad es casi el producto final.'],
    ['Un wireframe.','El wireframe no incluye estilo visual.'],
    ['Un prototipo navegable.','El prototipo es interactivo; el mockup suele ser estático.']]],
  [4,206,'¿Qué afirmación sobre los mockups es correcta?',[
    ['Suelen ser estáticos e incluyen detalles visuales como colores y tipografía; sus textos e imágenes no tienen por qué ser definitivos.','Es lo que describe la página 206.'],
    ['Son siempre navegables y permiten probar la validación de formularios.','Eso corresponde al prototipo.'],
    ['No incluyen colores ni tipografías.','Eso describe un wireframe.'],
    ['Exigen que todos los textos e imágenes sean ya los definitivos.','La página 206 dice que no tienen por qué serlo.']]],
  [4,209,'¿Cuál de estos es un punto fuerte del mockup, según el tema?',[
    ['Permite probar el diseño antes de escribir código y ayuda a crear el libro de estilo.','Ambos aparecen entre los puntos fuertes de la página 209.'],
    ['Sustituye por completo las pruebas de usabilidad con prototipos.','El tema reserva las pruebas de usabilidad a los prototipos.'],
    ['Es más difícil de presentar a quien no es diseñador.','Es al revés: es más fácil de presentar, sobre todo en alta fidelidad.'],
    ['Hace los cambios de diseño más rígidos.','El tema dice que es flexible y facilita los cambios.']]],
  [4,210,'Un mockup tiene bordes redondeados con degradado y transparencia que no aportan nada y complican el CSS, y además no se alinea a ninguna rejilla. ¿Qué indica el tema?',[
    ['Son puntos débiles: demasiados efectos y detalles, y no usar rejillas ni alinear bien los elementos.','La página 210 recoge ambos como errores.'],
    ['Son buenas prácticas, porque hacen el mockup más realista.','El tema pide quitar lo que no aporta valor o dificulta el código.'],
    ['Solo sería un problema si el mockup fuera de baja fidelidad.','El tema no hace esa distinción.'],
    ['No importa, porque la alineación se decide en el prototipo.','No usar rejillas es un punto débil del propio mockup.']]],
  [4,216,'¿Qué permite un prototipo que no permite un mockup estático?',[
    ['Navegar y probar la interacción: botones, validación de formularios, iconos y transiciones.','La página 216 dice que los prototipos son navegables y prueban la interacción.'],
    ['Ver la paleta de colores.','Un mockup ya incluye colores.'],
    ['Ver la tipografía.','Un mockup ya incluye tipografía.'],
    ['Distribuir el espacio de la pantalla.','Eso ya se trabaja en el wireframe.']]],
  [4,216,'¿En qué tipo de proyecto se podría prescindir del prototipo, según el tema?',[
    ['En un blog o una web sencilla.','La página 216 lo admite en esos casos, frente a apps, videojuegos o grandes webs.'],
    ['En un videojuego.','El tema lo pone como ejemplo de proyecto donde el prototipo es muy útil.'],
    ['En una app compleja.','Es un caso en el que el prototipo resulta de gran utilidad.'],
    ['En una web grande con muchas secciones.','El tema lo cita entre los proyectos que sí lo necesitan.']]],
  [4,217,'Al crear un prototipo, ¿qué recomienda el tema?',[
    ['Que intervengan diseño, cliente y desarrollo, y diseñar a tamaño real incluyendo la estructura de navegación.','Son recomendaciones de la página 217.'],
    ['Que lo haga solo el equipo de desarrollo, sin el cliente.','El tema pide la participación del cliente y de diseño.'],
    ['Diseñarlo a escala reducida y sin navegación para ahorrar tiempo.','El tema pide tamaño real y estructura de navegación.'],
    ['Que cada sección pueda tener un objetivo ambiguo para dar libertad al usuario.','El objetivo de cada sección debe quedar claro.']]]
].map((q,i)=>({id:i+1,bloque:q[0],pagina:q[1],enunciado:q[2],opciones:q[3].map((o,j)=>({texto:o[0],explicacion:o[1],correcta:j===0}))}));
