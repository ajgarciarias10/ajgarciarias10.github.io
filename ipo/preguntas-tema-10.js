/* Tema X · Estándares y guías de estilo, IPO2627.pdf pp. 516–602. */
const BLOQUES = BLOQUES_NUEVOS[10];
const BANCO = NUEVAS[10].map(([bloque,,enunciado,opciones,pagina], i) => ({
  id: i + 1, bloque, pagina: pagina ?? null, enunciado,
  opciones: opciones.map(([texto,explicacion], j) => ({texto,explicacion,correcta:j===0}))
}));
