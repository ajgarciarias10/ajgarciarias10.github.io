# Repasos y tests de IPO

Los tests de los temas, CleverTracker y el generador comparten el progreso en este navegador (`ipo_tests_v1`). Cada test contiene como máximo 40 preguntas disponibles. Las acertadas se excluyen de nuevos tests; las falladas pueden volver a aparecer hasta que se acierten. Si no hay 40 disponibles, se indica el tamaño real del test.

La sesión conserva las preguntas, el orden de las opciones, las respuestas y la posición. Cambiar de apartado o modo conserva una sesión independiente para cada filtro. El botón «Nuevo test» se habilita al terminar; los errores y los aciertos acumulados se conservan.

Inicio, Ponte al día, Practicar y Calendario muestran los repasos semanales por tema visto en clase, los tests en curso y el historial semanal. Las respuestas se atribuyen a la semana en que se contestan. Los repasos programados vencidos se marcan hechos al completar un test que incluya el tema. Los temas sin banco enlazan a la guía.

Al completar un test se acreditan los apartados con al menos dos respuestas, todas correctas, y se actualiza el progreso del calendario si todas las competencias del tema están acreditadas.

El guardado es local al navegador y al dominio; no sincroniza dispositivos. Si el almacenamiento falla se muestra un aviso junto al test. No se pueden recuperar sesiones anteriores que la versión previa no guardaba.

Validación: `node --test ipo/tests/progreso.cjs`.
