/* Caso Práctico: Auditoría de Usabilidad de CleverTracker
   Basado en el despliegue real https://clevertracker.143-47-57-36.sslip.io/ y en IPO2627.pdf (Temas 1, 2 y 3).
   La primera opción es la correcta; el motor del test las baraja automáticamente. */

const BLOQUES = [
  'Acceso y Control del Usuario',
  'Rendimiento Percibido y CanvasKit',
  'Accesibilidad y Factores Sensoriales',
  'Modelo Mental y Persistencia',
  'Ergonomía, Gestalt y Fitts'
];

const BANCO = [
  // Bloque 0: Acceso y Control del Usuario
  [0, 40, 'Al ingresar a CleverTracker, la interfaz muestra exclusivamente el botón «Continuar con Google» sin opción de explorar el catálogo ni usar la app sin cuenta. Desde la perspectiva de IPO, ¿qué principio se vulnera principalmente?', [
    ['Flexibilidad: se anula la iniciativa del diálogo al imponer una secuencia rígida sin permitir exploración previa.', 'El tema 1 (p. 40) define la iniciativa del diálogo como la capacidad de compartir el control; forzar login inmediato impide al usuario explorar y decidir si el sistema satisface sus necesidades.'],
    ['Consistencia: la estética de Google no coincide con los colores minerales de la aplicación.', 'La discrepancia visual es secundaria; el problema crítico es la restricción impuesta a la libertad de navegación.'],
    ['Tiempo de respuesta: el servidor tarda en validar las credenciales de Google.', 'El tiempo de validación ocurre después; el bloqueo inicial es una decisión de arquitectura de interacción.'],
    ['Capacidad de sustitución: el usuario no puede cambiar el tipo de letra del botón.', 'La capacidad de sustitución (p. 40) alude a valores equivalentes de entrada/salida, no al muro de autenticación.']
  ]],
  [0, 41, 'Si el navegador bloquea las ventanas emergentes (popups), el botón de login en CleverTracker permanece indefinidamente en estado «Conectando…». ¿Qué directriz de diseño del Tema 1 se incumple?', [
    ['Control del usuario y recuperabilidad: falta un timeout o mecanismo de cancelación que devuelva el control.', 'El tema 1 (pp. 41 y 44) exige que las operaciones bloqueantes puedan abortarse o emitan mensajes de acción claros tras un fallo.'],
    ['Sintetizabilidad: el sistema no permite predecir el impacto de pulsar el botón.', 'El usuario sí sabe que intenta acceder; el fallo es quedar atrapado sin salida cuando el proceso no responde.'],
    ['Familiaridad: los botones de carga deben ser siempre de color rojo.', 'El color rojo es una convención de error o peligro, no un requisito formal de botones de carga.'],
    ['Migración de tareas: la app debería transferir la autenticación al sistema operativo sin avisar.', 'La migración de tareas (p. 41) trata sobre repartir el control entre usuario y sistema, no sobre acciones ocultas no consentidas.']
  ]],

  // Bloque 1: Rendimiento Percibido y CanvasKit
  [1, 45, 'CleverTracker descarga más de 2,8 MB (CanvasKit WASM + JS) antes del primer pintado, dejando la pantalla en blanco durante 3–5 segundos. ¿Qué consecuencia cognitiva inmediata provoca en el usuario?', [
    ['Pérdida de la sensación de causalidad y percepción de fallo o congelamiento de la aplicación.', 'El tema 1 (p. 45) indica que retrasos superiores a 1 segundo sin feedback rompen el modelo mental de interacción continua.'],
    ['Disminución de la fatiga muscular ocular por descansar la vista ante el blanco.', 'En IPO la ausencia de respuesta visual incrementa la incertidumbre y la ansiedad, no constituye descanso ergonómico.'],
    ['Aumento de la memoria a largo plazo al anticipar la carga del contenido.', 'No existe correlación pedagógica entre pantallas en blanco y retención nemotécnica a largo plazo.'],
    ['Mejora de la sintetizabilidad al omitir elementos visuales intermedios.', 'La sintetizabilidad exige ver el resultado de las acciones; la pantalla vacía impide evaluar el estado del sistema.']
  ]],
  [1, 45, '¿Cuál es la solución más adecuada según los principios de «Tiempo de respuesta» (Tema 1, p. 45) para el arranque de CleverTracker?', [
    ['Incluir en el index.html raíz un skeleton screen o indicador visual ligero (<2 KB) que informe del arranque de forma inmediata.', 'Mantiene informado al usuario desde el milisegundo 0 mientras se descargan y compilan los binarios pesados.'],
    ['Ocultar completamente la página hasta que todos los assets y fuentes estén en memoria.', 'Empeora la experiencia al alargar el tiempo en blanco percibido.'],
    ['Eliminar Flutter y reescribir toda la aplicación en código máquina binario.', 'Es una propuesta inviable y desproporcionada que no aborda el principio de feedback progresivo.'],
    ['Mostrar un texto técnico que detalle el tamaño en bytes de cada archivo descargado.', 'Aumenta la carga cognitiva con datos innecesarios para el usuario final (Tema 1, p. 47).']
  ]],

  // Bloque 2: Accesibilidad y Factores Sensoriales
  [2, 42, 'En la auditoría del DOM con Puppeteer, se comprobó que Flutter Web renderiza sobre un <canvas> con árbol semántico apagado por defecto. ¿Qué problema crítico ocasiona?', [
    ['Incompatibilidad con lectores de pantalla y ruptura de la navegación estándar por teclado mediante tabulación.', 'Los lectores de pantalla requieren nodos DOM semánticos (<button>, <h1>, aria-*); un canvas WebGL sin semántica es invisible para ellos.'],
    ['Imposibilidad física de proyectar la pantalla en monitores externos HDMI.', 'El renderizado Canvas no afecta a las señales de vídeo del hardware.'],
    ['Duplicación automática del consumo de memoria en la base de datos PostgreSQL.', 'La accesibilidad de la capa de presentación no guarda relación con la memoria de la base de datos.'],
    ['Fallo obligatorio en los certificados SSL de cifrado de red.', 'Los certificados TLS/HTTPS son ajenos al modelo de objetos del documento (DOM).']
  ]],
  [2, 60, 'El texto legal inferior sobre privacidad utiliza un ratio de contraste cercano a 3:1 sobre fondo claro. Según los factores humanos visuales (Tema 2, pp. 60–65), ¿por qué es problemático?', [
    ['Reduce severamente la legibilidad en usuarios con agudeza visual reducida o en entornos con iluminación desfavorable.', 'El estándar de contraste accesible (mínimo 4.5:1 para texto normal) garantiza la discriminación visual según la sensibilidad al contraste.'],
    ['Porque la longitud de onda del color azul daña el nervio óptico si no hay contraste 10:1.', 'El argumento cromático es pseudocientífico; la pauta responde a límites psicofísicos de discriminación luminosa.'],
    ['Provoca que el procesador gráfico del dispositivo aumente su temperatura un 40 %.', 'El valor de contraste visual no altera el consumo térmico del hardware del cliente.'],
    ['Impide que el ratón pueda registrar el evento de clic sobre el elemento.', 'El contraste visual afecta a la percepción humana, no a los controladores de eventos de entrada del sistema.']
  ]],

  // Bloque 3: Modelo Mental y Persistencia
  [3, 50, 'CleverTracker promete en la pantalla de entrada: «restaurarlos en otro dispositivo y continuar donde lo dejaste», pero las lecturas del servidor no se ejecutan al iniciar sesión en un dispositivo nuevo. ¿Qué concepto de Donald Norman explica este fallo?', [
    ['Ruptura entre el modelo mental del usuario (promesa de nube) y el modelo conceptual del sistema (offline-first solo con subida).', 'Norman destaca que cuando el sistema comunica una expectativa que su mecanismo real no cumple, se genera frustración y pérdida de confianza.'],
    ['Fallo en la transducción de la fóvea central del ojo humano.', 'Es un término oftalmológico que no tiene relación con la coherencia conceptual de la interfaz.'],
    ['Violación de la metáfora del archivador de escritorio de Xerox Star.', 'La sincronización de datos personales no se limita ni depende de la metáfora del escritorio clásico.'],
    ['Principio de agrupamiento por destino común de la Gestalt.', 'El destino común explica la percepción de movimiento coordinado, no la coherencia funcional del almacenamiento.']
  ]],
  [3, 42, 'La sección de Medidas Corporales fue retirada de la barra de navegación (main_page.dart), pero la portada sigue anunciando «Nutrición, medidas y entrenamiento». ¿Qué vulnera esta contradicción?', [
    ['Consistencia externa e interna: la información promocional no se corresponde con las tareas que el sistema soporta.', 'Tema 1 (p. 42): la consistencia exige que los mecanismos y la presentación mantengan coherencia semántica en todo el producto.'],
    ['La Ley de Hick sobre tiempo de decisión proporcional a las alternativas.', 'La Ley de Hick se refiere al tiempo para elegir entre opciones disponibles, no a opciones prometidas que no existen.'],
    ['El principio de multihilado de la interfaz.', 'El multihilado alude a ejecutar múltiples tareas simultáneas, no al contenido de los menús.'],
    ['La tasa de refresco mínima de 60 fotogramas por segundo.', 'La presencia o ausencia de opciones de menú no condiciona la frecuencia de cuadros por segundo de la pantalla.']
  ]],

  // Bloque 4: Ergonomía, Gestalt y Fitts
  [4, 78, 'En monitores de escritorio (>820 px), la tarjeta de bienvenida se fija en minHeight: 620 px con un amplio espacio vacío en el centro y aleja el botón de Google hacia la derecha. Según la Ley de Fitts, ¿qué impacto tiene?', [
    ['Aumenta el tiempo necesario para alcanzar el objetivo motor al incrementar la distancia desde el foco de lectura natural.', 'Ley de Fitts: T = a + b log2(D/W + 1). Al aumentar la distancia D entre el punto de fijación visual y el botón, crece el tiempo de adquisición.'],
    ['Reduce el tiempo de clic porque el espacio vacío funciona como un imán para el cursor del ratón.', 'La Ley de Fitts demuestra que el espacio vacío incrementa la distancia motora, nunca la reduce.'],
    ['Garantiza que la ley de Gestalt de proximidad se aplique con eficacia máxima.', 'La gran separación contradice precisamente el principio de proximidad de la Gestalt.'],
    ['Invalida la necesidad de utilizar monitores de alta resolución.', 'La ergonomía del cursor es independiente de la densidad de píxeles del monitor.']
  ]],
  [4, 39, 'El texto inferior «Usamos la cuenta únicamente para identificar tus datos. CleverTracker no publica nada en Google» es valorado positivamente en el informe. ¿Por qué?', [
    ['Reduce la carga cognitiva y la ansiedad del usuario mediante transparencia explícita sobre la privacidad.', 'Tema 1 (p. 47) y factores humanos: anticipar y despejar temores éticos fundamentados mejora la confianza y la usabilidad percibida.'],
    ['Porque elimina la necesidad de cifrar las comunicaciones mediante HTTPS.', 'La explicación de privacidad no sustituye ni exime de los protocolos de seguridad técnica.'],
    ['Porque convierte automáticamente la aplicación en software de código abierto certificado.', 'Un mensaje informativo en el login no altera el régimen legal de licencias del código.'],
    ['Porque cumple con la directriz de interfaz unimodal estricta de Norman.', 'Norman defiende interfaces multimodales ricas y modelos conceptuales claros, no restricciones artificiales.']
  ]]
].map((q, i) => ({
  id: i + 1,
  bloque: q[0],
  pagina: q[1],
  enunciado: q[2],
  opciones: q[3].map((o, j) => ({
    texto: o[0],
    explicacion: o[1],
    correcta: j === 0
  }))
}));
