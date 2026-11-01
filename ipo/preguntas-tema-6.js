/* Tema VI, IPO2627.pdf, páginas 285–349 (El diseño gráfico). Cada opción incluye su justificación.
   La primera opción de cada pregunta es la correcta; test.js baraja las cuatro opciones. */
const BLOQUES = ['Objetivos del diseño', 'Elementos de la imagen', 'Uso del color', 'Técnicas de diseño gráfico', 'Iconos y recomendaciones'];
const BANCO = [
  [0,288,'Tras un rediseño, los usuarios completan sus tareas sin fijarse en la interfaz y apenas recuerdan cómo era. ¿Cómo lo valora el tema?',[
    ['Como un éxito: el objetivo es una interfaz transparente, que casi no se detecta y no obstruye el acceso.','La página 288 define así el objetivo del diseño: la interfaz casi no es detectada.'],
    ['Como un fracaso: una buena interfaz debe ser lo más memorable de la aplicación y destacar por encima del contenido.','El tema busca lo contrario: que la interfaz no se interponga entre el usuario y su tarea.'],
    ['Como un problema de estética: falta decoración y elementos llamativos para que el usuario note y recuerde la interfaz.','Añadir decoración para hacerse notar va contra la transparencia buscada.'],
    ['Como irrelevante: el diseño gráfico no influye en la experiencia del usuario, que depende solo de las funciones del sistema.','La página 288 vincula el diseño con una buena experiencia de interacción.']]],
  [0,288,'¿Qué rasgos describen, según el tema, los objetivos de un buen diseño de la interfaz?',[
    ['Transparencia, no obstruir el acceso y que el usuario tenga una buena experiencia interaccionando con el sistema.','Son los objetivos enumerados en la página 288.'],
    ['Máxima densidad de controles por pantalla y uso de todos los colores disponibles, para ofrecer cuanto antes cada función al usuario.','El tema no persigue densidad ni variedad cromática, sino transparencia.'],
    ['Originalidad visual por encima de la facilidad de uso, para que la interfaz sea diferente de la de otros productos.','El objetivo es una buena experiencia, no la originalidad en sí misma.'],
    ['Que la interfaz destaque sobre el contenido y se note en todo momento, para reforzar la imagen de marca del producto.','Se busca que la interfaz casi no sea detectada.']]],
  [0,289,'Un botón parece un texto decorativo y un texto decorativo parece un botón. ¿Qué pauta del tema se incumple?',[
    ['Los controles deben tener un aspecto acorde a su función y funcionar de acuerdo con su aspecto.','La página 289 pide coherencia entre apariencia y comportamiento.'],
    ['Usar como máximo 5±2 colores en la interfaz, ya que esa cantidad es la que el usuario retiene en la memoria.','Es una pauta de color; el problema descrito es la correspondencia entre aspecto y función.'],
    ['Diseñar primero la interfaz en blanco y negro y añadir el color solo cuando el resto del diseño esté terminado.','Es una sugerencia sobre el color, no sobre la apariencia de los controles.'],
    ['Utilizar formatos verticales o circulares en todas las pantallas para dar dinamismo a la composición gráfica.','El formato del cuadro no explica la confusión entre controles y decoración.']]],
  [0,289,'Un equipo separa el trabajo: unos deciden qué hace cada pantalla y otros, más tarde y sin coordinarse, cómo se ve. ¿Qué recomendación del tema ignora?',[
    ['Conjuntar el diseño funcional y el visual, considerando cada aspecto con un sentido del conjunto.','La página 289 pide integrar ambos diseños con visión de conjunto.'],
    ['Usar colores estandarizados para los mensajes de error, de modo que el usuario los reconozca en cualquier pantalla.','Es una pauta de claridad del color, no de organización del diseño.'],
    ['Evitar el azul puro en el texto y en las líneas finas, porque el ojo no lo enfoca bien.','Es una regla de Murch sobre el color, ajena al problema.'],
    ['Colocar los pesos mayores en la zona izquierda de la pantalla, que es la más estable de la composición.','Es una regla de composición, no de coordinación entre diseño funcional y visual.']]],
  [0,289,'¿Cuándo resulta intuitiva una interfaz, según el tema?',[
    ['Cuando el diseño visual aclara sus funciones.','Es la conclusión de la página 289.'],
    ['Cuando incluye un manual extenso accesible desde cada pantalla.','La intuición surge del propio diseño visual, no de documentación externa.'],
    ['Cuando todos los elementos tienen el mismo peso visual.','La página 324 advierte que eso hace la composición aburrida y la navegación difícil.'],
    ['Cuando usa colores muy saturados en todos los controles.','Los colores muy saturados causan fatiga (p. 315), no hacen la interfaz intuitiva.']]],
  [0,349,'Alguien afirma que el diseño gráfico es una cuestión de buen gusto personal. ¿Qué responde el tema en sus conclusiones?',[
    ['Que el diseño se basa en conocimientos fundados sobre la percepción humana y existen reglas de fácil aplicación.','La página 349 lo afirma expresamente.'],
    ['Que tiene razón, por lo que no existen reglas ni guías de estilo útiles que puedan aplicarse de manera sistemática.','El tema concluye que es importante recurrir a las guías de estilo.'],
    ['Que el diseño solo afecta a la estética de la interfaz y no tiene ninguna influencia sobre la usabilidad del sistema.','La página 349 dice que el diseño es importante para la usabilidad.'],
    ['Que basta con copiar la interfaz de un producto conocido, ya que así se garantiza un resultado correcto sin necesidad de conocimientos.','El tema no propone la copia, sino aplicar reglas basadas en la percepción.']]],
  [0,349,'Según las conclusiones del tema, ¿qué consigue un buen diseño?',[
    ['Aunar la funcionalidad con la estética.','Es una de las conclusiones de la página 349.'],
    ['Sacrificar la funcionalidad para lograr una estética llamativa.','El tema pide unir ambas, no sacrificar una.'],
    ['Eliminar la necesidad de evaluar la usabilidad.','El tema relaciona el diseño con la usabilidad, no la sustituye.'],
    ['Sustituir a las guías de estilo.','La página 349 recomienda recurrir a ellas.']]],
  [0,286,'¿Cuáles son los objetivos de aprendizaje que plantea el tema VI?',[
    ['Valorar la importancia del diseño en la interfaz y conocer sus principios, métodos y herramientas.','Son los objetivos de la página 286.'],
    ['Aprender a programar motores gráficos y aceleración por hardware para obtener un rendimiento visual elevado.','El tema no trata la implementación gráfica de bajo nivel.'],
    ['Traducir la interfaz a varios idiomas y adaptarla a diferentes culturas y regiones del mundo.','Eso corresponde al tema de internacionalización.'],
    ['Medir el rendimiento de la memoria a largo plazo del usuario mediante pruebas de reconocimiento.','El tema trata el diseño gráfico, no experimentos de memoria.']]],

  [1,291,'¿Qué lista recoge únicamente elementos del alfabeto gráfico de la imagen según el tema?',[
    ['Punto, línea, forma, luz, color, tiempo, tamaño, formato y composición.','Es la enumeración de la página 291.'],
    ['Punto, píxel, vector, código, color, fuente y resolución, que son elementos del software gráfico.','Píxel, vector o código no forman parte del alfabeto gráfico del tema.'],
    ['Menú, botón, ventana, icono, cursor y barra de desplazamiento, propios de una interfaz gráfica.','Son elementos de una GUI, no los elementos morfológicos de la imagen.'],
    ['Proximidad, semejanza, cierre, continuidad y figura-fondo, que son leyes de la percepción visual.','Son principios de la Gestalt, no los elementos que enumera la página 291.']]],
  [1,292,'Una página muestra una sucesión de puntos que guía la vista del inicio al botón de pago. ¿Qué propiedad del punto aprovecha?',[
    ['Una secuencia de puntos imprime ritmo y crea una dirección de movimiento que ayuda a dirigir la visión.','La página 292 atribuye al punto esa capacidad.'],
    ['El punto define una superficie con dimensiones dadas y por sí solo no puede guiar la vista del usuario.','Esa es la definición de la forma (p. 294).'],
    ['El punto establece la proporción del cuadro y sirve para fijar el formato general de la página.','Eso corresponde al formato (p. 301).'],
    ['El punto simula el paso del tiempo mediante la tonalidad, cambiando de color según avanza la página.','La tonalidad es una característica de la luz (p. 295).']]],
  [1,293,'¿Qué función atribuye el tema a la línea?',[
    ['Organiza el espacio, determina ejes que delimitan zonas de atracción y puede crear textura, profundidad y movimiento.','Son las propiedades de la página 293.'],
    ['Es el elemento más simple del alfabeto gráfico y tiene gran fuerza atractiva como marca, aunque no estructura el espacio.','Esas son propiedades del punto (p. 292).'],
    ['Combina radiaciones de distinta longitud de onda para crear los tonos que percibe el ojo.','Describe el sistema de color aditivo (p. 296).'],
    ['Es la proporción del cuadro donde se muestra la imagen y determina si el formato es horizontal o vertical.','Es la definición del formato (p. 301).']]],
  [1,294,'¿Qué formas básicas y qué función atribuye el tema a la forma?',[
    ['Cuadrado, triángulo y círculo; definir y organizar el espacio.','La página 294 lo indica así.'],
    ['Rectángulo, rombo y estrella; transmitir sentimientos.','Las formas básicas citadas son otras; transmitir sentimientos se asocia al color.'],
    ['Punto, línea y plano; simular el paso del tiempo.','Punto y línea son otros elementos; el tiempo es un elemento distinto.'],
    ['Cuadrado, triángulo y círculo; fijar el orden de lectura.','Las formas son correctas, pero su función es definir y organizar el espacio.']]],
  [1,295,'Un texto blanco sobre fondo negro parece más grueso que el mismo texto negro sobre fondo blanco. ¿Qué efecto de la luz lo explica?',[
    ['Un tono claro se expande rodeado de uno oscuro y un tono oscuro se comprime rodeado de uno claro.','La página 295 describe ese efecto de la tonalidad.'],
    ['Los colores saturados producen un fuerte impacto visual, por lo que el texto blanco parece más grueso.','La saturación no explica el cambio aparente de tamaño.'],
    ['Los formatos horizontales son más estáticos, y por eso el texto sobre fondo negro se ve de mayor grosor.','El formato no interviene en el efecto descrito.'],
    ['El azul se enfoca en el fondo del campo visual, lo que hace que el texto blanco se vea más grueso.','Es un efecto del orden espectral del color, no de la tonalidad clara y oscura.']]],
  [1,296,'Un diseñador prepara una paleta para una pantalla y luego la imprime, y los colores cambian. ¿Qué distinción del tema lo explica?',[
    ['Las pantallas usan un sistema aditivo de radiaciones; el papel, uno sustractivo de pigmentos cian, magenta y amarillo.','La página 296 diferencia ambos sistemas de color.'],
    ['Las pantallas usan pigmentos de cian, magenta y amarillo y el papel radiaciones luminosas de distinta longitud de onda.','La relación está invertida.'],
    ['El color de pantalla depende de la forma de los elementos; el del papel, de la línea y del trazo.','Forma y línea no determinan el sistema de color.'],
    ['Pantalla y papel usan el mismo sistema, así que el cambio se debe al formato.','El tema distingue sistemas distintos para cada soporte.']]],
  [1,296,'Una paleta se vuelve casi gris al reducir uno de sus parámetros. ¿Cuál ha bajado y qué mide?',[
    ['La saturación o intensidad, que mide la cantidad de color; poca saturación tiende al blanco y negro.','La página 296 define así la saturación.'],
    ['La tonalidad o matiz, que mide la cantidad de luz reflejada por la superficie y la vuelve más gris.','El matiz corresponde a la longitud de onda; la luz reflejada es la luminosidad.'],
    ['La luminosidad, que mide la longitud de onda dominante y define el color de la paleta.','La luminosidad es la cantidad de luz que refleja el color.'],
    ['El formato de la imagen, que mide la vividez de los colores de la paleta.','El formato es la proporción del cuadro, no una característica del color.']]],
  [1,298,'Un panel combina texto rojo sobre fondo verde muy intensos y los usuarios dicen que «vibra». ¿Qué explica el tema?',[
    ['El contraste de complementarios llama la atención, pero si es muy acentuado reduce la legibilidad por vibración.','La página 298 advierte de ese efecto del contraste.'],
    ['Es una armonía cromática: colores afines con variaciones suaves, que favorece la legibilidad del panel.','Rojo y verde son complementarios; la armonía relaciona colores afines.'],
    ['El problema es el formato horizontal del panel, que resulta estático y hace que el texto parezca vibrar.','La vibración procede del contraste cromático, no del formato.'],
    ['Es un efecto de la tonalidad que hace que el tono oscuro se expanda y el claro se comprima en el panel.','El tema dice que se expande el tono claro rodeado de oscuro, y el caso trata de contraste cromático.']]],
  [1,301,'Se debate entre un banner horizontal y uno vertical para transmitir dinamismo. ¿Qué indica el tema sobre el formato?',[
    ['Los formatos horizontales son más estáticos; los verticales y circulares, más dinámicos.','La página 301 lo indica así.'],
    ['Los horizontales son los más dinámicos por adaptarse al campo visual, mientras que los verticales resultan estáticos.','El tema asocia la horizontalidad con lo estático.'],
    ['El formato no influye en la composición, que solo depende de los colores y el tamaño de los elementos.','La página 301 dice que influye decisivamente y le da significado.'],
    ['Los formatos circulares son los más estáticos de todos, por lo que transmiten calma y estabilidad.','El tema los agrupa con los verticales como dinámicos.']]],
  [1,303,'Al componer una pantalla, ¿qué regla de composición recoge el tema?',[
    ['La zona izquierda es más estable y admite pesos mayores sin desequilibrar; a mayor tamaño, mayor peso.','Son reglas de la página 303.'],
    ['La zona inferior es la más dinámica y llamativa, y admite los pesos mayores sin desequilibrar la pantalla.','El tema indica que la inferior es más estática y sólida, y la superior más dinámica.'],
    ['El tamaño de los elementos no influye en el peso compositivo, que depende solo de su posición en la pantalla.','A mayor tamaño, mayor peso compositivo.'],
    ['Hay que evitar un centro de interés en la pantalla para no distraer al usuario de la información principal.','La página 302 pide delimitar claramente el centro de interés.']]],

  [2,305,'¿Por qué dedica el tema un apartado específico al uso del color en las GUI?',[
    ['Porque tiene gran impacto: bien usado mejora la presentación y ayuda a la memoria y a formar modelos mentales; mal usado reduce la funcionalidad.','Es la motivación de la página 305.'],
    ['Porque el color solo es decorativo y no afecta a la funcionalidad, aunque conviene tratarlo en un apartado propio.','El tema afirma que un uso inapropiado reduce la funcionalidad.'],
    ['Porque el color sustituye al texto en todos los mensajes, lo que hace innecesaria cualquier otra explicación.','El tema no propone sustituir el texto por el color.'],
    ['Porque las GUI deben usar el mayor número de colores posible para ofrecer una presentación más rica y atractiva.','La página 309 recomienda pocos colores.']]],
  [2,306,'¿Qué clasificación de modelos de color es correcta?',[
    ['Perceptuales: HSV y HLS; de dispositivos de presentación: RGB y YIQ/YUV.','La página 306 los clasifica así.'],
    ['Perceptuales: RGB y YIQ, por basarse en la percepción; de dispositivos de presentación: HSV y HLS, por depender de la pantalla.','La clasificación está invertida.'],
    ['Todos son modelos perceptuales y equivalentes uno a uno, por lo que no se necesita ninguna conversión entre ellos.','La página 307 señala que no hay un mapeo uno a uno.'],
    ['HSV se usa en la televisión y YIQ en los monitores de ordenador, que son dispositivos de presentación.','YIQ/YUV se usa en televisión; RGB, en monitores.']]],
  [2,307,'Un diseñador elige colores en HSV y al mostrarlos en el monitor no coinciden exactamente. ¿Qué explicación da el tema?',[
    ['No hay un mapeo uno a uno entre los modelos perceptuales y los de presentación; el modelo CIE permite traducir de HSV a RGB.','La página 307 describe ese problema y la solución CIE.'],
    ['HSV y RGB son modelos idénticos; el fallo está en el formato del cuadro y en la proporción de la pantalla.','Son modelos distintos y su correspondencia no es directa.'],
    ['Los monitores usan el modelo sustractivo de pigmentos, por lo que HSV no puede representarse en ellos con exactitud.','Los monitores usan RGB, un sistema aditivo.'],
    ['El modelo HLS impide representar los colores en pantalla, de modo que HSV es el único válido para monitores.','El tema no afirma tal limitación.']]],
  [2,309,'Un panel usa doce colores y el rojo indica a la vez «error», «favorito» y «oferta». ¿Qué pautas de simplicidad incumple?',[
    ['Mantener pocos colores (5±2) y no vincular más de un concepto a un solo color.','La página 309 pide un esquema simple y conceptos diferentes con colores diferentes.'],
    ['Usar siempre el azul como color de texto para que el contraste sea el mismo en todas las pantallas.','Murch recomienda descartar el azul puro para texto (p. 318).'],
    ['Utilizar al menos un color distinto por cada pantalla de la aplicación para que el usuario las identifique.','No es una pauta del tema.'],
    ['Evitar los colores primarios por ser difíciles de recordar y de distinguir entre sí en pantalla.','El tema recomienda vincular significados a los primarios por ser fáciles de recordar.']]],
  [2,310,'En una pantalla los campos no editables tienen fondo gris y en otra el gris marca los obligatorios. ¿Qué pauta se rompe?',[
    ['Consistencia: evitar cambiar el significado de los colores entre pantallas, sobre todo al codificar información.','La página 310 pone precisamente ese ejemplo.'],
    ['Simplicidad: usar 5±2 colores y no sobrecargar cada pantalla con muchos matices distintos entre sí.','El número de colores no es el problema descrito.'],
    ['Claridad: usar el verde para el progreso positivo y el rojo para los errores en todos los mensajes de la aplicación.','El caso no trata de mensajes de progreso.'],
    ['Composición: la zona izquierda es más estable y admite mayores pesos visuales sin desequilibrar la pantalla.','No es una cuestión de composición.']]],
  [2,310,'Según el orden espectral y perceptual que recoge el tema, ¿dónde se enfoca cada color?',[
    ['El rojo en el frente, el verde y el amarillo en medio, y el azul en el fondo.','Es el orden de la página 310.'],
    ['El azul se enfoca en el frente del campo visual y el rojo en el fondo, siguiendo el orden espectral invertido.','La relación está invertida.'],
    ['Todos los colores se enfocan en el mismo plano de la retina, por lo que el orden espectral no influye en la percepción.','El tema distingue planos de enfoque por color.'],
    ['El amarillo en el frente, el rojo en medio y el verde en el fondo, ordenados de mayor a menor brillo.','Verde y amarillo se enfocan en medio.']]],
  [2,311,'Una leyenda usa cinco tonos de azul para cinco categorías distintas. ¿Qué indica el tema?',[
    ['Que no se usen varios matices del mismo color, sobre todo azules, y que conceptos diferentes lleven colores diferentes.','La página 311 lo recomienda expresamente.'],
    ['Que es correcto porque el azul es el mejor color para el texto y los matices ayudan a distinguir las categorías.','Murch desaconseja el azul puro en texto y figuras pequeñas.'],
    ['Que es correcto porque mantiene el esquema en un solo color, lo que da coherencia y simplicidad a la leyenda.','La simplicidad no justifica distinguir conceptos con matices difíciles de discriminar.'],
    ['Que debe añadirse un sexto tono de azul para el fondo de la leyenda, y mantener los cinco matices anteriores.','Añadir más azules agrava el problema.']]],
  [2,313,'¿Qué código de color en los mensajes recoge el tema como mejora de la usabilidad?',[
    ['Rojo para errores, amarillo para advertencias y verde para progreso positivo.','Es el código de la página 313.'],
    ['Verde para errores, rojo para progreso positivo y azul para advertencias, de forma que cada mensaje tenga un color propio.','No coincide con los colores estandarizados del tema.'],
    ['Un mismo color para todos los mensajes del sistema, con el fin de no distraer al usuario de la tarea.','El tema propone códigos de color para distinguir los mensajes.'],
    ['Amarillo para errores y rojo para avisos informativos, de modo que los mensajes críticos pasen más inadvertidos.','El rojo se reserva para alertar de errores.']]],
  [2,312,'Un usuario busca en un listado las facturas vencidas, que siempre aparecen en rojo y solo ellas. ¿Qué efecto describe el tema?',[
    ['El tiempo de búsqueda disminuye si el color se conoce de antemano y solo se aplica a esa información.','Es la pauta de claridad de la página 312.'],
    ['El tiempo de búsqueda aumenta porque el rojo genera fatiga visual, aunque solo se aplique a esas facturas.','El color conocido y exclusivo reduce el tiempo de búsqueda.'],
    ['El color solo mejora la estética del listado, pero no influye en el procesamiento de la información por el usuario.','La página 312 dice que también mejora el procesamiento y la memoria.'],
    ['El efecto se pierde si el rojo está estandarizado, porque el usuario deja de percibirlo como un elemento destacado.','El tema recomienda precisamente usar colores estandarizados.']]],
  [2,317,'¿Qué recomendación pertenece a las reglas de Marcus sobre el color?',[
    ['Usar azul para el fondo, seguir la secuencia espectral, mantener pocos colores y diseñar primero en blanco y negro.','Son reglas y sugerencias de Marcus (p. 317).'],
    ['Usar azul puro para el texto y las líneas delgadas, que es el color que mejor se enfoca en la retina.','Murch recomienda descartarlo (p. 318).'],
    ['Usar el rojo y el verde en la periferia de las presentaciones grandes, y el azul en el centro del campo visual.','Murch recomienda evitarlo (p. 319).'],
    ['Usar colores muy saturados y espectralmente extremos a la vez para que destaquen sobre el fondo de la pantalla.','Murch aconseja evitar ese despliegue simultáneo (p. 318).']]],
  [2,318,'Una aplicación para personas mayores usa texto azul puro sobre fondo oscuro y colores apagados. ¿Qué reglas de Murch incumple?',[
    ['Descartar el azul puro para texto y figuras pequeñas, y dar más brillo a los operadores de edad avanzada.','Ambas reglas aparecen en la página 318.'],
    ['Usar azul para el fondo y seguir la secuencia espectral al ordenar los colores de las distintas zonas de la pantalla.','Son reglas de Marcus, y el caso no las contradice directamente.'],
    ['Diseñar primero la interfaz en blanco y negro y añadir el color solo al final del proceso de diseño.','Es una sugerencia, no explica los problemas descritos.'],
    ['Usar colores opuestos juntos en una misma zona de la pantalla, para aprovechar su contraste en la presentación.','Murch indica que los colores opuestos se ven bien juntos (p. 319).']]],
  [2,319,'Un mapa distingue zonas seguras y peligrosas solo con verde y rojo. ¿Qué recomendación de Murch se aplica?',[
    ['Para observadores con deficiencias del color, evitar hacer distinciones de un solo color.','La página 319 lo indica expresamente.'],
    ['Usar el rojo y el verde en la periferia de las presentaciones grandes, y el azul en el centro de la pantalla.','Murch recomienda evitarlo.'],
    ['Usar varios matices del mismo azul para distinguir las zonas seguras de las peligrosas dentro del mapa.','No resuelve el problema y la página 311 lo desaconseja.'],
    ['Enfocar la atención hacia orillas creadas solo por el color, que es lo que recomienda Murch para este mapa.','La página 319 dice que es difícil enfocar esas orillas.']]],
  [2,315,'¿Qué efecto negativo del color señala el tema?',[
    ['Usar muchos colores puros o muy saturados obliga al ojo a reenfocar constantemente y causa fatiga.','La página 315 lo advierte.'],
    ['Los colores poco saturados obligan a reenfocar constantemente y causan más fatiga que los colores puros.','El tema atribuye ese problema a los colores puros y muy saturados.'],
    ['Usar pocos colores impide crear modelos mentales y obliga al usuario a leer todos los mensajes del texto.','La página 309 recomienda pocos colores.'],
    ['El color de fondo nunca influye en cómo se percibe el del frente, que mantiene siempre su aspecto original.','La página 311 advierte de colores que parecen distintos por la variación del fondo.']]],

  [3,324,'Un cuadro de mando muestra todos los indicadores con el mismo tamaño, color y peso. ¿Qué consecuencia prevé el tema?',[
    ['Una composición aburrida y una navegación difícil: hace falta énfasis para destacar lo importante.','La página 324 lo advierte al describir el énfasis.'],
    ['Una interfaz transparente y fácil de usar, ya que todos los indicadores reciben la misma atención del usuario.','La falta de jerarquía dificulta la navegación.'],
    ['Mayor dinamismo, porque todos los elementos compiten por la atención y el usuario encuentra antes lo importante.','El tema habla de composición aburrida, no dinámica.'],
    ['Un foco claro en el elemento más importante, porque el tamaño y el color iguales ayudan a localizarlo.','Sin diferencias de peso no hay un punto focal claro.']]],
  [3,324,'¿Con qué recursos se consigue el énfasis, según el tema?',[
    ['Con la posición, el color y los atributos del texto.','La página 324 los enumera.'],
    ['Solo con el tamaño de la ventana y la resolución del monitor donde se muestra la aplicación.','El tema cita posición, color y atributos del texto.'],
    ['Eliminando la alineación de los elementos para que ninguno destaque sobre los demás en la pantalla.','La alineación aporta equilibrio; no es el recurso para enfatizar.'],
    ['Con más matices del mismo color azul aplicados a todos los elementos de la pantalla por igual.','La página 311 desaconseja esos matices.']]],
  [3,324,'Al adaptar una interfaz a un idioma que se lee de derecha a izquierda, ¿qué técnica de diseño gráfico debe revisarse especialmente?',[
    ['La disposición, porque el orden de lectura es importante y varía según la cultura.','La página 324 lo señala al definir la disposición.'],
    ['El sistema de color sustractivo de la interfaz, que cambia cuando se invierte la lectura.','Afecta a la impresión, no al orden de lectura.'],
    ['El lenguaje icónico de depuración del código, que varía en las culturas que leen al revés.','Es un ejemplo de iconos, no tiene relación con el orden de lectura.'],
    ['La saturación de los colores empleados, que cambia con la dirección de lectura de cada idioma.','No depende de la dirección de lectura.']]],
  [3,325,'Un formulario tiene etiquetas y campos desalineados unos píxeles entre sí. Según el tema, ¿qué técnica mejora con más facilidad su estética?',[
    ['Una alineación exacta y consistente, que aporta equilibrio, armonía, unidad y modularidad.','La página 325 la presenta como la manera más fácil de mejorar la estética.'],
    ['Añadir un fondo llamativo a los campos para que resalten sobre el resto del formulario.','La página 340 indica que un fondo llamativo dificulta la lectura.'],
    ['Aumentar el número de colores de las etiquetas y de los campos para que el usuario los distinga.','No corrige el desorden y contradice la simplicidad.'],
    ['Cambiar a un formato circular para el formulario, de modo que los elementos parezcan más dinámicos.','El formato no resuelve la desalineación.']]],
  [3,325,'Se quiere que el usuario vea primero el aviso de que su plan va a caducar. ¿Qué técnica usa el tema para dirigir su atención?',[
    ['El foco: un punto focal que es el centro de atención y suele verse antes.','La página 325 define así el foco.'],
    ['La alineación: centrar todos los elementos de la pantalla para que el aviso se vea antes que el resto.','La alineación da equilibrio, pero no crea por sí misma un centro de atención.'],
    ['Dar a todos los avisos el mismo peso visual, para que el usuario vea primero el que caduca.','Sin diferencias, nada destaca como punto focal.'],
    ['Usar un formato horizontal estático para el aviso, ya que así resulta más llamativo que el resto.','El formato no dirige la atención a un elemento concreto.']]],
  [3,302,'Un diseñador añade mucha variedad de colores y tamaños para dar dinamismo. ¿Qué advierte el tema sobre la composición?',[
    ['La diversidad y el contraste añaden dinamismo, pero complican la composición, cuyos principios son unidad y claridad.','La página 302 lo explica.'],
    ['La diversidad siempre simplifica la composición, porque cuantos más colores y tamaños, más clara resulta la pantalla.','El tema dice que la complica.'],
    ['La composición no necesita un centro de interés, y los principios de unidad y claridad no son relevantes.','Hay que delimitar claramente el centro de interés.'],
    ['Unidad y claridad solo afectan al formato de la pantalla y no a los colores ni a los tamaños utilizados.','Son los principios de la composición.']]],
  [3,336,'Una página de ayuda presenta títulos, subtítulos y detalles con niveles visuales distintos. ¿Qué buena práctica ilustra entre los ejemplos del tema?',[
    ['Información jerarquizada, que facilita localizar lo relevante.','La página 336 la muestra como ejemplo positivo.'],
    ['Sobrecarga informativa: mucha información sin niveles visuales que ayuden a leerla.','La página 338 la presenta como un problema.'],
    ['Contraste erróneo rojo-azul, que obliga a forzar la acomodación visual del usuario.','Es un ejemplo negativo (p. 345) y no se relaciona con niveles de información.'],
    ['Un fondo llamativo que atrae la atención sobre todos los textos de la página.','La página 340 indica que dificulta la lectura.']]],
  [3,345,'Un texto rojo sobre fondo azul obliga a forzar la vista. ¿Cómo lo describe el tema?',[
    ['Como un contraste erróneo que exige un gran esfuerzo de acomodación visual.','Es el ejemplo negativo de la página 345.'],
    ['Como un contraste que anima y estimula sin inconvenientes, porque los colores opuestos mejoran la lectura.','La página 344 habla de contraste estimulante, pero rojo-azul es el ejemplo erróneo.'],
    ['Como una armonía de colores afines, con variaciones suaves entre el texto y el fondo.','Rojo y azul no se presentan como colores afines.'],
    ['Como el uso recomendado por Marcus para el fondo, ya que el azul resulta cómodo para el usuario.','Marcus recomienda el azul para el fondo, pero no esta combinación con texto rojo.']]],

  [4,327,'¿Por qué son útiles los iconos, según el tema?',[
    ['Porque las personas reaccionan instintivamente a las imágenes y ocupan poco espacio en la pantalla.','Son los dos motivos de la página 327.'],
    ['Porque siempre se entienden sin aprendizaje, sea cual sea su diseño, y por eso ocupan poco espacio en la pantalla.','Los iconos arbitrarios exigen aprender la asociación (p. 329).'],
    ['Porque aparecieron en las interfaces de línea de comandos y permiten ejecutar las órdenes con rapidez.','Se usan desde la primera interfaz gráfica, Xerox Star.'],
    ['Porque solo representan objetos, nunca funciones, de modo que son más fáciles de reconocer por el usuario.','La página 327 dice que representan objetos y también funciones.']]],
  [4,328,'Un mismo icono de lupa significa «buscar» en un navegador y «ampliar» en un visor de imágenes. ¿Qué factores del significado de un icono explican la diferencia?',[
    ['El contexto en el que se usa y la función o tipo de tarea.','La página 328 cita contexto, función y forma representativa.'],
    ['Solo el número de colores del icono.','El color no figura entre los factores del significado del icono.'],
    ['El formato del cuadro de la pantalla.','No es un factor del significado del icono.'],
    ['Que es un icono arbitrario sin relación con el concepto.','La lupa guarda relación con el concepto; el cambio se debe al contexto y la función.']]],
  [4,328,'Según el tema, ¿qué forma representativa produce los iconos más comprensibles?',[
    ['La combinación de un objeto concreto y un objeto abstracto.','La página 328 la señala como la más comprensible.'],
    ['Solo un objeto abstracto, que el usuario ha de interpretar a partir de su forma geométrica.','Es una de las tres opciones, pero no la más comprensible.'],
    ['Solo texto sin imagen, que el usuario lee directamente sin necesidad de interpretar símbolos.','El tema trata de formas representativas gráficas.'],
    ['Una imagen sin relación alguna con el concepto, que el usuario debe aprender mediante la práctica.','Eso corresponde a los iconos arbitrarios.']]],
  [4,329,'Una aplicación representa «sincronizar» con un triángulo naranja que no guarda ninguna relación con la acción, y los usuarios tienen que memorizarlo. ¿Qué tipo de icono es?',[
    ['Arbitrario: no guarda relación y la asociación ha de aprenderse.','La página 329 define así los iconos arbitrarios.'],
    ['Similar: presenta el concepto con una imagen análoga que el usuario reconoce por su parecido con él.','Un icono similar sí se parece al concepto.'],
    ['Ejemplar: muestra un ejemplo típico del concepto, que el usuario identifica de forma inmediata.','No sirve como ejemplo del concepto.'],
    ['Concreto: representa el objeto real tal como el usuario lo ve en su entorno cotidiano.','No representa el objeto real implicado.']]],
  [4,329,'Un icono de cuchillo y tenedor indica «restaurantes» mostrando algo típico de ellos. ¿Qué tipo de icono es?',[
    ['Ejemplar: sirve como ejemplo de lo que se representa.','La página 329 define así los iconos ejemplares.'],
    ['Arbitrario: no guarda relación con el concepto.','Los cubiertos sí se relacionan con el concepto.'],
    ['Similar: es una imagen análoga del propio restaurante.','No representa el restaurante, sino un objeto que lo ejemplifica.'],
    ['Simbólico: expresa un concepto de mayor abstracción sin ejemplos.','Aquí se muestra un ejemplo concreto.']]],
  [4,330,'Al dibujar un icono, un diseñador añade sombras, reflejos y textura al objeto. ¿Qué regla del tema conviene aplicar?',[
    ['Incluir solo los detalles imprescindibles.','Es la regla de la página 330.'],
    ['Incluir todos los detalles posibles para que sea realista.','El tema recomienda lo contrario.'],
    ['Usar siempre una fotografía en lugar de un dibujo.','El tema compara dibujos, caricaturas, líneas y siluetas, sin imponer fotografías.'],
    ['Diseñar cada icono de forma independiente.','La página 332 recomienda un conjunto coordinado.']]],
  [4,332,'¿Qué ventaja aporta diseñar un lenguaje icónico coordinado frente a diseñar los iconos uno a uno?',[
    ['Reduce el esfuerzo, asegura la consistencia, da estilo y permite al usuario prever cómo serán los iconos.','Son las ventajas de la página 332.'],
    ['Permite que cada icono tenga un estilo completamente distinto, para que el usuario los distinga mejor entre sí.','El objetivo es la consistencia.'],
    ['Evita tener que asociar los iconos a las acciones, porque el usuario deduce siempre su función.','El lenguaje icónico representa acciones aplicables a un elemento (p. 331).'],
    ['Solo es útil en sistemas muy simples, con pocas funciones y un número reducido de iconos.','El tema dice que los sistemas complejos disponen de un lenguaje icónico simple y consistente.']]],
  [4,348,'Una aplicación obliga a desplazarse y recordar datos de una pantalla anterior para completar un formulario. ¿Qué recomendación del tema incumple?',[
    ['Reducir la memorización haciendo visible toda la información y evitando desplazamientos.','Es una de las recomendaciones de la página 348.'],
    ['Flexibilizar la presentación mediante personalización, permitiendo al usuario adaptar la pantalla a sus preferencias.','Es otra recomendación, pero no aborda la carga de memoria.'],
    ['Utilizar el azul como color de fondo de la pantalla y reservar los tonos cálidos para los elementos principales.','Es una regla de Marcus sobre el color, ajena al problema.'],
    ['Diseñar primero la interfaz en blanco y negro y añadir el color solo al final del proceso de diseño.','Es una sugerencia sobre el color, no sobre la memorización.']]]
].map((q,i)=>({id:i+1,bloque:q[0],pagina:q[1],enunciado:q[2],opciones:q[3].map((o,j)=>({texto:o[0],explicacion:o[1],correcta:j===0}))}));
