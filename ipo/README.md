# Repasos y tests de IPO

Los tests de los temas, CleverTracker y el generador comparten el progreso en este navegador (`ipo_tests_v1`). Cada test contiene como máximo 40 preguntas disponibles. Las acertadas se excluyen de nuevos tests; las falladas pueden volver a aparecer hasta que se acierten. Si no hay 40 disponibles, se indica el tamaño real del test.

La sesión conserva las preguntas, el orden de las opciones, las respuestas y la posición. Cambiar de apartado o modo conserva una sesión independiente para cada filtro. El botón «Nuevo test» se habilita al terminar; los errores y los aciertos acumulados se conservan.

Inicio, Ponte al día, Practicar y Calendario muestran los repasos semanales por tema visto en clase, los tests en curso y el historial semanal. Las respuestas se atribuyen a la semana en que se contestan. Los repasos programados vencidos se marcan hechos al completar un test que incluya el tema. Los temas sin banco enlazan a la guía.

Al completar un test se acreditan los apartados con al menos dos respuestas, todas correctas, y se actualiza el progreso del calendario si todas las competencias del tema están acreditadas.

Sin cuenta, el guardado es local al navegador y al dominio. Con Drive institucional conectado, se sincroniza con el Drive privado del estudiante. Si el almacenamiento falla se muestra un aviso junto al test. No se pueden recuperar sesiones anteriores que la versión previa no guardaba.

Validación: `node --test ipo/tests/progreso.cjs`.

El Calendario incluye un plan personal y una línea temporal semanal de clases y estudio. Puedes elegir de 0 a 6 sesiones tras cada clase, su separación, hora y duración; la primera es teórica y las siguientes practican el tema. Permite añadir sesiones puntuales, moverlas, quitarlas y marcar su realización manualmente. Los viajes desplazan las sesiones pendientes al siguiente hueco, evitando clases, prácticas, bloques semanales y otras sesiones del plan. Las sesiones ya completadas conservan su fecha.

Para época de exámenes debes indicar el inicio del repaso, la fecha del examen y los días disponibles. Alterna temas y simulacros mixtos hasta el día anterior al examen. No presupone una fecha oficial. Si no hay hueco, muestra cuántas sesiones quedan sin programar; estas no se exportan. Los temas sin banco enlazan a la guía. Los tests siguen conservando sus sesiones y excluyendo preguntas acertadas.

El plan se guarda en `ipo_plan_estudio_v1`, separado del progreso. La exportación `.ics` incluye las ocurrencias concretas del plan y los bloques semanales, respetando viajes y movimientos. Para actualizar un calendario externo, sustituye la importación anterior por la nueva.

Validación del plan y del progreso: `node --test ipo/tests/*.cjs`.

## Cuenta institucional y Drive personal

Implementación sin servidor ni base de datos central: Google Identity Services autoriza `openid`, `userinfo.email` y `drive.appdata`. Se verifica la identidad con el endpoint de Google UserInfo y se admiten los dominios exactos `red.ujaen.es` y `ujaen.es`. El identificador estable de Google separa los datos de cada usuario. La interfaz no convierte una dirección escrita en una identidad autenticada.

Los datos viven en `appDataFolder` del Drive del estudiante, accesible solo con su autorización para esta aplicación. No se solicita acceso a documentos o Gmail. Los tokens se conservan únicamente en sessionStorage durante la sesión de la pestaña, nunca en los archivos del progreso. Al caducar se solicita reconectar; no hay refresh token ni secreto en la web. Cerrar sesión retira el token y la copia local de la cuenta después de sincronizar.

`cuenta-arranque.js` espera a verificar la identidad y recuperar Drive antes de ejecutar los scripts de estudio. `IPOStorage` mantiene el progreso invitado existente separado del de la cuenta. La importación del progreso invitado es explícita desde Mi cuenta y solo se permite si la cuenta no tiene datos.

El guardado crea versiones JSON inmutables en Drive. Sus referencias a versiones anteriores detectan ediciones concurrentes, conservando ambas copias en lugar de sobrescribirlas. Si hay conflicto, se puede descargar la copia local y recuperar la última versión de Drive; la siguiente versión resuelve las ramas. Las versiones anteriores permanecen en el Drive del propietario y consumen su espacio. Los errores de red mantienen cambios locales pendientes y permiten reintentar. No se confirma un guardado hasta recibir la respuesta de Drive.

### Activación (una vez)

1. Crear o reutilizar un proyecto de Google Cloud y habilitar Google Drive API.
2. Configurar la pantalla de consentimiento para IPO Study Lab, los ámbitos indicados y los datos del proyecto gratuito.
3. Crear un cliente OAuth de tipo Aplicación web. Añadir el origen real de GitHub Pages y, para pruebas, el origen local; los orígenes no incluyen `/ipo/`.
4. Copiar solo el Client ID público en `cuenta-config.js` (`googleClientId`). No introducir ningún client secret. El mismo Client ID debe mantenerse para conservar el acceso a appDataFolder.
5. Probar con un correo institucional. Si el proyecto está en modo Pruebas, añadir esa cuenta como usuario de prueba. Para abrirlo a todo el alumnado, completar la configuración de publicación del consentimiento que Google requiera. Si la UJA bloquea autorizaciones externas, deberá autorizar la aplicación.

No requiere Supabase, Firebase, cuentas de base de datos ni almacenar datos del alumnado en infraestructura del responsable de la web. Sin Client ID, se indica que Drive aún no está activado y sigue disponible el estudio local.

Validación: `node --test ipo/tests/*.cjs`. Las pruebas simulan cuentas y Drive; la prueba OAuth real requiere el Client ID y dos dispositivos o navegadores.

Referencias: [Datos privados de aplicaciones en Drive](https://developers.google.com/workspace/drive/api/guides/appdata), [modelo de tokens de Google](https://developers.google.com/identity/oauth2/web/guides/use-token-model), [cuentas institucionales de la UJA](https://www.ujaen.es/servicios/sinformatica/catalogo-de-servicios-tic/correo-electronico).
