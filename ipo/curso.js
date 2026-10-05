'use strict';
/* ============================================================================
   IPO · Cronograma del curso 2026–27 (fuente única de fechas)
   Semana 1 = lunes 7 sep 2026 · fin de docencia = viernes 18 dic 2026.
   Lo usan Ponte al día, la portada y el calendario (CRONOGRAMA_SEMANAS).
   ========================================================================== */

const CURSO_INICIO = new Date(2026, 8, 7); // lunes, semana 1
const CURSO_FIN = new Date(2026, 11, 18);

const TEMAS_CURSO = {
  1: { titulo: 'Introducción a la IPO', paginas: '16–48', peso: 33, pagina: 'tema-1.html' },
  2: { titulo: 'El factor humano', paginas: '49–115', peso: 67, pagina: 'tema-2.html' },
  3: { titulo: 'Metáforas', paginas: '116–166', peso: 51, pagina: 'tema-3.html' },
  4: { titulo: 'Ingeniería de la interfaz', paginas: '167–222', peso: 56, pagina: 'tema-4.html' },
  5: { titulo: 'Internacionalización y localización', paginas: '216–255', peso: 40 },
  6: { titulo: 'Diseño gráfico en interfaces', paginas: '256–310', peso: 55 },
  7: { titulo: 'Estilos y paradigmas de interacción', paginas: '311–350', peso: 40 },
  8: { titulo: 'Accesibilidad web', paginas: '351–390', peso: 40 },
  9: { titulo: 'Evaluación de la usabilidad', paginas: '391–445', peso: 55 },
  10: { titulo: 'Estándares y guías de estilo', paginas: '446–480', peso: 35 }
};

/* Qué tema se imparte en clase cada semana lectiva. */
const CRONOGRAMA_SEMANAS = [
  { semana: 1, leccion: 'L1', tema: 1 },
  { semana: 2, leccion: 'L2', tema: 2 },
  { semana: 3, leccion: 'L3', tema: 2 },
  { semana: 4, leccion: 'L4-L5', tema: 3 },
  { semana: 5, leccion: 'L6', tema: 4 },
  { semana: 6, leccion: 'L7', tema: 4 },
  { semana: 7, leccion: 'L8', tema: 5 },
  { semana: 8, leccion: 'L9', tema: 5 },
  { semana: 9, leccion: 'L10', tema: 6 },
  { semana: 10, leccion: 'L11-L12', tema: 6 },
  { semana: 11, leccion: 'L13-L14', tema: 7 },
  { semana: 12, leccion: 'L15-L16', tema: 8 },
  { semana: 13, leccion: 'L17-L18', tema: 9 },
  { semana: 14, leccion: 'L19', tema: 9 },
  { semana: 15, leccion: 'L20-L21', tema: 10 }
];

const CURSO_OVERRIDE_KEY = 'ipo_tema_profesor_override';
const DIA_MS = 86400000;

function hoySinHora(d = new Date()) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function semanaDelCurso(d = new Date()) {
  const dias = Math.floor((hoySinHora(d) - CURSO_INICIO) / DIA_MS);
  return Math.max(1, Math.min(15, Math.floor(dias / 7) + 1));
}

function lunesDeSemana(sem) {
  return new Date(CURSO_INICIO.getTime() + (sem - 1) * 7 * DIA_MS);
}

/* Tema en clase hoy. Se puede corregir a mano si el profesor va adelantado o retrasado. */
function temaProfesor(d = new Date()) {
  try {
    const manual = Number(localStorage.getItem(CURSO_OVERRIDE_KEY));
    if (manual >= 1 && manual <= 10) return manual;
  } catch (e) { /* sin almacenamiento */ }
  const fila = CRONOGRAMA_SEMANAS.find(c => c.semana === semanaDelCurso(d));
  return fila ? fila.tema : 1;
}

function fijarTemaProfesor(tema) {
  try {
    if (tema) localStorage.setItem(CURSO_OVERRIDE_KEY, String(tema));
    else localStorage.removeItem(CURSO_OVERRIDE_KEY);
  } catch (e) { /* sin almacenamiento */ }
}

/* Lunes en que el profesor pasa al tema siguiente (meta para estar al día). */
function finDelTemaActual(d = new Date()) {
  const t = temaProfesor(d);
  const siguiente = CRONOGRAMA_SEMANAS.find(c => c.tema > t && c.semana > semanaDelCurso(d));
  return siguiente ? lunesDeSemana(siguiente.semana) : CURSO_FIN;
}

const FECHA_LARGA = new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
const FECHA_CORTA = new Intl.DateTimeFormat('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });

/* ---------- Competencias demostradas (localStorage) ---------- */
const COMP_KEY = 'ipo_competencias_v1';

function leerCompetencias() {
  try { return JSON.parse(localStorage.getItem(COMP_KEY) || '{}'); } catch (e) { return {}; }
}

function guardarCompetencias(c) {
  try { localStorage.setItem(COMP_KEY, JSON.stringify(c)); } catch (e) { /* sin almacenamiento */ }
}

/* Marca el tema como superado en el progreso que lee el calendario. */
function marcarTemaSuperadoEnCalendario(tema) {
  try {
    const p = JSON.parse(localStorage.getItem('ipo_uja_progress_v2') || '{}');
    p[String(tema)] = Object.assign({}, p[String(tema)], { testAntiolvido: true });
    localStorage.setItem('ipo_uja_progress_v2', JSON.stringify(p));
  } catch (e) { /* sin almacenamiento */ }
}
