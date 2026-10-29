/* Tema V, IPO2627.pdf, páginas 223–284 (Internacionalización). Cada opción incluye su justificación.
   La primera opción de cada pregunta es la correcta; test.js baraja las cuatro opciones.
   Las cinco primeras preguntas proceden de preguntas-temas-5-10.js y conservan su enunciado para mantener el progreso. */
const BLOQUES = ['Internacionalización y localización', 'Elementos de la interfaz', 'Escrituras y codificación', 'Modelo de localización', 'Guía técnica'];
const BANCO = [
  [0,229,'Una app separa los textos de la lógica, admite fechas y monedas configurables y reserva espacio para textos más largos. Luego se traduce al japonés y se adaptan sus convenciones. ¿Qué relación describe mejor el trabajo?',[
    ['La preparación del software es internacionalización; la adaptación al japonés es localización.','i18n permite adaptar sin reescribir la lógica; l10n adapta el producto a una cultura concreta.'],
    ['Ambas tareas son localización porque incluyen idioma.','Preparar la arquitectura para más de una cultura corresponde a internacionalización.'],
    ['Ambas tareas son internacionalización porque el producto se distribuye en varios países.','La adaptación final de idioma y convenciones es localización.'],
    ['La traducción es internacionalización y el espacio flexible es localización.','La relación está invertida: traducción es parte de l10n.']]],
  [0,230,'Une cada decisión con su propósito: separar cadenas y evitar fechas fijas en código; cambiar el separador decimal al formato local. ¿Cuál es la correspondencia correcta?',[
    ['Preparar el software para varios entornos es i18n; adaptar el formato para un entorno es l10n.','La primera decisión prepara el sistema; la segunda aplica una convención local.'],
    ['Ambas son l10n porque afectan a lo que ve el usuario.','Evitar formatos fijos en código es una decisión de internacionalización.'],
    ['La primera es traducción; la segunda, accesibilidad.','Ninguna decisión se refiere necesariamente a traducir texto o a accesibilidad.'],
    ['La primera es l10n y la segunda i18n.','Se han intercambiado la preparación general y la adaptación concreta.']]],
  [4,273,'Una interfaz en árabe traduce correctamente todos los textos, pero conserva la navegación izquierda-derecha y corta las etiquetas que ahora ocupan más espacio. ¿Qué conclusión está mejor fundada?',[
    ['La traducción no basta: la localización debe considerar dirección de lectura y expansión del texto.','Los formatos, la direccionalidad y el espacio también varían según el entorno.'],
    ['La internacionalización se completó porque el texto ya está traducido.','La traducción por sí sola no prepara ni adapta toda la interfaz.'],
    ['Solo hay que aumentar el tamaño de fuente; la dirección visual no cambia.','Para RTL debe adaptarse la dirección y disposición cuando el contenido lo requiera.'],
    ['Es un problema de contraste, no de localización.','El caso describe dirección y ajuste del contenido, no contraste.']]],
  [1,235,'Un equipo reemplaza una imagen de una mano por otra porque el gesto tiene sentidos distintos en dos culturas. ¿En qué fase encaja mejor esa decisión?',[
    ['Localización: adapta un elemento cultural del producto a un público concreto.','Iconografía y convenciones culturales son parte de la adaptación local.'],
    ['Internacionalización: elimina toda imagen del sistema.','No es necesario eliminar imágenes; i18n prepara el producto para poder adaptarlas.'],
    ['Traducción literal: cambia el texto sin tocar la imagen.','La decisión trata de significado cultural de la iconografía.'],
    ['Accesibilidad: hace que el gesto se pueda usar con teclado.','El caso no describe un problema de operación o percepción accesible.']]],
  [1,239,'Una fecha se guarda como un instante normalizado y se muestra según la región del usuario. ¿Qué ventaja de diseño expresa mejor?',[
    ['Separa la representación interna de la convención local de presentación.','Así se evitan supuestos de formato incrustados en la lógica.'],
    ['Obliga a guardar una fecha distinta para cada idioma.','Una misma fecha puede formatearse de varias maneras sin duplicar el dato.'],
    ['Convierte la localización en una traducción automática.','El formato de fecha es una convención local, no una traducción.'],
    ['Garantiza que todos los países usan el mismo orden de día y mes.','Precisamente se contemplan convenciones diferentes.']]],

  [0,226,'¿Qué entiende el tema por software internacionalizado?',[
    ['Un producto preparado para ser utilizado fuera de la región o país donde fue creado.','Es la definición de la página 226.'],
    ['Un producto que solo se vende en su país de origen, pero en varios idiomas.','La clave es poder usarse fuera de la región de origen.'],
    ['Un producto traducido automáticamente al inglés.','Traducir no equivale a estar internacionalizado.'],
    ['Un producto que funciona sin interfaz gráfica.','La internacionalización afecta precisamente a la interfaz.']]],
  [0,229,'Un programa tiene los mensajes de error escritos directamente en el código fuente en castellano. ¿Qué rasgo de un programa internacionalizado incumple?',[
    ['Los elementos textuales no deben estar en el código, sino fuera, y tomarse dinámicamente.','La página 229 lo exige para poder adaptar sin cambiar el código.'],
    ['Debe usar solo el alfabeto latino.','La internacionalización busca soportar distintas escrituras.'],
    ['Los mensajes deben estar siempre en inglés.','Eso no elimina la dependencia de una lengua en el código.'],
    ['Debe compilarse una versión distinta por país.','El objetivo es adaptarse sin cambiar el código.']]],
  [0,229,'¿Cuál es la definición de internacionalización (i18n) que da el tema?',[
    ['Diseñar una aplicación para que pueda adaptarse a diferentes lenguajes y regiones sin necesidad de cambiar el código.','Es la definición de la página 229.'],
    ['Adaptar el software a una región concreta añadiendo componentes y traduciendo texto.','Esa es la definición de localización (p. 230).'],
    ['Traducir la documentación al inglés.','La i18n afecta al diseño de la aplicación, no solo a la documentación.'],
    ['Publicar la aplicación en tiendas de varios países.','La distribución no implica que el producto esté preparado.']]],
  [0,230,'¿Qué abarca la localización (L10n) según el tema?',[
    ['Adaptar el software a una región o lengua concreta añadiendo componentes específicos y traduciendo texto, según sus convenciones, cultura y escritura.','Es la definición de la página 230.'],
    ['Diseñar el código para que no dependa de ninguna lengua.','Esa es la internacionalización.'],
    ['Detectar la ubicación GPS del usuario.','El tema no define la localización como geolocalización.'],
    ['Convertir todos los textos a ASCII.','ASCII se queda corto para muchos idiomas (p. 251).']]],
  [0,231,'Una empresa planea añadir soporte internacional cuando el producto esté terminado. ¿Qué advierte el tema?',[
    ['Que añadirlo a un programa acabado puede hacerlo menos estable que incorporarlo durante el desarrollo.','Es una de las ventajas enumeradas en la página 231.'],
    ['Que es la mejor opción porque abarata el mantenimiento.','El mantenimiento es menos costoso cuando se internacionaliza desde el principio.'],
    ['Que es obligatorio hacerlo así para no retrasar la primera versión.','El tema recomienda tenerla en cuenta desde el principio (p. 283).'],
    ['Que no afecta a la estabilidad del producto.','El tema señala el riesgo de menor estabilidad.']]],
  [0,231,'¿Qué ventaja de la internacionalización recoge el tema?',[
    ['El mismo ejecutable funciona en todo el mundo y añadir nuevas localizaciones es menos costoso.','Son ventajas de la página 231.'],
    ['Cada país necesita un ejecutable distinto, lo que facilita el control.','Una ventaja es precisamente que el mismo ejecutable sirve para todos.'],
    ['Reduce el mercado para centrarse en un país.','El mercado es mayor.'],
    ['Elimina la necesidad de traducir textos.','La localización sigue requiriendo traducción.']]],
  [0,283,'¿Qué conclusión del tema resume la importancia de la internacionalización?',[
    ['Es una necesidad, no una opción, y debe tenerse en cuenta desde el principio del diseño con una metodología adecuada.','Es la conclusión de la página 283.'],
    ['Es opcional y solo útil para grandes empresas.','El tema la presenta como necesidad en un mercado global.'],
    ['Se aborda al final, cuando el producto ya funciona.','Debe considerarse desde el principio.'],
    ['Solo afecta a los sitios web.','Los sitios web son el caso extremo, pero no el único (p. 226).']]],

  [1,232,'¿Qué lista contiene solo elementos que hay que considerar al internacionalizar?',[
    ['Texto, iconos, formatos de fechas y monedas, medidas, colores, direcciones y títulos honoríficos.','Son elementos de la página 232.'],
    ['Velocidad del procesador, memoria RAM y sistema de archivos.','Son aspectos técnicos ajenos a la adaptación cultural.'],
    ['Solo el texto de los menús.','La lista del tema es mucho más amplia.'],
    ['El nombre del programador y la fecha de compilación.','No son elementos de la interfaz a localizar.']]],
  [1,235,'Un mensaje promete una respuesta «tan pronto como sea posible». ¿Qué ilustra el tema con esta expresión?',[
    ['Que la cultura hace percibir lo mismo de maneras distintas: «inmediatamente» en EE. UU., «puede ser este mes» en Latinoamérica.','Es el ejemplo de cultura de la página 235.'],
    ['Que la expresión es un problema de codificación de caracteres.','No es un problema de codificación.'],
    ['Que basta una traducción literal para conservar el significado.','El significado cambia aunque la traducción sea correcta.'],
    ['Que es un problema de orden de lectura.','No tiene relación con la dirección del texto.']]],
  [1,237,'¿Por qué el tema cita el buzón de correo, el corrector ortográfico o el tick de verificación?',[
    ['Como ejemplos de iconos que dependen de una lengua y cultura determinadas.','La página 237 los pone como ejemplos de esa dependencia.'],
    ['Como iconos universales que no hace falta revisar.','Se citan precisamente porque no son universales.'],
    ['Como iconos que solo fallan en escrituras ideográficas.','La dependencia es cultural y lingüística en general.'],
    ['Como ejemplos de iconos arbitrarios del diseño gráfico.','En este tema ilustran la dependencia cultural.']]],
  [1,238,'Una felicitación de boda usa un fondo blanco para un público oriental. ¿Qué riesgo señala el tema?',[
    ['En la cultura oriental el blanco se asocia con el luto; el rojo, con el matrimonio.','La página 238 contrapone los significados occidentales y orientales.'],
    ['Ninguno: el blanco significa matrimonio en todas las culturas.','En Occidente sí, pero no en Oriente.'],
    ['El blanco es ilegible en pantallas orientales.','No es un problema técnico, sino cultural.'],
    ['El rojo es el color del luto en Oriente.','Se asocia con el matrimonio.']]],
  [1,238,'¿Qué enseña el ejemplo del semáforo sobre los colores?',[
    ['Que ni siquiera significados tan extendidos como rojo-parar se pueden asumir de manera generalizada.','La página 238 lo usa como advertencia.'],
    ['Que sus colores son un estándar universal que no requiere revisión.','El tema dice lo contrario.'],
    ['Que el verde siempre significa error.','No es lo que indica el tema.'],
    ['Que los colores no tienen significados culturales.','Tienen significados asociados por tradición.']]],
  [1,239,'Un formulario muestra «03/04/2026». ¿Por qué puede ser ambiguo para un público internacional?',[
    ['Porque unos usan dd/mm/aaaa y los angloparlantes mm/dd/aaaa, y además existen calendarios distintos del gregoriano.','La página 239 recoge ambos aspectos.'],
    ['Porque todos los países usan el formato aaaa/dd/mm.','No existe tal formato común.'],
    ['Porque las fechas no deben mostrarse nunca.','El problema es el formato, no mostrarlas.'],
    ['Porque el calendario gregoriano es el único existente.','El tema cita el budista, islámico, chino o hebreo.']]],
  [1,240,'¿Qué formato numérico corresponde al euro según el ejemplo del tema?',[
    ['1.234,56 €','La página 240 muestra este formato para el euro.'],
    ['€ 1,234.56','Es el patrón de EE. UU. y Reino Unido con otro símbolo.'],
    ['1,234.56 €','Usa los separadores anglosajones.'],
    ['€1234.56','No coincide con el ejemplo del tema.']]],
  [1,241,'Una lista ordena por código de carácter: mayúsculas primero, luego minúsculas. ¿Qué advierte el tema?',[
    ['Esa regla no siempre es aceptable: hay ordenaciones más complejas que consideran un segundo carácter, como la antigua ‘ch’ y ‘ll’.','La página 241 lo explica.'],
    ['Es el orden universal de todas las lenguas.','El tema señala que no siempre es aceptable.'],
    ['La ordenación no influye en la internacionalización.','Es un tema importante y complejo.'],
    ['Basta con ordenar los números de 9 a 0.','No resuelve el problema de los caracteres.']]],
  [1,242,'Una app de running muestra distancias solo en kilómetros. ¿Qué mercado plantea un problema según el tema?',[
    ['Estados Unidos, que no usa el sistema métrico sino millas y pulgadas.','La página 242 lo señala como excepción.'],
    ['Toda Europa, que usa millas.','Europa usa el sistema métrico.'],
    ['Ninguno: el sistema métrico es universal.','Estados Unidos es la excepción.'],
    ['Japón, que usa pulgadas en lugar de centímetros.','El tema cita a Estados Unidos.']]],

  [2,244,'¿Qué diferencia hay entre un ideograma y una escritura fonética?',[
    ['El ideograma tiene significado propio sin relación con su pronunciación; las letras fonéticas representan sonidos.','Es la clasificación de la página 244.'],
    ['El ideograma representa sonidos y la letra fonética, conceptos.','La relación está invertida.'],
    ['Ambos representan sonidos, pero con distinto alfabeto.','Los ideogramas no representan sonidos.'],
    ['Los ideogramas solo se usan en escrituras occidentales.','Se usan en el Extremo Oriente.']]],
  [2,245,'¿Qué rasgos comparten las escrituras latina, griega y cirílica?',[
    ['Son fonéticas, se leen de izquierda a derecha, distinguen mayúsculas y minúsculas y usan numeración arábiga.','Son las características comunes de la página 245.'],
    ['Son ideográficas y se leen de derecha a izquierda.','Eso no corresponde a las escrituras occidentales.'],
    ['No distinguen mayúsculas de minúsculas.','Sí las distinguen.'],
    ['Usan numeración romana.','Usan numeración arábiga.']]],
  [2,246,'¿Dónde se usa la escritura cirílica según el tema?',[
    ['En países eslavos como Rusia, Bulgaria o Serbia y en países de Asia central.','La página 246 lo indica.'],
    ['En casi toda Europa occidental y América.','Esa es la escritura latina.'],
    ['En China y Japón.','Usan escrituras basadas en caracteres ideográficos.'],
    ['Solo en Grecia.','Grecia usa la escritura griega.']]],
  [2,247,'¿Cuántos caracteres se consideran el mínimo para conversar en las escrituras del Extremo Oriente?',[
    ['Unos 3.000, frente a 20.000 del conjunto estándar y 50.000 del extendido.','Son las cifras de la página 247.'],
    ['Unos 128, como en ASCII.','ASCII es un mapa latino de 128 caracteres.'],
    ['Unos 256, como en los mapas de un octeto.','Un octeto no basta para estas escrituras.'],
    ['Unos 50.000, el mínimo para conversar.','Esa cifra corresponde al conjunto extendido.']]],
  [2,251,'Un programa usa ASCII de 128 caracteres y no muestra la ñ ni los caracteres griegos. ¿Por qué?',[
    ['ASCII se creó para el inglés a partir del alfabeto latino básico y se queda corto para otros idiomas.','La página 251 lo explica.'],
    ['ASCII es un mapa de doble octeto para escrituras orientales.','ASCII ocupa 128 posiciones.'],
    ['ASCII reserva todos sus caracteres para el control.','Solo los caracteres 0–31 y 127 son de control.'],
    ['ASCII es incompatible con el alfabeto latino.','Está basado en el alfabeto latino.']]],
  [2,252,'¿Qué es un mapa de caracteres de un solo octeto (SBCS)?',[
    ['Una extensión de ASCII de hasta 256 caracteres que añade las posiciones 128–255, como las variantes ISO 8859.','Es la definición de la página 252.'],
    ['Un mapa de 65.536 caracteres de 16 bits.','Eso corresponde al doble octeto o a Unicode.'],
    ['Un mapa sin caracteres de control.','Mantiene la base ASCII.'],
    ['Un esquema único para todas las escrituras del mundo.','Cada variante ISO 8859 cubre un grupo de lenguas.']]],
  [2,252,'¿Qué variante ISO corresponde al latín de Europa occidental?',[
    ['ISO 8859-1 (Latin-1).','La página 252 la asigna al latín de Europa del oeste.'],
    ['ISO 8859-5.','Corresponde al cirílico.'],
    ['ISO 8859-7.','Corresponde al griego.'],
    ['ISO 8859-6.','Corresponde al árabe.']]],
  [2,255,'¿Por qué las escrituras del Extremo Oriente necesitan un mapa de doble octeto (DBCS)?',[
    ['Porque sus caracteres ideográficos superan los 256 de un octeto; con 16 bits se llega a 65.536.','La página 255 lo explica.'],
    ['Porque se escriben de derecha a izquierda.','La dirección no determina el tamaño del mapa.'],
    ['Porque no usan signos de puntuación.','No es el motivo.'],
    ['Porque DBCS solo contiene caracteres de dos octetos.','DBCS mezcla caracteres de 1 y 2 octetos.']]],
  [2,256,'¿Qué problemas de los esquemas de codificación motivaron Unicode?',[
    ['Duplicidad e inconsistencia de códigos entre estándares, límites de 128 o 256 posiciones e Internet, que exige un conjunto único mundial.','Son los problemas de la página 256.'],
    ['Que ASCII ocupaba demasiada memoria.','El problema era su escasa capacidad.'],
    ['Que no existían escrituras fonéticas.','No es el problema planteado.'],
    ['Que los mapas de un octeto eran demasiado grandes.','Al contrario, eran limitados.']]],
  [2,259,'¿Cómo resume el tema las características de Unicode?',[
    ['Universal, uniforme (anchura fija) y no ambiguo; compatible con ASCII y sin secuencias de escape.','Son las propiedades de las páginas 258–259.'],
    ['Variable, ambiguo e incompatible con ASCII.','Es lo contrario.'],
    ['Limitado a escrituras occidentales.','Cubre las escrituras más importantes del mundo.'],
    ['Basado en secuencias de escape para cambiar de alfabeto.','No necesita secuencias de escape.']]],
  [2,257,'Un documento mezcla texto latino, ideogramas y símbolos técnicos. ¿Qué rasgo de Unicode lo hace posible?',[
    ['Trata los caracteres alfabéticos, ideográficos y los símbolos de la misma manera, de forma que se pueden mezclar.','La página 257 lo destaca.'],
    ['Usa un mapa ISO 8859 distinto para cada párrafo.','Unicode es un esquema único.'],
    ['Convierte los ideogramas en letras latinas.','No transforma la escritura.'],
    ['Solo admite símbolos técnicos de un octeto.','Utiliza una codificación de 16 bits.']]],

  [3,264,'¿Qué esquema de producto localizado presenta el tema?',[
    ['Recursos localizados + código de la aplicación = producto localizado.','Es el modelo de la página 264.'],
    ['Código traducido + compilador local = producto localizado.','El código no se traduce; los recursos se separan.'],
    ['Un ejecutable distinto por idioma.','El código es común a todos los países.'],
    ['Producto original + traducción automática = producto localizado.','No es el esquema del tema.']]],
  [3,265,'En el modelo de localización, ¿qué contienen los recursos localizados?',[
    ['Datos pero no código: cadenas y gráficos de la interfaz y elementos específicos de la localización.','La página 265 los describe así.'],
    ['El código de la aplicación común a todos los países.','Eso es el código de la aplicación (p. 266).'],
    ['Solo el instalador del producto.','No coincide con el modelo.'],
    ['El código fuente traducido.','Los recursos no contienen código.']]],
  [3,266,'En el modelo de localización, ¿qué caracteriza al código de la aplicación?',[
    ['Es el mismo y se ejecuta en todos los países e idiomas.','La página 266 lo define así.'],
    ['Cambia en cada país para incluir sus textos.','Los textos están en los recursos.'],
    ['Contiene los gráficos específicos de cada cultura.','Eso pertenece a los recursos localizados.'],
    ['Solo se ejecuta en el país de origen.','Debe funcionar en todos.']]],
  [3,267,'¿Qué claves da el tema para diseñar un producto localizado?',[
    ['Extraer datos, textos y gráficos a un fichero separado, organizar y documentar los ficheros y crear un proceso para construir el producto.','Son las claves de la página 267.'],
    ['Mezclar los textos en el código para que no se pierdan.','Hay que extraerlos.'],
    ['Traducir el código fuente a cada idioma.','El código no se traduce.'],
    ['Evitar documentar los recursos para ganar flexibilidad.','Hay que organizarlos y documentarlos.']]],
  [3,281,'¿Por qué recomienda el tema hacer dos localizaciones en paralelo?',[
    ['Porque permite evaluar si la internacionalización está bien hecha.','La página 281 lo indica.'],
    ['Porque duplica las ventas automáticamente.','No es el motivo dado.'],
    ['Porque evita documentar los recursos.','También hay que documentar todos los recursos.'],
    ['Porque así no hacen falta herramientas de localización.','El tema subraya la importancia de las herramientas.']]],
  [3,282,'¿Qué ofrece Java para la internacionalización según el ejemplo del tema?',[
    ['Soporte Unicode con char de 16 bits, la notación \'\\uxxxx\' y la clase Locale, que identifica una región.','Es el ejemplo de la página 282.'],
    ['Un char de 8 bits limitado a ASCII.','Java usa 16 bits.'],
    ['Un ejecutable distinto para cada región.','Locale representa la región sin cambiar el ejecutable.'],
    ['Que el tamaño de char siempre depende de la plataforma.','Eso ocurre en C++, no en Java.']]],

  [4,271,'«Mover» se traduce al alemán como «verschieben». ¿Qué principio ilustra el tema con este ejemplo?',[
    ['El texto traducido cambia de tamaño y hay que prever que pueda crecer.','La página 271 compara 5 frente a 11 caracteres.'],
    ['Que el alemán no necesita localización.','El ejemplo muestra lo contrario.'],
    ['Que las traducciones siempre son más cortas.','En este caso es más larga.'],
    ['Que hay que evitar los verbos en la interfaz.','No es la recomendación del tema.']]],
  [4,273,'¿Qué margen de expansión del texto recomienda el tema al organizar los diálogos?',[
    ['Un 30 %.','Es la regla de la página 273.'],
    ['Un 5 %.','Es muy inferior a lo recomendado.'],
    ['Un 100 %.','No es la cifra del tema.'],
    ['Ninguno: el texto traducido ocupa lo mismo.','El texto traducido cambia de tamaño.']]],
  [4,275,'Los controles «primero, anterior, siguiente, último» se adaptan para árabe. ¿Qué cambio propone el tema?',[
    ['Invertir su orden, porque la información se presenta de derecha a izquierda.','La página 275 lo muestra con este ejemplo.'],
    ['Mantener el mismo orden porque son iconos universales.','La dirección de lectura cambia la disposición.'],
    ['Eliminar los controles.','No es necesario eliminarlos.'],
    ['Cambiar solo su color.','El problema es la dirección.']]],
  [4,276,'¿Cuánto debe ocupar la versión inglesa de la barra de estado?',[
    ['Solo el 50 %, para que haya espacio cuando el texto crezca al traducirlo.','La página 276 lo recomienda.'],
    ['El 100 %, para aprovechar el espacio.','No se debe llenar la barra de estado.'],
    ['El 30 %, igual que el margen de expansión.','La regla de la barra es el 50 %.'],
    ['Nada: no deben usarse barras de estado.','El tema da pautas para usarlas.']]],
  [4,277,'Las teclas aceleradoras de un menú coinciden con la inicial de cada palabra. ¿Qué problema plantea la traducción?',[
    ['Al traducir, la inicial cambia o se repite, así que debe permitirse otra tecla distinta de la inicial.','La página 277 lo advierte.'],
    ['Ninguno, porque las iniciales se conservan al traducir.','Las palabras cambian al traducirlas.'],
    ['Hay que suprimir las teclas aceleradoras.','Basta con permitir otra tecla.'],
    ['El menú debe superar los 80 caracteres.','El tema pide evitar menús densos, con un límite de 80.']]],
  [4,279,'Un formulario de envío tiene campos fijos de calle, código postal y estado. ¿Qué solución da el tema?',[
    ['Una dirección postal flexible, porque su formato depende de cada país.','Es la solución de la página 279.'],
    ['Exigir el formato estadounidense a todos los usuarios.','Ignora las diferencias culturales.'],
    ['Eliminar la dirección postal.','No resuelve el problema.'],
    ['Traducir solo las etiquetas de los campos.','El problema es la estructura, no solo el texto.']]],
  [4,270,'¿Qué puntos a revisar incluye la guía técnica en el procesamiento de texto?',[
    ['Ordenación, clasificación de caracteres, pronunciación, guionado, gestión de cadenas e importación y exportación de ficheros.','Son los puntos de la página 270.'],
    ['Solo el color de la fuente.','No es un aspecto del procesamiento de texto.'],
    ['Únicamente la velocidad de escritura del usuario.','No figura en la guía técnica.'],
    ['El número de ventanas abiertas.','No figura en la guía técnica.']]],
  [4,280,'¿Qué advierte el ejemplo del perro que pide una pelota?',[
    ['Que los objetos cotidianos son elementos culturales que varían entre países y deben revisarse al localizar.','La página 280 lo presenta como elemento cultural.'],
    ['Que los animales deben eliminarse de las interfaces.','El tema no lo propone.'],
    ['Que es un problema de codificación de caracteres.','Es un problema cultural.'],
    ['Que las pelotas son un símbolo político.','No es lo que plantea el tema.']]]
].map((q,i)=>({id:i+1,bloque:q[0],pagina:q[1],enunciado:q[2],opciones:q[3].map((o,j)=>({texto:o[0],explicacion:o[1],correcta:j===0}))}));
