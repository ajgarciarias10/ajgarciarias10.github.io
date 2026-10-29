# Repasos y tests de IPO

Los tests de los temas, CleverTracker y el generador comparten el progreso (`ipo_tests_v1`). El banco contiene 324 preguntas de IPO y CleverTracker; cada test contiene como máximo 40 preguntas disponibles. Los temas de IPO se habilitan a partir de la primera clase registrada para cada tema. Las acertadas se excluyen de nuevos tests; las falladas pueden volver a aparecer hasta que se acierten. Si no hay 40 disponibles, se indica el tamaño real del test.

La sesión conserva las preguntas, el orden de las opciones, las respuestas y la posición. Cambiar de apartado o modo conserva una sesión independiente para cada filtro. El botón «Nuevo test» se habilita al terminar; los errores y los aciertos acumulados se conservan.

Inicio, Ponte al día, Practicar y Calendario muestran los repasos semanales por tema visto en clase, los tests en curso y el historial semanal. Las respuestas se atribuyen a la semana en que se contestan. Los repasos programados vencidos se marcan hechos al completar un test que incluya el tema. Los temas sin banco enlazan a la guía.

Al completar un test se acreditan los apartados con al menos dos respuestas, todas correctas, y se actualiza el progreso del calendario si todas las competencias del tema están acreditadas.

Sin cuenta, el guardado es local al navegador y al dominio. Con Google conectado, se sincroniza con Firebase. Si el almacenamiento falla se muestra un aviso junto al test. No se pueden recuperar sesiones anteriores que la versión previa no guardaba.

Validación: `node --test ipo/tests/progreso.cjs`.

El Calendario incluye un plan personal y una línea temporal semanal de clases y estudio. Puedes elegir de 0 a 6 sesiones tras cada clase, su separación, hora y duración; la primera es teórica y las siguientes practican el tema. Permite añadir sesiones puntuales, moverlas, quitarlas y marcar su realización manualmente. Los viajes desplazan las sesiones pendientes al siguiente hueco, evitando clases, prácticas, bloques semanales y otras sesiones del plan. Las sesiones ya completadas conservan su fecha.

Para época de exámenes debes indicar el inicio del repaso, la fecha del examen y los días disponibles. Alterna temas y simulacros mixtos hasta el día anterior al examen. No presupone una fecha oficial. Si no hay hueco, muestra cuántas sesiones quedan sin programar; estas no se exportan. Los temas sin banco enlazan a la guía. Los tests siguen conservando sus sesiones y excluyendo preguntas acertadas.

El plan se guarda en `ipo_plan_estudio_v1`, separado del progreso. La exportación `.ics` incluye las ocurrencias concretas del plan y los bloques semanales, respetando viajes y movimientos. Para actualizar un calendario externo, sustituye la importación anterior por la nueva.

Validación del plan y del progreso: `node --test ipo/tests/*.cjs`.

## Cuenta Google y Firebase

La web usa Firebase Authentication para elegir una cuenta Google y Cloud Firestore para sincronizar el progreso. El adaptador mantiene `IPOStorage`, así que las pantallas de estudio no dependen directamente del proveedor. Sin iniciar sesión, el progreso permanece en el navegador. Al conectar una cuenta vacía se puede importar el progreso local desde Mi cuenta.

Los datos se guardan en `users/{uid}/study/progress`. La transacción compara la revisión remota antes de escribir; si otro dispositivo guardó primero, los cambios locales quedan conservados y se muestra el conflicto. Las reglas en `firestore.rules` limitan lectura y escritura al UID autenticado. Las personas que administran el proyecto Firebase pueden acceder a su base de datos.

### Activación en Firebase

1. En Authentication, habilitar el proveedor Google.
2. En Authentication → Settings → Authorized domains, añadir `ajgarciarias10.github.io` (y `localhost` solo para pruebas locales).
3. Crear la base de datos Cloud Firestore y publicar `firestore.rules` con Firebase CLI (`firebase deploy --only firestore:rules`). El proyecto de esta app es `web-ipo-f7e7a`.
4. El archivo `cuenta-config.js` contiene la configuración pública de la aplicación web. No contiene client secrets.

Los datos que estaban en Google Drive no se migran automáticamente. Descarga la copia JSON anterior y usa Restaurar copia JSON desde Mi cuenta; también puedes importar el progreso invitado del navegador si la cuenta Firestore está vacía.

El SDK se carga desde Firebase CDN porque este sitio estático no usa un empaquetador.
