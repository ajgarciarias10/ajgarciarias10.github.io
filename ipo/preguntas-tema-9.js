/* Tema IX · Evaluación, IPO2627.pdf pp. 457–515. */
const BLOQUES = BLOQUES_NUEVOS[9];
const BANCO = NUEVAS[9].map(([bloque,,enunciado,opciones,pagina], i) => ({
  id: i + 1, bloque, pagina: pagina ?? null, enunciado,
  opciones: opciones.map(([texto,explicacion], j) => ({texto,explicacion,correcta:j===0}))
}));
