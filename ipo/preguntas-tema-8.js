/* Tema VIII · Accesibilidad, IPO2627.pdf pp. 407–456. */
const BLOQUES = BLOQUES_NUEVOS[8];
const BANCO = NUEVAS[8].map(([bloque,,enunciado,opciones,pagina], i) => ({
  id: i + 1, bloque, pagina: pagina ?? null, enunciado,
  opciones: opciones.map(([texto,explicacion], j) => ({texto,explicacion,correcta:j===0}))
}));
